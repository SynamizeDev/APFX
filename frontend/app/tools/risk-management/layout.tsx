'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, ShieldCheck, Zap, TrendingUp, Globe } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import { RISK_TOOLS } from './tools'
import styles from './RiskManagementLayout.module.css'

export default function RiskManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className={styles.wrapper}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Professional Risk Management</h1>
        <p className={styles.heroDesc}>
          Precision risk control is the cornerstone of institutional trading. 
          Use these tools to align your strategy with mathematical survival.
        </p>
      </header>
      
      <main className={styles.main}>
        <aside className={styles.sidebar} aria-label="Risk Management Tools">
          <nav className={styles.sidebarNav}>
            <span className={styles.sidebarTitle}>Systems</span>
            {RISK_TOOLS.map((tool) => {
              const isActive = pathname === tool.href
              return (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  className={`${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tool.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className={styles.content}>
          <section className={styles.frameworkSection}>
            <h2 className={styles.frameworkTitle}>
              <ShieldCheck size={24} color="var(--color-accent)" />
              Institutional Risk Framework
            </h2>
            <div className={styles.frameworkGrid}>
              <div className={styles.frameworkCard}>
                <div className={styles.frameworkCardHeader}>
                  <div className={styles.frameworkIcon}><Shield size={20} /></div>
                  <h3 className={styles.frameworkCardTitle}>Capital Preservation</h3>
                </div>
                <p className={styles.frameworkCardDesc}>
                  Survival is the only goal. Professionals prioritize 
                  minimizing drawdown over maximizing gains, ensuring they stay in 
                  the game during inevitable losing streaks.
                </p>
              </div>
              <div className={styles.frameworkCard}>
                <div className={styles.frameworkCardHeader}>
                  <div className={styles.frameworkIcon}><TrendingUp size={20} /></div>
                  <h3 className={styles.frameworkCardTitle}>Probabilistic Thinking</h3>
                </div>
                <p className={styles.frameworkCardDesc}>
                  Individual trades are random; series are statistical. These stools 
                  help align your execution with your long-term mathematical edge.
                </p>
              </div>
              <div className={styles.frameworkCard}>
                <div className={styles.frameworkCardHeader}>
                  <div className={styles.frameworkIcon}><Zap size={20} /></div>
                  <h3 className={styles.frameworkCardTitle}>Asymmetric Returns</h3>
                </div>
                <p className={styles.frameworkCardDesc}>
                  Seek setups where risk is capped and potential reward is larger. 
                  This allows profitability even with a win rate below 50%.
                </p>
              </div>
            </div>
          </section>

          {children}

          <section className={styles.rulesSection}>
            <h2 className={styles.rulesTitle}>Institutional Gold Rules</h2>
            <ul className={styles.rulesList}>
              <li><strong>The 2% Hard Cap:</strong> Never risk more than 2% of total equity on any single idea.</li>
              <li><strong>Stop Loss Integrality:</strong> A trade without a stop loss is a gamble, not a business decision.</li>
              <li><strong>Positive Expectancy:</strong> Only enter trades with a minimum 1:2 Risk/Reward profile.</li>
              <li><strong>Drawdown Awareness:</strong> Reduce position sizes by 50% if account drawdown exceeds 10%.</li>
            </ul>
          </section>

          <section className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Trade with Professional Discipline</h2>
            <p className={styles.ctaSubtitle}>
              Precision is the difference between a gambler and a trader. 
              Connect your strategy to institutional-grade risk management.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/register" className={styles.ctaBtnPrimary}>Open Professional Account</Link>
              <Link href="/register" className={styles.ctaBtnSecondary}>View Liquidity Pools</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BottomBar />
    </div>
  )
}
