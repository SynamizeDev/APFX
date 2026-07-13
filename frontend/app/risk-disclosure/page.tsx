import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import RiskDisclosureClient from './RiskDisclosureClient'

export const metadata: Metadata = buildMetadata({
  // Title excludes "APFX" — template adds it: "Risk Disclosure Statement | APFX"
  title: 'Risk Disclosure Statement',
  description:
    'Official risk disclosure statement for APFX Global Markets. Understand the significant risks of leveraged Forex, CFD, and cryptocurrency trading before you invest.',
  path: '/risk-disclosure',
})

export default function RiskDisclosurePage() {
  return <RiskDisclosureClient />
}
