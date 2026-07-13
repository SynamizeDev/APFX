import type { Metadata } from 'next'
import { buildMetadata, buildSoftwareAppJsonLd } from '@/lib/seo'
import RiskPositionSizeClient from './RiskPositionSizeClient'

export const metadata: Metadata = buildMetadata({
  title: 'Risk-Based Position Size Calculator — Lot Size from Risk %',
  description:
    'Calculate the correct lot size for any trade using your account risk percentage, stop loss in pips, and account balance. The institutional approach to position sizing.',
  path: '/tools/risk-management/position-size',
  keywords: [
    'position size calculator',
    'lot size from risk',
    'risk-based position sizing',
    'stop loss position size',
    'professional position sizing',
    'forex lots calculator',
  ],
})

const jsonLd = buildSoftwareAppJsonLd({
  name: 'APFX Risk-Based Position Size Calculator',
  description:
    'Calculate optimal lot size from account risk %, stop loss distance, and account balance.',
  path: '/tools/risk-management/position-size',
})

export default function RiskPositionSizePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RiskPositionSizeClient />
    </>
  )
}
