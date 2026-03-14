'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import styles from './MTFHero.module.css';

export default function MTFHero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.eyebrow}>
            <Zap size={14} className={styles.eyebrowIcon} />
            <span>Margin Trading Facility</span>
          </div>
          <h1 className={styles.title}>
            Trade with <span className={styles.accent}>More Power</span>
          </h1>
          <p className={styles.subtitle}>
            Use margin to increase your buying power. Borrow against your capital to take larger positions in approved stocks — while being aware that leverage can amplify both gains and losses.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Start Margin Trading <ArrowRight size={18} />
            </Link>
            <Link href="#what-is-mtf" className={styles.ctaSecondary}>
              Learn how it works
            </Link>
          </div>
          <p className={styles.trust}>Margin trading involves risk. Borrowed funds can amplify gains and losses.</p>
        </motion.div>
      </div>
    </section>
  );
}
