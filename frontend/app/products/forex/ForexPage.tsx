'use client'

import Link from 'next/link'
import {
  Zap,
  TrendingUp,
  Globe2,
  ArrowLeftRight,
  ShieldAlert,
  Scale,
  LineChart,
  SlidersHorizontal,
  LayoutDashboard,
  Calculator,
  GraduationCap,
  Target,
  Clock,
  Landmark,
  BarChart3,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import ProductsTabNav from '@/components/navigation/ProductsTabNav'
import styles from './ForexPage.module.css'

/** Angle: liquidity & macro flow — 24/5 mechanics before trading strategies. */

const FOREX_TYPES = [
  {
    title: 'Major Pairs',
    description: 'The most liquid pairs globally, featuring the USD against other leading currencies like EUR, JPY, and GBP.',
  },
  {
    title: 'Minor Pairs',
    description: 'Currency pairs that do not include the USD, such as EUR/GBP or GBP/JPY—often called crosses.',
  },
  {
    title: 'Exotic Pairs',
    description: 'A major currency paired with one from a developing or emerging economy, such as USD/TRY or EUR/ZAR.',
  },
]

const BENEFITS = [
  {
    icon: Globe2,
    title: 'Unrivaled Liquidity',
    body: 'The FX market handles trillions daily, ensuring deep order books and the ability to enter/exit positions at scale.',
  },
  {
    icon: Clock,
    title: '24/5 Market Access',
    body: 'Trading follows the sun—from Sydney to New York—allowing you to react to macro events as they happen.',
  },
  {
    icon: Scale,
    title: 'Bidirectional Opportunity',
    body: 'Currencies are traded in pairs; you are always long one and short another, making it easy to trade any direction.',
  },
  {
    icon: BarChart3,
    title: 'Raw Spreads',
    body: 'Direct access to institutional-grade pricing with spreads starting from 0.0 pips on major pairs.',
  },
]

const RISKS = [
  {
    icon: Zap,
    title: 'Leverage Risk',
    body: 'The same leverage that magnifies gains also magnifies losses—capital can be depleted rapidly if unmanaged.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Volatility Shocks',
    body: 'Central bank decisions or geopolitical news can trigger sharp, unpredictable price movements.',
  },
  {
    icon: LineChart,
    title: 'Overnight Gaps',
    body: 'Liquidity can thin during weekend breaks or holidays, leading to price gaps that bypass stop-loss levels.',
  },
  {
    icon: ShieldAlert,
    title: 'Interest Rate Risk',
    body: 'Changes in national interest rates directly affect currency valuations and swap costs.',
  },
]

const RISK_PRACTICES = [
  'Always define your exit point before clicking entry—market emotion is a poor risk manager.',
  'Monitor economic calendars for high-impact releases (NFP, CPI, Rates) that trigger volatility.',
  'Calculate your position size based on pips at risk, not just available margin.',
  'Maintain a "risk-off" mindset: prioritize capital preservation over high-leverage gambles.',
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'Next-Gen Infrastructure',
    body: 'Low-latency execution engines designed to capture the best available price in milliseconds.',
  },
  {
    icon: Calculator,
    title: 'Precision Margin Tools',
    body: 'Integrated calculators that show your exact exposure and margin requirements in real-time.',
  },
  {
    icon: GraduationCap,
    title: 'Institutional Context',
    body: 'Education that moves beyond "buying dips" to explain interest rate differentials and capital flows.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Flexible Conditions',
    body: 'Account types and leverage settings tailored to professional trading requirements.',
  },
]

export default function ForexPage() {
  return (
    <div className={styles.page}>
      <InnerPageHero
        title="Institutional"
        accent="Products"
        description="Trade every major market from a single, high-performance platform with deep liquidity and tight spreads."
        breadcrumbs={[{ label: 'Products', href: '/products/range' }, { label: 'Forex' }]}
      />
      <ProductsTabNav />

      <main className={styles.main}>
        <section className={styles.section} aria-labelledby="start-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Professional Frame</span>
            <h2 id="start-heading" className={styles.sectionTitle}>
              The 24/5 engine of global finance
            </h2>
            <p className={styles.lead}>
              Foreign exchange is the world&apos;s most liquid market, where national economies meet through their currencies. 
              Long before you open a trade, central banks, multinational corporations, and sovereign wealth funds are 
              shifting capital across borders, creating the trends that traders navigate.
            </p>
            <p className={styles.lead}>
              At APFX, we provide the rails for you to access this flow with the same precision and liquidity 
              formerly reserved for the largest desks in London and New York.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>
              Currency Categories
            </h2>
            <p className={styles.sectionSubtitle}>
              Liquid benchmarks to emerging opportunities—know the spread before you know the story.
            </p>
            <ul className={styles.typesGrid}>
              {FOREX_TYPES.map(({ title, description }) => (
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
              Why traders reach for Forex
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
              Risks that define the tape
            </h2>
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

        <section className={styles.section} aria-labelledby="risk-mgmt-heading">
          <div className={styles.container}>
            <h2 id="risk-mgmt-heading" className={styles.sectionTitle}>
              Risk habits for liquid markets
            </h2>
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
              Trade FX with APFX
            </h2>
            <p className={styles.sectionSubtitle}>
              High-performance infrastructure for traders who demand precision.
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
              Forex trading involves significant risk to your invested capital. Leverage can work for you as well as against you. 
              This page is for educational purposes and does not constitute financial advice.
            </p>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>
              Master the flow. Manage the risk.
            </h2>
            <div className={styles.ctaButtons}>
              <Link href="/tools" className={styles.ctaBtnSecondary}>
                Explore Trading Tools
              </Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
