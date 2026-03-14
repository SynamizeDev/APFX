'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, PieChart, Rocket } from 'lucide-react';
import styles from './InvestmentProcess.module.css';

const STEPS = [
    { num: 1, icon: UserPlus, title: 'Create account or contact advisor', text: 'Sign up with us or speak to an expert to get started.', cta: 'Get started' },
    { num: 2, icon: PieChart, title: 'Choose mutual funds', text: 'We help you pick funds based on your goals, horizon, and risk profile.' },
    { num: 3, icon: Rocket, title: 'Start SIP or invest lump sum', text: 'Set up a monthly SIP or make a one-time investment through our platform.' },
];

export default function InvestmentProcess() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>How to Invest With Us</h2>
                <p className={styles.subtitle}>Three simple steps to start your mutual fund journey.</p>
                <div className={styles.steps}>
                    {STEPS.map((s, i) => (
                        <motion.div
                            key={s.num}
                            className={styles.step}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className={styles.stepNum}>{s.num}</div>
                            <div className={styles.stepIcon}><s.icon size={24} /></div>
                            <h3 className={styles.stepTitle}>{s.title}</h3>
                            <p className={styles.stepText}>{s.text}</p>
                            {s.cta && (
                                <Link href="/contact" className={styles.stepCta}>{s.cta}</Link>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
