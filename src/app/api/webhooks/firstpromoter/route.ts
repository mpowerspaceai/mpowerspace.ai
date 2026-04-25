import { NextRequest, NextResponse } from 'next/server';
import { validateWebhookSignature } from '@/lib/firstpromoter';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('X-FirstPromoter-Signature') || '';
    const rawBody = await req.text();

    if (!validateWebhookSignature(signature, rawBody)) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Common FirstPromoter webhook events:
    // - promoter.created
    // - reward.created
    // - payout.paid

    console.log('Received FirstPromoter Webhook:', payload.type);

    switch (payload.type) {
      case 'promoter.created':
        // e.g. Update internal user record to mark as affiliate
        // await db.user.update({ where: { email: payload.data.email }, data: { isAffiliate: true, firstPromoterId: payload.data.id }});
        break;
      
      case 'reward.created':
        // Affiliate earned a commission!
        // Record this reward in your DB if you want to mirror the data locally
        break;
        
      case 'payout.paid':
        // Commission paid to the affiliate via PayPal/Bank
        // Notify the user internally or update their status
        break;

      default:
        console.log('Unhandled event type:', payload.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
