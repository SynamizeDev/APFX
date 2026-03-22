'use client';

import CTABanner from '@/components/sections/CTABanner';
import StocksHero from '@/components/sections/stocks/StocksHero';
import WhatAreStocks from '@/components/sections/stocks/WhatAreStocks';
import TypesOfStocks from '@/components/sections/stocks/TypesOfStocks';
import WhyTradeStocks from '@/components/sections/stocks/WhyTradeStocks';
import EarningsSeasonExplainer from '@/components/sections/stocks/EarningsSeasonExplainer';
import StocksDecisionHook from '@/components/sections/stocks/StocksDecisionHook';
import GlobalMarketCoverage from '@/components/sections/stocks/GlobalMarketCoverage';
import HowItWorks from '@/components/sections/stocks/HowItWorks';
import TradingStrategies from '@/components/sections/stocks/TradingStrategies';
import ComparisonStrip from '@/components/sections/stocks/ComparisonStrip';
import StickyCTA from '@/components/sections/stocks/StickyCTA';
import StocksRiskDisclosure from '@/components/sections/stocks/StocksRiskDisclosure';
import Footer from '@/components/layout/Footer';
import BottomBar from '@/components/layout/BottomBar';
import hubStyles from './stocks-hub.module.css';

export default function StocksPage() {
    return (
        <div className={hubStyles.root}>
            <StocksHero />
            <StocksDecisionHook />
            <WhyTradeStocks />
            <WhatAreStocks />
            <GlobalMarketCoverage />
            <div id="types">
                <TypesOfStocks />
            </div>
            <HowItWorks />
            <TradingStrategies />
            <EarningsSeasonExplainer />
            <ComparisonStrip />
            <StocksRiskDisclosure />
            <CTABanner />
            <StickyCTA />
            <Footer />
            <BottomBar />
        </div>
    );
}
