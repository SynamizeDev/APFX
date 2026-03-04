'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ContactPage.module.css'

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('loading')

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
            const res = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                setStatus('success')
                ;(e.target as HTMLFormElement).reset()
            } else {
                setStatus('error')
            }
        } catch (err) {
            console.error('Contact form submission error:', err)
            setStatus('error')
        }
    }

    return (
        <div className={styles.formSide}>
            <motion.div
                className={styles.formBox}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <motion.h3
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    Send us a Message
                </motion.h3>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <motion.div
                            className={styles.field}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        >
                            <label htmlFor="form-name">Full Name</label>
                            <input
                                id="form-name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                        </motion.div>

                        <motion.div
                            className={styles.field}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
                        >
                            <label htmlFor="form-email">Email Address</label>
                            <input
                                id="form-email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        className={styles.field}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
                    >
                        <label htmlFor="form-subject">Subject</label>
                        <select id="form-subject" name="subject" required>
                            <option value="">Select a subject</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Account Opening">Account Opening</option>
                            <option value="Institutional Solutions">Institutional Solutions</option>
                        </select>
                    </motion.div>

                    <motion.div
                        className={styles.field}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.12 }}
                    >
                        <label htmlFor="form-message">Message</label>
                        <textarea
                            id="form-message"
                            name="message"
                            rows={5}
                            placeholder="How can we help?"
                            required
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        className={styles.btnSubmit}
                        disabled={status === 'loading'}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                    >
                        {status === 'loading' ? 'Sending…' : 'Send Message'}
                    </motion.button>

                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.p
                                className={styles.successMsg}
                                role="alert"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                            >
                                Thank you. Your message has been sent successfully.
                            </motion.p>
                        )}

                        {status === 'error' && (
                            <motion.p
                                className={styles.errorMsg}
                                role="alert"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                            >
                                Something went wrong. Please try again shortly.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
        </div>
    )
}