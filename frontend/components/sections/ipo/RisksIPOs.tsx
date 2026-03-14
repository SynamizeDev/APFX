'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, BarChart3, HelpCircle } from 'lucide-react';
import styles from './RisksIPOs.module.css';

const ITEMS = [
  { icon: BarChart3, title: 'Market volatility', text: 'Listing and post-listing prices can be volatile. You may see gains or losses depending on market conditions.' },
  { icon: AlertTriangle, title: 'Overvaluation risk', text: 'Some IPOs may be priced at a premium. Overvalued issues can correct after listing.' },
  { icon: HelpCircle, title: 'Lock-in & allocation uncertainty', text: 'Allotment is not guaranteed. In oversubscribed issues you may get partial or no allotment. Some categories have lock-in periods.' },
];

export default function RisksIPOs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Risks of IPO Investing</h2>
        <p className={styles.subtitle}>Understand the risks before you apply. We recommend reading the RHP and consulting an advisor.</p>
        <div className={styles.grid}>
          {ITEMS.map((r, i) => (
            <motion.div
              key={r.title}
              className={styles.card}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className={styles.iconWrap}><r.icon size={22} /></div>
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <p className={styles.cardText}>{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
