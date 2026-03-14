import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trading & Investing Insights | Blog',
  description:
    'Trading education, strategies, market insights, and platform guides. Learn Forex, technical analysis, risk management, and how to use our trading tools.',
  openGraph: {
    title: 'Trading & Investing Insights | APFX Blog',
    description: 'Expert guides on trading, Forex, risk management, and platform tools.',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
