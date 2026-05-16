import AcademyPage from '../AcademyPageTemplate'

export default function DepositPage() {
    return (
        <AcademyPage
            title="How to deposit?"
            description="Fund your account instantly using our wide range of secure payment methods. Get into the markets without delay."
            videoTitle="Funding Your APFX Trading Account"
            steps={[
                { title: 'Log in to Portal', description: 'Access your secure APFX client area using your registered email and password.' },
                { title: 'Select Deposit Method', description: 'Choose from Bank Wire, Credit Card, USDT, or local payment providers.' },
                { title: 'Enter Amount', description: 'Specify the amount you wish to deposit and select your target trading account.' },
                { title: 'Confirm Transaction', description: 'Follow the on-screen instructions to complete the payment securely.' },
            ]}
            relatedLinks={[
                { label: 'How to withdraw?', href: '/learn/academy/withdraw' },
                { label: 'How to get Bonus?', href: '/learn/academy/get-bonus' },
                { label: 'Payment Methods', href: '/funding' },
            ]}
        />
    )
}
