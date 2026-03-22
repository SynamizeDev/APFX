'use client'

import styles from './StocksDecisionHook.module.css'

/** Stocks-only flow: psychological “answer these first” — distinct from commodity macro-open or futures mechanics-open. */

const QUESTIONS = [
  {
    title: 'What are you proving?',
    body: 'A view on a company, a sector, or “the market” via an ETF? The question decides what evidence will count later.',
  },
  {
    title: 'What would make you wrong?',
    body: 'If you cannot name an invalidation, you are not debating the market—you are cheering.',
  },
  {
    title: 'What is your actual holding period?',
    body: 'Day trade, swing, and long-term risk look like different games even on the same symbol.',
  },
]

export default function StocksDecisionHook() {
  return (
    <section className={styles.section} aria-labelledby="decision-hook-heading">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Start with clarity</p>
        <h2 id="decision-hook-heading" className={styles.title}>
          Three answers to pin down before you buy a stock idea
        </h2>
        <p className={styles.lead}>
          Equities hook curiosity with stories. This strip is intentionally boring—because boring prep survives exciting
          headlines better than hype does.
        </p>
        <div className={styles.grid}>
          {QUESTIONS.map(({ title, body }) => (
            <div key={title} className={styles.card}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
