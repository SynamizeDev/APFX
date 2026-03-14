'use client';

import {
    MFHero,
    WhatAreMF,
    TypesOfMF,
    BenefitsMF,
    SIPSection,
    FeaturedFunds,
    InvestmentProcess,
    WhyInvestWithUs,
    EducationalMF,
    MFCTASection,
} from '@/components/sections/mutual-funds';
import CTABanner from '@/components/sections/CTABanner';

export default function MutualFundsPage() {
    return (
        <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
            <MFHero />
            <WhatAreMF />
            <TypesOfMF />
            <BenefitsMF />
            <SIPSection />
            <FeaturedFunds />
            <InvestmentProcess />
            <WhyInvestWithUs />
            <EducationalMF />
            <MFCTASection />
            <CTABanner />
        </div>
    );
}
