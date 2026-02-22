import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/portal/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
