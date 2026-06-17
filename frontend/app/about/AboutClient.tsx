'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { 
    ChevronRight,
    ArrowRight,
    CheckCircle2,
    Activity,
    Shield,
    Plus,
    Minus,
    BookOpen,
    Cpu,
    Globe,
    Lock,
    PieChart,
    Scale,
    TrendingUp,
    Zap,
    BarChart3,
    Landmark,
    User,
    Route,
    Server,
    Gauge,
    Network,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import styles from './AboutPage.module.css'

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

type WhyAPFXNarrativeSection = {
    kicker: string
    headingBefore: string
    headingAccent: string
    body: string[]
    bullets: string[]
    stat: { value: string; label: string; desc: string; phrase?: boolean }
    closing?: boolean
}

const WHY_APFX_NARRATIVES: WhyAPFXNarrativeSection[] = [
    {
        kicker: 'Broker Architecture',
        headingBefore: 'Your Broker\'s Incentives ',
        headingAccent: 'Shape Your Outcomes',
        body: [
            'Most retail traders evaluate platforms by spread and leverage. Institutional desks evaluate counterparty structure first — because the model a broker operates under determines whether your order is routed to the market or absorbed on an internal book.',
            'In a principal (dealing desk) model, the broker is your counterparty. Your gain is their loss. That structural tension does not require malice — it is arithmetic. In an agency model, the broker transmits your order to external liquidity and earns from transparent, volume-based economics. The alignment is structural, not rhetorical.',
        ],
        bullets: [
            'Principal desks internalize flow; agency models pass orders to external liquidity pools',
            'Revenue from client losses creates a statistical incentive misaligned with long-term trader retention',
            'STP (Straight-Through Processing) removes the broker as counterparty to your position',
            'APFX operates on an agency execution model with 30+ Tier-1 liquidity providers',
            'When the broker does not take the other side, execution quality becomes the product — not client attrition',
        ],
        stat: {
            value: '30+',
            label: 'Tier-1 LPs',
            desc: 'Orders routed externally. APFX does not operate a principal dealing desk against client flow.',
        },
    },
    {
        kicker: 'Execution Quality',
        headingBefore: 'Invisible Costs Compound Faster Than ',
        headingAccent: 'Visible Spreads',
        body: [
            'Advertised spreads are only one line item in total trading cost. Slippage, requotes, widened spreads during volatility, and delayed fills often exceed the nominal spread — particularly for active traders, funded account holders, and those running systematic or news-driven strategies.',
            'These frictions are rarely disclosed in marketing materials because they are difficult to measure without execution reporting. They are, however, precisely what separates institutional-grade infrastructure from retail convenience layers. APFX is engineered to minimize each vector: no requotes on eligible order types, aggregated top-of-book pricing, and sub-millisecond internal routing to liquidity hubs.',
        ],
        bullets: [
            'Slippage: the delta between quoted and filled price, amplified during high-impact events',
            'Requotes: order rejection or repricing that disrupts strategy timing and invalidates risk parameters',
            'Spread widening: temporary markup during volatility, often invisible until fill confirmation',
            'Execution delay: latency that turns a limit order into a market order by the time it arrives',
            'APFX Smart Order Routing scans 30+ liquidity sources in under 150 microseconds before routing',
        ],
        stat: {
            value: '< 5ms',
            label: 'Round-Trip Latency',
            desc: 'From order entry to LP confirmation across co-located infrastructure.',
        },
    },
    {
        kicker: 'Technical Foundation',
        headingBefore: 'Execution Infrastructure Is Not a Feature — ',
        headingAccent: 'It Is the Product',
        body: [
            'Retail platforms optimize for onboarding speed. Institutional infrastructure optimizes for proximity to liquidity — data center co-location, cross-connects to prime brokers and LP feeds, and routing engines designed for microsecond-level decision cycles.',
            'APFX maintains cross-connects in Equinix LD4 (London) and NY4 (New York) — the same financial data center ecosystems used by global banks and proprietary trading firms. Your orders do not traverse public internet congestion to reach a liquidity hub. They travel through dedicated fiber to aggregated pools spanning tier-1 banks and non-bank market makers.',
        ],
        bullets: [
            'Co-located trade servers in Equinix LD4 and NY4 financial hubs',
            'Direct cross-connects to 30+ Tier-1 liquidity providers and prime brokerage feeds',
            'Smart Order Routing (SOR) engine with sub-150μs top-of-book scan cycles',
            'Aggregated deep pool combining bank and non-bank liquidity into a unified order book',
            '99.9% fill rate across eligible orders to reduce partial-fill strategy disruption',
        ],
        stat: {
            value: '< 1ms',
            label: 'Internal Latency',
            desc: 'Cross-connect routing bypasses public network congestion entirely.',
        },
    },
    {
        kicker: 'Capital Preservation',
        headingBefore: 'Disciplined Risk Architecture for ',
        headingAccent: 'Unpredictable Markets',
        body: [
            'Professional traders do not rely on luck during volatility events — they rely on systems. A robust risk framework must operate in real time: monitoring margin utilization, enforcing exposure limits, and preventing catastrophic account outcomes when markets gap beyond stop levels.',
            'APFX deploys an automated risk engine that continuously evaluates account margin against open exposure. Negative balance protection ensures your liability is capped at account equity — a safeguard that became industry-standard post-2015 but remains inconsistently applied across retail brokers.',
        ],
        bullets: [
            'Real-time margin monitoring with automated liquidation protocols before critical thresholds',
            'Negative balance protection: account equity cannot fall below zero during extreme gap events',
            'Segregated client funds held at top-tier banking institutions, separate from operational capital',
            'Configurable exposure limits aligned to account tier and trading profile',
            'Pre-trade margin checks to prevent order submission beyond available collateral',
        ],
        stat: {
            value: 'Zero',
            label: 'Negative Balance Liability',
            desc: 'Automated risk engine caps downside at account equity during extreme volatility.',
        },
    },
    {
        kicker: 'Aligned Economics',
        headingBefore: 'When Revenue Depends on Volume, ',
        headingAccent: 'Conflicts Disappear',
        body: [
            'The most durable broker-client relationships are built on aligned economics. When a firm\'s revenue is derived from client losses, retention strategy and trader success become opposing forces. When revenue is derived from transparent commissions and raw spread markups on executed volume, the incentive shifts: the broker succeeds when the trader continues to operate — profitably or not — with trust intact.',
            'APFX publishes its pricing structure without hidden markups layered into quoted spreads. There are no performance hurdles designed to trigger internalization. There are no dealing desk interventions on eligible flow. What you see in the order book is what the aggregated liquidity pool offers.',
        ],
        bullets: [
            'Revenue from volume-based commissions and disclosed raw spread markups — not client P&L',
            'No hidden spread inflation during news events or low-liquidity sessions',
            'Segregated client funds with mandatory regulatory audit requirements',
            'Full regulatory licensing with operational transparency obligations',
            'Long-term relationship model: trader retention through execution quality, not account churn',
        ],
        stat: {
            value: '0',
            label: 'Hidden Conflicts',
            desc: 'Revenue alignment through disclosed, volume-based economics.',
        },
    },
    {
        kicker: 'The Institutional Bridge',
        headingBefore: 'Retail Access. Institutional Standards. ',
        headingAccent: 'No Compromise.',
        body: [
            'The gap between retail brokerage and institutional execution has persisted for decades — not because the technology was unavailable, but because the retail model was more profitable for brokers operating principal desks. APFX was founded to close that gap deliberately: to give serious retail traders, funded professionals, and high-net-worth individuals access to the same execution architecture, liquidity depth, and structural transparency that institutional desks have relied on for years.',
            'We are not a platform optimized for casual speculation. We are infrastructure for traders who measure execution in milliseconds, evaluate brokers by counterparty structure, and understand that the spread is only the beginning of the cost equation. If that describes how you operate, APFX was built for you.',
        ],
        bullets: [
            'Agency STP execution — never your counterparty on eligible flow',
            '30+ Tier-1 liquidity providers aggregated into a single deep pool',
            'Sub-millisecond routing via Equinix co-location and dedicated cross-connects',
            'Automated risk framework with negative balance protection and segregated funds',
            'Transparent, volume-aligned revenue model with no dealing desk conflicts',
        ],
        stat: {
            value: 'Institutional',
            label: 'Retail-Accessible',
            desc: 'The execution stack professionals expect, without the prime brokerage minimums.',
            phrase: true,
        },
        closing: true,
    },
]

