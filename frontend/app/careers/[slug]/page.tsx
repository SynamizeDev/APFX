import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Clock, Briefcase, Calendar, Mail, ArrowRight } from 'lucide-react'
import { getActiveJobs, getJobBySlug, getAllJobSlugs, CAREERS_EMAIL, getCareersMailto } from '@/config/careers'
import { buildMetadata, buildJobPostingJsonLd, buildBreadcrumbJsonLd, siteUrl } from '@/lib/seo'
import styles from '@/components/careers/Careers.module.css'

interface JobDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllJobSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)

  if (!job) {
    return buildMetadata({
      title: 'Job Not Found',
      description: 'The requested job opening could not be found at APFX Global.',
      path: `/careers/${slug}`,
      noIndex: true,
    })
  }

  return buildMetadata({
    title: `${job.title} — Careers`,
    description: job.description.slice(0, 155),
    path: `/careers/${job.slug}`,
    keywords: [
      job.title,
      job.department,
      'APFX careers',
      'trading jobs',
      `${job.location} careers`,
    ],
  })
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params
  const job = getJobBySlug(slug)

  if (!job) {
    notFound()
  }

  const jobJsonLd = buildJobPostingJsonLd(job)
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteUrl },
    { name: 'Careers', url: `${siteUrl}/careers` },
    { name: job.title, url: `${siteUrl}/careers/${job.slug}` },
  ])

  const applicationMailto = getCareersMailto(
    `Application for ${job.title} — APFX Global`,
    `Hello APFX HR Team,\n\nI am writing to apply for the ${job.title} position at APFX Global.\n\nPlease find my resume attached.\n\nRegards,`
  )

  return (
    <>
      {/* ── Structured Data (JobPosting + BreadcrumbList) ──── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <main className={styles.pageWrapper} id="main-content">
        {/* Header / Hero */}
        <section className={styles.jobDetailHero}>
          <div className={styles.container}>
            {/* Breadcrumb Navigation */}
            <nav className={styles.jobBreadcrumbs} aria-label="Breadcrumb">
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <span className={styles.breadcrumbSeparator} aria-hidden="true">
                /
              </span>
              <Link href="/careers" className={styles.breadcrumbLink}>
                Careers
              </Link>
              <span className={styles.breadcrumbSeparator} aria-hidden="true">
                /
              </span>
              <span style={{ color: 'var(--color-text-1)' }} aria-current="page">
                {job.title}
              </span>
            </nav>

            <h1 className={styles.jobDetailTitle}>{job.title}</h1>

            <div className={styles.jobDetailMetaBadges}>
              <span className={`${styles.metaBadge} ${styles.metaBadgeAccent}`}>
                <Briefcase size={14} aria-hidden="true" />
                {job.department}
              </span>
              <span className={styles.metaBadge}>
                <MapPin size={14} aria-hidden="true" />
                {job.location} · {job.workplaceType}
              </span>
              <span className={styles.metaBadge}>
                <Clock size={14} aria-hidden="true" />
                {job.employmentType}
              </span>
              <span className={styles.metaBadge}>
                <Calendar size={14} aria-hidden="true" />
                Posted: {job.postedDate}
              </span>
            </div>
          </div>
        </section>

        {/* Job Details & Application Split */}
        <section className={styles.jobDetailBodySection}>
          <div className={styles.container}>
            <div className={styles.jobDetailLayout}>
              {/* Job Specification */}
              <div className={styles.jobContentBlock}>
                {/* About the Role */}
                <div className={styles.jobSectionBlock}>
                  <h2 className={styles.jobSectionBlockTitle}>About The Role</h2>
                  <p className={styles.jobTextContent}>{job.description}</p>
                </div>

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className={styles.jobSectionBlock}>
                    <h2 className={styles.jobSectionBlockTitle}>What You Will Do</h2>
                    <ul className={styles.jobBulletList}>
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className={styles.jobBulletItem}>
                          <span className={styles.jobBulletDot} aria-hidden="true" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className={styles.jobSectionBlock}>
                    <h2 className={styles.jobSectionBlockTitle}>What We Look For</h2>
                    <ul className={styles.jobBulletList}>
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className={styles.jobBulletItem}>
                          <span className={styles.jobBulletDot} aria-hidden="true" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nice to Have */}
                {job.niceToHave && job.niceToHave.length > 0 && (
                  <div className={styles.jobSectionBlock}>
                    <h2 className={styles.jobSectionBlockTitle}>Nice To Have</h2>
                    <ul className={styles.jobBulletList}>
                      {job.niceToHave.map((nth, idx) => (
                        <li key={idx} className={styles.jobBulletItem}>
                          <span className={styles.jobBulletDot} aria-hidden="true" />
                          <span>{nth}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar Application Card */}
              <div className={styles.jobSidebarSticky}>
                <div className={styles.recruitmentCard}>
                  <h3 className={styles.recruitmentCardTitle}>APPLY FOR THIS ROLE</h3>
                  <p className={styles.recruitmentCardText}>
                    Send your resume and a brief introductory note directly to our hiring team.
                  </p>

                  <div className={styles.recruitmentEmailBox}>
                    <span className={styles.recruitmentEmailLabel}>Direct HR Email</span>
                    <a
                      href={`mailto:${CAREERS_EMAIL}`}
                      className={styles.recruitmentEmailLink}
                      aria-label={`Email ${CAREERS_EMAIL}`}
                    >
                      <Mail size={16} aria-hidden="true" />
                      <span>{CAREERS_EMAIL}</span>
                    </a>
                  </div>

                  <a
                    href={applicationMailto}
                    className={styles.recruitmentCtaButton}
                    id="job-apply-email-btn"
                  >
                    <span>APPLY VIA EMAIL</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
