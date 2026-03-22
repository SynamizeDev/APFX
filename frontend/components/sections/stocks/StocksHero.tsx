'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import styles from './StocksHero.module.css'

export default function StocksHero() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className={styles.eyebrow}>
                        <TrendingUp size={14} className={styles.eyebrowIcon} />
                        <span>Direct Market Access & Institutional Liquidity</span>
                    </div>

                    <h1 className={styles.title}>
                        Global Equity Infrastructure: Invest in the <span className={styles.glowAccent}>World’s Leading Corporations</span>
                    </h1>
 
                    <p className={styles.subtitle}>
                        Secure direct ownership of global equities with institutional-grade execution speed. 
                        Our deep liquidity pools and Tier-1 bank connectivity ensure optimal market 
                        pricing and minimal slippage on every transaction.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/contact" className={styles.ctaPrimary}>
                            Get Institutional Access <ArrowRight size={18} />
                        </Link>
                        <Link href="#types" className={styles.ctaSecondary}>
                            View Market Coverage
                        </Link>
                    </div>

                    <p className={styles.trust}>
                        Trading involves significant risk. Capital at risk.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

