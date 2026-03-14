'use client';

import {
  IPOHero,
  WhatIsIPO,
  UpcomingIPOs,
  BenefitsIPOs,
  RisksIPOs,
  HowToApply,
  PastPerformance,
  WhyApplyWithUs,
  IPOCTASection,
} from '@/components/sections/ipo';
import CTABanner from '@/components/sections/CTABanner';

export default function IPOPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <IPOHero />
      <WhatIsIPO />
      <UpcomingIPOs />
      <BenefitsIPOs />
      <RisksIPOs />
      <HowToApply />
      <PastPerformance />
      <WhyApplyWithUs />
      <IPOCTASection />
      <CTABanner />
    </div>
  );
}
