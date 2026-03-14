'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingUp, Layers } from 'lucide-react';
import styles from './BenefitsIPOs.module.css';

const ITEMS = [
  { icon: Zap, title: 'Early entry into growing companies', text: 'Apply at the issue price and become a shareholder before the stock lists on the exchange.' },
  { icon: TrendingUp, title: 'Potential listing gains', text: 'If the stock lists above the issue price, you may benefit from listing-day gains (not guaranteed).' },
  { icon: Layers, title: 'Portfolio diversification', text: 'Add new companies and sectors to your portfolio through primary market participation.' },
];

export default function BenefitsIPOs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Benefits of Investing in IPOs</h2>
        <p className={styles.subtitle}>Why investors consider applying in IPOs.</p>
        <div className={styles.grid}>
          {ITEMS.map((b, i) => (
            <motion.div
              key={b.title}
              className={styles.card}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
