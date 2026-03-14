import { NextResponse } from 'next/server';
import { getAggregatedMarketData } from '@/services/marketAggregator';

export const dynamic = 'force-dynamic';
export const revalidate = 10;

export interface DashboardIndexItem {
    name: string;
    value: number;
    changePercent: number;
    up: boolean;
}

export interface DashboardStockItem {
    name: string;
    price: number;
    changePercent: number;
    up: boolean;
}

export interface StocksDashboardResponse {
    majorIndices: DashboardIndexItem[];
    majorIndicesList: Record<string, DashboardStockItem[]>;
    marketMovers: {
        gainers: DashboardStockItem[];
        losers: DashboardStockItem[];
        high52: DashboardStockItem[];
        low52: DashboardStockItem[];
    };
    bySector: Record<string, DashboardStockItem[]>;
    byMarketCap: Record<string, DashboardStockItem[]>;
    pennyStocks: Record<string, DashboardStockItem[]>;
    popularCategories: string[];
}

function mockDashboardData(): StocksDashboardResponse {
    const makeStock = (name: string, price: number, pct: number, up: boolean): DashboardStockItem => ({
        name,
        price,
        changePercent: pct,
        up,
    });

    return {
        majorIndices: [
            { name: 'NIFTY50', value: 23510.1, changePercent: 0.48, up: true },
            { name: 'BNK NIFTY', value: 52750.05, changePercent: 0.24, up: true },
            { name: 'FINNIFTY', value: 25130.65, changePercent: -0.79, up: false },
            { name: 'MIDCAP', value: 60462.8, changePercent: -0.74, up: false },
            { name: 'SENSEX', value: 74563.92, changePercent: -0.18, up: false },
        ],
        majorIndicesList: {
            'NIFTY50': [
                makeStock('NIFTY50', 54810, 0.18, true),
                makeStock('NIFTY MIDCAP', 75703.06, -1.1, false),
                makeStock('NIFTY Commodities', 10555, -1.1, false),
                makeStock('NIFTY Pri Bank', 25500, -0.1, false),
                makeStock('NIFTY 700', 13006.25, -1.25, false),
                makeStock('NIFTY Pharma', 77103.78, -1.1, false),
                makeStock('NIFTY PSB Bank', 8506.35, -1.1, false),
                makeStock('NIFTY Commedities', 13410.05, -0.1, false),
            ],
            'NIFTY Next 50': [
                makeStock('NIFTY Next 50', 65200, 0.5, true),
                makeStock('NIFTY Midcap 100', 45200, -0.3, false),
                makeStock('NIFTY Smallcap 100', 15800, 0.2, true),
                makeStock('NIFTY Auto', 22100, -0.4, false),
                makeStock('NIFTY Energy', 38500, 0.6, true),
                makeStock('NIFTY IT', 41200, -0.2, false),
                makeStock('NIFTY Realty', 9800, 1.2, true),
                makeStock('NIFTY FMCG', 52800, 0.1, true),
            ],
        },
        marketMovers: {
            gainers: [
                makeStock('AVANASHI DAS (APFD) LTD', 6.45, 1.0, true),
                makeStock('SANDEEP INFOSYS LIMITED', 14.0, 1.0, true),
                makeStock('ICICI Bank LTD', 54.4, 1.0, true),
                makeStock('GAZIANI GAS (APFD) LTD', 27.1, 1.0, true),
                makeStock('JAPANESE MINING (APFD) LTD', 75.0, 1.0, true),
                makeStock('HINDUSTAN MINING (APFD) LTD', 52.5, 1.0, true),
                makeStock('AMARAVATHI MINING (APFD) LTD', 9.8, 0.57, true),
                makeStock('BANGALORE CEMENTS (APFD) LTD', 1.7, 0.57, true),
            ],
            losers: [
                makeStock('ABC CORP LTD', 120.5, -2.5, false),
                makeStock('XYZ INDUSTRIES', 85.2, -1.8, false),
                makeStock('PQR INFRA LTD', 45.0, -1.2, false),
                makeStock('DEF PHARMA LTD', 320.0, -0.9, false),
                makeStock('GHI METALS LTD', 78.5, -0.8, false),
                makeStock('JKL FMCG LTD', 210.0, -0.7, false),
                makeStock('MNO TECH LTD', 156.0, -0.6, false),
                makeStock('STU BANK LTD', 92.0, -0.5, false),
            ],
            high52: [
                makeStock('Reliance', 2850, 0.5, true),
                makeStock('TCS', 3850, 0.3, true),
                makeStock('HDFC Bank', 1720, 0.2, true),
                makeStock('Infosys', 1580, 0.4, true),
                makeStock('ICICI Bank', 1180, 0.6, true),
                makeStock('HUL', 2450, 0.1, true),
                makeStock('SBI', 820, 0.8, true),
                makeStock('Bharti Airtel', 1420, 0.2, true),
            ],
            low52: [
                makeStock('Stock A Ltd', 45.0, -0.2, false),
                makeStock('Stock B Ltd', 78.0, 0.1, true),
                makeStock('Stock C Ltd', 120.0, -0.5, false),
                makeStock('Stock D Ltd', 56.0, 0.3, true),
                makeStock('Stock E Ltd', 89.0, -0.1, false),
                makeStock('Stock F Ltd', 134.0, 0.2, true),
                makeStock('Stock G Ltd', 67.0, -0.4, false),
                makeStock('Stock H Ltd', 98.0, 0.1, true),
            ],
        },
        bySector: {
            Bank: [
                makeStock('SRI CHAKRA (APFD) LTD', 8430, 1.0, true),
                makeStock('AVANASHI INFOSYS (APFD) LTD', 5930, 1.0, true),
                makeStock('SAUL MINING LIMITED', 25.0, -1.1, false),
                makeStock('ICICI Bank LTD', 1180, 0.5, true),
                makeStock('HDFC Bank LTD', 1720, 0.2, true),
                makeStock('SBI', 820, 0.8, true),
                makeStock('Axis Bank', 1180, 0.3, true),
                makeStock('Kotak Bank', 1680, 0.1, true),
            ],
            FMCG: [
                makeStock('HUL', 2450, 0.2, true),
                makeStock('ITC', 465, 0.1, true),
                makeStock('Nestle', 2580, -0.1, false),
                makeStock('Britannia', 5200, 0.3, true),
                makeStock('Dabur', 580, 0.4, true),
                makeStock('Colgate', 285, -0.2, false),
                makeStock('Godrej Consumer', 1180, 0.5, true),
                makeStock('Marico', 580, 0.2, true),
            ],
            Metals: [
                makeStock('Tata Steel', 145, 0.8, true),
                makeStock('JSW Steel', 890, 0.4, true),
                makeStock('Hindalco', 680, -0.2, false),
                makeStock('Vedanta', 420, 0.6, true),
                makeStock('SAIL', 125, 0.3, true),
                makeStock('Coal India', 480, 0.1, true),
                makeStock('NMDC', 245, -0.4, false),
                makeStock('JSPL', 385, 0.5, true),
            ],
            Pharma: [
                makeStock('Sun Pharma', 1520, 0.2, true),
                makeStock('Dr Reddy\'s', 6180, -0.1, false),
                makeStock('Cipla', 1380, 0.3, true),
                makeStock('Lupin', 1580, 0.1, true),
                makeStock('Biocon', 380, 0.5, true),
                makeStock('Divis Labs', 3850, -0.2, false),
                makeStock('Torrent Pharma', 2580, 0.4, true),
                makeStock('Glenmark', 980, 0.2, true),
            ],
            IT: [
                makeStock('TCS', 3850, 0.3, true),
                makeStock('Infosys', 1580, 0.4, true),
                makeStock('Wipro', 480, -0.2, false),
                makeStock('HCL Tech', 1680, 0.5, true),
                makeStock('Tech Mahindra', 1280, 0.1, true),
                makeStock('LTI Mindtree', 5580, 0.2, true),
                makeStock('Mphasis', 2580, -0.1, false),
                makeStock('Coforge', 5180, 0.3, true),
            ],
        },
        byMarketCap: {
            'Large Cap': [
                makeStock('VINODAN INDUSTRIES (APFD) LTD', 70000, 1.1, true),
                makeStock('ANURAG INFOSYS (APFD) LTD', 10000, 1.1, true),
                makeStock('Reliance', 2850, 0.5, true),
                makeStock('TCS', 3850, 0.3, true),
                makeStock('HDFC Bank', 1720, 0.2, true),
                makeStock('Infosys', 1580, 0.4, true),
                makeStock('ICICI Bank', 1180, 0.6, true),
                makeStock('HUL', 2450, 0.1, true),
            ],
            'Mid Cap': [
                makeStock('DE VAN COMPANY (APFD) LTD', 4510, -1.1, false),
                makeStock('Tata Elxsi', 6850, 0.5, true),
                makeStock('Persistent', 5580, 0.3, true),
                makeStock('APL Apollo', 1580, 0.2, true),
                makeStock('Polycab', 4580, -0.1, false),
                makeStock('Dixon Tech', 11850, 0.4, true),
                makeStock('Trent', 4850, 0.6, true),
                makeStock('ABB India', 6580, 0.2, true),
            ],
            'Small Cap': [
                makeStock('Small Cap A', 245, 1.2, true),
                makeStock('Small Cap B', 128, 0.8, true),
                makeStock('Small Cap C', 356, -0.5, false),
                makeStock('Small Cap D', 89, 1.5, true),
                makeStock('Small Cap E', 412, 0.3, true),
                makeStock('Small Cap F', 178, -0.2, false),
                makeStock('Small Cap G', 534, 0.9, true),
                makeStock('Small Cap H', 267, 0.4, true),
            ],
        },
        pennyStocks: {
            'Under 10rs': [
                makeStock('MAHARASHTRA CEMENT LTD', 52.5, 1.0, true),
                makeStock('MEGALAND INDUSTRIES LTD', 1.0, 1.0, true),
                makeStock('MANDAVI INDUSTRIES LTD', 0.55, -1.5, false),
                makeStock('Penny Stock A', 2.5, 2.0, true),
                makeStock('Penny Stock B', 5.8, 0.5, true),
                makeStock('Penny Stock C', 8.2, -0.8, false),
                makeStock('Penny Stock D', 3.1, 1.2, true),
                makeStock('Penny Stock E', 6.5, 0.3, true),
            ],
            'Under 7rs': [
                makeStock('Low Price A', 1.2, 1.5, true),
                makeStock('Low Price B', 3.5, -0.5, false),
                makeStock('Low Price C', 5.0, 0.8, true),
                makeStock('Low Price D', 2.8, 1.0, true),
                makeStock('Low Price E', 6.2, 0.2, true),
                makeStock('Low Price F', 4.1, -0.3, false),
                makeStock('Low Price G', 0.9, 2.0, true),
                makeStock('Low Price H', 5.5, 0.4, true),
            ],
            'Under 5rs': [
                makeStock('Micro A', 0.55, 1.5, true),
                makeStock('Micro B', 2.1, 0.6, true),
                makeStock('Micro C', 4.2, -0.4, false),
                makeStock('Micro D', 1.8, 1.0, true),
                makeStock('Micro E', 3.5, 0.3, true),
                makeStock('Micro F', 0.9, 2.1, true),
                makeStock('Micro G', 2.5, -0.2, false),
                makeStock('Micro H', 4.8, 0.5, true),
            ],
        },
        popularCategories: [
            'Textiles and wears',
            'Trader',
            'Chemical',
            '52 Week High',
            '52 Week Low',
            'Transportation',
            'FMCG',
            'Metals',
            'Logistics',
            'Bank',
            'Financials',
            'Real Estate',
            'Auto',
            'Infrastructure',
            'Building Materials',
            'Consumer Discretionary',
            'Oil and Gas',
            'Top Gainers',
            'Top Losers',
            'Stocks Under 1000',
            'Stocks Under 500',
            'Stocks Under 100',
            'Stocks Under 50',
            'Stocks Under 10',
            'Nifty 500 Companies',
            'Nifty 100 Companies',
            'Nifty 50 Companies',
        ],
    };
}

