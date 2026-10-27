'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import styles from './CookieConsent.module.css'

export interface CookiePreferences {
  essential: boolean
  performance: boolean
  analytics: boolean
  timestamp: number
}

const STORAGE_KEY = 'apfx_cookie_consent'

/**
 * Helper to retrieve stored cookie preferences
 */
export function getStoredCookieConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    if (raw === 'accepted') {
      return { essential: true, performance: true, analytics: true, timestamp: Date.now() }
    }
    return JSON.parse(raw) as CookiePreferences
  } catch {
    return null
  }
}

/**
 * Helper to check if a specific cookie category is consented
 */
export function hasCookieConsent(category: 'performance' | 'analytics'): boolean {
  const prefs = getStoredCookieConsent()
  if (!prefs) return false
  return !!prefs[category]
}

export default function CookieConsent() {
  const [isBannerVisible, setIsBannerVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Preference checkboxes state inside modal
  const [performanceChecked, setPerformanceChecked] = useState(true)
  const [analyticsChecked, setAnalyticsChecked] = useState(true)

  // Initialize and apply consent
  const applyConsent = useCallback((prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
      document.cookie = `${STORAGE_KEY}=${encodeURIComponent(
        JSON.stringify(prefs)
      )}; path=/; max-age=31536000; SameSite=Lax`

      // Expose to window for external tracking scripts / integrations
      if (typeof window !== 'undefined') {
        ;(window as unknown as { apfxCookieConsent?: CookiePreferences }).apfxCookieConsent = prefs

        // Disable analytics if user denied consent
        if (!prefs.analytics) {
          ;(window as unknown as { [key: string]: unknown })['ga-disable-analytics'] = true
          if (typeof window !== 'undefined' && 'va' in window) {
            // Vercel analytics beforeSend opt-out if available
            try {
              ;(window as unknown as { va?: (type: string, fn: () => null) => void }).va?.(
                'beforeSend',
                () => null
              )
            } catch {
              // Ignore if Vercel Analytics does not support beforeSend
            }
          }
        }

        window.dispatchEvent(
          new CustomEvent('apfx_cookie_consent_updated', { detail: prefs })
        )
      }
    } catch (e) {
      console.warn('Could not save cookie consent:', e)
    }
  }, [])

  useEffect(() => {
    const existing = getStoredCookieConsent()
    if (existing) {
      setPerformanceChecked(existing.performance)
      setAnalyticsChecked(existing.analytics)
      applyConsent(existing)
    } else {
      // Delay display slightly to allow page entry animations to settle
      const timer = setTimeout(() => {
        setIsBannerVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [applyConsent])

  // Support opening preferences modal from anywhere on site (e.g. footer / legal links)
  useEffect(() => {
    const handleOpen = () => {
      const current = getStoredCookieConsent()
      if (current) {
        setPerformanceChecked(current.performance)
        setAnalyticsChecked(current.analytics)
      }
      setIsModalOpen(true)
    }

    window.addEventListener('open_cookie_preferences', handleOpen)
    ;(window as unknown as { openCookiePreferences?: () => void }).openCookiePreferences = handleOpen

    return () => {
      window.removeEventListener('open_cookie_preferences', handleOpen)
      delete (window as unknown as { openCookiePreferences?: () => void }).openCookiePreferences
    }
  }, [])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  // Actions
  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      performance: true,
      analytics: true,
      timestamp: Date.now(),
    }
    applyConsent(prefs)
    setIsBannerVisible(false)
    setIsModalOpen(false)
  }

  const handleEssentialOnly = () => {
    const prefs: CookiePreferences = {
      essential: true,
      performance: false,
      analytics: false,
      timestamp: Date.now(),
    }
    setPerformanceChecked(false)
    setAnalyticsChecked(false)
    applyConsent(prefs)
    setIsBannerVisible(false)
    setIsModalOpen(false)
  }

  const handleSavePreferences = () => {
    const prefs: CookiePreferences = {
      essential: true,
      performance: performanceChecked,
      analytics: analyticsChecked,
      timestamp: Date.now(),
    }
    applyConsent(prefs)
    setIsBannerVisible(false)
    setIsModalOpen(false)
  }

  const handleOpenPreferences = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* ── Full-Width Fixed Bottom Banner ─────────────────────────────── */}
      <AnimatePresence>
        {isBannerVisible && (
          <motion.aside
            className={styles.bannerWrapper}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            role="region"
            aria-label="Cookie consent banner"
          >
            <div className={styles.bannerContainer}>
              <div className={styles.bannerText}>
                <p>
                  We use cookies to give you the best possible experience while you browse through
                  our website. By pursuing the use of our website you implicitly agree to the usage of
                  cookies on this site.{' '}
                  <Link href="/cookie-policy" className={styles.learnMoreLink}>
                    Learn more
                  </Link>
                </p>
              </div>

              <div className={styles.bannerActions}>
                <button
                  type="button"
                  className={styles.acceptAllBtn}
                  onClick={handleAcceptAll}
                  aria-label="Accept all cookies"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  className={styles.preferencesBtn}
                  onClick={handleOpenPreferences}
                  aria-label="Open cookie preferences modal"
                >
                  Preferences
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Centered Cookie Preferences Modal ──────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
            {/* Backdrop click to dismiss */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCloseModal}
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              className={styles.modalCard}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className={styles.modalHeader}>
                <div className={styles.modalTitleRow}>
                  <h2 id="cookie-modal-title" className={styles.modalTitle}>
                    Your Cookie Preference
                  </h2>
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={handleCloseModal}
                    aria-label="Close preferences modal"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <p className={styles.modalIntro}>
                  We use different types of cookies to optimize your experience on our website.
                  Click on the categories that you want to allow. Visit our website to learn more
                  about our{' '}
                  <Link href="/cookie-policy" className={styles.modalLink}>
                    Cookie Policy
                  </Link>
                </p>
              </div>

              <div className={styles.modalDivider} />

              {/* Categories */}
              <div className={styles.modalBody}>
                {/* 1. Essential */}
                <div className={styles.categoryItem}>
                  <label htmlFor="cookie-essential" className={styles.categoryLabel}>
                    <input
                      type="checkbox"
                      id="cookie-essential"
                      checked={true}
                      disabled={true}
                      className={`${styles.checkbox} ${styles.checkboxDisabled}`}
                      aria-describedby="cookie-essential-desc"
                    />
                    <span className={styles.categoryName}>Essential</span>
                  </label>
                  <p id="cookie-essential-desc" className={styles.categoryDesc}>
                    These cookies are necessary for the basic functionality of the website. Without
                    these cookies, certain functions, like live chat, knowledge base, etc., will not
                    work.{' '}
                    <Link href="/cookie-policy" className={styles.modalLink}>
                      Learn more
                    </Link>
                  </p>
                </div>

                <div className={styles.modalDivider} />

                {/* 2. Performance */}
                <div className={styles.categoryItem}>
                  <label htmlFor="cookie-performance" className={styles.categoryLabel}>
                    <input
                      type="checkbox"
                      id="cookie-performance"
                      checked={performanceChecked}
                      onChange={(e) => setPerformanceChecked(e.target.checked)}
                      className={styles.checkbox}
                      aria-describedby="cookie-performance-desc"
                    />
                    <span className={styles.categoryName}>Performance</span>
                  </label>
                  <p id="cookie-performance-desc" className={styles.categoryDesc}>
                    These cookies are used to enhance your browsing experience. Also, these cookies
                    will aid us in assisting you better with our engagement and support tools.{' '}
                    <Link href="/cookie-policy" className={styles.modalLink}>
                      Learn more
                    </Link>
                  </p>
                </div>

                <div className={styles.modalDivider} />

                {/* 3. Analytics */}
                <div className={styles.categoryItem}>
                  <label htmlFor="cookie-analytics" className={styles.categoryLabel}>
                    <input
                      type="checkbox"
                      id="cookie-analytics"
                      checked={analyticsChecked}
                      onChange={(e) => setAnalyticsChecked(e.target.checked)}
                      className={styles.checkbox}
                      aria-describedby="cookie-analytics-desc"
                    />
                    <span className={styles.categoryName}>Analytics</span>
                  </label>
                  <p id="cookie-analytics-desc" className={styles.categoryDesc}>
                    These cookies are used to help us understand how our website is being used. They
                    can also be used to analyze the effectiveness of our marketing activities and to
                    create a personalized browsing experience for you.{' '}
                    <Link href="/cookie-policy" className={styles.modalLink}>
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.essentialOnlyBtn}
                  onClick={handleEssentialOnly}
                  aria-label="Use essential cookies only"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  className={styles.savePreferencesBtn}
                  onClick={handleSavePreferences}
                  aria-label="Save cookie preferences"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
