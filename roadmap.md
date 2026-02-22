# APFX Finance Website — Full Roadmap
## From Design to Deployment

**Vision:** A world-class, institutional-grade finance platform website — inspired by the editorial depth of gtcfx.com and cmsprime.com, but elevated to the visual and motion quality seen in premium fintech references. Think Bloomberg Terminal meets Apple product launch.

---

## 0. Monorepo Folder Structure
```
APFX/
├── frontend/                   # Next.js 14 App Router
│   ├── app/
│   │   ├── (marketing)/        # Public pages group
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── markets/
│   │   │   ├── platforms/
│   │   │   ├── accounts/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── legal/
│   │   ├── (portal)/           # Protected client portal
│   │   │   └── dashboard/
│   │   ├── api/                # Next.js route handlers
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                 # Primitives (buttons, cards, modals)
│   │   ├── sections/           # Full page sections
│   │   ├── canvas/             # Three.js / WebGL components
│   │   ├── animations/         # GSAP timelines, Framer variants
│   │   └── layout/             # Header, footer, nav
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # API clients, utils, constants
│   ├── styles/                 # Global CSS, design tokens
│   ├── public/                 # Static assets (fonts, SVGs, textures)
│   └── package.json
│
├── backend/                    # Node.js / Express or Nest.js API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── index.ts
│   ├── .env.example
│   └── package.json
│
├── .github/
│   └── workflows/
│       ├── frontend-deploy.yml
│       └── backend-deploy.yml
│
├── package.json                # Monorepo root (workspaces)
└── turbo.json                  # Turborepo config (optional)
```

---

## 1. Tech Stack
| Layer | Technology | Why |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | SSR, ISR, SEO, image optimization |
| **Styling** | CSS Modules + CSS Variables | Zero runtime, design tokens |
| **3D / WebGL** | Three.js + R3F + Drei | Globe, particles, depth effects |
| **Animation (scroll)** | GSAP + ScrollTrigger | Industry-grade scroll choreography |
| **Animation (UI)** | Framer Motion | Page transitions, component-level motion |
| **Smooth scroll** | Lenis | Buttery scroll feel, syncs with GSAP |
| **Particles** | Custom Three.js | Hero background, depth layers |
| **Charts** | TradingView Widget | Live price tickers, market charts |
| **Auth (portal)** | NextAuth.js | Client portal authentication |
| **Backend** | Node.js + Express | REST API for forms, CRM, alerts |
| **Database** | PostgreSQL | User data, form submissions |
| **Email** | Resend + React Email | Transactional, inquiry handling |
| **Deployment** | Vercel / Render | Optimized for Next.js and Node.js |

---

## 2. Design System
### Color Palette
- `--color-bg`: `#03050A` (Near-black obsidian)
- `--color-surface`: `#0B0F1A` (Dark navy surface)
- `--color-border`: `#1A2235` (Subtle border)
- `--color-accent`: `#00C896` (Emerald green — primary CTA)
- `--color-gold`: `#C9A84C` (Premium accent for trust badges)
- `--color-text-1`: `#F0F4FF` (Primary text)

### Typography
- **Display:** "Syne" — bold, modern, editorial
- **Body:** "Inter" — clean, readable, institutional
- **Mono:** "JetBrains Mono" — numbers, tickers, data

---

## 3. Phase-by-Phase Build Plan

### 🔵 Phase 1 — Monorepo Scaffold
- Init monorepo at `d:\Projects\APFX`
- Set up Next.js 14 Frontend and Express Backend
- Install GSAP, Three.js, Framer Motion, Lenis
- Create design tokens and base layout

### 🟢 Phase 2 — Global Shell
- Glassmorphism Header with animated navigation
- Footer with animated counters and regulatory info
- Live ticker tape in header

### 🟡 Phase 3 — Homepage (The Flagship)
- Cinematic entry animation (session-once)
- Hero: 3D Globe background + staggered headlines
- Markets: 3D card carousel with live spreads
- Why APFX: Bento-grid with scroll-triggered reveals
- Interactive Globe for global scale visualization

### 🟠 Phase 4 — Inner Pages
- `/markets`: Live price tables and categories
- `/platforms`: Device mockups and comparisons
- `/accounts`: Detailed tier comparisons
- `/about`: Timeline and team history
- `/contact`: Animated forms + office maps

### 🔴 Phase 5 — Backend API
- Form handlers (Contact/Leads)
- Market data proxies
- Rate limiting and validation (Zod)
- Error logging and health checks

### 🟣 Phase 6 — Performance Optimization
- Dynamic imports for Three.js (no-SSR)
- aggressive image and font optimization
- Lighthouse audit (Target 90+ across all metrics)

### ⚫ Phase 7 — SEO & Accessibility
- Dynamic Metadata, Sitemap, and Robots.ts
- Structured Data (JSON-LD)
- WCAG AA accessibility audit

### 🚀 Phase 8 — Deployment & CI/CD
- Vercel for Frontend, Render for Backend
- GitHub Actions for automated deployment

---

## 4. Timeline Estimate
| Phase | Task | Duration |
| :--- | :--- | :--- |
| Phase 1–2 | Scaffold & Shell | Days 1–3 |
| Phase 3 | Homepage | Days 4–8 |
| Phase 4 | Inner Pages | Days 9–14 |
| Phase 5–8 | API, Perf, SEO, Deploy | Days 15–22 |
| — | Buffer / QA | Days 23–25 |
**Total: ~5 Weeks**

---

## 5. Post-Launch Backlog
- Client Portal (Dashboard/Login)
- Multi-language support (Arabic, Hindi, etc.)
- Dark/Light mode toggle
- TradingView embedded charts
- Push notifications for market alerts

---

## 6. Project Constraints & Operational Notes
- **Redirects**: "Login" and "Open Account" buttons are currently configured to redirect to external client portal URLs (`https://portal.apfx.com`) rather than local routes.
- **Customer Support**: All form submissions and queries are routed via the backend to the primary customer service email (`support@apfx.com`) using the Resend integration.
- **Market Data**: Liquidity stats and ticker values are currently **mocked** for visual consistency. Future phases will explore free-tier financial APIs (e.g., Alpha Vantage, Finnhub) to provide live data overlays.

---
> **Note:** Start every coding session by running `npm run dev` from the monorepo root to spin up both frontend (:3000) and backend (:5000) simultaneously.
