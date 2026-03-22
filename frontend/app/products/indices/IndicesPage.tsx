'use client'

import Link from 'next/link'
import {
  Zap,
  TrendingUp,
  Globe2,
  ArrowLeftRight,
  ShieldAlert,
  Layers,
  LineChart,
  SlidersHorizontal,
  LayoutDashboard,
  Calculator,
  GraduationCap,
  Target,
  BarChart3,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './IndicesPage.module.css'

const INDEX_TYPES: { title: string; description: string }[] = [
  {
    title: 'Broad market indices',
    description: 'Track large groups of companies so you can follow a wide slice of the market in one number.',
  },
  {
    title: 'Sector indices',
    description: 'Focus on specific industries—such as technology or energy—rather than the whole market.',
  },
  {
    title: 'Blue-chip indices',
    description: 'Emphasize well-established companies that many investors watch for stability and liquidity.',
  },
  {
    title: 'Volatility indices',
    description: 'Measure how much prices are expected to move—often used as a way to discuss uncertainty.',
  },
]

const BENEFITS = [
  {
    icon: Layers,
    title: 'Diversification across many names',
    body: 'An index bundles many companies or rules into one benchmark, so you are not tied to a single stock story.',
  },
  {
    icon: TrendingUp,
    title: 'Exposure to overall market direction',
    body: 'Indices can help you express a view on broad trends rather than picking individual issuers.',
  },
  {
    icon: BarChart3,
    title: 'Liquidity in widely followed benchmarks',
    body: 'Major index products are often actively discussed and traded, though conditions vary by instrument and time.',
  },
  {
    icon: ShieldAlert,
    title: 'Less single-stock headline risk',
    body: 'One company’s news may matter less to a broad index than to that company’s stock—but risk remains.',
  },
]

const RISKS = [
  {
    icon: Zap,
    title: 'Market-wide volatility',
    body: 'When sentiment shifts, broad benchmarks can move sharply—not only individual names.',
  },
  {
    icon: Globe2,
    title: 'Sensitivity to global events',
    body: 'Rates, growth expectations, and policy headlines can affect indices across regions.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Leverage magnifies losses',
    body: 'Derivatives can increase both gains and losses; size and leverage need to match your plan.',
  },
  {
    icon: LineChart,
    title: 'Macro awareness matters',
    body: 'Indices often reflect big-picture themes; they still carry uncertainty like any market.',
  },
]

const RISK_PRACTICES = [
  'Use stop-loss orders when they fit your plan and you understand how they work on your platform.',
  'Manage position sizes carefully so one idea does not dominate your account.',
  'Avoid over-leveraging—smaller exposure can mean more room when the market moves against you.',
  'Maintain a consistent risk approach: decide rules in advance and review them over time.',
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'Easy-to-use trading platform',
    body: 'A clear layout so you can focus on decisions—not hunting for basic controls.',
  },
  {
    icon: Calculator,
    title: 'Advanced tools and calculators',
    body: 'Plan margin, size, and risk with tools designed for straightforward workflows.',
  },
  {
    icon: GraduationCap,
    title: 'Educational resources for traders',
    body: 'Structured explanations so you can build context at your own pace.',
  },
  {
    icon: Target,
    title: 'Focus on risk-aware trading',
    body: 'We emphasize habits and limits alongside access to markets.',
  },
]

