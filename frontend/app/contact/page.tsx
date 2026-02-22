import { Mail, Phone } from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './ContactPage.module.css'
import ContactForm from './ContactForm'

export const metadata = {
    title: 'Contact Us — APFX',
    description: 'Get in touch with APFX’s 24/5 support team or contact our global offices for institutional inquiries.',
}

export default function ContactPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="We're here to"
                accentLine="Help you Succeed"
                subtitle="Whether you have a technical question or need institutional-grade liquidity solutions, our team of experts is ready to assist you 24/5."
                breadcrumbs={[{ label: 'Contact' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.contactGrid}>
                            <ContactForm />

                            {/* Info Side */}
                            <div className={styles.infoSide}>
                                <div className={styles.infoGroup}>
                                    <h4>Global Support</h4>
                                    <p>Available 24 hours a day, 5 days a week.</p>
                                    <div className={styles.contactLink}>
                                        <Mail size={18} /> support@apfx.com
                                    </div>
                                    <div className={styles.contactLink}>
                                        <Phone size={18} /> +44 (0) 20 3000 0000
                                    </div>
                                </div>

                                <div className={styles.officeGrid}>
                                    <div className={styles.office}>
                                        <h5>London (HQ)</h5>
                                        <p>123 Financial District, Canary Wharf, London, UK</p>
                                    </div>
                                    <div className={styles.office}>
                                        <h5>Dubai</h5>
                                        <p>Level 45, Emirates Towers, Sheikh Zayed Rd, Dubai, UAE</p>
                                    </div>
                                    <div className={styles.office}>
                                        <h5>Singapore</h5>
                                        <p>Marina Bay Financial Centre, Tower 3, Singapore</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}
