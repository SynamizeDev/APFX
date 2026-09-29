import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import SupportClient from './SupportClient'

export const metadata: Metadata = buildMetadata({
  title: 'Support Center — APFX Help & 24/7 Support',
  description:
    'Contact the APFX support team. Available 24 hours a day, 7 days a week. Get help with account setup, deposits, withdrawals, platform guidance, and institutional trading queries.',
  path: '/support',
  keywords: ['APFX support', 'forex broker help', 'trading support', 'contact APFX'],
})

export default function SupportPage() {
    return <SupportClient />
}
