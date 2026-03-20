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
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className={styles.eyebrow}>
                        <TrendingUp size={14} className={styles.eyebrowIcon} />
                        <span>Ownership, liquidity, and growth</span>
                    </div>

                    <h1 className={styles.title}>
                        Invest in <span className={styles.accent}>Stocks</span> with Confidence
                    </h1>

                    <p className={styles.subtitle}>
                        Stocks can help you participate in long-term business growth. Learn the basics,
                        explore common categories, and understand the risks so you can invest with clarity.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/contact" className={styles.ctaPrimary}>
                            Speak to an Expert <ArrowRight size={18} />
                        </Link>
                        <Link href="#types" className={styles.ctaSecondary}>
                            Explore Stock Types
                        </Link>
                    </div>

                    <p className={styles.trust}>
                        Investments are subject to market risk. Read scheme documents carefully.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

