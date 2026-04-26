import { NextResponse } from 'next/server';
import { createMollieClient, PaymentStatus, SequenceType } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY || 'live_ADU7D43kyDthpBRRCaWR7Srk6b2Exp' });

export async function POST(req: Request) {
  try {
    const textBody = await req.text();
    const params = new URLSearchParams(textBody);
    const id = params.get('id');

    if (!id) {
      return new NextResponse('Missing payment ID', { status: 400 });
    }

    console.log(`Mollie Webhook received for payment ID: ${id}`);
    
    // Fetch the payment details from Mollie to verify its status securely
    const payment = await mollieClient.payments.get(id);

    // If this was a successful "first" payment (mandate creation), we must now create the actual Subscription
    if (payment.status === PaymentStatus.paid && payment.sequenceType === SequenceType.first && payment.customerId) {
      const isTrial = (payment.metadata as any)?.isTrial;
      let startDate;

      // If it's a Free Trial ($1 verification), the actual $22 subscription starts exactly 1 month from today
      if (isTrial) {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        startDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      }

      // Create the recurring $22/month subscription
      await mollieClient.customers_subscriptions.create({
        customerId: payment.customerId,
        amount: {
          currency: 'USD',
          value: '22.00',
        },
        interval: '1 month',
        description: 'Mpower Space $22 Monthly Subscription',
        startDate: startDate, // If undefined, it charges immediately
      });

      console.log(`[SUCCESS] Created $22 Monthly Subscription for Customer: ${payment.customerId} | Trial: ${isTrial}`);
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error: any) {
    console.error('Mollie Webhook Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}