import { NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY || 'live_ADU7D43kyDthpBRRCaWR7Srk6b2Exp' });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'EUR', description = 'Mpower Space Recharge' } = body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Format amount to string with 2 decimal places as required by Mollie (e.g., '10.00')
    const formattedAmount = Number(amount).toFixed(2);

    const payment = await mollieClient.payments.create({
      amount: {
        currency: currency,
        value: formattedAmount,
      },
      description: `${description} - $${formattedAmount}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mpowerspace.ai'}/app/`,
      webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mpowerspace.ai'}/api/webhooks/mollie`,
    });

    return NextResponse.json({ checkoutUrl: payment._links.checkout?.href });
  } catch (error: any) {
    console.error('Mollie Payment Error:', error);
    return NextResponse.json({ error: error.message || 'Payment creation failed' }, { status: 500 });
  }
}
