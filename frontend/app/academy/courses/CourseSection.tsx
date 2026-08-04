'use client'

import { useState } from 'react'
import styles from './Courses.module.css'
import type { Course } from './coursesData'

interface CourseSectionProps {
  course: Course;
}

export default function CourseSection({ course }: CourseSectionProps) {
  const [visibleCount, setVisibleCount] = useState(6)

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  const visibleVideos = course.videos.slice(0, visibleCount)
  const hasMore = visibleCount < course.videos.length

  return (
    <section className={styles.section} id="course" aria-label="Course videos">
      
      <div className={styles.articlesGrid}>
        {visibleVideos.map((video) => (
          <a
            key={video.id}
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.articleCard}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
          >
            <div className={styles.articleImage} style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={video.thumbnail} 

                alt={video.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', color: '#fff', fontWeight: 'bold' }}>
                {video.duration}
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

      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <button 
            onClick={handleLoadMore}
            className={styles.ctaBtnSecondary}
            style={{ cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Load More Videos
          </button>
        </div>
      )}
    </section>
  )
}
