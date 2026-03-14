'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
import styles from './IPOHero.module.css';

export default function IPOHero() {
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
            <Building2 size={14} className={styles.eyebrowIcon} />
            <span>Initial Public Offerings</span>
          </div>
          <h1 className={styles.title}>
            Invest in <span className={styles.accent}>Upcoming IPOs</span> with Confidence
          </h1>
          <p className={styles.subtitle}>
            Apply for new listings through our platform. Get access to IPO opportunities, research insights, and a simple application process backed by expert guidance.
          </p>
          <div className={styles.actions}>
            <Link href="#upcoming" className={styles.ctaPrimary}>
              View Upcoming IPOs <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className={styles.ctaSecondary}>
              Apply for IPO
            </Link>
          </div>
          <p className={styles.trust}>IPO investing is subject to market risk. Allotment is not guaranteed.</p>
        </motion.div>
      </div>
    </section>
  );
}
