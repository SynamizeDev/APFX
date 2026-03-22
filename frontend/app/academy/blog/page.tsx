'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import styles from './Blog.module.css'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'trading-basics', label: 'Trading Basics' },
  { id: 'forex-trading', label: 'Forex Trading' },
  { id: 'technical-analysis', label: 'Technical Analysis' },
  { id: 'risk-management', label: 'Risk Management' },
  { id: 'trading-psychology', label: 'Trading Psychology' },
  { id: 'market-insights', label: 'Market Insights' },
  { id: 'platform-guides', label: 'Platform Guides' },
] as const

type CategoryId = (typeof CATEGORIES)[number]['id']

interface Article {
  slug: string
  title: string
  description: string
  category: CategoryId
  readTime: string
  date: string
}

const FEATURED: Article[] = [
  { slug: 'beginners-guide-forex', title: 'Beginner\'s Guide to Forex Trading', description: 'Understand the basics of currency pairs, pips, lots, and how to place your first trade with confidence.', category: 'forex-trading', readTime: '12 min', date: '2025-03-10' },
  { slug: 'risk-management-strategies', title: 'Risk Management Strategies That Work', description: 'Learn how to size positions, use stop losses, and protect your capital in volatile markets.', category: 'risk-management', readTime: '10 min', date: '2025-03-08' },
  { slug: 'weekly-outlook-march', title: 'Weekly Market Outlook: Key Levels and Events', description: 'A concise look at major pairs, support and resistance, and the economic calendar for the week ahead.', category: 'market-insights', readTime: '6 min', date: '2025-03-09' },
]

const LATEST: Article[] = [
  { slug: 'understanding-leverage', title: 'Understanding Leverage in Forex', description: 'What leverage means, how it amplifies gains and losses, and how to use it responsibly.', category: 'forex-trading', readTime: '8 min', date: '2025-03-12' },
  { slug: 'how-stop-loss-works', title: 'How Stop Loss Works', description: 'Types of stop orders, where to place them, and common mistakes to avoid.', category: 'trading-basics', readTime: '7 min', date: '2025-03-11' },
  { slug: 'technical-analysis-intro', title: 'Introduction to Technical Analysis', description: 'Charts, trends, and key indicators every trader should know.', category: 'technical-analysis', readTime: '9 min', date: '2025-03-10' },
  { slug: 'trading-psychology-discipline', title: 'Trading Psychology: Staying Disciplined', description: 'How to stick to your plan and manage emotions when the market moves against you.', category: 'trading-psychology', readTime: '8 min', date: '2025-03-09' },
  { slug: 'pip-calculator-guide', title: 'How to Use the Pip Calculator', description: 'Step-by-step guide to our Pip Calculator so you know the value of every move.', category: 'platform-guides', readTime: '5 min', date: '2025-03-08' },
  { slug: 'position-size-calculator', title: 'Using the Position Size Calculator', description: 'Size your trades correctly using account balance, risk percentage, and stop loss.', category: 'platform-guides', readTime: '6 min', date: '2025-03-07' },
  { slug: 'forex-economic-events', title: 'Key Economic Events That Move Forex', description: 'Non-farm payrolls, CPI, central bank decisions, and how they affect currency pairs.', category: 'market-insights', readTime: '10 min', date: '2025-03-06' },
  { slug: 'risk-calculators-overview', title: 'Risk Management Tools Overview', description: 'A tour of our risk calculators: risk per trade, drawdown recovery, and risk of ruin.', category: 'platform-guides', readTime: '7 min', date: '2025-03-05' },
]

const EDUCATIONAL_GUIDES = [
  { slug: 'beginners-guide-forex', title: 'Beginner\'s Guide to Forex Trading', description: 'From currency pairs to your first trade.' },
  { slug: 'understanding-leverage', title: 'Understanding Leverage', description: 'How leverage works and how to use it safely.' },
  { slug: 'risk-management-strategies', title: 'Risk Management Strategies', description: 'Protect your capital with proven methods.' },
  { slug: 'how-stop-loss-works', title: 'How Stop Loss Works', description: 'Place and manage stop orders correctly.' },
  { slug: 'how-to-use-trading-calculators', title: 'How to Use Trading Calculators', description: 'Pip, margin, position size, and risk tools.' },
]

const MARKET_INSIGHTS = [
  { slug: 'weekly-outlook-march', title: 'Weekly Market Outlook', description: 'Key levels and catalysts for the week.' },
  { slug: 'forex-market-analysis', title: 'Forex Market Analysis', description: 'Major pairs and sentiment.' },
  { slug: 'forex-economic-events', title: 'Key Economic Events Affecting Markets', description: 'CPI, NFP, and central banks.' },
]

const POPULAR = [
  { slug: 'beginners-guide-forex', title: 'Beginner\'s Guide to Forex Trading' },
  { slug: 'risk-management-strategies', title: 'Risk Management Strategies That Work' },
  { slug: 'understanding-leverage', title: 'Understanding Leverage in Forex' },
  { slug: 'how-stop-loss-works', title: 'How Stop Loss Works' },
  { slug: 'pip-calculator-guide', title: 'How to Use the Pip Calculator' },
]

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

