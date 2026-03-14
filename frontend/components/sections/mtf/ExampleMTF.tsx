'use client';

import { motion } from 'framer-motion';
import styles from './ExampleMTF.module.css';

const CAPITAL = 100000;
const MARGIN = 100000;
const TOTAL = CAPITAL + MARGIN;
const LEVERAGE = '2x';

export default function ExampleMTF() {
  const capitalPct = (CAPITAL / TOTAL) * 100;
  const marginPct = (MARGIN / TOTAL) * 100;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Example of Margin Trading</h2>
        <p className={styles.subtitle}>A simple scenario: how your capital and broker margin add up.</p>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.row}>
            <div className={styles.item}>
              <span className={styles.label}>Investor capital</span>
              <span className={styles.value}>₹{CAPITAL.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Margin from broker</span>
              <span className={styles.value}>₹{MARGIN.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.itemHighlight}>
              <span className={styles.label}>Total buying power</span>
              <span className={styles.value}>₹{TOTAL.toLocaleString('en-IN')}</span>
              <span className={styles.leverage}>{LEVERAGE} leverage</span>
            </div>
          </div>
          <div className={styles.barWrap}>
            <div
              className={styles.barCapital}
              style={{ width: `${capitalPct}%` }}
              title="Your capital"
            />
            <div
              className={styles.barMargin}
              style={{ width: `${marginPct}%` }}
              title="Broker margin"
            />
          </div>
          <div className={styles.barLegend}>
            <span><i className={styles.legCapital} /> Your capital</span>
            <span><i className={styles.legMargin} /> Broker margin</span>
          </div>
          <p className={styles.disclaimer}>Illustrative only. Actual margin and buying power depend on broker terms and eligible stocks.</p>
        </motion.div>
      </div>
    </section>
  );
}
