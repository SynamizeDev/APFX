import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './LegalPage.module.css'

export const metadata = {
    title: 'Privacy Policy — APFX',
    description: 'Learn how APFX collects, uses, and protects your personal data in accordance with global privacy standards.',
}

export default function PrivacyPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Privacy"
                accentLine="Policy"
                subtitle="Your privacy is of paramount importance to us. This policy outlines how we handle and protect your personal information."
                breadcrumbs={[{ label: 'Legal', href: '/legal' }, { label: 'Privacy Policy' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <h3>1. Information Collection</h3>
                            <p>We collect personal information that you provide to us when you open an account, use our services, or communicate with us.</p>

                            <h3>2. Use of Information</h3>
                            <p>Your information is used to provide our services, verify your identity, process transactions, and comply with legal obligations.</p>

                            <h3>3. Data Protection</h3>
                            <p>We implement advanced security measures to protect your data from unauthorized access, loss, or disclosure.</p>

                            <h3>4. Disclosure to Third Parties</h3>
                            <p>We do not sell your personal data. We may share information with trusted partners who assist us in providing our services.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}
