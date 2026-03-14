'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Bell, Percent, BarChart3 } from 'lucide-react';
import styles from './RisksMTF.module.css';

const ITEMS = [
  { icon: TrendingDown, title: 'Amplified losses', text: 'When the market moves against you, losses are magnified because you have a larger position. You can lose more than your initial capital.' },
  { icon: Bell, title: 'Margin calls', text: 'If the value of your collateral or position falls below the required level, the broker may ask you to add funds or sell to meet margin. Failure to do so can lead to forced square-off.' },
  { icon: Percent, title: 'Interest on borrowed funds', text: 'You pay interest on the margin amount for as long as you hold the position. This reduces net returns and can add up over time.' },
  { icon: BarChart3, title: 'Market volatility', text: 'Sharp moves can quickly erode margin. Volatile stocks may have higher margin requirements or may be removed from the eligible list.' },
];

export default function RisksMTF() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Risks of Margin Trading</h2>
        <p className={styles.subtitle}>Understand the risks before you activate MTF. Trade only with capital you can afford to lose.</p>
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
