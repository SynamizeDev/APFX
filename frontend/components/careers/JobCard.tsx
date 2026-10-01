import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import type { JobPostingData } from '@/types/careers'
import styles from './Careers.module.css'

export default function JobCard({ job }: { job: JobPostingData }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className={styles.jobCard}
      aria-label={`View job opening for ${job.title}`}
    >
      <div className={styles.jobCardHeader}>
        <span className={styles.jobDepartmentBadge}>{job.department}</span>
        <h3 className={styles.jobCardTitle}>{job.title}</h3>
      </div>

      <div className={styles.jobMetaRow}>
        <span className={styles.jobMetaItem}>
          <MapPin size={14} aria-hidden="true" />
          {job.location} · {job.workplaceType}
        </span>
        <span className={styles.jobMetaDivider} aria-hidden="true">
          |
        </span>
        <span className={styles.jobMetaItem}>
          <Clock size={14} aria-hidden="true" />
          {job.employmentType}
        </span>
      </div>

      <div className={styles.jobCardFooter}>
        <span>View Position</span>
        <span className={styles.viewPositionArrow} aria-hidden="true">
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
}
