'use client'

import styles from './Courses.module.css'
import CourseSection from './CourseSection'
import type { Course } from './coursesData'

interface CoursesClientProps {
  forexCourse: Course | { error: string }
  algoCourse: Course | { error: string }
}

function CourseBlock({ course }: { course: Course | { error: string } }) {
  if ('error' in course) {
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
        <p>{course.error}</p>
      </div>
    )
  }

  return (
    <>
      <header className={styles.hero} style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <h2 className={styles.heroTitle}>
          {course.title.includes('APFX') ? (
            <>
              {course.title.split('APFX')[0]}
              <span style={{ color: 'var(--color-accent)' }}>APFX</span>
              {course.title.split('APFX')[1]}
            </>
          ) : (
            course.title
          )}
        </h2>
        <p className={styles.heroDesc}>{course.subtitle}</p>
      </header>
      <CourseSection course={course} />
    </>
  )
}

export default function CoursesClient({ forexCourse, algoCourse }: CoursesClientProps) {
  return (
    <>
      <div className={styles.container}>
        {/* Course 1 — Forex Beginners */}
        <CourseBlock course={forexCourse} />

        {/* Divider */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            margin: '3rem 0 1rem',
          }}
        />

        {/* Course 2 — Algo Trading */}
        <CourseBlock course={algoCourse} />
      </div>
    </>
  )
}
