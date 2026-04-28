import { NextRequest, NextResponse } from 'next/server';
import { validateWebhookSignature } from '@/lib/postaffiliatepro';

export async function POST(req: NextRequest) {
  try {
    const signature =
      req.headers.get('X-PostAffiliatePro-Signature') ||
      req.headers.get('X-FirstPromoter-Signature') ||
      '';
    const rawBody = await req.text();

    if (!validateWebhookSignature(signature, rawBody)) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    console.log('Received Post Affiliate Pro webhook:', payload.type || payload.event || 'unknown');

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Post Affiliate Pro webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
