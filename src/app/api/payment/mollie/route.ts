import { NextResponse } from 'next/server';
import { createMollieClient, SequenceType } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY || 'live_ADU7D43kyDthpBRRCaWR7Srk6b2Exp' });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'USD', description = 'Mpower Space Monthly Subscription', isSubscription = true } = body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Format amount to string with 2 decimal places as required by Mollie (e.g., '22.00')
    const formattedAmount = Number(amount).toFixed(2);

    // Create a Mollie customer to attach the recurring mandate to
    const customer = await mollieClient.customers.create({
      name: 'Mpower Space User',
      email: 'user@mpowerspace.ai', // Ideally we pass this from the frontend
    });

    // Create a first payment to initialize the mandate for future recurring payments
    const payment = await mollieClient.payments.create({
      amount: {
        currency: currency,
        value: formattedAmount,
      },
      customerId: customer.id,
      description: `${description} - ${currency} ${formattedAmount}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mpowerspace.ai'}/app/`,
      webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mpowerspace.ai'}/api/webhooks/mollie`,
      sequenceType: isSubscription ? SequenceType.first : SequenceType.oneoff,
    });

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (error: any) {
    console.error('Mollie Payment Error:', error);
    return NextResponse.json({ error: error.message || 'Payment creation failed' }, { status: 500 });
  }
}
