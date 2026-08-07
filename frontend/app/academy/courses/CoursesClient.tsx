'use client'

import { useState, useMemo } from 'react'
import styles from './Courses.module.css'
import CourseSection from './CourseSection'
import type { Course, CourseVideo } from './coursesData'

interface CoursesClientProps {
  forexCourse: Course | { error: string }
  algoCourse: Course | { error: string }
}

interface EnrichedVideo extends CourseVideo {
  courseTitle: string
  courseLevel: string
  levelColor: string
}

// ── Helpers ─────────────────────────────────────────────────────
function isCourse(c: Course | { error: string }): c is Course {
  return !('error' in c)
}

function ErrorBlock({ msg }: { msg: string }) {
  return (
    <div
      className={styles.section}
      style={{
        color: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
      }}
    >
      <h3>Could not load course videos</h3>
      <p>{msg}</p>
    </div>
  )
}

// ── Single course module block ───────────────────────────────────
interface CourseBlockProps {
  course: Course
  level: string
  levelColor?: string
}

function CourseBlock({ course, level, levelColor = 'var(--color-accent)' }: CourseBlockProps) {
  const firstVideoUrl = course.videos[0]?.youtubeUrl
  const videoCount = course.videos.length

  return (
    <div className={styles.courseModule}>
      <div className={styles.moduleHeader}>
        <div className={styles.moduleHeaderLeft}>
          <span className={styles.levelBadge} style={{ borderColor: levelColor, color: levelColor }}>
            {level}
          </span>
          <h2 className={styles.moduleTitle}>
            {course.title.includes('APFX') ? (
              <>
                {course.title.split('APFX')[0]}
                <span style={{ color: 'var(--color-accent)' }}>APFX</span>
                {course.title.split('APFX')[1]}
              </>
            ) : course.title}
          </h2>
          <p className={styles.moduleSubtitle}>{course.subtitle}</p>
          <div className={styles.moduleStats}>
            <span className={styles.moduleStat}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              {videoCount} videos
            </span>
            <span className={styles.moduleStatDivider}>·</span>
            <span className={styles.moduleStat}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Self-paced
            </span>
            <span className={styles.moduleStatDivider}>·</span>
            <span className={styles.moduleStat} style={{ color: 'var(--color-accent)' }}>Free</span>
          </div>
        </div>
        {firstVideoUrl && (
          <a href={firstVideoUrl} target="_blank" rel="noopener noreferrer" className={styles.startCourseBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Start Course
          </a>
        )}
      </div>
      <CourseSection course={course} />
    </div>
  )
}

// ── Search results list ──────────────────────────────────────────
function SearchResults({ videos, query }: { videos: EnrichedVideo[]; query: string }) {
  if (videos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-3)', marginBottom: '1rem' }} aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <p style={{ color: 'var(--color-text-2)', marginBottom: '0.25rem' }}>No videos found for <strong>&quot;{query}&quot;</strong></p>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.875rem' }}>Try a different keyword</p>
      </div>
    )
  }

  return (
    <>
      <p className={styles.searchResultCount}>
        {videos.length} result{videos.length !== 1 ? 's' : ''} for <strong>&quot;{query}&quot;</strong>
      </p>
      <div className={styles.articlesGrid}>
        {videos.map((video) => (
          <a
            key={video.id}
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.articleCard} ${styles.videoCard}`}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
          >
            <div className={styles.articleImage} style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className={styles.videoThumb} />
              <div className={styles.playOverlay} aria-hidden="true">
                <div className={styles.playBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                </div>
              </div>
              <div className={styles.episodeBadge}>Ep. {String(video.episode).padStart(2, '0')}</div>
              <div className={styles.durationBadge}>{video.duration}</div>
              <div className={styles.courseLabelBadge} style={{ color: video.levelColor, borderColor: video.levelColor }}>
                {video.courseLevel}
              </div>
            </div>
            <div className={styles.articleBody} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '0', flex: 1 }}>{video.title}</h3>
              <div style={{ marginTop: '1.25rem' }}>
                <span className={styles.articleLink}>Watch on YouTube →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  )
}

// ── Main client component ────────────────────────────────────────
const FILTERS = ['All', 'Beginner', 'Advanced'] as const
type FilterType = typeof FILTERS[number]

export default function CoursesClient({ forexCourse, algoCourse }: CoursesClientProps) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')

  // Build enriched video pool from available courses
  const allVideos = useMemo<EnrichedVideo[]>(() => {
    const pool: EnrichedVideo[] = []
    if (isCourse(forexCourse)) {
      forexCourse.videos.forEach(v => pool.push({ ...v, courseTitle: forexCourse.title, courseLevel: 'Beginner', levelColor: 'var(--color-accent)' }))
    }
    if (isCourse(algoCourse)) {
      algoCourse.videos.forEach(v => pool.push({ ...v, courseTitle: algoCourse.title, courseLevel: 'Advanced', levelColor: '#a78bfa' }))
    }
    return pool
  }, [forexCourse, algoCourse])

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allVideos.filter(v => {
      const matchesQuery = !q || v.title.toLowerCase().includes(q)
      const matchesFilter = activeFilter === 'All' || v.courseLevel === activeFilter
      return matchesQuery && matchesFilter
    })
  }, [allVideos, query, activeFilter])

  const isSearching = query.trim().length > 0 || activeFilter !== 'All'

  return (
    <div className={styles.container}>
      {/* ── Search + Filter bar ── */}
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrap}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            id="course-search"
            type="search"
            className={styles.searchInput}
            placeholder="Search videos across all courses…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search course videos"
          />
          {query && (
            <button className={styles.searchClear} onClick={() => setQuery('')} aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className={styles.filterPills} role="group" aria-label="Filter by course level">
          {FILTERS.map(f => (
            <button
              key={f}
              className={activeFilter === f ? styles.filterPillActive : styles.filterPill}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              data-level={f.toLowerCase()}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      {isSearching ? (
        <SearchResults videos={filteredVideos} query={query || activeFilter} />
      ) : (
        <>
          {isCourse(forexCourse)
            ? <CourseBlock course={forexCourse} level="Beginner" />
            : <ErrorBlock msg={(forexCourse as { error: string }).error} />}

          {isCourse(algoCourse)
            ? <CourseBlock course={algoCourse} level="Advanced" levelColor="#a78bfa" />
            : <ErrorBlock msg={(algoCourse as { error: string }).error} />}
        </>
      )}
    </div>
  )
}