const HOW_IT_WORKS_TIMELINE = [
    {
        marker: '01',
        title: 'Order Entry',
        body: 'You submit a buy or sell instruction through the APFX terminal — desktop, web, or mobile. The request is validated against your available margin, encrypted, and transmitted over dedicated fiber to our co-located trade server. No manual intervention. No dealing desk review.',
        detail: 'Pre-trade checks confirm collateral before the order enters the execution pipeline.',
    },
    {
        marker: '02',
        title: 'Smart Order Routing (SOR)',
        body: 'Our routing engine scans the aggregated top-of-book across 30+ Tier-1 liquidity providers in under 150 microseconds. It evaluates bid/ask prices, available depth, and routing logic to identify the optimal destination for your order — not simply the first available quote.',
        detail: 'Dynamic routing adapts in real time as liquidity conditions shift across providers.',
    },
    {
        marker: '03',
        title: 'Liquidity Matching',
        body: 'Your order is matched against the selected liquidity provider at the best available price. For larger volumes, the engine sweeps across multiple providers to achieve the best volume-weighted average price (VWAP), minimizing market impact and slippage.',
        detail: 'Partial fills are aggregated and reported as a single execution where applicable.',
    },
    {
        marker: '04',
        title: 'Confirmation',
        body: 'The liquidity provider confirms the fill. APFX records the transaction, updates your account balance and open positions, and reflects the execution in your terminal — typically within 5 milliseconds of your original click.',
        detail: 'Full audit trail maintained for every order from entry to confirmation.',
    },
]

const HOW_IT_WORKS_FLOW = [
    {
        icon: User,
        title: 'Trader',
        desc: 'You click Buy or Sell. The order enters the APFX ecosystem with a defined size, direction, and order type.',
    },
    {
        icon: Server,
        title: 'APFX Execution Engine',
        desc: 'Our co-located trade server validates margin, normalizes the order, and prepares it for routing — all in sub-millisecond time.',
    },
    {
        icon: Route,
        title: 'Smart Order Router',
        desc: 'The SOR engine scans 30+ liquidity sources simultaneously, applying best-execution logic to determine optimal routing.',
    },
    {
        icon: Network,
        title: 'Liquidity Providers',
        desc: 'Tier-1 banks and non-bank market makers compete to fill your order at their best available price.',
    },
    {
        icon: Gauge,
        title: 'Best Price Selection',
        desc: 'The engine selects the tightest bid or ask with sufficient depth, splitting volume across providers when needed.',
    },
    {
        icon: CheckCircle2,
        title: 'Execution Confirmation',
        desc: 'Fill confirmed, account updated, terminal refreshed. Total round-trip: typically under 5ms.',
    },
]

