'use client'

import { useEffect, useRef, useState } from 'react'
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

const CANDLES_DATA = [
    { x: 30, open: 470, close: 450, high: 440, low: 480 },
    { x: 70, open: 450, close: 460, high: 435, low: 470 },
    { x: 110, open: 460, close: 430, high: 420, low: 470 },
    { x: 150, open: 430, close: 440, high: 415, low: 450 },
    { x: 190, open: 440, close: 400, high: 390, low: 450 },
    { x: 230, open: 400, close: 410, high: 395, low: 420 },
    { x: 270, open: 410, close: 370, high: 360, low: 420 },
    { x: 310, open: 370, close: 340, high: 330, low: 380 },
    { x: 350, open: 340, close: 355, high: 335, low: 365 },
    { x: 390, open: 355, close: 310, high: 300, low: 365 },
    { x: 430, open: 310, close: 290, high: 280, low: 320 },
    { x: 470, open: 290, close: 305, high: 285, low: 315 },
    { x: 510, open: 305, close: 260, high: 250, low: 315 },
    { x: 550, open: 260, close: 220, high: 210, low: 270 },
    { x: 590, open: 220, close: 235, high: 215, low: 245 },
    { x: 630, open: 235, close: 180, high: 170, low: 245 },
    { x: 670, open: 180, close: 150, high: 140, low: 190 },
    { x: 710, open: 150, close: 165, high: 145, low: 175 },
    { x: 750, open: 165, close: 120, high: 110, low: 175 },
    { x: 790, open: 120, close: 90, high: 80, low: 130 },
    { x: 830, open: 90, close: 105, high: 85, low: 115 },
    { x: 870, open: 105, close: 60, high: 50, low: 115 },
    { x: 910, open: 60, close: 40, high: 30, low: 70 },
    { x: 950, open: 40, close: 50, high: 35, low: 60 },
    { x: 990, open: 50, close: 15, high: 5, low: 60 }
]

