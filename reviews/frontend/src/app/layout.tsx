import type { Metadata } from 'next';
import '@/styles/globals.css';
import { PreferencesProvider } from '@/context/PreferencesContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://reviews.apfxglobal.com'),
  title: 'APFX Global Reviews | Verified Trader Video Testimonials & Ratings',
  description:
    'Read verified client reviews and watch authentic video testimonials from active forex traders, prop firm investors, and institutional partners on APFX Global.',
  keywords: [
    'APFX Global Reviews',
    'APFX broker testimonials',
    'forex broker reviews',
    'verified trader reviews',
    'APFX rating',
    'trading video testimonials',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reviews.apfxglobal.com',
    siteName: 'APFX Global Reviews',
    title: 'APFX Global Reviews | Real Traders. Real Testimonials.',
    description:
      'Discover unvarnished video reviews and execution ratings directly from APFX Global clients worldwide.',
    images: [
      {
        url: 'https://www.apfxglobal.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'APFX Global Reviews Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@apfx',
    title: 'APFX Global Reviews',
    description: 'Verified trader video testimonials & ratings for APFX Global.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light-mode" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FFFFFF" />

        {/* Prevent Theme Flash on initial page load (defaults to light mode) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('apfx-theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light-mode');}else{document.documentElement.classList.add('light-mode');document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />

        {/* Structured Data: Organization & Review Aggregate */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FinancialProduct',
              name: 'APFX Global Trading Platform',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '520',
                bestRating: '5',
                worstRating: '1',
              },
              publisher: {
                '@type': 'Organization',
                name: 'APFX Global Markets Ltd',
                url: 'https://www.apfxglobal.com',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <PreferencesProvider>
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}
