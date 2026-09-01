'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, Monitor, Smartphone } from 'lucide-react'
import styles from './PlatformsPage.module.css'

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
}

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export default function PlatformsClient() {
    const scrollToCtrader = (e: React.MouseEvent) => {
        e.preventDefault()
        const el = document.getElementById('ctrader-section')
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className={styles.page}>
            {/* ── 1. HERO SECTION ────────────────────────────────────────────── */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.heroContent}
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeUp} className={styles.eyebrowBadge}>
                            <span className={styles.eyebrowDot} />
                            APFX TRADING PLATFORMS
                        </motion.div>

                        <motion.h1 variants={fadeUp} className={styles.heroHeadline}>
                            Trade Your Way.
                        </motion.h1>

                        <motion.p variants={fadeUp} className={styles.heroSubtext}>
                            Choose the platform that fits the way you trade.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── 2. MAIN PLATFORM SECTION ───────────────────────────────────── */}
            <section className={styles.mainSection} id="choose-platform">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={fadeUp}
                    >
                        <h2 className={styles.sectionTitle}>Choose Your Trading Platform</h2>
                    </motion.div>

                    <div className={styles.cardsGrid}>
                        {/* Card 1: Advanced Web Terminal */}
                        <motion.div
                            className={styles.platformCard}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={fadeUp}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.platformBadge}>
                                    <Monitor size={22} className={styles.cardIcon} />
                                    <span>Web Browser</span>
                                </div>
                                <h3 className={styles.cardTitle}>Advanced Web Terminal</h3>
                                <p className={styles.cardDesc}>
                                    Trade directly from your browser with a fast and convenient web-based trading experience. No installation required.
                                </p>
                            </div>

                            <div className={styles.cardActions}>
                                <a
                                    href="https://app.apfxglobal.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.btnPrimary}
                                >
                                    Trade on Web <ArrowRight size={18} />
                                </a>
                            </div>
                        </motion.div>

                        {/* Card 2: APFX cTrader App */}
                        <motion.div
                            id="ctrader-section"
                            className={styles.platformCard}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={fadeUp}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.platformBadge}>
                                    <Smartphone size={22} className={styles.cardIcon} />
                                    <span>Mobile App</span>
                                </div>
                                <h3 className={styles.cardTitle}>APFX cTrader App</h3>
                                <p className={styles.cardDesc}>
                                    Take your trading with you. Access APFX cTrader from your mobile device and trade wherever you are.
                                </p>
                            </div>

                            <div className={styles.cardActionsGroup}>
                                <a
                                    href="https://apps.apple.com/in/app/apfx-ctrader/id6797503642"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.downloadBadge}
                                    aria-label="Download on the App Store"
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.19.67-2.9 1.5-.64.74-1.2 1.92-1.05 3.05 1.12.09 2.29-.62 2.96-1.44z" />
                                    </svg>
                                    <div className={styles.badgeText}>
                                        <span className={styles.badgeSub}>Download on the</span>
                                        <span className={styles.badgeMain}>App Store</span>
                                    </div>
                                </a>

                                <a
                                    href="https://play.google.com/store/apps/details?id=com.apfx.ct&pcampaignid=web_share"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.downloadBadge}
                                    aria-label="Get it on Google Play"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M3.609 1.814A1.99 1.99 0 0 0 3 3.234v17.532c0 .546.22 1.04.609 1.42l.07.07L13.88 12.06v-.12L3.68 1.74l-.071.074zM17.26 8.68l-3.38 3.38 3.38 3.38 3.82-2.17c1.09-.62 1.09-1.63 0-2.25L16.14 16.51L12.76 13.13 3.68 22.21c.42.44 1.1.51 1.74.15l10.72-5.85zM16.14 7.49L5.42 1.64c-.64-.36-1.32-.29-1.74.15l9.08 9.08 3.38-3.38z"/>
                                    </svg>
                                    <div className={styles.badgeText}>
                                        <span className={styles.badgeSub}>Get it on</span>
                                        <span className={styles.badgeMain}>Google Play</span>
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── 3. CONCISE INFORMATIONAL SECTION ───────────────────────────── */}
            <section className={styles.infoSection}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.infoBox}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={fadeUp}
                    >
                        <h2 className={styles.infoHeading}>Built for the way you trade</h2>

                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoTitleGroup}>
                                    <Monitor size={20} className={styles.infoIcon} />
                                    <h3>Web Terminal</h3>
                                </div>
                                <p>Trade directly from your browser without installing software.</p>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoTitleGroup}>
                                    <Smartphone size={20} className={styles.infoIcon} />
                                    <h3>APFX cTrader App</h3>
                                </div>
                                <p>Trade on the go with APFX cTrader on iOS and Android.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── 4. FINAL CTA ────────────────────────────────────────────────── */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.ctaBox}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2 className={styles.ctaHeadline}>Ready to Trade?</h2>
                        <p className={styles.ctaSubtext}>
                            Choose your platform and get started with APFX.
                        </p>

                        <div className={styles.ctaButtonsGroup}>
                            <a
                                href="https://app.apfxglobal.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.btnPrimaryLarge}
                            >
                                Trade on Web <ArrowRight size={20} />
                            </a>
                            <button
                                onClick={scrollToCtrader}
                                className={styles.btnSecondaryLarge}
                            >
                                Download APFX cTrader
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
