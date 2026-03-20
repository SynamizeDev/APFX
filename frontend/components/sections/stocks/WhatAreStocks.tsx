'use client'

import { motion } from 'framer-motion'
import { CircleCheck, TrendingUp, Droplets } from 'lucide-react'
import styles from './WhatAreStocks.module.css'

const POINTS = [
    {
        icon: TrendingUp,
        title: 'Price growth potential',
        text: 'Participate in the growth of businesses as stock prices move with performance.',
    },
    {
        icon: Droplets,
        title: 'Dividend possibilities',
        text: 'Some companies distribute dividends, which can complement capital appreciation.',
    },
    {
        icon: CircleCheck,
        title: 'Liquidity and transparency',
        text: 'Stocks trade on exchanges, making pricing and information broadly accessible.',
    },
]

export default function WhatAreStocks() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>What are Stocks?</h2>
                <p className={styles.subtitle}>
                    Stocks represent ownership in a company. When the company performs well, the value of
                    your shares may increase.
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

