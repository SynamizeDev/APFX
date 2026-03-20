'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Grid3X3, TrendingDown, BadgeDollarSign, Coins } from 'lucide-react'
import styles from './TypesOfStocks.module.css'

const TYPES = [
    {
        icon: Coins,
        title: 'Large-cap',
        text: 'Established companies with relative stability and liquidity.',
    },
    {
        icon: Grid3X3,
        title: 'Mid-cap',
        text: 'Companies in a growth phase, balancing growth and risk.',
    },
    {
        icon: TrendingDown,
        title: 'Small-cap',
        text: 'Higher growth potential with typically higher volatility.',
    },
    {
        icon: BadgeDollarSign,
        title: 'Dividend-led',
        text: 'Focus on income potential from companies that distribute dividends.',
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

