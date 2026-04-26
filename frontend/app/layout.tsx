import type { Metadata } from 'next'
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider'
import Header from '@/components/layout/Header'
import '@/styles/globals.css'
import { PreferencesProvider } from '@/context/PreferencesContext'
import { HomeEntryProvider } from '@/context/HomeEntryContext'

/* =========================================================
   APFX — Root Layout
   Institutional-grade global shell
   ========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com'),
  title: {
    default: 'APFX',
    template: '%s | APFX',
  },
  description:
    'APFX is a premium global trading platform offering Forex, Commodities, Indices, and Metals with deep liquidity, tight spreads, and institutional-grade execution.',
  keywords: [
    'forex broker',
    'CFD trading',
    'online trading platform',
    'forex trading',
    'APFX',
    'institutional trading',
    'global markets',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com',
    siteName: 'APFX',
    title: 'APFX',
    description:
      'Premium global trading platform with deep liquidity, tight spreads, and institutional-grade execution.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'APFX — Global Trading Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APFX',
    description:
      'Premium global trading platform with institutional-grade execution.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

import PageTransition from '@/components/animations/PageTransition'
import ChatWidget from '@/components/ui/ChatWidget'
import PreferencesPanel from '@/components/ui/PreferencesPanel'
import RouteBreadcrumbs from '@/components/layout/RouteBreadcrumbs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ── Performance & Fonts ───────────────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#03050A" />

        {/* ── Structured Data (Organization) ───────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'APFX',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://apfx.com'
                }/logo.svg`,
              description:
                'Premium global trading platform for Forex, Commodities, Indices, and Metals.',
              sameAs: [
                'https://twitter.com/apfx',
                'https://linkedin.com/company/apfx',
              ],
            }),
          }}
        />
      </head>

      <body>
        <PreferencesProvider>
          <HomeEntryProvider>
            <SmoothScrollProvider>
              {/*
            ───────────────────────────────────────────────
            Global Layout Notes
            Header: ~72px fixed at top
            BottomBar / Ticker: ~38px fixed at bottom
            Padding is applied to main to preserve layout
            and scroll integrity with smooth scrolling.
            ───────────────────────────────────────────────
          */}
              <Header />
              <main
                id="main-content"
                style={{
                  paddingTop: '72px',
                  paddingBottom: '38px',
                  position: 'relative',
                  isolation: 'isolate',
                }}
              >
                <RouteBreadcrumbs />
                <PageTransition>{children}</PageTransition>
                <ChatWidget />
                <PreferencesPanel />
              </main>
            </SmoothScrollProvider>
          </HomeEntryProvider>
        </PreferencesProvider>
      </body>
    </html>
  )
}