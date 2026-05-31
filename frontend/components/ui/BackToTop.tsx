'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollToTop } from '@/components/animations/SmoothScrollProvider'
import styles from './BackToTop.module.css'

const SHOW_AFTER_PX = 400

export default function BackToTop() {
    const [visible, setVisible] = useState(false)
    const scrollToTop = useScrollToTop()

    useEffect(() => {
        const updateVisibility = () => {
            setVisible(window.scrollY > SHOW_AFTER_PX)
        }

        updateVisibility()
        window.addEventListener('scroll', updateVisibility, { passive: true })
        return () => window.removeEventListener('scroll', updateVisibility)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    className={styles.button}
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    initial={{ opacity: 0, y: 16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowUp size={24} strokeWidth={2} aria-hidden />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
