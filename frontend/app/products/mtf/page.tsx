'use client';

import {
  MTFHero,
  WhatIsMTF,
  BenefitsMTF,
  ExampleMTF,
  EligibleStocks,
  RisksMTF,
  ChargesMTF,
  HowToActivate,
  RiskDisclaimer,
  MTFCTASection,
} from '@/components/sections/mtf';
import CTABanner from '@/components/sections/CTABanner';

export default function MTFPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <MTFHero />
      <WhatIsMTF />
      <BenefitsMTF />
      <ExampleMTF />
      <EligibleStocks />
      <RisksMTF />
      <ChargesMTF />
      <HowToActivate />
      <RiskDisclaimer />
      <MTFCTASection />
      <CTABanner />
    </div>
  );
}
