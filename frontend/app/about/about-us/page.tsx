'use client'

import Link from 'next/link'
import {
  Eye,
  Lightbulb,
  Users,
  BarChart3,
  ShieldCheck,
  Calculator,
  BookOpen,
  TrendingUp,
  Copy,
  Zap,
  Search,
  Smartphone,
  Target,
  Lock,
  Scale,
  Heart,
} from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './AboutUs.module.css'

const VALUES = [
  { icon: Eye, title: 'Transparency', description: 'Clear pricing, no hidden fees, and open communication with our clients at every step.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We continuously improve our platform, tools, and services to meet the evolving needs of traders.' },
  { icon: Users, title: 'Trader empowerment', description: 'We equip traders and investors with education and tools to make informed decisions.' },
  { icon: BarChart3, title: 'Data-driven insights', description: 'Market analysis and research backed by data to support your strategy.' },
  { icon: ShieldCheck, title: 'Security and reliability', description: 'Your capital and data are protected with industry-leading security and uptime.' },
]

const OFFERINGS = [
  { icon: Calculator, title: 'Trading tools and calculators', description: 'Pip, margin, position size, risk-reward, and portfolio risk calculators to plan every trade.' },
  { icon: BookOpen, title: 'Educational resources', description: 'Guides, blog articles, and a comprehensive glossary to build your trading knowledge.' },
  { icon: TrendingUp, title: 'Market insights and recommendations', description: 'Weekly outlooks, analysis, and ideas to stay ahead of the markets.' },
  { icon: Copy, title: 'Copy trading and investment features', description: 'Explore copy trading tools and resources to diversify your approach.' },
]

const WHY_US = [
  { icon: Zap, title: 'Advanced trading tools', description: 'Professional-grade calculators and risk management tools used by serious traders.' },
  { icon: Search, title: 'Expert market research', description: 'Regular market analysis and educational content to inform your decisions.' },
  { icon: Smartphone, title: 'Easy-to-use platform', description: 'Intuitive design so you can focus on trading, not fighting the interface.' },
  { icon: Target, title: 'Focus on risk and education', description: 'We emphasize risk management and trader education so you can trade with confidence.' },
]

const MILESTONES = [
  { year: '2014', title: 'Founded', description: 'APFX started with a focus on institutional-grade execution for serious retail traders.' },
  { year: '2018', title: 'Platform expansion', description: 'Launched advanced trading tools and expanded into new markets.' },
  { year: '2022', title: 'Education and tools', description: 'Introduced comprehensive calculators, risk management tools, and educational content.' },
  { year: '2026', title: 'Today', description: 'Serving traders globally with tools, insights, and a commitment to transparency and security.' },
]

const TEAM = [
  { initials: 'AP', name: 'Abhishek Pandey', role: 'Chief Executive Officer', bio: 'Over 15 years in financial technology and trading infrastructure.' },
  { initials: 'SP', name: 'Sushil Pulojwar', role: 'Head of Product', bio: 'Leads platform and tool development with a focus on trader experience.' },
]

