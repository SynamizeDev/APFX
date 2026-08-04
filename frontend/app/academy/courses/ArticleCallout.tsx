'use client'

import Link from 'next/link'
import styles from './Article.module.css'

const TOOLS = {
  pip: { label: 'Pip Calculator', href: '/tools/calculators/pip', message: 'Try our Pip Calculator to see the value of a pip for any pair and lot size.' },
  'position-size': { label: 'Position Size Calculator', href: '/tools/calculators/position-size', message: 'Use our Position Size Calculator to size your trades based on risk and stop loss.' },
  'risk-management': { label: 'Risk Management Tools', href: '/tools/risk-management', message: 'Try our Risk Management Tools to calculate risk per trade, drawdown recovery, and more.' },
} as const

type ToolKey = keyof typeof TOOLS

export default function ArticleCallout({ tool, message }: { tool: ToolKey; message?: string }) {
  const t = TOOLS[tool]
  const text = message ?? t.message
  return (
    <aside className={styles.callout} aria-label="Platform tool">
      <p className={styles.calloutText}>{text}</p>
      <Link href={t.href} className={styles.calloutLink}>
        {t.label} →
      </Link>
    </aside>
  )
}
