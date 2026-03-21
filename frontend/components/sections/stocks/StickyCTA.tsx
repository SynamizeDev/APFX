'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import styles from './StickyCTA.module.css'

export default function StickyCTA() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 600)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div 
                    className={styles.bar}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                    <div className={styles.container}>
                        <div className={styles.text}>
                            Ready to trade global equities?
                        </div>
                        <div className={styles.actions}>
                            <Link href="https://portal.apfx.com/register" className={styles.btnPrimary}>
                                Open Account
                            </Link>
                            <Link href="/contact" className={styles.btnSecondary}>
                                Speak to Expert
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
