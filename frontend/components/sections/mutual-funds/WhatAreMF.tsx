'use client';

import { motion } from 'framer-motion';
import { Users, Layers, Briefcase, BarChart3 } from 'lucide-react';
import styles from './WhatAreMF.module.css';

export default function WhatAreMF() {
    return (
        <section className={styles.section} id="what-are-mf">
            <div className={styles.container}>
                <div className={styles.grid}>
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={styles.title}>What Are Mutual Funds?</h2>
                        <p className={styles.para}>
                            A mutual fund pools money from many investors and invests it in stocks, bonds, or both. 
                            A professional fund manager makes the day-to-day decisions, so you don’t need to pick individual shares yourself.
                        </p>
                        <ul className={styles.list}>
                            <li>You invest a small or large amount — even ₹500 can get you started.</li>
                            <li>Your money is spread across many companies or bonds (diversification).</li>
                            <li>Experts manage the fund; you benefit from their research and experience.</li>
                        </ul>
                        <p className={styles.disclaimer}>Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.</p>
                    </motion.div>
                    <motion.div
                        className={styles.diagram}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.diagramInner}>
                            <div className={styles.diagramStep}>
                                <div className={styles.diagramIcon}><Users size={28} /></div>
                                <span>Investors</span>
                            </div>
                            <span className={styles.arrow}>→</span>
                            <div className={styles.diagramStep}>
                                <div className={styles.diagramIcon}><Layers size={28} /></div>
                                <span>Pooled fund</span>
                            </div>
                            <span className={styles.arrow}>→</span>
                            <div className={styles.diagramStep}>
                                <div className={styles.diagramIcon}><Briefcase size={28} /></div>
                                <span>Fund manager</span>
                            </div>
                            <span className={styles.arrow}>→</span>
                            <div className={styles.diagramStep}>
                                <div className={styles.diagramIcon}><BarChart3 size={28} /></div>
                                <span>Stocks / Bonds</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
