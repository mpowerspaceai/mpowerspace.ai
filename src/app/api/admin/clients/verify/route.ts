import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const digitsOnly = phone.replace(/\D/g, '');
    const normalized = `+${digitsOnly}`;
    const localTail = digitsOnly.slice(-9);

    // Prioritize exact/normalized match first.
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ phone }, { phone: normalized }]
      }
    });

    // Fallback for numbers entered with an extra trunk zero after country code.
    if (!user && localTail.length >= 7) {
      user = await prisma.user.findFirst({
        where: { phone: { endsWith: localTail } }
      });
    }

    if (!user) {
      // Auto-provision client after successful OTP flow to avoid blocking first login.
      const provisionalEmail = `client_${digitsOnly}_${Date.now()}@mpowerspace.local`;
      const createdUser = await prisma.user.create({
        data: {
          email: provisionalEmail,
          phone: normalized,
          status: 'Active'
        }
      });
      user = await prisma.user.findUnique({ where: { id: createdUser.id } });
    }

    if (!user) {
      return NextResponse.json({ error: 'Failed to provision client' }, { status: 500 });
    }

    const userAny = user as any;
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
    const allowFreeConnect = freeSecondsRemaining > 0;
    const requiresPayment = Number(user.balance ?? 0) <= 0 && !allowFreeConnect;

    // Return full SIP + profile config for this specific user
    return NextResponse.json({ 
      exists: true,
      id: user.id,
      status: user.status,
      balance: user.balance,
      lastActive: user.lastActive,
      logoUrl: userAny.logoUrl ?? null,
      sipUsername: userAny.sipUsername || (user.phone ? user.phone.replace('+', '') : null),
      sipPassword: userAny.sipPassword ?? null,
      sipDomain: userAny.sipDomain || 'mpowerspace.ai',
      sipWssUrl: userAny.sipWssUrl || 'wss://calls.mpowerspace.ai:8443',
      allowFreeConnect,
      freeCallLimitSeconds,
      freeSecondsUsed,
      freeSecondsRemaining,
      requiresPayment
    });

  } catch (error) {
    console.error('Error verifying client:', error);
    return NextResponse.json({ error: 'Failed to verify client' }, { status: 500 });
  }
}
