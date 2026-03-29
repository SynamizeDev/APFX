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

/** Angle: macro trends & benchmark movement — opens with behavior, not definitions. */

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
    title: 'One trade, many names',
    body: 'A benchmark bundles rules and weights—your view is on the basket, not a single press release.',
  },
  {
    icon: TrendingUp,
    title: 'Macro expression',
    body: 'Useful when your thesis is “risk on/off” or “growth vs. defensive” rather than one ticker.',
  },
  {
    icon: BarChart3,
    title: 'Often deep in the big ones',
    body: 'Major index products are widely quoted; spreads and depth still vary by session.',
  },
  {
    icon: ShieldAlert,
    title: 'Headline dilution',
    body: 'Single-stock drama can matter less to a broad index than to that stock—until the drama is systemic.',
  },
]

const RISKS = [
  {
    icon: Zap,
    title: 'Gap risk on macro days',
    body: 'CPI, jobs, central-bank days can move whole benchmarks while you are still reading the first paragraph.',
  },
  {
    icon: Globe2,
    title: 'Everything connects',
    body: 'Rates, FX, and credit can pull indices even when the “equity story” feels local.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Derivatives multiply',
    body: 'Leverage turns a small index move into a large account move—both directions.',
  },
  {
    icon: LineChart,
    title: 'Trends reverse',
    body: 'Macro regimes change; a pattern that worked in one year can punish in the next.',
  },
]

const RISK_PRACTICES = [
  'Tag trades with the macro question you are actually answering—rates, earnings, or something else.',
  'Size for the session: liquidity around the open and on data releases is not the same as midday.',
  'If you use stops, know whether they become market orders and what gaps can do.',
  'Review weekly: did the index move for the reason you named, or did something else drive it?',
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'Benchmark-first layout',
    body: 'Index products and education grouped so you are not hunting through unrelated asset menus.',
  },
  {
    icon: Calculator,
    title: 'Scenario math',
    body: 'Calculators for margin and size so “what if” stays numerical, not emotional.',
  },
  {
    icon: GraduationCap,
    title: 'Macro reading list',
    body: 'Explainers that connect index moves to the reports that actually matter.',
  },
  {
    icon: Target,
    title: 'Risk as a feature',
    body: 'We talk about limits before we talk about leverage.',
  },
]