export default function AboutUsPage() {
  return (
    <div className={styles.page}>
      <InnerPageHero
        title="About Our Company"
        subtitle="We are a trading and investing platform built to empower retail traders and investors with professional-grade tools, market insights, and education. Our vision is to make sophisticated trading and risk management accessible to everyone."
        breadcrumbs={[]}
      />

      <main className={styles.main}>
        {/* Company Overview */}
        <section className={styles.section} aria-labelledby="overview-heading">
          <div className={styles.container}>
            <h2 id="overview-heading" className={styles.sectionTitle}>Company Overview</h2>
            <p className={styles.overviewText}>
              We provide a full suite of services for traders and investors: trading tools and calculators, market insights, educational resources, and investment-related features. Our platform is built for retail traders, long-term investors, and beginners who want to learn and grow with clear, reliable tools and information.
            </p>
            <p className={styles.overviewText}>
              Whether you are sizing a Forex trade, managing risk, or exploring copy trading, we aim to give you the clarity and control you need to make informed decisions.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className={styles.section} aria-labelledby="mission-heading">
          <div className={styles.container}>
            <h2 id="mission-heading" className={styles.sectionTitle}>Mission and Vision</h2>
            <div className={styles.missionVisionGrid}>
              <div className={styles.missionCard}>
                <h3>Our Mission</h3>
                <p>To give every trader and investor access to professional-grade tools, transparent pricing, and education so they can manage risk and pursue their financial goals with confidence.</p>
              </div>
              <div className={styles.visionCard}>
                <h3>Our Vision</h3>
                <p>To be the trusted platform where traders and investors turn for tools, insights, and learning—setting the standard for transparency, security, and empowerment in the industry.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className={styles.section} aria-labelledby="values-heading">
          <div className={styles.container}>
            <h2 id="values-heading" className={styles.sectionTitle}>Our Values</h2>
            <p className={styles.sectionSubtitle}>The principles that guide how we build our platform and serve our clients.</p>
            <div className={styles.valuesGrid}>
              {VALUES.map((v) => (
                <div key={v.title} className={styles.valueCard}>
                  <v.icon className={styles.valueIcon} size={48} strokeWidth={1.5} aria-hidden />
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className={styles.section} aria-labelledby="offer-heading">
          <div className={styles.container}>
            <h2 id="offer-heading" className={styles.sectionTitle}>What We Offer</h2>
            <p className={styles.sectionSubtitle}>Key products and services designed for traders and investors.</p>
            <ul className={styles.offerList}>
              {OFFERINGS.map((o) => (
                <li key={o.title} className={styles.offerItem}>
                  <o.icon className={styles.offerItemIcon} size={40} strokeWidth={1.5} aria-hidden />
                  <div>
                    <h4>{o.title}</h4>
                    <p>{o.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.section} aria-labelledby="why-heading">
          <div className={styles.container}>
            <h2 id="why-heading" className={styles.sectionTitle}>Why Choose Us</h2>
            <p className={styles.sectionSubtitle}>What sets us apart in the trading and investing space.</p>
            <ul className={styles.whyList}>
              {WHY_US.map((w) => (
                <li key={w.title} className={styles.whyItem}>
                  <w.icon className={styles.whyItemIcon} size={40} strokeWidth={1.5} aria-hidden />
                  <div>
                    <h4>{w.title}</h4>
                    <p>{w.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Our Journey */}
        <section className={styles.section} aria-labelledby="journey-heading">
          <div className={styles.container}>
            <h2 id="journey-heading" className={styles.sectionTitle}>Our Journey</h2>
            <p className={styles.sectionSubtitle}>From our founding to today—key milestones in our company story.</p>
            <div className={styles.journeyWrap}>
              <ul className={styles.timeline}>
                {MILESTONES.map((m) => (
                  <li key={m.year}>
                    <span className={styles.timelineYear}>{m.year}</span>
                    <h3 className={styles.timelineTitle}>{m.title}</h3>
                    <p className={styles.timelineDesc}>{m.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className={styles.section} aria-labelledby="team-heading">
          <div className={styles.container}>
            <h2 id="team-heading" className={styles.sectionTitle}>Leadership</h2>
            <p className={styles.sectionSubtitle}>The people behind our platform and vision.</p>
            <div className={styles.teamGrid}>
              {TEAM.map((t) => (
                <div key={t.name} className={styles.teamCard}>
                  <div className={styles.teamAvatar}>{t.initials}</div>
                  <h4>{t.name}</h4>
                  <p className={styles.teamRole}>{t.role}</p>
                  <p className={styles.teamBio}>{t.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust and Transparency */}
        <section className={styles.section} aria-labelledby="trust-heading">
          <div className={styles.container}>
            <h2 id="trust-heading" className={styles.sectionTitle}>Trust and Transparency</h2>
            <p className={styles.sectionSubtitle}>Our commitment to security, compliance, and responsible trading.</p>
            <div className={styles.trustGrid}>
              <div className={styles.trustCard}>
                <Lock className={styles.valueIcon} size={32} strokeWidth={1.5} aria-hidden />
                <h4>Security standards</h4>
                <p>We use industry-standard measures to protect your data and accounts. Client funds are treated with the highest level of care.</p>
              </div>
              <div className={styles.trustCard}>
                <Scale className={styles.valueIcon} size={32} strokeWidth={1.5} aria-hidden />
                <h4>Regulatory and compliance</h4>
                <p>We operate with a commitment to regulatory requirements and best practices in the jurisdictions we serve.</p>
              </div>
              <div className={styles.trustCard}>
                <Heart className={styles.valueIcon} size={32} strokeWidth={1.5} aria-hidden />
                <h4>Responsible trading</h4>
                <p>We promote responsible trading through education, risk management tools, and clear information so you can trade within your means.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection} aria-labelledby="cta-heading">
          <div className={styles.container}>
            <h2 id="cta-heading" className={styles.ctaTitle}>Take the next step</h2>
            <p className={styles.ctaSubtitle}>Start trading, explore our tools, or continue learning.</p>
            <div className={styles.ctaButtons}>
              <Link href="/tools/calculators" className={styles.ctaBtnSecondary}>Explore Our Tools</Link>
              <Link href="/learn/blog" className={styles.ctaBtnSecondary}>Learn More</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomBar />
    </div>
  )
}
