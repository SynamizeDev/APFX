'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import CTABanner from '@/components/sections/CTABanner'
import { FODisclaimer, ToolCards, UnderlyingChips } from '@/components/sections/options'
import type { UnderlyingInfo } from '@/lib/options/types'
import styles from './page.module.css'

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Risk-defined strategies',
    description:
      'Options can help you define outcomes ahead of time. Pair discipline with our payoff and risk tools.',
  },
  {
    icon: Layers,
    title: 'Build & compare strategies',
    description:
      'Select an underlying, explore the chain, and build multi-leg strategies with calculators that show the result.',
  },
  {
    icon: BookOpen,
    title: 'Structured learning',
    description:
      'Educational sections help beginners understand terms like margin, leverage, and payoff before taking action.',
  },
  {
    icon: Zap,
    title: 'Tools that save time',
    description:
      'Chain → strategy builder → payoff calculator in a streamlined workflow for faster decisions.',
  },
  {
    icon: Activity,
    title: 'Market context upfront',
    description:
      'Underlyings chips provide quick spot context so you can decide what to analyze next.',
  },
] as const

const STEPS = [
  {
    n: '1',
    title: 'Choose an underlying',
    description:
      'Pick an index or stock derivative and open the options tools tied to it.',
  },
  {
    n: '2',
    title: 'Explore the chain & build',
    description:
      'View the options chain and create your strategy using the Strategy Builder.',
  },
  {
    n: '3',
    title: 'Validate payoff & risk',
    description:
      'Use the Payoff Calculator (and education) to confirm outcomes and plan for downside.',
  },
] as const

export default function OptionsHubPage() {
  const [underlyings, setUnderlyings] = useState<UnderlyingInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetch('/api/options/underlyings')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Failed to load'))))
      .then((data: UnderlyingInfo[]) => mounted && setUnderlyings(data))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <Zap size={14} className={styles.eyebrowIcon} />
              Futures & Options education hub
            </div>
            <h1 className={styles.title}>Futures & Options</h1>
            <p className={styles.subtitle}>
              Explore index and stock derivatives with tools to view chains, build strategies, and calculate payoff—so you can decide with clarity.
            </p>
            <div className={styles.actions}>
              <Link href="#underlyings" className={styles.primaryBtn}>
                Explore Underlyings <ArrowRight size={18} />
              </Link>
              <Link href="/products/options/strategy-builder" className={styles.secondaryBtn}>
                Build a Strategy
              </Link>
            </div>
            <p className={styles.trustNote}>
              <AlertTriangle size={16} className={styles.trustIcon} /> Education only. F&O trading is risky and may result in losses beyond your margin.
            </p>
          </div>
        </div>
      </section>

      {/* Story / steps */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Turn market data into strategy</h2>
          <p className={styles.sectionSubtitle}>
            This page is designed to match our investment flows: understand the instrument, use the right tool, and validate payoff and risk before acting.
          </p>
          <div className={styles.stepsGrid}>
            {STEPS.map((s) => (
              <div key={s.n} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.n}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Underlyings */}
      <section className={styles.sectionAlt} id="underlyings">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Underlyings</h2>
          <p className={styles.sectionSubtitle}>Select an index or stock derivative to start analyzing the chain.</p>
          {loading && <p className={styles.muted}>Loading…</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && !error && underlyings.length > 0 && <UnderlyingChips underlyings={underlyings} />}
        </div>
      </section>

      {/* Tools */}
      <section className={styles.section} id="tools">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Options tools</h2>
          <p className={styles.sectionSubtitle}>
            Chain, strategy builder, payoff calculator, and IV analysis—available as education-focused modules.
          </p>
          <div className={styles.toolsWrap}>
            <ToolCards />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Benefits of disciplined options trading</h2>
          <p className={styles.sectionSubtitle}>
            Designed for clarity: less guesswork, more structure, and a risk-first workflow.
          </p>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <div key={title} className={styles.benefitCard}>
                <Icon size={46} className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>{title}</h3>
                <p className={styles.benefitDesc}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Risk first</h2>
          <p className={styles.sectionSubtitle}>
            Options and futures can amplify outcomes. Make sure you understand the mechanics and risk profile before you trade.
          </p>
          <FODisclaimer />
          <ul className={styles.bulletList} aria-label="Risk checklist">
            <li>Use position sizing and define loss limits before entering trades.</li>
            <li>Validate payoff with the Payoff Calculator to avoid surprises.</li>
            <li>Be cautious with leverage and margin—drawdowns can expand quickly.</li>
            <li>Keep a journal and review performance using consistent criteria.</li>
          </ul>
        </div>
      </section>

      {/* CTA banner (shared across product pages) */}
      <CTABanner />
    </div>
  )
}

