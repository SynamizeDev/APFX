'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Video, ArrowRight } from 'lucide-react'
import styles from './TradingAcademy.module.css'

const ACADEMY_ITEMS = [
    {
        id: 'academy',
        icon: <BookOpen size={28} />,
        title: 'Trading\nAcademy',
        desc: 'Learn with APFX Academy for clear, structured lessons. Easy steps to build trading skills. No experience needed.',
        link: 'Explore Courses',
        href: '/academy'
    },
    {
        id: 'education',
        icon: <GraduationCap size={28} />,
        title: 'Education\nSection',
        desc: 'Read articles and watch tutorials that cover every trading aspect. All topics, all levels, all in one click.',
        link: 'Browse All Topics',
        href: '/education'
    },
    {
        id: 'webinars',
        icon: <Video size={28} />,
        title: 'Live\nWebinars',
        desc: 'Attend our weekly live webinars to analyse trends. Improve your trading skills, in simple and understandable terms.',
        link: 'Reserve Your Spot',
        href: '/education/webinars'
    }
]

export default function TradingAcademy() {
    return (
        <section className={`${styles.section} apfx-section`} aria-labelledby="academy-heading">
            <div className={styles.dividerGlow} />
            {/* Background Decorative Text */}
            <div className={styles.bgWatermark} aria-hidden="true">
                LEARN
            </div>

            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 id="academy-heading" className={styles.title}>
                        Trading <span className={styles.titleAccent}>Starts Here</span>
                    </h2>
                </header>

                <div className={styles.grid}>
                    {ACADEMY_ITEMS.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: idx * 0.15,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{ y: -10 }}
                        >
                            <div className={styles.cardGlow} />
                            <div className={styles.cardFlare} />
                            <div className={styles.shimmer} />

                            <div className={styles.iconContainer}>
                                <div className={styles.iconBlob} />
                                <div className={styles.iconWrapper}>
                                    {item.icon}
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDesc}>{item.desc}</p>
                            </div>

                            <Link href={item.href} className={styles.link}>
                                <span>{item.link}</span>
                                <ArrowRight size={16} className={styles.linkArrow} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className={styles.dividerGlowBottom} />
        </section>
    )
}
