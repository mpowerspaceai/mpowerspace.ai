import crypto from 'crypto';

const API_KEY = process.env.FIRSTPROMOTER_API_KEY!;
const BASE_URL = process.env.FIRSTPROMOTER_BASE_URL || 'https://api.firstpromoter.com/v1';

export async function fetchFirstPromoterAPI(endpoint: string, method: string, data?: any) {
  if (!API_KEY) {
    console.error('FirstPromoter API key is missing.');
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`FirstPromoter API Error: ${response.status} ${errText}`);
      throw new Error(`FirstPromoter API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error connecting to FirstPromoter:', error);
    throw error;
  }
}

/**
 * Tracks a new lead (user registration).
 * @param email - User's email address
 * @param uid - Internal unique ID of the user in your database
 * @param refId - The referral code (`?ref=...`) they signed up with
 */
export async function trackLead(email: string, uid: string, refId: string) {
  if (!refId) return null;

  return fetchFirstPromoterAPI('/track/leads', 'POST', {
    email,
    uid,
    ref_id: refId,
  });
}

/**
 * Tracks a new sale (conversion) to reward the affiliate.
 * @param email - User's email address
 * @param eventId - The unique transaction ID (e.g. from Stripe/PayPal)
 * @param amount - The sale amount in cents (e.g., 5000 = $50.00)
 */
export async function trackSale(email: string, eventId: string, amount: number) {
  return fetchFirstPromoterAPI('/track/sales', 'POST', {
    email,
    event_id: eventId,
    amount,
  });
}

/**
 * Automatically creates an affiliate or fetches their dashboard link.
 * Used to provide seamless SSO into FirstPromoter's affiliate portal.
 * @param email - User's email address
 * @param name - User's full name
 */
export async function getPromoterAuthLink(email: string, name: string) {
  return fetchFirstPromoterAPI('/promoters/sso_link', 'POST', {
    email,
    name,
  });
}

/**
 * Validates webhooks originating from FirstPromoter.
 * @param signature - The 'X-FirstPromoter-Signature' header
 * @param payload - The raw request body
 */
export function validateWebhookSignature(signature: string, payload: string) {
  const secret = process.env.FIRSTPROMOTER_WEBHOOK_SECRET;
  if (!secret) return false;

  const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return hash === signature;
}
