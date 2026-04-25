import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Secret key to verify the webhook request comes from our FusionPBX server
const FUSIONPBX_SECRET = process.env.FUSIONPBX_SECRET || 'BelalMaher100@@';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cdrs, secret } = body;

    // Verify the request
    if (!secret || secret !== FUSIONPBX_SECRET) {
      return NextResponse.json({ error: 'Unauthorized. Invalid secret.' }, { status: 401 });
    }

    if (!cdrs || !Array.isArray(cdrs)) {
      return NextResponse.json({ error: 'Invalid payload. Expected an array of CDRs.' }, { status: 400 });
    }

    // Process each Call Detail Record
    for (const cdr of cdrs) {
      // Find or create user based on caller_id
      let user = await prisma.user.findFirst({
        where: { phone: cdr.caller_id }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: `caller_${cdr.caller_id}@mpowerspace.ai`,
            phone: cdr.caller_id,
            balance: 0,
            status: 'Active',
            lastActive: new Date(cdr.start_stamp)
          }
        });
      } else {
        // Update last active
        await prisma.user.update({
          where: { id: user.id },
          data: { lastActive: new Date(cdr.start_stamp) }
        });
      }

      // Insert or update the Call Log
      await prisma.callLog.upsert({
        where: { callUuid: cdr.uuid },
        update: {
          destination: cdr.destination_number,
          durationSeconds: parseInt(cdr.duration) || 0,
          hasRecording: !!cdr.record_path,
          recordingUrl: cdr.record_path,
          startedAt: new Date(cdr.start_stamp)
        },
        create: {
          callUuid: cdr.uuid,
          userId: user.id,
          callerId: cdr.caller_id,
          destination: cdr.destination_number,
          durationSeconds: parseInt(cdr.duration) || 0,
          hasRecording: !!cdr.record_path,
          recordingUrl: cdr.record_path,
          startedAt: new Date(cdr.start_stamp)
        }
      });
    }

    return NextResponse.json({ success: true, processed: cdrs.length });
  } catch (error) {
    console.error('FusionPBX Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}