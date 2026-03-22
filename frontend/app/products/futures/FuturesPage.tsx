'use client'

import Link from 'next/link'
import {
  Zap,
  TrendingUp,
  ArrowLeftRight,
  ShieldAlert,
  CalendarClock,
  Wallet,
  LineChart,
  LayoutDashboard,
  Calculator,
  GraduationCap,
  Scale,
  BarChart3,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './FuturesPage.module.css'

const FUTURES_TYPES: { title: string; description: string }[] = [
  {
    title: 'Commodity futures',
    description:
      'Contracts linked to physical markets such as metals, energy, or agricultural products—each follows exchange rules and specifications.',
  },
  {
    title: 'Index futures',
    description:
      'Based on equity or other benchmarks, offering exposure to a basket or measure rather than a single name.',
  },
  {
    title: 'Currency futures',
    description:
      'Standardized contracts on exchange rates between currencies, traded with published sizes and expiry cycles.',
  },
  {
    title: 'Financial futures',
    description:
      'May include interest-rate-related instruments and other financial underlyings—definitions vary by exchange and contract.',
  },
]

const BENEFITS = [
  {
    icon: TrendingUp,
    title: 'Trade both directions',
    body: 'Futures are often used to express a view that prices will rise or fall, subject to product rules and access.',
  },
  {
    icon: BarChart3,
    title: 'Leverage and margin',
    body: 'Margin can allow larger notional exposure than posting the full value upfront. That increases both potential reward and risk.',
  },
  {
    icon: LineChart,
    title: 'Liquidity in major contracts',
    body: 'Widely traded futures can be active, though liquidity varies by contract, session, and market conditions.',
  },
  {
    icon: Scale,
    title: 'Hedging use cases',
    body: 'Some participants use futures to offset risk elsewhere; others focus on price speculation—goals and risks differ.',
  },
]

const RISKS = [
  {
    icon: ArrowLeftRight,
    title: 'Leverage magnifies losses',
    body: 'Small moves in the underlying can mean large percentage changes in your margin and profit or loss.',
  },
  {
    icon: Zap,
    title: 'Volatility and fast markets',
    body: 'Prices can gap or move quickly; stops may not fill at the exact level you expect.',
  },
  {
    icon: Wallet,
    title: 'Margin can change',
    body: 'Exchanges or brokers may adjust margin requirements, which can affect how much capital you need to hold positions.',
  },
  {
    icon: CalendarClock,
    title: 'Expiration and rolls',
    body: 'Contracts have expiry dates; managing or rolling positions takes planning and may involve extra costs.',
  },
]

const RISK_PRACTICES = [
  'Use stop-loss orders when they fit your plan and you understand how they work in fast or gapping markets.',
  'Monitor margin requirements and free margin so you are not surprised by a margin call.',
  'Avoid over-leveraging—keep position size consistent with your risk limits.',
  'Stay disciplined: define risk per trade and review your rules regularly.',
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'Easy-to-use trading platform',
    body: 'Straightforward workflows so you can focus on the contract and the plan—not the clutter.',
  },
  {
    icon: Calculator,
    title: 'Advanced trading tools and calculators',
    body: 'Support for sizing, margin awareness, and scenario thinking before you place a trade.',
  },
  {
    icon: GraduationCap,
    title: 'Educational resources for traders',
    body: 'Clear explanations for beginners and refreshers for experienced users.',
  },
  {
    icon: ShieldAlert,
    title: 'Focus on responsible trading',
    body: 'We emphasize risk habits alongside access to futures markets.',
  },
]

