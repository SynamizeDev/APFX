'use client'

import { ArrowDown, Users } from 'lucide-react'
import styles from './Careers.module.css'

export default function CareersHero() {
  const scrollToPositions = () => {
    const el = document.getElementById('open-positions')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToCulture = () => {
    const el = document.getElementById('life-at-apfx')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className={styles.heroSection} aria-labelledby="careers-hero-heading">
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroGridPattern} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            CAREERS AT APFX
          </div>

          <h1 id="careers-hero-heading" className={styles.heroHeadline}>
            BUILD THE FUTURE
            <span className={styles.headlineAccent}>OF TRADING WITH US.</span>
          </h1>

          <p className={styles.heroDescription}>
            We&apos;re building a faster, smarter and more client-focused trading experience for a
            global market. Join a team that values ownership, ideas and execution.
          </p>

          <div className={styles.heroCtas}>
            <button
              type="button"
              className={styles.ctaPrimary}
              onClick={scrollToPositions}
              id="hero-view-open-positions-btn"
            >
              View Open Positions
              <ArrowDown size={16} aria-hidden="true" />
            </button>

            <button
              type="button"
              className={styles.ctaSecondary}
              onClick={scrollToCulture}
              id="hero-life-at-apfx-btn"
            >
              <Users size={16} aria-hidden="true" />
              Life at APFX
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