export default function IndicesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroWrap}>
        <InnerPageHero
          title="Trade Global Indices with Confidence"
          subtitle="Learn how major market indices work and how you can trade overall market movements instead of individual assets."
          breadcrumbs={[]}
          omitBottomBorder
        />
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.ctaBtnPrimary}>
            Start Trading
          </Link>
          <a href="#what-are-indices" className={styles.ctaBtnSecondary}>
            Learn More
          </a>
        </div>
      </div>

      <main className={styles.main}>
        <section id="what-are-indices" className={styles.section} aria-labelledby="what-heading">
          <div className={styles.container}>
            <h2 id="what-heading" className={styles.sectionTitle}>
              What Are Indices
            </h2>
            <p className={styles.lead}>
              Market indices represent the performance of a group of companies or assets using a published methodology.
              Instead of trading each name separately, some traders use indices to express a view on a whole segment or
              the broader market.
            </p>
            <p className={styles.lead}>
              Indices are commonly used to describe the direction and tone of financial markets—whether prices, on
              average, are rising, falling, or moving sideways over a period.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-heading">
          <div className={styles.container}>
            <h2 id="how-heading" className={styles.sectionTitle}>
              How Indices Trading Works
            </h2>
            <p className={styles.lead}>
              Indices are often traded using <strong>derivatives</strong> such as <strong>CFDs</strong> or{' '}
              <strong>futures</strong>. In many cases you are focused on <strong>price movement</strong> in the index
              benchmark, not on owning each underlying share yourself.
            </p>
            <p className={styles.sectionSubtitle} style={{ marginBottom: '1rem' }}>
              Key ideas:
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Buy (long)</strong> if you expect the index level to rise.
              </li>
              <li>
                <strong>Sell (short)</strong> if you expect the index level to fall—where permitted by product rules and
                your broker.
              </li>
              <li>
                <strong>Combined performance</strong> — index levels reflect the methodology of the benchmark (weights,
                rules, and adjustments), not any single stock in isolation.
              </li>
            </ul>
            <p className={styles.note}>
              Educational note: Product names, fees, and availability depend on your region and broker. Read the
              disclosure for any instrument before you trade.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>
              Popular Types of Indices
            </h2>
            <p className={styles.sectionSubtitle}>
              These categories describe how benchmarks are built—not a recommendation to trade any specific index.
            </p>
            <ul className={styles.typesGrid}>
              {INDEX_TYPES.map(({ title, description }) => (
                <li key={title} className={styles.categoryCard}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="benefits-heading">
          <div className={styles.container}>
            <h2 id="benefits-heading" className={styles.sectionTitle}>
              Benefits of Trading Indices
            </h2>
            <div className={styles.grid2}>
              {BENEFITS.map(({ icon: Icon, title, body }) => (
                <div key={title} className={styles.featureCard}>
                  <div className={styles.iconRow}>
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risks-heading">
          <div className={styles.container}>
            <h2 id="risks-heading" className={styles.sectionTitle}>
              Risks of Indices Trading
            </h2>
            <p className={styles.sectionSubtitle}>
              Broad benchmarks can still move fast. Understanding risk before you use real money helps you stay
              consistent when conditions change.
            </p>
            <div className={styles.grid2}>
              {RISKS.map(({ icon: Icon, title, body }) => (
                <div key={title} className={styles.featureCard}>
                  <div className={styles.iconRow}>
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="strategies-heading">
          <div className={styles.container}>
            <h2 id="strategies-heading" className={styles.sectionTitle}>
              Basic Indices Trading Strategies
            </h2>
            <p className={styles.sectionSubtitle}>
              Simple frameworks people learn in courses—not promises of results. Pair any approach with sizing and a plan
              for being wrong.
            </p>
            <div className={styles.strategyGrid}>
              <div className={styles.strategyCard}>
                <h3>Trend following</h3>
                <p>
                  Some traders look for periods when the overall market shows a clear direction and try to trade with
                  that momentum while managing risk.
                </p>
              </div>
              <div className={styles.strategyCard}>
                <h3>Breakout strategy</h3>
                <p>
                  Some traders watch levels where price has paused; a decisive move beyond those levels can be a signal—
                  with confirmation and risk limits.
                </p>
              </div>
              <div className={styles.strategyCard}>
                <h3>News-based trading</h3>
                <p>
                  Some traders align decisions with major economic releases and global headlines, using a repeatable
                  process for volatile sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risk-mgmt-heading">
          <div className={styles.container}>
            <h2 id="risk-mgmt-heading" className={styles.sectionTitle}>
              Risk Management in Indices Trading
            </h2>
            <p className={styles.sectionSubtitle}>Practical habits matter more than any single trade.</p>
            <ul className={styles.bulletList}>
              {RISK_PRACTICES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="why-heading">
          <div className={styles.container}>
            <h2 id="why-heading" className={styles.sectionTitle}>
              Why Trade Indices with Us
            </h2>
            <p className={styles.sectionSubtitle}>
              We aim to keep tools accessible and education easy to find.
            </p>
            <div className={styles.whyGrid}>
              {WHY_US.map(({ icon: Icon, title, body }) => (
                <div key={title} className={styles.whyCard}>
                  <Icon size={24} strokeWidth={1.6} aria-hidden />
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.disclaimer}>
              Trading indices and derivatives involves risk and may not be suitable for everyone. Past performance does
              not guarantee future results. This page is for general education only and does not constitute investment,
              tax, or legal advice.
            </p>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="final-cta-heading">
          <div className={styles.container}>
            <h2 id="final-cta-heading" className={styles.ctaTitle}>
              Start trading indices today.
            </h2>
            <p className={styles.ctaSubtitle}>
              Open an account when you are ready, explore our tools, and keep learning—trade only with money you can
              afford to lose.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/register" className={styles.ctaBtnPrimary}>
                Open Trading Account
              </Link>
              <Link href="/tools" className={styles.ctaBtnSecondary}>
                Explore Trading Tools
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomBar />
    </div>
  )
}
