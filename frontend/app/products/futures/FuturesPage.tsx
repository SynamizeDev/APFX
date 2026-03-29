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

/** Angle: professional trading & contract discipline — mechanics before benefits. */

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
    title: 'Express direction with rules',
    body: 'Standardized contracts mean everyone references the same spec sheet—clarity if you read it.',
  },
  {
    icon: BarChart3,
    title: 'Capital efficiency—with strings',
    body: 'Margin can enlarge notional exposure; strings include maintenance calls and gap risk.',
  },
  {
    icon: LineChart,
    title: 'Transparent depth in big contracts',
    body: 'Active markets can show tight depth; thin contracts punish urgency.',
  },
  {
    icon: Scale,
    title: 'Hedging or speculation—same ticket, different job',
    body: 'Know which job you are doing before you argue about P&amp;L.',
  },
]

const RISKS = [
  {
    icon: ArrowLeftRight,
    title: 'Leverage does not negotiate',
    body: 'Moves against you can trigger margin calls faster than spot equity habits prepare you for.',
  },
  {
    icon: Zap,
    title: 'Gaps love illiquid hours',
    body: 'Overnight headlines can print through levels you thought were safe on a chart.',
  },
  {
    icon: Wallet,
    title: 'Margin is a moving target',
    body: 'Exchanges and brokers can raise requirements when volatility rises.',
  },
  {
    icon: CalendarClock,
    title: 'Expiry is a deadline, not a suggestion',
    body: 'Roll or exit deliberately; forgetting is expensive.',
  },
]

const RISK_PRACTICES = [
  'Before entry: write contract symbol, tick value, and point value of your stop in dollars—not just “points.”',
  'Track roll dates like meetings; surprises belong in movies, not margin accounts.',
  'Assume the worst fill on stops in fast markets—if you cannot afford it, shrink size.',
  'Reconcile daily: open interest, margin, and unrealized P&amp;L should never be mysterious.',
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'Contract-first workflows',
    body: 'Specs surfaced where you trade—not buried three clicks deep.',
  },
  {
    icon: Calculator,
    title: 'Margin and scenario tools',
    body: 'Model rolls, not just entries.',
  },
  {
    icon: GraduationCap,
    title: 'Professional vocabulary, plain English',
    body: 'Contango, backwardation, and variation margin—defined in context.',
  },
  {
    icon: ShieldAlert,
    title: 'Risk as a prerequisite',
    body: 'We would rather you skip a trade than misunderstand a spec.',
  },
]

