import type { Metadata } from 'next'
import { buildMetadata, buildSoftwareAppJsonLd } from '@/lib/seo'
import PositionSizeCalculatorClient from './PositionSizeCalculatorClient'

export const metadata: Metadata = buildMetadata({
  title: 'Position Size Calculator — Risk-Based Lot Size Calculator',
  description:
    'Determine your optimal position size using account balance and risk percentage. Implements professional 1-2% risk rule. Free Forex position sizing calculator from APFX.',
  path: '/tools/calculators/position-size',
  keywords: [
    'position size calculator',
    'lot size calculator',
    'forex position sizing',
    'risk-based position size',
    'how many lots to trade',
    'position sizing tool',
  ],
})

const jsonLd = buildSoftwareAppJsonLd({
  name: 'APFX Position Size Calculator',
  description:
    'Calculate optimal Forex position size based on account balance, risk percentage, and stop loss distance.',
  path: '/tools/calculators/position-size',
})

export default function PositionSizeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PositionSizeCalculatorClient />
    </>
  )
}
