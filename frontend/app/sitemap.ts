import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com'

    const routes = [
        '',
        // Company
        '/company',
        '/company/about-us',
        '/company/press',
        // Trade & Invest
        '/trade&invest/commodities',
        '/trade&invest/indices',
        '/trade&invest/stocks',
        '/trade&invest/cryptocurrencies',
        '/trade&invest/futures',
        // Platforms & Accounts
        '/platforms',
        '/accounts',
        // Learn
        '/learn/blog',
        '/learn/glossary',
        // Tools - Calculators
        '/tools/calculators',
        '/tools/calculators/margin',
        '/tools/calculators/pip',
        '/tools/calculators/position-size',
        '/tools/calculators/rebate',
        // Tools - Other
        '/tools/copy-trading',
        '/tools/risk-management',
        '/tools/risk-management/drawdown-recovery',
        '/tools/risk-management/portfolio-risk',
        '/tools/risk-management/position-size',
        '/tools/risk-management/risk-of-ruin',
        '/tools/risk-management/risk-per-trade',
        '/tools/risk-management/risk-reward',
        // Support & Legal
        '/contact',
        '/support',
        '/partners',
        '/privacy-policy',
        '/terms-of-service',
        '/risk-disclosure',
        // Auth
        '/login',
        '/register',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
