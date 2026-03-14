# Mutual Funds Page – Structure & Content Spec

**Route:** Trade & Invest → Mutual Funds → `/products/mutual-funds`  
**Audience:** Indian investors (beginners to intermediate). Educational + lead conversion.  
**Goal:** Build trust, explain mutual funds simply, convert visitors into leads or investors.

---

## 1. Page structure (top to bottom)

| Order | Section | Purpose |
|-------|---------|--------|
| 1 | Hero | Capture attention; primary CTA |
| 2 | What Are Mutual Funds | Remove confusion; simple explanation + diagram |
| 3 | Types of Mutual Funds | Help users choose category (equity, debt, hybrid, index, ELSS) |
| 4 | Benefits of Mutual Fund Investing | Reinforce why invest |
| 5 | SIP Investment Section | Explain SIP; example; CTA to start SIP |
| 6 | Featured Mutual Funds | Social proof + “Learn More” CTAs |
| 7 | Investment Process | 3 steps: account → choose funds → start SIP/lump sum |
| 8 | Why Invest With Us | Differentiate; trust (advisors, research, onboarding, fees) |
| 9 | Educational Section | NAV, equity vs debt, SIP vs lump sum (accordion or cards) |
| 10 | Call-to-Action Section | Start investing / Book consultation / Download guide |

---

## 2. UI layout suggestions

### 2.1 Hero Section
- **Layout:** Full-width, centred content; optional soft gradient or abstract shape (no heavy imagery).
- **Headline:** One clear line, e.g. “Invest in Mutual Funds for Long-Term Wealth.”
- **Subhead:** 1–2 sentences on benefits (wealth creation, diversification, professional management).
- **CTA:** Single primary button: “Start Investing” or “Explore Funds” (above fold).
- **Optional:** Small trust line below CTA (“Trusted by X+ investors” or “SEBI-registered”).

### 2.2 What Are Mutual Funds
- **Layout:** Two-column on desktop (text left, visual right); stacked on mobile.
- **Content:** Short paragraphs; bullet list for “pooled money → fund manager → diversification.”
- **Visual:** Diagram: Investors → Pool → Fund Manager → Stocks/Bonds. Keep it simple (icons + arrows or illustration).

### 2.3 Types of Mutual Funds
- **Layout:** Grid of cards (5 categories). Each card: icon, category name, 1–2 line description, risk badge (Low / Moderate / High).
- **Categories:** Equity, Debt, Hybrid, Index, ELSS. Optional: “Risk level” colour (e.g. green / yellow / red).

### 2.4 Benefits
- **Layout:** Grid of 4–5 benefit cards with icon + title + short copy (Diversification, Professional management, SIP flexibility, Long-term wealth, Tax benefits).

### 2.5 SIP Section
- **Layout:** Text block + one simple visual (e.g. “₹5,000/month over 10 years” growth curve or table).
- **Content:** What SIP is, why it works, one numeric example (monthly amount, period, approximate outcome).
- **CTA:** “Start a SIP” or “Calculate SIP” (links to calculator or contact).

### 2.6 Featured Funds
- **Layout:** Table or card list (3–6 funds). Columns/cards: Fund name, Category, Risk, 3Y/5Y returns (with disclaimer “past performance…”), “Learn More” button.
- **Mobile:** Cards; “Learn More” as full-width or prominent button.

### 2.7 Investment Process
- **Layout:** Horizontal 3-step flow (desktop); vertical steps (mobile). Step number + title + one line. Optional “Get started” under Step 1.

### 2.8 Why Invest With Us
- **Layout:** 4 strengths in a row (or 2x2 grid): Expert advisors, Research-backed selection, Easy onboarding, Transparent fees. Icon + title + one line each.

### 2.9 Educational Section
- **Layout:** Accordion or expandable cards: “What is NAV?”, “Equity vs Debt”, “SIP vs Lump Sum.” Keeps page scannable.

### 2.10 Final CTA Section
- **Layout:** Single prominent strip (same style as existing CTABanner). Three actions: Start investing (primary), Book consultation (secondary), Download guide (tertiary/link).

---

## 3. Content tone

- **Simple and beginner-friendly:** Short sentences; avoid jargon; explain terms once (NAV, SIP, ELSS).
- **Reassuring, not salesy:** “You can start with a small amount” / “Professional fund managers handle the day-to-day.”
- **India-specific:** Use ₹, mention ELSS, tax benefits, SIP in INR; SEBI/AMFI where relevant.
- **Trust and compliance:** No guaranteed returns; “Past performance does not indicate future results”; “Investments are subject to market risk.”
- **Clear CTAs:** Action-oriented (“Start Investing”, “Book a Consultation”, “Download Guide”) without pressure.

---

## 4. Recommended visuals and charts

| Section | Visual | Notes |
|---------|--------|--------|
| What Are Mutual Funds | Diagram: Investors → Pool → Fund Manager → Market | Icons + arrows; optional illustration. |
| Benefits | Icons per benefit (diversification, manager, calendar, growth, tax) | Consistent icon set (e.g. Lucide). |
| SIP | Simple line chart or table: “₹5,000/month, 10 years, X% CAGR → approx ₹Y” | Add “Illustrative” and disclaimer. |
| Featured Funds | No chart; table/cards with returns % | Past performance disclaimer under table. |
| Investment Process | Numbered circles (1–2–3) + short text | Optional illustration for “Choose funds”. |
| Why Invest With Us | Icons for each strength | Keep minimal. |
| Educational | Optional small diagram for “NAV” or “SIP vs Lump Sum” | Text-first; diagram supports. |

---

## 5. Conversion-focused CTA placements

| Location | CTA | Goal |
|----------|-----|------|
| Hero | “Start Investing” (primary) | High-intent click to register or explore funds. |
| After What Are MF | Optional “Explore Funds” | Soft conversion after education. |
| End of Benefits | “See How SIP Works” or “Start SIP” | Move to SIP section or calculator. |
| SIP Section | “Start a SIP” / “Calculate SIP” | Lead or tool engagement. |
| Featured Funds | “Learn More” per fund | Lead capture or fund detail page. |
| Investment Process | “Create account” / “Contact advisor” on Step 1 | Direct sign-up or contact. |
| Why Invest With Us | “Get started” or “Talk to an advisor” | Differentiate and convert. |
| Educational | “Ready to invest?” (link to CTA section) | Bring back to conversion. |
| Final CTA block | “Start Investing” + “Book Consultation” + “Download Guide” | Multiple conversion paths. |

**Best practice:** One primary CTA per section; repeat “Start Investing” / “Book Consultation” in hero and final strip. Use same button style as rest of site (e.g. accent green).

---

## 6. Compliance and disclaimers

- **Footer of Featured Funds:** “Past performance is not indicative of future results. Read offer document before investing.”
- **SIP example:** “Illustrative. Returns are not guaranteed.”
- **General:** “Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.” Consider a small persistent disclaimer in footer of page.

---

## 7. Responsive and accessibility

- **Mobile-first:** Single column; stacked cards; sticky or prominent CTA on scroll.
- **Touch:** Buttons and “Learn More” targets at least 44px.
- **Contrast:** Follow existing design system (e.g. dark theme with accent green).
- **Headings:** Clear hierarchy (one H1 in hero; H2 per section) for screen readers and SEO.

This spec supports a single long-form page at `/products/mutual-funds` that educates and converts without being a full brokerage UI.
