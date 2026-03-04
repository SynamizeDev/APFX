'use client'

import { MapPin, Mail, Phone, Clock } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/animations/AnimatedSection'
import styles from './page.module.css'

export default function ContactPage() {
    return (
        <>
            <Header />

            <main style={{ backgroundColor: 'var(--color-bg)' }}>
                {/* Hero Section */}
                <section className={styles.contactHero}>
                    <AnimatedSection>
                        <h1 className={styles.heroTitle}>Get in Touch</h1>
                        <p className={styles.heroSubtitle}>
                            Our dedicated institutional support team is available 24/5 to assist with onboarding, API integrations, and account management.
                        </p>
                    </AnimatedSection>
                </section>

                {/* Form & Info Layout */}
                <section className={styles.contactLayout}>
                    <AnimatedSection delay={0.1}>
                        <div className={styles.formContainer}>
                            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent.") }}>
                                <div className={styles.formGroup}>
                                    {/* Placeholder is intentionally a space to trigger :not(:placeholder-shown) logic */}
                                    <input type="text" id="name" className={styles.input} placeholder=" " required />
                                    <label htmlFor="name" className={styles.label}>Full Name</label>
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="email" id="email" className={styles.input} placeholder=" " required />
                                    <label htmlFor="email" className={styles.label}>Email Address</label>
                                </div>
                                <div className={styles.formGroup}>
                                    <select id="subject" className={styles.input} required defaultValue="">
                                        <option value="" disabled>Select an inquiry type</option>
                                        <option value="support">General Support</option>
                                        <option value="api">FIX API / Dev Support</option>
                                        <option value="partners">Institutional Partnerships</option>
                                        <option value="account">Account Management</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <textarea id="message" className={styles.input} rows={5} placeholder=" " required></textarea>
                                    <label htmlFor="message" className={styles.label}>Your Message</label>
                                </div>
                                <button type="submit" className={styles.submitBtn}>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <div className={styles.infoColumn}>
                            <div className={styles.infoBlock}>
                                <h3>London Headquarters</h3>
                                <p><span className={styles.iconWrap}><MapPin size={20} /></span> One Canada Square, Canary Wharf, London, UK</p>
                                <p><span className={styles.iconWrap}><Phone size={20} /></span> +44 (0) 20 7123 4567</p>
                            </div>

                            <div className={styles.infoBlock}>
                                <h3>APAC Regional Office</h3>
                                <p><span className={styles.iconWrap}><MapPin size={20} /></span> Marina Bay Financial Centre, Tower 2, Singapore</p>
                                <p><span className={styles.iconWrap}><Phone size={20} /></span> +65 6123 4567</p>
                            </div>

                            <div className={styles.infoBlock}>
                                <h3>Direct Channels</h3>
                                <p><span className={styles.iconWrap}><Mail size={20} /></span> support@apfx.com (General Inquiries)</p>
                                <p><span className={styles.iconWrap}><Mail size={20} /></span> institutional@apfx.com (Prime & API)</p>
                                <p><span className={styles.iconWrap}><Clock size={20} /></span> Trading Desk: 24/5 (Sun 22:00 - Fri 22:00 GMT)</p>
                            </div>
                        </div>
                    </AnimatedSection>
                </section>
            </main>

            <Footer />
        </>
    )
}