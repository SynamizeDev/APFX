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
