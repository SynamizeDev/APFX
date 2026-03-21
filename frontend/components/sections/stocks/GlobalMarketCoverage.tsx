'use client'

import { motion } from 'framer-motion'
import styles from './GlobalMarketCoverage.module.css'

const MARKETS = [
    { region: 'Americas', hubs: 'NYSE, NASDAQ', symbols: ['AAPL', 'TSLA', 'NVDA', 'MSFT'] },
    { region: 'Europe', hubs: 'LSE, Euronext, Frankfurt', symbols: ['VOW3', 'ASML', 'MC.PA'] },
    { region: 'Asia-Pacific', hubs: 'NSE, HKEX, TSE', symbols: ['RELIANCE', 'TCS', 'BABA', '7203'] },
]

export default function GlobalMarketCoverage() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Global Market Coverage</h2>
                    <p className={styles.subtitle}>Execute strategies across major world exchanges with zero geographic barriers.</p>
                </div>

                <div className={styles.grid}>
                    {MARKETS.map((m, i) => (
                        <motion.div
                            key={m.region}
                            className={styles.marketCard}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <h3 className={styles.region}>{m.region}</h3>
                            <p className={styles.hubs}>{m.hubs}</p>
                            <div className={styles.symbolGrid}>
                                {m.symbols.map(s => (
                                    <span key={s} className={styles.symbol}>{s}</span>
                                ))}
                                <span className={styles.more}>+ thousands more</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