export default function FuturesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroWrap}>
        <InnerPageHero
          title="Contracts, Deadlines, Discipline"
          subtitle="Futures are where market opinion meets an expiry date. Learn the spec first—strategies come after."
          breadcrumbs={[]}
          omitBottomBorder
        />
        <p className={styles.heroTagline}>
          Fear hook: the market will not wait while you re-read margin terms during a gap.
        </p>
        <div className={styles.heroActions}>
          <a href="#desk-lens" className={styles.ctaBtnSecondary}>
            Start at the desk lens
          </a>
        </div>
      </div>

      <main className={styles.main}>
        <section id="desk-lens" className={styles.section} aria-labelledby="desk-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Professional frame</span>
            <h2 id="desk-heading" className={styles.sectionTitle}>
              What a futures contract actually is
            </h2>
            <p className={styles.lead}>
              A futures contract is a standardized agreement to buy or sell an underlying at a defined specification on a
              defined timeline. Two sides meet through the exchange’s rules—not through a handshake. Your P&amp;L comes
              from price movement relative to your entry, fees, and whether you navigate rolls and expiry cleanly.
            </p>
            <p className={styles.lead}>
              People use futures to speculate, hedge business risk, or express relative-value ideas between contracts.
              The use case changes the checklist; the margin math does not care about your story.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="ladder-heading">
          <div className={styles.container}>
            <h2 id="ladder-heading" className={styles.sectionTitle}>
              Time structure: the contract ladder
            </h2>
            <p className={styles.sectionSubtitle}>
              Illustration only—verify symbols, ticks, and last trade dates in the spec.
            </p>
            <div className={styles.ladder}>
              <div className={styles.ladderStep}>
                <div className={styles.ladderMonth}>Front month</div>
                <div className={styles.ladderNote}>Usually the most active liquidity near the present.</div>
              </div>
              <span className={styles.ladderArrow} aria-hidden>
                →
              </span>
              <div className={styles.ladderStep}>
                <div className={styles.ladderMonth}>Next month</div>
                <div className={styles.ladderNote}>Where rolls begin to matter for holders.</div>
              </div>
              <span className={styles.ladderArrow} aria-hidden>
                →
              </span>
              <div className={styles.ladderStep}>
                <div className={styles.ladderMonth}>Deferred</div>
                <div className={styles.ladderNote}>Different liquidity; different curve shape.</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Mechanics</span>
            <h2 id="how-heading" className={styles.sectionTitle}>
              How P&amp;L builds in futures
            </h2>
            <p className={styles.lead}>
              You post margin to open and maintain positions. Mark-to-market means your account reflects gains and
              losses as prices move—even before you flatten.
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Expiry</strong> — last trading day and settlement follow the contract spec.
              </li>
              <li>
                <strong>Long / short</strong> — directional exposure with rules, not opinions.
              </li>
              <li>
                <strong>Margin</strong> — initial and maintenance; breaches can force liquidation.
              </li>
              <li>
                <strong>Rolls</strong> — shifting exposure to a new contract has costs and timing risk.
              </li>
            </ul>
            <p className={styles.note}>
              Educational note: always read exchange and broker documentation before trading.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="curve-heading">
          <div className={styles.container}>
            <h2 id="curve-heading" className={styles.sectionTitle}>
              Curve vocabulary: contango &amp; backwardation
            </h2>
            <div className={styles.contangoBlock}>
              <h3>Why desks stare at curves</h3>
              <p>
                <strong>Contango</strong>: later contracts trade above front months (simplified).{' '}
                <strong>Backwardation</strong>: the opposite shape. Neither is a trade signal by itself—storage, carry,
                and risk premia all feed in.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="margin-tools-heading">
          <div className={styles.container}>
            <h2 id="margin-tools-heading" className={styles.sectionTitle}>
              Margin math belongs in your prep, not after the fill
            </h2>
            <p className={styles.sectionSubtitle}>
              Use calculators to stress-test—not to predict winners.
            </p>
            <div className={styles.marginLinks}>
              <Link href="/tools/calculators/margin">Margin calculator</Link>
              <Link href="/tools/calculators/position-size">Position size</Link>
              <Link href="/tools/risk-management">Risk management hub</Link>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>
              Families of contracts
            </h2>
            <p className={styles.sectionSubtitle}>
              Broad buckets—open the spec for the exact instrument.
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

        <section className={styles.section} aria-labelledby="product-compare-heading">
          <div className={styles.container}>
            <h2 id="product-compare-heading" className={styles.sectionTitle}>
              Futures vs CFDs vs spot: pick the right wrapper
            </h2>
            <p className={styles.sectionSubtitle}>
              Availability varies—this is orientation, not a menu of guarantees.
            </p>
            <div className={styles.compareTableWrap}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th scope="col">Dimension</th>
                    <th scope="col">Futures</th>
                    <th scope="col">CFDs</th>
                    <th scope="col">Spot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Expiry</td>
                    <td>Defined; rolls required</td>
                    <td>Often none on product</td>
                    <td>No expiry on holding asset</td>
                  </tr>
                  <tr>
                    <td>Rules</td>
                    <td>Exchange + clearing</td>
                    <td>Broker terms</td>
                    <td>Custody &amp; settlement vary</td>
                  </tr>
                  <tr>
                    <td>Typical focus</td>
                    <td>Standard size, transparent depth</td>
                    <td>Price tracking, financing quirks</td>
                    <td>Ownership &amp; transfer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="roll-scenario-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Desk scenario</span>
            <h2 id="roll-scenario-heading" className={styles.sectionTitle}>
              Roll week: when “the same trade” is not the same contract
            </h2>
            <div className={styles.deskScenario}>
              <h3>Hypothetical, not a playbook</h3>
              <p>
                You are long the front month and liquidity starts migrating. Spreads between months can widen. If you
                roll late, you pay the spread; if you forget, you face delivery or cash settlement realities you never
                intended. The trade does not care that you meant to roll “later.”
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="benefits-heading">
          <div className={styles.container}>
            <h2 id="benefits-heading" className={styles.sectionTitle}>
              Why professionals still reach for futures
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
              Risks that survive backtests
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

        <section className={styles.section} aria-labelledby="structures-heading">
          <div className={styles.container}>
            <h2 id="structures-heading" className={styles.sectionTitle}>
              Three structures desks rehearse
            </h2>
            <p className={styles.sectionSubtitle}>
              Names vary; the idea is to separate hypothesis from execution risk.
            </p>
            <div className={styles.proGrid}>
              <div className={styles.proCard}>
                <h3>Calendar spread</h3>
                <p>Long one expiry, short another—betting on the shape of the curve, not only level.</p>
              </div>
              <div className={styles.proCard}>
                <h3>Inter-market</h3>
                <p>Related underlyings (e.g., crude vs refined) when you have a view on processing margins.</p>
              </div>
              <div className={styles.proCard}>
                <h3>Hedge replacement</h3>
                <p>Adjust hedge ratio as your physical exposure changes—discipline, not set-and-forget.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risk-mgmt-heading">
          <div className={styles.container}>
            <h2 id="risk-mgmt-heading" className={styles.sectionTitle}>
              Risk checklist for leveraged deadlines
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
              Trade futures with APFX
            </h2>
            <p className={styles.sectionSubtitle}>
              Infrastructure and education for people who respect the spec sheet.
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
              Futures trading involves substantial risk and is not suitable for all investors. You can lose more than your
              initial margin in some cases. Past performance does not guarantee future results. This page is for general
              education only and does not constitute investment, tax, or legal advice.
            </p>
          </div>
        </section>

        <section className={styles.relatedSection} aria-labelledby="related-heading">
          <div className={styles.container}>
            <h2 id="related-heading" className={styles.relatedTitle}>
              Cross-links
            </h2>
            <div className={styles.relatedLinks}>
              <Link href="/trade&invest/commodities">Commodities</Link>
              <Link href="/trade&invest/indices">Indices</Link>
              <Link href="/learn/glossary">Glossary</Link>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="final-cta-heading">
          <div className={styles.container}>
            <h2 id="final-cta-heading" className={styles.ctaTitle}>
              Read the spec. Size the trade. Keep the date.
            </h2>
            <p className={styles.ctaSubtitle}>
              Open an account when you are ready—use capital you can afford to lose.
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
