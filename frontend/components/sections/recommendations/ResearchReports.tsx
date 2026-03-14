'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { MOCK_REPORTS } from '@/lib/recommendations/mockData';
import styles from './ResearchReports.module.css';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return d;
  }
}

export default function ResearchReports() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Research Reports</h2>
        <p className={styles.subtitle}>Deeper analysis: company updates, sector views, and market outlook.</p>
        <div className={styles.grid}>
          {MOCK_REPORTS.map((r, i) => (
            <motion.div
              key={r.id}
              className={styles.card}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <FileText size={24} className={styles.icon} />
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <span className={styles.type}>{r.type}</span>
              <span className={styles.date}>{formatDate(r.date)}</span>
              <a href="/contact" className={styles.link}>Read more</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
