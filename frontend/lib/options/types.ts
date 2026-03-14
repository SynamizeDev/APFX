export interface UnderlyingInfo {
    symbol: string;
    name: string;
    spot: number;
    changePercent: number;
    up: boolean;
}

export interface StrikeRow {
    strike: number;
    ce: OptionQuote;
    pe: OptionQuote;
}

export interface OptionQuote {
    ltp: number;
    bid: number;
    ask: number;
    oi: number;
    changeInOi: number;
    iv: number;
    volume: number;
}

export interface OptionsChainResponse {
    symbol: string;
    name: string;
    spot: number;
    changePercent: number;
    up: boolean;
    expiries: string[];
    selectedExpiry: string;
    pcrOi: number;
    pcrVolume: number;
    rows: StrikeRow[];
}

export interface StrategyLeg {
    id: string;
    type: 'CE' | 'PE';
    strike: number;
    qty: number;
    action: 'buy' | 'sell';
    premium: number;
}

export interface PayoffPoint {
    underlying: number;
    pnl: number;
}
