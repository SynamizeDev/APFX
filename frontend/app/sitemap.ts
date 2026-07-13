import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apfxglobal.com').replace(/\/$/, '')
  const now = new Date()

  type Entry = {
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  }

  const routes: Entry[] = [
    // ── Homepage ────────────────────────────────────────────────
    { path: '', priority: 1.0, changeFrequency: 'daily' },

    // ── Products / Trade & Invest (canonical paths under /products) ──
    { path: '/products/range', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/forex', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/commodities', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/indices', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/stocks', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/cryptocurrencies', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/futures', priority: 0.9, changeFrequency: 'weekly' },

    // ── Platforms & Accounts ────────────────────────────────────
    { path: '/platforms', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/accounts', priority: 0.9, changeFrequency: 'weekly' },

    // ── Company (canonical paths under /about) ──────────────────
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about/about-us', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about/press', priority: 0.6, changeFrequency: 'weekly' },

    // ── Learn / Academy (canonical paths under /academy) ────────
    { path: '/academy/blog', priority: 0.8, changeFrequency: 'daily' },
    { path: '/academy/glossary', priority: 0.7, changeFrequency: 'monthly' },

    // ── Marketplace ─────────────────────────────────────────────
    { path: '/marketplace', priority: 0.7, changeFrequency: 'weekly' },

    // ── Tools — Calculators ─────────────────────────────────────
    // Index stubs (/tools/calculators, /tools/risk-management) are JS redirects
    // and are intentionally excluded — only the indexable sub-pages are listed.
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

    // ── Tools — Copy Trading ────────────────────────────────────
    { path: '/tools/copy-trading', priority: 0.7, changeFrequency: 'weekly' },

    // ── Partners ────────────────────────────────────────────────
    { path: '/partners', priority: 0.8, changeFrequency: 'monthly' },

    // ── Support & Contact ────────────────────────────────────────
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/support', priority: 0.7, changeFrequency: 'monthly' },

    // ── Legal ────────────────────────────────────────────────────
    { path: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/terms-of-service', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/risk-disclosure', priority: 0.4, changeFrequency: 'yearly' },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}

