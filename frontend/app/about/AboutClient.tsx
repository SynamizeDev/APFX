'use client'

import { useState } from 'react'
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
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './AboutPage.module.css'

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

const INSTRUMENTS = [
    { 
        id: 'fx',
        name: 'Foreign Exchange', 
        icon: Globe, 
        theory: 'The world\'s most liquid market. Trade price fluctuations between global currencies with leverage. Our ECN bridge provides raw spreads on 60+ pairs including EUR/USD, GBP/JPY, and exotic emerging market currencies.',
        stats: 'Leverage up to 1:500 | 24/5 Access'
    },
    { 
        id: 'cmd',
        name: 'Commodities & Energy', 
        icon: Zap, 
        theory: 'Physical value stored in digital CFDs. Hedge against systemic inflation with Spot Gold (XAU) and Silver (XAG), or trade the global energy cycle with WTI and Brent Crude oil benchmarks.',
        stats: 'Deep Liquidity | Institutional Spreads'
    },
    { 
        id: 'ind',
        name: 'Global Indices', 
        icon: BarChart3, 
        theory: 'High-level exposure to entire national economies. Trade the DAX 40, S&P 500, or Nasdaq 100 with the benefit of institutional leverage and deep liquidity across major trading sessions.',
        stats: 'Low Margin | Zero Re-quotes'
    },
    { 
        id: 'stk',
        name: 'Share CFDs', 
        icon: Landmark, 
        theory: 'Direct exposure to global corporate giants via CFDs without physical ownership. Trade Apple, Tesla, Nvidia and 100+ other global stocks with institutional execution speed.',
        stats: 'Dividend Adjustments | Long/Short'
    },
    { 
        id: 'cry',
        name: 'Digital Assets', 
        icon: TrendingUp, 
        theory: 'The frontier of decentralized finance. Trade high-volatility digital assets like Bitcoin, Ethereum, and Solana on our specialized high-availability crypto bridge.',
        stats: '24/5 Execution | Institutional Bridge'
    },
]

