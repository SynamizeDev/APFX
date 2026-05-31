'use client'

import { motion } from 'framer-motion'
import WaitlistForm from './WaitlistForm'
import styles from './ComingSoon.module.css'

export default function ComingSoonClient() {
    return (
        <div className={styles.page}>
            <motion.div
                className={styles.container}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.card}>
                    <h1 className={styles.heading}>We&apos;ll Be Live Soon</h1>
                    <p className={styles.subheading}>
                        To stay connected and receive updates, drop your details
                        below and we&apos;ll notify you when we launch.
                    </p>
                    <WaitlistForm />
                </div>
            </motion.div>
        </div>
    )
}
