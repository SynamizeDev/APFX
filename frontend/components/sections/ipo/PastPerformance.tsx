'use client';

import { motion } from 'framer-motion';
import { MOCK_PAST_IPOS } from '@/lib/ipo/mockData';
import styles from './PastPerformance.module.css';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return d;
  }
}

export default function PastPerformance() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Past IPO Performance</h2>
        <p className={styles.subtitle}>Sample of past listings. Past performance does not indicate future results.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Issue price</th>
                <th>Listing price</th>
                <th>Listing gain/loss</th>
                <th>Listing date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PAST_IPOS.map((row, i) => (
                <motion.tr
                  key={row.companyName}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className={styles.name}>{row.companyName}</td>
                  <td>₹{row.issuePrice}</td>
                  <td>₹{row.listingPrice}</td>
                  <td>
                    <span className={row.listingGainPercent >= 0 ? styles.gain : styles.loss}>
                      {row.listingGainPercent >= 0 ? '+' : ''}{row.listingGainPercent}%
                    </span>
                  </td>
                  <td>{formatDate(row.listingDate)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.disclaimer}>
          Past performance is not indicative of future results. Listing gains or losses depend on market conditions and issue pricing.
        </p>
      </div>
    </section>
  );
}
