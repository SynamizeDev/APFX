import AcademyPage from '../AcademyPageTemplate'

export default function CopyTradingPage() {
    return (
        <AcademyPage
            title="How copy trading works?"
            description="Leverage the expertise of professional traders. Automatically replicate the trades of top-performing strategy providers."
            videoTitle="Mastering APFX Copy Trading"
            steps={[
                { title: 'Explore Strategy List', description: 'Browse our leaderboard of professional traders and filter by risk, return, and drawdown.' },
                { title: 'Allocate Funds', description: 'Select a strategy and decide how much capital you want to allocate to follow them.' },
                { title: 'Set Risk Parameters', description: 'Configure stop-loss and multiplier settings to maintain full control of your risk.' },
                { title: 'Monitor & Adjust', description: 'Track performance in real-time and add or remove followers with a single click.' },
            ]}
            relatedLinks={[
                { label: 'Strategy Leaderboard', href: '/trade&invest/copy-trading' },
                { label: 'Become a Provider', href: '/partners' },
                { label: 'How to deposit?', href: '/learn/academy/deposit' },
            ]}
        />
    )
}