type HowItWorksNarrative = {
    kicker: string
    headingBefore: string
    headingAccent: string
    body: string[]
    bullets?: string[]
    insight?: { title: string; quote: string }
    callout?: { value: string; label: string; desc: string; phrase?: boolean }
    cards?: { icon: typeof Globe; title: string; desc: string }[]
    stats?: { value: string; label: string }[]
}

const HOW_IT_WORKS_NARRATIVES: HowItWorksNarrative[] = [
    {
        kicker: 'Execution Economics',
        headingBefore: 'Why Execution Quality ',
        headingAccent: 'Matters',
        body: [
            'Strategy determines what you trade. Execution determines what you pay. Over hundreds or thousands of transactions, small inefficiencies — a fractionally wider spread, a pip of slippage, a delayed fill — compound into measurable drag on performance.',
            'Institutional desks treat execution as a core competency, not an afterthought. They measure transaction cost analysis (TCA), monitor slippage against benchmarks, and select infrastructure accordingly. APFX brings that same discipline to traders who previously had no visibility into what happened after they clicked.',
        ],
        bullets: [
            'Spread: the visible cost — but only the starting point of total transaction expense',
            'Slippage: the difference between expected and actual fill price, amplified during volatility',
            'Latency: delay between instruction and market arrival — critical for time-sensitive strategies',
            'Requotes: order rejection or repricing that invalidates entry logic and risk parameters',
            'Market impact: price movement caused by your own order size against available depth',
        ],
        insight: {
            title: 'Institutional Insight',
            quote: 'A strategy with positive expectancy can still produce negative results if execution costs exceed edge. Professionals measure both.',
        },
    },
    {
        kicker: 'Routing Intelligence',
        headingBefore: 'Smart Order Routing Is Not a Feature — ',
        headingAccent: 'It Is Infrastructure',
        body: [
            'Smart Order Routing (SOR) is the decision layer between your click and the market. It does not simply send orders to a single liquidity source. It continuously evaluates price, depth, latency, and fill probability across an aggregated pool of providers to route each order optimally.',
            'When conditions change — a provider widens spreads, depth thins, or latency spikes — the router adapts dynamically. This is the same class of technology used by institutional trading desks, adapted for direct market access at retail scale.',
        ],
        bullets: [
            'Multiple liquidity providers scanned simultaneously for every eligible order',
            'Real-time price discovery across aggregated top-of-book feeds',
            'Intelligent order splitting for large volumes to minimize market impact',
            'Best execution methodology applied consistently, not selectively',
            'Dynamic routing that responds to shifting liquidity conditions in microseconds',
        ],
        callout: {
            value: 'Best Execution',
            label: 'Infrastructure Advantage',
            desc: 'Best execution is not a feature. It is an infrastructure advantage.',
            phrase: true,
        },
    },
    {
        kicker: 'Liquidity Architecture',
        headingBefore: 'Deep Liquidity Is Built, ',
        headingAccent: 'Not Claimed',
        body: [
            'Liquidity depth determines how much volume you can execute at a given price before the market moves against you. Shallow liquidity means wider effective spreads, higher slippage, and greater vulnerability during news events.',
            'APFX aggregates feeds from tier-1 global banks and established non-bank liquidity providers into a unified deep pool. Multiple sources compete for your flow at the top of book — compressing spreads and improving fill quality across market conditions.',
        ],
        cards: [
            {
                icon: Landmark,
                title: 'Tier-1 Banks',
                desc: 'Direct connectivity to major global financial institutions providing primary market liquidity across FX, indices, and commodities.',
            },
            {
                icon: BarChart3,
                title: 'Non-Bank LPs',
                desc: 'Specialist market makers and electronic liquidity providers adding depth, diversity, and competitive pricing to the aggregated pool.',
            },
            {
                icon: PieChart,
                title: 'Aggregated Order Books',
                desc: 'Individual provider feeds merged into a single unified book — presenting the best bid and ask from across the entire pool.',
            },
            {
                icon: Scale,
                title: 'Bid/Ask Competition',
                desc: 'Providers compete in real time to offer the tightest prices, driving spread compression without manual intervention.',
            },
            {
                icon: Globe,
                title: 'Institutional Depth',
                desc: 'Sufficient volume at each price level to absorb professional-sized orders with minimal market impact.',
            },
        ],
    },
    {
        kicker: 'Low-Latency Infrastructure',
        headingBefore: 'Speed Without ',
        headingAccent: 'Compromise',
        body: [
            'In electronic markets, latency is not abstract — it is the difference between receiving the price you see and receiving the price that existed 50 milliseconds ago. During volatile conditions, that gap can mean several pips.',
            'APFX infrastructure is co-located in Equinix LD4 (London) and NY4 (New York) — the same data center ecosystems used by global banks and proprietary trading firms. Cross-connects to liquidity providers bypass public internet routing entirely, delivering sub-millisecond internal latency and continuous platform monitoring.',
        ],
        stats: [
            { value: '< 1ms', label: 'Internal Routing' },
            { value: '99.9%', label: 'Platform Uptime' },
            { value: '30+', label: 'Liquidity Sources' },
            { value: '24/7', label: 'Infrastructure Monitoring' },
        ],
    },
    {
        kicker: 'Trade Integrity',
        headingBefore: 'Risk Controls That Protect ',
        headingAccent: 'Your Capital',
        body: [
            'Execution quality means little if capital is not protected. APFX operates an automated risk framework that monitors every account in real time — evaluating margin utilization, open exposure, and account equity against defined thresholds.',
            'Negative balance protection ensures your liability never exceeds deposited funds, even during extreme gap events. Pre-trade margin checks prevent orders from entering the market without sufficient collateral. These safeguards operate continuously, without manual intervention.',
        ],
        bullets: [
            'Real-time margin monitoring with automated alerts and liquidation protocols',
            'Negative balance protection capping liability at account equity',
            'Exposure management across open positions and asset classes',
            'Pre-trade collateral validation before order submission',
            'Automated safeguards active 24/5 across all trading sessions',
        ],
    },
]

