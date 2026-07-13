import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Trading Account Types — Standard, Raw & Professional',
  description:
    'Choose the APFX account that fits your trading style. Commission-free Standard accounts for beginners, ultra-low spread Raw accounts for professionals, and VIP institutional tiers.',
  path: '/accounts',
  keywords: [
    'forex account types',
    'trading account',
    'raw spread account',
    'standard forex account',
    'ECN account',
    'APFX accounts',
  ],
})

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
