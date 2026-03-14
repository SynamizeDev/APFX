# Recommendations Page – Structure, Content & UI Spec

**Route:** Trade & Invest → Recommendation → `/products/recommendation`  
**Audience:** Investors. Showcase research-based insights and stock ideas; build trust and drive platform adoption.  
**Goal:** Demonstrate research expertise, surface investment ideas, and encourage subscribe / open account / contact advisor.

---

## 1. Page structure

### 1.1 Hub (`/products/recommendation`)

| Order | Section | Purpose |
|-------|---------|---------|
| 1 | Hero | Headline on expert recommendations, research-based value prop, primary CTA |
| 2 | Latest Recommendations | Cards/table: stock, sector, type (Buy/Hold/Watchlist), target, horizon, analyst; “View Analysis” |
| 3 | Market Insights | Sector opportunities, trends, weekly/monthly outlook (expert insights) |
| 4 | Top Picks | Curated lists: short-term ideas, long-term picks, high-growth sector stocks |
| 5 | Research Reports | Links to company reports, sector analysis, market outlook |
| 6 | Performance Tracking | Past recommendations: date, entry, current price, performance % (credibility) |
| 7 | Risk Disclosure | Disclaimer: informational only; markets involve risk |
| 8 | Why Trust Our Research | Analysts, data-driven process, track record |
| 9 | Call-to-Action | Subscribe, Open account, Contact advisor |

### 1.2 Detail page (`/products/recommendation/[slug]`)

When user clicks a recommendation:

| Block | Content |
|-------|---------|
| Company overview | Short description of the company |
| Investment thesis | Why we recommend; key arguments |
| Key growth drivers | 3–5 bullet points |
| Financial highlights | Revenue, profit, key ratios (table or metrics) |
| Target price & expected upside | Target, current, upside % |
| Risks involved | Key risk factors |
| CTA | “Invest through us” / “Contact advisor” |

---

## 2. UI layout

### 2.1 Hero
- Centred. Headline: e.g. “Expert Investment Recommendations.”
- Subhead: research and market analysis; not personalised advice.
- CTA: “Explore Investment Ideas” / “View Latest Recommendations” (anchor or scroll).

### 2.2 Latest Recommendations
- **Layout:** Card grid (2–3 cols) or responsive table. Each card/row: stock name, sector, badge (Buy/Hold/Watchlist), target price, time horizon, analyst/team.
- **CTA per item:** “View Analysis” → `/products/recommendation/[slug]`.
- **Visual:** Badge colour by type (e.g. green Buy, amber Hold, grey Watchlist).

### 2.3 Market Insights
- **Layout:** 3 cards or tabs: Sector opportunities | Market trends | Weekly/Monthly outlook. Short paragraphs or bullet lists.

### 2.4 Top Picks
- **Layout:** 3 lists (or tabbed): Top short-term ideas | Long-term picks | High-growth sector stocks. Each list: stock name, sector, 1-line reason or target; optional “View” link.

### 2.5 Research Reports
- **Layout:** List or grid of report cards: title, type (Company / Sector / Market outlook), date, “Download” or “Read more”.

### 2.6 Performance Tracking
- **Layout:** Table: Recommendation date, Stock, Entry price, Current price, Performance %. Optional sparkline or trend icon. Disclaimer: past performance.

### 2.7 Risk Disclosure
- Full-width strip: recommendations are informational; not advice; markets involve risk; consider your own situation.

### 2.8 Why Trust Our Research
- 3 pillars: Experienced analysts | Data-driven research | Proven track record. Icon + title + short copy.

### 2.9 CTA section
- Single strip: Subscribe to recommendations | Open investment account | Contact financial advisor.

---

## 3. Data fields for stock recommendations

| Field | Description | List card | Detail page |
|-------|-------------|-----------|-------------|
| slug | URL id | – | ✓ |
| stockName | Company / stock name | ✓ | ✓ |
| sector | Sector/industry | ✓ | ✓ |
| recommendationType | Buy / Hold / Watchlist | ✓ | ✓ |
| targetPrice | Target (₹) | ✓ | ✓ |
| currentPrice | Current (₹) | ✓ | ✓ |
| expectedUpside | % upside to target | Optional | ✓ |
| timeHorizon | Short / Medium / Long term | ✓ | ✓ |
| analystName | Analyst or team | ✓ | ✓ |
| publishedAt | Date | Optional | ✓ |
| overview | Company summary | – | ✓ |
| investmentThesis | Why we recommend | – | ✓ |
| growthDrivers | Bullet list | – | ✓ |
| financialHighlights | Key metrics | – | ✓ |
| risks | Risk factors | – | ✓ |

### Performance tracking (past recs)

| Field | Use |
|-------|-----|
| recommendationDate | When recommended |
| stockName | Same as above |
| entryPrice | Price at recommendation |
| currentPrice | Latest price |
| performancePercent | (current - entry) / entry * 100 |

---

## 4. Suggested charts and visuals

- **Detail page:** Small line chart (price vs time) or bar (target vs current); optional sector peer comparison.
- **Performance tracking:** Table with % column; optional green/red by sign; small trend icon.
- **Market insights:** Simple icons per insight type; optional mini chart for “market trend” (e.g. index trend).
- **Why Trust:** Icons for analysts, data, track record; optional “X+ recommendations” or “Y% accuracy” stat (if compliant).

---

## 5. CTA placements

| Location | CTA | Goal |
|----------|-----|------|
| Hero | “Explore Investment Ideas” / “View Latest Recommendations” | Scroll to list or engagement |
| Each recommendation card | “View Analysis” | Detail page |
| Detail page | “Invest through us” / “Contact advisor” | Conversion |
| Research Reports | “Download” / “Read more” | Engagement or gated content |
| Performance | – | Trust only |
| Final CTA block | Subscribe | Open account | Contact advisor | Multiple conversion paths |

---

## 6. Compliance

- All recommendations labelled as “for informational purposes only” and “not investment advice”.
- Risk disclosure: investments subject to market risk; consider your own goals and risk tolerance.
- Past performance disclaimer where performance tracking is shown.

This spec supports a hub at `/products/recommendation` and detail at `/products/recommendation/[slug]`.
