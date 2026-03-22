import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ── Image Optimization ────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.sanity.io' },
    ],
  },

  // ── Compiler options ──────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ── Headers for security ──────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // ── Route aliases for top navigation ──────────────────────────
  // The UI label is "Trade & Invest", but the underlying pages live under
  // /products. These rewrites let URLs match the label.
  async rewrites() {
    return [
      // Legacy /markets/* → same five hubs only
      { source: '/markets/commodities', destination: '/products/commodities' },
      { source: '/markets/indices', destination: '/products/indices' },
      { source: '/markets/cryptocurrencies', destination: '/products/cryptocurrencies' },
      { source: '/markets/futures', destination: '/products/futures' },
      { source: '/markets/stocks', destination: '/products/stocks' },
      { source: '/markets', destination: '/products/commodities' },
      { source: '/markets/:path*', destination: '/products/commodities' },
      // Trade & Invest — only these public routes (no wildcard)
      { source: '/trade&invest', destination: '/products' },
      { source: '/trade&invest/commodities', destination: '/products/commodities' },
      { source: '/trade&invest/indices', destination: '/products/indices' },
      { source: '/trade&invest/stocks', destination: '/products/stocks' },
      { source: '/trade&invest/cryptocurrencies', destination: '/products/cryptocurrencies' },
      { source: '/trade&invest/futures', destination: '/products/futures' },
      { source: '/company', destination: '/about' },
      { source: '/company/:path*', destination: '/about/:path*' },
      { source: '/learn', destination: '/academy' },
      { source: '/learn/:path*', destination: '/academy/:path*' },
    ]
  },

  // ── Experimental ─────────────────────────────────────────────
  experimental: {
    optimizeCss: false,
  },
}

export default nextConfig
