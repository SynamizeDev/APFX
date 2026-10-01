import { JobPostingData } from '@/types/careers'

/**
 * APFX Careers Configuration & Centralized Job Inventory
 */

export const CAREERS_EMAIL =
  process.env.CAREERS_EMAIL ||
  process.env.NEXT_PUBLIC_CAREERS_EMAIL ||
  'hr@apfxglobal.com'

export const DEFAULT_CAREERS_SUBJECT = 'Career Opportunity at APFX Global'

export const DEFAULT_CAREERS_BODY = `Hello APFX HR Team,

I am interested in exploring career opportunities with APFX Global.

Please find my resume attached.

Regards,`

/**
 * Generates a clean mailto URL with prefilled subject and body.
 */
export function getCareersMailto(
  subject: string = DEFAULT_CAREERS_SUBJECT,
  body: string = DEFAULT_CAREERS_BODY
): string {
  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  return `mailto:${CAREERS_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`
}

/**
 * Active vacancies repository.
 * Leave empty when there are no open vacancies.
 */
export const JOBS_DATA: JobPostingData[] = []

/**
 * Returns all active/published jobs.
 */
export function getActiveJobs(): JobPostingData[] {
  return JOBS_DATA.filter(
    (job) => !job.status || job.status === 'published'
  )
}

/**
 * Retrieves a single published job by slug.
 */
export function getJobBySlug(slug: string): JobPostingData | undefined {
  return getActiveJobs().find((job) => job.slug === slug)
}

/**
 * Retrieves all slugs for static route generation.
 */
export function getAllJobSlugs(): string[] {
  return getActiveJobs().map((job) => job.slug)
}
