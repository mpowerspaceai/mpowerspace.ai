import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      },
      {
        // Cloudflare optimization headers for static assets
        source: '/app/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'CF-Edge-Cache', value: 'cache, exact-match' }
        ]
      },
      {
        // Cloudflare optimization headers for images and sounds
        source: '/app/(images|sounds|videos)/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
          { key: 'CF-Edge-Cache', value: 'cache, exact-match' }
        ]
      },
      {
        // Global security headers optimized for Cloudflare
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/app',
        destination: '/app/index.html',
      },
      {
        source: '/app/:path*',
        destination: '/app/:path*',
      },
      {
        source: '/mobile-app',
        destination: '/app/index.html',
      },
      {
        source: '/mobile-app/:path*',
        destination: '/app/:path*',
      },
      {
        source: '/assets/:path*',
        destination: '/app/assets/:path*',
      },
      {
        source: '/images/:path*',
        destination: '/app/images/:path*',
      },
      {
        source: '/sounds/:path*',
        destination: '/app/sounds/:path*',
      },
      {
        source: '/videos/:path*',
        destination: '/app/videos/:path*',
      },
      {
        source: '/manifest.json',
        destination: '/app/manifest.json',
      },
      {
        source: '/sw.js',
        destination: '/app/sw.js',
      }
    ];
  },
};

export default withNextIntl(nextConfig);
