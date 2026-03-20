'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import styles from './StocksRiskDisclosure.module.css'

export default function StocksRiskDisclosure() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                >
                    <div className={styles.header}>
                        <span className={styles.icon}>
                            <AlertTriangle size={20} />
                        </span>
                        <h2 className={styles.title}>Risk Disclosure</h2>
                    </div>

                    <p className={styles.text}>
                        Stocks are not risk-free. Prices can go down as well as up, and your investment
                        may lose value.
                    </p>

                    <ul className={styles.list}>
                        <li>Do not invest money you cannot afford to lose.</li>
                        <li>Consider diversification and your time horizon.</li>
                        <li>Review company and market information before investing.</li>
                        <li>Past performance is not indicative of future results.</li>
                    </ul>
                </motion.div>
            </div>
        </section>
    )
}

