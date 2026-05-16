import type { Metadata } from 'next'
import ForexPage from './ForexPage'

export const metadata: Metadata = {
    title: 'Forex CFD Trading - institutional Spreads | APFX',
    description: 'Trade 70+ currency pairs with institutional-grade liquidity and raw spreads starting from 0.0 pips.',
}

export default function ProductsForexPage() {
    return <ForexPage />
}
