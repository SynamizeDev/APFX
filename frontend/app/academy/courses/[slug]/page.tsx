import type { Metadata } from 'next'
import { buildMetadata, buildArticleJsonLd } from '@/lib/seo'
import CourseArticleClient from './CourseArticleClient'

/* =========================================================
   Article data store — matches the client-side ARTICLES map.
   In production this would be fetched from a CMS/API.
   ========================================================= */

const ARTICLE_META: Record<
  string,
  { title: string; description: string; datePublished: string; category: string }
> = {
  // Placeholder entries — populate from CMS in production
  'getting-started-with-forex': {
    title: 'Getting Started with Forex Trading',
    description:
      'A complete beginner guide to Forex trading. Learn currency pairs, pips, spreads, and how to place your first trade.',
    datePublished: '2024-01-15',
    category: 'Trading Basics',
  },
  'risk-management-fundamentals': {
    title: 'Risk Management Fundamentals for Traders',
    description:
      'Master the risk management techniques used by professional Forex traders. Stop loss placement, position sizing, and the 2% rule explained.',
    datePublished: '2024-02-01',
    category: 'Risk Management',
  },
  'technical-analysis-guide': {
    title: 'Technical Analysis Guide — Reading Charts Like a Pro',
    description:
      'Learn how to read Forex charts using technical analysis. Support and resistance, trend lines, candlestick patterns, and key indicators.',
    datePublished: '2024-02-20',
    category: 'Technical Analysis',
  },
}

/* =========================================================
   generateMetadata — per-article server metadata
   ========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = ARTICLE_META[slug]

  if (article) {
    return buildMetadata({
      title: article.title,
      description: article.description,
      path: `/academy/courses/${slug}`,
      keywords: [article.category, 'forex trading', 'trading education', 'APFX courses'],
    })
  }

  // Fallback for unknown slugs — generate from slug string
  const humanTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return buildMetadata({
    title: `${humanTitle} — Trading Insights`,
    description: `${humanTitle}: expert trading education and market insights from the APFX team.`,
    path: `/academy/courses/${slug}`,
    keywords: ['trading education', 'forex insights', 'APFX courses'],
  })
}

/* =========================================================
   JSON-LD — Article schema
   ========================================================= */

export default async function CourseArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = ARTICLE_META[slug]

  const title = article?.title ?? slug.replace(/-/g, ' ')
  const description =
    article?.description ?? 'Trading and investing insights from the APFX editorial team.'
  const datePublished = article?.datePublished ?? new Date().toISOString().slice(0, 10)

  const articleJsonLd = buildArticleJsonLd({
    title,
    description,
    path: `/academy/courses/${slug}`,
    datePublished,
    authorName: 'APFX Editorial Team',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <CourseArticleClient slug={slug} />
    </>
  )
}

