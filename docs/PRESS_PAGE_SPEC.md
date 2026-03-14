# Company → Press — Page Structure & Content System

**Route:** `/about/press`  
**Purpose:** Showcase media coverage, announcements, and press resources; build credibility and help journalists and partners access company information.

---

## 1. Page layout (section order)

| Section | Content |
|--------|---------|
| Hero | Title: "Press & Media"; short description (official announcements, media coverage, press resources); optional CTA "Download Press Kit" / "Contact Media Team" |
| Featured Press Coverage | 2–3 large cards: outlet name, headline, date, summary, "Read Article" (external link) |
| Latest News & Announcements | Cards: title, short description, date, "Read More" (platform launches, product updates, partnerships, milestones) |
| Press Releases | Chronological list: title, publication date, summary, "Download" or "Read full" link |
| Media Assets / Press Kit | Grid of downloadable items: logo, brand guidelines, screenshots, photos; each with download button |
| Company Facts | Quick reference: year founded, headquarters, industry focus, key products/services |
| Media Contact | Media relations email, PR contact, response expectations |
| CTA | Encourage journalists and partners to reach out (interviews, collaborations, information) |

---

## 2. Card design

- **Featured press card:** Prominent card with outlet name (small label or badge), headline (h3), date, 2–3 line summary, primary or outline "Read Article" button (external). Optional outlet logo placeholder.
- **Announcement card:** Smaller card: title, 1–2 line description, date, "Read More" link. Same border/background as other about pages.
- **Press release row:** Title, date, summary, link "Download PDF" or "Read full release." List or card layout; chronological (newest first).
- **Consistent styling:** Dark theme, card border `rgba(255,255,255,0.06)`, rounded corners, accent for primary buttons and key labels.

---

## 3. Download section (Press Kit)

- **Layout:** Grid of asset cards (2–4 columns). Each card: asset type label (e.g. "Logo", "Brand Guidelines"), optional thumbnail or icon, "Download" button. Button can link to asset URL or trigger download.
- **Assets to list:** Company logo (multiple formats if needed), brand guidelines PDF, product screenshots, founder/company photos. Use placeholder links or # until real assets exist.

---

## 4. Content hierarchy (PR and media)

- **Hero** → Set context (this is the official press hub).
- **Featured** → Highest-impact coverage first.
- **News & Announcements** → Recent company updates (what’s new).
- **Press Releases** → Official statements in reverse chronological order.
- **Press Kit** → Self-serve assets for journalists.
- **Company Facts** → At-a-glance info for writing and fact-checking.
- **Media Contact** → How to get in touch and what to expect.
- **CTA** → Clear next step (contact, request kit, etc.).

---

## 5. Responsive design

- **Hero:** Title and CTA stack on small screens.
- **Featured cards:** 2–3 col → 1 col; full width on mobile.
- **Announcements:** Grid 2 col → 1 col.
- **Press releases:** List stacks; date and link remain visible.
- **Press kit grid:** 3–4 col → 2 → 1; download buttons full width or centered.
- **Company facts:** Grid or list; stacks on mobile.
- **Contact:** Block or two-column; stacks on mobile.
- **CTA:** Buttons stack on mobile.

---

## 6. Styling consistency

- Use site design tokens (e.g. `--color-accent`, `--color-text-1` / `--color-text-2`, `--container-max`, `--radius-lg`).
- Reuse `InnerPageHero` for hero; same card treatment as About Us (gradient background, border, accent on hover/primary buttons).
- Typography and spacing aligned with About Us and Blog.
