'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import styles from './CookieConsent.module.css'

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user already accepted
        const consent = localStorage.getItem('apfx_cookie_consent')
        if (!consent) {
            // Show after a slight delay to allow site entry animations to play
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 2500) // 2.5s delay fits well with the home entry animation
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('apfx_cookie_consent', 'accepted')
        setIsVisible(false)
    }

    const handleDecline = () => {
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.banner}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1], // Premium ease-out
                    }}
                >
                    <div className={styles.content}>
                        <p>
                            We use cookies to enhance your trading experience and analyze our traffic. 
                            By clicking &quot;Accept&quot;, you consent to our use of cookies. 
                            See our <Link href="/cookie-policy">Cookie Policy</Link> for details.
                        </p>
                    </div>
                    <div className={styles.actions}>
                        <button 
                            className={styles.declineBtn} 
                            onClick={handleDecline}
                            aria-label="Decline non-essential cookies"
                        >
                            Decline
                        </button>
                        <button 
                            className={styles.acceptBtn} 
                            onClick={handleAccept}
                            aria-label="Accept all cookies"
                        >
                            Accept
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
