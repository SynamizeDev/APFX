'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
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

export default function ComplaintHandlingClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Complaint"
                accentLine="Handling"
                subtitle="We are committed to providing a high-quality service and resolving any concerns you may have fairly and transparently."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Complaint Handling' }]}
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
                            <motion.p variants={fadeUp}>
                                At APFX Global Markets, we value our clients and strive to maintain the highest standards of service. If you are dissatisfied with our services, we encourage you to submit a complaint.
                            </motion.p>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '3rem' }}>Submitting a Complaint</motion.h2>
                            <motion.p variants={fadeUp}>
                                Clients may submit complaints via official support channels, including our dedicated support portal or via email to our compliance department.
                            </motion.p>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '4rem' }}>Our Commitment</motion.h2>
                            <motion.p variants={fadeUp}>
                                Upon receipt of a complaint, the Company shall:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Acknowledge complaints promptly</motion.li>
                                <motion.li variants={fadeUp}>Investigate matters reasonably and impartially</motion.li>
                                <motion.li variants={fadeUp}>Respond within a reasonable timeframe with a clear resolution</motion.li>
                            </motion.ul>
                            
                            <motion.div 
                                className={styles.warningBox} 
                                variants={fadeUp}
                                style={{ 
                                    marginTop: '4rem',
                                    background: 'rgba(54, 249, 54, 0.03)',
                                    borderColor: 'var(--color-border-2)',
                                    color: 'var(--color-text-2)'
                                }}
                            >
                                <p style={{ margin: 0, fontSize: 'var(--text-sm)' }}>
                                    We aim to resolve all matters internally. However, if you remain dissatisfied, you may have the right to refer your complaint to relevant external regulatory bodies.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
