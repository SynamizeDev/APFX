'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './RouteBreadcrumbs.module.css'

type Crumb = { label: string; href?: string }

function normalizePathname(pathname: string) {
    const clean = pathname.split('?')[0].split('#')[0]
    return clean.endsWith('/') && clean.length > 1 ? clean.slice(0, -1) : clean
}

function titleize(segment: string) {
    return segment
        .split('-')
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
}

function getCrumbs(pathnameRaw: string): Crumb[] {
    const pathname = normalizePathname(pathnameRaw)
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) return []

    const crumbs: Crumb[] = []

    // Home crumb is always rendered in UI, so we only return the rest.
    const root = segments[0]

    /** Only five hubs exist under /trade&invest/ */
    const tradeInvestHubs: Record<string, string> = {
        commodities: 'Commodities',
        indices: 'Indices',
        stocks: 'Stocks (CFDs)',
        cryptocurrencies: 'Cryptocurrencies',
        futures: 'Futures',
    }

    const calculatorsMap: Record<string, string> = {
        calculators: 'Calculators',
        pip: 'Pip Calculator',
        margin: 'Margin Calculator',
        'position-size': 'Position Size Calculator',
        rebate: 'Rebate Calculator',
    }

    const riskMap: Record<string, string> = {
        'risk-management': 'Risk Management',
        'risk-per-trade': 'Risk Per Trade',
        'risk-reward': 'Risk Reward',
        'risk-of-ruin': 'Risk of Ruin',
        'drawdown-recovery': 'Drawdown Recovery',
        'portfolio-risk': 'Portfolio Risk',
        'position-size': 'Position Size',
    }

    const academyMap: Record<string, string> = {
        academy: 'Academy',
        blog: 'Blog',
        glossary: 'Glossary',
    }

    const legalMap: Record<string, string> = {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        'risk-disclosure': 'Risk Disclosure',
    }

    // ── Trade & Invest (five hubs only) ─────────────────────────
    if (root === 'products' || root === 'trade&invest') {
        crumbs.push({ label: 'Trade & Invest', href: '/trade&invest/commodities' })
        const hub = segments[1]
        if (hub && tradeInvestHubs[hub]) {
            crumbs.push({ label: tradeInvestHubs[hub] })
        }
    } else if (root === 'markets') {
        crumbs.push({ label: 'Trade & Invest', href: '/trade&invest/commodities' })
        const seg = segments[1]
        if (seg && tradeInvestHubs[seg]) {
            crumbs.push({ label: tradeInvestHubs[seg] })
        } else {
            crumbs.push({ label: 'Commodities', href: '/trade&invest/commodities' })
        }
    }

    // ── Tools ───────────────────────────────────────────────────
    else if (root === 'tools') {
        crumbs.push({ label: 'Tools', href: '/tools/calculators' })

        const section = segments[1]
        if (section === 'calculators') {
            const calc = segments[2]
            if (!calc) {
                crumbs.push({ label: 'Calculators' })
            } else {
                crumbs.push({ label: calculatorsMap[calc] ?? titleize(calc) })
            }
        } else if (section === 'copy-trading') {
            crumbs.push({ label: 'Copy Trading' })
        } else if (section === 'risk-management') {
            const sub = segments[2]
            if (!sub) crumbs.push({ label: 'Risk Management' })
            else crumbs.push({ label: riskMap[sub] ?? titleize(sub) })
        } else {
            crumbs.push({ label: titleize(section ?? '') })
        }
    }

    // ── Learn ───────────────────────────────────────────────────
    else if (root === 'academy' || root === 'learn') {
        // User-facing URL is `/learn/*`, so breadcrumbs should reflect that.
        // Keep `/academy/*` mapping compatible with older labels.
        const learnCrumbLabel = root === 'learn' ? 'Learn' : 'Company'
        const learnCrumbHref = root === 'learn' ? '/learn' : '/company'
        crumbs.push({ label: learnCrumbLabel, href: learnCrumbHref })
        const sub = segments[1]
        if (!sub) crumbs.push({ label: learnCrumbLabel })
        else if (sub === 'blog') {
            crumbs.push({ label: 'Blog' })
            if (segments[2]) crumbs.push({ label: 'Article' })
        } else if (sub === 'glossary') {
            crumbs.push({ label: 'Glossary' })
        } else {
            crumbs.push({ label: academyMap[sub] ?? titleize(sub) })
        }
    }

    // ── Company ─────────────────────────────────────────────────
    else if (root === 'about' || root === 'company') {
        crumbs.push({ label: 'Company', href: '/company' })
        const sub = segments[1]
        if (!sub) crumbs.push({ label: 'Company' })
        else if (sub === 'about-us') crumbs.push({ label: 'About Us' })
        else if (sub === 'press') crumbs.push({ label: 'Press' })
        else crumbs.push({ label: titleize(sub) })
    } else if (root === 'partners') {
        crumbs.push({ label: 'Become a Partner', href: '/partners' })
    } else if (root === 'contact') {
        crumbs.push({ label: 'Company', href: '/company' })
        crumbs.push({ label: 'Contact' })
    } else if (root === 'accounts') {
        crumbs.push({ label: 'Accounts', href: '/accounts' })
    }

    // ── Auth ─────────────────────────────────────────────────────
    else if (root === 'login') {
        crumbs.push({ label: 'Account', href: '/login' })
        crumbs.push({ label: 'Login' })
    } else if (root === 'register') {
        crumbs.push({ label: 'Account', href: '/register' })
        crumbs.push({ label: 'Register' })
    }

    // ── Legal ────────────────────────────────────────────────────
    else if (root === 'legal') {
        crumbs.push({ label: 'Legal', href: '/legal/privacy' })
        const sub = segments[1]
        if (!sub) crumbs.push({ label: 'Documents' })
        else crumbs.push({ label: legalMap[sub] ?? titleize(sub) })
    }

    // ── Fallback ─────────────────────────────────────────────────
    else {
        crumbs.push({ label: titleize(root) })
    }

    // Remove empty labels
    return crumbs.filter((c) => c.label && c.label.trim().length > 0)
}

export default function RouteBreadcrumbs() {
    const pathname = usePathname()
    if (!pathname) return null
    if (pathname === '/') return null

    const crumbs = getCrumbs(pathname)
    if (crumbs.length === 0) return null

    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol role="list">
                <li>
                    <Link href="/">Home</Link>
                </li>
                {crumbs.map((crumb, i) => (
                    <li key={`${crumb.label}-${i}`}>
                        <span className={styles.separator} aria-hidden="true">
                            /
                        </span>
                        {crumb.href && i < crumbs.length - 1 ? (
                            <Link href={crumb.href}>{crumb.label}</Link>
                        ) : (
                            <span className={styles.current}>{crumb.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

