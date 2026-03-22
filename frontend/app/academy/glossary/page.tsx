'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Lightbulb, Link2, ArrowUpRight, BookOpen } from 'lucide-react'
import {
  GLOSSARY_ENTRIES,
  CATEGORY_LABELS,
  POPULAR_TERM_IDS,
  type GlossaryEntry,
  type GlossaryCategory,
} from './glossaryData'
import styles from './Glossary.module.css'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const ALL_CATEGORIES: GlossaryCategory[] = ['forex', 'technical', 'risk', 'investment', 'market']

function getFirstLetter(term: string): string {
  const t = term.trim().toUpperCase()
  return t.length ? t[0] : ''
}

function getTermsByLetter(entries: GlossaryEntry[]): Map<string, GlossaryEntry[]> {
  const map = new Map<string, GlossaryEntry[]>()
  for (const e of entries) {
    const letter = getFirstLetter(e.term)
    if (!map.has(letter)) map.set(letter, [])
    map.get(letter)!.push(e)
  }
  return map
}

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<GlossaryCategory | 'all'>('all')
  const [letter, setLetter] = useState<string | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // ── Unified Filtering Logic ───────────────────
  const baseFiltered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return GLOSSARY_ENTRIES.filter((e) => {
      const matchSearch =
        !q ||
        e.term.toLowerCase().includes(q) ||
        e.definition.toLowerCase().includes(q) ||
        (e.detailedExplanation && e.detailedExplanation.toLowerCase().includes(q))

      const matchCategory = category === 'all' || e.category === category
      return matchSearch && matchCategory
    })
  }, [search, category])

  // Letters available based on current search + category
  const availableLetters = useMemo(() => {
    return new Set(baseFiltered.map((e) => getFirstLetter(e.term)))
  }, [baseFiltered])

  // Final filtered list (applying A-Z filter)
  const filtered = useMemo(() => {
    if (letter === 'all') return baseFiltered
    return baseFiltered.filter((e) => getFirstLetter(e.term) === letter)
  }, [baseFiltered, letter])

  const byLetter = useMemo(() => getTermsByLetter(filtered), [filtered])

  const popularTerms = useMemo(
    () =>
      POPULAR_TERM_IDS.map((id) => GLOSSARY_ENTRIES.find((e) => e.id === id)).filter(
        Boolean
      ) as GlossaryEntry[],
    []
  )

  return (
    <>
      <header className={styles.hero}>
        <h1 className={styles.title}>The Institutional Trading Lexicon</h1>
        <p className={styles.subtitle}>
          A comprehensive professional reference for financial terminology, liquidity concepts, and
          execution metrics.
        </p>
        <div className={styles.searchWrap}>
          <div className={styles.searchWrapInner}>
            <span className={styles.searchIcon} aria-hidden>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search glossary terms"
            />
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {/* Popular terms */}
        <section className={styles.section} aria-labelledby="popular-terms">
          <h2 id="popular-terms" className={styles.sectionTitle}>
            Popular Terms
          </h2>
          <div className={styles.popularStrip}>
            {popularTerms.map((e) => (
              <a key={e.id} href={`#${e.id}`} className={styles.popularLink}>
                {e.term}
              </a>
            ))}
          </div>
        </section>

        {/* Category filter */}
        <nav className={styles.categoryBar} aria-label="Filter by category">
          <button
            type="button"
            className={`${styles.categoryBtn} ${category === 'all' ? styles.categoryBtnActive : ''}`}
            onClick={() => setCategory('all')}
            aria-pressed={category === 'all'}
          >
            All
          </button>
          {ALL_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.categoryBtn} ${category === c ? styles.categoryBtnActive : ''}`}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </nav>

        {/* A–Z */}
        <nav className={styles.azNav} aria-label="Jump to letter">
          {LETTERS.map((L) => {
            const hasTerms = availableLetters.has(L)
            const isActive = letter === L
            return (
              <button
                key={L}
                type="button"
                className={`${styles.azLetter} ${isActive ? styles.azLetterActive : ''} ${!hasTerms ? styles.azLetterDisabled : ''}`}
                onClick={() => setLetter(hasTerms ? L : 'all')}
                disabled={!hasTerms}
                aria-pressed={isActive}
                aria-label={`Terms starting with ${L}`}
              >
                {L}
              </button>
            )
          })}
          <button
            type="button"
            className={`${styles.azLetter} ${letter === 'all' ? styles.azLetterActive : ''}`}
            onClick={() => setLetter('all')}
            aria-pressed={letter === 'all'}
            aria-label="Show all letters"
          >
            All
          </button>
        </nav>

        {(search || category !== 'all' || letter !== 'all') && (
          <div className={styles.filterStatus}>
            <p>
              Showing {filtered.length} term{filtered.length !== 1 ? 's' : ''}
              {search && (
                <>
                  {' '}
                  for "<strong>{search}</strong>"
                </>
              )}
              {category !== 'all' && (
                <>
                  {' '}
                  in <strong>{CATEGORY_LABELS[category]}</strong>
                </>
              )}
              {letter !== 'all' && (
                <>
                  {' '}
                  starting with <strong>{letter}</strong>
                </>
              )}
            </p>
            <button
              className={styles.clearBtn}
              onClick={() => {
                setSearch('')
                setCategory('all')
                setLetter('all')
              }}
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Term list */}
        <section className={styles.section} aria-labelledby="glossary-list">
          <h2 id="glossary-list" className={styles.visuallyHidden}>
            Glossary terms
          </h2>
          {filtered.length === 0 ? (
            <p className={styles.noResults}>
              No terms match your search or filters. Try a different letter or category.
            </p>
          ) : (
            Array.from(byLetter.keys())
              .sort()
              .map((L) => (
                <div key={L} id={`letter-${L}`} className={styles.letterGroup}>
                  <h3 className={styles.letterHeading}>{L}</h3>
                  <div className={styles.termList}>
                    {byLetter.get(L)!.map((entry) => {
                      const isExpanded = expandedId === entry.id
                      const related = (entry.relatedTermIds || [])
                        .map((id) => GLOSSARY_ENTRIES.find((e) => e.id === id))
                        .filter(Boolean) as GlossaryEntry[]
                      return (
                        <article
                          key={entry.id}
                          id={entry.id}
                          className={`${styles.termCard} ${isExpanded ? styles.termCardExpanded : ''}`}
                        >
                          <button
                            type="button"
                            className={styles.termHeader}
                            onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                            aria-expanded={isExpanded}
                            aria-controls={`glossary-detail-${entry.id}`}
                          >
                            <div>
                              <div className={styles.termCategory}>
                                {CATEGORY_LABELS[entry.category]}
                              </div>
                              <div className={styles.termName}>{entry.term}</div>
                              <p className={styles.termDef}>{entry.definition}</p>
                              {entry.example && (
                                <p className={styles.termExample}>{entry.example}</p>
                              )}
                            </div>
                            <svg
                              className={styles.termExpandIcon}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>
                          <AnimatePresence initial={false} mode="sync">
                            {isExpanded && (
                              <motion.div
                                key={`detail-${entry.id}`}
                                id={`glossary-detail-${entry.id}`}
                                role="region"
                                className={styles.termBodyMotion}
                                style={prefersReducedMotion ? undefined : { overflow: 'hidden' }}
                                initial={
                                  prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                                }
                                animate={
                                  prefersReducedMotion
                                    ? { opacity: 1 }
                                    : { height: 'auto', opacity: 1 }
                                }
                                exit={
                                  prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                                }
                                transition={
                                  prefersReducedMotion
                                    ? { duration: 0.18, ease: [0.16, 1, 0.3, 1] }
                                    : {
                                        height: {
                                          type: 'spring',
                                          stiffness: 420,
                                          damping: 38,
                                          mass: 0.88,
                                        },
                                        opacity: {
                                          duration: 0.42,
                                          ease: [0.16, 1, 0.3, 1],
                                        },
                                      }
                                }
                              >
                                <div className={styles.termBody}>
                                  <div className={styles.termBodyShine} aria-hidden />
                                  {entry.detailedExplanation && (
                                    <div className={styles.insightBlock}>
                                      <div className={styles.insightBlockHeader}>
                                        <span className={styles.insightIconWrap} aria-hidden>
                                          <Lightbulb size={18} strokeWidth={1.75} />
                                        </span>
                                        <span className={styles.insightBlockLabel}>
                                          Context / Insight
                                        </span>
                                      </div>
                                      <p className={styles.termContext}>
                                        {entry.detailedExplanation}
                                      </p>
                                    </div>
                                  )}
                                  {entry.exampleInContext && (
                                    <div className={styles.exampleBlock}>
                                      <div className={styles.exampleBlockHeader}>
                                        <span className={styles.insightIconWrap} aria-hidden>
                                          <BookOpen size={17} strokeWidth={1.75} />
                                        </span>
                                        <span className={styles.exampleBlockLabel}>
                                          Example in action
                                        </span>
                                      </div>
                                      <p className={styles.exampleBody}>{entry.exampleInContext}</p>
                                    </div>
                                  )}
                                  {related.length > 0 && (
                                    <div className={styles.relatedTerms}>
                                      <div className={styles.relatedTermsHeader}>
                                        <Link2
                                          size={15}
                                          strokeWidth={2}
                                          className={styles.relatedTermsIcon}
                                          aria-hidden
                                        />
                                        <span className={styles.relatedTermsLabel}>
                                          Related terms
                                        </span>
                                      </div>
                                      <div className={styles.relatedTermsList}>
                                        {related.map((r) => (
                                          <a
                                            key={r.id}
                                            href={`#${r.id}`}
                                            className={styles.relatedPill}
                                            onClick={() => setExpandedId(r.id)}
                                          >
                                            <span>{r.term}</span>
                                            <ArrowUpRight
                                              size={14}
                                              strokeWidth={2}
                                              className={styles.relatedPillArrow}
                                              aria-hidden
                                            />
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {entry.toolLinks?.length || entry.blogLinks?.length ? (
                                    <div className={styles.learningLinks}>
                                      <p className={styles.learningLinksTitle}>Related learning</p>
                                      <div className={styles.learningLinksList}>
                                        {entry.toolLinks?.map((l) => (
                                          <Link
                                            key={l.href}
                                            href={l.href}
                                            className={styles.learningPill}
                                          >
                                            {l.label}
                                            <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
                                          </Link>
                                        ))}
                                        {entry.blogLinks?.map((l) => (
                                          <Link
                                            key={l.href}
                                            href={l.href}
                                            className={styles.learningPill}
                                          >
                                            {l.label}
                                            <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </article>
                      )
                    })}
                  </div>
                </div>
              ))
          )}
        </section>

        {/* CTA */}
        <section className={styles.ctaSection} aria-labelledby="glossary-cta">
          <h2 id="glossary-cta" className={styles.ctaTitle}>
            Keep learning and trading
          </h2>
          <p className={styles.ctaSubtitle}>
            Explore guides, try our calculators, and open an account to put your knowledge into
            practice.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/learn/blog" className={styles.ctaBtnPrimary}>
              Explore Trading Guides
            </Link>
            <Link href="/tools/calculators" className={styles.ctaBtnSecondary}>
              Try Our Trading Calculators
            </Link>
            <Link href="/register" className={styles.ctaBtnSecondary}>
              Start Trading
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
