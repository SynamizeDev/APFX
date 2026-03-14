# IPO Page – Structure, Content & UI Spec

**Route:** Trade & Invest → IPO → `/products/ipo`  
**Audience:** Indian investors (beginners to intermediate). Educational + apply-through-us conversion.  
**Goal:** Build credibility, simplify IPO investing, and encourage users to apply via your platform or advisory.

---

## 1. Page structure (main IPO hub)

| Order | Section | Purpose |
|-------|---------|--------|
| 1 | Hero | Headline, short value prop, primary CTA |
| 2 | What is an IPO | Simple definition, how companies go public, why investors participate |
| 3 | Upcoming IPOs | List/cards of IPOs with key fields + “View Details” |
| 4 | Benefits of Investing in IPOs | Early entry, listing gains, diversification |
| 5 | Risks of IPO Investing | Volatility, overvaluation, allocation uncertainty |
| 6 | How to Apply for an IPO | 4-step process (account → choose → UPI → allotment) |
| 7 | Past IPO Performance | Sample past IPOs: listing vs issue price, gains/losses |
| 8 | Why Apply Through Us | Easy process, research, notifications, expert guidance |
| 9 | Call-to-Action | Get notified, open account, apply with support |

**Separate route:** `/products/ipo/[slug]` – Featured IPO details (overview, business, financials, price band, timeline, risks/opportunities).

---

## 2. Recommended page layout

### 2.1 Hero
- Full-width, centred. Headline: e.g. “Invest in Upcoming IPOs with Confidence.”
- One-line subhead on IPO opportunities. Primary CTA: “View Upcoming IPOs” or “Apply for IPO”; secondary: “Learn how IPOs work” (anchor to What is an IPO).
- Optional: small trust line (“Apply through SEBI-registered intermediaries”).

### 2.2 What is an IPO
- Two-column (desktop): text left; right side – simple visual (e.g. “Company → Offer → Listing” timeline or diagram).
- Short paragraphs: definition, how companies go public, why investors participate. Bullets for scanability.

### 2.3 Upcoming IPOs
- **Layout:** Grid of cards (2–3 columns desktop; 1 column mobile). Or table with “View Details” per row.
- **Card content:** Company name, industry, open/close dates, price band, issue size, listing date, status badge (Upcoming / Open / Closed).
- **CTA per card:** “View Details” → `/products/ipo/[slug]`. Optional: “Apply” (→ contact or application flow).
- **Filter/tabs:** By status (Upcoming / Open / Closed) if list is long.

### 2.4 Featured IPO details page (`/products/ipo/[slug]`)
- **Layout:** Single column. Back link to `/products/ipo`.
- **Blocks:** Company overview | Business model | Financial highlights (table or key metrics) | Price band & lot size | IPO timeline (open → close → allotment → listing) | Key risks and opportunities (short bullets).
- **CTA:** “Apply for this IPO” (contact or application).

### 2.5 Benefits & Risks
- Two sections in sequence. Each: section title + 3–4 cards or bullet blocks. Icons for benefits; caution icon for risks. Keep copy clear and balanced.

### 2.6 How to Apply
- Horizontal 4-step flow (desktop); vertical on mobile. Steps: (1) Create investment account, (2) Choose IPO and apply, (3) UPI mandate confirmation, (4) Allotment and listing. Numbered circles + one line each. CTA under step 1 or at end: “Open account” / “Apply now”.

### 2.7 Past IPO Performance
- Table or cards: columns – Company, Issue price, Listing price, Listing gain/loss %, optional date. Disclaimer: “Past performance is not indicative of future results.”
- Optional: small bar or line chart (listing gain % for last N IPOs).

### 2.8 Why Apply Through Us
- 4 strengths in a row (or 2x2): Easy application, Research insights, New IPO notifications, Expert guidance. Icon + title + one line.

### 2.9 CTA section
- Single strip: “Get notified about upcoming IPOs” (primary), “Open investment account”, “Apply with expert support”. Match style of Mutual Funds / F&O CTA block.

---

## 3. UI card design for IPO listings

- **Card:** Surface background, border, rounded corners. Padding ~1.25rem.
- **Top:** Company name (bold), industry (small label). Optional small logo/placeholder.
- **Middle:** Key data in rows or grid – Open date, Close date, Price band (₹X – ₹Y), Issue size, Listing date. Use consistent labels (e.g. “Open” / “Close” / “Price band”).
- **Status:** Badge (pill) – “Upcoming” (muted), “Open” (accent), “Closed” (neutral).
- **Bottom:** “View Details” button (outline or secondary); optional “Apply” (primary) if application is available.
- **Hover:** Slight border/background change for clickability.

---

## 4. Data fields per IPO

| Field | Description | Use in list card | Use in detail page |
|-------|-------------|------------------|---------------------|
| slug | URL identifier | – | URL |
| companyName | Full name | ✓ | ✓ |
| industry | Sector/industry | ✓ | ✓ |
| openDate | Subscription open | ✓ | ✓ (timeline) |
| closeDate | Subscription close | ✓ | ✓ (timeline) |
| priceBandLow | Lower end of band (₹) | ✓ (in “Price band”) | ✓ |
| priceBandHigh | Upper end of band (₹) | ✓ | ✓ |
| issueSize | In ₹ Cr or ₹ Lakh Cr | ✓ | ✓ |
| lotSize | Min application (e.g. 15 shares) | Optional in card | ✓ |
| listingDate | Expected listing | ✓ | ✓ (timeline) |
| status | Upcoming / Open / Closed | ✓ (badge) | ✓ |
| overview | Short company summary | – | ✓ |
| businessModel | What the company does | – | ✓ |
| financialHighlights | Revenue, profit, etc. | – | ✓ |
| risks | Key risk points | – | ✓ |
| opportunities | Key opportunity points | – | ✓ |

---

## 5. Suggested visual elements

- **Hero:** Abstract gradient or soft shape; no heavy imagery.
- **What is an IPO:** Simple timeline or flow: Company → Offer opens → Bidding → Allotment → Listing. Icons + arrows.
- **Upcoming IPOs:** Card grid; optional small calendar icon or date chips.
- **IPO detail:** Timeline component (horizontal bar or steps): Open → Close → Allotment → Listing with dates.
- **Past performance:** Table; optional bar chart (listing gain % per IPO).
- **How to apply:** Numbered steps with icons (account, document, UPI, listing).

---

## 6. Conversion-focused CTA placements

| Location | CTA | Goal |
|----------|-----|------|
| Hero | “View Upcoming IPOs” / “Apply for IPO” | Scroll to list or go to apply/contact |
| After What is IPO | “See upcoming IPOs” | Scroll to list |
| Each IPO card | “View Details” | Detail page; “Apply” if available | Detail page |
| IPO detail page | “Apply for this IPO” | Contact or application |
| How to Apply | “Open account” / “Apply now” | Lead or sign-up |
| Why Apply Through Us | “Get started” | Reinforce trust and convert |
| Final CTA block | “Get notified” + “Open account” + “Apply with support” | Notifications, account, support |

---

## 7. Content tone & compliance

- **Simple and beginner-friendly:** Explain “issue price”, “lot size”, “listing” once. Avoid jargon.
- **Balanced:** Mention potential listing gains and risks (volatility, overvaluation, allocation).
- **India-specific:** ₹, SEBI, UPI, application process as per Indian primary market.
- **Compliance:** “IPO investing is subject to market risk.” “Past performance does not guarantee future results.” No guarantee of allotment or listing gains.

This spec supports a main hub at `/products/ipo` and a detail page at `/products/ipo/[slug]` with clear layout, data needs, and conversion points.
