import styles from './Careers.module.css'

const WHY_CARDS = [
  {
    number: '01',
    title: 'OWN YOUR WORK',
    body: 'We value people who take responsibility, make decisions and push ideas forward.',
  },
  {
    number: '02',
    title: 'MOVE WITH SPEED',
    body: 'We believe strong execution matters. Test, learn, improve and keep moving.',
  },
  {
    number: '03',
    title: 'THINK GLOBALLY',
    body: 'Work on products and experiences designed for traders and partners across international markets.',
  },
  {
    number: '04',
    title: 'KEEP GROWING',
    body: 'Learn from ambitious people, take on bigger challenges and continuously improve your craft.',
  },
]

export default function WhyApfxSection() {
  return (
    <section className={styles.sectionWhy} aria-labelledby="why-apfx-heading">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 id="why-apfx-heading" className={styles.sectionHeading}>
            WHY WORK AT APFX?
          </h2>
          <p className={styles.sectionSubtext}>
            Build meaningful products, solve real problems and grow alongside a team focused on
            creating a better trading experience.
          </p>
        </div>

        <div className={styles.whyGrid}>
          {WHY_CARDS.map((card) => (
            <article key={card.number} className={styles.whyCard}>
              <span className={styles.whyCardNumber} aria-hidden="true">
                {card.number}
              </span>
              <h3 className={styles.whyCardTitle}>{card.title}</h3>
              <p className={styles.whyCardBody}>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
