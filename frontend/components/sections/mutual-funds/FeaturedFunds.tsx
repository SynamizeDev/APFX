'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './FeaturedFunds.module.css';

const FUNDS = [
    { name: 'Large Cap Equity Fund', category: 'Equity - Large Cap', risk: 'High', return3y: '12.5', return5y: '14.2' },
    { name: 'Balanced Advantage Fund', category: 'Hybrid', risk: 'Moderate', return3y: '10.8', return5y: '11.5' },
    { name: 'Short Duration Debt Fund', category: 'Debt', risk: 'Low', return3y: '7.2', return5y: '7.8' },
    { name: 'Nifty 50 Index Fund', category: 'Index', risk: 'High', return3y: '11.0', return5y: '12.4' },
];

export default function FeaturedFunds() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Featured Mutual Funds</h2>
                <p className={styles.subtitle}>Examples of fund categories. Speak to our advisors to choose funds that suit your goals.</p>
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Fund name</th>
                                <th>Category</th>
                                <th>Risk</th>
                                <th>3Y return</th>
                                <th>5Y return</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {FUNDS.map((f, i) => (
                                <motion.tr
                                    key={f.name}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <td className={styles.name}>{f.name}</td>
                                    <td>{f.category}</td>
                                    <td><span className={styles.risk}>{f.risk}</span></td>
                                    <td>{f.return3y}%</td>
                                    <td>{f.return5y}%</td>
                                    <td>
                                        <Link href="/contact" className={styles.learnMore}>
                                            Learn More <ArrowUpRight size={14} />
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className={styles.disclaimer}>
                    Past performance is not indicative of future results. Read the offer document before investing. Funds shown are for illustration; we help you select from a wide range of SEBI-registered schemes.
                </p>
            </div>
        </section>
    );
}
