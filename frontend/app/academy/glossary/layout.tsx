import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'

export const metadata: Metadata = {
  title: 'Trading & Investing Glossary',
  description:
    'Definitions of key Forex, trading, and investing terms. Search and browse our glossary to understand pips, leverage, margin, stop loss, and more.',
  openGraph: {
    title: 'Trading & Investing Glossary | APFX',
    description: 'Key trading and financial terms explained for beginners and active traders.',
  },
}

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
      <BottomBar />
    </>
  )
}
