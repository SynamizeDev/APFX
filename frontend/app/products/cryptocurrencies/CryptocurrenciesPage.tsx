'use client'

import Link from 'next/link'
import {
  Zap,
  TrendingUp,
  Globe2,
  ArrowLeftRight,
  ShieldAlert,
  Clock,
  LineChart,
  LayoutDashboard,
  Calculator,
  GraduationCap,
  Landmark,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './CryptocurrenciesPage.module.css'

const CRYPTO_TYPES: { title: string; description: string }[] = [
  {
    title: 'Payment-focused cryptocurrencies',
    description:
      'Designed with payments in mind—moving value between people and businesses using network rules and wallets.',
  },
  {
    title: 'Platform-based cryptocurrencies',
    description:
      'Often tied to networks that support applications, contracts, or other services beyond simple transfers.',
  },
  {
    title: 'Stablecoins',
    description:
      'Built to reduce day-to-day price swings compared with many other digital assets—though they are not risk-free.',
  },
  {
    title: 'Utility tokens',
    description:
      'Used within a specific ecosystem—for access, fees, or participation—depending on how the project is structured.',
  },
]

const BENEFITS = [
  {
    icon: Clock,
    title: '24/7 market availability',
    body: 'Many crypto markets trade around the clock, which can suit different schedules—session rules still vary by product and broker.',
  },
  {
    icon: TrendingUp,
    title: 'Volatility can create opportunities',
    body: 'Fast moves mean potential trading interest; they also mean risk can rise just as quickly.',
  },
  {
    icon: Globe2,
    title: 'Growing global participation',
    body: 'Digital assets are discussed worldwide, with adoption and use cases evolving over time.',
  },
  {
    icon: LineChart,
    title: 'Access to digital asset markets',
    body: 'A way to learn and participate in an emerging asset class—always within your experience and local rules.',
  },
]

const RISKS = [
  {
    icon: Zap,
    title: 'High price volatility',
    body: 'Prices can move sharply in short windows, including outside traditional market hours.',
  },
  {
    icon: LineChart,
    title: 'Sentiment and uncertainty',
    body: 'News, social discussion, and shifting expectations can all influence prices.',
  },
  {
    icon: Landmark,
    title: 'Regulatory change',
    body: 'Rules and guidance can evolve; they may affect products, access, or costs in different places.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Leverage magnifies losses',
    body: 'Derivatives and margin can increase both gains and losses—size needs to match your plan.',
  },
]

const RISK_PRACTICES = [
  'Use stop-loss orders when they fit your plan and you understand how they behave on your platform.',
  'Avoid over-leveraging—smaller size can leave more room when the market moves against you.',
  'Manage position sizes so one trade does not dominate your account.',
  'Diversify thoughtfully across ideas; spreading out does not remove risk entirely.',
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'User-friendly trading platform',
    body: 'A layout that keeps common actions within reach so you can focus on decisions.',
  },
  {
    icon: Calculator,
    title: 'Advanced trading tools and calculators',
    body: 'Plan size, margin, and risk with tools built for clarity.',
  },
  {
    icon: GraduationCap,
    title: 'Educational resources for all levels',
    body: 'Structured explanations whether you are new or refining your process.',
  },
  {
    icon: ShieldAlert,
    title: 'Responsible, risk-aware trading',
    body: 'We emphasize habits and limits alongside access to markets.',
  },
]

