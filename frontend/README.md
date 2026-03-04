# APFX — High-Performance Global Trading Platform

APFX is a premium, institutional-grade trading platform designed for the modern trader. It provides seamless access to Forex, Commodities, Indices, Stocks, and Cryptocurrencies with real-time pricing and advanced execution capabilities.

## 🚀 Features

- **Dynamic Markets Dashboard**: Real-time pricing across major asset classes powered by **Finnhub**.
- **Consolidated Updates**: Advanced server-side aggregation ensures only one API request is sent from the browser per minute.
- **Institutional UI/UX**: Professional fintech aesthetic inspired by industry leaders (Stripe, Revolut, TradingView).
- **Cinematic Animations**: Smooth page transitions and Yahoo Finance-style real-time price blinks.

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Market Data**: [Finnhub API](https://finnhub.io/)
- **Animations**: Framer Motion & GSAP
- **Icons**: Lucide React

## 📦 Getting Started

### 1. Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_FINNHUB_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Installation & Run
```bash
npm install
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Build & Deployment
```bash
npm run build
npm run start
```

© 2024 APFX Global Ltd. All rights reserved.
