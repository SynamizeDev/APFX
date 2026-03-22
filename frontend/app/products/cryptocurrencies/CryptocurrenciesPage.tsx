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
  Cpu,
  Network,
  Link2,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './CryptocurrenciesPage.module.css'

/** Angle: innovation & rails of finance — technology section leads; regulation as scenario. */

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
    title: 'Clocks that do not match equities',
    body: 'Many crypto markets quote continuously; that freedom comes with uneven liquidity and wider spreads at times.',
  },
  {
    icon: TrendingUp,
    title: 'Fast repricing',
    body: 'Participants can react quickly to news, listings, or network events—volatility is a feature and a hazard.',
  },
  {
    icon: Globe2,
    title: 'Borderless discussion',
    body: 'Projects and narratives can emerge anywhere; your rules still come from your jurisdiction and broker.',
  },
  {
    icon: LineChart,
    title: 'A live experiment in market design',
    body: 'Useful for studying how technology, liquidity, and regulation interact—never a promise of returns.',
  },
]

const RISKS = [
  {
    icon: Zap,
    title: 'Gaps and thin books',
    body: 'Weekend prints and headline shocks can move prices while traditional markets are closed.',
  },
  {
    icon: LineChart,
    title: 'Narrative velocity',
    body: 'Social channels can amplify stories faster than you can verify them.',
  },
  {
    icon: Landmark,
    title: 'Rule changes mid-game',
    body: 'Policy shifts can alter access, products, or tax treatment with little warning.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Leverage on a volatile rail',
    body: 'Margin plus large daily ranges can stress accounts even when the chart “looks fine.”',
  },
]

const RISK_PRACTICES = [
  'Write down whether you are trading a thesis about technology, liquidity, or regulation—mixing them causes muddled size.',
  'Assume spreads widen when you most want to exit; plan for partial fills.',
  'Separate “long-term belief” from “today’s position size”—they are different jobs.',
  'If you do not understand custody for your product, pause before adding leverage.',
]

const WHY_US = [
  {
    icon: LayoutDashboard,
    title: 'Interface parity with risk panels',
    body: 'Common actions stay visible so you are not hunting menus during fast markets.',
  },
  {
    icon: Calculator,
    title: 'Sizing before sentiment',
    body: 'Calculators that translate percentage moves into account terms.',
  },
  {
    icon: GraduationCap,
    title: 'Plain-language primers',
    body: 'From ledgers to leverage—structured for people who learn by doing.',
  },
  {
    icon: ShieldAlert,
    title: 'No glamor on risk',
    body: 'We say when products are not appropriate—not everything belongs in every portfolio.',
  },
]

const TECH_PILLARS = [
  {
    icon: Network,
    title: 'Distributed ledgers',
    body: 'Many networks aim for shared record-keeping without a single bookkeeper—details vary wildly by project.',
  },
  {
    icon: Link2,
    title: 'Consensus & upgrades',
    body: 'Rules can change via forks, votes, or developer releases; “the protocol” is not static.',
  },
  {
    icon: Cpu,
    title: 'Programs on chains',
    body: 'Some blockchains host applications; fees and congestion become part of the trading backdrop.',
  },
]

