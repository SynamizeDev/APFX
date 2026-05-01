'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ArrowUpRight, Star, Plus, Search, Info, TrendingUp, ShieldCheck, Activity, Zap } from 'lucide-react'
import InvestWithAPFX from '@/components/sections/InvestWithAPFX'
import styles from './HeroSection.module.css'

const NAV_LINKS = [
    { label: 'Overview', href: '/' },
    { label: 'Solution', href: '/solution' },
    { label: 'Service', href: '/service' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Business', href: '/business' },
    { label: 'Blog', href: '/blog' },
]

const PAYMENT_LOGOS = [
    { name: 'Apple Pay', src: '/logos/apple-pay.svg' },
    { name: 'MIR', src: '/logos/mir.svg' },
    { name: 'Wise', src: '/logos/wise.svg' },
    { name: 'Stripe', src: '/logos/stripe.svg' },
    { name: 'Visa', src: '/logos/visa.svg' },
    { name: 'Google Pay', src: '/logos/google-pay.svg' },
    { name: 'Boku', src: '/logos/boku.svg' },
]

const ASSET_LIST = [
    "> 'Futures'",
    "> 'Commodities'",
    "> 'Stocks (CFDs)'",
    "> 'Cryptocurrencies'",
    "> 'Indices'"
]

export default function HeroSection() {
    const rootRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out', duration: 1.2 },
            })

            tl.fromTo(`.${styles.heroCard}`,
                { opacity: 0, scale: 0.98, y: 20 },
                { opacity: 1, scale: 1, y: 0, ease: 'expo.out' }
            )
                .fromTo(`.${styles.navContainer}`,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0 },
                    '-=0.8'
                )
                .fromTo(`.${styles.content}`,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0 },
                    '-=0.6'
                )
                .fromTo(cardRef.current,
                    { opacity: 0, x: 50, rotateY: 10 },
                    { opacity: 1, x: 0, rotateY: 0, duration: 1.5 },
                    '-=1'
                )
                .fromTo(`.${styles.floatingChip}`,
                    { opacity: 0, scale: 0.8, y: 20 },
                    { opacity: 1, scale: 1, y: 0, stagger: 0.2, duration: 1 },
                    '-=0.5'
                )

            // Background Glow Mouse Follow
            const heroCard = document.querySelector(`.${styles.heroCard}`) as HTMLElement
            const handleMouseMove = (e: MouseEvent) => {
                if (!heroCard) return
                const rect = heroCard.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                heroCard.style.setProperty('--x', `${x}%`)
                heroCard.style.setProperty('--y', `${y}%`)
            }
            window.addEventListener('mousemove', handleMouseMove)

            // Subtle floating for the card
            gsap.to(cardRef.current, {
                y: -15,
                duration: 4,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            })

            // Floating chips independent motion
            gsap.to(`.${styles.chip1}`, { y: -10, x: 5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
            gsap.to(`.${styles.chip2}`, { y: 15, x: -10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
            gsap.to(`.${styles.chip3}`, { y: -12, x: -8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })

            // Asset Scroller Animation
            const items = gsap.utils.toArray(`.${styles.assetItem}`)
            if (items.length > 0) {
                const loop = gsap.timeline({ repeat: -1 })
                items.forEach((item: any, i) => {
                    loop.fromTo(item,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                    )
                        .to(item,
                            { y: -20, opacity: 0, duration: 0.8, ease: "power2.in", delay: 1.5 }
                        )
                })
            }
        }, rootRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={rootRef} className={styles.heroWrapper}>
            {/* ── The Framed Card Block with Dual Notches ────────── */}
            <div className={styles.heroCard}>

                {/* ── High-Fidelity Integrated Navbar ──────────────── */}
                <nav className={styles.navContainer}>
                    <div /> {/* Left ear spacer */}

                    {/* Center Notch: Navigation */}
                    <div className={styles.notchNav}>
                        {NAV_LINKS.map(link => (
                            <Link key={link.label} href={link.href} className={styles.navItem}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div /> {/* Right ear spacer */}
                </nav>

                {/* Subtle World Map Pattern */}
                <div className={styles.mapOverlay} aria-hidden="true" />

                {/* ── Main Two-Column Layout ─────────────────────── */}
                <div className={styles.content}>
                    <div className={styles.contentLeft}>
                        <h1 className={styles.headline}>
                            Smarter Trading.<br />
                            Faster Execution.<br />
                            <span className={styles.highlight}>Better Profits.</span>
                        </h1>
                        <div className={styles.subHeadlineArea}>
                            <p className={styles.subheadline}>Trade with APFX</p>
                            <div className={styles.assetScroller}>
                                {ASSET_LIST.map((asset, i) => (
                                    <div key={i} className={styles.assetItem}>
                                        {asset}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.valuePoints}>
                            <div className={styles.valuePoint}>
                                <div className={styles.valueIcon}><Zap size={14} /></div>
                                <span>Ultra-fast execution</span>
                            </div>
                            <div className={styles.valuePoint}>
                                <div className={styles.valueIcon}><ShieldCheck size={14} /></div>
                                <span>Secure assets</span>
                            </div>
                            <div className={styles.valuePoint}>
                                <div className={styles.valueIcon}><Activity size={14} /></div>
                                <span>Real-time analytics</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentRight}>
                        {/* Refined Mockup Card */}
                        <div ref={cardRef} className={styles.mockupCard}>
                            {/* Floating elements */}
                            <div className={`${styles.floatingChip} ${styles.chip1}`}>
                                <Activity size={16} color="#87E5A5" /> <span>Real-time Feed</span>
                            </div>
                            <div className={`${styles.floatingChip} ${styles.chip2}`}>
                                <ShieldCheck size={16} color="#A3F1F1" /> <span>Encrypted</span>
                            </div>
                            <div className={`${styles.floatingChip} ${styles.chip3}`}>
                                <TrendingUp size={16} color="#E2F991" /> <span>+12.4% APR</span>
                            </div>

                            <div className={styles.mockupBadge}>
                                <span className={styles.badgeIcon}><Plus size={14} /></span> Allocate funds
                            </div>

                            <div className={styles.profitIndicator}>
                                <TrendingUp size={14} />
                                <span>+8.4%</span>
                            </div>

                            <div className={styles.mockupHeader}>
                                <div className={styles.mockupLogo}>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={styles.cardLogo}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" /></svg>
                                    <span>APFX</span>
                                </div>
                            </div>

                            <div className={styles.mockupBody}>
                                <div className={styles.mockupBalanceLabel}>Total Balance</div>
                                <div className={styles.mockupBalance}>$42,850.12</div>
                                <div className={styles.miniGraph}>
                                    <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                                        {/* Candlestick 1 */}
                                        <line x1="5" y1="18" x2="5" y2="28" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="3" y="20" width="4" height="6" fill="#87E5A5" rx="1" />

                                        {/* Candlestick 2 */}
                                        <line x1="15" y1="12" x2="15" y2="22" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="13" y="14" width="4" height="6" fill="#87E5A5" rx="1" />

                                        {/* Candlestick 3 */}
                                        <line x1="25" y1="8" x2="25" y2="18" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="23" y="10" width="4" height="6" fill="#87E5A5" rx="1" />

                                        {/* Candlestick 4 (Down) */}
                                        <line x1="35" y1="10" x2="35" y2="20" stroke="#FF5C5C" strokeWidth="1" />
                                        <rect x="33" y="12" width="4" height="4" fill="#FF5C5C" rx="1" />

                                        {/* Candlestick 5 */}
                                        <line x1="45" y1="5" x2="45" y2="15" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="43" y="7" width="4" height="6" fill="#87E5A5" rx="1" />

                                        {/* Candlestick 6 */}
                                        <line x1="55" y1="2" x2="55" y2="12" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="53" y="4" width="4" height="6" fill="#87E5A5" rx="1" />

                                        {/* Candlestick 7 (Down) */}
                                        <line x1="65" y1="8" x2="65" y2="18" stroke="#FF5C5C" strokeWidth="1" />
                                        <rect x="63" y="10" width="4" height="5" fill="#FF5C5C" rx="1" />

                                        {/* Candlestick 8 */}
                                        <line x1="75" y1="4" x2="75" y2="14" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="73" y="6" width="4" height="6" fill="#87E5A5" rx="1" />

                                        {/* Candlestick 9 */}
                                        <line x1="85" y1="2" x2="85" y2="10" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="83" y="3" width="4" height="5" fill="#87E5A5" rx="1" />

                                        {/* Candlestick 10 */}
                                        <line x1="95" y1="0" x2="95" y2="8" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="93" y="1" width="4" height="5" fill="#87E5A5" rx="1" />
                                    </svg>
                                </div>
                                <div className={styles.mockupCardNumber}>•••• •••• 1406 1805</div>
                            </div>

                            <div className={styles.mockupFooter}>
                                <div className={styles.mockupName}>JATIN SHARMA</div>
                                <div className={styles.mockupDate}>12/28</div>
                                <div className={styles.visaTag}>PREMIUM</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}