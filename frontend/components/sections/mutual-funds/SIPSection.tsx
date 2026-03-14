'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import styles from './SIPSection.module.css';

export default function SIPSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.eyebrow}>
                            <Calendar size={16} /> <span>Systematic Investment Plan</span>
                        </div>
                        <h2 className={styles.title}>Invest Regularly with SIP</h2>
                        <p className={styles.para}>
                            SIP lets you invest a fixed amount every month (e.g. ₹5,000) in a mutual fund. 
                            You buy more units when prices are low and fewer when they’re high, which can smooth out market volatility over time.
                        </p>
                        <p className={styles.para}>
                            It’s ideal for long-term goals like retirement or a child’s education — you don’t need a large lump sum to begin.
                        </p>
                        <Link href="/contact" className={styles.cta}>
                            Start a SIP <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                    <motion.div
                        className={styles.example}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className={styles.exampleTitle}>Illustrative example</h3>
                        <p className={styles.exampleDesc}>₹5,000/month for 10 years</p>
                        <div className={styles.exampleBox}>
                            <span className={styles.exampleLabel}>Approx. value* (12% CAGR)</span>
                            <span className={styles.exampleValue}>~₹11.5 Lakh</span>
                        </div>
                        <p className={styles.exampleDisclaimer}>*Illustrative. Returns are not guaranteed. Past performance does not indicate future results.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