export default function FuturesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroWrap}>
        <InnerPageHero
          title="Trade Futures with Confidence"
          subtitle="Learn how futures contracts work and how you can trade price movements across different markets."
          breadcrumbs={[]}
          omitBottomBorder
        />
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.ctaBtnPrimary}>
            Start Trading
          </Link>
          <a href="#what-are-futures" className={styles.ctaBtnSecondary}>
            Learn More
          </a>
        </div>
      </div>

      <main className={styles.main}>
        <section id="what-are-futures" className={styles.section} aria-labelledby="what-heading">
          <div className={styles.container}>
            <h2 id="what-heading" className={styles.sectionTitle}>
              What Are Futures
            </h2>
            <p className={styles.lead}>
              Futures are standardized agreements where two sides commit to buy or sell an underlying at an agreed price
              for delivery or cash settlement on a specified date—according to the contract terms published by the
              exchange or clearing arrangement.
            </p>
            <p className={styles.lead}>
              People use futures for different reasons: some aim to speculate on price direction, others seek to offset
              risk tied to production, portfolios, or business needs. The right use depends on your goals, experience,
              and the rules that apply to you.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-heading">
          <div className={styles.container}>
            <h2 id="how-heading" className={styles.sectionTitle}>
              How Futures Trading Works
            </h2>
            <p className={styles.lead}>
              Futures trading lets you express a view on the future price of an underlying without holding the physical
              asset in many cases—your outcomes come from price changes relative to your entry, minus costs and fees.
            </p>
            <p className={styles.sectionSubtitle} style={{ marginBottom: '1rem' }}>
              Key concepts:
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Expiry</strong> — Each contract has a last trading day and settlement process defined by the
                contract specifications.
              </li>
              <li>
                <strong>Long and short</strong> — A <strong>long</strong> position typically benefits if prices rise; a{' '}
                <strong>short</strong> position typically benefits if prices fall—subject to product rules.
              </li>
              <li>
                <strong>Margin</strong> — You post collateral to open and maintain positions; it is not the same as a
                loan, but it ties up capital and can trigger margin calls.
              </li>
              <li>
                <strong>Profit and loss</strong> — Outcomes depend on price movement, position size, fees, and whether
                you hold through events like rolls or expiry.
              </li>
            </ul>
            <p className={styles.note}>
              Educational note: Contract specs, trading hours, and margin rules depend on the exchange and your broker.
              Always read the product documentation before trading.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>
              Types of Futures Contracts
            </h2>
            <p className={styles.sectionSubtitle}>
              Categories are broad; exact names, sizes, and tick values are defined by each contract’s specification.
            </p>
            <ul className={styles.typesGrid}>
              {FUTURES_TYPES.map(({ title, description }) => (
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
              Benefits of Trading Futures
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
              Risks of Futures Trading
            </h2>
            <p className={styles.sectionSubtitle}>
              Futures combine leverage, deadlines, and fast markets. Losses can exceed the margin you first post in some
              situations—check your broker’s terms.
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
              Basic Futures Trading Strategies
            </h2>
            <p className={styles.sectionSubtitle}>
              Simple ideas taught in many courses—not guarantees. Always align strategy with contract specs and your
              risk plan.
            </p>
            <div className={styles.strategyGrid}>
              <div className={styles.strategyCard}>
                <h3>Trend following</h3>
                <p>
                  Some traders try to trade in the direction of sustained momentum, using rules for exits when the
                  trend weakens.
                </p>
              </div>
              <div className={styles.strategyCard}>
                <h3>Spread trading</h3>
                <p>
                  Some traders work with price differences between related contracts (for example, different expiries or
                  related underlyings), aiming for relative-value moves.
                </p>
              </div>
              <div className={styles.strategyCard}>
                <h3>Breakout trading</h3>
                <p>
                  Some traders enter when price moves beyond a level they were watching, with a plan for failed
                  breakouts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risk-mgmt-heading">
          <div className={styles.container}>
            <h2 id="risk-mgmt-heading" className={styles.sectionTitle}>
              Risk Management in Futures Trading
            </h2>
            <p className={styles.sectionSubtitle}>Practical habits reduce surprises.</p>
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
              Why Trade Futures with Us
            </h2>
            <p className={styles.sectionSubtitle}>
              We aim to pair access with education and clear risk thinking.
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
              Futures trading involves substantial risk and is not suitable for all investors. You can lose more than
              your initial margin in some cases. Past performance does not guarantee future results. This page is for
              general education only and does not constitute investment, tax, or legal advice.
            </p>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="final-cta-heading">
          <div className={styles.container}>
            <h2 id="final-cta-heading" className={styles.ctaTitle}>
              Start your futures trading journey today.
            </h2>
            <p className={styles.ctaSubtitle}>
              Open an account when you are ready, explore our tools, and keep learning—trade only with capital you can
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
