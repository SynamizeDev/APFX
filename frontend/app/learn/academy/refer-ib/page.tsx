import AcademyPage from '../AcademyPageTemplate'

export default function ReferIBPage() {
    return (
        <AcademyPage
            title="How to refer clients as IB?"
            description="Build a sustainable revenue stream by partnering with APFX. Our IB program offers the industry's most competitive rebate structures."
            videoTitle="Introducing Broker (IB) Portal & Referrals"
            steps={[
                { title: 'Become a Partner', description: 'Apply for an IB account through your portal to receive your unique referral links.' },
                { title: 'Access Marketing Tools', description: 'Use our premium banners, landing pages, and widgets to attract new traders.' },
                { title: 'Track Your Performance', description: 'Monitor your referrals, trade volumes, and rebates in real-time through the IB dashboard.' },
                { title: 'Earn & Withdraw', description: 'Rebates are credited automatically and can be withdrawn at any time.' },
            ]}
            relatedLinks={[
                { label: 'Partner Program', href: '/partners' },
                { label: 'Marketing Assets', href: '/partners' },
                { label: 'Rebate Tiers', href: '/partners' },
            ]}
        />
    )
}
