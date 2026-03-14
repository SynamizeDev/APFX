# Learn → Glossary — Page Structure, UI & Content System

**Route:** `/academy/glossary`  
**Purpose:** Help beginners understand trading terms, improve SEO, and build authority. Users can search, browse by letter/category, and expand terms for details with links to blog and tools.

---

## 1. Page layout

| Section | Content |
|--------|---------|
| Hero | Title: "Trading & Investing Glossary"; short description; **search bar** (full-width or centered, placeholder e.g. "Search terms...") |
| Popular Terms | Strip of quick links: Pip, Leverage, Margin, Stop Loss, Take Profit (pill buttons or inline links) |
| Category Filter | Optional: All, Forex Trading Terms, Technical Analysis, Risk Management, Investment Terms, Market Terminology |
| Alphabetical Nav | A–Z bar: each letter clickable to filter or scroll to that letter’s block |
| Glossary List | Terms in alphabetical order; each entry is an **expandable card**: term name, short definition, optional example; expanded: detailed explanation, example in context, related terms (internal), links to blog/tools |
| Related Learning Links | Per-term (in expanded card): "Read our guide on Risk Management", "Use our Pip Calculator", etc. |
| Educational CTA | Buttons: "Explore Trading Guides", "Try Our Trading Calculators", "Start Trading" |

---

## 2. Glossary card UI

- **Collapsed:** Term name (bold, accent or white), one or two lines of definition, optional one-line example; chevron or "Read more" to expand.
- **Expanded:** Same as above plus: detailed explanation (paragraph), "Example in context" (short scenario), **Related terms** (links to other glossary entries), **Related learning** (links to blog articles and tools). Collapse control (e.g. "Show less" or chevron up).
- **Styling:** Dark theme; card with border, rounded corners; hover state; accent for term name and primary links. Consistent with Blog/Calculators.

---

## 3. Search and A–Z design

- **Search:** Single input, full-width on mobile; filters terms by matching **term** or **definition** (and optionally category/letter). Instant filter (no submit button) or debounced. Clear button optional.
- **A–Z bar:** Horizontal strip: `A | B | C | … | Z`. Each letter is a button/link. Behavior: **filter** list to terms starting with that letter (recommended for single list), or **anchor** scroll to `id="letter-A"` etc. Inactive letters (no terms) can be disabled or hidden. Active letter highlighted with accent.

---

## 4. Data structure for glossary entries

```ts
interface GlossaryEntry {
  id: string           // slug, e.g. 'pip'
  term: string         // display name
  definition: string    // short, beginner-friendly
  example?: string     // optional one-liner
  category: 'forex' | 'technical' | 'risk' | 'investment' | 'market'
  relatedTermIds?: string[]  // ids for internal glossary links
  detailedExplanation?: string
  exampleInContext?: string  // trading scenario
  toolLinks?: { label: string; href: string }[]
  blogLinks?: { label: string; href: string }[]
}
```

- **List order:** Alphabetical by `term` (case-insensitive).
- **Categories:** Map category id to label for filter and display.

---

## 5. Internal linking strategy

- **Glossary → Glossary:** Related terms in each expanded card link to `/academy/glossary#term-id` or filter by term.
- **Glossary → Blog:** "Read our guide on …" links to `/academy/blog/[slug]` (e.g. risk-management-strategies, beginners-guide-forex).
- **Glossary → Tools:** "Use our Pip Calculator", "Try Risk Management Tools" → `/tools/calculators/pip`, `/tools/risk-management`, `/tools/calculators/position-size`, etc.
- **Anchor:** Use `id={entry.id}` on each term card for deep links and SEO.

---

## 6. SEO-friendly content structure

- One `<h1>` in hero: "Trading & Investing Glossary".
- Each term card: `<article id={entry.id}>`, term name in `<h2>` or `<h3>`, definition in `<p>`, expandable content in same article. Use `<dl>` if desired (dt=term, dd=definition).
- Search input with `aria-label`, results count or "No results" for accessibility.
- Internal links use descriptive anchor text ("Read our guide on Risk Management", "Use our Pip Calculator").

---

## 7. Responsive design

- **Hero:** Title and search stack; search full width on small screens.
- **A–Z bar:** Horizontal scroll on mobile if needed; wrap or smaller font for 26 letters.
- **Category filter:** Wrap; same as Blog category bar.
- **Term cards:** Full width; expanded content stacks (related terms, links) vertically.
- **CTA:** Buttons stack on mobile.