export default function IndicesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroWrap}>
        <InnerPageHero
          title="Benchmarks, Trends, Macro Moves"
          subtitle="Indices compress thousands of stories into one level. Learn how that number is built—and what still hides inside it."
          breadcrumbs={[]}
          omitBottomBorder
        />
        <p className={styles.heroTagline}>
          Opportunity angle: when the index and the headline disagree, the methodology usually wins—eventually.
        </p>
        <div className={styles.heroActions}>
          <a href="#behavior-insights" className={styles.ctaBtnSecondary}>
            Market behavior first
          </a>
        </div>
      </div>

      <main className={styles.main}>
        <section id="behavior-insights" className={styles.section} aria-labelledby="behavior-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Market behavior insights</span>
            <h2 id="behavior-heading" className={styles.sectionTitle}>
              When the index moves but the news feels wrong
            </h2>
            <div className={styles.insightBanner}>
              <p>
                Benchmarks rebalance, reweight, and absorb corporate actions. A strong stock can leave an index; a
                weak one can stay until rules say otherwise. That is why the same headline can produce different
                reactions in a single name versus the benchmark—useful tension to study before you trade either.
              </p>
            </div>
          </div>
        </section>

        <section id="what-are-indices" className={styles.section} aria-labelledby="what-heading">
          <div className={styles.container}>
            <h2 id="what-heading" className={styles.sectionTitle}>
              What an index actually is
            </h2>
            <p className={styles.lead}>
              A market index is a published rule set: which securities qualify, how they are weighted, and how the level
              is calculated over time. Traders use index products to express views on segments or whole markets without
              building the basket share by share.
            </p>
            <p className={styles.lead}>
              The level you see is a summary statistic—helpful, compressed, and never the full story.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Mechanics</span>
            <h2 id="how-heading" className={styles.sectionTitle}>
              How people trade index direction
            </h2>
            <p className={styles.lead}>
              Index exposure often comes through <strong>CFDs</strong> or <strong>futures</strong>. You are typically
              focused on changes in the benchmark level, not on holding every underlying share.
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Long</strong> when you expect the index level to rise.
              </li>
              <li>
                <strong>Short</strong> when you expect it to fall—if your broker and product allow.
              </li>
              <li>
                <strong>Methodology matters</strong> — the level reflects rules; it is not a simple average of “how
                everyone feels today.”
              </li>
            </ul>
            <p className={styles.note}>
              Educational note: fees, margin, and availability vary. Read disclosures before trading.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>
              Types of benchmarks you will hear named
            </h2>
            <p className={styles.sectionSubtitle}>
              Categories describe construction—not a recommendation to trade any specific index.
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

        <section className={styles.section} aria-labelledby="anatomy-heading">
          <div className={styles.container}>
            <h2 id="anatomy-heading" className={styles.sectionTitle}>
              How an index level is assembled
            </h2>
            <p className={styles.sectionSubtitle}>
              Simplified map—always read the provider’s methodology for the real index you study.
            </p>
            <div className={styles.anatomyDiagram}>
              <div className={styles.anatomyBench}>
                <h3>Universe</h3>
                <ul>
                  <li>Eligibility and liquidity screens</li>
                  <li>Which exchanges and issuers count</li>
                </ul>
              </div>
              <div className={styles.anatomyFlow}>
                <span className={styles.anatomyArrow} aria-hidden>
                  →
                </span>
                <span className={styles.anatomyPill}>Weights &amp; rules</span>
                <span className={styles.anatomyArrow} aria-hidden>
                  →
                </span>
              </div>
              <div className={styles.anatomyBench}>
                <h3>Published level</h3>
                <ul>
                  <li>Rebalances and corporate actions</li>
                  <li>Adjustments on special events</li>
                </ul>
              </div>
            </div>
            <div className={styles.volCallout}>
              <h3>Volatility indices</h3>
              <p>
                Some benchmarks aim at expected movement rather than price direction. They are often used as a
                sentiment thermometer—never as a guarantee of what happens next.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="sessions-heading">
          <div className={styles.container}>
            <h2 id="sessions-heading" className={styles.sectionTitle}>
              Where macro prints land first
            </h2>
            <p className={styles.sectionSubtitle}>
              Stylized regions—sessions overlap; liquidity and volatility vary by time.
            </p>
            <div className={styles.sessionMap}>
              <div className={styles.sessionBlock}>
                <h3>Asia</h3>
                <p>Local benchmarks can react to regional data and overnight risk moves from the Americas.</p>
              </div>
              <div className={styles.sessionBlock}>
                <h3>Europe</h3>
                <p>Central-bank language and cross-border trade headlines often surface here.</p>
              </div>
              <div className={styles.sessionBlock}>
                <h3>Americas</h3>
                <p>
                  Some global participants watch U.S. benchmarks as a proxy for risk appetite—useful context, not a
                  universal law.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="compare-heading">
          <div className={styles.container}>
            <h2 id="compare-heading" className={styles.sectionTitle}>
              Index vs single stock: choosing the right question
            </h2>
            <p className={styles.sectionSubtitle}>
              A comparison of what you are trying to learn—not which is “more profitable.”
            </p>
            <div className={styles.compareTableWrap}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th scope="col">Lens</th>
                    <th scope="col">Broad index</th>
                    <th scope="col">Single stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Primary question</td>
                    <td>Is the segment or market moving?</td>
                    <td>Is this issuer beating or missing its own story?</td>
                  </tr>
                  <tr>
                    <td>Event noise</td>
                    <td>Idiosyncratic news can average out</td>
                    <td>One headline can dominate the tape</td>
                  </tr>
                  <tr>
                    <td>Research style</td>
                    <td>Macro, flows, cross-asset</td>
                    <td>Filings, guidance, competitive positioning</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="benefits-heading">
          <div className={styles.container}>
            <h2 id="benefits-heading" className={styles.sectionTitle}>
              Why traders return to index products
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

        <section className={styles.section} aria-labelledby="macro-scenario-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Hypothetical</span>
            <h2 id="macro-scenario-heading" className={styles.sectionTitle}>
              What if inflation prints colder than the crowd expected?
            </h2>
            <div className={styles.macroScenario}>
              <p className={styles.leadQ}>Pause before you chase the first candle.</p>
              <p>
                Markets can reprice rates, sectors, and factor leadership in minutes. An index might jump while
                individual names inside it diverge. Your job in education is to notice which layer moved—rates
                expectations, earnings risk premia, or something else—before you attach a story to your P&amp;L.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risks-heading">
          <div className={styles.container}>
            <h2 id="risks-heading" className={styles.sectionTitle}>
              What macro traders still fear
            </h2>
            <p className={styles.sectionSubtitle}>
              Simplicity hook: broad does not mean gentle—indices can gap on zero notice.
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

        <section className={styles.section} aria-labelledby="playbook-heading">
          <div className={styles.container}>
            <h2 id="playbook-heading" className={styles.sectionTitle}>
              Three macro drills people actually repeat
            </h2>
            <p className={styles.sectionSubtitle}>
              Not signals—habits. Adapt or ignore; either way, do it consciously.
            </p>
            <div className={styles.playbookGrid}>
              <div className={styles.playbookCard}>
                <h3>Regime check</h3>
                <p>Are rates, credit, and FX pointing the same direction as your equity index view?</p>
              </div>
              <div className={styles.playbookCard}>
                <h3>Calendar discipline</h3>
                <p>Which prints this week could invalidate your thesis without proving you “wrong” forever?</p>
              </div>
              <div className={styles.playbookCard}>
                <h3>Exit clarity</h3>
                <p>If liquidity thins, what is your plan—trim, widen stops (if allowed), or step aside?</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risk-mgmt-heading">
          <div className={styles.container}>
            <h2 id="risk-mgmt-heading" className={styles.sectionTitle}>
              Risk habits for benchmark-sized moves
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
              Trade index ideas with APFX
            </h2>
            <p className={styles.sectionSubtitle}>
              Education and tools for people who want the macro frame and the risk frame together.
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

        <section className={styles.relatedSection} aria-labelledby="related-heading">
          <div className={styles.container}>
            <h2 id="related-heading" className={styles.relatedTitle}>
              Continue learning
            </h2>
            <div className={styles.relatedLinks}>
              <Link href="/trade&invest/stocks">Single-name equities</Link>
              <Link href="/tools/risk-management">Risk tools</Link>
              <Link href="/learn/blog">Blog</Link>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="final-cta-heading">
          <div className={styles.container}>
            <h2 id="final-cta-heading" className={styles.ctaTitle}>
              Build context first—size second.
            </h2>
            <p className={styles.ctaSubtitle}>
              Open an account when you are ready; trade only with money you can afford to lose.
            </p>
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
