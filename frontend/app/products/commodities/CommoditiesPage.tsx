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
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './CommoditiesPage.module.css'

const BENEFITS = [
  {
    icon: Scale,
    title: 'Diversification beyond stocks and forex',
    body: 'Commodity markets can follow different drivers than equities or currency pairs, which some traders use to broaden what they follow.',
  },
  {
    icon: Globe2,
    title: 'Trade global macro themes',
    body: 'Energy use, weather, and large-scale economic stories are often part of how people learn commodity markets.',
  },
  {
    icon: TrendingUp,
    title: 'Liquidity in major names',
    body: 'Widely discussed commodities are often actively traded, though liquidity varies by product and session.',
  },
  {
    icon: ShieldAlert,
    title: 'A lens on inflation and costs',
    body: 'Some traders study commodities when they think about how prices for goods and energy change over time—not as a guarantee of protection.',
  },
]

const RISKS = [
  {
    icon: Zap,
    title: 'Price volatility',
    body: 'News and shifting expectations can move prices quickly.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Leverage magnifies losses',
    body: 'Using leverage can increase both gains and losses; it needs to fit your plan.',
  },
  {
    icon: LineChart,
    title: 'Market unpredictability',
    body: 'Even careful preparation cannot remove uncertainty.',
  },
  {
    icon: Target,
    title: 'Discipline and risk management',
    body: 'Sustainable participation usually depends on rules you set before you trade.',
  },
]

const RISK_PRACTICES = [
  'Use stop-loss orders when they fit your plan and you understand how they work on your platform.',
  'Avoid over-leveraging—smaller size can mean less stress when the market moves against you.',
  'Risk only a small percentage of your account on a single idea, within limits you decide in advance.',
  'Diversify thoughtfully across ideas; spreading out does not remove risk entirely.',
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'Easy-to-use trading platform',
    body: 'An interface designed so you can focus on your workflow—not fighting the tools.',
  },
  {
    icon: Calculator,
    title: 'Advanced tools and calculators',
    body: 'Plan position size, margin, and risk with calculators built for clarity.',
  },
  {
    icon: GraduationCap,
    title: 'Educational resources for beginners',
    body: 'Structured content so you are not learning commodity basics alone.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Focus on risk management',
    body: 'We emphasize responsible habits alongside market access.',
  },
]

