'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { RecommendationListItem } from '@/lib/recommendations/types';
import { MOCK_RECOMMENDATIONS } from '@/lib/recommendations/mockData';
import styles from './LatestRecommendations.module.css';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return d;
  }
}

function TypeBadge({ type }: { type: RecommendationListItem['recommendationType'] }) {
  return (
    <span className={`${styles.badge} ${styles[type]}`}>
      {type}
    </span>
  );
}

export default function LatestRecommendations() {
  const list = MOCK_RECOMMENDATIONS;

  return (
    <section className={styles.section} id="latest">
      <div className={styles.container}>
        <h2 className={styles.title}>Latest Recommendations</h2>
        <p className={styles.subtitle}>Research-based stock ideas from our analysts. Click for full analysis.</p>
        <div className={styles.grid}>
          {list.map((r, i) => (
            <motion.article
              key={r.slug}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className={styles.cardTop}>
                <h3 className={styles.stockName}>{r.stockName}</h3>
                <span className={styles.sector}>{r.sector}</span>
              </div>
              <TypeBadge type={r.recommendationType} />
              <dl className={styles.meta}>
                <div>
                  <dt>Target</dt>
                  <dd>₹{r.targetPrice.toLocaleString('en-IN')}</dd>
                </div>
                <div>
                  <dt>Current</dt>
                  <dd>₹{r.currentPrice.toLocaleString('en-IN')}</dd>
                </div>
                <div>
                  <dt>Horizon</dt>
                  <dd>{r.timeHorizon}</dd>
                </div>
                <div>
                  <dt>Analyst</dt>
                  <dd>{r.analystName}</dd>
                </div>
              </dl>
              <p className={styles.date}>{formatDate(r.publishedAt)}</p>
              <Link href="/" className={styles.viewAnalysis}>
                View Analysis <ArrowUpRight size={14} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
