import type { Metadata } from 'next'
import PlatformsClient from './PlatformsClient'

export const metadata: Metadata = {
    title: 'Institutional Trading Platforms - Desktop, Web & Mobile',
    description:
        'Access the markets via our Advanced Web Terminal, TradingView integration, and native mobile apps. High-speed, low-latency execution for serious traders.',
}

export default function PlatformsPage() {
    return <PlatformsClient />
}
