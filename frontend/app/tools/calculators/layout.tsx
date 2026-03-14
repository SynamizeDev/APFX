'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
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
            <Header />
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
                <div className={styles.content}>{children}</div>
            </main>
            <Footer />
            <BottomBar />
        </div>
    )
}
