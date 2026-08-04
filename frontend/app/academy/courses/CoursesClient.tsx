'use client'

import styles from './Courses.module.css'
import CourseSection from './CourseSection'
import type { Course } from './coursesData'

export default function CoursesClient({ course }: { course: Course | { error: string } }) {
  return (
    <>
      <header className={styles.hero}>
        <h1 className={styles.title}>Learn to Trade Forex with <span style={{ color: 'var(--color-accent)' }}>APFX × cTrader</span></h1>
        <p className={styles.subtitle}>Complete beginner video course designed to help traders understand Forex markets and the cTrader platform.</p>
      </header>

      <div className={styles.container}>
        {'error' in course ? (
          <div className={styles.section} style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h3>Could not load course videos</h3>
            <p>{course.error}</p>
          </div>
        ) : (
          <CourseSection course={course} />
        )}
      </div>
    </>
  )
}
