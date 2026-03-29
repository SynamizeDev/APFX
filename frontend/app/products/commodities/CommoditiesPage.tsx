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
  CloudSun,
  Package,
  Landmark,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './CommoditiesPage.module.css'

/** Angle: real-world assets & global demand — flow starts with “why it matters”, not definitions. */
const BENEFITS = [
  {
    icon: Globe2,
    title: 'A different map of the world',
    body: 'Commodity curves often react to shipping lanes, weather, and inventories—useful when you want stories beyond quarterly earnings.',
  },
  {
    icon: Scale,
    title: 'Exposure without picking one mine or one field',
    body: 'Derivatives can track broad themes in energy or metals, though concentration and leverage still need a plan.',
  },
  {
    icon: TrendingUp,
    title: 'Liquid names, uneven sessions',
    body: 'Major contracts are widely discussed, but depth changes by time zone and headline risk.',
  },
  {
    icon: ShieldAlert,
    title: 'Inflation language, not inflation insurance',
    body: 'People study commodities when costs of living make headlines—markets can still move against any thesis.',
  },
]

const RISKS = [
  {
    icon: Zap,
    title: 'Shock-driven gaps',
    body: 'Weather, geopolitics, or inventory surprises can reprice expectations faster than some equity stories.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Leverage cuts both ways',
    body: 'The same tool that magnifies a correct view magnifies mistakes—size is a decision, not a default.',
  },
  {
    icon: LineChart,
    title: 'Correlation is not a promise',
    body: 'Commodities do not always diversify your portfolio the way spreadsheets suggest.',
  },
  {
    icon: Target,
    title: 'Discipline beats conviction',
    body: 'A plan written in calm hours survives volatile ones better than a gut feeling.',
  },
]

const RISK_PRACTICES = [
  'Cap risk per idea before you enter—then treat that cap as part of the strategy, not a suggestion.',
  'Re-read how stops work on your platform; fast markets can fill away from the level you had in mind.',
  'Separate “news interest” from “trade size”; excitement is not a position-sizing method.',
  'Journal one line per trade: thesis, invalidation, actual exit—boring data beats memory.',
]

const MACRO_DRIVERS = [
  {
    icon: CloudSun,
    title: 'Weather & growing conditions',
    body: 'Harvest outlooks and weather patterns can shift expectations for crops and some energy demand.',
  },
  {
    icon: Package,
    title: 'Inventories & stockpiles',
    body: 'Storage levels and supply reports are common themes when people discuss whether a market feels tight or ample.',
  },
  {
    icon: Landmark,
    title: 'Policy & producer groups',
    body: 'Export rules, production targets, and coordinated supply decisions can appear in educational discussions.',
  },
  {
    icon: Globe2,
    title: 'Macro & currency',
    body: 'Dollar strength, growth expectations, and cross-border demand can all influence how commodity prices are discussed.',
  },
]

const CATEGORY_EXPLORER = [
  {
    title: 'Metals',
    body: 'Gold and silver often come up when people talk about uncertainty, inflation themes, and industrial demand. Supply from mining and recycling also matters over longer horizons.',
  },
  {
    title: 'Energy',
    body: 'Oil and gas prices are frequently linked to global demand, geopolitical headlines, and seasonal heating or cooling needs.',
  },
  {
    title: 'Agriculture',
    body: 'Grains and softs can be sensitive to planting progress, weather during the growing season, and harvest yields in major producing regions.',
  },
]

const SEASONAL_NOTES = [
  {
    label: 'Q1',
    text: 'Northern-hemisphere winter demand for heating fuels; start-of-year positioning after holidays.',
  },
  {
    label: 'Q2',
    text: 'Spring planting updates for crops; maintenance and refinery schedules can matter for refined products.',
  },
  {
    label: 'Q3',
    text: 'Growing-season weather and hurricane-season headlines for energy and logistics.',
  },
  {
    label: 'Q4',
    text: 'Harvest supply for many crops; year-end portfolio and tax-related flows in broader markets.',
  },
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'Workspace that stays out of your way',
    body: 'Clear controls so you spend attention on the story in the market—not on hunting buttons.',
  },
  {
    icon: Calculator,
    title: 'Sizing and margin tools',
    body: 'Turn “how much could this move me?” into numbers before you commit.',
  },
  {
    icon: GraduationCap,
    title: 'Structured primers',
    body: 'Commodity vocabulary in order—so you are not piecing blogs together alone.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Risk-first onboarding',
    body: 'We pair access with reminders that markets owe nobody a smooth ride.',
  },
]

