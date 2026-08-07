'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
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
    <div className={styles.searchResultsContainer}>
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
    </div>
  )
}

// ── Main client component ────────────────────────────────────────
export default function CoursesClient({ forexCourse, algoCourse }: CoursesClientProps) {
  const [query, setQuery] = useState('')
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoSectionRef = useRef<HTMLDivElement>(null)

  // Build the array of dynamic playlists/courses
  const courses = useMemo(() => {
    const list: Course[] = []
    if (isCourse(forexCourse)) list.push(forexCourse)
    if (isCourse(algoCourse)) list.push(algoCourse)
    return list
  }, [forexCourse, algoCourse])

  // Track the active selected course ID
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(() => {
    return courses[0]?.id || null
  })

  // Fade transition states
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in')
  const [transitionCourseId, setTransitionCourseId] = useState<string | null>(() => {
    return courses[0]?.id || null
  })

  // Build enriched video pool from available courses for search
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
    return allVideos.filter(v => !q || v.title.toLowerCase().includes(q))
  }, [allVideos, query])

  const isSearching = query.trim().length > 0



  // Intercept and translate vertical mouse wheel scroll to horizontal scroll
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
    }
  }, [])

  // Handle selected course click
  const handleSelectCourse = (courseId: string) => {
    if (courseId === selectedCourseId) return
    
    // Step 1: Fade out
    setFadeState('out')
    setSelectedCourseId(courseId)
    
    // Step 2: Swap content and Fade in after animation completes
    setTimeout(() => {
      setTransitionCourseId(courseId)
      setFadeState('in')
      
      // Step 3: Smoothly scroll if target section is below viewport fold
      setTimeout(() => {
        if (videoSectionRef.current) {
          const rect = videoSectionRef.current.getBoundingClientRect()
          if (rect.top > window.innerHeight) {
            videoSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }, 50)
    }, 200)
  }

  const currentCourse = useMemo(() => {
    return courses.find(c => c.id === transitionCourseId) || null
  }, [courses, transitionCourseId])

  return (
    <div className={styles.container}>
      {/* ── Academy Hero ── */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Learn.<br />
          Trade.<br />
          <span className={styles.accentText}>Master the Markets.</span>
        </h1>
        
        {/* Search Bar inside Hero */}
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
        </div>
      </div>

      {/* ── Dynamic Course Carousel ── */}
      {!isSearching && courses.length > 0 && (
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselHeader}>
            <h2 className={styles.carouselSectionTitle}>Our Learning Paths</h2>
          </div>

          <div 
            ref={carouselRef}
            className={styles.carouselScroll}
          >
            {courses.map((course) => {
              const isSelected = selectedCourseId === course.id
              const thumbnail = course.videos[0]?.thumbnail || ''
              const desc = course.subtitle || ''
              const trimmedDesc = desc.length > 140 ? desc.substring(0, 140) + '...' : desc

              return (
                <div
                  key={course.id}
                  onClick={() => handleSelectCourse(course.id)}
                  className={`${styles.carouselCard} ${isSelected ? styles.carouselCardActive : ''}`}
                >
                  <div className={styles.cardImageContainer}>
                    {thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumbnail} alt={course.title} className={styles.cardImage} />
                    ) : (
                      <div className={styles.cardImageFallback} />
                    )}
                    <div className={styles.cardOverlay} />
                    {isSelected && (
                      <div className={styles.activeLabelBadge}>
                        Active
                      </div>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{course.title}</h3>
                    <p className={styles.cardDescription}>{trimmedDesc}</p>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardMetaItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                        {course.videos.length} Videos
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Content View ── */}
      {isSearching ? (
        <SearchResults videos={filteredVideos} query={query} />
      ) : (
        <>
          {/* Main Selected Course Video Grid */}
          {currentCourse && (
            <div 
              ref={videoSectionRef}
              className={`${styles.videoSectionWrapper} ${fadeState === 'out' ? styles.fadeOut : styles.fadeIn}`}
            >
              <div className={styles.activeCourseHeader}>
                <span className={styles.activeCourseBadge}>Active Course</span>
                <h2 className={styles.activeCourseTitle}>{currentCourse.title}</h2>
                <p className={styles.activeCourseDescription}>{currentCourse.subtitle}</p>
              </div>
              <CourseSection key={currentCourse.id} course={currentCourse} />
            </div>
          )}

          {/* Show error blocks for any failed API loads at the bottom */}
          {!isCourse(forexCourse) && <ErrorBlock msg={forexCourse.error} />}
          {!isCourse(algoCourse) && <ErrorBlock msg={algoCourse.error} />}
        </>
      )}
    </div>
  )
}


