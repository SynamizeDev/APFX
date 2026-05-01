'use client'

import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import EntryAnimation from '@/components/sections/EntryAnimation'

/* =========================================================
   Dynamic Imports — SEO-safe & performance-aware
   ========================================================= */

const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection'),
  {
    ssr: true, // Keep SEO shell intact
    loading: () => (
      <div
        style={{
          height: '80vh',
          background: 'var(--color-bg)',
        }}
      />
    ),
  }
)

const GlobalScale = dynamic(
  () => import('@/components/sections/GlobalScale'),
  {
    ssr: false, // Heavy / canvas-based section
    loading: () => (
      <div
        style={{
          height: '600px',
          background: 'var(--color-bg)',
        }}
      />
    ),
  }
)

const StatsBar = dynamic(() => import('@/components/sections/StatsBar'), { ssr: true })
const MarketsSection = dynamic(() => import('@/components/sections/MarketsSection'), { ssr: true })
const WhyAPFX = dynamic(() => import('@/components/sections/WhyAPFX'), { ssr: true })
const TradingPlatforms = dynamic(() => import('@/components/sections/TradingPlatforms'), { ssr: true })
const AccountTypes = dynamic(() => import('@/components/sections/AccountTypes'), { ssr: true })
const TradingAcademy = dynamic(() => import('@/components/sections/TradingAcademy'), { ssr: true })
const DifferenceSection = dynamic(() => import('@/components/sections/DifferenceSection'), { ssr: true })
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true })
const CTABanner = dynamic(() => import('@/components/sections/CTABanner'), { ssr: true })

/* =========================================================
   Static Components
   ========================================================= */

import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import AnimatedSection from '@/components/animations/AnimatedSection'
import { useHomeEntryNavigation } from '@/context/HomeEntryContext'

/* =========================================================
   Motion Presets — subtle, confidence-led
   ========================================================= */

const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
}

/* =========================================================
   Home Page
   ========================================================= */

export default function HomePage() {
  const { skipHomeEntryAnimation } = useHomeEntryNavigation()

  // IMPORTANT (hydration): do not read browser-only values during initial render.
  // First render must match server output; then we decide in an effect.
  const [showAnimation, setShowAnimation] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('home-page')
    return () => document.documentElement.classList.remove('home-page')
  }, [])

  useEffect(() => {
    // Skip when arriving to home via client-side navigation (e.g., clicking the logo).
    if (skipHomeEntryAnimation) {
      setShowAnimation(false)
      setReady(true)
      return
    }

    const key = 'apfx.homeEntryAnimation.shown'

    const nav = performance.getEntriesByType?.('navigation')?.[0] as
      | PerformanceNavigationTiming
      | undefined
    const navType = nav?.type

    // Always show on hard reload.
    if (navType === 'reload') {
      setShowAnimation(true)
      setReady(false)
      return
    }

    // Only show once per tab session on normal navigation.
    let shouldShow = true
    try {
      shouldShow = sessionStorage.getItem(key) !== '1'
    } catch {
      shouldShow = true
    }

    setShowAnimation(shouldShow)
    setReady(!shouldShow)
  }, [skipHomeEntryAnimation])

  const handleReadyToReveal = useCallback(() => {
    setReady(true)
  }, [])

  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false)
    setReady(true) // Ensure ready is true if not already

    try {
      sessionStorage.setItem('apfx.homeEntryAnimation.shown', '1')
    } catch {
      // ignore
    }
  }, [])

  return (
    <>
      {/* Prevent a flash of content before we decide animation vs reveal */}
      {!ready && !showAnimation && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9996,
            background: '#03050A',
          }}
        />
      )}

      {/* ── Entry Animation ───────────────────────────── */}
      <AnimatePresence>
        {showAnimation && (
          <EntryAnimation 
            onComplete={handleAnimationComplete} 
            onReadyToReveal={handleReadyToReveal}
          />
        )}
      </AnimatePresence>

      {/* ── Main Experience ───────────────────────────── */}
      {ready && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={pageFade}
          >
            <HeroSection />
            <AnimatedSection className="bg-alternate-1">
              <StatsBar />
            </AnimatedSection>

            <AnimatedSection>
              <MarketsSection />
            </AnimatedSection>

            <AnimatedSection className="bg-alternate-2">
              <WhyAPFX />
            </AnimatedSection>

            <AnimatedSection>
              <TradingPlatforms />
            </AnimatedSection>

            <AnimatedSection className="bg-alternate-1">
              <AccountTypes />
            </AnimatedSection>

            <AnimatedSection>
              <GlobalScale />
            </AnimatedSection>

            <AnimatedSection className="bg-alternate-2">
              <TradingAcademy />
            </AnimatedSection>

            <AnimatedSection>
              <DifferenceSection />
            </AnimatedSection>

            <AnimatedSection className="bg-alternate-1">
              <Testimonials />
            </AnimatedSection>

            <AnimatedSection>
              <CTABanner />
            </AnimatedSection>
            <Footer />
            {!showAnimation && <BottomBar />}
          </motion.div>
        </>
      )}
    </>
  )
}