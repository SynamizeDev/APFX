'use client';

import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Wallet, Target } from 'lucide-react';
import styles from './BenefitsMTF.module.css';

const ITEMS = [
  { icon: TrendingUp, title: 'Increased buying power', text: 'Take larger positions in approved stocks with a combination of your capital and broker margin.' },
  { icon: BarChart3, title: 'Amplify market exposure', text: 'Use leverage to gain more exposure to stocks you believe in, within your risk tolerance.' },
  { icon: Wallet, title: 'Flexible funding', text: 'Access margin for stock purchases without liquidating other investments or arranging separate loans.' },
  { icon: Target, title: 'Potential for higher returns', text: 'Larger positions can mean higher absolute gains when the market moves in your favour — but losses are also amplified.' },
];

export default function BenefitsMTF() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Key Benefits of MTF</h2>
        <p className={styles.subtitle}>Why investors consider margin trading.</p>
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
