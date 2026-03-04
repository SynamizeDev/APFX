import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About APFX — Pioneering Institutional Trading',
    description:
        'Discover the mission, technology, and global infrastructure behind APFX. We are dedicated to providing traders with institutional-grade liquidity and advanced trading tools.',
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
