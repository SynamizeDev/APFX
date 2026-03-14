'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, BarChart2, Calendar } from 'lucide-react';
import styles from './EducationalMF.module.css';

const ITEMS = [
    {
        id: 'nav',
        title: 'What is NAV?',
        icon: HelpCircle,
        body: 'NAV (Net Asset Value) is the price of one unit of a mutual fund. It’s calculated daily after markets close. When you invest, you buy units at the current NAV; when you redeem, you get the NAV at that time. NAV goes up or down with the value of the fund’s holdings.',
    },
    {
        id: 'equity-debt',
        title: 'Equity vs Debt funds',
        icon: BarChart2,
        body: 'Equity funds invest mainly in stocks — they can give higher returns over the long term but are riskier. Debt funds invest in bonds and fixed income — they’re more stable but usually offer lower returns. Choose based on your time horizon and how much risk you can take.',
    },
    {
        id: 'sip-lump',
        title: 'SIP vs lump sum investing',
        icon: Calendar,
        body: 'SIP means investing a fixed amount every month; lump sum means investing a large amount at once. SIP helps you average out market ups and downs and is easier if you don’t have a big amount ready. Lump sum can work if you have the money and are comfortable with timing.',
    },
];

export default function EducationalMF() {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Learn the Basics</h2>
                <p className={styles.subtitle}>Quick answers to common questions. For education only — not investment advice.</p>
                <div className={styles.accordion}>
                    {ITEMS.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div key={item.id} className={styles.item}>
                                <button
                                    type="button"
                                    className={styles.trigger}
                                    onClick={() => setOpenId(isOpen ? null : item.id)}
                                    aria-expanded={isOpen}
                                >
                                    <item.icon size={20} className={styles.triggerIcon} />
                                    <span>{item.title}</span>
                                    <ChevronDown size={20} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className={styles.panel}
                                        >
                                            <p className={styles.panelText}>{item.body}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
