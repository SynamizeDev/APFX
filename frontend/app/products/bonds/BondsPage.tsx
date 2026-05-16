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
  Landmark,
  ShieldCheck,
  BarChart3,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import ProductsTabNav from '@/components/navigation/ProductsTabNav'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './BondsPage.module.css'

/** Angle: fixed income & interest rates — the foundation of macro trading. */

const BOND_TYPES = [
  {
    title: 'US Treasuries',
    description: 'The global benchmark for debt, highly sensitive to Fed policy and global risk appetite.',
  },
  {
    title: 'European Sovereigns',
    description: 'Debt from major EU economies like Germany (Bunds) and France (OATs), reflecting Eurozone stability.',
  },
  {
    title: 'UK Gilts',
    description: 'British government bonds, key for understanding Sterling-denominated debt and BoE policy.',
  },
]

const BENEFITS = [
  {
    icon: Landmark,
    title: 'Macro Sensitivity',
    body: 'Bonds are the purest expression of interest rate and inflation expectations—essential for macro-focused traders.',
  },
  {
    icon: ShieldCheck,
    title: 'Portfolio Balancing',
    body: 'Often used to hedge equity risk, bonds can provide stability when broader markets face volatility.',
  },
  {
    icon: Scale,
    title: 'Standardized Contracts',
    body: 'Trade highly standardized debt instruments as CFDs with clear pricing and deep liquidity.',
  },
  {
    icon: BarChart3,
    title: 'Yield Curve Analysis',
    body: 'Monitor the relationship between short and long-term debt to anticipate economic cycles.',
  },
]

const RISKS = [
  {
    icon: TrendingUp,
    title: 'Interest Rate Risk',
    body: 'Bond prices move inversely to interest rates—when rates rise, existing bond valuations fall.',
  },
  {
    icon: Zap,
    title: 'Inflation Risk',
    body: 'Unexpected inflation erodes the real value of fixed payments, leading to sharp sell-offs in debt markets.',
  },
  {
    icon: ShieldAlert,
    title: 'Credit Risk',
    body: 'While sovereign debt is considered high-quality, shifts in fiscal policy or ratings can impact pricing.',
  },
  {
    icon: LineChart,
    title: 'Liquidity Risk',
    body: 'Even in treasury markets, extreme volatility can lead to wider spreads and execution challenges.',
  },
]

const RISK_PRACTICES = [
  'Understand the inverse relationship: when yields go up, your long position in bond prices goes down.',
  'Track Central Bank meetings religiously—policy pivots are the primary driver of bond volatility.',
  'Match your size to the duration of the bond; longer-term debt is generally more volatile than short-term.',
  'Monitor the "Risk-On / Risk-Off" sentiment—bonds are a primary safe-haven destination.',
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'Professional Desktop',
    body: 'A focused environment for tracking yields and spreads without unnecessary distractions.',
  },
  {
    icon: Calculator,
    title: 'Advanced Sizing Tools',
    body: 'Calculators designed for the unique pricing and margin requirements of fixed income CFDs.',
  },
  {
    icon: GraduationCap,
    title: 'Fixed Income Primers',
    body: 'Curated education that explains the mechanics of the yield curve and sovereign risk.',
  },
  {
    icon: Target,
    title: 'Precision Execution',
    body: 'Reliable fills in the world&apos;s largest and most important financial markets.',
  },
]

export default function BondsPage() {
  return (
    <div className={styles.page}>
      <InnerPageHero
        title="Institutional"
        accent="Products"
        description="Trade every major market from a single, high-performance platform with deep liquidity and tight spreads."
        breadcrumbs={[{ label: 'Products', href: '/products/range' }, { label: 'Bonds' }]}
      />
      <ProductsTabNav />

      <main className={styles.main}>
        <section className={styles.section} aria-labelledby="start-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Professional Frame</span>
            <h2 id="start-heading" className={styles.sectionTitle}>
              The sovereign debt baseline
            </h2>
            <p className={styles.lead}>
              Fixed income markets are the foundation of the global financial system. They set the &quot;risk-free&quot; rate 
              that influences every other asset class—from mortgages to equity valuations. When bond markets move, 
              the entire world of finance listens.
            </p>
            <p className={styles.lead}>
              At APFX, we offer access to these benchmarks through standardized CFD contracts, allowing you to 
              express views on national policy, inflation trends, and global capital flows.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>
              Sovereign Benchmarks
            </h2>
            <p className={styles.sectionSubtitle}>
              The most significant debt instruments in the global market, providing deep liquidity and clear signals.
            </p>
            <ul className={styles.typesGrid}>
              {BOND_TYPES.map(({ title, description }) => (
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
              The Macro Utility of Bonds
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
              Risks that survival backtests
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
              Risk habits for debt markets
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
              Trade Bonds with APFX
            </h2>
            <p className={styles.sectionSubtitle}>
              Infrastructure for traders who respect the baseline of global finance.
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
              Trading debt instruments involves substantial risk. Small moves in interest rates can lead to significant price swings in bond CFDs. 
              Always read the product specifications and margin requirements before trading.
            </p>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>
              Track the rates. Size the exposure.
            </h2>
            <div className={styles.ctaButtons}>
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
