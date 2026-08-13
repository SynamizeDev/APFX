import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import CTraderClient from './CTraderClient'

export const metadata: Metadata = buildMetadata({
  title: 'cTrader Web Terminal — Trade from Your Browser | APFX',
  description:
    'Access the cTrader Web Terminal directly from your browser with APFX. Advanced charting, real-time data, and institutional-grade execution — no download required.',
  path: '/ctrader',
  keywords: ['cTrader web', 'cTrader terminal', 'web trading platform', 'APFX cTrader'],
})

export default function CTraderPage() {
    return <CTraderClient />
}
