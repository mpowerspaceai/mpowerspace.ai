import crypto from 'crypto';

const API_KEY = process.env.POSTAFFILIATEPRO_API_KEY || '';
const BASE_URL = process.env.POSTAFFILIATEPRO_BASE_URL || 'https://mpowerspace.postaffiliatepro.com/api/v3';
const PORTAL_URL = process.env.POSTAFFILIATEPRO_PORTAL_URL || 'https://mpowerspace.postaffiliatepro.com/affiliates/';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function fetchPostAffiliateProAPI(endpoint: string, method: HttpMethod, data?: Record<string, unknown>) {
  if (!API_KEY) {
    console.error('Post Affiliate Pro API key is missing.');
    return null;
  }

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  try {
    const response = await fetch(`${BASE_URL}${normalizedEndpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Post Affiliate Pro API Error: ${response.status} ${errText}`);
      throw new Error(`Post Affiliate Pro API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error connecting to Post Affiliate Pro:', error);
    throw error;
  }
}

export async function trackLead(email: string, uid: string, refId: string) {
  if (!refId) return null;

  return fetchPostAffiliateProAPI('/transactions', 'POST', {
    type: 'lead',
    email,
    uid,
    affiliateId: refId,
  });
}

export async function trackSale(email: string, eventId: string, amount: number) {
  return fetchPostAffiliateProAPI('/transactions', 'POST', {
    type: 'sale',
    email,
    orderId: eventId,
    totalCost: amount,
  });
}

export async function getPromoterAuthLink(email: string, name: string) {
  return fetchPostAffiliateProAPI('/affiliates/sso-link', 'POST', {
    email,
    name,
  });
}

export function getAffiliatePortalUrl() {
  return PORTAL_URL;
}

export function validateWebhookSignature(signature: string, payload: string) {
  const secret = process.env.POSTAFFILIATEPRO_WEBHOOK_SECRET || '';
  if (!secret || !signature) return false;

  const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return hash === signature;
}
