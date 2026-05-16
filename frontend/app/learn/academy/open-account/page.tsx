import AcademyPage from '../AcademyPageTemplate'

export default function OpenAccountPage() {
    return (
        <AcademyPage
            title="How to open account?"
            description="Start your trading journey with APFX. Follow our simple, secure process to open your institutional trading account in minutes."
            videoTitle="Account Registration & Verification Walkthrough"
            steps={[
                { title: 'Register Your Details', description: 'Fill out the secure registration form with your personal and contact information.' },
                { title: 'Verify Your Identity', description: 'Upload your ID and proof of address for our fast-tracked KYC compliance process.' },
                { title: 'Choose Account Type', description: 'Select between Standard, ECN, or Professional accounts based on your trading style.' },
                { title: 'Receive Credentials', description: 'Once verified, your MT5/TradingView login credentials will be sent to your secure portal.' },
            ]}
            relatedLinks={[
                { label: 'How to deposit?', href: '/learn/academy/deposit' },
                { label: 'Account Types', href: '/accounts' },
                { label: 'Platform Guide', href: '/platforms' },
            ]}
        />
    )
}
