import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stocks Trading',
  description:
    'Trade global stocks with APFX—education, tools, and institutional-style access. CFDs and equities where available.',
}

export default function StocksLayout({ children }: { children: React.ReactNode }) {
  return children
}
