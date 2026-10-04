import Link from 'next/link'
import Image from 'next/image'
import StatsBar from '@/components/sections/StatsBar'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroInner}>

        {/* ── Left ───────────────────────────────────────── */}
        <div className={styles.heroLeft}>
          <h1 className={styles.headline}>
            Trade what moves.<br />
            <span className={styles.accent}>Keep what you earn.</span>
          </h1>

          <p className={styles.body}>
          Raw spreads. Ultra-fast execution. Built around your edge.
          </p>

          <div className={styles.ctas}>
            <Link
              href="https://portal.apfxglobal.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Open Live Account
            </Link>
            <Link href="/company/about-us" className={styles.btnSecondary}>
              Why APFX →
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className={styles.trustLine}>
            <span className={styles.trustItem}>15-Min Withdrawals</span>
            <span className={styles.trustDot}>·</span>
            <span className={styles.trustItem}>Tier-1 Segregated Accounts</span>
            <span className={styles.trustDot}>·</span>
            <span className={styles.trustItem}>Raw Spreads from 0.0 Pips</span>
          </div>
        </div>

        {/* ── Right ──────────────────────────────────────── */}
        <div className={styles.heroRight}>
          <div className={styles.imageWrap}>
            <Image
              src="/fox-mob.png"
              alt="APFX Fox Mascot"
              width={1086}
              height={1448}
              className={styles.mascotImage}
              priority
            />
            <div className={styles.mascotFade} aria-hidden="true" />
          </div>
        </div>

      </div>

      {/* Docked bottom statistics strip — touches 100vh on first load */}
      <StatsBar />
    </section>
  )
}

