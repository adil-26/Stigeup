# Page Design Specification (Desktop-first)

## Global Styles
- Layout system: hybrid (CSS Grid for page structure + Flexbox for alignment).
- Responsive: desktop-first; add breakpoints at 1024px and 768px to stack grids and collapse navbar.
- Design tokens
  - Background: near-black (#05060A) with subtle noise/gradient.
  - Text: primary #F2F4F8, secondary #A7B0C0.
  - Accent: electric blue/purple gradient for highlights and CTA.
  - Typography: H1 56–72px/1.0, H2 36–44px, body 16–18px; tight tracking for hero.
  - Buttons: solid gradient primary + subtle glow hover; secondary is outline with 1px translucent border.
  - Motion: default 200–300ms easing for UI hovers; hero animation 900–1400ms.
- Accessibility/motion: respect prefers-reduced-motion by disabling wave/particle intensity.

## Global Components
- Navbar (sticky)
  - Left: logo.
  - Center/right: links (Home, Services, Case Studies, Contact) with active route state.
  - Right: primary CTA button ("Contact").
  - Mobile: hamburger opening a sheet menu.
- Footer
  - Columns: brand blurb, nav links, social placeholders.

---

## Page: Home (/)
### Meta Information
- Title: “Home | [Brand]”
- Description: “High-performance marketing experience with animated hero.”
- OG: title/description + preview image.

### Page Structure
- Stacked sections: Hero (full-viewport) → Services preview → Case studies preview → Bottom CTA.

### Sections & Components
1. Hero
   - Two-column grid (text left, visual right) on desktop; stacked on smaller screens.
   - Headline: split-by-word rendering; each word is an inline-block with wave offset animation.
   - Subcopy: 1–2 lines max.
   - CTAs: primary (Contact), secondary (Services).
   - Particle canvas: positioned absolute behind hero; pointer-events: none; capped height to hero only.
2. Services preview
   - 3-up cards with icon/title/one-liner; link to /services.
3. Case studies preview
   - Card carousel or 2x2 grid; link to /case-studies.
4. Bottom CTA
   - Full-width panel with short pitch and CTA to /contact.

---

## Page: Services (/services)
### Meta Information
- Title: “Services | [Brand]”
- Description: “What you offer, clearly grouped and scannable.”

### Page Structure
- Hero-lite header → services grid → proof points → CTA.

### Sections & Components
1. Header
   - H1 + short description.
2. Services grid
   - 2-column cards on desktop; each card has title, bullets, and a “Talk to us” link to /contact.
3. Proof points
   - “Trusted by” strip + stats row.
4. CTA
   - Prominent panel with primary button to /contact.

---

## Page: Case Studies (/case-studies)
### Meta Information
- Title: “Case Studies | [Brand]”
- Description: “Examples of outcomes and delivered value.”

### Page Structure
- Header → card grid → CTA.

### Sections & Components
1. Header
   - H1 + brief framing copy.
2. Case study cards
   - 3-column grid desktop; card contains logo/visual, title, short summary, and a single action ("Contact").
3. CTA
   - Bottom CTA panel linking to /contact.

---

## Page: Contact (/contact)
### Meta Information
- Title: “Contact | [Brand]”
- Description: “Get in touch.”

### Page Structure
- Two-column layout: form left, contact details right.

### Sections & Components
1. Contact form
   - Fields: name (required), email (required), company (optional), message (required).
   - States: idle, validating, submitting, success, error.
2. Contact details
   - Email/phone placeholders and short response-time expectation.
