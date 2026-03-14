'use client';

import { motion } from 'framer-motion';
import { Headphones, BookOpen, Zap, Shield } from 'lucide-react';
import styles from './WhyInvestWithUs.module.css';

const POINTS = [
    { icon: Headphones, title: 'Expert advisors', text: 'Get guidance from qualified advisors who understand your goals.' },
    { icon: BookOpen, title: 'Research-backed selection', text: 'We use data and research to help you choose suitable funds.' },
    { icon: Zap, title: 'Easy onboarding', text: 'Simple account setup and a smooth process to start investing.' },
    { icon: Shield, title: 'Transparent fees', text: 'Clear information on charges; no hidden costs.' },
];

export default function WhyInvestWithUs() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Why Invest With Us</h2>
                <p className={styles.subtitle}>We make mutual fund investing simple and trustworthy.</p>
                <div className={styles.grid}>
                    {POINTS.map((p, i) => (
                        <motion.div
                            key={p.title}
                            className={styles.card}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                        >
                            <div className={styles.iconWrap}><p.icon size={22} /></div>
                            <h3 className={styles.cardTitle}>{p.title}</h3>
                            <p className={styles.cardText}>{p.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
