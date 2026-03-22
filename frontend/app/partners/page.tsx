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
import Select from '@/components/ui/Select'
import styles from './Partners.module.css'

const BENEFITS = [
  { icon: DollarSign, title: 'Tiered Remuneration Models', description: 'Access competitive commission structures and volume-based rebates tailored to your business scale.' },
  { icon: Shield, title: 'Institutional Infrastructure', description: 'Promote a platform built on stability, deep liquidity, and professional-grade execution standards.' },
  { icon: Wrench, title: 'Strategic Marketing Assets', description: 'Utilize high-conversion creatives, technical analysis tools, and institutional research to engage your audience.' },
  { icon: HeadphonesIcon, title: 'Dedicated Partnership Desk', description: 'Direct access to institutional account managers to optimize your referral conversion and growth.' },
  { icon: BarChart3, title: 'Operational Transparency', description: 'Audit your performance with real-time tracking, granular reporting, and automated reconciliation.' },
]

const PARTNERSHIP_TYPES = [
  {
    title: 'Affiliate Program',
    description: 'Scale your digital reach with precision-tracked referral infrastructure and high-tier conversion assets.',
    benefits: ['CPA and CPL models', 'Hybrid remuneration options', 'Sub-affiliate tracking capability'],
  },
  {
    title: 'Introducing Broker (IB)',
    description: 'Build a professional client network backed by institutional support, deep liquidity, and competitive volume rebates.',
    benefits: ['Multi-level rebate structures', 'Dedicated IB management tools', 'Institutional support for your clients'],
  },
  {
    title: 'Content & Campaign Partners',
    description: 'Collaborate on high-value market initiatives, educational content, and co-branded technical research.',
    benefits: ['Custom integration terms', 'Exclusive marketing materials', 'Joint campaign initiatives'],
  },
  {
    title: 'Corporate Solutions',
    description: 'Tailored liquidity and infrastructure for institutional business partners and white-label providers.',
    benefits: ['API connectivity solutions', 'Bespoke liquidity bridging', 'Regional business development support'],
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
  const [partnershipType, setPartnershipType] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!partnershipType) return
    setFormStatus('loading')
    // Simulate submit; replace with actual API call when ready
    setTimeout(() => {
      setFormStatus('success')
      ;(e.target as HTMLFormElement).reset()
      setPartnershipType('')
    }, 800)
  }

  return (
    <div className={styles.page}>
      <InnerPageHero
        title="Institutional Partnership Programs"
        subtitle="Refer professional market participants to a network built on liquidity, speed, and transparency. Join a global community of partners backed by institutional-grade support."
        breadcrumbs={[]}
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
        <section className={styles.section} aria-labelledby="why-partner">
          <div className={styles.container}>
            <h2 id="why-partner" className={styles.sectionTitle}>The APFX Partnership Edge</h2>
          <p className={styles.sectionSubtitle}>
            Join an institutional ecosystem where transparency and execution reliability are prioritized for every client referral.
          </p>
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

        {/* Partnership Types */}
        <section className={styles.section} id="types" aria-labelledby="types-heading">
          <div className={styles.container}>
            <h2 id="types-heading" className={styles.sectionTitle}>Global Partnership Models</h2>
            <p className={styles.sectionSubtitle}>
              Differentiated models for Affiliates, IBs, Influencers, and Institutional Business Partners.
            </p>
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
            <h2 id="tools-heading" className={styles.sectionTitle}>Intelligence & Reporting Ecosystem</h2>
            <p className={styles.sectionSubtitle}>Operational tools designed to optimize your performance and tracking.</p>
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
                  <input
                    type="hidden"
                    name="partnershipType"
                    value={partnershipType}
                    required
                    aria-hidden
                  />
                  <Select
                    id="partner-type"
                    value={partnershipType}
                    onChange={setPartnershipType}
                    options={PARTNER_TYPE_OPTIONS}
                  />
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
