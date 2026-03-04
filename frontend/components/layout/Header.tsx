'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Header.module.css'

const NAV_LINKS = [
    { label: 'Products', href: '/products', hasMegaMenu: true },
    { label: 'Academy', href: '/academy', hasMegaMenu: true },
    { label: 'Trading Platforms', href: '/platforms', hasMegaMenu: true },
    { label: 'Cryptocurrencies', href: '/crypto', hasMegaMenu: true },
    { label: 'Trading Info', href: '/trading-info', hasMegaMenu: true },
    { label: 'Education', href: '/education', hasMegaMenu: true },
    { label: 'Partners', href: '/partners', hasMegaMenu: true },
    { label: 'About', href: '/about', hasMegaMenu: true },
]

const MEGA_MENU_DATA = {
    Products: [
        {
            title: 'Forex Trading',
            links: [
                { label: 'What is Forex', href: '/products/forex' },
                { label: 'How to Trade Forex', href: '/products/forex/how-to-trade' },
                { label: 'Vanilla Options', href: '/products/vanilla-options' },
            ],
        },
        {
            title: 'CFD Trading',
            links: [
                { label: 'What are CFDs', href: '/products/cfds/what-are-cfds' },
                { label: 'How to Trade CFDs', href: '/products/cfds/how-to-trade' },
                { label: 'Bonds & Treasuries', href: '/products/bonds-treasuries' },
                { label: 'ETFs Trading', href: '/products/etfs' },
            ],
        },
        {
            title: 'Stock Trading',
            links: [
                { label: 'What are Stocks?', href: '/products/stocks/what-are-stocks' },
                { label: 'How to Trade Stocks?', href: '/products/stocks/how-to-trade' },
            ],
        },
        {
            title: 'Commodities Trading',
            links: [
                { label: 'How To Trade Commodities', href: '/products/commodities/how-to-trade' },
                { label: 'Gold Trading', href: '/products/commodities/gold' },
                { label: 'How to Trade Gold', href: '/products/commodities/how-to-trade-gold' },
                { label: 'Oil Trading', href: '/products/commodities/oil' },
                { label: 'How to Trade Oil', href: '/products/commodities/how-to-trade-oil' },
                { label: 'Energies', href: '/products/commodities/energies' },
                { label: 'Precious Metals', href: '/products/commodities/precious-metals' },
                { label: 'Agriculture', href: '/products/commodities/agriculture' },
            ],
        },
        {
            title: 'Indices Trading',
            links: [
                { label: 'What Are Indices?', href: '/products/indices/what-are-indices' },
                { label: 'How to Trade Indices', href: '/products/indices/how-to-trade' },
                { label: 'VIX index', href: '/products/indices/vix' },
            ],
        },
        {
            title: 'Futures',
            links: [
                { label: 'Futures Trading', href: '/products/futures' },
            ],
        },
    ],
    Academy: [
        {
            title: 'Our Popular Courses',
            links: [
                { label: 'Start Trading Now... Quick & Dirty', href: '/academy/start-trading' },
                { label: 'Platforms Tutorials', href: '/academy/platforms-tutorials' },
                { label: 'Forex, Cryptos & Commodities', href: '/academy/forex-cryptos-commodities' },
                { label: 'Introduction to Technical Analysis', href: '/academy/technical-analysis' },
            ],
        },
        {
            title: 'Courses Topics',
            links: [
                { label: 'Courses for Beginners', href: '/academy/beginners' },
                { label: 'Forex Trading Courses', href: '/academy/forex-courses' },
                { label: 'Stock Market Trading Courses', href: '/academy/stock-courses' },
                { label: 'All Courses', href: '/academy/all-courses' },
            ],
        },
    ],
    'Trading Platforms': [
        {
            title: 'WebTrader',
            links: [
                { label: 'APFXOptions', href: '/platforms/apfx-options' },
                { label: 'APFX App', href: '/platforms/apfx-app' },
                { label: 'Mac Trading', href: '/platforms/mac-trading' },
            ],
        },
        {
            title: 'MetaTrader 4',
            links: [
                { label: 'What is MetaTrader', href: '/platforms/mt4/what-is-metatrader' },
                { label: 'Guardian Angel', href: '/platforms/mt4/guardian-angel' },
                { label: 'Expert Advisors', href: '/platforms/mt4/expert-advisors' },
                { label: 'VPS', href: '/platforms/mt4/vps' },
            ],
        },
        {
            title: 'MetaTrader 5',
            links: [
                { label: 'How to Trade with MetaTrader 5', href: '/platforms/mt5/how-to-trade' },
                { label: 'Algorithmic Trading on MT5', href: '/platforms/mt5/algorithmic-trading' },
            ],
        },
        {
            title: 'Automated Trading',
            links: [
                { label: 'APFXSocial', href: '/platforms/apfx-social' },
                { label: 'DupliTrade', href: '/platforms/duplitrade' },
            ],
        },
    ],
    Cryptocurrencies: [
        {
            title: '',
            links: [
                { label: 'What Are Cryptocurrencies', href: '/crypto/what-are-cryptocurrencies' },
                { label: 'How to Trade Cryptocurrencies', href: '/crypto/how-to-trade' },
                { label: 'Crypto ETFs', href: '/crypto/etfs' },
            ],
        },
        {
            title: 'Bitcoin Trading',
            links: [
                { label: 'What is Bitcoin', href: '/crypto/bitcoin/what-is-bitcoin' },
                { label: 'How to Trade Bitcoin', href: '/crypto/bitcoin/how-to-trade' },
                { label: 'Bitcoin ETFs', href: '/crypto/bitcoin/etfs' },
            ],
        },
        {
            title: '',
            links: [
                { label: 'Bitcoin Gold', href: '/crypto/bitcoin-gold' },
                { label: 'Bitcoin Cash', href: '/crypto/bitcoin-cash' },
                { label: 'Ethereum', href: '/crypto/ethereum' },
                { label: 'EOS', href: '/crypto/eos' },
                { label: 'NEO', href: '/crypto/neo' },
            ],
        },
        {
            title: '',
            links: [
                { label: 'Dash', href: '/crypto/dash' },
                { label: 'Chainlink', href: '/crypto/chainlink' },
                { label: 'Uniswap', href: '/crypto/uniswap' },
                { label: 'Litecoin', href: '/crypto/litecoin' },
                { label: 'Stellar', href: '/crypto/stellar' },
                { label: 'Miota', href: '/crypto/miota' },
            ],
        },
        {
            title: '',
            links: [
                { label: 'Crypto10 Index', href: '/crypto/crypto10-index' },
                { label: 'Shiba Inu', href: '/crypto/shiba-inu' },
                { label: 'Ripple', href: '/crypto/ripple' },
                { label: 'Dogecoin', href: '/crypto/dogecoin' },
                { label: 'Solana', href: '/crypto/solana' },
                { label: 'Polygon', href: '/crypto/polygon' },
            ],
        },
    ],
    'Trading Info': [
        {
            title: 'Indices',
            links: [
                { label: 'SMI', href: '/trading-info/indices/smi' },
                { label: 'US_500', href: '/trading-info/indices/us-500' },
                { label: 'CANNABIS INDEX', href: '/trading-info/indices/cannabis' },
                { label: 'US_TECH100', href: '/trading-info/indices/us-tech100' },
                { label: 'US_30', href: '/trading-info/indices/us-30' },
                { label: 'US_2000', href: '/trading-info/indices/us-2000' },
                { label: 'DOLLAR INDEX', href: '/trading-info/indices/dollar-index' },
                { label: 'SPAIN 35', href: '/trading-info/indices/spain-35' },
                { label: 'View all', href: '/trading-info/indices' },
            ],
        },
        {
            title: 'Commodities',
            links: [
                { label: 'Crude Oil', href: '/trading-info/commodities/crude-oil' },
                { label: 'Copper', href: '/trading-info/commodities/copper' },
                { label: 'Brent Oil', href: '/trading-info/commodities/brent-oil' },
                { label: 'Heating Oil', href: '/trading-info/commodities/heating-oil' },
                { label: 'Gasoline', href: '/trading-info/commodities/gasoline' },
                { label: 'Natural Gas', href: '/trading-info/commodities/natural-gas' },
                { label: 'Gold Trading', href: '/trading-info/commodities/gold' },
                { label: 'Silver', href: '/trading-info/commodities/silver' },
                { label: 'Wheat', href: '/trading-info/commodities/wheat' },
                { label: 'Corn', href: '/trading-info/commodities/corn' },
                { label: 'View all', href: '/trading-info/commodities' },
            ],
        },
        {
            title: 'Stocks',
            links: [
                { label: 'Apple', href: '/trading-info/stocks/apple' },
                { label: 'Amazon', href: '/trading-info/stocks/amazon' },
                { label: 'Microsoft', href: '/trading-info/stocks/microsoft' },
                { label: 'Netflix', href: '/trading-info/stocks/netflix' },
                { label: 'Pfizer', href: '/trading-info/stocks/pfizer' },
                { label: 'Adobe', href: '/trading-info/stocks/adobe' },
                { label: 'Alibaba', href: '/trading-info/stocks/alibaba' },
                { label: 'Intel', href: '/trading-info/stocks/intel' },
                { label: 'Teva', href: '/trading-info/stocks/teva' },
                { label: 'American Express', href: '/trading-info/stocks/american-express' },
                { label: 'View all', href: '/trading-info/stocks' },
            ],
        },
        {
            title: 'Forex Pairs',
            links: [
                { label: 'EUR/USD', href: '/trading-info/forex/eur-usd' },
                { label: 'GBP/USD', href: '/trading-info/forex/gbp-usd' },
                { label: 'USD/JPY', href: '/trading-info/forex/usd-jpy' },
                { label: 'AUD/USD', href: '/trading-info/forex/aud-usd' },
                { label: 'EUR/GBP', href: '/trading-info/forex/eur-gbp' },
                { label: 'USD/CAD', href: '/trading-info/forex/usd-cad' },
                { label: 'USD/CHF', href: '/trading-info/forex/usd-chf' },
                { label: 'GBP/JPY', href: '/trading-info/forex/gbp-jpy' },
                { label: 'EUR/CAD', href: '/trading-info/forex/eur-cad' },
                { label: 'EUR/AUD', href: '/trading-info/forex/eur-aud' },
                { label: 'AUD/CHF', href: '/trading-info/forex/aud-chf' },
                { label: 'View All', href: '/trading-info/forex' },
            ],
        },
        {
            title: 'Options',
            links: [
                { label: 'AUD/CAD Options', href: '/trading-info/options/aud-cad' },
                { label: 'AUD/CHF Options', href: '/trading-info/options/aud-chf' },
                { label: 'AUD/JPY Options', href: '/trading-info/options/aud-jpy' },
                { label: 'AUD/NZD Options', href: '/trading-info/options/aud-nzd' },
                { label: 'AUD/USD Options', href: '/trading-info/options/aud-usd' },
                { label: 'CAD/CHF Options', href: '/trading-info/options/cad-chf' },
                { label: 'CAD/JPY Options', href: '/trading-info/options/cad-jpy' },
                { label: 'CHF/JPY Options', href: '/trading-info/options/chf-jpy' },
                { label: 'View All', href: '/trading-info/options' },
            ],
        },
        {
            title: '',
            links: [
                { label: 'Holiday Hours', href: '/trading-info/holiday-hours' },
                { label: 'Trading Central', href: '/trading-info/trading-central' },
                { label: 'Trading Signals', href: '/trading-info/trading-signals' },
                { label: 'CFD Rollover', href: '/trading-info/cfd-rollover' },
                { label: 'Economic Calendar', href: '/trading-info/economic-calendar' },
                { label: 'Islamic Account', href: '/trading-info/islamic-account' },
                { label: 'Trading Calculator', href: '/trading-info/trading-calculator' },
                { label: 'Earnings Releases', href: '/trading-info/earnings-releases' },
                { label: 'Fees & Charges', href: '/trading-info/fees-charges' },
                { label: 'Broker Type', href: '/trading-info/broker-type' },
                { label: 'Fundamental Analysis', href: '/trading-info/fundamental-analysis' },
                { label: 'Technical Analysis', href: '/trading-info/technical-analysis' },
            ],
        },
    ],
    Education: [
        {
            title: 'Trading for Beginners',
            links: [
                { label: 'How to Trade Online', href: '/education/how-to-trade-online' },
                { label: 'Currency Trading', href: '/education/currency-trading' },
                { label: 'Copy Trading', href: '/education/copy-trading' },
                { label: 'Short Selling', href: '/education/short-selling' },
                { label: 'Financial Derivatives', href: '/education/financial-derivatives' },
            ],
        },
        {
            title: '',
            links: [
                { label: 'Trading Platforms Tutorials', href: '/education/platforms-tutorials' },
                { label: 'Technical Analysis Indicators & Strategies', href: '/education/technical-analysis' },
                { label: 'Order Types', href: '/education/order-types' },
                { label: 'Online Trading Strategies', href: '/education/trading-strategies' },
                { label: 'Market Terms', href: '/education/market-terms' },
            ],
        },
        {
            title: '',
            links: [
                { label: 'Economic Indicators', href: '/education/economic-indicators' },
                { label: 'Trading Rules', href: '/education/trading-rules' },
                { label: 'Blog', href: '/education/blog' },
                { label: 'eBook', href: '/education/ebook' },
            ],
        },
    ],
    Partners: [
        {
            title: '',
            links: [
                { label: 'Partner Types', href: '/partners/types' },
                { label: 'APFX Partner Blog', href: '/partners/blog' },
                { label: 'Become a Partner', href: '/partners/become-a-partner' },
            ],
        },
    ],
    About: [
        {
            title: '',
            links: [
                { label: 'Why APFX?', href: '/about/why-apfx' },
                { label: 'Regulation', href: '/about/regulation' },
                { label: 'Management', href: '/about/management' },
                { label: 'Accessibility', href: '/about/accessibility' },
            ],
        },
        {
            title: '',
            links: [
                { label: 'Contact Us', href: '/about/contact' },
                { label: 'APFX Reviews', href: '/about/reviews' },
                { label: 'Withdrawals and Deposits', href: '/about/withdrawals-deposits' },
                { label: 'Refer a Friend', href: '/about/refer-a-friend' },
            ],
        },
        {
            title: '',
            links: [
                { label: 'Legal Documents', href: '/about/legal-documents' },
                { label: 'Awards', href: '/about/awards' },
                { label: 'New Accounts Pack', href: '/about/new-accounts-pack' },
                { label: 'APFX VIP', href: '/about/vip' },
                { label: 'Interest Rates', href: '/about/interest-rates' },
                { label: 'Trading Websites', href: '/about/trading-websites' },
            ],
        },
        {
            title: '',
            links: [
                { label: 'Career', href: '/about/career' },
            ],
        },
    ],
}

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const headerRef = useRef<HTMLElement>(null)
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // ── Scroll-aware class ─────────────────────────────────────
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // ── Lock body scroll when mobile menu open ─────────────────
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    // ── Close menu on Escape ───────────────────────────────────
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMenuOpen(false)
                setActiveDropdown(null)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    // ── Click outside to close dropdown ─────────────────────────
    useEffect(() => {
        if (!activeDropdown) return
        const handleClickOutside = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setActiveDropdown(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [activeDropdown])

    const closeMenu = () => {
        setMenuOpen(false)
        setActiveDropdown(null)
    }

    const handleMouseEnter = (label: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current)
            dropdownTimeoutRef.current = null
        }
        setActiveDropdown(label)
    }

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null)
        }, 200)
    }

    return (
        <>
            <header
                ref={headerRef}
                className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${activeDropdown ? styles.menuActive : ''}`}
                role="banner"
            >
                <div className={styles.inner}>

                    {/* ── Logo ──────────────────────────────────────────── */}
                    <Link href="/" className={styles.logo} aria-label="APFX Home" onClick={closeMenu}>
                        <span className={styles.logoMark} aria-hidden="true">
                            <Sparkles className={styles.logoIcon} />
                        </span>
                        <span className={styles.logoWordmark}>
                            <span className={styles.logoPrefix}>AP</span>
                            <span className={styles.logoFx}>FX</span>
                        </span>
                    </Link>

                    {/* ── Desktop Navigation ────────────────────────────── */}
                    <nav aria-label="Main navigation" onMouseLeave={handleMouseLeave}>
                        <ul className={styles.nav} role="list">
                            {NAV_LINKS.map((link) => (
                                <li
                                    key={link.href}
                                    onMouseEnter={link.hasMegaMenu ? () => handleMouseEnter(link.label) : undefined}
                                >
                                    <Link
                                        href={link.href}
                                        className={activeDropdown === link.label ? styles.navActive : undefined}
                                    >
                                        {link.label}
                                    </Link>

                                    <AnimatePresence>
                                        {link.hasMegaMenu && activeDropdown === link.label && (
                                            <motion.div
                                                className={styles.megaMenu}
                                                onMouseEnter={() => handleMouseEnter(link.label)}
                                                initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                                exit={{ opacity: 0, y: -12, scaleY: 0.97 }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                style={{ transformOrigin: 'top center' }}
                                            >
                                                {(() => {
                                                    const columns = MEGA_MENU_DATA[link.label as keyof typeof MEGA_MENU_DATA] ?? []
                                                    return (
                                                        <div
                                                            className={styles.megaMenuInner}
                                                            style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                                                        >
                                                            {columns.map((col, i) => (
                                                                <div key={col.title || `col-${i}`} className={styles.megaMenuColumn}>
                                                                    {col.title && <h3 className={styles.megaMenuTitle}>{col.title}</h3>}
                                                                    <ul className={styles.megaMenuLinks}>
                                                                        {col.links.map((subLink) => (
                                                                            <li key={subLink.href}>
                                                                                <Link
                                                                                    href={subLink.href}
                                                                                    onClick={closeMenu}
                                                                                    className={subLink.label.toLowerCase().startsWith('view') ? styles.megaMenuViewAll : undefined}
                                                                                >
                                                                                    {subLink.label}
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )
                                                })()}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* ── Actions ───────────────────────────────────────── */}
                    <div className={styles.actions}>
                        <Link href="https://portal.apfx.com/login" className={styles.btnLogin}>
                            Log In
                        </Link>
                        <Link href="https://portal.apfx.com/register" className={styles.btnCta}>
                            Open Account
                        </Link>

                        {/* Hamburger */}
                        <button
                            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile Overlay Menu ──────────────────────────────── */}
            <nav
                id="mobile-menu"
                className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
                aria-label="Mobile navigation"
                aria-hidden={!menuOpen}
            >
                {NAV_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} onClick={closeMenu}>
                        {link.label}
                    </Link>
                ))}
                <Link href="https://portal.apfx.com/register" className={styles.mobileCta} onClick={closeMenu}>
                    Open Account
                </Link>
            </nav>
        </>
    )
}
