'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { ChevronDown, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Header.module.css'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
    { label: 'Trade & Invest', href: '/trade&invest/commodities', hasMegaMenu: true },
    { label: 'Tools', href: '/tools', hasMegaMenu: true },
    { label: 'Learn', href: '/learn', hasMegaMenu: true },
    { label: 'Company', href: '/company', hasMegaMenu: true },
    { label: 'Become a Partner', href: '/partners', hasMegaMenu: false },
]

const MEGA_MENU_DATA = {
    'Trade & Invest': [
        {
            title: '',
            links: [
                { label: 'Commodities', href: '/trade&invest/commodities' },
                { label: 'Indices', href: '/trade&invest/indices' },
                { label: 'Stocks (CFDs)', href: '/trade&invest/stocks' },
                { label: 'Cryptocurrencies', href: '/trade&invest/cryptocurrencies' },
                { label: 'Futures', href: '/trade&invest/futures' },
            ],
        },
    ],
    Tools: [
        {
            title: '',
            links: [
                { label: 'Calculators', href: '/tools/calculators' },
                { label: 'Copy Trade', href: '/tools/copy-trading' },
                { label: 'Risk Management tools', href: '/tools/risk-management' },
            ],
        },
    ],
    Learn: [
        {
            title: '',
            links: [
                { label: 'Blog', href: '/learn/blog' },
                { label: 'Glossary', href: '/learn/glossary' },
            ],
        },
    ],
    Company: [
        {
            title: '',
            links: [
                { label: 'About Us', href: '/company/about-us' },
                { label: 'Account Types', href: '/accounts' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms-of-service' },
                { label: 'Risk Disclosure', href: '/risk-disclosure' },
                { label: 'Support', href: '/support' },
            ],
        },
    ],
}

export default function Header({ hideLogo = false }: { hideLogo?: boolean }) {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState<string | null>(null)
    const pathname = usePathname()
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

    // ── Route change: close any open dropdown/menu ─────────────
    // Prevents the mega menu from staying open after navigation (e.g. when
    // clicking Trade & Invest → Stocks).
    useEffect(() => {
        setMenuOpen(false)
        setActiveDropdown(null)
        setMobileExpandedDropdown(null)
    }, [pathname])

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
        setMobileExpandedDropdown(null)
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
                    {/* ── Hamburger (mobile/tablet only) ───────────────── */}
                    <button
                        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        type="button"
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </button>

                    {/* ── Logo ──────────────────────────────────────────── */}
                    <Link 
                        href="/" 
                        className={styles.logo} 
                        aria-label="APFX Home" 
                        onClick={closeMenu}
                        style={{ opacity: hideLogo ? 0 : 1 }}
                    >
                        <Logo id="header-logo" size="sm" />
                    </Link>

                    {/* ── Desktop Navigation ────────────────────────────── */}
                    <nav aria-label="Main navigation" onMouseLeave={handleMouseLeave}>
                        <ul className={styles.nav} role="list">
                            {NAV_LINKS.map((link) => (
                                <li
                                    key={link.href}
                                    onMouseEnter={
                                        link.hasMegaMenu
                                            ? () => handleMouseEnter(link.label)
                                            : () => setActiveDropdown(null)
                                    }
                                >
                                    {link.hasMegaMenu ? (
                                        <button
                                            type="button"
                                            className={activeDropdown === link.label ? styles.navActive : undefined}
                                            onClick={() => setActiveDropdown((prev) => (prev === link.label ? null : link.label))}
                                            aria-expanded={activeDropdown === link.label}
                                            aria-haspopup="true"
                                        >
                                            {link.label}
                                            <ChevronDown
                                                className={styles.navChevron}
                                                aria-hidden
                                            />
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            prefetch={true}
                                        >
                                            {link.label}
                                        </Link>
                                    )}

                                    <AnimatePresence>
                                        {link.hasMegaMenu && activeDropdown === link.label && (
                                            <motion.div
                                                className={styles.megaMenu}
                                                onMouseEnter={() => handleMouseEnter(link.label)}
                                                initial={{ opacity: 0, y: -8, scaleY: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                                exit={{ opacity: 0, y: -4, scaleY: 0.98 }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                style={{ transformOrigin: 'top center' }}
                                            >
                                                {(() => {
                                                    const columns = MEGA_MENU_DATA[link.label as keyof typeof MEGA_MENU_DATA] ?? []
                                                    return (
                                                        <div className={styles.megaMenuInner}>
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
                <button
                    type="button"
                    className={styles.mobileClose}
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    <X size={20} aria-hidden="true" />
                </button>
                {NAV_LINKS.map((link) => {
                    const mobileColumns = MEGA_MENU_DATA[link.label as keyof typeof MEGA_MENU_DATA] ?? []
                    const mobileSubLinks = mobileColumns.flatMap((col) => col.links)
                    const isExpanded = mobileExpandedDropdown === link.label
                    const submenuId = `mobile-submenu-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

                    if (!link.hasMegaMenu || mobileSubLinks.length === 0) {
                        return (
                            <Link key={link.href} href={link.href} onClick={closeMenu}>
                                {link.label}
                            </Link>
                        )
                    }

                    return (
                        <div key={link.href} className={styles.mobileMenuGroup}>
                            <button
                                type="button"
                                className={styles.mobileMenuTrigger}
                                onClick={() =>
                                    setMobileExpandedDropdown((prev) =>
                                        prev === link.label ? null : link.label
                                    )
                                }
                                aria-expanded={isExpanded}
                                aria-controls={submenuId}
                            >
                                <span>{link.label}</span>
                                <ChevronDown
                                    size={18}
                                    className={`${styles.mobileChevron} ${isExpanded ? styles.mobileChevronOpen : ''}`}
                                    aria-hidden="true"
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {isExpanded && (
                                    <motion.div
                                        id={submenuId}
                                        className={styles.mobileSubmenu}
                                        initial={{ height: 0, opacity: 0, y: -8 }}
                                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                                        exit={{ height: 0, opacity: 0, y: -8 }}
                                        transition={{
                                            duration: 0.32,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        {mobileSubLinks.map((subLink) => (
                                            <Link key={subLink.href} href={subLink.href} onClick={closeMenu}>
                                                {subLink.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </nav>
        </>
    )
}
