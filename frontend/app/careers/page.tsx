import type { Metadata } from 'next'
import { buildMetadata, buildWebPageJsonLd, siteUrl } from '@/lib/seo'
import { getActiveJobs } from '@/config/careers'
import CareersHero from '@/components/careers/CareersHero'
import WhyApfxSection from '@/components/careers/WhyApfxSection'
import LifeAtApfxSection from '@/components/careers/LifeAtApfxSection'
import OpenPositionsSection from '@/components/careers/OpenPositionsSection'
import JoinApfxSection from '@/components/careers/JoinApfxSection'
import styles from '@/components/careers/Careers.module.css'

export const metadata: Metadata = buildMetadata({
  title: 'Careers at APFX Global | Join Our Team',
  description:
    'Explore career opportunities at APFX Global and join a team building innovative technology, products and experiences for the global trading industry.',
  path: '/careers',
  keywords: [
    'APFX careers',
    'trading technology jobs',
    'fintech careers',
    'forex broker jobs',
    'quantitative trading roles',
    'APFX global hiring',
  ],
})

export default function CareersPage() {
  const jobs = getActiveJobs()

  const webPageJsonLd = buildWebPageJsonLd({
    title: 'Careers at APFX Global | Join Our Team',
    description:
      'Explore career opportunities at APFX Global and join a team building innovative technology, products and experiences for the global trading industry.',
    path: '/careers',
    breadcrumbs: [
      { name: 'Home', url: siteUrl },
      { name: 'Careers', url: `${siteUrl}/careers` },
    ],
  })

  return (
    <>
      {/* ── Structured Data (WebPage + BreadcrumbList) ──────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <main className={styles.pageWrapper} id="main-content">
        {/* 1. Hero Section */}
        <CareersHero />

        {/* 2. Why APFX Section */}
        <WhyApfxSection />

        {/* 3. Life at APFX / Culture */}
        <LifeAtApfxSection />

        {/* 4. Open Positions */}
        <OpenPositionsSection jobs={jobs} />

        {/* 5. Join APFX Recruitment CTA */}
        <JoinApfxSection />
      </main>
    </>
  )
}
