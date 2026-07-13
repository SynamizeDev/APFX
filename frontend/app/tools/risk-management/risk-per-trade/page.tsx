import type { Metadata } from 'next'
import { buildMetadata, buildSoftwareAppJsonLd } from '@/lib/seo'
import RiskPerTradeClient from './RiskPerTradeClient'

export const metadata: Metadata = buildMetadata({
  title: 'Risk Per Trade Calculator — 1% & 2% Rule',
  description:
    'Calculate the exact dollar amount to risk on each trade using the professional 1% or 2% account risk rule. Protect your capital with institutional-grade position risk limits.',
  path: '/tools/risk-management/risk-per-trade',
  keywords: [
    'risk per trade calculator',
    '2% rule trading',
    'position risk calculator',
    'forex risk management',
    'how much to risk per trade',
    'trading risk calculator',
  ],
})

const jsonLd = buildSoftwareAppJsonLd({
  name: 'APFX Risk Per Trade Calculator',
  description:
    'Calculate dollar risk per trade using the 1% or 2% professional trading risk rule.',
  path: '/tools/risk-management/risk-per-trade',
})

export default function RiskPerTradePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RiskPerTradeClient />
    </>
  )
}