const DASHBOARD_TO_API_NAME: Record<string, string> = {
    NIFTY50: 'Nifty 50',
    SENSEX: 'Sensex',
    'BNK NIFTY': 'BNK NIFTY',
    FINNIFTY: 'FINNIFTY',
    MIDCAP: 'MIDCAP',
};

function mergeLiveQuotes(
    dashboard: StocksDashboardResponse,
    quotes: { symbol: string; price: number; percent_change: number; change: number; up?: boolean }[]
): StocksDashboardResponse {
    const byDisplayName: Record<string, { price: number; percent_change: number; up: boolean }> = {};
    quotes.forEach((q) => {
        byDisplayName[q.symbol] = {
            price: q.price,
            percent_change: q.percent_change,
            up: q.up ?? q.percent_change >= 0,
        };
    });

    const mergedMajor = dashboard.majorIndices.map((idx) => {
        const apiName = DASHBOARD_TO_API_NAME[idx.name] ?? idx.name;
        const live = byDisplayName[apiName];
        if (live) return { ...idx, value: live.price, changePercent: live.percent_change, up: live.up };
        return idx;
    });

    return {
        ...dashboard,
        majorIndices: mergedMajor,
    };
}

export async function GET() {
    try {
        const base = mockDashboardData();
        let quotes: Awaited<ReturnType<typeof getAggregatedMarketData>> = [];
        try {
            quotes = await getAggregatedMarketData();
        } catch {
            // use mock only
        }
        const dashboard = mergeLiveQuotes(base, quotes);
        return NextResponse.json(dashboard);
    } catch (error) {
        console.error('[API/stocks/dashboard] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stocks dashboard' },
            { status: 500 }
        );
    }
}
