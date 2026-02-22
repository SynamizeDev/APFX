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

  // ── Experimental ─────────────────────────────────────────────
  experimental: {
    optimizeCss: false,
  },
}

export default nextConfig
