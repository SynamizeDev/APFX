// frontend/services/economicProviders/mockEconomicProvider.ts
// Generates realistic, randomised economic events with rich ForexFactory-style details.
// Serves as the final fallback — UI NEVER crashes.

import { EconomicEvent, HistoricalRelease } from '@/types/economic';

function genId(): string {
    return `mock-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

interface EventMetadata {
    event: string;
    currency: string;
    country: string;
    impact: 'High' | 'Medium' | 'Low';
    forecastRange: [number, number];
    unit: string;
    description: string;
    whyTradersCare: string;
    usualEffect: string;
    frequency: string;
    dataSource: string;
}

const EVENT_TEMPLATES: EventMetadata[] = [
    // USD
    {
        event: 'Non-Farm Payrolls',
        currency: 'USD',
        country: 'United States',
        impact: 'High',
        forecastRange: [150, 250],
        unit: 'K',
        description: 'Change in the number of employed people during the previous month, excluding the farming industry.',
        whyTradersCare: 'Job creation is an important leading indicator of consumer spending, which accounts for the majority of overall economic activity.',
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released monthly, usually on the first Friday after the month ends.',
        dataSource: 'Bureau of Labor Statistics'
    },
    {
        event: 'Unemployment Rate',
        currency: 'USD',
        country: 'United States',
        impact: 'High',
        forecastRange: [3.5, 4.5],
        unit: '%',
        description: 'Percentage of the total work force that is unemployed and actively seeking employment during the previous month.',
        whyTradersCare: 'Although generally considered a lagging indicator, the number of unemployed people is an important signal of overall economic health because consumer spending is highly correlated with labor-market conditions.',
        usualEffect: 'Actual < Forecast is good for currency;',
        frequency: 'Released monthly, usually on the first Friday after the month ends.',
        dataSource: 'Bureau of Labor Statistics'
    },
    {
        event: 'CPI m/m',
        currency: 'USD',
        country: 'United States',
        impact: 'High',
        forecastRange: [0.1, 0.6],
        unit: '%',
        description: 'Change in the price of goods and services purchased by consumers.',
        whyTradersCare: 'Consumer prices account for a majority of overall inflation. Inflation is important to currency valuation because rising prices lead the central bank to raise interest rates out of respect for their inflation containment mandate.',
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released monthly, around the middle of the month.',
        dataSource: 'Bureau of Labor Statistics'
    },
    {
        event: 'Federal Funds Rate',
        currency: 'USD',
        country: 'United States',
        impact: 'High',
        forecastRange: [4.0, 5.75],
        unit: '%',
        description: 'Interest rate at which depository institutions lend balances at the Federal Reserve to other depository institutions overnight.',
        whyTradersCare: 'Short term interest rates are the paramount factor in currency valuation - traders look at most other indicators merely to predict how rates will change in the future.',
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released 8 times per year.',
        dataSource: 'Federal Reserve'
    },
    {
        event: 'GDP q/q',
        currency: 'USD',
        country: 'United States',
        impact: 'High',
        forecastRange: [1.0, 3.5],
        unit: '%',
        description: 'Annualized change in the inflation-adjusted value of all goods and services produced by the economy.',
        whyTradersCare: "It's the broadest measure of economic activity and the primary gauge of the economy's health.",
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released quarterly, approx 30 days after the quarter ends.',
        dataSource: 'Bureau of Economic Analysis'
    },
    // EUR
    {
        event: 'ECB Interest Rate Decision',
        currency: 'EUR',
        country: 'Euro Area',
        impact: 'High',
        forecastRange: [2.5, 4.5],
        unit: '%',
        description: 'Interest rate on the main refinancing operations, which provide the bulk of liquidity to the banking system.',
        whyTradersCare: 'Interest rate changes are a primary driver of currency valuation. Most other economic indicators are parsed to anticipate future ECB policy shifts.',
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released 8 times per year.',
        dataSource: 'European Central Bank (ECB)'
    },
    {
        event: 'CPI Flash Estimate y/y',
        currency: 'EUR',
        country: 'Euro Area',
        impact: 'High',
        forecastRange: [1.5, 4.0],
        unit: '%',
        description: 'Flash estimate of the change in consumer prices across the Eurozone.',
        whyTradersCare: 'Eurozone inflation is watched with intense scrutiny by the ECB. A high inflation print increases pressure on policy makers to tighten monetary policy.',
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released monthly, at the end of the reporting month.',
        dataSource: 'Eurostat'
    },
    // GBP
    {
        event: 'BoE Interest Rate Decision',
        currency: 'GBP',
        country: 'United Kingdom',
        impact: 'High',
        forecastRange: [3.5, 5.5],
        unit: '%',
        description: 'Official Bank Rate set by the Bank of England Monetary Policy Committee.',
        whyTradersCare: 'Interest rates are the main lever of monetary policy and dictate sterling demand in global markets.',
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released 8 times per year.',
        dataSource: 'Bank of England'
    },
    {
        event: 'UK CPI y/y',
        currency: 'GBP',
        country: 'United Kingdom',
        impact: 'High',
        forecastRange: [1.5, 4.5],
        unit: '%',
        description: 'Change in the price of goods and services purchased by UK households.',
        whyTradersCare: 'This is the UK inflation benchmark. High levels of inflation typically spur interest rate hikes by the Bank of England.',
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released monthly, about 18 days after the month ends.',
        dataSource: 'Office for National Statistics'
    },
    // JPY
    {
        event: 'BoJ Interest Rate Decision',
        currency: 'JPY',
        country: 'Japan',
        impact: 'High',
        forecastRange: [-0.1, 0.5],
        unit: '%',
        description: 'Short-term policy interest rate target set by the Bank of Japan Policy Board.',
        whyTradersCare: 'Interest rate decisions shape the yen capital costs and define carry trade dynamics worldwide.',
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released 8 times per year.',
        dataSource: 'Bank of Japan'
    },
    // AUD
    {
        event: 'RBA Interest Rate Decision',
        currency: 'AUD',
        country: 'Australia',
        impact: 'High',
        forecastRange: [2.5, 4.5],
        unit: '%',
        description: 'Cash rate target determined by the Reserve Bank of Australia Board.',
        whyTradersCare: 'The cash rate is Australia’s key borrowing benchmark and highly influences the carry trade profile of the Australian Dollar.',
        usualEffect: 'Actual > Forecast is good for currency;',
        frequency: 'Released 11 times per year (monthly except January).',
        dataSource: 'Reserve Bank of Australia'
    }
];

function generateHistory(template: EventMetadata, baseVal: number): HistoricalRelease[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const currentMonthIdx = new Date().getMonth();

    const history: HistoricalRelease[] = [];
    for (let i = 1; i <= 5; i++) {
        let mIdx = currentMonthIdx - i;
        let y = currentYear;
        if (mIdx < 0) {
            mIdx += 12;
            y -= 1;
        }

        const dateStr = `${months[mIdx]} 15, ${y}`;
        const [min, max] = template.forecastRange;
        const offset = (Math.random() - 0.5) * (max - min) * 0.2;
        const act = Math.max(min, Math.min(max, baseVal + offset));
        const fore = Math.max(min, Math.min(max, baseVal + offset * 0.8));
        const prev = Math.max(min, Math.min(max, baseVal + offset * 1.2));

        history.push({
            date: dateStr,
            actual: act.toFixed(1) + template.unit,
            forecast: fore.toFixed(1) + template.unit,
            previous: prev.toFixed(1) + template.unit
        });
    }
    return history;
}

export function generateMockEconomicEvents(days = 7): EconomicEvent[] {
    const events: EconomicEvent[] = [];
    const todayStr = new Date().toISOString().split('T')[0];

    for (let d = -1; d <= days; d++) {
        const dDate = new Date();
        dDate.setDate(dDate.getDate() + d);
        const date = dDate.toISOString().split('T')[0];

        // Pick 3-5 events per day
        const count = 3 + Math.floor(Math.random() * 3);
        const shuffled = [...EVENT_TEMPLATES].sort(() => Math.random() - 0.5).slice(0, count);

        shuffled.forEach((template) => {
            const hours = ['01:30', '04:30', '08:30', '10:00', '12:30', '14:00', '19:30'];
            const time = hours[Math.floor(Math.random() * hours.length)];

            const [min, max] = template.forecastRange;
            const mid = (min + max) / 2;
            const forecastVal = randomBetween(min, max);
            const previousVal = randomBetween(min, max);

            // Is the event in the past?
            const isPast = d < 0 || (d === 0 && time < new Date().toTimeString().slice(0, 5));
            const actualVal = isPast ? randomBetween(min, max) : undefined;

            const baseVal = actualVal !== undefined ? actualVal : forecastVal;
            const historyList = generateHistory(template, baseVal);

            const nextReleaseDate = new Date(dDate);
            nextReleaseDate.setDate(nextReleaseDate.getDate() + 30);

            events.push({
                id: genId(),
                date,
                time,
                country: template.country,
                currency: template.currency,
                impact: template.impact,
                event: template.event,
                actual: actualVal !== undefined ? actualVal.toFixed(1) + template.unit : undefined,
                forecast: forecastVal.toFixed(1) + template.unit,
                previous: previousVal.toFixed(1) + template.unit,
                provider: 'mock',
                mock: true,
                description: template.description,
                whyTradersСare: template.whyTradersCare,
                usualEffect: template.usualEffect,
                frequency: template.frequency,
                dataSource: template.dataSource,
                nextRelease: nextReleaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                history: historyList
            });
        });
    }

    return events.sort((a, b) => {
        const dCompare = a.date.localeCompare(b.date);
        return dCompare !== 0 ? dCompare : a.time.localeCompare(b.time);
    });
}

function randomBetween(min: number, max: number): number {
    return min + Math.random() * (max - min);
}
