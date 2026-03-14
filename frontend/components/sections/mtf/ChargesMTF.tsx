'use client';

import { motion } from 'framer-motion';
import styles from './ChargesMTF.module.css';

const ROWS = [
  { label: 'Margin interest rate', value: 'As per broker (e.g. X% p.a. on utilised margin)' },
  { label: 'Brokerage charges', value: 'As per your plan; may apply on buy and sell' },
  { label: 'Holding period', value: 'MTF positions typically have a minimum holding period; square-off or rollover rules apply as per broker' },
];

export default function ChargesMTF() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Charges and Interest Rates</h2>
        <p className={styles.subtitle}>Transparency builds trust. Below are typical heads; actual rates and rules are as per your broker and plan.</p>
        <motion.div
          className={styles.tableWrap}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Charge / rule</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <td className={styles.label}>{row.label}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.note}>Contact us or check your account terms for exact rates and holding period rules.</p>
        </motion.div>
      </div>
    </section>
  );
}
