'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import styles from './Header.module.css'

const NAV_LINKS = [
    { label: 'Markets', href: '/markets' },
    { label: 'Platforms', href: '/platforms' },
    { label: 'Accounts', href: '/accounts' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
]

export default function Header() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const headerRef = useRef<HTMLElement>(null)

    // ── Scroll-aware class ─────────────────────────────────────
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // ── Lock body scroll when mobile menu open ─────────────────
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const closeMenu = () => setMenuOpen(false)

    return (
        <>
            <header
                ref={headerRef}
                className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
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
                    <nav aria-label="Main navigation">
                        <ul className={styles.nav} role="list">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/')
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={isActive ? styles.navActive : ''}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* ── Actions ───────────────────────────────────────── */}
                    <div className={styles.actions}>
                        <Link href="/login" className={styles.btnLogin}>
                            Log In
                        </Link>
                        <Link href="/register" className={styles.btnCta}>
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
                <div className={styles.mobileInner}>
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} onClick={closeMenu}>
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/register" className={styles.mobileCta} onClick={closeMenu}>
                        Open Account
                    </Link>
                </div>
            </nav>
        </>
    )
}
