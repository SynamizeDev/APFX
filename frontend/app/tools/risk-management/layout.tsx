'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
        <h1 className={styles.heroTitle}>Risk Management Tools</h1>
        <p className={styles.heroDesc}>
          Control risk, calculate position sizes, and make better trading decisions with these calculators and guides.
        </p>
      </header>
      <main className={styles.main}>
        <aside className={styles.sidebar} aria-label="Risk Management Tools">
          <nav className={styles.sidebarNav}>
            <span className={styles.sidebarTitle}>Tools</span>
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
          {children}
          <section className={styles.rulesSection} aria-labelledby="golden-rules-title">
            <h2 id="golden-rules-title" className={styles.rulesTitle}>Golden Risk Management Rules</h2>
            <ul className={styles.rulesList}>
              <li>Risk only 1–2% of your account per trade.</li>
              <li>Always use a stop loss to limit losses.</li>
              <li>Maintain a minimum risk-reward ratio of 1:2.</li>
              <li>Avoid excessive leverage.</li>
            </ul>
          </section>
          <section className={styles.ctaSection} aria-labelledby="cta-title">
            <h2 id="cta-title" className={styles.ctaTitle}>Start trading with discipline</h2>
            <p className={styles.ctaSubtitle}>Open an account and use these tools to manage risk on every trade.</p>
            <div className={styles.ctaButtons}>
              <Link href="/register" className={styles.ctaBtnPrimary}>Open Trading Account</Link>
              <Link href="/register" className={styles.ctaBtnSecondary}>Start Trading</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BottomBar />
    </div>
  )
}
