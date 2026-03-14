'use client';

import { motion } from 'framer-motion';
import { Zap, BookOpen, Bell, Headphones } from 'lucide-react';
import styles from './WhyApplyWithUs.module.css';

const ITEMS = [
  { icon: Zap, title: 'Easy IPO application process', text: 'Apply in a few steps with a simple form and UPI. We guide you through the flow.' },
  { icon: BookOpen, title: 'Research insights', text: 'Access summary views and key details so you can make an informed decision.' },
  { icon: Bell, title: 'Notifications for new IPOs', text: 'Get alerted when new IPOs open so you don’t miss subscription windows.' },
  { icon: Headphones, title: 'Expert guidance', text: 'Our team can help you understand an issue and the application process.' },
];

export default function WhyApplyWithUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Why Apply Through Us</h2>
        <p className={styles.subtitle}>We make IPO application simple and supported.</p>
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
