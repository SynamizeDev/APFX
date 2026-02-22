import type { Metadata } from 'next'
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider'
import Header from '@/components/layout/Header'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com'),
  title: {
    default: 'APFX — Trade Global Markets with Confidence',
    template: '%s | APFX',
  },
  description:
    'APFX is a premium global trading platform offering Forex, Commodities, Indices, and Metals with deep liquidity, tight spreads, and institutional-grade execution.',
  keywords: ['forex broker', 'CFD trading', 'online trading platform', 'forex trading', 'APFX'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com',
    siteName: 'APFX',
    title: 'APFX — Trade Global Markets with Confidence',
    description: 'Premium global trading platform with deep liquidity, tight spreads, and institutional-grade execution.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'APFX — Global Trading Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APFX — Trade Global Markets with Confidence',
    description: 'Premium global trading platform with institutional-grade execution.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'APFX',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com'}/logo.svg`,
              description: 'Premium global trading platform for Forex, Commodities, Indices, and Metals.',
              sameAs: ['https://twitter.com/apfx', 'https://linkedin.com/company/apfx'],
            }),
          }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          {/*
            Header is ≈72px fixed at top.
            TickerTape is ≈38px fixed at bottom.
          */}
          <Header />
          <main id="main-content" style={{ paddingTop: '72px', paddingBottom: '38px' }}>
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
