'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import styles from '@/components/layout/LegalLayout.module.css'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export default function TermsOfServiceClient() {
  return (
    <div className={styles.page}>
      <InnerPageHero
        title="Terms &"
        accentLine="Conditions"
        subtitle="The legal framework governing your relationship with APFX Global Markets. Please read these terms carefully before using our services."
        breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Terms & Conditions' }]}
      />

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div
              className={styles.content}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.h2 variants={fadeUp}>3.1 Acceptance of Terms</motion.h2>
              <motion.p variants={fadeUp}>
                By accessing this website or opening a trading account with APFX Global Markets, the
                Client agrees to be bound by these Terms and Conditions.
              </motion.p>
              <motion.p
                variants={fadeUp}
                style={{ color: 'var(--color-accent)', fontWeight: 'var(--fw-semibold)' }}
              >
                If the Client does not agree with these Terms, the Client should not use the
                services.
              </motion.p>

              <motion.h2 variants={fadeUp}>3.2 Eligibility</motion.h2>
              <motion.p variants={fadeUp}>Clients must:</motion.p>
              <motion.ul variants={stagger}>
                <motion.li variants={fadeUp}>Be at least 18 years old.</motion.li>
                <motion.li variants={fadeUp}>
                  Have legal capacity to enter into binding agreements.
                </motion.li>
                <motion.li variants={fadeUp}>
                  Comply with the laws of their country of residence.
                </motion.li>
              </motion.ul>
              <motion.p variants={fadeUp}>
                The Company reserves the right to reject any account application at its sole
                discretion.
              </motion.p>

              <motion.h2 variants={fadeUp}>3.3 Restricted Jurisdictions</motion.h2>
              <motion.p variants={fadeUp}>
                APFX Global Markets does not offer services to residents of jurisdictions where
                forex or CFD trading is restricted or prohibited by local laws.
              </motion.p>
              <motion.p variants={fadeUp}>
                The Company reserves the right to decline or terminate accounts from restricted
                jurisdictions.
              </motion.p>

              <motion.h2 variants={fadeUp}>3.4 Client Responsibility</motion.h2>
              <motion.p variants={fadeUp}>Clients are responsible for:</motion.p>
              <motion.ul variants={stagger}>
                <motion.li variants={fadeUp}>
                  Maintaining confidentiality of account credentials.
                </motion.li>
                <motion.li variants={fadeUp}>Monitoring account activity.</motion.li>
                <motion.li variants={fadeUp}>Ensuring sufficient margin.</motion.li>
                <motion.li variants={fadeUp}>Understanding trading risks.</motion.li>
              </motion.ul>
              <motion.p variants={fadeUp}>
                The Company shall not be liable for unauthorized access resulting from Client
                negligence.
              </motion.p>

              <motion.h2 variants={fadeUp}>3.5 Order Execution</motion.h2>
              <motion.p variants={fadeUp}>
                The Company shall use commercially reasonable efforts to execute Client orders.
              </motion.p>
              <motion.p variants={fadeUp}>However, the Client acknowledges that:</motion.p>
              <motion.ul variants={stagger}>
                <motion.li variants={fadeUp}>Prices may change rapidly.</motion.li>
                <motion.li variants={fadeUp}>Slippage may occur.</motion.li>
                <motion.li variants={fadeUp}>
                  Execution delays may occur during market volatility.
                </motion.li>
                <motion.li variants={fadeUp}>Market gaps may affect order execution.</motion.li>
              </motion.ul>
              <motion.p variants={fadeUp}>
                The Company does not guarantee execution at requested prices.
              </motion.p>

              <motion.h2 variants={fadeUp}>3.6 Leverage</motion.h2>
              <motion.p variants={fadeUp}>
                Trading with leverage increases both potential profits and potential losses.
              </motion.p>
              <motion.p variants={fadeUp}>The Company reserves the right to:</motion.p>
              <motion.ul variants={stagger}>
                <motion.li variants={fadeUp}>Adjust leverage levels.</motion.li>
                <motion.li variants={fadeUp}>Change margin requirements.</motion.li>
                <motion.li variants={fadeUp}>Close positions due to insufficient margin.</motion.li>
              </motion.ul>

              <motion.h2 variants={fadeUp}>3.7 Margin Call & Stop Out</motion.h2>
              <motion.p variants={fadeUp}>
                Clients are responsible for monitoring margin levels.
              </motion.p>
              <motion.p variants={fadeUp}>
                The Company may close open positions without prior notice if account equity falls
                below required margin thresholds.
              </motion.p>

              <motion.h2 variants={fadeUp}>3.8 Deposits & Withdrawals</motion.h2>
              <motion.p variants={fadeUp}>
                Clients must use payment methods registered in their own name.
              </motion.p>
              <motion.p variants={fadeUp}>The Company reserves the right to:</motion.p>
              <motion.ul variants={stagger}>
                <motion.li variants={fadeUp}>Request verification documents.</motion.li>
                <motion.li variants={fadeUp}>Reject suspicious transactions.</motion.li>
                <motion.li variants={fadeUp}>
                  Delay withdrawals pending compliance checks.
                </motion.li>
              </motion.ul>
              <motion.p variants={fadeUp}>
                Withdrawals may be processed only to verified payment sources belonging to the
                Client.
              </motion.p>

              <motion.h2 variants={fadeUp}>3.9 Anti-Money Laundering (AML)</motion.h2>
              <motion.p variants={fadeUp}>
                The Company complies with anti-money laundering procedures and may require identity
                verification at any time.
              </motion.p>
              <motion.p variants={fadeUp}>The Company reserves the right to:</motion.p>
              <motion.ul variants={stagger}>
                <motion.li variants={fadeUp}>Request additional documentation.</motion.li>
                <motion.li variants={fadeUp}>Reject transactions.</motion.li>
                <motion.li variants={fadeUp}>Suspend or terminate accounts.</motion.li>
                <motion.li variants={fadeUp}>
                  Report suspicious activity to relevant authorities.
                </motion.li>
              </motion.ul>

              <motion.h2 variants={fadeUp}>3.10 Prohibited Trading Practices</motion.h2>
              <motion.p variants={fadeUp}>
                To maintain a fair, transparent, and secure trading environment, APFX strictly
                prohibits any trading activity that exploits platform vulnerabilities, manipulates
                market conditions, or violates our Terms &amp; Conditions. Any prohibited activity
                may result in trade cancellation, profit adjustment, account suspension, or
                permanent account termination.
              </motion.p>

              <motion.ul variants={stagger} className={styles.prohibitedList}>
                <motion.li variants={fadeUp} className={styles.prohibitedItem}>
                  <span className={styles.prohibitedNum}>1</span>
                  <span className={styles.prohibitedBody}>
                    <span className={styles.prohibitedTitle}>Arbitrage Abuse</span>
                    <span className={styles.prohibitedDesc}>
                      Using pricing discrepancies, delayed quotes, execution delays, or differences
                      between liquidity providers to generate risk-free profits is strictly
                      prohibited.
                    </span>
                  </span>
                </motion.li>
                <motion.li variants={fadeUp} className={styles.prohibitedItem}>
                  <span className={styles.prohibitedNum}>2</span>
                  <span className={styles.prohibitedBody}>
                    <span className={styles.prohibitedTitle}>Latency Exploitation</span>
                    <span className={styles.prohibitedDesc}>
                      Using ultra-low latency systems, server delays, or execution timing advantages
                      to gain an unfair trading benefit is not permitted.
                    </span>
                  </span>
                </motion.li>
                <motion.li variants={fadeUp} className={styles.prohibitedItem}>
                  <span className={styles.prohibitedNum}>3</span>
                  <span className={styles.prohibitedBody}>
                    <span className={styles.prohibitedTitle}>Market Manipulation</span>
                    <span className={styles.prohibitedDesc}>
                      Any attempt to manipulate market prices, create misleading trading activity,
                      coordinate abusive trading behavior, or artificially influence market
                      conditions is prohibited.
                    </span>
                  </span>
                </motion.li>
                <motion.li variants={fadeUp} className={styles.prohibitedItem}>
                  <span className={styles.prohibitedNum}>4</span>
                  <span className={styles.prohibitedBody}>
                    <span className={styles.prohibitedTitle}>Bonus &amp; Promotion Abuse</span>
                    <span className={styles.prohibitedDesc}>
                      Misusing welcome bonuses, cashback offers, referral programs, promotional
                      campaigns, or trading incentives outside their intended purpose may result in
                      bonus removal and account restrictions.
                    </span>
                  </span>
                </motion.li>
                <motion.li variants={fadeUp} className={styles.prohibitedItem}>
                  <span className={styles.prohibitedNum}>5</span>
                  <span className={styles.prohibitedBody}>
                    <span className={styles.prohibitedTitle}>Unauthorized Trading Software</span>
                    <span className={styles.prohibitedDesc}>
                      The use of unauthorized Expert Advisors (EAs), malicious algorithms, modified
                      trading software, bots designed to exploit platform weaknesses, or any
                      software that interferes with normal platform operation is prohibited.
                    </span>
                  </span>
                </motion.li>
                <motion.li variants={fadeUp} className={styles.prohibitedItem}>
                  <span className={styles.prohibitedNum}>6</span>
                  <span className={styles.prohibitedBody}>
                    <span className={styles.prohibitedTitle}>Fraudulent or Illegal Activity</span>
                    <span className={styles.prohibitedDesc}>
                      Identity fraud, payment fraud, money laundering, forged documentation,
                      chargebacks, or any illegal financial activity will result in immediate
                      investigation and may lead to permanent account closure.
                    </span>
                  </span>
                </motion.li>
                <motion.li variants={fadeUp} className={styles.prohibitedItem}>
                  <span className={styles.prohibitedNum}>7</span>
                  <span className={styles.prohibitedBody}>
                    <span className={styles.prohibitedTitle}>Multi-Account Abuse</span>
                    <span className={styles.prohibitedDesc}>
                      Creating or operating multiple accounts to bypass trading rules, promotional
                      limitations, risk controls, or account restrictions without written approval
                      is prohibited.
                    </span>
                  </span>
                </motion.li>
                <motion.li variants={fadeUp} className={styles.prohibitedItem}>
                  <span className={styles.prohibitedNum}>8</span>
                  <span className={styles.prohibitedBody}>
                    <span className={styles.prohibitedTitle}>
                      Price Feed or Execution Exploitation
                    </span>
                    <span className={styles.prohibitedDesc}>
                      Knowingly taking advantage of pricing errors, off-market quotes, stale prices,
                      execution glitches, technical malfunctions, or platform errors to generate
                      profits is not permitted.
                    </span>
                  </span>
                </motion.li>
              </motion.ul>

              <motion.div variants={fadeUp} className={styles.shieldBox}>
                <div className={styles.shieldBoxHeader}>
                  <span className={styles.shieldIcon}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  <span className={styles.shieldBoxTitle}>Company Rights</span>
                </div>
                <p className={styles.shieldBoxIntro}>
                  APFX continuously monitors trading activity to protect the integrity of its
                  trading environment. If prohibited activity is detected, APFX reserves the right,
                  at its sole discretion, to:
                </p>
                <ul className={styles.shieldList}>
                  <li>Cancel or amend trades executed through abusive practices.</li>
                  <li>Remove profits generated from prohibited activity.</li>
                  <li>Suspend or permanently terminate trading accounts.</li>
                  <li>Restrict access to specific products, promotions, or services.</li>
                  <li>Withhold bonuses, rebates, commissions, or incentive payments.</li>
                  <li>
                    Report suspicious or unlawful activity to relevant regulatory or legal
                    authorities where required.
                  </li>
                </ul>
              </motion.div>

              <motion.h2 variants={fadeUp}>3.11 Bonuses & Promotions</motion.h2>
              <motion.p variants={fadeUp}>
                Promotional offers are subject to separate terms and conditions.
              </motion.p>
              <motion.p variants={fadeUp}>The Company reserves the right to:</motion.p>
              <motion.ul variants={stagger}>
                <motion.li variants={fadeUp}>Modify promotions.</motion.li>
                <motion.li variants={fadeUp}>Cancel bonuses.</motion.li>
                <motion.li variants={fadeUp}>Restrict withdrawals related to abuse.</motion.li>
              </motion.ul>

              <motion.h2 variants={fadeUp}>3.12 Limitation of Liability</motion.h2>
              <motion.p variants={fadeUp}>The Company shall not be liable for:</motion.p>
              <motion.ul variants={stagger}>
                <motion.li variants={fadeUp}>Indirect losses</motion.li>
                <motion.li variants={fadeUp}>Consequential damages</motion.li>
                <motion.li variants={fadeUp}>Loss of profits</motion.li>
                <motion.li variants={fadeUp}>Technical interruptions</motion.li>
                <motion.li variants={fadeUp}>Market volatility</motion.li>
                <motion.li variants={fadeUp}>Internet failures</motion.li>
                <motion.li variants={fadeUp}>Third-party system failures</motion.li>
              </motion.ul>

              <motion.h2 variants={fadeUp}>3.13 Intellectual Property</motion.h2>
              <motion.p variants={fadeUp}>
                All website content, logos, graphics, and materials remain the intellectual property
                of APFX Global Markets.
              </motion.p>
              <motion.p variants={fadeUp}>Unauthorized use is prohibited.</motion.p>

              <motion.h2 variants={fadeUp}>3.14 Account Suspension & Termination</motion.h2>
              <motion.p variants={fadeUp}>
                The Company reserves the right to suspend or terminate accounts at its discretion,
                particularly in cases involving:
              </motion.p>
              <motion.ul variants={stagger}>
                <motion.li variants={fadeUp}>Fraud</motion.li>
                <motion.li variants={fadeUp}>AML concerns</motion.li>
                <motion.li variants={fadeUp}>Regulatory violations</motion.li>
                <motion.li variants={fadeUp}>Abusive trading behavior</motion.li>
              </motion.ul>

              <motion.h2 variants={fadeUp}>3.15 Governing Law</motion.h2>
              <motion.p variants={fadeUp}>
                These Terms shall be governed by the laws applicable to the Company’s jurisdiction
                of incorporation.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
