import type { Metadata } from 'next'
import { buildMetadata, buildSoftwareAppJsonLd } from '@/lib/seo'
import RiskRewardClient from './RiskRewardClient'

export const metadata: Metadata = buildMetadata({
  title: 'Risk/Reward Ratio Calculator — Trade R:R Analysis',
  description:
    'Calculate and visualise your trade risk/reward ratio instantly. Enter entry, stop loss, and take profit levels to determine if a trade meets your minimum 1:2 R:R threshold.',
  path: '/tools/risk-management/risk-reward',
  keywords: [
    'risk reward calculator',
    'risk to reward ratio',
    'R:R calculator',
    'trade risk analysis',
    'reward to risk forex',
    'trading ratio calculator',
  ],
})

const jsonLd = buildSoftwareAppJsonLd({
  name: 'APFX Risk/Reward Ratio Calculator',
  description:
    'Calculate risk/reward ratio from entry, stop loss, and take profit levels for any trade.',
  path: '/tools/risk-management/risk-reward',
})

export default function RiskRewardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RiskRewardClient />
    </>
  )
}
