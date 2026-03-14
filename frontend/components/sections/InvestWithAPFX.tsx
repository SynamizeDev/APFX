'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './InvestWithAPFX.module.css'

const ROTATING_ITEMS = [
    'MUTUAL FUNDS',
    'F&O',
    'STOCKS',
    'IPO',
    'MTF',
]

const ROTATE_INTERVAL_MS = 2500

export default function InvestWithAPFX({ embedded }: { embedded?: boolean }) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % ROTATING_ITEMS.length)
        }, ROTATE_INTERVAL_MS)
        return () => clearInterval(id)
    }, [])

    const current = ROTATING_ITEMS[index]

    return (
        <section
            className={embedded ? `${styles.section} ${styles.embedded}` : styles.section}
            aria-label="Invest with APFX"
        >
            <div className={styles.wrapper}>
                <h2 className={styles.heading}>Invest with APFX</h2>
                <p className={styles.rotatingLine} aria-live="polite">
                    <span className={styles.accent}>&gt;</span>{' '}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={current}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.25 }}
                        >
                            &lsquo;{current}&rsquo;
                        </motion.span>
                    </AnimatePresence>
                </p>
            </div>
        </section>
    )
}
