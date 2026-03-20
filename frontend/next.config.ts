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
      { source: '/trade&invest', destination: '/products' },
      { source: '/trade&invest/:path*', destination: '/products/:path*' },
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
