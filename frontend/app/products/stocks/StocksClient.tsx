'use client';

import CTABanner from '@/components/sections/CTABanner';
import InnerPageHero from '@/components/layout/InnerPageHero';
import ProductsTabNav from '@/components/navigation/ProductsTabNav';
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

export default function StocksClient() {
    return (
        <div className={hubStyles.root}>
            <InnerPageHero
                title="Institutional"
                accent="Products"
                description="Trade every major market from a single, high-performance platform with deep liquidity and tight spreads."
                breadcrumbs={[{ label: 'Products', href: '/products/range' }, { label: 'Stocks' }]}
            />
            <ProductsTabNav />
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
