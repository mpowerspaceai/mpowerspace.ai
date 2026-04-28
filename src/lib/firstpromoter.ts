import {
  fetchPostAffiliateProAPI,
  getPromoterAuthLink,
  trackLead,
  trackSale,
  validateWebhookSignature,
} from '@/lib/postaffiliatepro';

/**
 * Backward-compatible wrapper.
 * Kept to avoid breaking old imports while the affiliate backend has moved to Post Affiliate Pro.
 */
export async function fetchFirstPromoterAPI(endpoint: string, method: string, data?: Record<string, unknown>) {
  return fetchPostAffiliateProAPI(endpoint, method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data);
}

export { trackLead, trackSale, getPromoterAuthLink, validateWebhookSignature };
