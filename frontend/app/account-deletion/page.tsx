import { Metadata } from 'next'
import AccountDeletionClient from './AccountDeletionClient'

export const metadata: Metadata = {
  title: 'Delete Your APFX Trading Account | APFX',
  description: 'Learn how to request deletion of your APFX trading account. Submit your account deletion request and our support team will process it according to our policies.',
  alternates: {
    canonical: 'https://apfxglobal.com/account-deletion',
  }
}

export default function AccountDeletionPage() {
  return <AccountDeletionClient />
}
