'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart3, ArrowRight } from 'lucide-react';
import styles from './RecHero.module.css';

export default function RecHero() {
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
            <BarChart3 size={14} className={styles.eyebrowIcon} />
            <span>Research-based insights</span>
          </div>
          <h1 className={styles.title}>
            Expert <span className={styles.accent}>Investment Recommendations</span>
          </h1>
          <p className={styles.subtitle}>
            Our analysts combine fundamental research and market analysis to bring you stock ideas and sector views. Explore recommendations, market insights, and reports — all designed to help you discover potential opportunities.
          </p>
          <div className={styles.actions}>
            <Link href="#latest" className={styles.ctaPrimary}>
              Explore Investment Ideas <ArrowRight size={18} />
            </Link>
            <Link href="#latest" className={styles.ctaSecondary}>
              View Latest Recommendations
            </Link>
          </div>
          <p className={styles.trust}>Recommendations are for information only and do not constitute investment advice. Investments are subject to market risk.</p>
        </motion.div>
      </div>
    </section>
  );
}
