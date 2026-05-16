import AcademyPage from '../AcademyPageTemplate'

export default function GetBonusPage() {
    return (
        <AcademyPage
            title="How to get Bonus?"
            description="Boost your trading capital with our exclusive bonus programs. Learn how to activate and utilize your trading rewards."
            videoTitle="Activating Your APFX Trading Bonus"
            steps={[
                { title: 'Check Promotions', description: 'View available bonus offers in the "Promotions" tab of your client portal.' },
                { title: 'Meet Requirements', description: 'Ensure your account type and deposit amount qualify for the specific bonus.' },
                { title: 'Opt-in & Claim', description: 'Click "Claim Bonus" before or after your deposit as per the promotion rules.' },
                { title: 'Trade & Convert', description: 'Monitor your bonus progress and trading volume requirements to convert bonus to equity.' },
            ]}
            relatedLinks={[
                { label: 'Bonus Terms', href: '/bonus-terms' },
                { label: 'Current Promotions', href: '/accounts' },
                { label: 'How to deposit?', href: '/learn/academy/deposit' },
            ]}
        />
    )
}
