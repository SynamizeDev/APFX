import styles from './Forex.module.css'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Layers, BarChart3, Binary, Percent } from 'lucide-react'

const FOREX_TERMS = [
    {
        title: 'Pips',
        desc: 'The smallest price movement an exchange rate can make, usually the 4th decimal place.',
        icon: <Binary size={24} />
    },
    {
        title: 'Spread',
        desc: 'The difference between the Bid (buy) and Ask (sell) price of a currency pair.',
        icon: <BarChart3 size={24} />
    },
    {
        title: 'Leverage',
        desc: 'Trading with more money than you have in your account, using borrowed capital.',
        icon: <Layers size={24} />
    },
    {
        title: 'Margin',
        desc: 'The minimum balance required to maintain an open leveraged position.',
        icon: <Percent size={24} />
    },
    {
        title: 'Going Long',
        desc: 'Buying a currency pair expecting the base currency to increase in value.',
        icon: <ArrowUpRight size={24} />
    },
    {
        title: 'Going Short',
        desc: 'Selling a currency pair expecting the base currency to decrease in value.',
        icon: <ArrowDownRight size={24} />
    }
]

export default function ForexTerms() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        Essential <span className={styles.sectionTitleAccent}>Terminology</span>
                    </h2>
                </header>

                <div className={styles.termsGrid}>
                    {FOREX_TERMS.map((term, idx) => (
                        <motion.div
                            key={term.title}
                            className={styles.termCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className={styles.termGlow} />
                            <div className={styles.termShimmer} />

                            <div className={styles.termIconWrapper}>
                                {term.icon}
                            </div>
                            <h3 className={styles.termTitle}>{term.title}</h3>
                            <p className={styles.termDesc}>{term.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
