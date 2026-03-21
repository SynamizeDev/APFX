'use client'

import { BarChart3, TrendingUp, Globe, Smartphone } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './PlatformsPage.module.css'

// Metadata moved to page.tsx (Server Component)

const PLATFORMS = [
    {
        name: 'Advanced Web Terminal',
        tag: 'Institution Grade',
        desc: 'Institution-grade browser platform with advanced charting, one-click trading, and deep liquidity access. Designed to give you an edge without sacrificing performance.',
        features: [
            'Advanced Charting',
            'One-Click Trading',
            'Deep Liquidity Access',
            'No Installation',
        ],
        icon: <BarChart3 size={42} strokeWidth={1.6} />,
    },
    {
        name: 'TradingView Integration',
        tag: 'Chart Your Way',
        desc: 'Trade directly from TradingView charts with powerful technical analysis, custom scripts, and a massive community of social trading tools.',
        features: [
            'Direct Execution',
            'Custom Pine Scripts',
            'Social Network',
            'Advanced Studies',
        ],
        icon: <TrendingUp size={42} strokeWidth={1.6} />,
    },
    {
        name: 'WebTrader',
        tag: 'Trading without Limits',
        desc: 'Access the markets instantly from any modern browser with no installation required. Fully synchronized with your desktop and mobile platforms.',
        features: [
            'Zero Installation',
            'Lightweight Performance',
            'Advanced Analytical Tools',
            'Real-Time Account Sync',
        ],
        icon: <Globe size={42} strokeWidth={1.6} />,
    },
    {
        name: 'Mobile Trading App',
        tag: 'Trading on the Go',
        desc: 'Full trading functionality on iOS and Android with real-time synchronization across devices. Institutional-grade execution in your pocket.',
        features: [
            'Full Mobile Trading Control',
            'Push Notifications',
            'Real-Time Charts',
            'Biometric Security',
        ],
        icon: <Smartphone size={42} strokeWidth={1.6} />,
    },
]

/* ──────────────────────────────────────────────────────────
   Motion system — premium, directional, confidence-led
   ────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: 'easeOut' },
    },
}

export default function PlatformsPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Platforms That Scale"
                accentLine="From Desktop to Mobile"
                subtitle="Run your trading the way institutional desks do. Desktop, WebTrader, and mobile are all connected to the same low-latency, fibre-backed infrastructure."
                breadcrumbs={[]}
            />

            <main className={styles.main}>
                {/* ── Platforms List ─────────────────────── */}
                <section className={`${styles.section} apfx-section`}>
                    <div className={styles.container}>
                        <div className={styles.platformList}>
                            {PLATFORMS.map((p, i) => (
                                <motion.div
                                    key={p.name}
                                    className={`${styles.platformItem} ${i % 2 !== 0 ? styles.reverse : ''
                                        }`}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-120px' }}
                                >
                                    <div className={styles.info}>
                                        <span className={styles.tag}>{p.tag}</span>
                                        <h2 className={styles.name}>{p.name}</h2>
                                        <p className={styles.desc}>{p.desc}</p>

                                        <ul className={styles.features}>
                                            {p.features.map((f) => (
                                                <li key={f}>{f}</li>
                                            ))}
                                        </ul>

                                        <div className={styles.actions}>
                                            <button className={styles.btnPrimary}>
                                                Download Platform
                                            </button>
                                            <button className={styles.btnSecondary}>
                                                View Quick Guide
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.visual}>
                                        <motion.div
                                            className={styles.visualIcon}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.6,
                                                ease: 'easeOut',
                                            }}
                                        >
                                            {p.icon}
                                        </motion.div>
                                        <div className={styles.glow} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ────────────────────────────────── */}
                <section className={`${styles.ctaSection} apfx-section`}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.ctaBox}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <h2>One Account. Every Platform.</h2>
                            <p>
                                Trade seamlessly across desktop, web, and mobile
                                using a single APFX account and unified liquidity
                                pool.
                            </p>
                            <button className={styles.btnAccent}>
                                Start Trading Now
                            </button>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}