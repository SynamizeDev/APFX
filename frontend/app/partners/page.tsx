'use client'

import { useState } from 'react'
import {
  DollarSign,
  Shield,
  Wrench,
  HeadphonesIcon,
  BarChart3,
  LayoutDashboard,
  Image,
  Palette,
  HelpCircle,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './Partners.module.css'

const BENEFITS = [
  { icon: DollarSign, title: 'Competitive commission structure', description: 'Earn competitive payouts for every referred trader and their trading activity.' },
  { icon: Shield, title: 'Reliable trading platform', description: 'Promote a platform built for stability, transparency, and long-term trader success.' },
  { icon: Wrench, title: 'Advanced tools and resources', description: 'Access calculators, risk tools, and educational content to share with your audience.' },
  { icon: HeadphonesIcon, title: 'Dedicated partner support', description: 'Get help from a dedicated team so you can focus on growing your referrals.' },
  { icon: BarChart3, title: 'Transparent tracking and payouts', description: 'Track referrals and commissions in real time with clear reporting and timely payouts.' },
]

const PARTNERSHIP_TYPES = [
  {
    title: 'Affiliate Partner',
    description: 'Promote the platform using your referral links and earn commissions when referred users sign up and trade.',
    benefits: ['Commission per referred trader', 'Revenue share from trading activity', 'Simple link-based tracking'],
  },
  {
    title: 'Introducing Broker (IB)',
    description: 'Refer traders and build a client network. Ideal for financial professionals and community leaders.',
    benefits: ['Rebates or revenue share', 'Partner dashboard and reporting', 'Support for your clients'],
  },
  {
    title: 'Content Creator / Influencer',
    description: 'Share educational content and trading insights while promoting the platform to your audience.',
    benefits: ['Custom commission terms', 'Marketing assets and creatives', 'Collaboration on campaigns'],
  },
  {
    title: 'Business Partner',
    description: 'Collaborate with the company to expand trading services, white-label solutions, or regional partnerships.',
    benefits: ['Tailored partnership terms', 'Dedicated account management', 'Growth opportunities'],
  },
]

const TOOLS = [
  { icon: LayoutDashboard, title: 'Referral tracking dashboard', description: 'Monitor clicks, sign-ups, and commissions in one place.' },
  { icon: Image, title: 'Marketing materials', description: 'Pre-made banners, landing pages, and copy for your channels.' },
  { icon: Palette, title: 'Banner ads and promotional assets', description: 'Multiple formats and sizes for web and social.' },
  { icon: HelpCircle, title: 'Dedicated partner support', description: 'Direct line for questions and optimization tips.' },
]

const FAQ = [
  {
    q: 'Who can become a partner?',
    a: 'Affiliates, IBs, content creators, educators, and businesses with an audience interested in trading or investing can apply. We review each application to ensure a good fit.',
  },
  {
    q: 'How are commissions paid?',
    a: 'Commissions are typically paid monthly via bank transfer or other agreed methods. Payout schedules and methods depend on your partnership type and region.',
  },
  {
    q: 'Is there a minimum payout threshold?',
    a: 'Yes. Minimum payout thresholds apply and vary by region and payment method. Details are provided once your partnership is approved.',
  },
  {
    q: 'How is tracking and reporting done?',
    a: 'Partners get access to a dashboard where you can see referral links, sign-ups, and commission metrics in real time. Reports can be exported for your records.',
  },
]

const PARTNER_TYPE_OPTIONS = [
  { value: '', label: 'Select partnership type' },
  { value: 'affiliate', label: 'Affiliate Partner' },
  { value: 'ib', label: 'Introducing Broker (IB)' },
  { value: 'content', label: 'Content Creator / Influencer' },
  { value: 'business', label: 'Business Partner' },
]

export default function PartnersPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('loading')
    // Simulate submit; replace with actual API call when ready
    setTimeout(() => {
      setFormStatus('success')
      ;(e.target as HTMLFormElement).reset()
    }, 800)
  }

  return (
    <div className={styles.page}>
      <InnerPageHero
        title="Become Our Partner"
        subtitle="Earn commissions by referring traders and promoting our platform. Join affiliates, introducing brokers, content creators, and business partners who grow with us."
        breadcrumbs={[{ label: 'Become a Partner' }]}
      />

      <main className={styles.main}>
        {/* Hero CTAs */}
        <section className={styles.section} aria-label="Partner actions">
          <div className={styles.container}>
            <div className={styles.heroCtas}>
              <a href="#apply" className={styles.heroCtaPrimary}>Apply to Become a Partner</a>
              <a href="#how-it-works" className={styles.heroCtaSecondary}>Learn How It Works</a>
            </div>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className={styles.section} aria-labelledby="why-heading">
          <div className={styles.container}>
            <h2 id="why-heading" className={styles.sectionTitle}>Why Partner With Us</h2>
            <p className={styles.sectionSubtitle}>Benefits that help you succeed as a partner.</p>
            <div className={styles.benefitsGrid}>
              {BENEFITS.map((b) => (
                <div key={b.title} className={styles.benefitCard}>
                  <b.icon className={styles.benefitIcon} size={48} strokeWidth={1.5} aria-hidden />
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Types of Partnerships */}
        <section className={styles.section} aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>Types of Partnerships</h2>
            <p className={styles.sectionSubtitle}>Choose the partnership model that fits you.</p>
            <div className={styles.typesGrid}>
              {PARTNERSHIP_TYPES.map((t) => (
                <div key={t.title} className={styles.typeCard}>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                  <ul>
                    {t.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={styles.section} id="how-it-works" aria-labelledby="how-heading">
          <div className={styles.container}>
            <h2 id="how-heading" className={styles.sectionTitle}>How the Partnership Works</h2>
            <p className={styles.sectionSubtitle}>Four simple steps to start earning.</p>
            <div className={styles.stepsWrap}>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>1</div>
                <h4>Apply to become a partner</h4>
                <p>Submit the form below. Our team will review and get in touch.</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>2</div>
                <h4>Get your referral link or dashboard</h4>
                <p>Once approved, you’ll receive your unique link and access to the partner dashboard.</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>3</div>
                <h4>Share the platform with your audience</h4>
                <p>Use your link and our marketing materials to promote the platform.</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>4</div>
                <h4>Earn commissions from referred traders</h4>
                <p>Get paid when your referrals sign up and trade, with transparent tracking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Commission Structure */}
        <section className={styles.section} aria-labelledby="commission-heading">
          <div className={styles.container}>
            <h2 id="commission-heading" className={styles.sectionTitle}>Commission Structure</h2>
            <p className={styles.sectionSubtitle}>How partners earn revenue.</p>
            <div className={styles.commissionGrid}>
              <div className={styles.commissionCard}>
                <h4>How you earn</h4>
                <ul>
                  <li>Commission per referred trader when they sign up and meet qualifying activity.</li>
                  <li>Revenue share from trading activity of your referred clients.</li>
                  <li>Transparent performance tracking and reporting in your dashboard.</li>
                  <li>Terms vary by partnership type and region; we’ll share details after approval.</li>
                </ul>
              </div>
              <div className={styles.commissionCard}>
                <h4>Example earnings scenario</h4>
                <p>Illustrative example (actual terms may vary):</p>
                <ul>
                  <li>You refer 20 active traders in a month.</li>
                  <li>Average commission per qualified referral: $50.</li>
                  <li>Revenue share from their trading: variable based on volume.</li>
                </ul>
                <div className={styles.exampleEarnings}>
                  <p>Estimated potential that month (example only):</p>
                  <p className={styles.amount}>$1,000+</p>
                  <p>Real earnings depend on your referrals’ activity and your agreement.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Tools */}
        <section className={styles.section} aria-labelledby="tools-heading">
          <div className={styles.container}>
            <h2 id="tools-heading" className={styles.sectionTitle}>Partner Tools & Resources</h2>
            <p className={styles.sectionSubtitle}>What you get to help you succeed.</p>
            <div className={styles.toolsGrid}>
              {TOOLS.map((t) => (
                <div key={t.title} className={styles.toolItem}>
                  <t.icon className={styles.toolItemIcon} size={40} strokeWidth={1.5} aria-hidden />
                  <div>
                    <h4>{t.title}</h4>
                    <p>{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.section} aria-labelledby="faq-heading">
          <div className={styles.container}>
            <h2 id="faq-heading" className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>Common questions about the partner program.</p>
            <ul className={styles.faqList}>
              {FAQ.map((f) => (
                <li key={f.q} className={styles.faqItem}>
                  <h4>{f.q}</h4>
                  <p>{f.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Application Form */}
        <section className={styles.section} id="apply" aria-labelledby="apply-heading">
          <div className={styles.container}>
            <h2 id="apply-heading" className={styles.sectionTitle}>Partner Application</h2>
            <p className={styles.sectionSubtitle}>Tell us about yourself and how you’d like to partner with us.</p>
            <div className={styles.formCard}>
              <h3>Apply to become a partner</h3>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="partner-name">Name</label>
                  <input id="partner-name" name="name" type="text" required placeholder="Your name" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="partner-email">Email</label>
                  <input id="partner-email" name="email" type="email" required placeholder="you@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="partner-website">Website or social media profile</label>
                  <input id="partner-website" name="website" type="url" placeholder="https://..." />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="partner-country">Country</label>
                  <input id="partner-country" name="country" type="text" required placeholder="e.g. United Kingdom" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="partner-type">Partnership type</label>
                  <select id="partner-type" name="partnershipType" required>
                    {PARTNER_TYPE_OPTIONS.map((o) => (
                      <option key={o.value || 'default'} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={styles.submitBtn} disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? 'Sending…' : 'Submit Application'}
                </button>
                {formStatus === 'success' && (
                  <p className={styles.formSuccess}>Thank you. We’ve received your application and will be in touch soon.</p>
                )}
                {formStatus === 'error' && (
                  <p className={styles.formSuccess} style={{ background: 'rgba(248,113,113,0.15)', borderColor: 'rgba(248,113,113,0.3)', color: '#f87171' }}>
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection} aria-labelledby="cta-heading">
          <div className={styles.container}>
            <h2 id="cta-heading" className={styles.ctaTitle}>Ready to get started?</h2>
            <p className={styles.ctaSubtitle}>Apply now and our team will reach out with next steps.</p>
            <a href="#apply" className={styles.ctaBtn}>Apply to Become a Partner</a>
          </div>
        </section>
      </main>

      <Footer />
      <BottomBar />
    </div>
  )
}
