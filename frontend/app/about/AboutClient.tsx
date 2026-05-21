'use client'

import { useState, useEffect, Suspense } from 'react'
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
    Landmark
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
            </motion.div>
        </section>
    )

    const renderHowItWorks = () => (
        <section className={styles.sectionHero}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <span className={styles.kicker}>Market Microstructure</span>
                <h2 className={styles.articleHeading}>The Anatomy of a <span>High-Frequency Trade</span></h2>
                <p className={styles.heroLead}>
                    Understanding what happens behind the screen is the first step to mastering execution. APFX provides a direct line to the world's most sophisticated liquidity hubs.
                </p>

                {/* ── TIMELINE ── */}
                <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>01</div>
                        <div className={styles.timelineContent}>
                            <h4>Order Entry</h4>
                            <p>You execute a trade via the APFX platform. Your request is encrypted and transmitted via fiber-optic lines to our central trade server.</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>02</div>
                        <div className={styles.timelineContent}>
                            <h4>Smart Order Routing (SOR)</h4>
                            <p>Our SOR engine scans the "Top of Book" across 30+ Tier-1 banks in less than 150 microseconds to find the absolute best bid/ask.</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>03</div>
                        <div className={styles.timelineContent}>
                            <h4>Liquidity Matching</h4>
                            <p>Your volume is matched against the selected Liquidity Provider (LP). If you are trading large volume, the order is "swept" across multiple providers for the best VWAP.</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>04</div>
                        <div className={styles.timelineContent}>
                            <h4>Confirmation</h4>
                            <p>The fill is confirmed by the LP and reflected in your terminal. Total round-trip latency: &lt; 5ms.</p>
                        </div>
                    </div>
                </div>

                {/* ── DIAGRAM PLACEHOLDER ── */}
                <div className={styles.diagramWrapper}>
                    <div className={styles.diagramOverlay} />
                    <div style={{ textAlign: 'center', paddingBlock: 'var(--space-8)' }}>
                        <Cpu size={48} className={styles.accent} style={{ marginBottom: '1rem' }} />
                        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Visualizing the Aggregated Order Book</h4>
                        <p style={{ color: 'var(--color-text-3)', fontSize: 'var(--text-sm)' }}>
                            Imagine 30 banks all shouting their best prices at once. Our engine picks the two best ones (Bid and Ask) and presents them to you as a single, raw spread.
                        </p>
                    </div>
                </div>

                {/* ── STAT GRID ── */}
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
                        <span className={styles.instStatValue}>0.0</span>
                        <span className={styles.instStatLabel}>Min Spread</span>
                    </div>
                </div>
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
