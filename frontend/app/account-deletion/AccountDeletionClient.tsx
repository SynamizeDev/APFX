'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Shield, Trash2, AlertTriangle, ArrowRight } from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import styles from './AccountDeletion.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function AccountDeletionClient() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      accountId: formData.get('accountId'),
      phone: formData.get('phone'),
      reason: formData.get('reason'),
      understood: formData.get('understood') === 'on'
    }

    try {
      console.log('Account Deletion Request Payload:', data)
      // Placeholder API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      // await fetch(`${apiUrl}/api/account-deletion`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      
      setStatus('success')
    } catch (err) {
      console.error('Account deletion submission error:', err)
      setStatus('error')
    }
  }

  return (
    <div className={styles.page}>
      <InnerPageHero
        title="Request Trading Account Deletion"
        accentLine="Account Deletion"
        subtitle="If you wish to permanently close your APFX trading account, you can submit a deletion request using the form below. Our support team will verify your identity before processing the request."
        breadcrumbs={[{ label: 'Account Deletion' }]}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          
          {/* Steps Section */}
          <section className={styles.stepsSection}>
            <motion.div
              className={styles.stepsGrid}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className={styles.stepCard} variants={fadeUp}>
                <div className={styles.stepIconWrapper}>
                  <span className={styles.stepNum}>1</span>
                </div>
                <h3>Submit Request</h3>
                <p>Send an account deletion request to our support team from your registered email address.</p>
              </motion.div>
              
              <motion.div className={styles.stepCard} variants={fadeUp}>
                <div className={styles.stepIconWrapper}>
                  <Shield className={styles.stepIcon} />
                </div>
                <h3>Identity Verification</h3>
                <p>For your security, our team will verify ownership of the trading account before any action is taken.</p>
              </motion.div>
              
              <motion.div className={styles.stepCard} variants={fadeUp}>
                <div className={styles.stepIconWrapper}>
                  <Trash2 className={styles.stepIcon} />
                </div>
                <h3>Account Deletion</h3>
                <p>Once verification is complete, the trading account will be permanently deleted according to APFX policies.</p>
              </motion.div>
            </motion.div>
          </section>

          {/* Form and Sidebar */}
          <div className={styles.contentGrid}>
            <motion.div 
              className={styles.formSection}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className={styles.glassCard}>
                <h2 className={styles.formTitle}>Account Deletion Request Form</h2>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key="message"
                    className={styles.form}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p style={{ color: 'var(--color-text-2)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      To request the permanent deletion of your APFX trading account, please contact our support team directly from your registered email address. Make sure to include your Trading Account ID in the email.
                    </p>
                    <a 
                      href="mailto:support@apfxglobal.com?subject=Trading%20Account%20Deletion%20Request" 
                      className={styles.submitBtn}
                      style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
                    >
                      Email Support Team
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            
            <motion.aside 
              className={styles.sidebarSection}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              <div className={styles.warningCard}>
                <div className={styles.warningHeader}>
                  <AlertTriangle className={styles.warningIcon} />
                  <h3>Important Information</h3>
                </div>
                <ul className={styles.warningList}>
                  <li>Deleting your trading account is permanent.</li>
                  <li>Once your request has been approved, your trading account cannot be restored.</li>
                  <li>Certain regulatory or financial records may be retained where required by law.</li>
                  <li>Identity verification may be required before processing your request.</li>
                  <li>Processing typically takes 1–3 business days after successful verification.</li>
                </ul>
              </div>

            </motion.aside>
          </div>
          
          <motion.div
            className={styles.needHelp}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className={styles.needHelpLabel}>Need help?</span>
            {' '}If you have any questions regarding account deletion, please contact our support team at{' '}
            <a href="mailto:support@apfxglobal.com?subject=Trading%20Account%20Deletion%20Request" className={styles.inlineLink}>
              support@apfxglobal.com
            </a>.
          </motion.div>

          <footer className={styles.footerNote}>
            <p>This page is provided to comply with Google Play Developer Policy regarding account deletion requests.</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
