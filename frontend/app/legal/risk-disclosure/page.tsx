import type { Metadata } from 'next'
import RiskClient from './RiskClient'

export const metadata: Metadata = {
    title: 'Risk Disclosure — APFX',
    description:
        'Trading financial instruments carries significant risk. This disclosure outlines the risks involved and your responsibilities as a trader.',
}

export default function RiskPage() {
    return <RiskClient />
}
