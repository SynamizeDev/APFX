'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import {
  ArrowUpRight,
  Star,
  Plus,
  Search,
  Info,
  TrendingUp,
  ShieldCheck,
  Activity,
  Zap,
} from 'lucide-react'
import InvestWithAPFX from '@/components/sections/InvestWithAPFX'
import { useInViewport } from '@/hooks/useInViewport'
import styles from './HeroSection.module.css'

const NAV_LINKS = [
  { label: 'Overview', href: '/' },
  { label: 'Solution', href: '/solution' },
  { label: 'Service', href: '/service' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Business', href: '/business' },
  { label: 'Courses', href: '/learn/courses' },
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
  "> 'Indices'",
]

type HeroAmbientAnimations = {
  tweens: gsap.core.Animation[]
  handleMouseMove: ((e: MouseEvent) => void) | null
}

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const hasLoaded = useRef(false)
  const ambientAnimationsRef = useRef<HeroAmbientAnimations>({
    tweens: [],
    handleMouseMove: null,
  })
  const { isInViewport } = useInViewport({ targetRef: rootRef })
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const onVisibilityChange = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  // Auto-advance only while hero is visible and tab is active
  useEffect(() => {
    if (!isInViewport || !tabVisible) return

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev >= 2 ? 1 : prev + 1))
    }, 6000)
    return () => clearTimeout(timer)
  }, [currentSlide, isInViewport, tabVisible])

  // Main animation driver
  useEffect(() => {
    const targetPercent = -(currentSlide * (100 / 3))
    const currentX = gsap.getProperty(trackRef.current, 'xPercent') as number

    let duration = 1.2

    // If we are moving to Slide 0 and the track is still at clone position, instantly snap it
    if (currentSlide === 0 && currentX <= -65) {
      gsap.set(trackRef.current, { xPercent: 0 })
      duration = 0
    }

    gsap.to(trackRef.current, {
      xPercent: targetPercent,
      duration: duration,
      ease: 'power4.inOut',
      overwrite: 'auto',
      onComplete: () => {
        // Once we hit the clone (slide index 2), silently snap back to 0
        if (currentSlide === 2) {
          gsap.set(trackRef.current, { xPercent: 0 })
          setCurrentSlide(0)
        }
      },
    })

    // Initial entry animation only
    if (currentSlide === 0 && !hasLoaded.current) {
      hasLoaded.current = true
      gsap.fromTo(
        `.${styles.content}`,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }
      )
    }
  }, [currentSlide])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Global initial animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } })

      tl.fromTo(
        `.${styles.heroCard}`,
        { opacity: 0, scale: 0.98, y: 20 },
        { opacity: 1, scale: 1, y: 0, ease: 'expo.out' }
      )
        .fromTo(`.${styles.navContainer}`, { opacity: 0, y: -20 }, { opacity: 1, y: 0 }, '-=0.8')
        .fromTo(
          `.${styles.mockupImageWrapper}`,
          { opacity: 0, x: 50, rotateY: 10 },
          { opacity: 1, x: 0, rotateY: 0, duration: 1.5 },
          '-=1'
        )

      const heroCard = document.querySelector(`.${styles.heroCard}`) as HTMLElement
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroCard) return
        const rect = heroCard.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        heroCard.style.setProperty('--x', `${x}%`)
        heroCard.style.setProperty('--y', `${y}%`)
      }
      ambientAnimationsRef.current.handleMouseMove = handleMouseMove

      const infiniteTweens: gsap.core.Animation[] = [
        gsap.to(`.${styles.mockupImageWrapper}`, {
          y: -15,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          paused: true,
        }),
        gsap.to(`.${styles.cubeLeft}`, {
          y: -30,
          x: 10,
          rotationZ: 5,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          paused: true,
        }),
        gsap.to(`.${styles.cubeRight}`, {
          y: 30,
          x: -10,
          rotationZ: -5,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          paused: true,
        }),
      ]

      const items = gsap.utils.toArray(`.${styles.assetItem}`)
      if (items.length > 0) {
        const loop = gsap.timeline({ repeat: -1, paused: true })
        items.forEach((item) => {
          const target = item as gsap.TweenTarget
          loop
            .fromTo(
              target,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
            )
            .to(target, { y: -20, opacity: 0, duration: 0.8, ease: 'power2.in', delay: 1.5 })
        })
        infiniteTweens.push(loop)
      }

      ambientAnimationsRef.current.tweens = infiniteTweens
    }, rootRef)

    return () => {
      const { handleMouseMove } = ambientAnimationsRef.current
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      ambientAnimationsRef.current = { tweens: [], handleMouseMove: null }
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    const active = isInViewport && tabVisible
    const { tweens, handleMouseMove } = ambientAnimationsRef.current

    tweens.forEach((tween) => {
      if (active) tween.play()
      else tween.pause()
    })

    if (!handleMouseMove) return

    if (active) {
      window.addEventListener('mousemove', handleMouseMove)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isInViewport, tabVisible])

  const renderSlide1 = (isClone = false) => (
    <div
      key={isClone ? 'slide-1-clone' : 'slide-1'}
      className={styles.slideItem}
      aria-hidden={isClone}
    >
      <div className={`${styles.slideBg} ${styles.slideBg1}`} />
      <div className={styles.slideContainer}>
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <h1 className={styles.headline}>
              Smarter Trading.
              <br />
              Faster Execution.
              <br />
              <span className={styles.highlight}>Better Profits.</span>
            </h1>
            <p className={styles.speedTagline}>
              Start trading in <span className={styles.highlight}>3 minutes</span>
            </p>
            <div className={styles.subHeadlineArea}>
              <Link
                href="https://portal.apfxglobal.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.subheadline}
              >
                Trade with APFX
              </Link>
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
                <div className={styles.valueIcon}>
                  <Zap size={14} />
                </div>
                <span>Ultra-fast execution</span>
              </div>
              <div className={styles.valuePoint}>
                <div className={styles.valueIcon}>
                  <ShieldCheck size={14} />
                </div>
                <span>Secure assets</span>
              </div>
              <div className={styles.valuePoint}>
                <div className={styles.valueIcon}>
                  <Activity size={14} />
                </div>
                <span>Real-time analytics</span>
              </div>
            </div>
          </div>

          <div className={styles.contentRight}>
            <div className={styles.mockupImageWrapper}>
              <Image 
                src="/Hero Image Slide 1.png"
                alt="APFX Platforms"
                width={1000}
                height={800}
                className={styles.mockupImage}
                priority
              />
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
              <div
                className={`${styles.slideBg} ${styles.slideBg3}`}
                style={{ backgroundImage: "url('/smooth_pattern.png')" }}
              />
              <div className={`${styles.slideContainer} ${styles.slideCenter}`}>
                {/* 3D Floating Cubes */}
                <div className={`${styles.cube3d} ${styles.cubeLeft}`}>
                  <span>Premium</span>
                </div>
                <div className={`${styles.cube3d} ${styles.cubeSwapFree}`}>
                  <span>Swap Free</span>
                </div>
                <div className={`${styles.cube3d} ${styles.cubeStandard}`}>
                  <span>
                    Standard
                    <br />
                    Account
                  </span>
                </div>

                <div className={styles.slideCenterContent}>
                  <h2 className={styles.slideHeadline}>
                    More Choice.
                    <br />
                    <span className={styles.boldText}>More Control.</span>
                  </h2>
                  <p className={styles.slideSubheadline}>
                    New account types designed to support your trading strategy and execution style.
                  </p>
                  <Link href="/accounts" className={styles.ctaButtonOutline}>
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Slide 1 Clone (Infinite Loop) ── */}
            {renderSlide1(true)}
          </div>
        </div>

        {/* ── Pagination ─────────────────────── */}
        <div className={styles.pagination}>
          {[0, 1].map((idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${currentSlide === idx || (currentSlide === 2 && idx === 0) ? styles.activeDot : ''}`}
              onClick={() => {
                if (currentSlide !== 2) setCurrentSlide(idx)
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
