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
  async rewrites() {
    return [
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
