import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const normalizePhone = (value: string): string => {
  const digits = String(value ?? '').replace(/\D/g, '');
  return digits ? `+${digits}` : '';
};

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone) return NextResponse.json({ error: 'Phone number required' }, { status: 400 });

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const cleanPhone = normalizedPhone.replace(/\D/g, '');
    try {
      await prisma.user.findFirst({
        where: { phone: { contains: cleanPhone } }
      });
      // Allow any number to register for testing real OTP
    } catch (dbErr) {
      console.warn("DB check failed", dbErr);
    }

    // --- CEO & CROWN PRINCE BYPASS (Survival Mode) ---
    // If the phone is the CEO's disconnected UAE number or the Crown Prince's Syria number
    if (normalizedPhone === '+971508220450' || normalizedPhone === '+963955210172') {
      console.log(`Bypass triggered for Royal Family member: ${normalizedPhone}`);
      return NextResponse.json({ 
        success: true, 
        hash: "twilio_verify_pending", // Same format to keep frontend happy
        normalizedPhone,
        message: 'OTP Sent successfully (Royal Bypass)'
      });
    }
    // --------------------------------------------------

    if (!accountSid || !authToken) {
      console.error("Missing Twilio credentials");
      return NextResponse.json({ error: 'Twilio configuration missing' }, { status: 500 });
    }

    // Use Twilio Verify API (Bypasses regular Programmable SMS restrictions)
    const verifyServiceSid = 'VAda2233ddfcf09dd2085e88aa17af5acc';
    const twilioUrl = `https://verify.twilio.com/v2/Services/${verifyServiceSid}/Verifications`;
    const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    
    const params = new URLSearchParams();
    params.append('To', normalizedPhone);
    params.append('Channel', 'sms'); // Twilio Verify handles routing and Sender IDs automatically

    const twilioRes = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    const twilioData = await twilioRes.json();
    console.log("Twilio Verify Response:", twilioData);

    if (twilioData.status === 400 || twilioData.error_message) {
      console.error("Twilio Verify API Error:", twilioData.message || twilioData.error_message);
      return NextResponse.json({ error: twilioData.message || twilioData.error_message }, { status: 400 });
    }

    // We don't need to hash the OTP anymore because Twilio Verify stores it securely on their end.
    // We just need to tell the frontend to move to the next step.
    return NextResponse.json({ 
      success: true, 
      hash: "twilio_verify_pending", // Placeholder since Twilio handles the actual check
      normalizedPhone,
      message: 'OTP Sent successfully via Twilio Verify'
    });

  } catch (e: any) {
    console.error("OTP Sending Failed:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
