'use client';

import { motion } from 'framer-motion';
import { MOCK_PERFORMANCE } from '@/lib/recommendations/mockData';
import styles from './PerformanceTracking.module.css';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return d;
  }
}

export default function PerformanceTracking() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Performance Tracking</h2>
        <p className={styles.subtitle}>Past recommendations and performance. Past performance does not indicate future results.</p>
        <motion.div
          className={styles.tableWrap}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Recommendation date</th>
                <th>Entry price</th>
                <th>Current price</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PERFORMANCE.map((row) => (
                <tr key={row.stockName + row.recommendationDate}>
                  <td className={styles.name}>{row.stockName}</td>
                  <td>{formatDate(row.recommendationDate)}</td>
                  <td>₹{row.entryPrice}</td>
                  <td>₹{row.currentPrice}</td>
                  <td>
                    <span className={row.performancePercent >= 0 ? styles.gain : styles.loss}>
                      {row.performancePercent >= 0 ? '+' : ''}{row.performancePercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.disclaimer}>Past performance is not indicative of future results. Prices are illustrative.</p>
        </motion.div>
      </div>
    </section>
  );
}
