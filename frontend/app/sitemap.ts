import { MetadataRoute } from 'next'
import { getActiveJobs } from '@/config/careers'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.apfxglobal.com'
  const now = new Date()

  type Entry = {
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  }

  const activeJobEntries: Entry[] = getActiveJobs().map((job) => ({
    path: `/careers/${job.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly',
  }))

  const routes: Entry[] = [
    // ── Homepage ────────────────────────────────────────────────
    { path: '', priority: 1.0, changeFrequency: 'daily' },

    // ── Core sitelinks candidates (high priority) ───────────────
    { path: '/products/range', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/platforms', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/tools/copy-trading', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/learn/courses', priority: 0.9, changeFrequency: 'daily' },
    { path: '/partners', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.85, changeFrequency: 'monthly' },

    // ── Active Job Openings (if any) ───────────────────────────
    ...activeJobEntries,

    // ── Products / Markets ───────────────────────────────────────
    { path: '/products/forex', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/products/commodities', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/products/indices', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/products/stocks', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/products/cryptocurrencies', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/products/futures', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/products/bonds', priority: 0.8, changeFrequency: 'weekly' },

    // ── Accounts ─────────────────────────────────────────────────
    { path: '/accounts', priority: 0.85, changeFrequency: 'weekly' },

    // ── Platforms & Tools ────────────────────────────────────────
    { path: '/ctrader', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tools/economic-calendar', priority: 0.75, changeFrequency: 'daily' },
    { path: '/marketplace', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/pamm', priority: 0.7, changeFrequency: 'monthly' },

    // ── Company ──────────────────────────────────────────────────
    { path: '/about/about-us', priority: 0.75, changeFrequency: 'monthly' },

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

    // ── Legal & Policies ─────────────────────────────────────────
    { path: '/legal', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/terms-of-service', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/risk-disclosure', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/aml-kyc-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/cookie-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/complaint-handling-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/bonus-terms', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/deposit-withdrawal-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/restricted-countries-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/compliance-tips', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/high-risk-disclaimer', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/payment-disclaimer', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/account-deletion', priority: 0.3, changeFrequency: 'yearly' },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
