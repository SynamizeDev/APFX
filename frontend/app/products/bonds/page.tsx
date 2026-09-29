import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import BondsPage from './BondsPage'

export const metadata: Metadata = buildMetadata({
    title: 'Bonds CFD Trading - Government Treasuries | APFX',
    description: 'Trade global government bonds and sovereign debt as CFDs with institutional-grade execution.',
    path: '/products/bonds',
})

export default function ProductsBondsPage() {
    return <BondsPage />
}
