'use client';

import { motion } from 'framer-motion';
import { Wallet, Building2, TrendingUp } from 'lucide-react';
import styles from './WhatIsMTF.module.css';

export default function WhatIsMTF() {
  return (
    <section className={styles.section} id="what-is-mtf">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.title}>What is Margin Trading Facility (MTF)?</h2>
            <p className={styles.para}>
              <strong>Margin trading</strong> lets you buy more shares than your capital alone would allow. The broker lends you a portion of the funds (margin) against your capital or collateral. You pay interest on the borrowed amount and must maintain a minimum margin as per the broker’s terms.
            </p>
            <p className={styles.para}>
              <strong>Leverage</strong> means you can take a larger position: for example, with 50% margin (2x leverage), ₹1 lakh of your money can give you ₹2 lakh of buying power. This can magnify both profits and losses.
            </p>
            <ul className={styles.list}>
              <li>You put in your capital; the broker adds margin (borrowed funds).</li>
              <li>Total buying power = Your capital + Margin.</li>
              <li>You pay interest on the borrowed amount and must meet margin calls if the value of your position falls.</li>
            </ul>
          </motion.div>
          <motion.div
            className={styles.diagram}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.diagramInner}>
              <div className={styles.block}>
                <Wallet size={24} className={styles.blockIcon} />
                <span className={styles.blockLabel}>Your capital</span>
                <span className={styles.blockValue}>₹1,00,000</span>
              </div>
              <span className={styles.plus}>+</span>
              <div className={styles.block}>
                <Building2 size={24} className={styles.blockIcon} />
                <span className={styles.blockLabel}>Broker margin</span>
                <span className={styles.blockValue}>₹1,00,000</span>
              </div>
              <span className={styles.eq}>=</span>
              <div className={styles.blockResult}>
                <TrendingUp size={24} className={styles.blockIcon} />
                <span className={styles.blockLabel}>Buying power</span>
                <span className={styles.blockValue}>₹2,00,000</span>
              </div>
            </div>
            <p className={styles.diagramNote}>Illustrative example. Actual margin depends on broker and stock.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
