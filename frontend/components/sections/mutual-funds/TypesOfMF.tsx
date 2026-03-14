'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Shield, Layers, BarChart2, PiggyBank } from 'lucide-react';
import styles from './TypesOfMF.module.css';

const TYPES = [
    {
        id: 'equity',
        name: 'Equity Funds',
        desc: 'Invest mainly in stocks. Best for long-term growth; returns can be higher but with higher volatility.',
        risk: 'High',
        riskClass: 'high',
        icon: TrendingUp,
    },
    {
        id: 'debt',
        name: 'Debt Funds',
        desc: 'Invest in bonds and fixed-income instruments. Lower risk, relatively stable returns.',
        risk: 'Low to Moderate',
        riskClass: 'low',
        icon: Shield,
    },
    {
        id: 'hybrid',
        name: 'Hybrid Funds',
        desc: 'Mix of equity and debt. Balance between growth and stability.',
        risk: 'Moderate',
        riskClass: 'mod',
        icon: Layers,
    },
    {
        id: 'index',
        name: 'Index Funds',
        desc: 'Track a market index like Nifty 50. Low cost, diversified, and transparent.',
        risk: 'High',
        riskClass: 'high',
        icon: BarChart2,
    },
    {
        id: 'elss',
        name: 'ELSS (Tax Saving)',
        desc: 'Equity-linked savings scheme with tax deduction under 80C. 3-year lock-in.',
        risk: 'High',
        riskClass: 'high',
        icon: PiggyBank,
    },
];

export default function TypesOfMF() {
    return (
        <section className={styles.section} id="types">
            <div className={styles.container}>
                <h2 className={styles.title}>Types of Mutual Funds</h2>
                <p className={styles.subtitle}>Choose a category that matches your goals and risk appetite.</p>
                <div className={styles.grid}>
                    {TYPES.map((t, i) => (
                        <motion.div
                            key={t.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <div className={styles.iconWrap}>
                                <t.icon size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>{t.name}</h3>
                            <p className={styles.cardDesc}>{t.desc}</p>
                            <span className={`${styles.risk} ${styles[t.riskClass]}`}>Risk: {t.risk}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
