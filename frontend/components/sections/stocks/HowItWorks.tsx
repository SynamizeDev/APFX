'use client'

import { motion } from 'framer-motion'
import { Search, LineChart, Zap, CheckCircle2 } from 'lucide-react'
import styles from './HowItWorks.module.css'

const STEPS = [
    {
        icon: Search,
        title: 'Identify Opportunities',
        text: 'Utilize our screener and depth tools to identify equities with high-alpha potential.',
    },
    {
        icon: LineChart,
        title: 'Institutional Analysis',
        text: 'Analyze technical indicators and fundamentals using our integrated terminal data.',
    },
    {
        icon: Zap,
        title: 'Precision Execution',
        text: 'Deploy capital instantly with direct market connectivity and sub-millisecond routing.',
    },
    {
        icon: CheckCircle2,
        title: 'Vigilant Monitoring',
        text: 'Manage your portfolio in real-time with advanced risk controls and automated triggers.',
    },
]

export default function HowItWorks() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Operational Workflow</h2>
                
                <div className={styles.grid}>
                    {STEPS.map((s, i) => (
                        <div key={s.title} className={styles.step}>
                            <motion.div 
                                className={styles.iconCircle}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <s.icon size={28} />
                                <span className={styles.number}>{i + 1}</span>
                            </motion.div>
                            <h3 className={styles.stepTitle}>{s.title}</h3>
                            <p className={styles.stepText}>{s.text}</p>
                            {i < STEPS.length - 1 && <div className={styles.connector} />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
