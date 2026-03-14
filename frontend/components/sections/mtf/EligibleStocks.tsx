'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { List, ArrowRight } from 'lucide-react';
import styles from './EligibleStocks.module.css';

const CATEGORIES = ['Large cap equities', 'Select mid cap stocks', 'Index stocks (Nifty, Sensex)', 'Approved by exchange & broker'];

export default function EligibleStocks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Eligible Stocks for MTF</h2>
        <p className={styles.subtitle}>
          Margin trading is available only for stocks approved by the exchange and the broker. Eligibility and margin rates can vary by scrip.
        </p>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.cardTitle}>Example categories</h3>
          <ul className={styles.list}>
            {CATEGORIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <Link href="/contact" className={styles.link}>
            <List size={18} /> View eligible stocks list
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
