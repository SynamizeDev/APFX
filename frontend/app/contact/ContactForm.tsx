'use client'

import { useState } from 'react'
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
                    ; (e.target as HTMLFormElement).reset()
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
            <div className={styles.formBox}>
                <h3>Send us a Message</h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="form-name">Full Name</label>
                            <input id="form-name" name="name" type="text" placeholder="John Doe" required />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="form-email">Email Address</label>
                            <input id="form-email" name="email" type="email" placeholder="john@example.com" required />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="form-subject">Subject</label>
                        <select id="form-subject" name="subject" required>
                            <option value="">Select a subject</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Account Opening">Account Opening</option>
                            <option value="Institutional Solutions">Institutional Solutions</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="form-message">Message</label>
                        <textarea id="form-message" name="message" rows={5} placeholder="How can we help?" required></textarea>
                    </div>
                    <button
                        type="submit"
                        className={styles.btnSubmit}
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>

                    {status === 'success' && (
                        <p className={styles.successMsg} role="alert">Thank you! Your message has been sent successfully.</p>
                    )}
                    {status === 'error' && (
                        <p className={styles.errorMsg} role="alert">Oops! Something went wrong. Please try again later.</p>
                    )}
                </form>
            </div>
        </div>
    )
}
