# Risk Management Tools — Page Structure & Data Spec

**Route:** `/tools/risk-management`  
**Default tool:** `/tools/risk-management/risk-per-trade`  
**Purpose:** Help traders calculate and manage risk before entering trades. Same UI as Calculators (dark theme, card layout, sidebar, interactive inputs).

---

## 1. Page layout

- **Hero:** Title “Risk Management Tools”, short description (control risk, position sizes, better decisions).
- **Main:** Two-column layout: **sidebar** (left) + **content** (right). Sidebar lists 6 tools; active tool opens in content.
- **Below content (on every tool page):** “Golden Risk Management Rules” section + CTA section (“Open Trading Account”, “Start Trading”).

---

## 2. Sidebar navigation

| Tool | Route |
|------|--------|
| Risk Per Trade Calculator | `/tools/risk-management/risk-per-trade` |
| Risk-Reward Ratio Calculator | `/tools/risk-management/risk-reward` |
| Drawdown Recovery Calculator | `/tools/risk-management/drawdown-recovery` |
| Risk of Ruin Calculator | `/tools/risk-management/risk-of-ruin` |
| Position Size Calculator | `/tools/risk-management/position-size` |
| Portfolio Risk Calculator | `/tools/risk-management/portfolio-risk` |

---

## 3. Calculators — data fields and formulas

### Risk Per Trade Calculator
- **Inputs:** `accountBalance`, `riskPercentagePerTrade`, `stopLossPips`
- **Outputs:** `maximumLossAmount`, `recommendedPositionSize` (lots)
- **Formulas:**  
  - `maxLoss = balance × (riskPct / 100)`  
  - `lots = maxLoss / (stopLossPips × pipValuePerLot)` — e.g. pip value $10 per standard lot for USD pairs

### Risk-Reward Ratio Calculator
- **Inputs:** `entryPrice`, `stopLossPrice`, `takeProfitPrice`
- **Outputs:** `riskRewardRatio`, `tradeQuality` (Poor / Moderate / Good)
- **Formulas:**  
  - `risk = |entry − stopLoss|`, `reward = |takeProfit − entry|`  
  - `ratio = reward / risk`  
  - Quality: &lt;1 Poor, 1–2 Moderate, &gt;2 Good

### Drawdown Recovery Calculator
- **Inputs:** `currentAccountBalance`, `drawdownPercentage`
- **Outputs:** `capitalLost`, `percentageReturnRequiredToRecover`
- **Formulas:**  
  - `capitalLost = balance × (drawdownPct / 100)`  
  - `returnRequired = (1 / (1 − drawdownPct/100) − 1) × 100`  
- **UI:** Table showing recovery % for 5%, 10%, …, 50% drawdown.

### Risk of Ruin Calculator
- **Inputs:** `winRate` (%), `riskPerTrade` (%), `rewardToRiskRatio`, `numberOfTrades`
- **Outputs:** `probabilityOfRuin` (%), `riskLevel` (Low / Moderate / High)
- **Formula (simplified):** Edge = (winRate × R) − (1 − winRate). If edge ≤ 0, ruin ≈ 100%. Else RoR ≈ ((1−edge)/(1+edge))^units, with units derived from capital/risk. Risk level from ruin % (e.g. &gt;30% High, &gt;10% Moderate, else Low).

### Position Size Calculator (Risk Management)
- **Inputs:** `totalCapital`, `riskPerTrade` (%), `stopLossPips`
- **Outputs:** `riskAmountPerTrade`, `recommendedPositionSize` (lots)
- **Formulas:** Same as Risk Per Trade: `riskAmount = capital × (riskPct/100)`, `lots = riskAmount / (stopLossPips × pipValuePerLot)`.

### Portfolio Risk Calculator
- **Inputs:** `totalCapital`, `riskPerStrategy` (%), `numberOfStrategiesOrTrades`
- **Outputs:** `totalPortfolioRiskExposure` (%), `suggestedDiversificationLevel` (text)
- **Formulas:**  
  - `totalRiskPct = numberStrategies × riskPerStrategyPct`  
  - Diversification: e.g. &gt;20% “High concentration”, 10–20% “Moderate”, 5–10% “Balanced”, &lt;5% “Conservative”.

---

## 4. UI components

- Reuse **CalculatorLayout** (`CalculatorLayout.module.css`) for container, header, title, subtitle, inputPanel, formGroup, label, input.
- Shared **RiskCalc.module.css** for risk tools: formGrid (2-col → 1-col on small), buttonRow, calculateBtn, resultRow, resultLabel, resultValue, resultGrid, indicator pills (Poor/Moderate/Good, Low/High), recoveryTable.
- Sidebar: same pattern as Calculators (sticky nav, active state with accent border).

---

## 5. Educational section

- **Title:** “Golden Risk Management Rules”
- **Content (bullets):** Risk only 1–2% per trade; always use stop loss; maintain minimum risk-reward 1:2; avoid excessive leverage. Rendered below the active calculator in the content column.

---

## 6. CTA section

- **Title:** “Start trading with discipline”
- **Subtitle:** Open an account and use these tools to manage risk.
- **Buttons:** “Open Trading Account” (primary), “Start Trading” (secondary). Both link to `/register`.

---

## 7. Responsive design

- Sidebar: full width on small screens, horizontal wrap of links; active state uses bottom border instead of left.
- Form grids: single column below ~600px.
- Hero and CTA: padding and font sizes scale with viewport.

---

## 8. Styling consistency

- Dark theme, glass-style cards with gradient border and accent glow (same as Pip/Margin calculators).
- Accent color for result values, active nav, and primary buttons.
- Mono font for numeric inputs and results.
