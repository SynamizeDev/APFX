import type { Metadata } from 'next'
import PlatformsClient from './PlatformsClient'

export const metadata: Metadata = {
    title: 'Trading Platforms — APFX',
    description:
        'Experience institutional-grade trading on our advanced desktop and web platforms. Trade seamlessly on desktop, web, or mobile with APFX.',
}

export default function PlatformsPage() {
    return <PlatformsClient />
}
