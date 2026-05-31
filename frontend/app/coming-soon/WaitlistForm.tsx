'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import styles from './ComingSoon.module.css'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

type FormData = {
    fullName: string
    email: string
    phone: string
    message: string
}

const INITIAL_FORM: FormData = {
    fullName: '',
    email: '',
    phone: '',
    message: '',
}

export default function WaitlistForm() {
    const [status, setStatus] = useState<FormStatus>('idle')
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM)

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (status === 'success' || status === 'error') {
            setStatus('idle')
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const trimmedName = formData.fullName.trim()
        const trimmedEmail = formData.email.trim()

        if (!trimmedName || !trimmedEmail) {
            return
        }

        const waitlistUrl = process.env.NEXT_PUBLIC_WAITLIST_URL
        if (!waitlistUrl) {
            console.error('NEXT_PUBLIC_WAITLIST_URL is not configured')
            setStatus('error')
            return
        }

        setStatus('loading')

        try {
            const response = await fetch(waitlistUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: trimmedName,
                    email: trimmedEmail,
                    phone: formData.phone.trim(),
                    message: formData.message.trim(),
                }),
            })

            if (response.ok) {
                setFormData(INITIAL_FORM)
                setStatus('success')
            } else {
                setStatus('error')
            }
        } catch (err) {
            console.error('Waitlist submission error:', err)
            setStatus('error')
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="waitlist-fullName">Full Name</label>
                    <input
                        id="waitlist-fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="waitlist-email">Email</label>
                    <input
                        id="waitlist-email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="waitlist-phone">
                    Phone Number{' '}
                    <span className={styles.optional}>(optional)</span>
                </label>
                <input
                    id="waitlist-phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="waitlist-message">
                    Message{' '}
                    <span className={styles.optional}>(optional)</span>
                </label>
                <textarea
                    id="waitlist-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us what you're looking forward to..."
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                className={styles.submit}
                disabled={status === 'loading'}
            >
                {status === 'loading' ? (
                    <>
                        <Loader2
                            size={18}
                            strokeWidth={2.5}
                            className={styles.spinner}
                            aria-hidden="true"
                        />
                        Submitting…
                    </>
                ) : (
                    'Join the Waitlist'
                )}
            </button>

            <AnimatePresence mode="wait">
                {status === 'success' && (
                    <motion.p
                        key="success"
                        className={styles.successMsg}
                        role="status"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        Thanks! We&apos;ll keep you updated.
                    </motion.p>
                )}

                {status === 'error' && (
                    <motion.p
                        key="error"
                        className={styles.errorMsg}
                        role="alert"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        Something went wrong. Please try again.
                    </motion.p>
                )}
            </AnimatePresence>
        </form>
    )
}
