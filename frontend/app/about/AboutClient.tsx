'use client'

import { Zap, Landmark, ShieldCheck } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './AboutPage.module.css'

// Metadata moved to page.tsx (Server Component)

/* ──────────────────────────────────────────────────────────
   Motion presets — subtle, institutional, confidence-first
   ────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
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

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Institutional by Design"
                accentLine="Accessible to Serious Traders"
                subtitle="Since 2012, APFX has been focused on one thing: giving sophisticated retail and professional traders access to the same depth of liquidity, speed, and transparency that institutional desks expect."
                breadcrumbs={[{ label: 'About Us' }]}
            />

            <main className={styles.main}>
                {/* ── Our Story ───────────────────────────── */}
                <section className={`${styles.section} apfx-section`}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.grid}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            <motion.div className={styles.textSide} variants={fadeUp}>
                                <h2 className={styles.heading}>Our Story</h2>

                                <p className={styles.paragraph}>
                                    What started as a boutique execution desk in London has evolved into a
                                    globally trusted trading infrastructure, serving clients across more
                                    than 150 countries. At APFX, transparency, speed, and reliability are
                                    not marketing promises — they are operational requirements.
                                </p>

                                <p className={styles.paragraph}>
                                    Our institutional heritage informs every technical and strategic
                                    decision we make. From Tier-1 liquidity relationships to Equinix
                                    LD4 and NY4 data-center placements, we design systems the same way
                                    professional desks do — with zero tolerance for compromise.
                                </p>
                            </motion.div>

                            <motion.div
                                className={styles.imagePlaceholder}
                                variants={fadeUp}
                                transition={{ delay: 0.15 }}
                            >
                                {/* Premium visual placeholder */}
                                <motion.div
                                    className={styles.glassCard}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                >
                                    <span>2012 — 2026</span>
                                    <h4>A Decade of Execution Excellence</h4>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Core Values ─────────────────────────── */}
                <section className={`${styles.values} apfx-section`}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.valuesGrid}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            <motion.div className={styles.valueCard} variants={fadeUp}>
                                <div className={styles.icon}>
                                    <Zap size={34} strokeWidth={1.6} />
                                </div>
                                <h3>Sub-Millisecond Speed</h3>
                                <p>
                                    Ultra-low latency execution with an average order processing time of
                                    12ms, powered by direct fibre-optic cross-connects.
                                </p>
                            </motion.div>

                            <motion.div className={styles.valueCard} variants={fadeUp}>
                                <div className={styles.icon}>
                                    <Landmark size={34} strokeWidth={1.6} />
                                </div>
                                <h3>Institutional Liquidity</h3>
                                <p>
                                    Direct access to deep, multi-venue pricing from tier-one global banks
                                    and ECN liquidity providers.
                                </p>
                            </motion.div>

                            <motion.div className={styles.valueCard} variants={fadeUp}>
                                <div className={styles.icon}>
                                    <ShieldCheck size={34} strokeWidth={1.6} />
                                </div>
                                <h3>Certified Security</h3>
                                <p>
                                    Segregated client accounts, robust internal controls, and strict
                                    adherence to global regulatory and compliance standards.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}