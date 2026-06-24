import type { Metadata } from 'next'
import MarketplaceClient from './MarketplaceClient'

export const metadata: Metadata = {
    title: 'APFX Marketplace',
    description:
        'Browse professional trading robots, indicators, and plugins through the official APFX Marketplace.',
}

export default function MarketplacePage() {
    return <MarketplaceClient />
}
