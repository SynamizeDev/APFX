'use client'

import Link from 'next/link'
import { Image, Palette, User } from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './Press.module.css'

const FEATURED = [
  {
    outlet: 'Finance Today',
    headline: 'APFX Brings Institutional-Grade Tools to Retail Traders',
    date: '2025-02-15',
    summary: 'How trading platforms are closing the gap between retail and institutional execution with advanced calculators and risk management tools.',
    url: '#',
  },
  {
    outlet: 'Trading Weekly',
    headline: 'Risk Management Tools Every Trader Should Use',
    date: '2025-01-28',
    summary: 'A look at position sizing, drawdown recovery, and risk-of-ruin calculators that help traders protect capital.',
    url: '#',
  },
]

const ANNOUNCEMENTS = [
  { title: 'New Risk Management Tools Section Launched', description: 'We’ve added a dedicated suite of risk calculators: risk per trade, risk-reward ratio, drawdown recovery, and more.', date: '2025-03-01', url: '/tools/risk-management' },
  { title: 'Copy Trading Tools and Education Hub', description: 'New resources and calculators for copy trading, plus guides on how to get started.', date: '2025-02-15', url: '/tools/copy-trading' },
  { title: 'Expanded Educational Content', description: 'New blog series and glossary entries to support traders at every level.', date: '2025-02-01', url: '/academy/blog' },
]

const RELEASES = [
  { title: 'APFX Launches Comprehensive Risk Management Tools for Traders', date: '2025-03-01', summary: 'New calculators help traders size positions, assess risk-reward, and plan for drawdown recovery.', url: '#' },
  { title: 'APFX Expands Educational Resources with Trading Glossary and Guides', date: '2025-02-10', summary: 'Company adds searchable glossary and long-form guides to support trader education.', url: '#' },
]

const ASSETS = [
  { label: 'Company logo', description: 'PNG, SVG', icon: Image, url: '#' },
  { label: 'Brand guidelines', description: 'PDF', icon: Palette, url: '#' },
  { label: 'Product screenshots', description: 'ZIP', icon: Image, url: '#' },
  { label: 'Leadership photos', description: 'High-res', icon: User, url: '#' },
]

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

