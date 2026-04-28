import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(ar|en|es|ro|pt|fr|de|zh|he)/:path*',
    '/((?!api|app|mobile-app|_next|_vercel|.*\\..*).*)'
  ]
};
