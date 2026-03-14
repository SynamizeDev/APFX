'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, Zap, List, TrendingUp } from 'lucide-react';
import styles from './HowToActivate.module.css';

const STEPS = [
  { num: 1, icon: UserPlus, title: 'Open trading account', text: 'Open a demat and trading account with us if you don’t have one already.' },
  { num: 2, icon: Zap, title: 'Activate margin facility', text: 'Apply for MTF; complete the process and accept the margin agreement.' },
  { num: 3, icon: List, title: 'Select eligible stocks', text: 'Check the list of stocks available for margin trading and plan your positions.' },
  { num: 4, icon: TrendingUp, title: 'Start trading with margin', text: 'Place buy orders using your capital and margin within the limits and rules.' },
];

export default function HowToActivate() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>How to Activate MTF</h2>
        <p className={styles.subtitle}>Four steps to start margin trading with us.</p>
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
          <Link href="/contact" className={styles.cta}>Activate MTF</Link>
        </div>
      </div>
    </section>
  );
}
