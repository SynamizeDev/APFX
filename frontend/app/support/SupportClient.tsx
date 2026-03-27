'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import { Mail, Clock, Headphones, ShieldCheck, Globe, Zap } from 'lucide-react'
import styles from '@/components/layout/LegalLayout.module.css'

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
}

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export default function SupportClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Customer"
                accentLine="Support"
                subtitle="We're here to help you every step of the way. Our support team is dedicated to assisting you with any questions or guidance you may need."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Support' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.content}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            <motion.h2 variants={fadeUp}>Get in Touch</motion.h2>
                            <motion.p variants={fadeUp}>
                                Have a question or need assistance? Our team is available to help you via email and our support portal.
                            </motion.p>

                            <motion.div className={styles.supportGrid} variants={fadeUp}>
                                <div className={styles.supportCard}>
                                    <h4>
                                        <Mail size={20} className="text-accent" />
                                        Email Support
                                    </h4>
                                    <p>For all general inquiries and platform assistance:</p>
                                    <p><strong>support@apfx.com</strong></p>
                                </div>
                                <div className={styles.supportCard}>
                                    <h4>
                                        <Clock size={20} className="text-accent" />
                                        Working Hours
                                    </h4>
                                    <p>Monday to Friday:</p>
                                    <p><strong>9:00 AM – 6:00 PM (GMT)</strong></p>
                                </div>
                            </motion.div>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '5rem' }}>How We Can Help</motion.h2>
                            <motion.p variants={fadeUp}>
                                Our dedicated support specialists are trained to assist you across a wide range of areas:
                            </motion.p>

                            <motion.div className={styles.supportGrid} variants={fadeUp}>
                                <div className={styles.supportCard}>
                                    <h4><Headphones size={20} /> Account & Onboarding</h4>
                                    <p>Assistance with account setup, verification, and initial platform walkthroughs.</p>
                                </div>
                                <div className={styles.supportCard}>
                                    <h4><Globe size={20} /> Trading Queries</h4>
                                    <p>Guidance on using our platforms, understanding market tools, and trade navigation.</p>
                                </div>
                                <div className={styles.supportCard}>
                                    <h4><Zap size={20} /> Tech Support</h4>
                                    <p>Rapid troubleshooting for connectivity, platform performance, or software integration.</p>
                                </div>
                                <div className={styles.supportCard}>
                                    <h4><ShieldCheck size={20} /> Security & Safety</h4>
                                    <p>Addressing concerns related to account security, MFA, and data integrity.</p>
                                </div>
                            </motion.div>

                            <motion.h2 variants={fadeUp}>Response Time</motion.h2>
                            <motion.p variants={fadeUp}>
                                We aim to respond to all standard queries within <strong>24 to 48 hours</strong>.
                            </motion.p>

                            <motion.div className={styles.warningBox} variants={fadeUp}>
                                <strong>Priority Support</strong>
                                <p>
                                    For urgent issues that require immediate attention, please include <strong>"URGENT"</strong> in your email subject line for faster resolution by our priority response team.
                                </p>
                            </motion.div>

                            <motion.h2 variants={fadeUp}>Self-Help Resources</motion.h2>
                            <motion.p variants={fadeUp}>
                                We are continuously expanding our FAQ and help center to provide you with instant answers to common questions. Check back soon for our comprehensive Knowledge Base.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
