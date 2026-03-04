import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Market Dashboard — Real-time Pricing & Analysis',
    description:
        'Track global markets in real-time with APFX’s institutional dashboard. Live quotes for Forex, Commodities, Indices, Stocks, and Crypto CFDs.',
}

export default function MarketsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
