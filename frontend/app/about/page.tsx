import { Zap, Landmark, ShieldCheck } from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './AboutPage.module.css'

export const metadata = {
    title: 'About Us — APFX',
    description: 'Learn about APFX’s institutional history, our core mission, and our commitment to providing premium global trading infrastructure.',
}

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Redefining Institutional"
                accentLine="Trading for Everyone"
                subtitle="Founded in 2012, APFX was built with a single mission: to provide retail traders with the same deep liquidity and sub-millisecond execution enjoyed by major financial institutions."
                breadcrumbs={[{ label: 'About Us' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            <div className={styles.textSide}>
                                <h2 className={styles.heading}>Our Story</h2>
                                <p className={styles.paragraph}>
                                    What started as a boutique execution desk in London has grown into a global powerhouse
                                    serving over 150 countries. We believe that transparency, speed, and reliability are
                                    not just features—they are the foundation of successful trading.
                                </p>
                                <p className={styles.paragraph}>
                                    Our heritage is rooted in institutional finance, which informs everything we do.
                                    From our Tier-1 liquidity relationships to our Equinix LD4/NY4 data center placements,
                                    we don't cut corners.
                                </p>
                            </div>
                            <div className={styles.imagePlaceholder}>
                                {/* Placeholder for premium office or technology image */}
                                <div className={styles.glassCard}>
                                    <span>2012 - 2026</span>
                                    <h4>A Decade of Excellence</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.values}>
                    <div className={styles.container}>
                        <div className={styles.valuesGrid}>
                            <div className={styles.valueCard}>
                                <div className={styles.icon}>
                                    <Zap size={32} />
                                </div>
                                <h3>Sub-millisecond Speed</h3>
                                <p>Average execution time of 12ms via our fibre-optic cross-connects.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <div className={styles.icon}>
                                    <Landmark size={32} />
                                </div>
                                <h3>Institutional Liquidity</h3>
                                <p>Direct pricing from top-tier global banks and ECN providers.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <div className={styles.icon}>
                                    <ShieldCheck size={32} />
                                </div>
                                <h3>Certified Security</h3>
                                <p>Segregated client accounts and global regulatory compliance.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}
