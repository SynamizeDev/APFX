'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './AcademyTabNav.module.css'

const TABS = [
    { label: 'Open Account', href: '/learn/academy/open-account' },
    { label: 'Deposit', href: '/learn/academy/deposit' },
    { label: 'Withdraw', href: '/learn/academy/withdraw' },
    { label: 'Refer IB', href: '/learn/academy/refer-ib' },
    { label: 'Get Bonus', href: '/learn/academy/get-bonus' },
    { label: 'Copy Trading', href: '/learn/academy/copy-trading' },
]

export default function AcademyTabNav() {
    const pathname = usePathname()

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.scrollArea}>
                    {TABS.map((tab) => {
                        const isActive = pathname === tab.href
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`${styles.tab} ${isActive ? styles.active : ''}`}
                            >
                                {tab.label}
                                {isActive && <span className={styles.indicator} />}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
