import styles from './Careers.module.css'

const PRINCIPLES = [
  {
    title: 'Think Clearly',
    desc: 'Break problems down to first principles. Make rational, data-informed decisions without institutional bureaucracy.',
  },
  {
    title: 'Communicate Openly',
    desc: 'Direct, honest and transparent feedback. We challenge assumptions respectfully to reach the best outcomes.',
  },
  {
    title: 'Execute Relentlessly',
    desc: 'High standards, rapid iteration, and relentless focus on delivering value for global traders and partners.',
  },
]

export default function LifeAtApfxSection() {
  return (
    <section id="life-at-apfx" className={styles.sectionCulture} aria-labelledby="life-at-apfx-heading">
      <div className={styles.container}>
        <div className={styles.cultureLayout}>
          <div className={styles.cultureContent}>
            <span className={styles.cultureKicker}>Culture & Working Style</span>
            <h2 id="life-at-apfx-heading" className={styles.cultureHeading}>
              A PLACE TO BUILD,
              <br />
              LEARN & GROW.
            </h2>
            <p className={styles.cultureText}>
              APFX brings together people across technology, marketing, operations, partnerships and
              financial markets. We encourage clear thinking, open communication and people who are
              willing to take ownership.
            </p>
          </div>

          <div className={styles.principlesList}>
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className={styles.principleItem}>
                <div className={styles.principleDot} aria-hidden="true" />
                <div>
                  <h3 className={styles.principleTitle}>{principle.title}</h3>
                  <p className={styles.principleDesc}>{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