export default function CommoditiesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroWrap}>
        <InnerPageHero
          title="Real Assets, Global Demand"
          subtitle="Commodities are where weather, logistics, and policy meet a price. Learn how derivative markets translate that world into trades you can actually manage."
          breadcrumbs={[]}
          omitBottomBorder
        />
        <p className={styles.heroTagline}>
          Curiosity hook: every commodity chart is downstream of something physical—start by asking what had to happen in the real economy first.
        </p>
        <div className={styles.heroActions}>
          <a href="#why-world" className={styles.ctaBtnSecondary}>
            Why it matters
          </a>
        </div>
      </div>

      <main className={styles.main}>
        <section id="why-world" className={styles.section} aria-labelledby="why-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Start here</span>
            <h2 id="why-heading" className={styles.sectionTitle}>
              Why the physical world still sets the table
            </h2>
            <p className={styles.lead}>
              Long before a derivative prints on your screen, someone mined, drilled, planted, or stored something.
              Commodity markets are one of the few places where a storm, a pipeline outage, or a harvest report can
              dominate the day&apos;s narrative—often without a single CEO on a conference call.
            </p>
            <p className={styles.lead}>
              That does not make commodities “better” than stocks. It means your prep work sounds different: less
              guidance, more supply chains.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="story-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Real-world vignette</span>
            <h2 id="story-heading" className={styles.sectionTitle}>
              A story most spreadsheets skip
            </h2>
            <div className={styles.storyCard}>
              <h3>Grain on the water</h3>
              <p>
                Imagine export inspections run lighter than traders expected. The headline might be one sentence, but
                the underlying story is ships, ports, and competing harvests half a world away. In education, people use
                vignettes like this to remember: commodity prices often embed a whole logistics chain—not just “bullish
                or bearish.”
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>How it works</span>
            <h2 id="how-heading" className={styles.sectionTitle}>
              From warehouse headlines to the price on your platform
            </h2>
            <p className={styles.lead}>
              Most retail participants access commodities through <strong>derivatives</strong> whose value tracks an
              underlying—commonly <strong>futures</strong> or <strong>CFDs</strong>. You are usually expressing a view on{' '}
              <strong>price change</strong>, not taking delivery of barrels in your garage.
            </p>
            <ol className={styles.stepsList}>
              <li>
                <strong>Pick the story you are testing</strong> — supply tightness, demand rebound, currency shift, or
                something else.
              </li>
              <li>
                <strong>Match it to a product</strong> — contract specs decide tick size, hours, and margin; read the
                sheet.
              </li>
              <li>
                <strong>Define wrong</strong> — decide in advance what evidence would invalidate the trade, not just
                what would confirm it.
              </li>
            </ol>
            <p className={styles.note}>
              Educational note: availability, leverage, and fees depend on your region and broker—always read the
              disclosure before trading.
            </p>
          </div>
        </section>

        <section
          id="what-are-commodities"
          className={styles.section}
          aria-labelledby="what-heading"
        >
          <div className={styles.container}>
            <h2 id="what-heading" className={styles.sectionTitle}>
              What counts as a commodity (in plain terms)
            </h2>
            <p className={styles.lead}>
              Commodities are raw or primary goods traded in bulk—metals, energy, agricultural products, and more. They
              are often interchangeable within a grade, which is why global benchmarks exist.
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
          </div>
        </section>

        <section className={styles.section} aria-labelledby="contrast-heading">
          <div className={styles.container}>
            <h2 id="contrast-heading" className={styles.sectionTitle}>
              Commodities vs equities: different questions
            </h2>
            <div className={styles.contrastCard}>
              <h3>Same broker, different interview</h3>
              <p>
                Equities often invite you to ask about management and margins. Commodities invite you to ask about tons,
                barrels, bushels, and miles. Neither question list is safer—just different failure modes.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="drivers-heading">
          <div className={styles.container}>
            <h2 id="drivers-heading" className={styles.sectionTitle}>
              Forces that show up in commodity conversations
            </h2>
            <p className={styles.sectionSubtitle}>
              Themes people study—not a forecast. Overlap is normal.
            </p>
            <div className={styles.driverStrip}>
              {MACRO_DRIVERS.map(({ icon: Icon, title, body }) => (
                <div key={title} className={styles.driverChip}>
                  <Icon size={22} strokeWidth={1.75} aria-hidden />
                  <div>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="explorer-heading">
          <div className={styles.container}>
            <h2 id="explorer-heading" className={styles.sectionTitle}>
              Pick a lane—then read what usually matters there
            </h2>
            <p className={styles.sectionSubtitle}>
              Expand a bucket to see typical talking points in courses and research—not trade instructions.
            </p>
            <div className={styles.explorer}>
              {CATEGORY_EXPLORER.map(({ title, body }) => (
                <details key={title}>
                  <summary>{title}</summary>
                  <div className={styles.detailBody}>{body}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="season-heading">
          <div className={styles.container}>
            <h2 id="season-heading" className={styles.sectionTitle}>
              Rhythms on the calendar (illustrative)
            </h2>
            <p className={styles.sectionSubtitle}>
              Traders sometimes frame quarters as story arcs—real weather and policy still surprise every year.
            </p>
            <div className={styles.seasonGrid}>
              {SEASONAL_NOTES.map(({ label, text }) => (
                <div key={label} className={styles.seasonCard}>
                  <h3>{label}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="popular-heading">
          <div className={styles.container}>
            <h2 id="popular-heading" className={styles.sectionTitle}>
              Names that show up early in coursework
            </h2>
            <p className={styles.sectionSubtitle}>
              Familiar examples for vocabulary—not a buy list.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Commodity</th>
                    <th scope="col">Why it enters the conversation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tableName}>Gold</td>
                    <td>Often tied to discussions of uncertainty and long-horizon store-of-value themes.</td>
                  </tr>
                  <tr>
                    <td className={styles.tableName}>Crude oil</td>
                    <td>Linked to global energy use and frequent macro headlines.</td>
                  </tr>
                  <tr>
                    <td className={styles.tableName}>Silver</td>
                    <td>Discussed as both a precious metal and an industrial input.</td>
                  </tr>
                  <tr>
                    <td className={styles.tableName}>Natural gas</td>
                    <td>Seasonal heating and regional infrastructure stories.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="benefits-heading">
          <div className={styles.container}>
            <h2 id="benefits-heading" className={styles.sectionTitle}>
              What draws people to commodity markets
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

        <section className={styles.section} aria-labelledby="scenario-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Hypothetical</span>
            <h2 id="scenario-heading" className={styles.sectionTitle}>
              What if tomorrow&apos;s inventory print surprises everyone?
            </h2>
            <div className={styles.scenarioBlock}>
              <p className={styles.scenarioQ}>Think it through before you size up.</p>
              <p>
                Suppose a weekly report shows stockpiles far from consensus. Price might gap. Liquidity can thin. Your
                stop might execute away from the level you pictured. None of that tells you whether to trade—it reminds
                you that fast prints reward plans written in advance, not adrenaline.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risks-heading">
          <div className={styles.container}>
            <h2 id="risks-heading" className={styles.sectionTitle}>
              What experienced participants still respect
            </h2>
            <p className={styles.sectionSubtitle}>
              Fear hook: the market does not care that you “almost” had the thesis right.
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

        <section className={styles.section} aria-labelledby="lenses-heading">
          <div className={styles.container}>
            <h2 id="lenses-heading" className={styles.sectionTitle}>
              Three lenses—not three guarantees
            </h2>
            <p className={styles.sectionSubtitle}>
              Simple frameworks educators use. Pair with size limits every time.
            </p>
            <div className={styles.lensGrid}>
              <div className={styles.lensCard}>
                <h3>Flow story</h3>
                <p>Who needs the commodity now, who can wait, and what could change either side next week?</p>
              </div>
              <div className={styles.lensCard}>
                <h3>Stock story</h3>
                <p>Is inventory tight, ample, or uncertain—and how fast could that flip on new data?</p>
              </div>
              <div className={styles.lensCard}>
                <h3>Macro overlay</h3>
                <p>Does the dollar, rates, or risk appetite dominate the tape even when the micro story feels clear?</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risk-mgmt-heading">
          <div className={styles.container}>
            <h2 id="risk-mgmt-heading" className={styles.sectionTitle}>
              Habits that survive noisy headlines
            </h2>
            <p className={styles.sectionSubtitle}>Opportunity lives in preparation; improvisation taxes accounts.</p>
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
              Learn commodity markets with APFX
            </h2>
            <p className={styles.sectionSubtitle}>
              Tools and education for people who want the story and the risk plan in the same place.
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

        <section className={styles.relatedSection} aria-labelledby="related-heading">
          <div className={styles.container}>
            <h2 id="related-heading" className={styles.relatedTitle}>
              Keep exploring
            </h2>
            <div className={styles.relatedLinks}>
              <Link href="/trade&invest/futures">Futures hub</Link>
              <Link href="/tools/calculators/margin">Margin calculator</Link>
              <Link href="/learn/glossary">Glossary</Link>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="final-cta-heading">
          <div className={styles.container}>
            <h2 id="final-cta-heading" className={styles.ctaTitle}>
              Ready when you are—not before.
            </h2>
            <p className={styles.ctaSubtitle}>
              Open an account only with capital you can lose. Use paper logic first, live size second.
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
