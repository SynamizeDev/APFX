'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
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

export default function RestrictedCountriesClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Restricted"
                accentLine="Countries"
                subtitle="Information regarding jurisdictions where APFX Global Markets does not offer its services due to local regulatory requirements."
                breadcrumbs={[{ label: 'Legal', href: '/legal' }, { label: 'Restricted Countries' }]}
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
                            <motion.h2 variants={fadeUp}>Jurisdictional Restrictions</motion.h2>
                            
                            <motion.p variants={fadeUp}>
                                APFX Global Markets operates in compliance with international financial regulations. As such, we do not offer our services to residents of certain jurisdictions where such distribution or use would be contrary to local law or regulation.
                            </motion.p>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '3rem' }}>Restricted Regions</motion.h2>
                            <motion.p variants={fadeUp}>
                                The Company does not provide services to residents of:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>United States of America</motion.li>
                                <motion.li variants={fadeUp}>Canada</motion.li>
                                <motion.li variants={fadeUp}>Israel</motion.li>
                                <motion.li variants={fadeUp}>Islamic Republic of Iran</motion.li>
                                <motion.li variants={fadeUp}>North Korea (DPRK)</motion.li>
                                <motion.li variants={fadeUp}>Sudan</motion.li>
                                <motion.li variants={fadeUp}>Syria</motion.li>
                            </motion.ul>
                            
                            <motion.p variants={fadeUp} style={{ marginTop: '2rem' }}>
                                This list is not exhaustive and may be updated periodically based on changing regulatory landscapes and international sanctions.
                            </motion.p>

                            <motion.div 
                                className={styles.warningBox} 
                                variants={fadeUp}
                                style={{ 
                                    marginTop: '4rem',
                                    background: 'rgba(239, 68, 68, 0.04)',
                                    borderColor: 'rgba(239, 68, 68, 0.2)'
                                }}
                            >
                                <p style={{ margin: 0, fontWeight: 'var(--fw-semibold)', color: 'var(--color-error)' }}>
                                    It is the responsibility of the client to ensure that they are permitted to use our services according to the laws of their country of residence.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>

        </div>
    )
}
