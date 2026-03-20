'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import ArticleCallout from '../ArticleCallout'
import styles from '../Article.module.css'

const ARTICLES: Record<string, { title: string; description: string; readTime: string; date: string; category: string; body: React.ReactNode }> = {}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

function DefaultBody({ slug }: { slug: string }) {
  return (
    <>
      <p>
        This is a placeholder for the article &ldquo;{slug}&rdquo;. In production, content would be loaded from a CMS or markdown. Below are example tool callouts you can embed in any article.
      </p>
      <h2>Key takeaways</h2>
      <ul>
        <li>Always manage risk with a stop loss.</li>
        <li>Use position sizing so no single trade can wipe out your account.</li>
        <li>Keep a trading journal to improve over time.</li>
      </ul>
      <ArticleCallout tool="risk-management" />
      <p>
        Our risk management tools help you calculate risk per trade, see how much return you need to recover from a drawdown, and estimate the probability of ruin given your win rate and reward-to-risk ratio.
      </p>
      <ArticleCallout tool="pip" />
      <ArticleCallout tool="position-size" message="Try our Position Size Calculator to size your trades based on your account balance and risk per trade." />
      <div className={styles.ctaBlock}>
        <p className={styles.ctaBlockTitle}>Use our tools while you learn</p>
        <div className={styles.ctaBlockLinks}>
          <Link href="/tools/calculators/pip">Pip Calculator</Link>
          <Link href="/tools/calculators/position-size">Position Size Calculator</Link>
          <Link href="/tools/risk-management">Risk Management Tools</Link>
          <Link href="/register">Open Trading Account</Link>
        </div>
      </div>
    </>
  )
}

export default function BlogArticlePage() {
  const params = useParams()
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  const article = slug ? ARTICLES[slug] : null
  const title = article?.title ?? (slug ? slug.replace(/-/g, ' ') : 'Article')
  const description = article?.description ?? 'Trading and investing insights from APFX.'
  const readTime = article?.readTime ?? '5 min'
  const date = article?.date ?? new Date().toISOString().slice(0, 10)
  const category = article?.category ?? 'Trading Basics'
  const body = article?.body ?? <DefaultBody slug={slug} />

  return (
    <article className={styles.wrapper}>
      <Link href="/learn/blog" className={styles.backLink}>
        ← Back to Blog
      </Link>
      <header className={styles.articleHeader}>
        <p className={styles.meta}>
          {category} · {readTime} · <time dateTime={date}>{formatDate(date)}</time>
        </p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>
      <div className={styles.prose}>{body}</div>
    </article>
  )
}
