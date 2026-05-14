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

export default function CookiePolicyClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Cookie"
                accentLine="Policy"
                subtitle="Understanding how we use cookies to provide a personalized and efficient trading experience."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Cookie Policy' }]}
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
                                The APFX Global Markets website may use cookies to enhance your experience. Cookies are small text files stored on your device that help us provide and improve our services.
                            </motion.p>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '3rem' }}>How We Use Cookies</motion.h2>
                            <motion.p variants={fadeUp}>
                                We use cookies for the following primary purposes:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Improve user experience</motion.li>
                                <motion.li variants={fadeUp}>Analyze website traffic</motion.li>
                                <motion.li variants={fadeUp}>Store preferences</motion.li>
                                <motion.li variants={fadeUp}>Enhance platform performance</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '3rem' }}>Managing Your Preferences</motion.h2>
                            <motion.p variants={fadeUp}>
                                Users may disable cookies through their browser settings at any time. However, please note that disabling certain cookies may affect the functionality of our website and your trading experience.
                            </motion.p>
                            
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
                                    For more information about your data privacy, please refer to our 
                                    <a href="/privacy-policy" style={{ color: 'var(--color-accent)', marginLeft: '0.5ch', fontWeight: 'var(--fw-semibold)' }}>Privacy Policy</a>.
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
