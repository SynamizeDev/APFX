'use client'

import { motion } from 'framer-motion'
import { CircleCheck, TrendingUp, Droplets } from 'lucide-react'
import styles from './WhatAreStocks.module.css'

const POINTS = [
    {
        icon: TrendingUp,
        title: 'Capital Appreciation',
        text: 'Capitalize on corporate expansion as stock valuations move in correlation with business performance and market demand.',
    },
    {
        icon: Droplets,
        title: 'Yield Generation',
        text: 'Institutional-grade dividend-paying corporations provide consistent yield potential, complementing long-term growth.',
    },
    {
        icon: CircleCheck,
        title: 'Market Transparency',
        text: 'Traded on regulated global exchanges, stocks provide high-fidelity pricing data and deep liquidity for seamless exit strategies.',
    },
]

export default function WhatAreStocks() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>What are Stocks?</h2>
                <p className={styles.subtitle}>
                    Stocks represent a fractional ownership in a corporation. As the company expands 
                    and generates value, shareholders may benefit from capital appreciation and 
                    potential dividend distributions.
                </p>

                <div className={styles.grid}>
                    {POINTS.map((p, i) => (
                        <motion.div
                            key={p.title}
                            className={styles.card}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                        >
                            <div className={styles.iconWrap}>
                                <p.icon size={22} />
                            </div>
                            <h3 className={styles.cardTitle}>{p.title}</h3>
                            <p className={styles.cardText}>{p.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

