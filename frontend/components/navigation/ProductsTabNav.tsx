'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './ProductsTabNav.module.css'

const TABS = [
    { label: 'Range of Products', href: '/products/range' },
    { label: 'Forex CFDs', href: '/products/forex' },
    { label: 'Commodities CFDs', href: '/products/commodities' },
    { label: 'Indices CFDs', href: '/products/indices' },
    { label: 'Bonds CFDs', href: '/products/bonds' },
    { label: 'Cryptocurrency CFDs', href: '/products/cryptocurrencies' },
    { label: 'Stocks CFDs', href: '/products/stocks' },
    { label: 'Futures CFDs', href: '/products/futures' },
]

export default function ProductsTabNav() {
    const pathname = usePathname()

    return (
        <nav className={styles.tabNav} aria-label="Products Tabs">
            <div className={styles.tabList} role="tablist">
                {TABS.map((tab) => {
                    const isActive = pathname === tab.href
                    return (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            role="tab"
                            aria-selected={isActive}
                            className={`${styles.tabItem} ${isActive ? styles.tabActive : ''}`}
                        >
                            {tab.label}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
