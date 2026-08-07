'use client'

import { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import styles from './LearnCourses.module.css'
import type { Course, CourseVideo } from '@/app/academy/courses/coursesData'

/* ── helpers ── */
function isCourse(c: Course | { error: string }): c is Course { return !('error' in c) }
function getCourseSlug(id: string) {
  if (id === 'PLIioKedKLbjY') return 'forex'
  if (id === 'PLX2aFJVbtr_A') return 'algo'
  return id
}
function getCourseLevel(title: string) {
  const t = title.toLowerCase()
  if (t.includes('algo') || t.includes('python')) return { label: 'Advanced', color: '#f59e0b' }
  if (t.includes('beginner') || t.includes('forex')) return { label: 'Beginner', color: '#36f936' }
  return { label: 'Intermediate', color: '#60a5fa' }
}
function getVideoId(video: CourseVideo): string {
  try {
    const url = new URL(video.youtubeUrl)
    return url.searchParams.get('v') || video.id
  } catch {
    return video.id
  }
}

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
}
const stagger = { show: { transition: { staggerChildren: 0.12 } } }
const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
}

/* ── Candlestick decorative SVG ── */
function CandleBg() {
  const candles = [
    { x: 30, h: 60, body: 35, up: true }, { x: 70, h: 80, body: 45, up: false },
    { x: 110, h: 50, body: 28, up: true }, { x: 150, h: 90, body: 55, up: true },
    { x: 190, h: 40, body: 22, up: false }, { x: 230, h: 70, body: 42, up: true },
    { x: 270, h: 85, body: 50, up: false }, { x: 310, h: 55, body: 32, up: true },
    { x: 350, h: 65, body: 38, up: false }, { x: 390, h: 75, body: 44, up: true },
    { x: 430, h: 48, body: 28, up: true }, { x: 470, h: 92, body: 58, up: false },
    { x: 510, h: 62, body: 36, up: true }, { x: 550, h: 44, body: 26, up: false },
    { x: 590, h: 78, body: 47, up: true }, { x: 630, h: 56, body: 33, up: false },
    { x: 670, h: 68, body: 40, up: true }, { x: 710, h: 84, body: 52, up: false },
    { x: 750, h: 46, body: 27, up: true }, { x: 790, h: 72, body: 43, up: false },
    { x: 830, h: 58, body: 34, up: true }, { x: 870, h: 88, body: 54, up: false },
    { x: 910, h: 64, body: 38, up: true }, { x: 950, h: 42, body: 25, up: false },
  ]
  const base = 110
  return (
    <svg className={styles.candleBg} viewBox="0 0 1000 160" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {candles.map((c, i) => {
        const top = base - c.h / 2
        const bodyTop = base - c.body / 2
        const color = c.up ? '#36f936' : '#ef4444'
        return (
          <g key={i} opacity="0.18">
            <line x1={c.x} y1={top} x2={c.x} y2={top + c.h} stroke={color} strokeWidth="1" />
            <rect x={c.x - 5} y={bodyTop} width="10" height={c.body} fill={color} rx="1" />
          </g>
        )
      })}
    </svg>
  )
}

/* ── Glass stat card ── */
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <motion.div variants={cardVariant} className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </motion.div>
  )
}

