'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import styles from './HeroSection.module.css'

interface HeroSlide {
  id: string
  badge: React.ReactNode
  headline: React.ReactNode
  body: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta: {
    text: string
    href: string
  }
  trustItems: string[]
  imageSrc: string
  imageAlt: string
  centerImage?: boolean
  textFree?: boolean
}

const SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'Slide 1',
    headline: null,
    body: '',
    primaryCta: { text: '', href: '#' },
    secondaryCta: { text: '', href: '#' },
    trustItems: [],
    imageSrc: '/fox-mob.png',
    imageAlt: 'APFX Wolf Mascot',
    centerImage: true,
    textFree: true,
  },
  {
    id: 'slide-2',
    badge: (
      <>
        <span className={styles.flagWrap} aria-hidden="true">
          <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.flagIcon}
          >
            <rect width="24" height="4" fill="#EA2839" />
            <rect y="4" width="24" height="4" fill="#1A206D" />
            <rect y="8" width="24" height="4" fill="#FFD500" />
            <rect y="12" width="24" height="4" fill="#00A551" />
          </svg>
        </span>
        <span className={styles.badgeText}>FSC Mauritius Regulated</span>
      </>
    ),
    headline: (
      <>
        Built for Traders<br />
        <span className={styles.accent}>Who Move Different.</span>
      </>
    ),
    body: 'Access global markets with competitive spreads, fast execution, and powerful trading tools designed for modern traders.',
    primaryCta: {
      text: 'Open Live Account',
      href: 'https://portal.apfxglobal.com/signup',
    },
    secondaryCta: {
      text: 'Try Demo Account',
      href: 'https://portal.apfxglobal.com/signup',
    },
    trustItems: [],
    imageSrc: '',
    imageAlt: '',
  },
]

interface FrontFacingCard {
  id: string
  name: string
  src: string
}

