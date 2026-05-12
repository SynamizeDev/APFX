'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { usePreferences } from '@/context/PreferencesContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
    const { theme, setTheme } = usePreferences()
    const isDark = theme === 'dark'

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className={`${styles.icon} ${isDark ? styles.active : ''}`}>
                <Moon className={styles.iconMoon} size={14} />
            </div>
            
            <div className={`${styles.icon} ${!isDark ? styles.active : ''}`}>
                <Sun className={styles.iconSun} size={14} />
            </div>

            <motion.div
                className={styles.handle}
                animate={{
                    x: isDark ? 0 : 38,
                    backgroundColor: '#36F936',
                    boxShadow: '0 0 20px rgba(54, 249, 54, 0.5)'
                }}
                transition={{
                    type: 'tween',
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1] // Custom "institutional" ease-out
                }}
            />
        </button>
    )
}
