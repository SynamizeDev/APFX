'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { IPOListItem } from '@/lib/ipo/types';
import { MOCK_IPO_LIST } from '@/lib/ipo/mockData';
import styles from './UpcomingIPOs.module.css';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return d;
  }
}

function StatusBadge({ status }: { status: IPOListItem['status'] }) {
  return (
    <span className={`${styles.badge} ${styles[status.replace(/\s/g, '')]}`}>
      {status}
    </span>
  );
}

export default function UpcomingIPOs() {
  const list = MOCK_IPO_LIST;

  return (
    <section className={styles.section} id="upcoming">
      <div className={styles.container}>
        <h2 className={styles.title}>Upcoming IPOs</h2>
        <p className={styles.subtitle}>Apply through our platform. Click on an IPO for full details.</p>
        <div className={styles.grid}>
          {list.map((ipo, i) => (
            <motion.article
              key={ipo.slug}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className={styles.cardTop}>
                <h3 className={styles.companyName}>{ipo.companyName}</h3>
                <span className={styles.industry}>{ipo.industry}</span>
              </div>
              <dl className={styles.meta}>
                <div>
                  <dt>Open</dt>
                  <dd>{formatDate(ipo.openDate)}</dd>
                </div>
                <div>
                  <dt>Close</dt>
                  <dd>{formatDate(ipo.closeDate)}</dd>
                </div>
                <div>
                  <dt>Price band</dt>
                  <dd>₹{ipo.priceBandLow} – ₹{ipo.priceBandHigh}</dd>
                </div>
                <div>
                  <dt>Issue size</dt>
                  <dd>{ipo.issueSize}</dd>
                </div>
                <div>
                  <dt>Listing</dt>
                  <dd>{formatDate(ipo.listingDate)}</dd>
                </div>
              </dl>
              <div className={styles.cardFooter}>
                <StatusBadge status={ipo.status} />
                <Link href="/" className={styles.viewDetails}>
                  View Details <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