export default function AboutPage() {
    const [activeInstrument, setActiveInstrument] = useState<string | null>(null)
    const [bonusOpen, setBonusOpen] = useState(false)

    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Institutional"
                accentLine="Introduction"
                subtitle="A technical and theoretical analysis of the APFX market microstructure, instruments, and capital management framework."
                breadcrumbs={[{ label: 'Introduction' }]}
            />

            <main className={styles.main}>
                <div className={styles.container}>
                    
                    {/* ── SECTION 1: Why Choose APFX? (The Integrity Thesis) ── */}
                    <section className={styles.theorySection}>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className={styles.articleHeading}>Why Choose <span>APFX?</span></h2>
                            <div className={styles.articleBody}>
                                <p>
                                    APFX is founded on the principle of <strong>Zero-Sum Neutrality</strong>. Unlike traditional market makers, we operate a <strong>No Dealing Desk (NDD)</strong> model utilizing <strong>Straight-Through Processing (STP)</strong>. This means we never take the opposite side of your trades; your orders are transmitted directly to a pool of over 30 Tier-1 liquidity providers.
                                </p>
                                <p>
                                    Our value proposition is built on three pillars of institutional excellence: 
                                    <strong> Transparency</strong> in pricing, <strong>Precision</strong> in execution, and <strong>Integrity</strong> in fund management. By co-locating our servers in the Equinix LD4 and NY4 data centers, we provide the same sub-millisecond execution environment used by global investment banks.
                                </p>
                                <div className={styles.theoryHighlightBox}>
                                    <h4>The APFX Edge:</h4>
                                    <ul>
                                        <li><strong>Neutrality:</strong> No conflict of interest via pure agency execution.</li>
                                        <li><strong>Latency:</strong> Physical co-location for &lt; 1ms order processing.</li>
                                        <li><strong>Liquidity:</strong> Aggregated depth from global Tier-1 banks.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* ── SECTION 2: Market Ecosystem (What You Can Trade) ── */}
                    <section className={styles.theorySection}>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className={styles.articleHeading}>What You Can <span>Trade?</span></h2>
                            <div className={styles.articleBody}>
                                <p>
                                    APFX provides a comprehensive multi-asset ecosystem designed for modern portfolio theory. Click on any asset class below to explore the theoretical mechanics and market access specifications.
                                </p>
                                
                                <div className={styles.instrumentList}>
                                    {INSTRUMENTS.map((inst) => (
                                        <div key={inst.id} className={styles.instrumentItem}>
                                            <button 
                                                className={styles.instrumentHeader}
                                                onClick={() => setActiveInstrument(activeInstrument === inst.id ? null : inst.id)}
                                            >
                                                <div className={styles.instTitle}>
                                                    <inst.icon size={20} className={styles.accent} />
                                                    <span>{inst.name}</span>
                                                </div>
                                                {activeInstrument === inst.id ? <Minus size={18} /> : <Plus size={18} />}
                                            </button>
                                            <AnimatePresence>
                                                {activeInstrument === inst.id && (
                                                    <motion.div 
                                                        className={styles.instrumentContent}
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                    >
                                                        <p>{inst.theory}</p>
                                                        <div className={styles.instMeta}>{inst.stats}</div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* ── SECTION 3: Transparent Pricing (Microstructure Theory) ── */}
                    <section className={styles.theorySection}>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className={styles.articleHeading}>Transparent <span>Pricing</span></h2>
                            <div className={styles.articleBody}>
                                <p>
                                    The spread is the difference between the 'Bid' and the 'Ask'. 
                                    Institutional traders demand raw spreads because it reduces their 
                                    cost of entry. At APFX, we pass those raw spreads directly to you.
                                </p>
                                <p>
                                    Our Smart Order Routing (SOR) engine queries the global ECN network in real-time, identifying the single best price-point for every transaction. We provide <strong>Raw Spreads starting from 0.0 pips</strong>, with no hidden markups or dealing desk interference. This radical transparency ensures that you trade at the true market rate, every time.
                                </p>
                                <div className={styles.theoryPoints}>
                                    <div className={styles.theoryPoint}>
                                        <Activity size={18} className={styles.accent} />
                                        <span><strong>Variable Spreads:</strong> Dynamic pricing that adjusts with market liquidity, ensuring optimal rates.</span>
                                    </div>
                                    <div className={styles.theoryPoint}>
                                        <Scale size={18} className={styles.accent} />
                                        <span><strong>Fixed Commissions:</strong> Clear, volume-based pricing for professional transparency.</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* ── SECTION 4: Deposit Bonus (Capital Efficiency) ── */}
                    <section className={styles.theorySection}>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className={styles.articleHeading}>Deposit <span>Bonus</span></h2>
                            <div className={styles.articleBody}>
                                <p>
                                    In institutional trading, <strong>Capital Efficiency</strong> is the key 
                                    to risk management. By doubling your starting margin, we provide 
                                    you with more "breathing room" to maintain positions during market 
                                    fluctuations.
                                </p>
                                
                                <div className={styles.bonusActionArea}>
                                    <button 
                                        className={styles.bonusTheoryBtn}
                                        onClick={() => setBonusOpen(!bonusOpen)}
                                    >
                                        100% Bonus Option Details {bonusOpen ? <Minus size={16} /> : <Plus size={16} />}
                                    </button>
                                    <AnimatePresence>
                                        {bonusOpen && (
                                            <motion.div 
                                                className={styles.bonusTheoryPanel}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                            >
                                                <h4>How to Obtain the 100% Bonus:</h4>
                                                <div className={styles.bonusSteps}>
                                                    <div className={styles.bonusStep}>
                                                        <strong>1. Authenticate:</strong> Complete your KYC verification via the client portal.
                                                    </div>
                                                    <div className={styles.bonusStep}>
                                                        <strong>2. Funding:</strong> Execute an initial deposit (Minimum $100) to activate the offer.
                                                    </div>
                                                    <div className={styles.bonusStep}>
                                                        <strong>3. Execution:</strong> The 100% credit bonus is applied instantly to your account equity, ready for use.
                                                    </div>
                                                </div>
                                                <p className={styles.bonusDisclaimer}>The bonus acts as credit for margin purposes. Terms and volume requirements apply for withdrawal. See our <a href="/bonus-terms">Bonus Terms</a> for full details.</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </section>
                </div>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}