'use client';

import Link from 'next/link';
import { Bell, UserPlus, Headphones } from 'lucide-react';
import styles from './RecCTASection.module.css';

export default function RecCTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Stay Ahead with Our Research</h2>
          <p className={styles.desc}>
            Subscribe to recommendations, open an investment account, or speak to a financial advisor. We’re here to help you invest with confidence.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>
              <Bell size={18} /> Subscribe to recommendations
            </Link>
            <Link href="/contact" className={styles.secondary}>
              <UserPlus size={18} /> Open investment account
            </Link>
            <Link href="/contact" className={styles.tertiary}>
              <Headphones size={18} /> Contact financial advisor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
