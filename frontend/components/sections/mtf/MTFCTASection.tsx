'use client';

import Link from 'next/link';
import { Zap, UserPlus, Headphones } from 'lucide-react';
import styles from './MTFCTASection.module.css';

export default function MTFCTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Ready to Use Margin Trading?</h2>
          <p className={styles.desc}>
            Activate MTF, open a trading account, or speak to an advisor. We’ll help you get started with the right setup.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>
              <Zap size={18} /> Activate margin trading
            </Link>
            <Link href="/contact" className={styles.secondary}>
              <UserPlus size={18} /> Open trading account
            </Link>
            <Link href="/contact" className={styles.tertiary}>
              <Headphones size={18} /> Contact advisor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
