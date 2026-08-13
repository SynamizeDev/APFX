import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import PammClient from './PammClient'

export const metadata: Metadata = buildMetadata({
  title: 'PAMM Accounts — Percentage Allocation Management | APFX',
  description:
    'Institutional-grade PAMM (Percentage Allocation Management Module) infrastructure for transparent strategy participation and professional capital distribution.',
  path: '/pamm',
  keywords: ['PAMM account', 'PAMM trading', 'fund manager forex', 'APFX PAMM', 'managed accounts'],
})

export default function PammPage() {
    return <PammClient />
}
