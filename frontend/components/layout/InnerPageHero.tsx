'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './InnerPageHero.module.css'

interface Breadcrumb {
    label: string
    href?: string
}

interface InnerPageHeroProps {
    title: string
    subtitle?: string
    description?: string // Add alias for description
    accent?: string // Add alias for accent
    breadcrumbs?: Breadcrumb[] // Make optional
    accentLine?: string
    /** When true, removes the default bottom border (e.g. when CTAs sit directly below the hero). */
    omitBottomBorder?: boolean
}

export default function InnerPageHero({
    title,
    subtitle,
    description,
    accent,
    breadcrumbs = [],
    accentLine,
    omitBottomBorder = false,
}: InnerPageHeroProps) {
    const prefersReducedMotion = useReducedMotion()
    const shouldRenderBreadcrumbs = breadcrumbs.length > 0
    
    // Support aliases for props used in recent edits
    const displaySubtitle = subtitle || description
    const displayAccent = accentLine || accent

    return (
        <section
            className={`${styles.hero} ${omitBottomBorder ? styles.heroNoBottomBorder : ''}`}
        >
            <div className={styles.container}>
                {/* Breadcrumbs */}
                {shouldRenderBreadcrumbs && (
                    <motion.nav
                        className={styles.breadcrumbs}
                        aria-label="Breadcrumb"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <ol role="list">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            {breadcrumbs.map((crumb, i) => (
                                <li key={i}>
                                    <span className={styles.separator} aria-hidden="true">
                                        /
                                    </span>
                                    {crumb.href ? (
                                        <Link href={crumb.href}>{crumb.label}</Link>
                                    ) : (
                                        <span className={styles.current}>{crumb.label}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </motion.nav>
                )}

                {/* Content */}
                <motion.div
                    className={styles.content}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1], // matches your design system ease-out
                        delay: 0.05,
                    }}
                >
                    <h1 className={styles.title}>
                        {title}
                        {displayAccent && (
                            <>
                                <br />
                                <span className={styles.accent}>{displayAccent}</span>
                            </>
                        )}
                    </h1>

                    {displaySubtitle && (
                        <motion.p
                            className={styles.subtitle}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: 'easeOut',
                                delay: 0.15,
                            }}
                        >
                            {displaySubtitle}
                        </motion.p>
                    )}
                </motion.div>
            </div>

            {/* Ambient background glow */}
            <div className={styles.glow} aria-hidden="true" />
        </section>
    )
}