'use client'

import { Monitor, Smartphone, LayoutDashboard, Zap, Activity, Clock } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/animations/AnimatedSection'
import styles from './page.module.css'

export default function PlatformsPage() {
    return (
        <>
            <Header />

            <main style={{ backgroundColor: 'var(--color-bg)' }}>
                {/* Hero Section */}
                <section className={styles.platformsHero}>
                    <AnimatedSection>
                        <h1 className={styles.heroTitle}>Trade on the World's <br /> Most Advanced Terminals</h1>
                        <p className={styles.heroSubtitle}>
                            Whether you prefer web, desktop, or mobile—our infrastructure seamlessly routes your orders to top-tier liquidity providers with execution paths averaging under 12ms.
                        </p>
                    </AnimatedSection>
                </section>

                {/* Bento Grid */}
                <section className={styles.bentoGridSection}>
                    <div className={styles.bentoGrid}>

                        {/* WebTrader - Large Span */}
                        <div className={`${styles.bentoCard} ${styles.largeCard}`}>
                            <div className={styles.cardIcon}>
                                <LayoutDashboard size={40} />
                            </div>
                            <h3 className={styles.cardTitle}>APFX WebTrader</h3>
                            <p className={styles.cardDesc}>
                                Our proprietary HTML5 terminal. Access institutional spread betting and CFD trading directly from any browser without downloading software.
                            </p>
                            <ul className={styles.cardFeatureList}>
                                <li className={styles.featureItem}><span className={styles.featureCheck}>✓</span> Integrated TradingView Charting</li>
                                <li className={styles.featureItem}><span className={styles.featureCheck}>✓</span> One-Click Execution via UI</li>
                                <li className={styles.featureItem}><span className={styles.featureCheck}>✓</span> Real-Time DOM & Depth of Market</li>
                            </ul>
                        </div>

                        {/* Mobile App - Tall Span */}
                        <div className={`${styles.bentoCard} ${styles.tallCard}`}>
                            <div className={styles.cardIcon}>
                                <Smartphone size={40} />
                            </div>
                            <h3 className={styles.cardTitle}>Mobile App</h3>
                            <p className={styles.cardDesc}>
                                Never miss a market move. Full account management, charting, and execution capabilities engineered natively for iOS and Android.
                            </p>
                            <ul className={styles.cardFeatureList}>
                                <li className={styles.featureItem}><span className={styles.featureCheck}>✓</span> Push Alert Price Notifications</li>
                                <li className={styles.featureItem}><span className={styles.featureCheck}>✓</span> Secure Biometric Login</li>
                                <li className={styles.featureItem}><span className={styles.featureCheck}>✓</span> Manage Open Orders on the Go</li>
                                <li className={styles.featureItem}><span className={styles.featureCheck}>✓</span> Custom Dashboards</li>
                            </ul>
                        </div>

                        {/* FIX API */}
                        <div className={styles.bentoCard}>
                            <div className={styles.cardIcon}>
                                <Zap size={32} />
                            </div>
                            <h3 className={styles.cardTitle}>FIX API 4.4</h3>
                            <p className={styles.cardDesc}>
                                Direct market access for algorithmic and HFT traders requiring absolute sub-millisecond execution control.
                            </p>
                        </div>

                        {/* MT5 / Desktop */}
                        <div className={styles.bentoCard}>
                            <div className={styles.cardIcon}>
                                <Monitor size={32} />
                            </div>
                            <h3 className={styles.cardTitle}>MetaTrader 5</h3>
                            <p className={styles.cardDesc}>
                                The global industry standard platform. MQL5 custom indicator support, strategy testing, and algorithmic trading.
                            </p>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}