'use client';

import InvestWithAPFX from '@/components/sections/InvestWithAPFX';
import CTABanner from '@/components/sections/CTABanner';
import StocksHero from '@/components/sections/stocks/StocksHero';
import WhatAreStocks from '@/components/sections/stocks/WhatAreStocks';
import TypesOfStocks from '@/components/sections/stocks/TypesOfStocks';
import WhyTradeStocks from '@/components/sections/stocks/WhyTradeStocks';
import GlobalMarketCoverage from '@/components/sections/stocks/GlobalMarketCoverage';
import HowItWorks from '@/components/sections/stocks/HowItWorks';
import TradingStrategies from '@/components/sections/stocks/TradingStrategies';
import ComparisonStrip from '@/components/sections/stocks/ComparisonStrip';
import StickyCTA from '@/components/sections/stocks/StickyCTA';
import StocksRiskDisclosure from '@/components/sections/stocks/StocksRiskDisclosure';

export default function StocksPage() {
    return (
        <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
            <StocksHero />
            <InvestWithAPFX embedded />
            <WhyTradeStocks />
            <WhatAreStocks />
            <GlobalMarketCoverage />
            <div id="types">
                <TypesOfStocks />
            </div>
            <HowItWorks />
            <TradingStrategies />
            <ComparisonStrip />
            <StocksRiskDisclosure />
            <CTABanner />
            <StickyCTA />
        </div>
    );
}
