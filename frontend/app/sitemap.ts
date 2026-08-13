import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://apfxglobal.com'
  const now = new Date()

  type Entry = {
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  }

  const routes: Entry[] = [
    // ── Homepage ────────────────────────────────────────────────
    { path: '', priority: 1.0, changeFrequency: 'daily' },

    // ── Core sitelinks candidates (high priority) ───────────────
    { path: '/products/range', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/platforms', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/tools/copy-trading', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/academy/courses', priority: 0.9, changeFrequency: 'daily' },
    { path: '/partners', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.85, changeFrequency: 'monthly' },

    // ── Products / Markets ───────────────────────────────────────
    { path: '/products/forex', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/products/commodities', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/products/indices', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/products/stocks', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/products/cryptocurrencies', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/products/futures', priority: 0.8, changeFrequency: 'weekly' },

    // ── Accounts ─────────────────────────────────────────────────
    { path: '/accounts', priority: 0.85, changeFrequency: 'weekly' },

    // ── Platforms & Tools ────────────────────────────────────────
    { path: '/ctrader', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tools/economic-calendar', priority: 0.75, changeFrequency: 'daily' },
    { path: '/marketplace', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/pamm', priority: 0.7, changeFrequency: 'monthly' },

    // ── Company ──────────────────────────────────────────────────
    { path: '/about/about-us', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/about/press', priority: 0.6, changeFrequency: 'weekly' },

    // ── Academy ──────────────────────────────────────────────────
    { path: '/academy/glossary', priority: 0.7, changeFrequency: 'monthly' },

    // ── Tools — Calculators ─────────────────────────────────────
    { path: '/tools/calculators/pip', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/calculators/margin', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/calculators/position-size', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/calculators/rebate', priority: 0.6, changeFrequency: 'monthly' },

    // ── Tools — Risk Management ──────────────────────────────────
    { path: '/tools/risk-management/risk-per-trade', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/risk-management/risk-reward', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/risk-management/drawdown-recovery', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/risk-management/portfolio-risk', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/tools/risk-management/position-size', priority: 0.6, changeFrequency: 'monthly' },

    // ── Support ──────────────────────────────────────────────────
    { path: '/support', priority: 0.7, changeFrequency: 'monthly' },

    // ── Legal ────────────────────────────────────────────────────
    { path: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/terms-of-service', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/risk-disclosure', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/account-deletion', priority: 0.3, changeFrequency: 'yearly' },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
