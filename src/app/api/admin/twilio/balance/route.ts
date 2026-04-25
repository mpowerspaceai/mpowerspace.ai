import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;

    if (!sid || !token) {
      return NextResponse.json({ error: 'Missing Twilio Credentials' }, { status: 400 });
    }

    const auth = Buffer.from(`${sid}:${token}`).toString('base64');

    // Fetch Balance
    const balanceRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Balance.json`, {
      headers: {
        'Authorization': `Basic ${auth}`
      },
      cache: 'no-store'
    });

    if (!balanceRes.ok) {
      const err = await balanceRes.json();
      throw new Error(err.message || 'Failed to fetch Twilio balance');
    }

    const balanceData = await balanceRes.json();

    // Fetch active numbers count
    const numbersRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/IncomingPhoneNumbers.json`, {
      headers: {
        'Authorization': `Basic ${auth}`
      },
      cache: 'no-store'
    });
    
    let activeNumbersCount = 0;
    if (numbersRes.ok) {
      const numbersData = await numbersRes.json();
      activeNumbersCount = numbersData.incoming_phone_numbers?.length || 0;
    }

    return NextResponse.json({
      balance: balanceData.balance,
      currency: balanceData.currency,
      activeNumbers: activeNumbersCount
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
