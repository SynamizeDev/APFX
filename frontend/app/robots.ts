import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://apfxglobal.com'

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

