import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

async function findUserByPhone(phone?: string | null) {
  if (!phone) return null;
  return prisma.user.findFirst({ where: { phone } });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    const type = searchParams.get('type');

    const user = await findUserByPhone(phone);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (type === 'sms') {
      const sms = await prisma.smsLog.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 100
      });
      return NextResponse.json({ sms });
    }

    if (type === 'recordings') {
      const recordings = await prisma.voiceRecording.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 100
      });
      return NextResponse.json({ recordings });
    }

    return NextResponse.json(
      { error: "Invalid type. Use 'sms' or 'recordings'" },
      { status: 400 }
    );
  } catch (error) {
    console.error('Client storage GET failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, type } = body;

    const user = await findUserByPhone(phone);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (type === 'sms') {
      const created = await prisma.smsLog.create({
        data: {
          userId: user.id,
          direction: body.direction || 'outbound',
          fromNumber: body.fromNumber || phone,
          toNumber: body.toNumber,
          body: body.body,
          status: body.status || 'queued',
          providerMessageId: body.providerMessageId || null
        }
      });
      return NextResponse.json({ success: true, sms: created });
    }

    if (type === 'recording') {
      const created = await prisma.voiceRecording.create({
        data: {
          userId: user.id,
          callLogId: body.callLogId || null,
          fileUrl: body.fileUrl,
          durationSec: Number(body.durationSec || 0),
          mimeType: body.mimeType || null,
          sizeBytes: body.sizeBytes ? Number(body.sizeBytes) : null
        }
      });
      return NextResponse.json({ success: true, recording: created });
    }

    if (type === 'logo') {
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: { logoUrl: body.logoUrl || null }
      });
      return NextResponse.json({ success: true, logoUrl: updated.logoUrl });
    }

    return NextResponse.json(
      { error: "Invalid type. Use 'sms', 'recording', or 'logo'" },
      { status: 400 }
    );
  } catch (error) {
    console.error('Client storage POST failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
