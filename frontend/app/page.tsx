'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import EntryAnimation from '@/components/sections/EntryAnimation'

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  ssr: true, // We want the shell to be SEO friendly
  loading: () => <div style={{ height: '80vh', background: 'var(--color-bg)' }} />
})

const GlobalScale = dynamic(() => import('@/components/sections/GlobalScale'), {
  ssr: false,
  loading: () => <div style={{ height: '600px', background: 'var(--color-bg)' }} />
})

import StatsBar from '@/components/sections/StatsBar'
import MarketsSection from '@/components/sections/MarketsSection'
import WhyAPFX from '@/components/sections/WhyAPFX'
import TradingPlatforms from '@/components/sections/TradingPlatforms'
import AccountTypes from '@/components/sections/AccountTypes'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'

export default function HomePage() {
  const [showAnimation, setShowAnimation] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Always show animation on load/refresh as per user request
    setShowAnimation(true)
  }, [])

  const handleAnimationComplete = () => {
    setShowAnimation(false)
    setReady(true)
  }

  return (
    <>
      {showAnimation && <EntryAnimation onComplete={handleAnimationComplete} />}

      {/* 
        Visible only after animation completes (or if already played). 
        Using conditional rendering for the whole main content 
        to ensure no layout shift or partial renders.
      */}
      {ready && (
        <>
          <HeroSection />
          <StatsBar />
          <MarketsSection />
          <WhyAPFX />
          <TradingPlatforms />
          <AccountTypes />
          <GlobalScale />
          <Testimonials />
          <CTABanner />
          <Footer />
          <BottomBar />
        </>
      )}
    </>
  )
}
