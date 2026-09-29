'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, type Variants } from 'framer-motion'

/* =========================================================
   Direct Imports for Server/Prerendered HTML Content
   ========================================================= */

import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import MarketplaceTeaser from '@/components/sections/MarketplaceTeaser'
import WhyAPFX from '@/components/sections/WhyAPFX'
import TradingPlatforms from '@/components/sections/TradingPlatforms'
import AccountTypes from '@/components/sections/AccountTypes'
import TradingAcademy from '@/components/sections/TradingAcademy'
import DifferenceSection from '@/components/sections/DifferenceSection'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'
import AnimatedSection from '@/components/animations/AnimatedSection'

/* =========================================================
   Isolated Dynamic Browser-Only Components
   ========================================================= */

const GlobalScale = dynamic(() => import('@/components/sections/GlobalScale'), {
  ssr: false, // Heavy / canvas-based section
  loading: () => (
    <div
      style={{
        height: '600px',
        background: 'var(--color-bg)',
      }}
    />
  ),
})

const CTraderPreview = dynamic(() => import('@/components/sections/CTraderPreview'), {
  ssr: false,
})

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
   Home Page Client Component
   ========================================================= */

export default function HomeClient() {
  useEffect(() => {
    document.documentElement.classList.add('home-page')
    return () => document.documentElement.classList.remove('home-page')
  }, [])

  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={pageFade}>
        <HeroSection />
        <AnimatedSection className="bg-alternate-1">
          <StatsBar />
        </AnimatedSection>

        {/* 
        <AnimatedSection>
          <MarketsSection />
        </AnimatedSection>
        */}

        <AnimatedSection>
          <CTraderPreview />
        </AnimatedSection>

        <AnimatedSection className="bg-alternate-2">
          <WhyAPFX />
        </AnimatedSection>

        <AnimatedSection>
          <TradingPlatforms />
        </AnimatedSection>

        <AnimatedSection className="bg-alternate-1">
          <MarketplaceTeaser />
        </AnimatedSection>

        <AnimatedSection>
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
      </motion.div>
    </>
  )
}
