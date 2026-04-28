import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://mpowerspace.ai';
const MARKETING_ROUTES = [
  '',
  '/about',
  '/affiliate',
  '/blog',
  '/contact',
  '/corporate',
  '/download',
  '/pricing',
  '/privacy',
  '/reseller'
];

function localizedPath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) {
    return path || '/';
  }
  return `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return MARKETING_ROUTES.map((path) => {
    const canonicalPath = localizedPath(routing.defaultLocale, path);
    const alternates = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${SITE_URL}${localizedPath(locale, path)}`])
    );

    return {
      url: `${SITE_URL}${canonicalPath}`,
      lastModified,
      changeFrequency: path === '' ? 'daily' : 'weekly',
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: alternates
      }
    };
  });
}
