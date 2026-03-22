import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com'

    const routes = [
        '',
        '/company',
        '/trade&invest/commodities',
        '/trade&invest/indices',
        '/trade&invest/cryptocurrencies',
        '/trade&invest/futures',
        '/platforms',
        '/accounts',
        '/contact',
        '/legal/privacy',
        '/legal/terms',
        '/legal/risk-disclosure',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
