'use client';

import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Calendar } from 'lucide-react';
import type { MarketInsightItem } from '@/lib/recommendations/types';
import { MOCK_INSIGHTS } from '@/lib/recommendations/mockData';
import styles from './MarketInsights.module.css';

const ICON_MAP = { sector: Briefcase, trends: TrendingUp, outlook: Calendar };

export default function MarketInsights() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Market Insights</h2>
        <p className={styles.subtitle}>Expert views on sectors, trends, and outlook. For information only.</p>
        <div className={styles.grid}>
          {MOCK_INSIGHTS.map((insight, i) => {
            const Icon = ICON_MAP[insight.type];
            return (
              <motion.div
                key={insight.id}
                className={styles.card}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className={styles.iconWrap}><Icon size={22} /></div>
                <h3 className={styles.cardTitle}>{insight.title}</h3>
                <p className={styles.cardText}>{insight.summary}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
