'use client'

import { ArrowRight, HeadphonesIcon, Globe } from 'lucide-react'
import Link from 'next/link'
import styles from './CTABanner.module.css'

export default function CTABanner() {
    return (
        <section className={`${styles.section} apfx-section`}>
            <div className={styles.container}>
                <div className={styles.glassCard}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>Ready to Trade with a True Institutional Edge?</h2>
                        <p className={styles.desc}>
                            Join 27,000+ active traders and experience execution, pricing, and support that
                            feel closer to a prop desk than a retail broker.
                        </p>
                        <div className={styles.actions}>
                            <Link href="/contact" className={styles.btnSecondary}>
                                Speak to an Expert
                            </Link>
                        </div>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <div className={styles.statIcon}>
                                <HeadphonesIcon size={24} />
                            </div>
                            <div className={styles.statInfo}>
                                <h6>24/7 Support</h6>
                                <p>Multilingual Experts</p>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statIcon}>
                                <Globe size={24} />
                            </div>
                            <div className={styles.statInfo}>
                                <h6>Global Access</h6>
                                <p>150+ Countries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