export default function PressPage() {
  return (
    <div className={styles.page}>
      <InnerPageHero
        title="Press & Media"
        subtitle="Official announcements, media coverage, and press resources. Find press releases, company facts, and materials for journalists and partners."
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Press' }]}
      />

      <main className={styles.main}>
        {/* Hero CTAs */}
        <section className={styles.section} aria-label="Press actions">
          <div className={styles.container}>
            <div className={styles.heroCtas}>
              <a href="#press-kit" className={styles.heroCtaPrimary}>Download Press Kit</a>
              <a href="#media-contact" className={styles.heroCtaSecondary}>Contact Media Team</a>
            </div>
          </div>
        </section>

        {/* Featured press */}
        <section className={styles.section} aria-labelledby="featured-heading">
          <div className={styles.container}>
            <h2 id="featured-heading" className={styles.sectionTitle}>Featured Press Coverage</h2>
            <p className={styles.sectionSubtitle}>Recent media mentions and articles about our platform and industry.</p>
            <div className={styles.featuredGrid}>
              {FEATURED.map((item) => (
                <article key={item.headline} className={styles.featuredCard}>
                  <p className={styles.outlet}>{item.outlet}</p>
                  <h3>{item.headline}</h3>
                  <p className={styles.featuredDate}>{formatDate(item.date)}</p>
                  <p className={styles.featuredSummary}>{item.summary}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.readArticle}>Read Article</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Latest news & announcements */}
        <section className={styles.section} aria-labelledby="announcements-heading">
          <div className={styles.container}>
            <h2 id="announcements-heading" className={styles.sectionTitle}>Latest News & Announcements</h2>
            <p className={styles.sectionSubtitle}>Platform updates, product launches, and company milestones.</p>
            <div className={styles.announcementsGrid}>
              {ANNOUNCEMENTS.map((a) => (
                <div key={a.title} className={styles.announcementCard}>
                  <h4>{a.title}</h4>
                  <p className={styles.announcementDate}>{formatDate(a.date)}</p>
                  <p>{a.description}</p>
                  <Link href={a.url} className={styles.readMore}>Read More</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press releases */}
        <section className={styles.section} aria-labelledby="releases-heading">
          <div className={styles.container}>
            <h2 id="releases-heading" className={styles.sectionTitle}>Press Releases</h2>
            <p className={styles.sectionSubtitle}>Official press releases in chronological order.</p>
            <ul className={styles.releasesList}>
              {RELEASES.map((r) => (
                <li key={r.title} className={styles.releaseItem}>
                  <h3 className={styles.releaseTitle}>{r.title}</h3>
                  <p className={styles.releaseMeta}>{formatDate(r.date)}</p>
                  <p className={styles.releaseSummary}>{r.summary}</p>
                  <a href={r.url} className={styles.releaseLink}>Download PDF</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Media assets / Press kit */}
        <section className={styles.section} id="press-kit" aria-labelledby="assets-heading">
          <div className={styles.container}>
            <h2 id="assets-heading" className={styles.sectionTitle}>Media Assets / Press Kit</h2>
            <p className={styles.sectionSubtitle}>Download logos, brand guidelines, and images for media use.</p>
            <div className={styles.assetsGrid}>
              {ASSETS.map((a) => (
                <div key={a.label} className={styles.assetCard}>
                  <a.icon className={styles.assetIcon} size={48} strokeWidth={1.5} aria-hidden />
                  <h4>{a.label}</h4>
                  <p>{a.description}</p>
                  <a href={a.url} className={styles.downloadBtn} download>Download</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company facts */}
        <section className={styles.section} aria-labelledby="facts-heading">
          <div className={styles.container}>
            <h2 id="facts-heading" className={styles.sectionTitle}>Company Facts</h2>
            <p className={styles.sectionSubtitle}>Quick reference for journalists and partners.</p>
            <div className={styles.factsGrid}>
              <div className={styles.factCard}>
                <p className={styles.factLabel}>Year founded</p>
                <p className={styles.factValue}>2012</p>
              </div>
              <div className={styles.factCard}>
                <p className={styles.factLabel}>Headquarters</p>
                <p className={styles.factValue}>London, United Kingdom</p>
              </div>
              <div className={styles.factCard}>
                <p className={styles.factLabel}>Industry focus</p>
                <p className={styles.factValue}>Forex, CFD trading, investment tools, financial education</p>
              </div>
              <div className={styles.factCard}>
                <p className={styles.factLabel}>Key products & services</p>
                <p className={styles.factValue}>Trading calculators, risk management tools, market insights, educational content, copy trading resources</p>
              </div>
            </div>
          </div>
        </section>

        {/* Media contact */}
        <section className={styles.section} id="media-contact" aria-labelledby="contact-heading">
          <div className={styles.container}>
            <h2 id="contact-heading" className={styles.sectionTitle}>Media Contact</h2>
            <p className={styles.sectionSubtitle}>For press inquiries, interviews, and partnership opportunities.</p>
            <div className={styles.contactBlock}>
              <h4>Media relations</h4>
              <p className={styles.contactEmail}>
                <a href="mailto:press@apfx.com">press@apfx.com</a>
              </p>
              <p>For urgent requests, please include “Press” in the subject line. We aim to respond to media inquiries within one business day.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection} aria-labelledby="cta-heading">
          <div className={styles.container}>
            <h2 id="cta-heading" className={styles.ctaTitle}>Work with us</h2>
            <p className={styles.ctaSubtitle}>Interested in interviews, collaborations, or more information? Get in touch.</p>
            <div className={styles.ctaButtons}>
              <a href="mailto:press@apfx.com" className={styles.ctaBtnPrimary}>Contact Media Team</a>
              <Link href="/about/about-us" className={styles.ctaBtnSecondary}>About Us</Link>
              <Link href="/contact" className={styles.ctaBtnSecondary}>General Contact</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomBar />
    </div>
  )
}
