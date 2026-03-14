'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, FileCheck, Smartphone, Rocket } from 'lucide-react';
import styles from './HowToApply.module.css';

const STEPS = [
  { num: 1, icon: UserPlus, title: 'Create investment account', text: 'Open a demat and trading account with us or link your existing one.' },
  { num: 2, icon: FileCheck, title: 'Choose IPO and apply', text: 'Select the IPO, enter quantity and bid price (within price band), and submit.' },
  { num: 3, icon: Smartphone, title: 'UPI mandate confirmation', text: 'Confirm the block amount via UPI when your bank sends the mandate request.' },
  { num: 4, icon: Rocket, title: 'Allotment and listing', text: 'After the issue closes, allotment is done. On listing day, shares credit to your demat; you can sell or hold.' },
];

export default function HowToApply() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>How to Apply for an IPO</h2>
        <p className={styles.subtitle}>Four steps to apply through our platform.</p>
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className={styles.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepIcon}><s.icon size={24} /></div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </motion.div>
          ))}
        </div>
        <div className={styles.ctaWrap}>
          <Link href="/contact" className={styles.cta}>Open investment account</Link>
        </div>
      </div>
    </section>
  );
}