export default function BlogPage() {
  const [category, setCategory] = useState<CategoryId>('all')

  const filteredLatest = useMemo(() => {
    if (category === 'all') return LATEST
    return LATEST.filter((a) => a.category === category)
  }, [category])

  return (
    <>
      <header className={styles.hero}>
        <h1 className={styles.title}>Market Intelligence & Technical Outlook</h1>
        <p className={styles.subtitle}>Professional-grade technical research, fundamental analysis, and institutional perspectives on global market catalysts.</p>
        <Link href="#featured" className={styles.heroCta}>
          Access Research
        </Link>
      </header>

      <div className={styles.container}>
        {/* Featured */}
        <section className={styles.section} id="featured" aria-labelledby="featured-title">
          <h2 id="featured-title" className={styles.sectionTitle}>Featured Research</h2>
          <p className={styles.sectionSubtitle}>Mandatory reading for sophisticated market participants.</p>
          <div className={styles.featuredGrid}>
            {FEATURED.map((a) => (
              <article key={a.slug} className={styles.featuredCard}>
                <div className={styles.featuredImage} aria-hidden>📊</div>
                <div className={styles.featuredBody}>
                  <div className={styles.featuredMeta}>
                    <span className={styles.categoryTag}>{CATEGORIES.find((c) => c.id === a.category)?.label ?? a.category}</span>
                    <span>{a.readTime}</span>
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                  </div>
                  <h2>
                    <Link href={`/learn/blog/${a.slug}`} className={styles.featuredLink}>
                      {a.title}
                    </Link>
                  </h2>
                  <p>{a.description}</p>
                  <Link href={`/learn/blog/${a.slug}`} className={styles.featuredLink}>
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categories + Latest */}
        <section className={styles.section} aria-labelledby="latest-title">
          <h2 id="latest-title" className={styles.sectionTitle}>Latest Articles</h2>
          <p className={styles.sectionSubtitle}>Filter by topic.</p>
          <nav className={styles.categoryBar} aria-label="Research categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`${styles.categoryBtn} ${category === c.id ? styles.categoryBtnActive : ''}`}
                onClick={() => setCategory(c.id)}
                aria-pressed={category === c.id}
              >
                {c.label}
              </button>
            ))}
          </nav>
          <div className={styles.articlesGrid}>
            {filteredLatest.length === 0 ? (
              <p className={styles.sectionSubtitle}>No articles in this category yet.</p>
            ) : (
              filteredLatest.map((a) => (
                <article key={a.slug} className={styles.articleCard}>
                  <div className={styles.articleImage} aria-hidden>📈</div>
                  <div className={styles.articleBody}>
                    <span className={styles.categoryTag}>{CATEGORIES.find((c) => c.id === a.category)?.label ?? a.category}</span>
                    <h3>
                      <Link href={`/learn/blog/${a.slug}`}>{a.title}</Link>
                    </h3>
                    <p className={styles.articleSummary}>{a.description}</p>
                    <p className={styles.articleMeta}>{a.readTime} · {formatDate(a.date)}</p>
                    <Link href={`/learn/blog/${a.slug}`} className={styles.articleLink}>
                      Read Article →
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Educational Guides */}
        <section className={styles.section} aria-labelledby="guides-title">
          <h2 id="guides-title" className={styles.sectionTitle}>Institutional Frameworks</h2>
          <p className={styles.sectionSubtitle}>Long-form guides designed to build a professional foundation for sustainable growth.</p>
          <div className={styles.guidesGrid}>
            {EDUCATIONAL_GUIDES.map((g) => (
              <div key={g.slug} className={styles.guideCard}>
                <span className={styles.guideBadge}>Guide</span>
                <h3>
                  <Link href={`/learn/blog/${g.slug}`}>{g.title}</Link>
                </h3>
                <p className={styles.guideDesc}>{g.description}</p>
                <Link href={`/learn/blog/${g.slug}`} className={styles.guideLink}>
                  Read Guide →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Market Insights + Popular */}
        <div className={`${styles.section} ${styles.twoColSection}`}>
          <section aria-labelledby="insights-title">
            <h2 id="insights-title" className={styles.sectionTitle}>Market Insights</h2>
            <p className={styles.sectionSubtitle}>Weekly outlook and analysis.</p>
            <div className={styles.insightsGrid}>
              {MARKET_INSIGHTS.map((i) => (
                <div key={i.slug} className={styles.insightCard}>
                  <h4>
                    <Link href={`/learn/blog/${i.slug}`}>{i.title}</Link>
                  </h4>
                  <p>{i.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section aria-labelledby="popular-title">
            <h2 id="popular-title" className={styles.sectionTitle}>Popular Articles</h2>
            <p className={styles.sectionSubtitle}>Most read this month.</p>
            <ul className={styles.popularList}>
              {POPULAR.map((p) => (
                <li key={p.slug}>
                  <Link href={`/learn/blog/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Newsletter */}
        <section className={styles.section} aria-labelledby="newsletter-title">
          <div className={styles.newsletterSection}>
            <h2 id="newsletter-title" className={styles.newsletterTitle}>The Weekly Intelligence</h2>
            <p className={styles.newsletterDesc}>
              Curated market briefings, high-signal technical setups, and platform updates. Professional-grade research, delivered weekly.
            </p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className={styles.newsletterInput}
                placeholder="Institutional email address"
                aria-label="Email for briefing"
              />
              <button type="submit" className={styles.newsletterBtn}>
                Subscribe to Briefing
              </button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection} aria-labelledby="cta-title">
          <h2 id="cta-title" className={styles.ctaTitle}>Ready to put learning into practice?</h2>
          <p className={styles.ctaSubtitle}>
            Open an account, try our trading tools, and explore more educational resources.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/register" className={styles.ctaBtnPrimary}>Open Trading Account</Link>
            <Link href="/tools/calculators" className={styles.ctaBtnSecondary}>Trading Calculators</Link>
            <Link href="/tools/risk-management" className={styles.ctaBtnSecondary}>Risk Management Tools</Link>
          </div>
        </section>
      </div>
    </>
  )
}
