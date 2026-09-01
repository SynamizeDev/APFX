'use client'

import Image from 'next/image'
import { useInViewport } from '@/hooks/useInViewport'
import styles from './TradingPlatforms.module.css'

export default function TradingPlatforms() {
    const { ref: sectionRef } = useInViewport()

    return (
        <section ref={sectionRef} className={`${styles.section} apfx-section`} aria-labelledby="platforms-heading">
            <div className={styles.inner}>
                <div className={styles.content}>
                    <span className={styles.eyebrow}>Award-Winning Tech</span>
                    <h2 id="platforms-heading" className={styles.title}>
                        Institutional-Grade CFD Trading Platforms
                    </h2>
                    <p className={styles.desc}>
                        Built for speed, stability, and precision.
                    </p>

                    <div className={styles.buttonsGroup}>
                        <a
                            href="https://app.apfxglobal.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.bigCtaBtn}
                        >
                            <div className={styles.bigCtaIcon}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="2" y="4" width="20" height="16" rx="3" ry="3"/>
                                    <line x1="2" y1="9" x2="22" y2="9"/>
                                    <circle cx="5.5" cy="6.5" r="0.75" fill="currentColor"/>
                                    <circle cx="8" cy="6.5" r="0.75" fill="currentColor"/>
                                    <circle cx="10.5" cy="6.5" r="0.75" fill="currentColor"/>
                                </svg>
                            </div>
                            <div className={styles.bigCtaTextGroup}>
                                <span className={styles.bigCtaSubtext}>Trade on the</span>
                                <span className={styles.bigCtaTitle}>Web app</span>
                            </div>
                        </a>

                        <a
                            href="https://apps.apple.com/in/app/apfx-ctrader/id6797503642"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.bigCtaBtn}
                            aria-label="Download APFX cTrader on Apple App Store"
                        >
                            <div className={styles.bigCtaIcon}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.19.67-2.9 1.5-.64.74-1.2 1.92-1.05 3.05 1.12.09 2.29-.62 2.96-1.44z" />
                                </svg>
                            </div>
                            <div className={styles.bigCtaTextGroup}>
                                <span className={styles.bigCtaSubtext}>Download on the</span>
                                <span className={styles.bigCtaTitle}>App Store</span>
                            </div>
                        </a>

                        <a
                            href="https://play.google.com/store/apps/details?id=com.apfx.ct&pcampaignid=web_share"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.bigCtaBtn}
                            aria-label="Get APFX cTrader on Google Play"
                        >
                            <div className={styles.bigCtaIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M3.609 1.814A1.99 1.99 0 0 0 3 3.234v17.532c0 .546.22 1.04.609 1.42l.07.07L13.88 12.06v-.12L3.68 1.74l-.071.074zM17.26 8.68l-3.38 3.38 3.38 3.38 3.82-2.17c1.09-.62 1.09-1.63 0-2.25L16.14 16.51L12.76 13.13 3.68 22.21c.42.44 1.1.51 1.74.15l10.72-5.85zM16.14 7.49L5.42 1.64c-.64-.36-1.32-.29-1.74.15l9.08 9.08 3.38-3.38z"/>
                                </svg>
                            </div>
                            <div className={styles.bigCtaTextGroup}>
                                <span className={styles.bigCtaSubtext}>Get it on</span>
                                <span className={styles.bigCtaTitle}>Google Play</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div className={styles.visual} aria-hidden="true">
                    <div className={styles.imageContainer}>
                        <Image 
                            src="/assets/device-bg.png" 
                            alt="Trading Platforms" 
                            width={1200}
                            height={800}
                            className={styles.platformImage}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
