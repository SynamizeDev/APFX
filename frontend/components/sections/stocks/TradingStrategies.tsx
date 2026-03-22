'use client'

import { motion } from 'framer-motion'
import { Rocket, Wallet, Target } from 'lucide-react'
import styles from './TradingStrategies.module.css'

const STRATEGIES = [
    {
        icon: Rocket,
        title: 'Capital Appreciation (Growth)',
        text: 'Allocate toward high-velocity sectors like Technology and Biotech to capture aggressive market expansion.',
    },
    {
        icon: Wallet,
        title: 'Yield Maximization (Income)',
        text: 'Prioritize mature, stable corporations with consistent dividend track records for defensive portfolio stability.',
    },
    {
        icon: Target,
        title: 'High-Alpha (Tactical)',
        text: 'Utilize technical markers and institutional flow data for short-term opportunities in emerging mid-caps.',
    },
]

export default function TradingStrategies() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Investment Strategies</h2>
                    <p className={styles.subtitle}>Standardize your deployment with proven institutional methodologies.</p>
                </div>

                <div className={styles.grid}>
                    {STRATEGIES.map((s, i) => (
                        <motion.div
                            key={s.title}
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className={styles.iconBox}>
                                <s.icon size={22} />
                            </div>
                            <h3 className={styles.cardTitle}>{s.title}</h3>
                            <p className={styles.cardText}>{s.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
