import type { Metadata } from 'next'
import BondsPage from './BondsPage'

export const metadata: Metadata = {
    title: 'Bonds CFD Trading - Government Treasuries | APFX',
    description: 'Trade global government bonds and sovereign debt as CFDs with institutional-grade execution.',
}

export default function ProductsBondsPage() {
    return <BondsPage />
}
