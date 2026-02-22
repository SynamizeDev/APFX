'use client'

import Link from 'next/link'
import styles from './InnerPageHero.module.css'

interface Breadcrumb {
    label: string
    href?: string
}

interface InnerPageHeroProps {
    title: string
    subtitle?: string
    breadcrumbs: Breadcrumb[]
    accentLine?: string
}

export default function InnerPageHero({
    title,
    subtitle,
    breadcrumbs,
    accentLine
}: InnerPageHeroProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                {/* Breadcrumbs */}
                <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                    <ol role="list">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        {breadcrumbs.map((crumb, i) => (
                            <li key={i}>
                                <span className={styles.separator} aria-hidden="true">/</span>
                                {crumb.href ? (
                                    <Link href={crumb.href}>{crumb.label}</Link>
                                ) : (
                                    <span className={styles.current}>{crumb.label}</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Content */}
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        {title}
                        {accentLine && (
                            <>
                                <br />
                                <span className={styles.accent}>{accentLine}</span>
                            </>
                        )}
                    </h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            </div>

            {/* Subtle background glow */}
            <div className={styles.glow} aria-hidden="true" />
        </section>
    )
}
