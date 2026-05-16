import type { Metadata } from 'next'
import RangePage from './RangePage'

export const metadata: Metadata = {
    title: 'Range of Products - Global Market Access | APFX',
    description: 'Explore the full range of institutional trading products at APFX, including Forex, Stocks, Commodities, Indices, and more.',
}

export default function ProductsRangePage() {
    return <RangePage />
}