export default function CryptocurrenciesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroWrap}>
        <InnerPageHero
          title="Trade Cryptocurrencies with Confidence"
          subtitle="Learn how digital assets work and how you can participate in the fast-growing world of cryptocurrency trading."
          breadcrumbs={[]}
          omitBottomBorder
        />
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.ctaBtnPrimary}>
            Start Trading
          </Link>
          <a href="#what-are-cryptocurrencies" className={styles.ctaBtnSecondary}>
            Learn More
          </a>
        </div>
      </div>

      <main className={styles.main}>
        <section
          id="what-are-cryptocurrencies"
          className={styles.section}
          aria-labelledby="what-heading"
        >
          <div className={styles.container}>
            <h2 id="what-heading" className={styles.sectionTitle}>
              What Are Cryptocurrencies
            </h2>
            <p className={styles.lead}>
              Cryptocurrencies are digital assets that often rely on distributed ledger technology to record transactions
              and network rules. Many are designed to operate without relying on a single central authority, enabling
              peer-to-peer transfers with transparency anchored in the protocol.
            </p>
            <p className={styles.lead}>
              Projects differ widely in purpose, design, and risk. What they share in common is that markets treat them as
              tradable instruments whose prices change as participants buy, sell, and reassess expectations.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-heading">
          <div className={styles.container}>
            <h2 id="how-heading" className={styles.sectionTitle}>
              How Cryptocurrency Trading Works
            </h2>
            <p className={styles.lead}>
              On many trading platforms, users trade <strong>derivatives</strong> or other products that track crypto
              prices—so you may be expressing a view on price movement rather than holding coins in a personal wallet,
              depending on the product.
            </p>
            <p className={styles.sectionSubtitle} style={{ marginBottom: '1rem' }}>
              Key concepts:
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Buy (long)</strong> if you expect the price to rise.
              </li>
              <li>
                <strong>Sell (short)</strong> if you expect the price to fall—where permitted by product rules and your
                broker.
              </li>
              <li>
                <strong>24/7 trading</strong> — many crypto markets are quoted continuously; liquidity and spreads can
                still vary by time and instrument.
              </li>
              <li>
                <strong>Drivers of price</strong> — demand, adoption stories, liquidity, and overall sentiment all play
                a role, alongside wider macro conditions.
              </li>
            </ul>
            <p className={styles.note}>
              Educational note: Product types, custody, taxes, and availability depend on your region and broker. Read
              disclosures carefully before you trade.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>
              Popular Types of Cryptocurrencies
            </h2>
            <p className={styles.sectionSubtitle}>
              Broad categories used in education—not a list of tokens to buy or sell.
            </p>
            <ul className={styles.typesGrid}>
              {CRYPTO_TYPES.map(({ title, description }) => (
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
              Benefits of Cryptocurrency Trading
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
              Risks of Cryptocurrency Trading
            </h2>
            <p className={styles.sectionSubtitle}>
              Digital asset markets can move quickly. Understanding risk before you commit real capital helps you stay
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
              Basic Cryptocurrency Trading Strategies
            </h2>
            <p className={styles.sectionSubtitle}>
              Simple frameworks people learn in courses—not promises of results. Pair any idea with sizing and a plan for
              being wrong.
            </p>
            <div className={styles.strategyGrid}>
              <div className={styles.strategyCard}>
                <h3>Trend following</h3>
                <p>
                  Some traders try to trade in the direction of clear momentum, using rules for when the trend may have
                  changed.
                </p>
              </div>
              <div className={styles.strategyCard}>
                <h3>Breakout trading</h3>
                <p>
                  Some traders watch ranges and enter when price moves decisively beyond a level they were tracking—with
                  confirmation and risk limits.
                </p>
              </div>
              <div className={styles.strategyCard}>
                <h3>Swing trading</h3>
                <p>
                  Some traders aim for moves over days or weeks rather than minutes, still using stops and position
                  limits.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risk-mgmt-heading">
          <div className={styles.container}>
            <h2 id="risk-mgmt-heading" className={styles.sectionTitle}>
              Risk Management in Crypto Trading
            </h2>
            <p className={styles.sectionSubtitle}>Habits matter more than any single trade.</p>
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
              Why Trade Cryptocurrencies with Us
            </h2>
            <p className={styles.sectionSubtitle}>
              We aim to combine approachable tools with clear education.
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
              Trading cryptocurrencies and related products involves significant risk and may not be suitable for
              everyone. Past performance does not guarantee future results. This page is for general education only and
              does not constitute investment, tax, or legal advice.
            </p>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="final-cta-heading">
          <div className={styles.container}>
            <h2 id="final-cta-heading" className={styles.ctaTitle}>
              Start your cryptocurrency trading journey today.
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
