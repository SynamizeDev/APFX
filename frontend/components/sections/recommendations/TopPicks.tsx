'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Target, TrendingUp } from 'lucide-react';
import { MOCK_TOP_PICKS_SHORT, MOCK_TOP_PICKS_LONG } from '@/lib/recommendations/mockData';
import styles from './TopPicks.module.css';

export default function TopPicks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Top Picks</h2>
        <p className={styles.subtitle}>Curated lists from our research team. For information only.</p>
        <div className={styles.grid}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.cardHeader}>
              <Zap size={20} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>Short-term ideas</h3>
            </div>
            <ul className={styles.list}>
              {MOCK_TOP_PICKS_SHORT.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/recommendation/${p.slug}`} className={styles.link}>
                    <span className={styles.name}>{p.stockName}</span>
                    <span className={styles.sector}>{p.sector}</span>
                    <span className={styles.reason}>{p.reason}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.cardHeader}>
              <Target size={20} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>Long-term picks</h3>
            </div>
            <ul className={styles.list}>
              {MOCK_TOP_PICKS_LONG.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/recommendation/${p.slug}`} className={styles.link}>
                    <span className={styles.name}>{p.stockName}</span>
                    <span className={styles.sector}>{p.sector}</span>
                    <span className={styles.reason}>{p.reason}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.cardHeader}>
              <TrendingUp size={20} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>High-growth sectors</h3>
            </div>
            <p className={styles.cardText}>
              We focus on IT, Pharma, and select financials for growth. See our latest recommendations and sector reports for names.
            </p>
            <Link href="#latest" className={styles.viewLink}>View recommendations</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
