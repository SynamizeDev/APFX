import type { Metadata } from 'next'

/* =========================================================
   APFX — Centralised SEO Utilities
   Single source of truth for metadata and JSON-LD
   ========================================================= */

export const siteUrl = 'https://www.apfxglobal.com'

export const defaultOgImage = `${siteUrl}/og-image.jpg`

/* ---------------------------------------------------------
   buildMetadata — consistent page-level Metadata object
   --------------------------------------------------------- */

export interface PageMetaOptions {
  title: string
  description: string
  /** Canonical path, e.g. '/products/forex'. Resolved against siteUrl. */
  path: string
  /** Override OG image (falls back to site-wide OG image) */
  ogImage?: string
  /** Twitter card type (defaults to summary_large_image) */
  twitterCard?: 'summary' | 'summary_large_image'
  /** Additional keywords */
  keywords?: string[]
  /** Set true on pages that should not be indexed (e.g. redirect-only stubs) */
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage = defaultOgImage,
  twitterCard = 'summary_large_image',
  keywords,
  noIndex = false,
}: PageMetaOptions): Metadata {
  const canonicalUrl = `${siteUrl}${path}`

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'APFX',
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — APFX`,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      // site: '@apfx', // Disabled: APFX does not have an X/Twitter account
      // creator: '@apfx',
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

/* ---------------------------------------------------------
   Company Data & Identity Configuration
   Single source of truth for sitewide company data & schema
   --------------------------------------------------------- */

export const COMPANY_INFO = {
  name: 'APFX',
  legalName: 'APFX Global Ltd',
  url: siteUrl,
  logo: `${siteUrl}/android-chrome-512x512.png`,
  description:
    'Institutional-grade global trading platform for Forex, Commodities, Indices, and Metals.',
  foundingDate: '2026',
  supportEmail: 'support@apfxglobal.com',
  supportAvailability: 'Available 24 hours a day, 7 days a week',
  sameAs: [
    'https://www.linkedin.com/company/apfxglobal',
  ],
} as const

/** Sitewide Organization JSON-LD schema */
export function buildOrganizationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${COMPANY_INFO.url}/#organization`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: COMPANY_INFO.url,
    logo: {
      '@type': 'ImageObject',
      url: COMPANY_INFO.logo,
      width: 512,
      height: 512,
    },
    description: COMPANY_INFO.description,
    foundingDate: COMPANY_INFO.foundingDate,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: 'English',
      url: `${COMPANY_INFO.url}/contact`,
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    },
    sameAs: [...COMPANY_INFO.sameAs],
  }
}

/* ---------------------------------------------------------
   JSON-LD Helpers
   --------------------------------------------------------- */

/** BreadcrumbList schema */
export interface BreadcrumbItem {
  name: string
  url: string
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/** WebPage schema */
export function buildWebPageJsonLd({
  title,
  description,
  path,
  breadcrumbs,
}: {
  title: string
  description: string
  path: string
  breadcrumbs?: BreadcrumbItem[]
}): object {
  const url = `${siteUrl}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${siteUrl}/#website` },
    ...(breadcrumbs && {
      breadcrumb: buildBreadcrumbJsonLd(breadcrumbs),
    }),
  }
}

/** Article / BlogPosting schema */
export function buildArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  authorName = 'APFX Editorial Team',
}: {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  authorName?: string
}): object {
  const url = `${siteUrl}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'APFX',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/assets/apfx-icon.png`,
      },
    },
    isPartOf: { '@id': `${siteUrl}/academy/courses#webpage` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
    },
  }
}

/** FinancialProduct / SoftwareApplication schema for calculator tools */
export function buildSoftwareAppJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${siteUrl}${path}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'APFX',
      url: siteUrl,
    },
  }
}
