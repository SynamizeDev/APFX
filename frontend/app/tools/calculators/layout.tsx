'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import { CALCULATORS } from './calculators'
import styles from './CalculatorsLayout.module.css'

export default function CalculatorsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className={styles.wrapper}>
            <main className={styles.main}>
                <aside className={styles.sidebar} aria-label="Calculators">
                    <nav className={styles.sidebarNav}>
                        <span className={styles.sidebarTitle}>Forex Calculators</span>
                        {CALCULATORS.map((calc) => {
                            const isActive = pathname === calc.href
                            return (
                                <Link
                                    key={calc.slug}
                                    href={calc.href}
                                    className={`${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {calc.label}
                                </Link>
                            )
                        })}
                    </nav>
                </aside>
                <div className={styles.content}>
                    <header className={styles.intro}>
                        <div className={styles.introContent}>
                            <h1 className={styles.introTitle}>Precision Trading Calculators</h1>
                            <p className={styles.introDesc}>
                                Professional-grade tools designed for institutional risk management, 
                                precise position sizing, and data-driven trading decisions.
                            </p>
                        </div>
                        
                        <div className={styles.whyUseCalculators}>
                            <h2 className={styles.whyTitle}>Why Use Trading Calculators?</h2>
                            <div className={styles.whyGrid}>
                                <div className={styles.whyItem}>
                                    <span className={styles.whyIcon}>🎯</span>
                                    <div>
                                        <strong>Institutional Precision</strong>
                                        <p>In retail trading, a few pips seem small. In institutional trading, they represent millions in exposure. Precision is not optional.</p>
                                    </div>
                                </div>
                                <div className={styles.whyItem}>
                                    <span className={styles.whyIcon}>🛡️</span>
                                    <div>
                                        <strong>Risk Control</strong>
                                        <p>Calculators strip away emotion, providing cold, hard data to ensure you never over-leverage or exceed your risk parameters.</p>
                                    </div>
                                </div>
                                <div className={styles.whyItem}>
                                    <span className={styles.whyIcon}>⚖️</span>
                                    <div>
                                        <strong>Professional Discipline</strong>
                                        <p>Every successful trader calculates their exit and risk before they ever execute an entry. This is the cornerstone of discipline.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {children}
                </div>
            </main>
            <Footer />
            <BottomBar />
        </div>
    )
}
