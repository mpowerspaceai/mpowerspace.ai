import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Mollie sends the payment ID as a form-urlencoded field 'id'
    const textBody = await req.text();
    const params = new URLSearchParams(textBody);
    const id = params.get('id');

    if (!id) {
      return new NextResponse('Missing payment ID', { status: 400 });
    }

    console.log(`Mollie Webhook received for payment ID: ${id}`);
    
    // In the future, we will verify the payment status using the Mollie API 
    // and update the user's wallet in Prisma & FusionPBX.
    // For now, we acknowledge receipt to Mollie.

    return new NextResponse('OK', { status: 200 });
  } catch (error: any) {
    console.error('Mollie Webhook Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