export default function HeroSection() {
    const rootRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const hasLoaded = useRef(false)

    // Robust Auto-advance that always respects the current slide
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev >= 3 ? 1 : prev + 1))
        }, 6000)
        return () => clearTimeout(timer)
    }, [currentSlide])

    // Main animation driver
    useEffect(() => {
        const targetPercent = -(currentSlide * 25)
        const currentX = gsap.getProperty(trackRef.current, "xPercent") as number;
        
        let duration = 1.2;
        
        // If we are moving to Slide 0 and the track is still at -75% (clone), instantly snap it
        if (currentSlide === 0 && currentX <= -74) {
            gsap.set(trackRef.current, { xPercent: 0 })
            duration = 0;
        }

        gsap.to(trackRef.current, {
            xPercent: targetPercent,
            duration: duration,
            ease: 'power4.inOut',
            overwrite: 'auto',
            onComplete: () => {
                // Once we hit the clone, silently snap back to 0
                if (currentSlide === 3) {
                    gsap.set(trackRef.current, { xPercent: 0 })
                    setCurrentSlide(0)
                }
            }
        })

        // Initial entry animation only
        if (currentSlide === 0 && !hasLoaded.current) {
            hasLoaded.current = true;
            gsap.fromTo(`.${styles.content}`,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }
            )
        }

        // ── Slide 2 Specific Animations ───────────────────
        if (currentSlide === 1) {
            // Initial resets
            gsap.set(`.${styles.bonusLabel}`, { opacity: 0, scale: 0.5, y: 40 })
            gsap.set(`.${styles.candle}`, { opacity: 0, scaleY: 0 })
            gsap.set(`.${styles.priceTrackerLine}`, { scaleX: 0, opacity: 0 })
            gsap.set(`.${styles.pulseDotGroup}`, { scale: 0, opacity: 0 })

            const tl = gsap.timeline({ overwrite: 'auto' })

            // 1. Staggered bonus badges reveal
            tl.fromTo(`.${styles.bonusLabel}`, 
                { opacity: 0, scale: 0.5, y: 40, rotation: -10 },
                { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' }
            )
            
            // 2. Draw candles one by one (highly detailed stagger!)
            tl.fromTo(`.${styles.candle}`,
                { opacity: 0, scaleY: 0, transformOrigin: "bottom center" },
                { opacity: 1, scaleY: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
                "-=0.6" // start overlapping slightly with the badge animation
            )

            // 3. Price tracker line slices across
            tl.fromTo(`.${styles.priceTrackerLine}`,
                { scaleX: 0, opacity: 0, transformOrigin: "left center" },
                { scaleX: 1, opacity: 0.15, duration: 0.8, ease: 'power2.out' }
            )

            // 4. Glow pulse scale pop
            tl.fromTo(`.${styles.pulseDotGroup}`,
                { scale: 0, opacity: 0, transformOrigin: "center center" },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
            )
        } else {
            // Reset for next time
            gsap.set(`.${styles.bonusLabel}`, { opacity: 0, scale: 0.5, y: 40 })
            gsap.set(`.${styles.candle}`, { opacity: 0, scaleY: 0 })
            gsap.set(`.${styles.priceTrackerLine}`, { scaleX: 0, opacity: 0 })
            gsap.set(`.${styles.pulseDotGroup}`, { scale: 0, opacity: 0 })
        }
    }, [currentSlide])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Global initial animations
            const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } })

            tl.fromTo(`.${styles.heroCard}`,
                { opacity: 0, scale: 0.98, y: 20 },
                { opacity: 1, scale: 1, y: 0, ease: 'expo.out' }
            )
            .fromTo(`.${styles.navContainer}`,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0 },
                '-=0.8'
            )
            .fromTo(`.${styles.mockupCard}`,
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

            // Subtle floating for the card in Slide 1
            gsap.to(`.${styles.mockupCard}`, {
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

            // Floating cubes in Slide 3
            gsap.to(`.${styles.cubeLeft}`, { 
                y: -30, x: 10, rotationZ: 5, duration: 5, 
                repeat: -1, yoyo: true, ease: 'sine.inOut' 
            })
            gsap.to(`.${styles.cubeRight}`, { 
                y: 30, x: -10, rotationZ: -5, duration: 6, 
                repeat: -1, yoyo: true, ease: 'sine.inOut' 
            })

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

    const renderSlide1 = (isClone = false) => (
        <div key={isClone ? 'slide-1-clone' : 'slide-1'} className={styles.slideItem} aria-hidden={isClone}>
            <div className={`${styles.slideBg} ${styles.slideBg1}`} />
            <div className={styles.slideContainer}>
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
                        <div className={styles.mockupCard}>
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
                                        <line x1="5" y1="18" x2="5" y2="28" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="3" y="20" width="4" height="6" fill="#87E5A5" rx="1" />
                                        <line x1="15" y1="12" x2="15" y2="22" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="13" y="14" width="4" height="6" fill="#87E5A5" rx="1" />
                                        <line x1="25" y1="8" x2="25" y2="18" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="23" y="10" width="4" height="6" fill="#87E5A5" rx="1" />
                                        <line x1="35" y1="10" x2="35" y2="20" stroke="#FF5C5C" strokeWidth="1" />
                                        <rect x="33" y="12" width="4" height="4" fill="#FF5C5C" rx="1" />
                                        <line x1="45" y1="5" x2="45" y2="15" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="43" y="7" width="4" height="6" fill="#87E5A5" rx="1" />
                                        <line x1="55" y1="2" x2="55" y2="12" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="53" y="4" width="4" height="6" fill="#87E5A5" rx="1" />
                                        <line x1="65" y1="8" x2="65" y2="18" stroke="#FF5C5C" strokeWidth="1" />
                                        <rect x="63" y="10" width="4" height="5" fill="#FF5C5C" rx="1" />
                                        <line x1="75" y1="4" x2="75" y2="14" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="73" y="6" width="4" height="6" fill="#87E5A5" rx="1" />
                                        <line x1="85" y1="2" x2="85" y2="10" stroke="#87E5A5" strokeWidth="1" />
                                        <rect x="83" y="3" width="4" height="5" fill="#87E5A5" rx="1" />
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
        </div>
    )

    return (
        <section ref={rootRef} className={styles.heroWrapper}>
            {/* ── The Framed Card Block with Dual Notches ────────── */}
            <div className={styles.heroCard}>
                {/* Subtle World Map Pattern (Static overlay) */}
                <div className={styles.mapOverlay} aria-hidden="true" />

                <div className={styles.sliderWrapper}>
                    <div ref={trackRef} className={styles.sliderTrack}>
                        
                        {/* ── Slide 1 ─────────────────────── */}
                        {renderSlide1(false)}

                        {/* ── Slide 2 ─────────────────────── */}
                        <div className={styles.slideItem}>
                            <div className={`${styles.slideBg} ${styles.slideBg2}`}>
                                <div className={styles.bgGridPattern} />
                                <div className={styles.bgOrb1} />
                                <div className={styles.bgOrb2} />

                                {/* Floating Bonus Labels */}
                                <div className={`${styles.bonusLabel} ${styles.label1}`}>+$1,000</div>
                                <div className={`${styles.bonusLabel} ${styles.label2}`}>+100%</div>
                                <div className={`${styles.bonusLabel} ${styles.label3}`}>WINNER</div>
                                <div className={`${styles.bonusLabel} ${styles.label4}`}>BONUS</div>

                                {/* Rising Graph — Now with high-fidelity market candles */}
                                <div className={styles.risingGraph}>
                                    <svg className={styles.graphSvg} viewBox="0 0 1000 500" preserveAspectRatio="none">
                                        {/* 1. Dotted Chart Grid lines */}
                                        <g opacity="0.04" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3">
                                            {/* Horizontal lines */}
                                            <line x1="0" y1="100" x2="1000" y2="100" />
                                            <line x1="0" y1="200" x2="1000" y2="200" />
                                            <line x1="0" y1="300" x2="1000" y2="300" />
                                            <line x1="0" y1="400" x2="1000" y2="400" />
                                            {/* Vertical lines */}
                                            <line x1="200" y1="0" x2="200" y2="500" />
                                            <line x1="400" y1="0" x2="400" y2="500" />
                                            <line x1="600" y1="0" x2="600" y2="500" />
                                            <line x1="800" y1="0" x2="800" y2="500" />
                                        </g>

                                        {/* 2. Mock Chart Time & Price Axes */}
                                        <g opacity="0.12" fill="#ffffff" fontSize="9" fontFamily="monospace">
                                            {/* Price Axis (Right) */}
                                            <text x="960" y="95">1.1320</text>
                                            <text x="960" y="195">1.1300</text>
                                            <text x="960" y="295">1.1280</text>
                                            <text x="960" y="395">1.1260</text>
                                            {/* Time Axis (Bottom) */}
                                            <text x="200" y="485">14:00</text>
                                            <text x="400" y="485">15:00</text>
                                            <text x="600" y="485">16:00</text>
                                            <text x="800" y="485">17:00</text>
                                        </g>

                                        {/* 3. Live Price Dotted Tracker Line */}
                                        <line 
                                            className={styles.priceTrackerLine}
                                            x1="0" 
                                            y1="15" 
                                            x2="990" 
                                            y2="15" 
                                            stroke="#36F936" 
                                            strokeWidth="1" 
                                            strokeDasharray="4 4"
                                            opacity="0.15" 
                                        />

                                        {/* 4. Financial Market Candlesticks */}
                                        {CANDLES_DATA.map((candle, idx) => {
                                            const isGreen = candle.close < candle.open;
                                            const color = isGreen ? '#36F936' : '#FF4976';
                                            const bodyHeight = Math.max(2, Math.abs(candle.open - candle.close));
                                            const bodyY = Math.min(candle.open, candle.close);
                                            const bodyWidth = 8;
                                            return (
                                                <g key={idx} className={styles.candle}>
                                                    {/* Shadow/Wick line */}
                                                    <line
                                                        x1={candle.x}
                                                        y1={candle.high}
                                                        x2={candle.x}
                                                        y2={candle.low}
                                                        stroke={color}
                                                        strokeWidth="1.5"
                                                        opacity="0.3"
                                                    />
                                                    {/* Candle Body */}
                                                    <rect
                                                        x={candle.x - bodyWidth / 2}
                                                        y={bodyY}
                                                        width={bodyWidth}
                                                        height={bodyHeight}
                                                        fill={color}
                                                        opacity="0.2"
                                                        rx="1"
                                                    />
                                                </g>
                                            )
                                        })}

                                        {/* 5. Live Glowing Price Pulse Indicator */}
                                        <g className={styles.pulseDotGroup}>
                                            {/* Outer expanding pulse wave */}
                                            <circle 
                                                className={styles.pulseOuter}
                                                cx="990" 
                                                cy="15" 
                                                r="12" 
                                                fill="#36F936" 
                                                opacity="0.25" 
                                            />
                                            {/* Inner solid tracking dot */}
                                            <circle 
                                                cx="990" 
                                                cy="15" 
                                                r="4" 
                                                fill="#36F936" 
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className={`${styles.slideContainer} ${styles.slideCenter}`}>
                                <div className={styles.slideCenterContent}>
                                    <h2 className={styles.slideHeadline}>
                                        100% Bonus on Your<br />First Deposit
                                    </h2>
                                    <p className={styles.slideSubheadline}>
                                        Plus 50% Extra Every Time You Top Up*.
                                    </p>
                                    <button className={styles.ctaButtonGreen}>Learn More</button>
                                </div>
                            </div>
                        </div>

                        {/* ── Slide 3 ─────────────────────── */}
                        <div className={styles.slideItem}>
                            <div className={`${styles.slideBg} ${styles.slideBg3}`} style={{ backgroundImage: "url('/smooth_pattern.png')" }} />
                            <div className={`${styles.slideContainer} ${styles.slideCenter}`}>
                                {/* 3D Floating Cubes */}
                                <div className={`${styles.cube3d} ${styles.cubeLeft}`}>
                                    <span>Premium</span>
                                </div>
                                <div className={`${styles.cube3d} ${styles.cubeRight}`}>
                                    <span>Elite</span>
                                </div>
                                <div className={`${styles.cube3d} ${styles.cubeSwapFree}`}>
                                    <span>Swap Free</span>
                                </div>
                                <div className={`${styles.cube3d} ${styles.cubeStandard}`}>
                                    <span>Standard<br />Account</span>
                                </div>
                                
                                <div className={styles.slideCenterContent}>
                                    <h2 className={styles.slideHeadline}>
                                        More Choice.<br /><span className={styles.boldText}>More Control.</span>
                                    </h2>
                                    <p className={styles.slideSubheadline}>
                                        New account types designed to support your trading strategy and execution style.
                                    </p>
                                    <button className={styles.ctaButtonGreen}>Learn More</button>
                                </div>
                            </div>
                        </div>

                        {/* ── Slide 1 Clone (Infinite Loop) ── */}
                        {renderSlide1(true)}
                    </div>
                </div>

                {/* ── Pagination ─────────────────────── */}
                <div className={styles.pagination}>
                    {[0, 1, 2].map((idx) => (
                        <button
                            key={idx}
                            className={`${styles.dot} ${currentSlide === idx || (currentSlide === 3 && idx === 0) ? styles.activeDot : ''}`}
                            onClick={() => {
                                if (currentSlide !== 3) setCurrentSlide(idx)
                            }}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}