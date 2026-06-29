import { Metadata } from 'next';
import CTraderClient from './CTraderClient';

export const metadata: Metadata = {
    title: 'cTrader Web Terminal | APFX',
    description: 'Trade directly from your browser with the advanced cTrader Web platform on APFX.',
};

export default function CTraderPage() {
    return <CTraderClient />;
}
