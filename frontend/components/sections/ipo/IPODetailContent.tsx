'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, ArrowLeft } from 'lucide-react';
import type { IPODetail } from '@/lib/ipo/types';
import styles from './IPODetailContent.module.css';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return d;
  }
}

export default function IPODetailContent({ ipo }: { ipo: IPODetail }) {
  return (
    <motion.article
      className={styles.article}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href="/products/ipo" className={styles.back}>
        <ArrowLeft size={18} /> Back to IPOs
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{ipo.companyName}</h1>
        <span className={styles.industry}>{ipo.industry}</span>
        <span className={`${styles.badge} ${styles[ipo.status.replace(/\s/g, '')]}`}>{ipo.status}</span>
      </header>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Company overview</h2>
        <p className={styles.para}>{ipo.overview}</p>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Business model</h2>
        <p className={styles.para}>{ipo.businessModel}</p>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Financial highlights</h2>
        <dl className={styles.finGrid}>
          {ipo.financialHighlights.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Price band & lot size</h2>
        <div className={styles.priceBox}>
          <span className={styles.priceLabel}>Price band</span>
          <span className={styles.priceValue}>₹{ipo.priceBandLow} – ₹{ipo.priceBandHigh}</span>
          {ipo.lotSize != null && (
            <>
              <span className={styles.priceLabel}>Lot size</span>
              <span className={styles.priceValue}>{ipo.lotSize} shares</span>
            </>
          )}
          <span className={styles.priceLabel}>Issue size</span>
          <span className={styles.priceValue}>{ipo.issueSize}</span>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>IPO timeline</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <Calendar size={18} className={styles.timelineIcon} />
            <span>Open</span>
            <strong>{formatDate(ipo.openDate)}</strong>
          </div>
          <div className={styles.timelineItem}>
            <Calendar size={18} className={styles.timelineIcon} />
            <span>Close</span>
            <strong>{formatDate(ipo.closeDate)}</strong>
          </div>
          <div className={styles.timelineItem}>
            <TrendingUp size={18} className={styles.timelineIcon} />
            <span>Listing</span>
            <strong>{formatDate(ipo.listingDate)}</strong>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Key risks</h2>
        <ul className={styles.list}>
          {ipo.risks.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Opportunities</h2>
        <ul className={styles.listOpportunities}>
          {ipo.opportunities.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </section>

      <div className={styles.ctaWrap}>
        <Link href="/contact" className={styles.cta}>
          Apply for this IPO
        </Link>
      </div>

      <p className={styles.disclaimer}>
        IPO investing is subject to market risk. Allotment is not guaranteed. Read the RHP and offer document before applying.
      </p>
    </motion.article>
  );
}