const FRONT_FACING_CARDS: FrontFacingCard[] = [
  { id: 'aapl', name: 'Apple AAPL', src: '/images/Front%20Facing%20Cards/APFX_AAPL.webp' },
  { id: 'amzn', name: 'Amazon AMZN', src: '/images/Front%20Facing%20Cards/APFX_AMZN.webp' },
  { id: 'btc-usd', name: 'Bitcoin BTC/USD', src: '/images/Front%20Facing%20Cards/APFX_BTC_USD.webp' },
  { id: 'eth-usd', name: 'Ethereum ETH/USD', src: '/images/Front%20Facing%20Cards/APFX_ETH_USD.webp' },
  { id: 'eur-usd', name: 'EUR/USD', src: '/images/Front%20Facing%20Cards/APFX_EUR_USD.webp' },
  { id: 'gbp-aud', name: 'GBP/AUD', src: '/images/Front%20Facing%20Cards/APFX_GBP_AUD.webp' },
  { id: 'googl', name: 'Google GOOGL', src: '/images/Front%20Facing%20Cards/APFX_GOOGL.webp' },
  { id: 'ma', name: 'Mastercard MA', src: '/images/Front%20Facing%20Cards/APFX_MA.webp' },
  { id: 'msft', name: 'Microsoft MSFT', src: '/images/Front%20Facing%20Cards/APFX_MSFT.webp' },
  { id: 'nvda', name: 'NVIDIA NVDA', src: '/images/Front%20Facing%20Cards/APFX_NVDA.webp' },
  { id: 'tsla', name: 'Tesla TSLA', src: '/images/Front%20Facing%20Cards/APFX_TSLA.webp' },
  { id: 'us100', name: 'US Tech 100', src: '/images/Front%20Facing%20Cards/APFX_US100.webp' },
  { id: 'usoil', name: 'Crude Oil USOIL', src: '/images/Front%20Facing%20Cards/APFX_USOIL.webp' },
  { id: 'xag-usd', name: 'Silver XAG/USD', src: '/images/Front%20Facing%20Cards/APFX_XAG_USD.webp' },
  { id: 'xau-usd', name: 'Gold XAU/USD', src: '/images/Front%20Facing%20Cards/APFX_XAU_USD.webp' },
]

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }, [currentSlide])

  // Automatic sliding every 6 seconds (resets on slide change, pauses on hover)
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isPaused, currentSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  // Preload all 15 front-facing cards to guarantee instant display with zero gap
  useEffect(() => {
    FRONT_FACING_CARDS.forEach((card) => {
      const img = new window.Image()
      img.src = card.src
    })
  }, [])

  const slide = SLIDES[currentSlide]

  return (
    <section
      className={styles.heroWrapper}
      aria-label="Hero section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Outer Card Frame ───────────────────────────────────── */}
      <div className={styles.heroCard}>
        {/* ── Cinematic Looping Video Background ───────────── */}
        <div className={styles.videoBgWrapper} aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-bg-poster.webp"
            className={styles.videoBg}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Subtle atmospheric vignette & glow overlay */}
          <div className={styles.videoOverlay} />
        </div>

        {/* ── Animated Slide Content ────────────────────────── */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`${styles.heroInner} ${slide.textFree ? styles.heroInnerTextFree : ''}`}
          >
            {/* ── Centered Content (Slide 1 — Inveslo-inspired) ──── */}
            {!slide.textFree && (
              <div className={styles.heroCentered}>
                {/* Badge Pill */}
                {slide.badge && (
                  <div className={styles.heroBadge}>
                    {slide.badge}
                  </div>
                )}

                <h1 className={styles.headline}>
                  {slide.headline}
                </h1>

                <p className={styles.body}>
                  {slide.body}
                </p>

                <div className={styles.ctas}>
                  <Link
                    href={slide.primaryCta.href}
                    target={slide.primaryCta.href.startsWith('http') ? '_blank' : undefined}
                    rel={slide.primaryCta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={styles.btnPrimary}
                  >
                    {slide.primaryCta.text}
                  </Link>
                  <Link
                    href={slide.secondaryCta.href}
                    target={slide.secondaryCta.href.startsWith('http') ? '_blank' : undefined}
                    rel={slide.secondaryCta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={styles.btnSecondaryOutline}
                  >
                    {slide.secondaryCta.text}
                  </Link>
                </div>
              </div>
            )}

            {/* ── Market-Watch Glassmorphism Panel (Behind Wolf) ── */}
            {slide.textFree && (
              <div className={styles.marketWatchPanel}>
                {/* ── Soft diffused white light streaks & blooms behind glass ── */}
                <div className={styles.glassLightingWrap} aria-hidden="true">
                  <div className={`${styles.lightStreak} ${styles.streak1}`} />
                  <div className={`${styles.lightStreak} ${styles.streak2}`} />
                  <div className={`${styles.lightStreak} ${styles.streak3}`} />
                  <div className={`${styles.glassBloom} ${styles.bloom1}`} />
                  <div className={`${styles.glassBloom} ${styles.bloom2}`} />
                  <div className={`${styles.glassBloom} ${styles.bloom3}`} />
                </div>

                {/* ── Top-Left Heading ── */}
                <div className={styles.panelTopLeft}>
                  <span className={styles.panelDot} aria-hidden="true" />
                  <span className={styles.panelHeading}>
                    EXPLORE <span className={styles.panelAccentGreen}>GLOBAL MARKETS</span>
                  </span>
                </div>

                {/* ── Sliding Front-Facing Cards Marquee (Seamless Triple Groups) ── */}
                <div className={styles.marqueeContainer} aria-hidden="true">
                  <div className={styles.marqueeTrack}>
                    {[0, 1, 2].map((groupIndex) => (
                      <div
                        key={`marquee-group-${groupIndex}`}
                        className={styles.marqueeGroup}
                        aria-hidden={groupIndex > 0 ? 'true' : undefined}
                      >
                        {FRONT_FACING_CARDS.map((card) => (
                          <div key={`g${groupIndex}-${card.id}`} className={styles.assetItem}>
                            <Image
                              src={card.src}
                              alt={card.name}
                              width={257}
                              height={261}
                              className={styles.assetImage}
                              unoptimized
                              priority
                              loading="eager"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Glass Panel Footer with soft top border line & clean vertical separators ── */}
                <div className={styles.panelFooter}>
                  <p className={styles.panelDescription}>
                    Discover a world of trading opportunities across global financial markets.
                  </p>

                  <div className={styles.footerFeatures}>
                    <span className={styles.footerFeatureItem}>1200+ Instruments</span>
                    <span className={styles.vDivider} aria-hidden="true" />
                    <span className={styles.footerFeatureItem}>0.0 Pips Spreads</span>
                    <span className={styles.vDivider} aria-hidden="true" />
                    <span className={styles.footerFeatureItem}>Fast Execution</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── Mascot Artwork ─────────────────────────────── */}
            {slide.imageSrc && (
            <div className={`${styles.heroRight} ${slide.centerImage ? styles.heroRightCenter : ''} ${slide.textFree ? styles.heroRightTextFree : ''}`}>
              <div className={`${styles.imageWrap} ${slide.centerImage ? styles.imageWrapCenter : ''} ${slide.textFree ? styles.imageWrapTextFree : ''}`}>
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  width={1086}
                  height={1448}
                  className={`${styles.mascotImage} ${slide.centerImage ? styles.mascotCenter : ''} ${slide.textFree ? styles.mascotTextFree : ''}`}
                  priority
                />
                <div className={styles.mascotFade} aria-hidden="true" />
              </div>
            </div>
            )}

            {/* ── Bottom Floor Slogans (Slide 1 — Left & Right) ── */}
            {slide.textFree && (
              <>
                <div className={styles.floorSloganLeft}>
                  <span>Trade with </span>
                  <span className={styles.floorAccent}>Trust.</span>
                </div>
                <div className={styles.floorSloganRight}>
                  <span>Trade with </span>
                  <span className={styles.floorAccent}>Confidence.</span>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Carousel Navigation Controls (Outside container on white background) ── */}
      <nav className={styles.carouselNav} aria-label="Hero carousel navigation">
        <button
          type="button"
          className={styles.navArrow}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.indicators} role="tablist" aria-label="Slide indicators">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={idx === currentSlide}
              aria-label={`Go to slide ${idx + 1}`}
              className={`${styles.indicator} ${idx === currentSlide ? styles.indicatorActive : styles.indicatorInactive}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navArrow}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </nav>
    </section>
  )
}
