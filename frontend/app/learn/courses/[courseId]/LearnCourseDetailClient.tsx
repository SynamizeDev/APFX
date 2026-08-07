'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from './CourseDetail.module.css'
import type { Course, CourseVideo } from '@/app/academy/courses/coursesData'

interface LearnCourseDetailClientProps {
  course: Course | null
  error: string | null
}

function ErrorBlock({ msg }: { msg: string }) {
  return (
    <div className={styles.errorBlock}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <h3>Could not load course videos</h3>
      <p>{msg}</p>
    </div>
  )
}

function getVideoId(video: CourseVideo): string {
  // youtubeUrl is https://www.youtube.com/watch?v=VIDEO_ID
  try {
    const url = new URL(video.youtubeUrl)
    return url.searchParams.get('v') || video.id
  } catch {
    return video.id
  }
}

export default function LearnCourseDetailClient({ course, error }: LearnCourseDetailClientProps) {
  const searchParams = useSearchParams()
  const activeEpRef = useRef<HTMLButtonElement | null>(null)

  const [activeVideo, setActiveVideo] = useState<CourseVideo | null>(() => {
    if (!course?.videos?.length) return null
    const videoIdParam = searchParams?.get('v')
    const epParam = searchParams?.get('ep')
    if (videoIdParam) {
      const found = course.videos.find(v => v.id === videoIdParam || getVideoId(v) === videoIdParam)
      if (found) return found
    }
    if (epParam) {
      const found = course.videos.find(v => v.episode === Number(epParam))
      if (found) return found
    }
    return course.videos[0]
  })

  // Sync if URL search params change dynamically
  useEffect(() => {
    if (!course?.videos?.length) return
    const videoIdParam = searchParams?.get('v')
    const epParam = searchParams?.get('ep')
    if (videoIdParam) {
      const found = course.videos.find(v => v.id === videoIdParam || getVideoId(v) === videoIdParam)
      if (found) setActiveVideo(found)
    } else if (epParam) {
      const found = course.videos.find(v => v.episode === Number(epParam))
      if (found) setActiveVideo(found)
    }
  }, [searchParams, course])

  // Auto-scroll active episode into view inside sidebar
  useEffect(() => {
    if (activeEpRef.current) {
      activeEpRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeVideo])

  if (error) {
    return (
      <div className={styles.wrapper}>
        <Link href="/learn/courses" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Courses
        </Link>
        <ErrorBlock msg={error} />
      </div>
    )
  }

  if (!course) return null

  const videoId = activeVideo ? getVideoId(activeVideo) : null

  return (
    <div className={styles.wrapper}>

      {/* ── Two-panel layout ── */}
      <div className={styles.playerLayout}>

        {/* ── LEFT: Video Player + Info ── */}
        <div className={styles.playerCol}>

          {/* Back link + breadcrumb row — inside content, clear of header */}
          <div className={styles.playerTopRow}>
            <Link href="/learn/courses" className={styles.backLink}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to Courses
            </Link>
            <span className={styles.courseBreadcrumb}>{course.title}</span>
          </div>

          {/* Embed */}
          <div className={styles.playerFrame}>
            {videoId ? (
              <iframe
                key={videoId}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.iframe}
              />
            ) : (
              <div className={styles.playerPlaceholder}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            )}
          </div>

          {/* Active video info */}
          {activeVideo && (
            <div className={styles.playerMeta}>
              <div className={styles.playerEpBadge}>
                Ep. {String(activeVideo.episode).padStart(2, '0')}
              </div>
              <h1 className={styles.playerTitle}>{activeVideo.title}</h1>
              <div className={styles.playerMetaRow}>
                <span className={styles.playerMetaChip}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {activeVideo.duration}
                </span>
                <span className={styles.playerMetaChip}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>
                  YouTube
                </span>
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.watchYtBtn}
                >
                  Open on YouTube
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
              </div>
            </div>
          )}

          {/* Course info below player */}
          <div className={styles.courseInfoBar}>
            <div>
              <p className={styles.courseInfoLabel}>Course</p>
              <p className={styles.courseInfoTitle}>{course.title}</p>
            </div>
            <div className={styles.courseInfoStats}>
              <span className={styles.courseInfoStat}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                {course.videos.length} Lessons
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Episode Sidebar ── */}
        <aside className={styles.sidebarCol}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Playlist</h2>
            <span className={styles.sidebarCount}>{course.videos.length} videos</span>
          </div>

          <div
            className={styles.episodeList}
            onWheel={(e) => {
              e.stopPropagation()
              e.currentTarget.scrollTop += e.deltaY
            }}
          >
            {course.videos.map((video) => {
              const isActive = activeVideo?.id === video.id
              return (
                <button
                  key={video.id}
                  ref={isActive ? activeEpRef : null}
                  onClick={() => setActiveVideo(video)}
                  className={`${styles.episodeItem} ${isActive ? styles.episodeItemActive : ''}`}
                >
                  {/* Thumbnail */}
                  <div className={styles.epThumbWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className={styles.epThumb}
                    />
                    <div className={styles.epThumbOverlay}>
                      {isActive ? (
                        /* Animated playing bars */
                        <span className={styles.playingBars}>
                          <span /><span /><span />
                        </span>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className={styles.epInfo}>
                    <span className={styles.epNum}>Ep. {String(video.episode).padStart(2, '0')}</span>
                    <p className={styles.epTitle}>{video.title}</p>
                    <span className={styles.epDuration}>{video.duration}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>
      </div>
    </div>
  )
}
