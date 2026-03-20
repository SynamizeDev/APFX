'use client';
import InvestWithAPFX from '@/components/sections/InvestWithAPFX';
import CTABanner from '@/components/sections/CTABanner';
import {
    StocksHero,
    WhatAreStocks,
    TypesOfStocks,
    StocksRiskDisclosure,
} from '@/components/sections/stocks';

export default function StocksPage() {
    return (
        <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
            <StocksHero />
            <WhatAreStocks />
            <TypesOfStocks />
            <InvestWithAPFX />
            <StocksRiskDisclosure />
            <CTABanner />
        </div>
    );
}
