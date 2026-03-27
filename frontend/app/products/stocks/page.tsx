import type { Metadata } from 'next'
import StocksClient from './StocksClient'

export const metadata: Metadata = {
    title: 'Global Stock CFD Trading - Low Commission Share Trading',
    description:
        'Trade 1000+ global stocks as CFDs with institutional-grade execution. Access NYSE, NASDAQ, and LSE listed shares with competitive pricing.',
}

export default function StocksPage() {
    return <StocksClient />
}
