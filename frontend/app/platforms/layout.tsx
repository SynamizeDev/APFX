import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Trading Platforms — Institutional Grade Infrastructure',
    description:
        'Access global markets from any device with APFX’s suite of trading platforms. Featuring Advanced Web Terminal, TradingView Integration, WebTrader, and Mobile Apps.',
}

export default function PlatformsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
