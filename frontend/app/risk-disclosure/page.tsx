import type { Metadata } from 'next'
import RiskDisclosureClient from './RiskDisclosureClient'

export const metadata: Metadata = {
    title: 'Compliance & Risk Disclosure - APFX Trading Safety',
    description:
        'Crucial risk warnings and disclosures related to CFD and Margin trading. Understand the market, technical, and operational risks before you invest.',
}

export default function RiskDisclosurePage() {
    return <RiskDisclosureClient />
}
