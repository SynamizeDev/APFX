import { Mail, ArrowRight } from 'lucide-react'
import { CAREERS_EMAIL, getCareersMailto } from '@/config/careers'
import styles from './Careers.module.css'

export default function JoinApfxSection() {
  const mailtoUrl = getCareersMailto()

  return (
    <section
      id="join-apfx"
      className={styles.sectionJoin}
      aria-labelledby="join-apfx-heading"
    >
      <div className={styles.container}>
        <div className={styles.joinLayout}>
          {/* Left Column: Headings & Narrative */}
          <div className={styles.joinInfo}>
            <h2 id="join-apfx-heading" className={styles.joinHeading}>
              DON&apos;T SEE YOUR ROLE?
            </h2>
            <p className={styles.joinSecondaryHeading}>
              INTERESTED IN JOINING APFX?
            </p>
            <p className={styles.joinBody}>
              We&apos;re always open to hearing from talented people. If you&apos;re interested in building
              your career with APFX, send us your resume and a short introduction about yourself.
            </p>
            <p className={styles.joinNote}>
              We look forward to hearing from you.
            </p>
          </div>

          {/* Right Column: Minimal Recruitment Contact Card */}
          <div>
            <div className={styles.recruitmentCard}>
              <h3 className={styles.recruitmentCardTitle}>SEND YOUR PROFILE</h3>
              <p className={styles.recruitmentCardText}>
                Send your resume and a short introduction directly to our HR desk.
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
                href={mailtoUrl}
                className={styles.recruitmentCtaButton}
                id="join-apfx-send-profile-btn"
              >
                <span>SEND YOUR PROFILE</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