/* ── Featured Course hero-style block ── */
function FeaturedCourse({ course }: { course: Course }) {
  const slug = getCourseSlug(course.id)
  const thumbnail = course.videos[0]?.thumbnail || ''
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger} className={styles.featuredSection}>
      <motion.p variants={fadeUp} className={styles.sectionEyebrow}>Featured Course</motion.p>
      <div className={styles.featuredCard}>
        {/* Thumbnail */}
        <motion.div variants={fadeUp} className={styles.featuredThumb}>
          {thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumbnail} alt={course.title} className={styles.featuredImg} />
          )}
          <div className={styles.featuredThumbOverlay} />
          <div className={styles.featuredPlayBtn}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </motion.div>

        {/* Info */}
        <div className={styles.featuredInfo}>
          <motion.div variants={fadeUp} className={styles.featuredBadge}>
            {getCourseLevel(course.title).label}
          </motion.div>
          <motion.h2 variants={fadeUp} className={styles.featuredTitle}>{course.title}</motion.h2>
          <motion.p variants={fadeUp} className={styles.featuredDesc}>{course.subtitle}</motion.p>
          <motion.div variants={fadeUp} className={styles.featuredMeta}>
            <span className={styles.featuredMetaItem}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              {course.videos.length} Lessons
            </span>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link href={`/learn/courses/${slug}`} className={styles.featuredBtn}>
              Start Learning
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Video Lesson Search Result Card ── */
function VideoSearchResultCard({
  video,
  courseTitle,
  courseSlug,
}: {
  video: CourseVideo
  courseTitle: string
  courseSlug: string
}) {
  const vidId = getVideoId(video)
  return (
    <motion.div variants={cardVariant}>
      <Link href={`/learn/courses/${courseSlug}?v=${vidId}`} className={styles.videoResultCard}>
        <div className={styles.videoThumbWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.thumbnail} alt={video.title} className={styles.videoThumbImg} />
          <div className={styles.videoThumbOverlay} />
          <div className={styles.videoPlayBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <span className={styles.videoEpBadge}>Ep. {String(video.episode).padStart(2, '0')}</span>
          <span className={styles.videoDuration}>{video.duration}</span>
        </div>
        <div className={styles.videoResultBody}>
          <span className={styles.videoCourseBadge}>{courseTitle}</span>
          <h3 className={styles.videoResultTitle}>{video.title}</h3>
          <span className={styles.videoResultCta}>
            Watch Lesson
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Course card ── */
function CourseCard({ course, idx }: { course: Course; idx: number }) {
  const slug = getCourseSlug(course.id)
  const thumbnail = course.videos[0]?.thumbnail || ''
  const level = getCourseLevel(course.title)
  const desc = course.subtitle || ''
  return (
    <motion.div variants={cardVariant}>
      <Link href={`/learn/courses/${slug}`} className={styles.courseCard}>
        <div className={styles.cardThumb}>
          {thumbnail && <img src={thumbnail} alt={course.title} className={styles.cardThumbImg} />}
          <div className={styles.cardThumbOverlay} />
          <div className={styles.cardPlayIcon}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
          <span className={styles.cardNum}>{String(idx + 1).padStart(2, '0')}</span>
          <span className={styles.cardLevel} style={{ color: level.color, borderColor: `${level.color}50`, background: `${level.color}15` }}>{level.label}</span>
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{course.title}</h3>
          <p className={styles.cardDesc}>{desc.length > 110 ? desc.slice(0, 110) + '…' : desc}</p>
          <div className={styles.cardFooter}>
            <span className={styles.cardLessons}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              {course.videos.length} Lessons
            </span>
            <span className={styles.cardCta}>
              Start
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Why APFX ── */
const FEATURES = [
  { icon: '🎯', title: 'Built by Real Traders', desc: 'Every course is crafted by active traders with live cTrader experience.' },
  { icon: '📈', title: 'Practical Examples', desc: 'Learn through real chart setups, trades and market analysis.' },
  { icon: '🤖', title: 'Algo Trading Ready', desc: 'Go from zero to building and deploying automated bots in cTrader.' },
  { icon: '💎', title: 'Free Forever', desc: 'All courses are permanently free. No subscriptions, no paywalls.' },
  { icon: '⚡', title: 'Self-Paced Learning', desc: 'Watch at your own speed, rewind, repeat, master each concept.' },
  { icon: '🔗', title: 'cTrader Integration', desc: 'Lessons are built directly around the cTrader ecosystem and tools.' },
]

function WhyAPFX() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger} className={styles.whySection}>
      <motion.p variants={fadeUp} className={styles.sectionEyebrow}>Why APFX Academy</motion.p>
      <motion.h2 variants={fadeUp} className={styles.sectionTitle}>Learn the Right Way</motion.h2>
      <div className={styles.featuresGrid}>
        {FEATURES.map((f) => (
          <motion.div key={f.title} variants={cardVariant} className={styles.featureCard}>
            <div className={styles.featureIcon}>{f.icon}</div>
            <h4 className={styles.featureTitle}>{f.title}</h4>
            <p className={styles.featureDesc}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

/* ── Testimonials (structure for future API) ── */
const TESTIMONIALS = [
  { name: 'Alex M.', role: 'Forex Trader', quote: 'The Forex course gave me a structured foundation I never had from YouTube alone.', avatar: '👤' },
  { name: 'Sarah K.', role: 'Algo Developer', quote: 'I built my first cTrader bot after completing the Algo Trading course. Absolutely worth it.', avatar: '👤' },
  { name: 'David R.', role: 'Part-time Trader', quote: 'Free, high-quality, and practical. APFX Academy is the best trading education I\'ve found.', avatar: '👤' },
]

function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger} className={styles.testimonialsSection}>
      <motion.p variants={fadeUp} className={styles.sectionEyebrow}>Student Stories</motion.p>
      <motion.h2 variants={fadeUp} className={styles.sectionTitle}>Trusted by Traders Worldwide</motion.h2>
      <div className={styles.testimonialsGrid}>
        {TESTIMONIALS.map((t) => (
          <motion.div key={t.name} variants={cardVariant} className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar}>{t.avatar}</div>
              <div>
                <div className={styles.testimonialName}>{t.name}</div>
                <div className={styles.testimonialRole}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

/* ── FAQ ── */
const FAQS = [
  { q: 'Who are these courses for?', a: 'Our courses are designed for anyone interested in trading — from complete beginners who have never placed a trade, to experienced traders who want to automate their strategies using Python and cTrader.' },
  { q: 'Are the courses free?', a: 'Yes. All APFX Academy courses are completely free, forever. We believe education should never be a barrier to becoming a better trader.' },
  { q: 'Do I need trading experience to start?', a: 'No prior experience needed. The Forex course starts from absolute basics and guides you step by step through the cTrader platform.' },
  { q: 'Can I learn at my own pace?', a: 'Absolutely. All lessons are available on-demand via YouTube. Watch, pause, rewind, and revisit any lesson at any time.' },
  { q: 'What platform do the courses use?', a: 'All practical lessons are built directly inside the cTrader platform — the same institutional-grade platform offered by APFX Global.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger} className={styles.faqSection}>
      <motion.p variants={fadeUp} className={styles.sectionEyebrow}>FAQ</motion.p>
      <motion.h2 variants={fadeUp} className={styles.sectionTitle}>Common Questions</motion.h2>
      <div className={styles.faqList}>
        {FAQS.map((f, i) => (
          <motion.div key={i} variants={cardVariant} className={`${styles.faqItem} ${open === i ? styles.faqItemOpen : ''}`}>
            <button className={styles.faqQuestion} onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }} className={styles.faqIcon}>+</motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className={styles.faqAnswer}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

/* ── Course Library Section ── */
function LibrarySection({ courses }: { courses: Course[] }) {
  const libRef = useRef(null)
  const libInView = useInView(libRef, { once: true, margin: '-60px' })
  return (
    <motion.section ref={libRef} initial="hidden" animate={libInView ? 'show' : 'hidden'} variants={stagger} className={styles.librarySection}>
      <motion.p variants={fadeUp} className={styles.sectionEyebrow}>Course Library</motion.p>
      <motion.h2 variants={fadeUp} className={styles.sectionTitle}>All Courses</motion.h2>
      <motion.div variants={stagger} className={styles.coursesGrid}>
        {courses.map((c, i) => <CourseCard key={c.id} course={c} idx={i} />)}
      </motion.div>
    </motion.section>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
════════════════════════════════════════════════════════════ */
interface Props { forexCourse: Course | { error: string }; algoCourse: Course | { error: string } }

export default function LearnCoursesClient({ forexCourse, algoCourse }: Props) {
  const [query, setQuery] = useState('')
  const heroRef = useRef(null)

  const allCourses: Course[] = []
  if (isCourse(forexCourse)) allCourses.push(forexCourse)
  if (isCourse(algoCourse)) allCourses.push(algoCourse)

  const featuredCourse = allCourses[0] ?? null
  const totalVideos = allCourses.reduce((a, c) => a + c.videos.length, 0)

  const { matchingVideos, matchingCourses, totalCount } = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { matchingVideos: [], matchingCourses: [], totalCount: 0 }

    const videos: { video: CourseVideo; courseTitle: string; courseSlug: string }[] = []
    const courses: Course[] = []

    allCourses.forEach(c => {
      const courseSlug = getCourseSlug(c.id)
      const courseMatches = c.title.toLowerCase().includes(q) || (c.subtitle || '').toLowerCase().includes(q)
      if (courseMatches) {
        courses.push(c)
      }

      c.videos.forEach(v => {
        if (v.title.toLowerCase().includes(q)) {
          videos.push({ video: v, courseTitle: c.title, courseSlug })
        }
      })
    })

    return {
      matchingVideos: videos,
      matchingCourses: courses,
      totalCount: videos.length + courses.length,
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, forexCourse, algoCourse])

  const isSearching = query.trim().length > 0

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <motion.section ref={heroRef} initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className={styles.hero}>
        <CandleBg />
        <div className={styles.heroGlow} />
        <div className={styles.heroBlur1} />
        <div className={styles.heroBlur2} />

        <div className={styles.heroInner}>
          <motion.div variants={fadeUp} className={styles.heroBadge}>APFX Academy</motion.div>
          <motion.h1 variants={fadeUp} className={styles.heroTitle}>
            Learn to <span className={styles.accent}>Trade & Build</span>
          </motion.h1>
          <motion.p variants={fadeUp} className={styles.heroSubtitle}>
            Premium video courses designed by real traders. Master Forex fundamentals and build
            automated trading systems on cTrader — completely free.
          </motion.p>

          {/* Stats */}
          <motion.div variants={stagger} className={styles.statsRow}>
            <StatCard icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>} value={String(allCourses.length)} label="Courses" />
            <StatCard icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>} value={`${totalVideos}+`} label="Lessons" />
            <StatCard icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>} value="100%" label="Free" />
          </motion.div>

          {/* Search */}
          <motion.div variants={fadeUp} className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              id="academy-search"
              type="search"
              className={styles.searchInput}
              placeholder="Search courses, lessons, topics (e.g. ChatGPT, indicators)…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button className={styles.searchClear} onClick={() => setQuery('')} aria-label="Clear">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </motion.div>
        </div>
      </motion.section>

      <div className={styles.contentArea}>

        {/* ── UNIVERSAL SEARCH RESULTS ── */}
        {isSearching && (
          <section className={styles.searchSection}>
            <p className={styles.resultCount}>
              {totalCount} result{totalCount !== 1 ? 's' : ''} for <strong>&quot;{query}&quot;</strong>
            </p>

            {totalCount === 0 ? (
              <div className={styles.emptyState}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <p>No lessons or courses match <strong>&quot;{query}&quot;</strong></p>
                <button className={styles.clearBtn} onClick={() => setQuery('')}>Clear search</button>
              </div>
            ) : (
              <>
                {/* Video Lessons Results */}
                {matchingVideos.length > 0 && (
                  <div className={styles.searchGroup}>
                    <h3 className={styles.searchGroupTitle}>
                      Video Lessons ({matchingVideos.length})
                    </h3>
                    <motion.div initial="hidden" animate="show" variants={stagger} className={styles.coursesGrid}>
                      {matchingVideos.map(({ video, courseTitle, courseSlug }) => (
                        <VideoSearchResultCard
                          key={`${courseSlug}-${video.id}`}
                          video={video}
                          courseTitle={courseTitle}
                          courseSlug={courseSlug}
                        />
                      ))}
                    </motion.div>
                  </div>
                )}

                {/* Courses Results */}
                {matchingCourses.length > 0 && (
                  <div className={styles.searchGroup}>
                    <h3 className={styles.searchGroupTitle}>
                      Courses ({matchingCourses.length})
                    </h3>
                    <motion.div initial="hidden" animate="show" variants={stagger} className={styles.coursesGrid}>
                      {matchingCourses.map((c, i) => (
                        <CourseCard key={c.id} course={c} idx={i} />
                      ))}
                    </motion.div>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* ── DEFAULT VIEW ── */}
        {!isSearching && (
          <>
            {/* Featured course */}
            {featuredCourse && <FeaturedCourse course={featuredCourse} />}

            {/* Course library */}
            {allCourses.length > 0 && <LibrarySection courses={allCourses} />}

            {/* Why APFX */}
            <WhyAPFX />

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ />

            {/* Final CTA */}
            <motion.section
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={styles.ctaSection}
            >
              <div className={styles.ctaGlow} />
              <h2 className={styles.ctaTitle}>Ready to Start Your<br /><span className={styles.accent}>Trading Journey?</span></h2>
              <p className={styles.ctaSubtitle}>Join thousands of traders learning on APFX Academy — free, forever.</p>
              {featuredCourse && (
                <Link href={`/learn/courses/${getCourseSlug(featuredCourse.id)}`} className={styles.ctaBtn}>
                  Start Learning Free
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              )}
            </motion.section>
          </>
        )}
      </div>
    </div>
  )
}
