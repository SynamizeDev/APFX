# Learn → Blog — Structure, Layout & Content System

**Routes:** `/academy/blog` (hub), `/academy/blog/[slug]` (article). `/academy` redirects to `/academy/blog`.  
**Purpose:** Educate traders, improve SEO, build authority, and guide users to platform tools and accounts.

---

## 1. Page layout (hub)

| Section | Content |
|--------|---------|
| Hero | Title: "Trading & Investing Insights" or "Learn Trading with Expert Guides"; short description; CTA "Explore Articles" / "Start Learning" |
| Featured Articles | 1–3 large cards with image, title, short description, category, reading time, publish date, "Read More" |
| Blog Categories | Filter bar: Trading Basics, Forex Trading, Technical Analysis, Risk Management, Trading Psychology, Market Insights, Platform Guides |
| Latest Articles Feed | Grid/list of recent posts; each card: image, title, summary, category tag, reading time, date, "Read Article" (filterable by category) |
| Educational Guides | Prominent cards: Beginner's Guide to Forex, Understanding Leverage, Risk Management Strategies, How Stop Loss Works, How to Use Trading Calculators |
| Market Insights | Cards/links: Weekly market outlook, Forex market analysis, Key economic events |
| Popular Articles | Most read/trending with titles and quick links |
| Tools Integration | In-article callouts linking to Pip Calculator, Position Size Calculator, Risk Management Tools (e.g. "Try our Risk Calculator to manage your trades better.") |
| Newsletter | Section for weekly trading insights email signup |
| CTA Section | Open trading account, Start using tools, Explore educational resources |

---

## 2. Blog article card design

- **Featured (large):** Full-width or 2–3 col grid; image (16:9 or 2:1), title (h2), 2–3 line description, category pill, meta (reading time, date), primary button "Read More".
- **Standard (feed):** Image thumbnail, title, 1–2 line summary, category tag, reading time, date, "Read Article" link. Grid: 3 col desktop, 2 col tablet, 1 col mobile.
- **Educational guide card:** Larger than standard; optional icon or badge "Guide"; title, short description, "Read Guide" CTA.
- **Consistent styling:** Dark theme, card with border `rgba(255,255,255,0.06)`, rounded corners, hover lift/glow; accent for category tags and primary buttons.

---

## 3. Category filter structure

- **Categories:** Trading Basics, Forex Trading, Technical Analysis, Risk Management, Trading Psychology, Market Insights, Platform Guides.
- **Behavior:** Horizontal scroll or wrap on mobile; "All" + one pill per category; active state (accent border or background). Filter applies to "Latest Articles" (and optionally featured if multiple categories). URL optional: `?category=forex-trading` for SEO/bookmarking.

---

## 4. SEO-friendly content structure

- **Hub:** `<main>`, one `<h1>` in hero (e.g. "Trading & Investing Insights"); sections with `<h2>`; article cards use `<article>`, `<h2>`/`<h3>` for titles, `<time datetime="...">` for dates, descriptive link text "Read Article: [title]".
- **Article page:** One `<h1>` (article title), `<article>`, `<time>`, optional `<nav aria-label="Breadcrumb">`; structured data (JSON-LD) for Article (headline, datePublished, dateModified, author, image).
- **Internal linking:** From hub to article; from article to related articles and to tool pages (Pip Calculator, Position Size, Risk Management Tools). Anchor text: "Pip Calculator", "Position Size Calculator", "Risk Management Tools".

---

## 5. Internal linking strategy to platform tools

- **In articles:** Callout box component: title (e.g. "Use our tools"), short line ("Try our Risk Calculator to manage your trades better."), button/link to `/tools/risk-management` or `/tools/calculators/pip`, etc.
- **On hub:** Optional "Popular tools" strip or links in CTA: "Open Trading Account", "Try Pip Calculator", "Risk Management Tools".
- **Target URLs:** `/tools/calculators/pip`, `/tools/calculators/position-size`, `/tools/risk-management`, `/tools/calculators`, `/register`.
- **Article detail page:** Each post is rendered at `/academy/blog/[slug]`. The page includes a back link to the blog, article title/description/meta, and prose area. **Tool callouts** are implemented via an `ArticleCallout` component that accepts `tool` (`pip` | `position-size` | `risk-management`) and optional custom `message`; it renders a bordered callout box with text and a link to the corresponding tool. An in-article CTA block at the bottom links to Pip Calculator, Position Size Calculator, Risk Management Tools, and Open Trading Account.

---

## 6. Responsive design

- **Hero:** Stack CTA on small screens; title/subtitle wrap.
- **Featured:** 3 col → 2 → 1; images scale, aspect ratio preserved.
- **Category bar:** Horizontal scroll with fade or wrap; touch-friendly tap targets.
- **Latest feed:** 3 col → 2 → 1; card image and text stack.
- **Educational guides:** 2–3 col → 1; same card treatment.
- **Newsletter:** Single column; form full width on mobile.
- **CTA:** Buttons stack on mobile.

---

## 7. Styling consistency

- Use site design tokens: `--color-accent`, `--color-text-1` / `--color-text-2` / `--color-text-3`, `--fw-bold` / `--fw-semibold`, `--radius-lg` / `--radius-xl`, `--container-px`.
- Cards: dark glass-style background, subtle border, accent on hover; same as Copy Trading / Risk Management Tools.
- Typography: same font stack; mono for dates/reading time if desired.
- Buttons: primary (gradient accent), secondary (outline) matching existing CTAs.
