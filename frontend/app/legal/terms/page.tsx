import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from '../privacy/LegalPage.module.css'

export const metadata = {
    title: 'Terms of Service — APFX',
    description: 'Read the terms and conditions governing your use of APFX’s services and trading platforms.',
}

export default function TermsPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Terms of"
                accentLine="Service"
                subtitle="These terms and conditions govern your access to and use of APFX’s services and platforms."
                breadcrumbs={[{ label: 'Legal', href: '/legal' }, { label: 'Terms of Service' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <h3>1. Acceptance of Terms</h3>
                            <p>By using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                            <h3>2. Eligibility</h3>
                            <p>You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use our services.</p>

                            <h3>3. Account Security</h3>
                            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

                            <h3>4. Prohibited Activities</h3>
                            <p>You may not use our services for any illegal or unauthorized purpose, including market manipulation or fraudulent activities.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}
