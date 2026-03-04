'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import styles from './page.module.css'

export default function LoginPage() {
    return (
        <main className={styles.authContainer}>
            {/* Animated abstract background */}
            <div className={styles.orb1} />
            <div className={styles.orb2} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={styles.authCard}
            >
                <div className={styles.header}>
                    <Link href="/" className={styles.logoIcon}>
                        <Sparkles size={24} />
                    </Link>
                    <h1 className={styles.title}>Welcome back</h1>
                    <p className={styles.subtitle}>Enter your details to access your trading dashboard.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert('Login submitted - Connect to NextAuth/Backend') }}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link href="/forgot-password" className={styles.forgotLink}>
                            Forgot password?
                        </Link>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Sign In <ArrowRight size={18} style={{ display: 'inline', marginLeft: '0.25rem', verticalAlign: '-3px' }} />
                    </button>
                </form>

                <div className={styles.switchAuth}>
                    Don't have an account?
                    <Link href="/register">Open an account</Link>
                </div>
            </motion.div>
        </main>
    )
}
