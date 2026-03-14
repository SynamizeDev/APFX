'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import styles from './MFHero.module.css';

export default function MFHero() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className={styles.eyebrow}>
                        <TrendingUp size={14} className={styles.eyebrowIcon} />
                        <span>Long-term wealth creation</span>
                    </div>
                    <h1 className={styles.title}>
                        Invest in <span className={styles.accent}>Mutual Funds</span> for Your Future
                    </h1>
                    <p className={styles.subtitle}>
                        Build wealth with diversification, professional fund management, and the flexibility to start small. 
                        Ideal for Indian investors looking to grow their money over time.
                    </p>
                    <div className={styles.actions}>
                        <Link href="/contact" className={styles.ctaPrimary}>
                            Start Investing <ArrowRight size={18} />
                        </Link>
                        <Link href="#types" className={styles.ctaSecondary}>
                            Explore Funds
                        </Link>
                    </div>
                    <p className={styles.trust}>Investments are subject to market risk. Read scheme documents carefully.</p>
                </motion.div>
            </div>
        </section>
    );
}
