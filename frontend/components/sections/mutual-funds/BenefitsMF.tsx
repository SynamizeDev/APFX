'use client';

import { motion } from 'framer-motion';
import { Layers, UserCheck, Calendar, TrendingUp, Receipt } from 'lucide-react';
import styles from './BenefitsMF.module.css';

const BENEFITS = [
    { icon: Layers, title: 'Diversification', text: 'Your money is spread across many securities, reducing the impact of one bad pick.' },
    { icon: UserCheck, title: 'Professional management', text: 'Fund managers research and manage your investments full-time.' },
    { icon: Calendar, title: 'SIP flexibility', text: 'Invest a fixed amount every month; start with as little as ₹500.' },
    { icon: TrendingUp, title: 'Long-term wealth growth', text: 'Equity funds have historically helped build wealth over 5–10+ years.' },
    { icon: Receipt, title: 'Tax benefits (ELSS)', text: 'Save tax under 80C with ELSS and get equity exposure with a 3-year lock-in.' },
];

export default function BenefitsMF() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Benefits of Mutual Fund Investing</h2>
                <p className={styles.subtitle}>Why millions of Indians choose mutual funds to grow their wealth.</p>
                <div className={styles.grid}>
                    {BENEFITS.map((b, i) => (
                        <motion.div
                            key={b.title}
                            className={styles.card}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                        >
                            <div className={styles.iconWrap}><b.icon size={22} /></div>
                            <h3 className={styles.cardTitle}>{b.title}</h3>
                            <p className={styles.cardText}>{b.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
