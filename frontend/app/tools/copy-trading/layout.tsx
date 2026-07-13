import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import StatsBar from '@/components/sections/StatsBar'

export const metadata: Metadata = buildMetadata({
  title: 'Copy Trading — Mirror Expert Traders Automatically',
  description:
    'Copy the positions of proven traders with APFX Copy Trading. Replicate institutional-grade strategies automatically and participate in markets without manual analysis.',
  path: '/tools/copy-trading',
  keywords: [
    'copy trading',
    'mirror trading',
    'social trading',
    'APFX copy trading',
    'automated trading',
    'copy expert traders',
  ],
})

/**
 * Copy-trading is outside calculators/risk-management layouts.
 * Renders the global stats strip below the page content.
 */
export default function CopyTradingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <StatsBar />
    </>
  )
}
