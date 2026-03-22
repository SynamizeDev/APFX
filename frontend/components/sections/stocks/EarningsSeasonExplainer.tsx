'use client'

import styles from './EarningsSeasonExplainer.module.css'

const PHASES = [
  {
    title: 'Pre-announcement',
    body: 'Traders often watch guidance ranges and consensus estimates—surprises can increase volatility around the report.',
  },
  {
    title: 'The report',
    body: 'Revenue, margins, and forward-looking commentary can move single names more than broad indices.',
  },
  {
    title: 'After-hours & drift',
    body: 'Liquidity and spreads can differ outside regular sessions; gaps between sessions are a common risk theme.',
  },
]

export default function EarningsSeasonExplainer() {
  return (
    <section className={styles.section} aria-labelledby="earnings-season-heading">
      <div className={styles.container}>
        <h2 id="earnings-season-heading" className={styles.title}>
          Earnings season (stocks-only rhythm)
        </h2>
        <p className={styles.lead}>
          Unlike commodities or 24/7 crypto, single-stock CFDs and equities often revolve around scheduled company
          reports. This section is unique to the stocks hub—use it to think about event risk, not to time the market.
        </p>
        <div className={styles.grid}>
          {PHASES.map(({ title, body }) => (
            <div key={title} className={styles.card}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          Educational only: APFX does not provide investment advice. Past volatility around earnings does not predict
          future results.
        </p>
      </div>
    </section>
  )
}
