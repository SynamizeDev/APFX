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
  metadataBase: new URL('https://apfxglobal.com'),
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
    url: 'https://apfxglobal.com',
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
    site: '@apfx',
    creator: '@apfx',
    title: 'APFX — Global Trading Platform',
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  },
  manifest: '/site.webmanifest',
}

import GlobalEntry from '@/components/animations/GlobalEntry'
import { RouteFooter, RouteFloatingActions, RouteMain } from '@/components/layout/RouteShell'
import { Analytics } from '@vercel/analytics/next'

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

        {/* Anti-FOUC Script for Entry Animation */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('apfx.globalEntryAnimation.shown') !== '1') {
                  document.documentElement.classList.add('hide-header-initially');
                }
              } catch (e) {}
            `,
          }}
        />

        {/* ── Structured Data (Organization) ───────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${'https://apfxglobal.com'}/#organization`,
              name: 'APFX',
              legalName: 'APFX Global Markets Ltd',
              url: 'https://apfxglobal.com',
              logo: {
                '@type': 'ImageObject',
                url: `${'https://apfxglobal.com'}/android-chrome-512x512.png`,
                width: 512,
                height: 512,
              },
              description:
                'Premium global trading platform for Forex, Commodities, Indices, and Metals.',
              foundingDate: '2020',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                availableLanguage: 'English',
                url: `${'https://apfxglobal.com'}/contact`,
              },
              sameAs: [
                'https://twitter.com/apfx',
                'https://linkedin.com/company/apfx',
              ],
            }),
          }}
        />

        {/* ── Structured Data (WebSite + Sitelinks Searchbox) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${'https://apfxglobal.com'}/#website`,
              name: 'APFX',
              url: 'https://apfxglobal.com',
              description: 'Institutional-grade global trading platform for Forex, Commodities, Indices, and Metals.',
              publisher: {
                '@id': `${'https://apfxglobal.com'}/#organization`,
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${'https://apfxglobal.com'}/academy/blog?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>

      <body>
        <PreferencesProvider>
          <HomeEntryProvider>
            <SmoothScrollProvider>
              <GlobalEntry>
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
                <RouteMain>{children}</RouteMain>
                <RouteFooter />
                <RouteFloatingActions />
              </GlobalEntry>
            </SmoothScrollProvider>
          </HomeEntryProvider>
        </PreferencesProvider>
        <Analytics />
      </body>
    </html>
  )
}