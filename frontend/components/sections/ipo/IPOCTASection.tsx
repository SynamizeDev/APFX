'use client';

import Link from 'next/link';
import { Bell, UserPlus, Headphones } from 'lucide-react';
import styles from './IPOCTASection.module.css';

export default function IPOCTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Ready to Apply for IPOs?</h2>
          <p className={styles.desc}>
            Get notified about new IPOs, open an investment account, or apply with expert support. Our team is here to help.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>
              <Bell size={18} /> Get notified about upcoming IPOs
            </Link>
            <Link href="/contact" className={styles.secondary}>
              <UserPlus size={18} /> Open investment account
            </Link>
            <Link href="/contact" className={styles.tertiary}>
              <Headphones size={18} /> Apply with expert support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
