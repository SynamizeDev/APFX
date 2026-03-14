'use client';

import { motion } from 'framer-motion';
import { Building2, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import styles from './WhatIsIPO.module.css';

export default function WhatIsIPO() {
  return (
    <section className={styles.section} id="what-is-ipo">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.title}>What is an IPO?</h2>
            <p className={styles.para}>
              An <strong>Initial Public Offering (IPO)</strong> is when a company offers its shares to the public for the first time. By applying in an IPO, you can become a shareholder before the stock lists on the exchange.
            </p>
            <p className={styles.para}>
              Companies go public to raise capital for growth, repay debt, or give early investors an exit. Retail investors participate to get early entry into potentially growing businesses and to benefit from possible listing gains (when the stock lists at a price higher than the issue price).
            </p>
            <ul className={styles.list}>
              <li>You apply during the subscription window (open to close date).</li>
              <li>Allotment is done after the issue closes; not everyone may get shares.</li>
              <li>Listing happens on the exchange; you can then sell or hold.</li>
            </ul>
            <p className={styles.disclaimer}>IPO investing is subject to market risk. Past performance does not guarantee future results.</p>
          </motion.div>
          <motion.div
            className={styles.diagram}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.diagramInner}>
              <div className={styles.step}>
                <div className={styles.stepIcon}><Building2 size={24} /></div>
                <span>Company files offer</span>
              </div>
              <ArrowRight className={styles.arrow} size={20} />
              <div className={styles.step}>
                <div className={styles.stepIcon}><Calendar size={24} /></div>
                <span>Open → Close</span>
              </div>
              <ArrowRight className={styles.arrow} size={20} />
              <div className={styles.step}>
                <div className={styles.stepIcon}><TrendingUp size={24} /></div>
                <span>Allotment → Listing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
