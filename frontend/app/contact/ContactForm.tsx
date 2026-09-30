'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Select from '@/components/ui/Select'
import styles from './ContactPage.module.css'

const SUBJECT_OPTIONS = [
    { value: '', label: 'Select a subject' },
    { value: 'General Inquiry', label: 'General Inquiry' },
    { value: 'Technical Support', label: 'Technical Support' },
    { value: 'Account Opening', label: 'Account Opening' },
    { value: 'Institutional Solutions', label: 'Institutional Solutions' },
]

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [subject, setSubject] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const fullName = (formData.get('name') as string)?.trim() || ''
        const email = (formData.get('email') as string)?.trim() || ''
        const msgSubject = (formData.get('subject') as string)?.trim() || subject.trim()
        const message = (formData.get('message') as string)?.trim() || ''

        if (!fullName || !email || !msgSubject || !message) {
            setStatus('error')
            setErrorMessage('Please fill in all required fields.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setStatus('error')
            setErrorMessage('Please enter a valid email address.')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        const data = {
            type: 'support',
            fullName,
            email,
            subject: msgSubject,
            message,
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/contact`
                : '/api/contact'

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const resData = await res.json().catch(() => null)

            if (res.ok && (resData?.success || resData?.status === 'success')) {
                setStatus('success')
                setSubject('')
                form.reset()
            } else {
                setStatus('error')
                setErrorMessage(resData?.message || 'Something went wrong. Please try again shortly.')
            }
        } catch (err) {
            console.error('Contact form submission error:', err)
            setStatus('error')
            setErrorMessage('Something went wrong. Please try again shortly.')
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
                        <Select
                            id="form-subject"
                            value={subject}
                            onChange={setSubject}
                            options={SUBJECT_OPTIONS}
                            triggerClassName={`${styles.selectTrigger} ${subject ? '' : styles.selectTriggerPlaceholder}`}
                        />
                        <input type="hidden" name="subject" value={subject} required />
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
                                Your message has been sent successfully.
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
                                {errorMessage || 'Something went wrong. Please try again shortly.'}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
        </div>
    )
}