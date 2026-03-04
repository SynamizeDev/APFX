'use client'

import { Mail, Phone } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './ContactPage.module.css'
import ContactForm from './ContactForm'

// Metadata moved to page.tsx (Server Component)

/* ──────────────────────────────────────────────────────────
   Motion system — calm, premium, trust-led
   ────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
        },
    },
}

export default function ContactPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Talk to a Team"
                accentLine="That Understands Your Flow"
                subtitle="Whether you need help with onboarding, execution routing, or institutional-grade liquidity, our desks and support teams are available 24/5."
                breadcrumbs={[{ label: 'Contact' }]}
            />

            <main className={styles.main}>
                <section className={`${styles.section} apfx-section`}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.contactGrid}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            {/* ── Contact Form ───────────────────── */}
                            <motion.div variants={fadeUp}>
                                <ContactForm />
                            </motion.div>

                            {/* ── Info Side ─────────────────────── */}
                            <motion.aside
                                className={styles.infoSide}
                                variants={stagger}
                            >
                                <motion.div
                                    className={styles.infoGroup}
                                    variants={fadeUp}
                                >
                                    <h4>Global Support</h4>
                                    <p>
                                        Our client services team operates 24 hours a
                                        day, five days a week, across global time
                                        zones.
                                    </p>

                                    <motion.div
                                        className={styles.contactLink}
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Mail size={18} />
                                        support@apfx.com
                                    </motion.div>

                                    <motion.div
                                        className={styles.contactLink}
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Phone size={18} />
                                        +44 (0) 20 3000 0000
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    className={styles.officeGrid}
                                    variants={stagger}
                                >
                                    <motion.div
                                        className={styles.office}
                                        variants={fadeUp}
                                    >
                                        <h5>London (HQ)</h5>
                                        <p>
                                            123 Financial District, Canary Wharf,
                                            London, United Kingdom
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className={styles.office}
                                        variants={fadeUp}
                                    >
                                        <h5>Dubai</h5>
                                        <p>
                                            Level 45, Emirates Towers, Sheikh Zayed
                                            Road, Dubai, UAE
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className={styles.office}
                                        variants={fadeUp}
                                    >
                                        <h5>Singapore</h5>
                                        <p>
                                            Marina Bay Financial Centre, Tower 3,
                                            Singapore
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </motion.aside>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}