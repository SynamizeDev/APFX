'use client';

import { AlertTriangle } from 'lucide-react';
import styles from './RiskDisclosure.module.css';

export default function RiskDisclosure() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <AlertTriangle size={24} className={styles.icon} />
          <div>
            <h2 className={styles.title}>Risk Disclosure</h2>
            <p className={styles.text}>
              Our recommendations and insights are for informational and educational purposes only and do not constitute investment advice. You should not rely on them as the sole basis for any investment decision. Investments in securities are subject to market risk; past performance does not guarantee future results. Please consider your own investment objectives, risk appetite, and seek independent advice before investing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
