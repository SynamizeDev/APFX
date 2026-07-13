import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apfx.com').replace(/\/$/, '')

  return {
    rules: [
      {
        // Standard crawlers
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/portal/',
        ],
      },
      {
        // Google-specific directives (allows rich image/video previews)
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/portal/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

