'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/animations/AnimatedSection'
import styles from './page.module.css'

export default function AboutPage() {
    return (
        <>
            <Header />

            <main style={{ backgroundColor: 'var(--color-bg)' }}>
                {/* Hero Section */}
                <section className={styles.aboutHero}>
                    <AnimatedSection>
                        <h1 className={styles.heroTitle}>Engineering the Future <br /> of Global Trading</h1>
                        <p className={styles.heroSubtitle}>
                            APFX was founded on a singular vision: to dismantle the barriers between retail traders and institutional-grade market access. Today, we process billions in daily volume globally.
                        </p>
                    </AnimatedSection>
                </section>

                {/* Live Stats Bar */}
                <section className={styles.statsSection}>
                    <AnimatedSection>
                        <div className={styles.statsGrid}>
                            <motion.div className={styles.statItem} whileHover={{ scale: 1.05 }}>
                                <h3>$12B+</h3>
                                <p>Daily Volume</p>
                            </motion.div>
                            <motion.div className={styles.statItem} whileHover={{ scale: 1.05 }}>
                                <h3>12ms</h3>
                                <p>Average Execution</p>
                            </motion.div>
                            <motion.div className={styles.statItem} whileHover={{ scale: 1.05 }}>
                                <h3>150+</h3>
                                <p>Countries Served</p>
                            </motion.div>
                            <motion.div className={styles.statItem} whileHover={{ scale: 1.05 }}>
                                <h3>300+</h3>
                                <p>Global Employees</p>
                            </motion.div>
                        </div>
                    </AnimatedSection>
                </section>

                {/* Mission & Timeline */}
                <section className={styles.missionSection}>
                    <AnimatedSection delay={0.1}>
                        <div className={styles.missionContent}>
                            <h2>Our Mission</h2>
                            <p>
                                At APFX, we believe that superior technology is the great equalizer in financial markets. For too long, ultra-low latency execution and deep liquidity were reserved exclusively for hedge funds and investment banks.
                            </p>
                            <p>
                                We've spent the last decade building a proprietary matchmaking engine and cultivating deep relationships with Tier-1 liquidity providers to change that. Whether you are executing a 1-lot algorithmic script or hedging a multi-million dollar corporate exposure, our infrastructure treats your flow with identical priority and precision.
                            </p>
                            <p>
                                We don't just provide a platform; we provide an edge.
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <div className={styles.timeline}>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineYear}>2015</div>
                                <h4 className={styles.timelineTitle}>The Foundation</h4>
                                <p className={styles.timelineDesc}>APFX is established in London by a team of former investment bank quantitative developers seeking to build a better retail broker.</p>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineYear}>2018</div>
                                <h4 className={styles.timelineTitle}>Equinix NY4 Integration</h4>
                                <p className={styles.timelineDesc}>We migrate our core trading servers to Equinix NY4, establishing direct cross-connects with major liquidity providers and cutting execution time by 40%.</p>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineYear}>2021</div>
                                <h4 className={styles.timelineTitle}>Global Expansion</h4>
                                <p className={styles.timelineDesc}>APFX opens regional headquarters in Singapore and Dubai, achieving regulatory licenses from top-tier authorities worldwide.</p>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineYear}>2024</div>
                                <h4 className={styles.timelineTitle}>Next-Gen Infrastructure</h4>
                                <p className={styles.timelineDesc}>Launch of the proprietary APFX WebTrader and integration of over 20,000 new global equities and crypto CFDs.</p>
                            </div>
                        </div>
                    </AnimatedSection>
                </section>
            </main>

            <Footer />
        </>
    )
}