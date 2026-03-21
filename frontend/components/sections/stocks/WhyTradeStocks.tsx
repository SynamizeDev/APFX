'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, BarChart3, Globe2, Layers } from 'lucide-react'
import styles from './WhyTradeStocks.module.css'

const BENEFITS = [
    {
        icon: Zap,
        title: 'Ultra-Low Latency',
        text: 'Execute trades with sub-millisecond precision through our direct Tier-1 bank connectivity and fiber-optic cross-connects.',
    },
    {
        icon: ShieldCheck,
        title: 'Institutional Liquidity',
        text: 'Access deep, multi-asset liquidity pools ensuring competitive pricing even during high-volatility market events.',
    },
    {
        icon: BarChart3,
        title: 'Professional Analytics',
        text: 'Utilize advanced charting, real-time market depth data, and institutional-grade research tools at your fingertips.',
    },
    {
        icon: Globe2,
        title: 'Global Market Access',
        text: 'Trade 10,000+ equities across US, European, and Asian exchanges from a single, unified trading terminal.',
    },
    {
        icon: Layers,
        title: 'Systemic Diversification',
        text: 'Build a resilient portfolio by allocating across sectors, industries, and geographic regions with ease.',
    },
]

export default function WhyTradeStocks() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Why Trade Stocks with <span className={styles.accent}>APFX</span></h2>
                    <p className={styles.subtitle}>Elevating the retail experience to institutional standards through technology and transparency.</p>
                </div>

                <div className={styles.grid}>
                    {BENEFITS.map((b, i) => (
                        <motion.div
                            key={b.title}
                            className={styles.card}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <div className={styles.iconBox}>
                                <b.icon size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>{b.title}</h3>
                            <p className={styles.cardText}>{b.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