const HOW_IT_WORKS_COMPARISON = [
    {
        topic: 'Order Handling',
        traditional: 'Internalized on broker dealing desk (B-Book) or selectively routed',
        apfx: 'Agency STP — orders passed directly to external liquidity providers',
    },
    {
        topic: 'Liquidity Access',
        traditional: 'Single internal book or limited LP relationships',
        apfx: '30+ Tier-1 banks and non-bank LPs in aggregated deep pool',
    },
    {
        topic: 'Revenue Model',
        traditional: 'Profit from client losses and spread markups',
        apfx: 'Volume-based commissions and disclosed raw spread markups',
    },
    {
        topic: 'Conflict of Interest',
        traditional: 'Broker is counterparty — your gain is their loss',
        apfx: 'No dealing desk — structurally aligned with trader activity',
    },
    {
        topic: 'Transparency',
        traditional: 'Opaque execution, hidden internalization',
        apfx: 'Direct market access with auditable order-to-fill trail',
    },
    {
        topic: 'Execution Quality',
        traditional: 'Variable — subject to desk intervention and requotes',
        apfx: 'Sub-millisecond routing with 99.9% fill rate on eligible orders',
    },
]

// Instruments list removed as it's now inline in the renderMarkets function

function AboutContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('Why APFX')
    const [activeInstrument, setActiveInstrument] = useState<string | null>(null)
    const [bonusOpen, setBonusOpen] = useState(false)

    // ── Sync tab with URL ───────────────────────────────────────
    useEffect(() => {
        const type = searchParams.get('type')
        if (type) {
            const tabMap: Record<string, string> = {
                'why-apfx': 'Why APFX',
                'how-it-works': 'How Trading Works',
                'markets': 'Markets Overview',
                'basics': 'Trading Basics',
                'demo': 'Demo Account',
                'security': 'Security & Regulation'
            }
            const mappedTab = tabMap[type.toLowerCase()]
            if (mappedTab) {
                setActiveTab(mappedTab)
            }
        }
    }, [searchParams])

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        const typeMap: Record<string, string> = {
            'Why APFX': 'why-apfx',
            'How Trading Works': 'how-it-works',
            'Markets Overview': 'markets',
            'Trading Basics': 'basics',
            'Demo Account': 'demo',
            'Security & Regulation': 'security'
        }
        const type = typeMap[tab]
        if (type) {
            router.push(`/about?type=${type}`, { scroll: false })
        }
    }

    const renderWhyAPFX = () => (
        <section className={styles.sectionHero}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <span className={styles.kicker}>The Integrity Thesis</span>
                <h2 className={styles.articleHeading}>Institutional Integrity in a <span>Fragmented Market</span></h2>
                <p className={styles.heroLead}>
                    Traditional retail brokerage models are built on a fundamental conflict of interest. APFX was founded to bridge the gap between retail accessibility and institutional transparency.
                </p>

                {/* ── COMPARISON GRID ── */}
                <div className={styles.comparisonGrid}>
                    <div className={styles.comparisonColumn}>
                        <h3>Traditional Market Maker</h3>
                        <div className={styles.compList}>
                            <div className={styles.compItem}>
                                <h4>Principal Desk (B-Book)</h4>
                                <p>The broker acts as the counterparty to your trade. When you win, they lose. This creates an inherent incentive to hinder your success through re-quotes or platform latency.</p>
                            </div>
                            <div className={styles.compItem}>
                                <h4>Conflict of Interest</h4>
                                <p>Profit is derived from client losses. This model relies on the statistical probability of retail failure rather than market performance.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.comparisonColumn}>
                        <h3>APFX Institutional Model</h3>
                        <div className={styles.compList}>
                            <div className={`${styles.compItem} ${styles.compItemActive}`}>
                                <h4>Agency Execution (STP)</h4>
                                <p>Orders are transmitted directly to our pool of 30+ Tier-1 liquidity providers. We never take the opposite side of your position.</p>
                            </div>
                            <div className={`${styles.compItem} ${styles.compItemActive}`}>
                                <h4>Revenue Alignment</h4>
                                <p>Our revenue is derived solely from volume-based commissions or raw spread markups. We only succeed when you continue to trade profitably.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── INSIGHT BOX ── */}
                <div className={styles.insightBox}>
                    <div className={styles.insightIcon}><Shield size={32} /></div>
                    <div className={styles.insightText}>
                        <h4>Institutional Insight</h4>
                        <p>"Transparency is the only sustainable business model in high-frequency trading. By removing the dealing desk, we remove the barrier between the trader and the market."</p>
                    </div>
                </div>

                {/* ── STORY GRID ── */}
                <div className={styles.storyGrid}>
                    <div className={styles.storyCard}>
                        <Globe size={24} className={styles.accent} />
                        <h3>Liquidity Aggregation</h3>
                        <p>We combine feeds from global banks and non-bank market makers into a single "Deep Pool" to ensure your orders are filled at the best available price globally.</p>
                    </div>
                    <div className={styles.storyCard}>
                        <Zap size={24} className={styles.accent} />
                        <h3>Sub-Millisecond Execution</h3>
                        <p>With cross-connects in Equinix LD4 and NY4, your orders bypass public internet congestion, reaching liquidity hubs in under 1ms.</p>
                    </div>
                    <div className={styles.storyCard}>
                        <Lock size={24} className={styles.accent} />
                        <h3>Negative Equity Protection</h3>
                        <p>Our automated risk engine monitors your margin in real-time, preventing your account from ever falling below zero during extreme volatility.</p>
                    </div>
                </div>

                {/* ── EXPANDED NARRATIVE SECTIONS ── */}
                {WHY_APFX_NARRATIVES.map((section) => (
                    <article key={section.kicker} className={styles.narrativeSection}>
                        <span className={styles.kicker}>{section.kicker}</span>
                        <h2 className={styles.articleHeading}>
                            {section.headingBefore}<span>{section.headingAccent}</span>
                        </h2>
                        {section.body.map((paragraph) => (
                            <p key={paragraph.slice(0, 48)} className={styles.narrativeBody}>
                                {paragraph}
                            </p>
                        ))}
                        <ul className={styles.narrativeBullets}>
                            {section.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                            ))}
                        </ul>
                        {section.stat.phrase ? (
                            <div className={`${styles.statCallout} ${styles.statCalloutPhrase}`}>
                                <p className={styles.statCalloutPhraseHeadline}>
                                    <span className={styles.statCalloutValue}>{section.stat.value}</span>
                                    <span className={styles.statCalloutPhraseSep} aria-hidden="true">·</span>
                                    <span className={styles.statCalloutValue}>{section.stat.label}</span>
                                </p>
                                <p className={styles.statCalloutDesc}>{section.stat.desc}</p>
                            </div>
                        ) : (
                            <div className={styles.statCallout}>
                                <span className={styles.statCalloutValue}>{section.stat.value}</span>
                                <div className={styles.statCalloutContent}>
                                    <span className={styles.statCalloutLabel}>{section.stat.label}</span>
                                    <p className={styles.statCalloutDesc}>{section.stat.desc}</p>
                                </div>
                            </div>
                        )}
                        {section.closing && (
                            <div className={styles.narrativeCta}>
                                <Link href="/accounts" className={styles.ctaBtnPrimary}>
                                    Open Account <ArrowRight size={16} />
                                </Link>
                                <Link href="/about?type=how-it-works" className={styles.ctaBtnSecondary}>
                                    Review Execution Model
                                </Link>
                            </div>
                        )}
                    </article>
                ))}
            </motion.div>
        </section>
    )

    const renderHowItWorks = () => (
        <section className={styles.sectionHero}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
                {/* ── SECTION 1: ANATOMY OF A TRADE ── */}
                <span className={styles.kicker}>Market Microstructure</span>
                <h2 className={styles.articleHeading}>The Anatomy of a <span>High-Frequency Trade</span></h2>
                <p className={styles.heroLead}>
                    Every click initiates a sequence — from terminal validation to liquidity provider confirmation — that completes in milliseconds. Understanding this pipeline is the foundation of execution-aware trading.
                </p>

                <div className={styles.timeline}>
                    {HOW_IT_WORKS_TIMELINE.map((step) => (
                        <div key={step.marker} className={styles.timelineItem}>
                            <div className={styles.timelineMarker}>{step.marker}</div>
                            <div className={styles.timelineContent}>
                                <h4>{step.title}</h4>
                                <p>{step.body}</p>
                                <p className={styles.timelineDetail}>{step.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.diagramWrapper}>
                    <div className={styles.diagramOverlay} />
                    <div style={{ textAlign: 'center', paddingBlock: 'var(--space-8)' }}>
                        <Cpu size={48} className={styles.accent} style={{ marginBottom: '1rem' }} />
                        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Visualizing the Aggregated Order Book</h4>
                        <p style={{ color: 'var(--color-text-3)', fontSize: 'var(--text-sm)' }}>
                            Thirty liquidity providers publish their best prices simultaneously. Our engine identifies the optimal bid and ask across the entire pool and presents them as a single, unified spread.
                        </p>
                    </div>
                </div>

                {/* ── SECTION 2: FROM CLICK TO MARKET ── */}
                <article className={styles.narrativeSection}>
                    <span className={styles.kicker}>Order Flow Pipeline</span>
                    <h2 className={styles.articleHeading}>From Click to <span>Market</span></h2>
                    <p className={styles.narrativeBody}>
                        The path from your terminal to the liquidity provider is not a straight line — it is a governed sequence of validation, routing, matching, and confirmation. Each stage is engineered to preserve price integrity and minimize latency.
                    </p>
                    <div className={styles.flowJourney}>
                        {HOW_IT_WORKS_FLOW.map((stage, i) => {
                            const Icon = stage.icon
                            return (
                                <div key={stage.title} className={styles.flowStage}>
                                    <div className={styles.flowStageIcon}>
                                        <Icon size={22} />
                                    </div>
                                    <div className={styles.flowStageContent}>
                                        <span className={styles.flowStageStep}>Stage {String(i + 1).padStart(2, '0')}</span>
                                        <h4>{stage.title}</h4>
                                        <p>{stage.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </article>

                {/* ── SECTIONS 3–7: NARRATIVE BLOCKS ── */}
                {HOW_IT_WORKS_NARRATIVES.map((section) => (
                    <article key={section.kicker} className={styles.narrativeSection}>
                        <span className={styles.kicker}>{section.kicker}</span>
                        <h2 className={styles.articleHeading}>
                            {section.headingBefore}<span>{section.headingAccent}</span>
                        </h2>
                        {section.body.map((paragraph) => (
                            <p key={paragraph.slice(0, 48)} className={styles.narrativeBody}>
                                {paragraph}
                            </p>
                        ))}
                        {section.bullets && (
                            <ul className={styles.narrativeBullets}>
                                {section.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                        )}
                        {section.insight && (
                            <div className={styles.insightBox}>
                                <div className={styles.insightIcon}><Activity size={32} /></div>
                                <div className={styles.insightText}>
                                    <h4>{section.insight.title}</h4>
                                    <p>&ldquo;{section.insight.quote}&rdquo;</p>
                                </div>
                            </div>
                        )}
                        {section.callout && (
                            section.callout.phrase ? (
                                <div className={`${styles.statCallout} ${styles.statCalloutPhrase}`}>
                                    <p className={styles.statCalloutPhraseHeadline}>
                                        <span className={styles.statCalloutValue}>{section.callout.value}</span>
                                        <span className={styles.statCalloutPhraseSep} aria-hidden="true">·</span>
                                        <span className={styles.statCalloutValue}>{section.callout.label}</span>
                                    </p>
                                    <p className={styles.statCalloutDesc}>{section.callout.desc}</p>
                                </div>
                            ) : (
                                <div className={styles.statCallout}>
                                    <span className={styles.statCalloutValue}>{section.callout.value}</span>
                                    <div className={styles.statCalloutContent}>
                                        <span className={styles.statCalloutLabel}>{section.callout.label}</span>
                                        <p className={styles.statCalloutDesc}>{section.callout.desc}</p>
                                    </div>
                                </div>
                            )
                        )}
                        {section.cards && (
                            <div className={styles.storyGrid}>
                                {section.cards.map((card) => {
                                    const CardIcon = card.icon
                                    return (
                                        <div key={card.title} className={styles.storyCard}>
                                            <CardIcon size={24} className={styles.accent} />
                                            <h3>{card.title}</h3>
                                            <p>{card.desc}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {section.stats && (
                            <div className={styles.instStatGrid}>
                                {section.stats.map((stat) => (
                                    <div key={stat.label} className={styles.instStatCard}>
                                        <span className={styles.instStatValue}>{stat.value}</span>
                                        <span className={styles.instStatLabel}>{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </article>
                ))}

                {/* ── SECTION 8: COMPARISON ── */}
                <article className={styles.narrativeSection}>
                    <span className={styles.kicker}>Structural Comparison</span>
                    <h2 className={styles.articleHeading}>What Makes APFX <span>Different</span></h2>
                    <p className={styles.narrativeBody}>
                        The difference between APFX and a traditional retail broker is not marketing language — it is architecture. Order handling, liquidity access, and revenue alignment are structural decisions that directly affect every trade you execute.
                    </p>
                    <div className={styles.comparisonMatrix}>
                        <div className={styles.comparisonMatrixHeader}>
                            <span className={styles.comparisonMatrixTopic}>Dimension</span>
                            <span>Traditional Broker</span>
                            <span className={styles.comparisonMatrixApfx}>APFX Institutional Model</span>
                        </div>
                        {HOW_IT_WORKS_COMPARISON.map((row) => (
                            <div key={row.topic} className={styles.comparisonMatrixRow}>
                                <span className={styles.comparisonMatrixTopic}>{row.topic}</span>
                                <span className={styles.comparisonMatrixCell}>{row.traditional}</span>
                                <span className={`${styles.comparisonMatrixCell} ${styles.comparisonMatrixCellActive}`}>{row.apfx}</span>
                            </div>
                        ))}
                    </div>
                </article>

                {/* ── SECTION 9: CLOSING THESIS ── */}
                <article className={styles.narrativeSection}>
                    <span className={styles.kicker}>The Execution Thesis</span>
                    <h2 className={styles.articleHeading}>Strategy Gets the Attention. <span>Execution Gets the Results.</span></h2>
                    <p className={styles.narrativeBody}>
                        Most traders focus on strategy — entries, exits, indicators, and risk-reward ratios. Professionals focus on execution — the infrastructure, liquidity access, and structural transparency that determine whether edge survives contact with the market.
                    </p>
                    <p className={styles.narrativeBody}>
                        Market access is not a commodity. The broker you choose determines whether your orders reach genuine liquidity or an internal book. Whether your fills reflect the market or a desk&apos;s preference. Whether the firm succeeds when you trade or when you lose.
                    </p>
                    <p className={styles.narrativeBody}>
                        APFX exists to eliminate that uncertainty. We provide the execution architecture, deep liquidity, and aligned economics that institutional desks have relied on for decades — accessible without prime brokerage minimums or proprietary desk gatekeeping.
                    </p>
                    <div className={`${styles.statCallout} ${styles.statCalloutPhrase}`}>
                        <p className={styles.statCalloutPhraseHeadline}>
                            <span className={styles.statCalloutValue}>Retail Access</span>
                            <span className={styles.statCalloutPhraseSep} aria-hidden="true">·</span>
                            <span className={styles.statCalloutValue}>Institutional Infrastructure</span>
                        </p>
                        <p className={styles.statCalloutDesc}>
                            The bridge between accessible markets and institutional-grade execution — built for traders who understand the difference.
                        </p>
                    </div>
                    <div className={styles.instStatGrid}>
                        <div className={styles.instStatCard}>
                            <span className={styles.instStatValue}>30+</span>
                            <span className={styles.instStatLabel}>Tier-1 LPs</span>
                        </div>
                        <div className={styles.instStatCard}>
                            <span className={styles.instStatValue}>&lt; 1ms</span>
                            <span className={styles.instStatLabel}>Internal Latency</span>
                        </div>
                        <div className={styles.instStatCard}>
                            <span className={styles.instStatValue}>99.9%</span>
                            <span className={styles.instStatLabel}>Fill Rate</span>
                        </div>
                        <div className={styles.instStatCard}>
                            <span className={styles.instStatValue}>&lt; 5ms</span>
                            <span className={styles.instStatLabel}>Round-Trip</span>
                        </div>
                    </div>
                    <div className={styles.narrativeCta}>
                        <Link href="/accounts" className={styles.ctaBtnPrimary}>
                            Open Account <ArrowRight size={16} />
                        </Link>
                        <Link href="/about?type=why-apfx" className={styles.ctaBtnSecondary}>
                            Why APFX
                        </Link>
                    </div>
                </article>
            </motion.div>
        </section>
    )

    const renderMarkets = () => (
        <section className={styles.sectionHero}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <span className={styles.kicker}>Asset Ecosystem</span>
                <h2 className={styles.articleHeading}>Multi-Asset Connectivity for <span>Modern Portfolio Theory</span></h2>
                <p className={styles.heroLead}>
                    Diversification is the only "free lunch" in finance. Our ecosystem provides deep liquidity across 6 asset classes, enabling sophisticated cross-asset correlation strategies.
                </p>
                
                <div className={styles.storyGrid}>
                    <div className={styles.storyCard}>
                        <Globe size={24} className={styles.accent} />
                        <h3>Foreign Exchange</h3>
                        <p>The core of global finance. Trade 60+ pairs including majors, minors, and exotics with institutional pricing and zero re-quotes.</p>
                        <div className={styles.instMeta}>Leverage 1:1000 | 24/5 Access</div>
                    </div>
                    <div className={styles.storyCard}>
                        <BarChart3 size={24} className={styles.accent} />
                        <h3>Global Indices</h3>
                        <p>Gain exposure to entire national economies. Trade the S&P 500, DAX 40, and FTSE 100 with the industry's lowest margins.</p>
                        <div className={styles.instMeta}>Mean Reversion | Low Spreads</div>
                    </div>
                    <div className={styles.storyCard}>
                        <Zap size={24} className={styles.accent} />
                        <h3>Commodities</h3>
                        <p>Hedge against inflation with Spot Gold and Silver, or trade the global energy cycle via WTI and Brent Crude benchmarks.</p>
                        <div className={styles.instMeta}>Hedge Capability | Deep Liquidity</div>
                    </div>
                </div>

                <div className={styles.insightBox}>
                    <div className={styles.insightIcon}><Activity size={32} /></div>
                    <div className={styles.insightText}>
                        <h4>Market Correlation Theory</h4>
                        <p>"Understanding the inverse relationship between the USD and Commodities is key to institutional risk hedging. Our platform provides the tools to execute these strategies flawlessly."</p>
                    </div>
                </div>


            </motion.div>
        </section>
    )

    const renderBasics = () => (
        <section className={styles.sectionHero}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <span className={styles.kicker}>The Onboarding Journey</span>
                <h2 className={styles.articleHeading}>From Foundation to <span>Institutional Mastery</span></h2>
                
                <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>A</div>
                        <div className={styles.timelineContent}>
                            <h4>Foundation: The Mechanics of a Pip</h4>
                            <p>Understand the 4th decimal place and why fractional pip pricing is the hallmark of institutional-grade brokers. Mastery of basic unit measurement is the prerequisite for risk management.</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>B</div>
                        <div className={styles.timelineContent}>
                            <h4>Intermediate: Leverage vs. Risk</h4>
                            <p>Leverage is a magnifying glass, not a profit multiplier. Learn to use 1:1000 leverage to increase capital efficiency while keeping your <strong>Effective Leverage</strong> under 1:10.</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>X</div>
                        <div className={styles.timelineContent}>
                            <h4>Advanced: The Theory of Capital Preservation</h4>
                            <p>Professional trading is an exercise in drawdown management. We teach you to focus on the <strong>Sharpe Ratio</strong> and <strong>Expectancy</strong> rather than simple win rates.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.instStatGrid}>
                    <div className={styles.instStatCard}>
                        <span className={styles.instStatValue}>2%</span>
                        <span className={styles.instStatLabel}>Max Risk / Trade</span>
                    </div>
                    <div className={styles.instStatCard}>
                        <span className={styles.instStatValue}>3:1</span>
                        <span className={styles.instStatLabel}>Ideal R:R</span>
                    </div>
                    <div className={styles.instStatCard}>
                        <span className={styles.instStatValue}>50%</span>
                        <span className={styles.instStatLabel}>Stop-Out Level</span>
                    </div>
                    <div className={styles.instStatCard}>
                        <span className={styles.instStatValue}>1:1000</span>
                        <span className={styles.instStatLabel}>Max Capacity</span>
                    </div>
                </div>


            </motion.div>
        </section>
    )

    const renderDemo = () => (
        <section className={styles.sectionHero}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <span className={styles.kicker}>Strategy Sandbox</span>
                <h2 className={styles.articleHeading}>A Risk-Free Lab for <span>Systematic Alpha</span></h2>
                <p className={styles.heroLead}>
                    A Demo account at APFX is not for "practice"—it is a professional environment for backtesting Expert Advisors and validating manual trading hypotheses.
                </p>

                <div className={styles.comparisonGrid}>
                    <div className={styles.comparisonColumn}>
                        <h3>Demo Simulation</h3>
                        <div className={styles.compList}>
                            <div className={styles.compItem}>
                                <h4>Virtual Liquidity</h4>
                                <p>Simulate execution without market impact. Ideal for testing entry/exit logic and indicator correlations.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.comparisonColumn}>
                        <h3>Live Transition</h3>
                        <div className={styles.compList}>
                            <div className={`${styles.compItem} ${styles.compItemActive}`}>
                                <h4>Real Market Depth</h4>
                                <p>Prepare for real-world slippage and commission drag. Moving from Sandbox to Live is the final step in strategy validation.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.insightBox}>
                    <div className={styles.insightIcon}><BookOpen size={32} /></div>
                    <div className={styles.insightText}>
                        <h4>The Professional Journal</h4>
                        <p>"Institutional traders spend 80% of their time reviewing data and 20% executing. Use the Sandbox to build your journal and prove your edge before committing capital."</p>
                    </div>
                </div>


            </motion.div>
        </section>
    )

    const renderSecurity = () => (
        <section className={styles.sectionHero}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <span className={styles.kicker}>Risk Mitigation Framework</span>
                <h2 className={styles.articleHeading}>Systemic Stability & <span>Custodial Excellence</span></h2>
                <p className={styles.heroLead}>
                    Security in institutional finance is built on redundancy, segregation, and encryption. Our framework is designed to protect your capital from both market and systemic risk.
                </p>

                <div className={styles.storyGrid}>
                    <div className={styles.storyCard}>
                        <Shield size={24} className={styles.accent} />
                        <h3>Fund Segregation</h3>
                        <p>Client capital is held in <strong>Off-Balance Sheet</strong> accounts at Tier-1 global banks. Your funds are legally separate from our corporate capital.</p>
                    </div>
                    <div className={styles.storyCard}>
                        <Lock size={24} className={styles.accent} />
                        <h3>Infrastructure Hardening</h3>
                        <p>Redundant server arrays across three continents ensure 100% platform uptime, even during massive global network failures.</p>
                    </div>
                    <div className={styles.storyCard}>
                        <Activity size={24} className={styles.accent} />
                        <h3>Real-time AML Monitoring</h3>
                        <p>Our automated systems monitor for irregular activity to prevent systemic fraud, ensuring the integrity of our liquidity pool.</p>
                    </div>
                </div>

                <div className={styles.diagramWrapper}>
                    <div className={styles.diagramOverlay} />
                    <div style={{ textAlign: 'center', paddingBlock: 'var(--space-8)' }}>
                        <Lock size={48} className={styles.accent} style={{ marginBottom: '1rem' }} />
                        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>The APFX Security Architecture</h4>
                        <p style={{ color: 'var(--color-text-3)', fontSize: 'var(--text-sm)' }}>
                            Multi-layered encryption (AES-256) combined with Tier-1 Banking partnerships forms a vault-like environment for your trading activity.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    )

    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Institutional"
                accentLine="Introduction"
                subtitle="A technical and theoretical analysis of the APFX market microstructure, instruments, and capital management framework."
                breadcrumbs={[{ label: 'Introduction' }]}
            />

            {/* ── TAB NAVIGATION ── */}
            <nav className={styles.tabNav}>
                <div className={styles.container}>
                    <div className={styles.tabList}>
                        {[
                            'Why APFX', 
                            'How Trading Works', 
                            'Markets Overview', 
                            'Trading Basics', 
                            'Demo Account', 
                            'Security & Regulation'
                        ].map((tab) => (
                            <button 
                                key={tab}
                                className={`${styles.tabItem} ${activeTab === tab ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className={styles.main}>
                <div className={styles.container}>
                    {activeTab === 'Why APFX' && renderWhyAPFX()}
                    {activeTab === 'How Trading Works' && renderHowItWorks()}
                    {activeTab === 'Markets Overview' && renderMarkets()}
                    {activeTab === 'Trading Basics' && renderBasics()}
                    {activeTab === 'Demo Account' && renderDemo()}
                    {activeTab === 'Security & Regulation' && renderSecurity()}
                </div>
            </main>

        </div>
    )
}

export default function AboutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AboutContent />
        </Suspense>
    )
}
