import AcademyPage from '../AcademyPageTemplate'

export default function WithdrawPage() {
    return (
        <AcademyPage
            title="How to withdraw?"
            description="Enjoy fast, hassle-free withdrawals. We prioritize your liquidity with a streamlined request and approval process."
            videoTitle="Withdrawing Profits from APFX"
            steps={[
                { title: 'Navigate to Withdrawals', description: 'Go to the "Funds" section in your portal and select "Withdrawal".' },
                { title: 'Choose Your Method', description: 'Withdrawal must be made back to the original source of funding whenever possible.' },
                { title: 'Request Amount', description: 'Enter the amount you wish to withdraw and confirm your bank or wallet details.' },
                { title: 'Processing & Approval', description: 'Our finance team processes most requests within 24 hours on business days.' },
            ]}
            relatedLinks={[
                { label: 'How to deposit?', href: '/learn/academy/deposit' },
                { label: 'Withdrawal Policy', href: '/legal' },
                { label: 'Support Center', href: '/support' },
            ]}
        />
    )
}