export default function CryptocurrenciesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroWrap}>
        <InnerPageHero
          title="Networks, Prices, What's Next"
          subtitle="Digital assets sit at the intersection of open-source software, global liquidity, and evolving rules. Learn the rails before you size a trade."
          breadcrumbs={[]}
          omitBottomBorder
        />
        <p className={styles.heroTagline}>
          Curiosity hook: the technology is fascinating; your broker’s product sheet is what actually governs your risk.
        </p>
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.ctaBtnPrimary}>
            Start Trading
          </Link>
          <a href="#technology" className={styles.ctaBtnSecondary}>
            Start with the tech story
          </a>
        </div>
      </div>

      <main className={styles.main}>
        <section id="technology" className={styles.section} aria-labelledby="tech-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Technology behind the market</span>
            <h2 id="tech-heading" className={styles.sectionTitle}>
              What people mean when they say “on-chain”
            </h2>
            <p className={styles.lead}>
              You do not need to become a developer. You do need a mental model: transactions settle according to
              network rules; wallets hold keys; smart contracts (where used) execute code instead of handshakes. Your
              trading platform may abstract all of this—but the abstraction has limits when things break or upgrade.
            </p>
            <div className={styles.techColumns}>
              {TECH_PILLARS.map(({ icon: Icon, title, body }) => (
                <div key={title} className={styles.techCard}>
                  <Icon className={styles.techIcon} size={22} strokeWidth={1.65} aria-hidden />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.weekStripWrap} role="region" aria-label="24 hour market illustration">
          <div className={styles.weekStripInner}>
            <p className={styles.weekStripTitle}>24 / 7 rhythm (illustrative)</p>
            <div className={styles.weekRow}>
              <span className={styles.weekDot}>Mon</span>
              <span className={styles.weekSep}>→</span>
              <span className={styles.weekDot}>Tue</span>
              <span className={styles.weekSep}>→</span>
              <span className={styles.weekDot}>Wed</span>
              <span className={styles.weekSep}>→</span>
              <span className={styles.weekDot}>Thu</span>
              <span className={styles.weekSep}>→</span>
              <span className={styles.weekDot}>Fri</span>
              <span className={styles.weekSep}>→</span>
              <span className={styles.weekDot}>Sat</span>
              <span className={styles.weekSep}>→</span>
              <span className={styles.weekDot}>Sun</span>
              <span className={styles.weekCaption}>
                — liquidity follows humans and headlines, even when the clock does not stop.
              </span>
            </div>
          </div>
        </div>

        <section
          id="what-are-cryptocurrencies"
          className={styles.section}
          aria-labelledby="what-heading"
        >
          <div className={styles.container}>
            <h2 id="what-heading" className={styles.sectionTitle}>
              From protocol to market price
            </h2>
            <p className={styles.lead}>
              Cryptocurrencies are digital assets whose transactions are typically recorded on distributed ledgers. Markets
              then layer prices on top—driven by buyers, sellers, liquidity providers, and sometimes derivatives that
              track spot or index levels.
            </p>
            <p className={styles.lead}>
              “Innovation” does not erase risk; it often adds new ones—operational, regulatory, and technical.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Walkthrough</span>
            <h2 id="how-heading" className={styles.sectionTitle}>
              How a crypto trade actually travels
            </h2>
            <ol className={styles.howSteps}>
              <li>
                <strong>Choose the product</strong> — spot, perpetual-style derivative, or something else your broker lists.
              </li>
              <li>
                <strong>Know what you own</strong> — coins in your wallet vs exposure on the broker’s books are different animals.
              </li>
              <li>
                <strong>Express a view with size</strong> — long or short where permitted, with margin rules spelled out in advance.
              </li>
              <li>
                <strong>Exit deliberately</strong> — especially when spreads widen or funding rates shift on derivatives.
              </li>
            </ol>
            <p className={styles.note}>
              Educational note: taxes, custody, and availability depend on region—read disclosures end-to-end.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>
              Categories you will hear in research—not a token menu
            </h2>
            <p className={styles.sectionSubtitle}>
              Useful vocabulary; not every project fits one box cleanly.
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

        <section className={styles.section} aria-labelledby="wallet-heading">
          <div className={styles.container}>
            <h2 id="wallet-heading" className={styles.sectionTitle}>
              Custody: who holds the keys?
            </h2>
            <p className={styles.sectionSubtitle}>
              Simplicity angle: if you cannot explain custody, you are not ready to argue with leverage.
            </p>
            <div className={styles.walletBlock}>
              <h3>Hot vs cold (still the right split)</h3>
              <p>
                Hot wallets stay online; cold storage keeps keys offline. Trading balances at a broker may follow
                neither model in the way Twitter threads imply—read the terms.
              </p>
              <ul>
                <li>Exchange or CFD exposure may not equal “your” coins on-chain.</li>
                <li>Transfers can face fees, minimums, and network congestion.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="rules-heading">
          <div className={styles.container}>
            <h2 id="rules-heading" className={styles.sectionTitle}>
              Regulatory questions worth asking on day one
            </h2>
            <p className={styles.sectionSubtitle}>
              Fear hook: the rule book can move faster than your favorite narrative.
            </p>
            <ul className={styles.checklist}>
              <li>
                <span className={styles.checkMark} aria-hidden>
                  ✓
                </span>
                <span>Which instruments are actually legal for you to access</span>
              </li>
              <li>
                <span className={styles.checkMark} aria-hidden>
                  ✓
                </span>
                <span>How staking, lending, or yield labels are treated where you pay taxes</span>
              </li>
              <li>
                <span className={styles.checkMark} aria-hidden>
                  ✓
                </span>
                <span>What happens to client assets if the venue fails</span>
              </li>
              <li>
                <span className={styles.checkMark} aria-hidden>
                  ✓
                </span>
                <span>Whether marketing promises match the legal disclosure</span>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="vol-expl-heading">
          <div className={styles.container}>
            <h2 id="vol-expl-heading" className={styles.sectionTitle}>
              Percent moves hit accounts harder than charts suggest
            </h2>
            <div className={styles.volExplainer}>
              <p>
                A 10% daily swing in a major equity index is rare. In parts of crypto, double-digit weeks can be
                unremarkable. Multiply that by leverage and the same “small” chart wiggle becomes a margin event. The
                chart is not lying—your denominator changed.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="reg-scenario-heading">
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>What would change if…</span>
            <h2 id="reg-scenario-heading" className={styles.sectionTitle}>
              Imagine clearer rules tomorrow—what shifts first?
            </h2>
            <div className={styles.regScenario}>
              <h3>Decision practice, not a prediction</h3>
              <p>
                Clearer regulation might bring more institutional pipes—or it might remove products you use today. The
                exercise matters: which part of your thesis depends on access staying exactly as it is? If the answer is
                “all of it,” size accordingly.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="benefits-heading">
          <div className={styles.container}>
            <h2 id="benefits-heading" className={styles.sectionTitle}>
              Why people study crypto markets anyway
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
              Risks that survive every bull narrative
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

        <section className={styles.section} aria-labelledby="styles-heading">
          <div className={styles.container}>
            <h2 id="styles-heading" className={styles.sectionTitle}>
              Three ways people structure crypto sessions
            </h2>
            <p className={styles.sectionSubtitle}>
              Labels, not endorsements. Each style needs different risk budgets.
            </p>
            <div className={styles.styleGrid}>
              <div className={styles.styleCard}>
                <h3>Range work</h3>
                <p>Identify liquidity pockets and fade extremes—until a headline breaks the range.</p>
              </div>
              <div className={styles.styleCard}>
                <h3>Trend continuation</h3>
                <p>Ride momentum with explicit invalidation points—trends in crypto can end abruptly.</p>
              </div>
              <div className={styles.styleCard}>
                <h3>Event trading</h3>
                <p>Trade known catalysts—listings, upgrades, macro prints—with plans for gap risk.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="risk-mgmt-heading">
          <div className={styles.container}>
            <h2 id="risk-mgmt-heading" className={styles.sectionTitle}>
              Risk management for always-on markets
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
              Learn and trade crypto with APFX
            </h2>
            <p className={styles.sectionSubtitle}>
              Tools for people who want the innovation story and the downside math in the same workspace.
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

        <section className={styles.relatedSection} aria-labelledby="related-heading">
          <div className={styles.container}>
            <h2 id="related-heading" className={styles.relatedTitle}>
              Next reads
            </h2>
            <div className={styles.relatedLinks}>
              <Link href="/learn/glossary">Glossary</Link>
              <Link href="/tools/risk-management/position-size">Position size</Link>
              <Link href="/trade&invest/futures">Futures</Link>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="final-cta-heading">
          <div className={styles.container}>
            <h2 id="final-cta-heading" className={styles.ctaTitle}>
              Respect the rails. Then decide.
            </h2>
            <p className={styles.ctaSubtitle}>
              Open an account when you are ready—trade only with capital you can afford to lose.
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
