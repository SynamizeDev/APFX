'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import { CALCULATORS } from './calculators'
import WhyUseCalculatorsSection from './WhyUseCalculatorsSection'
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
                        
                        <WhyUseCalculatorsSection />
                    </header>
                    {children}
                </div>
            </main>
            <Footer />
            <BottomBar />
        </div>
    )
}
