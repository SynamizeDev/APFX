# Copy Trading Page — Structure & Data Spec

**Route:** `/tools/copy-trading`  
**Purpose:** Tools, education, and onboarding for copy trading (no live trading). Matches Tools/Calculators dark theme and card-based UI.

---

## 1. Page layout (section order)

| # | Section | Purpose |
|---|---------|--------|
| 1 | Hero | Title, short description, primary CTA "Start Copy Trading", secondary "Explore Top Traders" |
| 2 | Copy Trading Profit Calculator | Inputs: investment, monthly return %, months → outputs: portfolio value, total profit, growth projection |
| 3 | Top Traders Leaderboard | Cards/table of example traders with ROI, win rate, followers, risk, "View Profile" / "Copy Trader" |
| 4 | How Copy Trading Works | 4 steps with icons (Choose trader → Allocate funds → Trades replicated → Monitor) |
| 5 | Risk Simulator Tool | Inputs: investment, max drawdown %, risk level → worst-case loss, remaining capital |
| 6 | Trader Performance Insights | Example analytics: monthly returns chart, equity curve, risk score |
| 7 | Benefits of Copy Trading | Icon cards: follow experts, automated strategies, diversification, passive investing |
| 8 | CTA Section | "Open Trading Account", "Start Copy Trading" with strong visual emphasis |

---

## 2. UI component suggestions

- **Hero:** Centered headline, subtitle, two buttons (primary filled, secondary outline). Reuse patterns from Recommendations hero.
- **Calculators:** Use shared `CalculatorLayout` styles: `inputPanel`, `formGroup`, `label`, `input`, `resultRow`, `resultValue`. Same card border, gradient, and accent result styling as Pip/Margin calculators.
- **Leaderboard:** Card grid (or table on desktop). Each card: avatar/initials, name, ROI badge, win rate, followers, risk pill, primary button "Copy Trader" / "View Profile".
- **How it works:** Horizontal step strip (or stacked on mobile). Each step: number/icon, title, one-line description. Connector line or arrow between steps.
- **Risk simulator:** Same calculator card as profit calculator; result area can show two figures (worst-case loss, remaining capital) and optional warning tone for high risk.
- **Performance insights:** One card with: bar chart (monthly returns), simple line or area for equity growth, risk score badge. Use CSS/SVG or minimal chart; no heavy library required.
- **Benefits:** 4 icon cards in a grid (UserCheck, Zap, Layers, TrendingUp or similar).
- **CTA block:** Full-width strip, dark gradient, two prominent buttons, short line of copy.

---

## 3. Data fields

### Profit calculator
- **Inputs:** `investmentAmount` (number), `monthlyReturnPct` (number), `timePeriodMonths` (number).
- **Outputs:** `estimatedPortfolioValue`, `estimatedTotalProfit`, `growthProjectionPct` (or growth multiple).

### Risk simulator
- **Inputs:** `investmentAmount` (number), `maxDrawdownPct` (number), `riskLevel` (e.g. Low / Medium / High — can affect messaging only).
- **Outputs:** `worstCaseLoss`, `remainingCapitalAfterLoss`.

### Trader (leaderboard)
- `id`, `name`, `averageRoiPct`, `winRatePct`, `followersCount`, `riskLevel` (Low | Medium | High), optional `avatarUrl` or `initials`.

### How it works (static)
- `step`, `title`, `description`, `icon` (name or component).

### Performance insights (example/demo)
- `monthlyReturns`: `{ month: string, returnPct: number }[]`
- `equityCurveData`: optional `{ period: string, value: number }[]`
- `riskScore`: number (e.g. 1–10) or label (Low / Medium / High).

### Benefits (static)
- `title`, `shortDescription`, `icon`.

---

## 4. Styling consistency with calculators

- **Background:** Same as app (`var(--color-bg)`).
- **Cards:** `inputPanel`-style: gradient border, glass background, `border-radius: var(--radius-xl)`, accent glow on focus.
- **Inputs:** `CalculatorLayout` — pill-style inputs, `var(--font-mono)`, focus ring with `var(--color-accent)`.
- **Results:** `resultRow` with gradient border, `resultValue` in accent/mono; second line labels for multi-value results.
- **Buttons:** Same as Pip calculator: gradient `calculateBtn`, full-radius, hover lift and glow.
- **Section spacing:** Consistent vertical rhythm (e.g. 4–5rem between sections), `container` max-width and padding aligned with rest of site.

---

## 5. Responsive behavior

- **Hero:** Stack buttons on small screens; title/subtitle wrap.
- **Calculators:** Form grid 2 cols → 1 col below ~600px (match Pip/Margin breakpoints).
- **Leaderboard:** Cards 3 col → 2 → 1; or table → horizontal scroll or card stack on mobile.
- **How it works:** Horizontal steps wrap to 2×2 or stack vertically on narrow viewports.
- **Benefits:** 4 col → 2 → 1.
- **CTA:** Buttons stack on mobile; padding reduced.

---

## 6. CTA placements

- **Hero:** Primary "Start Copy Trading" (e.g. `/register` or `/contact`), secondary "Explore Top Traders" (anchor `#top-traders`).
- **Leaderboard:** Each card: "Copy Trader" or "View Profile" (can link to `/register` or placeholder).
- **End CTA:** "Open Trading Account", "Start Copy Trading" — both high emphasis, same destinations as hero.

All CTAs should drive sign-up or contact; no in-page trading execution.
