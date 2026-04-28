import { NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';

export async function GET(req: Request) {
  try {
    const apiKey = process.env.MOLLIE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'MOLLIE_API_KEY is missing on server' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('id');
    if (!paymentId) {
      return NextResponse.json({ error: 'Payment id is required' }, { status: 400 });
    }

    const mollieClient = createMollieClient({ apiKey });
    const payment = await mollieClient.payments.get(paymentId);

    return NextResponse.json({
      id: payment.id,
      status: payment.status
    });
  } catch (error: any) {
    console.error('Mollie Payment Status Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch payment status' }, { status: 500 });
  }
}
