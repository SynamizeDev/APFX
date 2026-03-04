import styles from './Forex.module.css'
import { motion } from 'framer-motion'
import { Clock, Repeat, ArrowRightLeft } from 'lucide-react'

export default function ForexBasics() {
    return (
        <section className={styles.section}>
            <div className={styles.dividerGlowTop} />

            <div className={styles.inner}>
                <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        The <span className={styles.sectionTitleAccent}>Foundation</span> of Trading
                    </h2>
                </header>

                <div className={styles.basicsGrid}>
                    <motion.div
                        className={styles.basicsCard}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.basicsIcon}>
                            <ArrowRightLeft size={24} />
                        </div>
                        <h3 className={styles.basicsTitle}>Currency Pairs</h3>
                        <p className={styles.basicsText}>
                            Forex is always traded in pairs. When you trade, you are simultaneously buying one currency and selling another.
                        </p>

                        <div className={styles.pairDiagram}>
                            <div className={styles.pairBox}>
                                <span className={styles.pairLabel}>Base</span>
                                <span className={styles.pairCurrency}>EUR</span>
                            </div>
                            <div className={styles.pairSlash}>/</div>
                            <div className={styles.pairBox}>
                                <span className={styles.pairLabel}>Quote</span>
                                <span className={styles.pairCurrency}>USD</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.basicsCard}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.basicsIcon}>
                            <Clock size={24} />
                        </div>
                        <h3 className={styles.basicsTitle}>Market Hours</h3>
                        <p className={styles.basicsText}>
                            The Forex market is open 24 hours a day, 5 days a week, following the sun across major global financial hubs.
                        </p>

                        <div className={styles.hoursList}>
                            <div className={styles.hourItem}>
                                <span>Sydney & Tokyo</span>
                                <div className={styles.hourIndicator} />
                                <span>Asian Session</span>
                            </div>
                            <div className={styles.hourItem}>
                                <span>London & Frankfurt</span>
                                <div className={styles.hourIndicator} />
                                <span>European Session</span>
                            </div>
                            <div className={styles.hourItem}>
                                <span>New York & Toronto</span>
                                <div className={styles.hourIndicator} />
                                <span>US Session</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className={styles.dividerGlowBottom} />
        </section>
    )
}
