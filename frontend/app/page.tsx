'use client'

import { useState, useEffect } from 'react'
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

/* =========================================================
   Static Sections
   ========================================================= */

import StatsBar from '@/components/sections/StatsBar'
import MarketsSection from '@/components/sections/MarketsSection'
import WhyAPFX from '@/components/sections/WhyAPFX'
import TradingPlatforms from '@/components/sections/TradingPlatforms'
import AccountTypes from '@/components/sections/AccountTypes'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import AnimatedSection from '@/components/animations/AnimatedSection'

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
  const [showAnimation, setShowAnimation] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    /**
     * As requested:
     * Always show entry animation on load / refresh.
     * This ensures a controlled, cinematic first impression.
     */
    setShowAnimation(true)
  }, [])

  const handleAnimationComplete = () => {
    setShowAnimation(false)
    setReady(true)
  }

  return (
    <>
      {/* ── Entry Animation ───────────────────────────── */}
      <AnimatePresence>
        {showAnimation && (
          <EntryAnimation onComplete={handleAnimationComplete} />
        )}
      </AnimatePresence>

      {/* ── Main Experience ─────────────────────────────
          Rendered only after animation completes to:
          • avoid layout shift
          • preserve visual authority
          • ensure intentional reveal
      --------------------------------------------------- */}
      {ready && (
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
            <Testimonials />
          </AnimatedSection>

          <AnimatedSection>
            <CTABanner />
          </AnimatedSection>

          <Footer />
          <BottomBar />
        </motion.div>
      )}
    </>
  )
}