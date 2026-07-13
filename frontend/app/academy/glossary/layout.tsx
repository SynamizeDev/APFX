import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Trading & Forex Glossary — Key Terms Explained',
  description:
    'A comprehensive glossary of Forex, CFD, and investing terms. Look up pips, leverage, margin, spread, stop loss, take profit, and 200+ other trading concepts explained simply.',
  path: '/academy/glossary',
  keywords: [
    'forex glossary',
    'trading terms',
    'forex dictionary',
    'pip definition',
    'leverage meaning',
    'margin call',
    'CFD terms',
  ],
})

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