export default function CommoditiesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroWrap}>
        <InnerPageHero
          title="Trade Commodities with Confidence"
          subtitle="Learn how commodities like gold, oil, and agricultural products are traded in global markets and how you can get started."
          breadcrumbs={[]}
          omitBottomBorder
        />
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.ctaBtnPrimary}>
            Start Trading
          </Link>
          <a href="#what-are-commodities" className={styles.ctaBtnSecondary}>
            Learn More
          </a>
        </div>
      </div>

      <main className={styles.main}>
        <section
          id="what-are-commodities"
          className={styles.section}
          aria-labelledby="what-heading"
        >
          <div className={styles.container}>
            <h2 id="what-heading" className={styles.sectionTitle}>
              What Are Commodities
            </h2>
            <p className={styles.lead}>
              Commodities are basic raw materials or primary goods that are bought and sold around the world. They
              include natural resources and farm products that people and businesses use every day.
            </p>
            <p className={styles.lead}>
              Commodities are often grouped into categories such as:
            </p>
            <ul className={styles.categoryList}>
              <li className={styles.categoryCard}>
                <strong>Metals</strong>
                <span>Gold, silver</span>
              </li>
              <li className={styles.categoryCard}>
                <strong>Energy</strong>
                <span>Crude oil, natural gas</span>
              </li>
              <li className={styles.categoryCard}>
                <strong>Agriculture</strong>
                <span>Wheat, corn, coffee</span>
              </li>
            </ul>
            <p className={styles.lead} style={{ marginTop: '1.75rem' }}>
              These markets matter because commodities touch many parts of the global economy—from manufacturing and
              transport to food and energy.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-heading">
          <div className={styles.container}>
            <h2 id="how-heading" className={styles.sectionTitle}>
              How Commodities Trading Works
            </h2>
            <p className={styles.lead}>
              Many people trade commodities using <strong>derivatives</strong>—instruments whose price follows the
              underlying commodity. Common examples include <strong>futures</strong> and{' '}
              <strong>contracts for difference (CFDs)</strong>. In these cases, the focus is usually on{' '}
              <strong>price movement</strong>, not on storing or delivering the physical goods yourself.
            </p>
            <p className={styles.sectionSubtitle} style={{ marginBottom: '1rem' }}>
              Key ideas to understand:
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Supply and demand</strong> — When supply is tight or demand rises, prices may move up; the
                opposite can push prices down.
              </li>
              <li>
                <strong>Global events</strong> — Weather, policy, and major economic stories can change how traders
                view future supply and demand.
              </li>
              <li>
                <strong>Buying and selling</strong> — Traders may look for opportunities when they expect prices to
                rise (a <strong>long</strong> view) or when they expect prices to fall (a <strong>short</strong> view).
              </li>
            </ul>
            <p className={styles.note}>
              Educational note: How these products work—including fees, rules, and whether they are available to you—depends
              on your region and your broker. Always read the product information before you trade.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="popular-heading">
          <div className={styles.container}>
            <h2 id="popular-heading" className={styles.sectionTitle}>
              Popular Commodities to Trade
            </h2>
            <p className={styles.sectionSubtitle}>
              Below are commonly discussed names in educational materials. This is general information only—not a
              recommendation to buy or sell any instrument.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Commodity</th>
                    <th scope="col">Why it often comes up</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tableName}>Gold</td>
                    <td>Often discussed when people talk about uncertainty or long-term store-of-value themes.</td>
                  </tr>
                  <tr>
                    <td className={styles.tableName}>Crude oil</td>
                    <td>Closely tied to global energy demand and frequently in the news when conditions shift.</td>
                  </tr>
                  <tr>
                    <td className={styles.tableName}>Silver</td>
                    <td>Talked about both as a traded metal and for industrial uses.</td>
                  </tr>
                  <tr>
                    <td className={styles.tableName}>Natural gas</td>
                    <td>Often linked to seasonal demand and regional weather-related stories.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="benefits-heading">
          <div className={styles.container}>
            <h2 id="benefits-heading" className={styles.sectionTitle}>
              Benefits of Trading Commodities
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
              Risks of Commodities Trading
            </h2>
            <p className={styles.sectionSubtitle}>
              Commodity prices can move quickly. It helps to understand risks clearly before you put real money at risk.
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
              Basic Commodities Trading Strategies
            </h2>
            <p className={styles.sectionSubtitle}>
              Simple frameworks people learn about in courses and guides—not promises of results. Always pair any
              approach with position sizing and a plan for when the market moves against you.
            </p>
            <div className={styles.strategyGrid}>
              <div className={styles.strategyCard}>
                <h3>Trend following</h3>
                <p>
                  Some traders try to trade in the same general direction as a market that has been moving with momentum,
                  while managing risk along the way.
                </p>
              </div>
              <div className={styles.strategyCard}>
                <h3>Breakout trading</h3>
                <p>
                  Some traders watch when price moves beyond a level they were tracking, then decide whether to act—with
                  a plan for being wrong.
                </p>
              </div>
              <div className={styles.strategyCard}>
                <h3>News-based trading</h3>
                <p>
                  Some traders follow economic calendars and major headlines, then rely on a personal process for fast
                  markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risk-mgmt-heading">
          <div className={styles.container}>
            <h2 id="risk-mgmt-heading" className={styles.sectionTitle}>
              Risk Management in Commodities
            </h2>
            <p className={styles.sectionSubtitle}>Sound habits matter more than any single trade.</p>
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
              Why Trade Commodities with Us
            </h2>
            <p className={styles.sectionSubtitle}>
              We aim to make your learning path clear and your tools easy to find.
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
              Trading commodities and derivatives involves risk and may not be suitable for everyone. Past performance
              does not guarantee future results. This page is for general education only and does not constitute
              investment, tax, or legal advice.
            </p>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="final-cta-heading">
          <div className={styles.container}>
            <h2 id="final-cta-heading" className={styles.ctaTitle}>
              Start your commodities trading journey today.
            </h2>
            <p className={styles.ctaSubtitle}>
              When you are ready, open an account, explore our tools, and keep learning—trade only with money you can
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
