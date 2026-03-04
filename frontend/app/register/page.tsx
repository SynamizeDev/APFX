'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import styles from '../login/page.module.css'

export default function RegisterPage() {
    return (
        <main className={styles.authContainer}>
            {/* Animated abstract background */}
            <div className={styles.orb1} />
            <div className={styles.orb2} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={styles.authCard}
            >
                <div className={styles.header}>
                    <Link href="/" className={styles.logoIcon}>
                        <Sparkles size={24} />
                    </Link>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Start trading with institutional-grade conditions.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert('Registration submitted - Connect to Backend') }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label htmlFor="firstName" className={styles.label}>First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                className={styles.input}
                                placeholder="John"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className={styles.label}>Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                className={styles.input}
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>

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

                    <div className={styles.formGroup} style={{ marginBottom: '2.5rem' }}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Create Account <ArrowRight size={18} style={{ display: 'inline', marginLeft: '0.25rem', verticalAlign: '-3px' }} />
                    </button>

                    <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--color-text-3)', textAlign: 'center' }}>
                        By creating an account, you agree to our <Link href="/legal/terms">Terms of Service</Link> and <Link href="/legal/privacy">Privacy Policy</Link>.
                    </p>
                </form>

                <div className={styles.switchAuth}>
                    Already have an account?
                    <Link href="/login">Sign In</Link>
                </div>
            </motion.div>
        </main>
    )
}
