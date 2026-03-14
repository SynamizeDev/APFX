'use client';

import { AlertTriangle } from 'lucide-react';
import styles from './RiskDisclaimer.module.css';

export default function RiskDisclaimer() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <AlertTriangle size={24} className={styles.icon} />
          <div>
            <h2 className={styles.title}>Risk Disclaimer</h2>
            <p className={styles.text}>
              Margin trading involves significant risk. Losses can exceed your initial investment if the market moves against your position. You may be subject to margin calls and forced square-off if you do not maintain the required margin. Trade responsibly and only with capital you can afford to lose. This page is for education and does not constitute advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
