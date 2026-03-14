'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Sparkles, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Header.module.css'

const NAV_LINKS = [
    { label: 'Trade & Invest', href: '/products', hasMegaMenu: true },
    { label: 'Tools', href: '/tools', hasMegaMenu: true },
    { label: 'Learn', href: '/academy', hasMegaMenu: true },
    { label: 'Company', href: '/about', hasMegaMenu: true },
    { label: 'Become a Partner', href: '/partners', hasMegaMenu: false },
]

const MEGA_MENU_DATA = {
    'Trade & Invest': [
        {
            title: '',
            links: [
                { label: 'Stocks', href: '/products/stocks' },
                { label: 'F&O', href: '/products/options' },
                { label: 'Mutual Funds', href: '/products/mutual-funds' },
                { label: 'IPO', href: '/products/ipo' },
                { label: 'MTF', href: '/products/mtf' },
                { label: 'Recommendation', href: '/products/recommendation' },
            ],
        },
    ],
    Tools: [
        {
            title: '',
            links: [
                { label: 'Calculators', href: '/tools/calculators' },
                { label: 'Stock Compare', href: '/tools/stock-compare' },
                { label: 'Mutual Funds Compare', href: '/tools/mutual-funds-compare' },
            ],
        },
    ],
    Learn: [
        {
            title: '',
            links: [
                { label: 'Blog', href: '/academy/blog' },
                { label: 'Glossary', href: '/academy/glossary' },
            ],
        },
    ],
    Company: [
        {
            title: '',
            links: [
                { label: 'About Us', href: '/about/about-us' },
                { label: 'Press', href: '/about/press' },
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
                                        {link.hasMegaMenu && (
                                            <ChevronDown
                                                className={styles.navChevron}
                                                aria-hidden
                                            />
                                        )}
                                    </Link>

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
