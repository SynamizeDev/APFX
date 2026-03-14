# Company → About Us — Page Structure & Content

**Route:** `/about/about-us`  
**Purpose:** Build trust, explain mission and values, and establish credibility with clients and partners. Professional, trustworthy, fintech-aligned tone.

---

## 1. Page layout (section order)

| Section | Content |
|--------|---------|
| Hero | Title: "About Our Company"; short intro (purpose and vision); background visual (financial/trading) |
| Company Overview | What we do, services (trading tools, market insights, education, investment), who it’s for (retail traders, investors, beginners) |
| Mission and Vision | Two blocks: Mission (what we aim to achieve), Vision (long-term goal in the industry) |
| Our Values | Icon cards: Transparency, Innovation, Trader empowerment, Data-driven insights, Security and reliability |
| What We Offer | Trading tools & calculators, educational resources, market insights, copy trading / investment features |
| Why Choose Us | Differentiators: advanced tools, expert research, easy platform, risk management & education focus |
| Our Journey | Company story, milestones (year founded, platform launches, product releases) — timeline or narrative |
| Team (optional) | Leadership: name, role, short bio — card or list |
| Trust and Transparency | Regulatory/compliance messaging, security standards, commitment to responsible trading |
| CTA | "Start Trading", "Explore Our Tools", "Learn More" |

---

## 2. Section hierarchy for storytelling

- **Hero** → Set context and tone.
- **Overview** → What we do and for whom (establish relevance).
- **Mission & Vision** → Why we exist and where we’re headed.
- **Values** → How we operate (principles).
- **What We Offer** → Concrete products and services.
- **Why Choose Us** → Proof and differentiators.
- **Journey** → History and milestones (credibility).
- **Team** → Humanize the company (optional).
- **Trust** → Compliance, security, responsibility (reduce risk perception).
- **CTA** → Clear next steps.

---

## 3. UI component suggestions

- **Hero:** Reuse `InnerPageHero` with title, subtitle, optional accent line; background via gradient or subtle visual (charts/markets) in CSS or image.
- **Mission / Vision:** Two side-by-side cards (or stacked on mobile) with icon or number; heading + short paragraph.
- **Values:** Grid of icon cards (5 items); icon + title + one-line description; same style as existing About value cards.
- **What We Offer / Why Choose Us:** Bullet list or small cards with icon + title + copy.
- **Journey:** Timeline (vertical or horizontal) with year + label + short description; or simple narrative with bold milestones.
- **Team:** Card per person: photo placeholder, name, role, 1–2 sentence bio.
- **Trust:** One block with 3 short points (regulation, security, responsible trading); optional small icons.
- **CTA:** Primary + secondary buttons; same pattern as Blog/Glossary.

---

## 4. Content tone

- **Professional:** Clear, precise language; avoid hype.
- **Trustworthy:** Emphasize transparency, security, and responsibility.
- **Clear:** Short sentences and scannable sections; avoid jargon where possible.
- **Fintech-appropriate:** Confident but not aggressive; educational where relevant.

---

## 5. Responsive design

- **Hero:** Title and subtitle wrap; background scales.
- **Mission/Vision:** Two col → one col on small screens.
- **Values / Offer / Why Choose Us:** Grid 3 col → 2 → 1; cards stack.
- **Journey:** Timeline stacks vertically on mobile; horizontal scroll or wrap for years.
- **Team:** Cards 2–3 col → 1 col.
- **CTA:** Buttons stack on mobile; full width or centered.
