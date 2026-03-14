# MTF Page – Structure, Content & UI Spec

**Route:** Trade & Invest → MTF → `/products/mtf`  
**Audience:** Indian investors. Educational + conversion to activate MTF / open account.  
**Goal:** Explain margin trading simply, highlight benefits and risks, and encourage users to activate MTF or contact the company.

---

## 1. Page structure (single-page hub)

| Order | Section | Purpose |
|-------|---------|---------|
| 1 | Hero | Headline on Margin Trading Facility, short leverage value prop, primary CTA |
| 2 | What is MTF | How margin trading works, leverage and borrowed funds, simple example (limited capital → larger position) |
| 3 | Key Benefits of MTF | Increased buying power, amplified exposure, flexible funding, potential for higher returns |
| 4 | Example of Margin Trading | Scenario: investor capital + broker margin = total buying power; visual (bars or diagram) |
| 5 | Eligible Stocks for MTF | Only approved stocks; example categories; link/section for eligible list |
| 6 | Risks of Margin Trading | Amplified losses, margin calls, interest on borrowed funds, volatility |
| 7 | Charges and Interest Rates | Margin interest rate, brokerage, holding period rules; transparent disclosure |
| 8 | How to Activate MTF | 4 steps: Open account → Activate margin → Select eligible stocks → Start trading |
| 9 | Risk Disclaimer | Clear compliance: margin involves risk; trade responsibly |
| 10 | Call-to-Action | Activate MTF, Contact advisor, Open trading account |

---

## 2. Page layout and UI suggestions

### 2.1 Hero
- Full-width, centred. Headline: e.g. “Trade with More Power — Margin Trading Facility.”
- Subhead: one line on trading with leverage (borrow to buy more). Primary CTA: “Start Margin Trading” or “Activate MTF”; secondary: “Learn how it works” (anchor to What is MTF).
- Short risk line: “Margin trading involves risk. Borrowed funds can amplify gains and losses.”

### 2.2 What is MTF
- Two-column (desktop): text left; right — simple diagram: Your Capital + Broker Margin = Buying Power (with icons or blocks).
- Bullets: how margin works, leverage in plain language, one numeric example (e.g. ₹1 lakh capital + ₹1 lakh margin = ₹2 lakh buying power).

### 2.3 Key Benefits
- Grid of 4 cards: Increased buying power | Amplify market exposure | Flexible funding | Potential for higher returns. Icon + title + one line each.

### 2.4 Example of Margin Trading
- **Layout:** Card or bordered block. Three values in a row or stacked: Investor capital (e.g. ₹1,00,000), Margin from broker (e.g. ₹1,00,000), Total buying power (e.g. ₹2,00,000). Optional: simple bar or stacked bar (your money vs borrowed).
- **UI:** Labels + amounts; optional “Leverage ratio” (e.g. 2x). Keep numbers illustrative; add disclaimer “Example only.”

### 2.5 Eligible Stocks
- Short para: MTF only on approved stocks and exchanges. Bullet or chips: example categories (e.g. Large cap, selected mid cap, index stocks). CTA: “View eligible stocks” (anchor or link to list/PDF).

### 2.6 Risks
- 4 risk cards or list: Amplified losses | Margin calls | Interest on borrowed funds | Market volatility. Use caution styling (e.g. amber/red accent) so benefits vs risks feel balanced.

### 2.7 Charges and Interest
- Table or definition list: Margin interest rate (e.g. X% p.a.), Brokerage charges, Holding period / square-off rules. “Transparency builds trust” line.

### 2.8 How to Activate
- Horizontal 4-step flow (desktop); vertical on mobile. Steps: (1) Open trading account, (2) Activate margin facility, (3) Select eligible stocks, (4) Start trading with margin. Numbered circles + one line each. CTA after: “Activate MTF” or “Open account”.

### 2.9 Risk Disclaimer
- Full-width strip or card: “Margin trading involves significant risk. Losses can exceed your initial investment. Trade responsibly and only with capital you can afford to lose.” Optional: link to risk disclosure page.

### 2.10 CTA section
- Single strip: “Activate margin trading” (primary), “Contact advisor”, “Open trading account”. Match style of other product CTAs.

---

## 3. UI suggestions for leverage example and calculators

- **Leverage example:** Two blocks or bars — “Your capital” (one colour), “Margin (borrowed)” (another colour), sum = “Total buying power”. Optional: “2x leverage” badge.
- **Calculator (future):** Inputs: Your capital, Margin % or leverage multiple → Output: Buying power, Max position size. Keep for phase 2 if needed; spec only needs the static example for now.

---

## 4. Data fields for margin calculations (reference)

| Field | Description | Use |
|-------|-------------|-----|
| Investor capital | Cash/collateral (₹) | Example and any calculator |
| Margin rate / multiple | Broker’s margin (e.g. 50% = 2x) | Buying power = Capital / (1 - margin %) or Capital × multiple |
| Total buying power | Capital + margin (₹) | Display in example |
| Interest rate | % p.a. on borrowed amount | Charges section |
| Holding period | Days before square-off / rollover | Charges section |

---

## 5. Suggested visuals

- **What is MTF:** Diagram: Your Capital + Broker Margin → Buying Power (blocks or icons).
- **Example:** Stacked bar or two segments (Your capital | Margin) = Total; or three numbers in a row with arrows.
- **Risks:** Icon per risk (e.g. trend down for amplified losses, bell for margin call).
- **How to Activate:** Numbered steps with icons (account, activation, list, trade).

---

## 6. Conversion-focused CTA placement

| Location | CTA | Goal |
|----------|-----|------|
| Hero | “Start Margin Trading” / “Activate MTF” | Primary conversion |
| After What is MTF | “See benefits” or “Activate now” | Scroll to benefits or contact |
| After Example | “Activate MTF” | Convert after understanding |
| Eligible stocks | “View eligible stocks” | Engagement / list page |
| How to Activate | “Open account” / “Activate MTF” | Direct sign-up or activation |
| Final CTA block | “Activate margin trading” + “Contact advisor” + “Open account” | Multiple paths |

---

## 7. Content tone and compliance

- **Simple language:** Explain “margin”, “leverage”, “buying power” once. Avoid jargon.
- **Balanced:** Benefits and risks in same page; no guarantee of returns.
- **India context:** ₹, SEBI, exchange rules, broker margin as per Indian norms.
- **Compliance:** Clear disclaimer that margin involves risk, losses can exceed capital; trade responsibly.

This spec supports a single hub at `/products/mtf` with no separate sub-routes for the first version.
