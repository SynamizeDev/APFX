'use client'

import { ArrowRight } from 'lucide-react'
import type { JobPostingData } from '@/types/careers'
import JobCard from './JobCard'
import styles from './Careers.module.css'

interface OpenPositionsSectionProps {
  jobs: JobPostingData[]
}

export default function OpenPositionsSection({ jobs }: OpenPositionsSectionProps) {
  const scrollToJoin = () => {
    const el = document.getElementById('join-apfx')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const hasJobs = jobs && jobs.length > 0

  return (
    <section
      id="open-positions"
      className={styles.sectionPositions}
      aria-labelledby="open-positions-heading"
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 id="open-positions-heading" className={styles.sectionHeading}>
            OPEN POSITIONS
          </h2>
          <p className={styles.sectionSubtext}>
            Find the role where you can make an impact.
          </p>
        </div>

        {hasJobs ? (
          <div className={styles.positionsGrid}>
            {jobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyStateContainer}>
            <h3 className={styles.emptyStateTitle}>NO OPEN ROLES RIGHT NOW.</h3>
            <p className={styles.emptyStateText}>
              We&apos;re always interested in meeting talented people. Check back soon for new
              opportunities at APFX.
            </p>
            <button
              type="button"
              className={styles.ctaPrimary}
              onClick={scrollToJoin}
              id="empty-state-send-profile-btn"
            >
              SEND YOUR PROFILE
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
