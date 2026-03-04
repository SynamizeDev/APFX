import type { Metadata } from 'next'
import PlatformsClient from './PlatformsClient'

export const metadata: Metadata = {
    title: 'Trading Platforms — APFX',
    description:
        'Experience institutional-grade trading on MT4, MT5, and WebTrader. Trade seamlessly on desktop, web, or mobile with APFX.',
}

export default function PlatformsPage() {
    return <PlatformsClient />
}
