'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PlayCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import styles from './Webinars.module.css'

const EVENT_STEP = 340
const SCROLL_STEP = Math.round(EVENT_STEP * 0.8) // 272px — 80% of one event height
// Total scrollable content estimate (Luma renders ~10 events)
const MAX_OFFSET = EVENT_STEP * 7  // safe cap — avoids blank whitespace at bottom

export default function WebinarsClient() {
    const [offset, setOffset] = useState(0)

    const handleScrollToUpcoming = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const target = document.getElementById('upcoming-webinars')
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const nextEvent = () => setOffset(prev => Math.min(prev + SCROLL_STEP, MAX_OFFSET))
    const prevEvent = () => setOffset(prev => Math.max(prev - SCROLL_STEP, 0))

    return (
        <div className={styles.page}>
            {/* ── HERO SECTION ────────────────────────────────────────────── */}
            <header className={styles.hero} aria-label="Page Header">
                <div className={styles.heroContainer}>


                    <div className={styles.heroContent}>
                        <span className={styles.heroEyebrow}>LIVE EDUCATION · APFX GLOBAL</span>
                        <h1 className={styles.heroTitle}>
                            Learn. Analyse.<br />
                            <span className={styles.heroAccent}>Trade Smarter.</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Join live APFX sessions covering trading platforms, technical analysis, market concepts, and professional trading tools.
                        </p>
                        <div className={styles.heroActions}>
                            <a 
                                href="#upcoming-webinars" 
                                onClick={handleScrollToUpcoming}
                                className={styles.heroBtnPrimary}
                            >
                                View Upcoming Webinars
                                <ArrowRight size={16} aria-hidden />
                            </a>
                            <Link href="/learn/courses" className={styles.heroBtnSecondary}>
                                Explore APFX Academy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background glows */}
                <div className={styles.heroGlow1} aria-hidden="true" />
                <div className={styles.heroGlow2} aria-hidden="true" />
            </header>

            <div className={styles.contentArea}>

                {/* ── UPCOMING WEBINARS ─────────────────────────────────────── */}
                <section id="upcoming-webinars" className={styles.section} aria-labelledby="upcoming-heading">
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>UPCOMING SESSIONS</span>
                        <h2 id="upcoming-heading" className={styles.sectionTitle}>More ways to learn</h2>
                        <p className={styles.sectionSubtitle}>
                            Explore upcoming APFX live sessions and reserve your place.
                        </p>
                    </div>

                    {/* Integrated Iframe Wrapper */}
                    <div className={styles.calendarContainer}>
                        <div className={styles.calendarTitleBar}>
                            <div className={styles.calendarStatus}>
                                <span className={styles.calendarStatusDot} />
                                <span>APFX Live Event System</span>
                            </div>
                            <span className={styles.calendarProvider}>Powered by Luma</span>
                        </div>

                        {/* Clipped iframe — no native scrollbar */}
                        <div className={styles.lumaClip}>
                            <div
                                className={styles.lumaSlider}
                                style={{ transform: `translateY(-${offset}px)` }}
                            >
                                <iframe
                                    src="https://luma.com/embed/calendar/cal-4gefSbQmENUUtpl/events"
                                    width="100%"
                                    height="4000"
                                    style={{
                                        border: 'none',
                                        display: 'block',
                                        overflow: 'hidden',
                                    }}
                                    title="APFX Webinars — Upcoming Events Calendar"
                                />
                            </div>
                        </div>

                        {/* Navigation controls */}
                        <div className={styles.lumaNav}>
                            <button
                                    id="prev-event-btn"
                                    className={styles.lumaNavBtn}
                                    onClick={prevEvent}
                                    disabled={offset === 0}
                                    aria-label="Previous event"
                                >
                                    <ChevronUp size={16} aria-hidden />
                                    Previous Event
                                </button>
                            <button
                                id="next-event-btn"
                                className={`${styles.lumaNavBtn} ${styles.lumaNavBtnPrimary}`}
                                onClick={nextEvent}
                                disabled={offset >= MAX_OFFSET}
                                aria-label="Next event"
                            >
                                Next Event
                                <ChevronDown size={16} aria-hidden />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── WHY ATTEND APFX WEBINARS ──────────────────────────────── */}
                <section className={styles.whySection} aria-labelledby="why-heading">
                    <div className={styles.sectionHeaderCentered}>
                        <span className={styles.eyebrow}>WHY JOIN</span>
                        <h2 id="why-heading" className={styles.sectionTitle}>More than a webinar.</h2>
                    </div>

                    <div className={styles.whyGrid}>
                        <div className={styles.whyCard}>
                            <span className={styles.whyNumber}>01</span>
                            <h3 className={styles.whyTitle}>Practical Learning</h3>
                            <p className={styles.whyDesc}>
                                Go beyond theory with sessions focused on platforms, analysis, tools, and real-world learning.
                            </p>
                        </div>
                        <div className={styles.whyCard}>
                            <span className={styles.whyNumber}>02</span>
                            <h3 className={styles.whyTitle}>Expert-Led Sessions</h3>
                            <p className={styles.whyDesc}>
                                Learn directly from experienced professionals and get your questions answered live.
                            </p>
                        </div>
                        <div className={styles.whyCard}>
                            <span className={styles.whyNumber}>03</span>
                            <h3 className={styles.whyTitle}>Built for Every Level</h3>
                            <p className={styles.whyDesc}>
                                Whether you're starting out or refining your skills, our sessions are designed to help you progress.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── PAST WEBINARS ─────────────────────────────────────────── */}
                <section className={styles.section} aria-labelledby="past-heading">
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>LEARN ON DEMAND</span>
                        <h2 id="past-heading" className={styles.sectionTitle}>Missed a session?</h2>
                        <p className={styles.sectionSubtitle}>
                            Catch up on previous APFX webinars and continue learning at your own pace.
                        </p>
                    </div>

                    {/* Polished Empty State Card */}
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIconWrap} aria-hidden>
                            <PlayCircle size={32} strokeWidth={1.25} />
                        </div>
                        <div className={styles.emptyTextContent}>
                            <h3 className={styles.emptyTitle}>Webinar Archives</h3>
                            <p className={styles.emptyDesc}>
                                Previous sessions will appear here as recordings become available. Register for upcoming live events to stay updated on replay availability.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
                <section className={styles.ctaSection} aria-labelledby="cta-heading">
                    <div className={styles.ctaGlow} aria-hidden />
                    <div className={styles.ctaInner}>
                        <span className={styles.eyebrow}>KEEP LEARNING</span>
                        <h2 id="cta-heading" className={styles.ctaTitle}>
                            Take your learning further with <span className={styles.accent}>APFX Academy</span>
                        </h2>
                        <p className={styles.ctaSubtitle}>
                            Explore structured educational content covering platforms, technical analysis, and more.
                        </p>
                        <div className={styles.ctaActions}>
                            <Link href="/learn/courses" className={styles.ctaBtn}>
                                Explore APFX Academy →
                            </Link>
                            <Link href="/contact" className={styles.ctaBtnSecondary}>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
