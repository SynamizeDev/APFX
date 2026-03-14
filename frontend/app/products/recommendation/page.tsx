'use client';

import {
  RecHero,
  LatestRecommendations,
  MarketInsights,
  TopPicks,
  ResearchReports,
  PerformanceTracking,
  RiskDisclosure,
  WhyTrustOurResearch,
  RecCTASection,
} from '@/components/sections/recommendations';
import CTABanner from '@/components/sections/CTABanner';

export default function RecommendationPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <RecHero />
      <LatestRecommendations />
      <MarketInsights />
      <TopPicks />
      <ResearchReports />
      <PerformanceTracking />
      <RiskDisclosure />
      <WhyTrustOurResearch />
      <RecCTASection />
      <CTABanner />
    </div>
  );
}
