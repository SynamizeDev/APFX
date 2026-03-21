'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Grid3X3, TrendingDown, BadgeDollarSign, Coins } from 'lucide-react'
import styles from './TypesOfStocks.module.css'

const TYPES = [
    {
        icon: Coins,
        title: 'Blue-Chip & Large-Cap',
        text: 'Institutional industry leaders with multibillion-dollar valuations, proven resilience, and high-volume liquidity across global sessions.',
    },
    {
        icon: Grid3X3,
        title: 'Mid-Cap Growth',
        text: 'Agile companies transitioning into market-dominant roles, offering an optimized balance of volatility and expansion potential.',
    },
    {
        icon: TrendingDown,
        title: 'Small-Cap & Emerging',
        text: 'High-alpha opportunities in developing sectors, characterized by accelerated growth trajectories and higher risk-reward asymmetries.',
    },
    {
        icon: BadgeDollarSign,
        title: 'Defensive & Income',
        text: 'Mature corporations focused on shareholder value through consistent yield distributions and stable cash flow generation.',
    },
]

export default function TypesOfStocks() {
    return (
        <section className={styles.section} id="types">
            <div className={styles.container}>
                <div className={styles.headerRow}>
                    <h2 className={styles.title}>Types of Stocks</h2>
                    <p className={styles.subtitle}>Different categories can match different goals and time horizons.</p>
                </div>

                <div className={styles.grid}>
                    {TYPES.map((t, i) => (
                        <motion.div
                            key={t.title}
                            className={styles.card}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                        >
                            <div className={styles.iconWrap}>
                                <t.icon size={22} />
                            </div>
                            <h3 className={styles.cardTitle}>{t.title}</h3>
                            <p className={styles.cardText}>{t.text}</p>
                        </motion.div>
                    ))}
                </div>

                <div className={styles.bottomHint}>
                    <span className={styles.hintIcon}>
                        <ArrowRight size={18} />
                    </span>
                    <span>Choose categories thoughtfully and review risk before investing.</span>
                </div>
            </div>
        </section>
    )
}

