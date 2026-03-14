'use client';

import { motion } from 'framer-motion';
import { Users, Database, Award } from 'lucide-react';
import styles from './WhyTrustOurResearch.module.css';

const ITEMS = [
  { icon: Users, title: 'Experienced analysts', text: 'Our research team brings years of experience in fundamental and technical analysis across sectors.' },
  { icon: Database, title: 'Data-driven research', text: 'Recommendations are backed by rigorous analysis of financials, industry data, and market trends.' },
  { icon: Award, title: 'Proven track record', text: 'We publish performance of past recommendations to maintain transparency and accountability.' },
];

export default function WhyTrustOurResearch() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Why Trust Our Research</h2>
        <p className={styles.subtitle}>We combine expertise, process, and transparency.</p>
        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className={styles.iconWrap}><item.icon size={22} /></div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
