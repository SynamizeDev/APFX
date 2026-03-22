'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { RecommendationDetail } from '@/lib/recommendations/types';
import styles from './RecommendationDetailContent.module.css';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return d;
  }
}

export default function RecommendationDetailContent({ rec }: { rec: RecommendationDetail }) {
  return (
    <motion.article
      className={styles.article}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href="/" className={styles.back}>
        <ArrowLeft size={18} /> Back to Recommendations
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{rec.stockName}</h1>
        <span className={styles.sector}>{rec.sector}</span>
        <span className={`${styles.badge} ${styles[rec.recommendationType]}`}>{rec.recommendationType}</span>
        <p className={styles.meta}>
          {rec.analystName} · {formatDate(rec.publishedAt)} · {rec.timeHorizon}
        </p>
      </header>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Target price & upside</h2>
        <div className={styles.priceRow}>
          <div>
            <span className={styles.priceLabel}>Current</span>
            <span className={styles.priceValue}>₹{rec.currentPrice.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className={styles.priceLabel}>Target</span>
            <span className={styles.priceValue}>₹{rec.targetPrice.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className={styles.priceLabel}>Expected upside</span>
            <span className={styles.upside}>+{rec.expectedUpside}%</span>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Company overview</h2>
        <p className={styles.para}>{rec.overview}</p>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Investment thesis</h2>
        <p className={styles.para}>{rec.investmentThesis}</p>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Key growth drivers</h2>
        <ul className={styles.list}>
          {rec.growthDrivers.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Financial highlights</h2>
        <dl className={styles.finGrid}>
          {rec.financialHighlights.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Risks involved</h2>
        <ul className={styles.listRisks}>
          {rec.risks.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      <div className={styles.ctaWrap}>
        <Link href="/contact" className={styles.cta}>Invest through us</Link>
      </div>

      <p className={styles.disclaimer}>
        This is for information only and does not constitute investment advice. Investments are subject to market risk.
      </p>
    </motion.article>
  );
}
