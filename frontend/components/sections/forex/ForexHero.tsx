import styles from './Forex.module.css'
import { motion } from 'framer-motion'
import { TrendingUp, Globe, Zap } from 'lucide-react'

export default function ForexHero() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContainer}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className={styles.heroEyebrow}>
                        <Zap size={14} className={styles.heroIcon} />
                        <span>The World's Largest Market</span>
                    </div>
                    <h1 className={styles.heroTitle}>
                        What is <span className={styles.heroAccent}>Forex?</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Foreign Exchange (FX) is the global marketplace for exchanging national currencies against one another.
                        With over $7.5 Trillion traded daily, it offers unparalleled liquidity and opportunity.
                    </p>

                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>$7.5T</span>
                            <span className={styles.statLabel}>Daily Volume</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>24/7</span>
                            <span className={styles.statLabel}>Market Access</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>0%</span>
                            <span className={styles.statLabel}>Commissions</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className={styles.heroGlow} />
        </section>
    )
}
