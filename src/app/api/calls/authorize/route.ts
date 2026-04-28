import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

async function findUserByPhone(phone: string) {
  const digitsOnly = phone.replace(/\D/g, '');
  const normalized = `+${digitsOnly}`;
  const localTail = digitsOnly.slice(-9);

  let user = await prisma.user.findFirst({
    where: {
      OR: [{ phone }, { phone: normalized }]
    }
  });

  if (!user && localTail.length >= 7) {
    user = await prisma.user.findFirst({
      where: { phone: { endsWith: localTail } }
    });
  }

  return user;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    if (!phone) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }

    const user = await findUserByPhone(phone);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (user.status !== 'Active') {
      return NextResponse.json({ canCall: false, reason: 'Account is not active.' }, { status: 403 });
    }

    const freeCallLimitSeconds = 300;
    const aggregate = await prisma.callLog.aggregate({
      where: {
        userId: user.id,
        durationSeconds: { gt: 0 }
      },
      _sum: {
        durationSeconds: true
      }
    });

    const freeSecondsUsed = Math.max(0, Number(aggregate._sum.durationSeconds || 0));
    const freeSecondsRemaining = Math.max(0, freeCallLimitSeconds - freeSecondsUsed);
    const balance = Number(user.balance ?? 0);
    const canCall = balance > 0 || freeSecondsRemaining > 0;

    return NextResponse.json({
      canCall,
      balance,
      freeCallLimitSeconds,
      freeSecondsUsed,
      freeSecondsRemaining,
      reason: canCall ? null : 'Free 5-minute trial finished. Please recharge.'
    });
  } catch (error: any) {
    console.error('Call authorize error:', error);
    return NextResponse.json({ error: error.message || 'Authorization failed' }, { status: 500 });
  }
}
