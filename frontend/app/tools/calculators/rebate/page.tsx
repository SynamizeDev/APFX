import type { Metadata } from 'next'
import { buildMetadata, buildSoftwareAppJsonLd } from '@/lib/seo'
import RebateCalculatorClient from './RebateCalculatorClient'

export const metadata: Metadata = buildMetadata({
  title: 'Forex Rebate Calculator — Estimate Trading Cashback',
  description:
    'Calculate your potential cashback rebates from Forex trading with APFX. Input lot volume and pair to see estimated rebate earnings. Maximise your trading returns.',
  path: '/tools/calculators/rebate',
  keywords: [
    'forex rebate calculator',
    'trading cashback',
    'rebate calculator',
    'forex cashback',
    'IB rebate',
    'trading rebates',
  ],
})

const jsonLd = buildSoftwareAppJsonLd({
  name: 'APFX Forex Rebate Calculator',
  description: 'Estimate your trading cashback rebates based on volume and currency pair.',
  path: '/tools/calculators/rebate',
})

export default function RebateCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RebateCalculatorClient />
    </>
  )
}
