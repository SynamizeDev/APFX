// frontend/config/providers.ts

export const PROVIDERS = {
    FINNHUB: {
        BASE_URL: 'https://finnhub.io/api/v1',
        KEY: process.env.FINNHUB_API_KEY || '',
    },
    POLYGON: {
        BASE_URL: 'https://api.polygon.io/v2',
        KEY: process.env.POLYGON_API_KEY || '',
    },
    TWELVEDATA: {
        BASE_URL: 'https://api.twelvedata.com',
        KEY: process.env.TWELVEDATA_API_KEY || '',
    }
};

// Symbol Mappings based on user request
export const SYMBOL_MAPPINGS = {
    forex: [
        { display: 'EUR/USD', finnhub: 'OANDA:EUR_USD', polygon: 'C:EURUSD', twelvedata: 'EUR/USD' },
        { display: 'GBP/USD', finnhub: 'OANDA:GBP_USD', polygon: 'C:GBPUSD', twelvedata: 'GBP/USD' },
        { display: 'USD/JPY', finnhub: 'OANDA:USD_JPY', polygon: 'C:USDJPY', twelvedata: 'USD/JPY' },
        { display: 'AUD/USD', finnhub: 'OANDA:AUD_USD', polygon: 'C:AUDUSD', twelvedata: 'AUD/USD' },
        { display: 'USD/CAD', finnhub: 'OANDA:USD_CAD', polygon: 'C:USDCAD', twelvedata: 'USD/CAD' },
        { display: 'USD/CHF', finnhub: 'OANDA:USD_CHF', polygon: 'C:USDCHF', twelvedata: 'USD/CHF' },
        { display: 'NZD/USD', finnhub: 'OANDA:NZD_USD', polygon: 'C:NZDUSD', twelvedata: 'NZD/USD' },
        { display: 'USD/INR', finnhub: 'OANDA:USD_INR', polygon: 'C:USDINR', twelvedata: 'USD/INR' },
        { display: 'USD/AED', finnhub: 'FX:USDAED', polygon: 'C:USDAED', twelvedata: 'USD/AED' },
        { display: 'USD/SGD', finnhub: 'OANDA:USD_SGD', polygon: 'C:USDSGD', twelvedata: 'USD/SGD' },
        { display: 'USD/HKD', finnhub: 'OANDA:USD_HKD', polygon: 'C:USDHKD', twelvedata: 'USD/HKD' },
        { display: 'USD/CNY', finnhub: 'OANDA:USD_CNY', polygon: 'C:USDCNY', twelvedata: 'USD/CNY' },
    ],
    commodities: [
        { display: 'XAU/USD', finnhub: 'OANDA:XAU_USD', polygon: 'C:XAUUSD', twelvedata: 'XAU/USD' },
        { display: 'XAG/USD', finnhub: 'OANDA:XAG_USD', polygon: 'C:XAGUSD', twelvedata: 'XAG/USD' },
        { display: 'WTI Oil', finnhub: 'OANDA:WTICO_USD', polygon: '', twelvedata: 'USOIL' }, // Mapping varies
        { display: 'Brent Oil', finnhub: 'OANDA:BCO_USD', polygon: '', twelvedata: 'UKOIL' },
        { display: 'Natural Gas', finnhub: 'OANDA:NATGAS_USD', polygon: '', twelvedata: 'NATGAS' },
        { display: 'Copper', finnhub: 'OANDA:XCU_USD', polygon: '', twelvedata: 'COPPER' },
    ],
    crypto: [
        { display: 'BTC/USD', finnhub: 'BINANCE:BTCUSDT', polygon: 'X:BTCUSD', twelvedata: 'BTC/USD' },
        { display: 'ETH/USD', finnhub: 'BINANCE:ETHUSDT', polygon: 'X:ETHUSD', twelvedata: 'ETH/USD' },
        { display: 'BNB/USD', finnhub: 'BINANCE:BNBUSDT', polygon: 'X:BNBUSD', twelvedata: 'BNB/USD' },
        { display: 'SOL/USD', finnhub: 'BINANCE:SOLUSDT', polygon: 'X:SOLUSD', twelvedata: 'SOL/USD' },
        { display: 'XRP/USD', finnhub: 'BINANCE:XRPUSDT', polygon: 'X:XRPUSD', twelvedata: 'XRP/USD' },
        { display: 'ADA/USD', finnhub: 'BINANCE:ADAUSDT', polygon: 'X:ADAUSD', twelvedata: 'ADA/USD' },
        { display: 'DOGE/USD', finnhub: 'BINANCE:DOGEUSDT', polygon: 'X:DOGEUSD', twelvedata: 'DOGE/USD' },
    ],
    indices: [
        { display: 'S&P 500', finnhub: 'OANDA:SPX500_USD', polygon: 'I:SPX', twelvedata: 'SPX' },
        { display: 'NASDAQ', finnhub: 'OANDA:NAS100_USD', polygon: 'I:NDX', twelvedata: 'NDX' },
        { display: 'Dow Jones', finnhub: 'OANDA:US30_USD', polygon: 'I:DJI', twelvedata: 'DJI' },
        { display: 'FTSE 100', finnhub: 'OANDA:UK100_GBP', polygon: '', twelvedata: 'FTSE' },
        { display: 'DAX', finnhub: 'OANDA:DE30_EUR', polygon: '', twelvedata: 'GDAXI' },
        { display: 'Nikkei 225', finnhub: 'OANDA:JP225_USD', polygon: '', twelvedata: 'N225' },
        { display: 'Nifty 50', finnhub: '', polygon: '', twelvedata: 'NIFTY' },
        { display: 'Sensex', finnhub: '', polygon: '', twelvedata: 'SENSEX' },
        { display: 'Dubai Financial Market Index', finnhub: '', polygon: '', twelvedata: 'DFMGI' },
        { display: 'BNK NIFTY', finnhub: '', polygon: '', twelvedata: 'NIFTYBANK' },
        { display: 'FINNIFTY', finnhub: '', polygon: '', twelvedata: 'NIFTYFIN' },
        { display: 'MIDCAP', finnhub: '', polygon: '', twelvedata: 'NIFTYMIDCAP' },
    ],
    stocks: [
        { display: 'Apple', finnhub: 'AAPL', polygon: 'AAPL', twelvedata: 'AAPL' },
        { display: 'Microsoft', finnhub: 'MSFT', polygon: 'MSFT', twelvedata: 'MSFT' },
        { display: 'Amazon', finnhub: 'AMZN', polygon: 'AMZN', twelvedata: 'AMZN' },
        { display: 'Nvidia', finnhub: 'NVDA', polygon: 'NVDA', twelvedata: 'NVDA' },
        { display: 'Tesla', finnhub: 'TSLA', polygon: 'TSLA', twelvedata: 'TSLA' },
        { display: 'Meta', finnhub: 'META', polygon: 'META', twelvedata: 'META' },
        { display: 'Google', finnhub: 'GOOGL', polygon: 'GOOGL', twelvedata: 'GOOGL' },
        { display: 'Saudi Aramco', finnhub: '2222.SR', polygon: '', twelvedata: '2222.SR' },
        { display: 'Reliance', finnhub: 'RELIANCE.NS', polygon: '', twelvedata: 'RELIANCE' },
        { display: 'TCS', finnhub: 'TCS.NS', polygon: '', twelvedata: 'TCS' },
        { display: 'HDFC Bank', finnhub: 'HDFCBANK.NS', polygon: '', twelvedata: 'HDFCBANK' },
    ]
};
