import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import SupportClient from './SupportClient'

export const metadata: Metadata = buildMetadata({
  title: 'Support Center — APFX Help & Trading Assistance',
  description:
    'Contact the APFX support team 24/5. Get help with account setup, deposits, withdrawals, platform guidance, and institutional trading queries.',
  path: '/support',
  keywords: ['APFX support', 'forex broker help', 'trading support', 'contact APFX'],
})

export default function SupportPage() {
    return <SupportClient />
}
