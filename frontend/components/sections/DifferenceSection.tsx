'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './DifferenceSection.module.css'

const DIFFERENCE_ITEMS = [
    {
        id: 'succeed',
        title: 'We Want\nYou to Succeed',
        desc: 'From developing the best educational materials out there, to providing <strong>daily market analysis</strong> updates and live webinars, we are as interested in your success as you are.'
    },
    {
        id: 'possibilities',
        title: 'We Believe in\nEndless Possibilities',
        desc: 'Access the world\'s most popular instruments, ranging from <strong>forex pairs to CFDs</strong> on stocks, indices, commodities, and cryptocurrencies – all at the palm of your hand.'
    },
    {
        id: 'conditions',
        title: 'Great Trading\nConditions',
        desc: 'Hedging is allowed, without any restrictions on <strong>short selling</strong> and scalping. We provide fast and reliable order execution, as well as ultra-low spreads.'
    },
    {
        id: 'deserve',
        title: 'We Believe You\nDeserve The Best',
        desc: 'Take advantage of our Expert Advisors, <strong>Copy Trading</strong> platforms and 24/7 crypto trading. Or utilise the Trading Central automated analysis add-on.'
    },
    {
        id: 'touch',
        title: 'We Love\nto Stay in Touch!',
        desc: 'Stay up-to-date on the latest market news, promotions and offers! <strong>Follow us</strong> on our social media channels for real-time market updates.'
    },
    {
        id: 'security',
        title: 'Secure &\nTransparent',
        desc: 'Trade with confidence using strong platform protections and clear policies—built around <strong>privacy</strong>, <strong>risk controls</strong>, and reliable infrastructure.'
    },
]

export default function DifferenceSection() {
    return (
        <section className={styles.section} aria-labelledby="diff-heading">
            {/* Background Image */}
            <div className={styles.bgImage}>
                <Image
                    src="/difference_bg.png"
                    alt="Institutional trading environment"
                    fill
                    priority
                />
                <div className={styles.overlay} />
            </div>

            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 id="diff-heading" className={styles.title}>
                        What Makes APFX Different?
                    </h2>
                    <p className={styles.subtitle}>
                        Join Over 1 Million Returning Clients who already made the right choice
                    </p>
                </header>

                <div className={styles.grid}>
                    {DIFFERENCE_ITEMS.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            className={styles.item}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: idx * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <div className={styles.accentBar} />
                            <h3 className={styles.itemTitle}>{item.title}</h3>
                            <p
                                className={styles.itemDesc}
                                dangerouslySetInnerHTML={{ __html: item.desc }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
