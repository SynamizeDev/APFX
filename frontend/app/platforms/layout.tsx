import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Trading Platforms — Institutional Grade Infrastructure',
    description:
        'Access global markets from any device with APFX’s suite of trading platforms. Featuring WebTrader, Mobile Apps, FIX API, and MetaTrader 5 integration.',
}

export default function PlatformsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
