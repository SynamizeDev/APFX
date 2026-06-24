import type { Metadata } from 'next'
import MarketplaceClient from './MarketplaceClient'

export const metadata: Metadata = {
    title: 'APFX cTrader Marketplace',
    description:
        'Browse professional trading robots, indicators, and plugins through the official cTrader Marketplace.',
}

export default function MarketplacePage() {
    return <MarketplaceClient />
}
