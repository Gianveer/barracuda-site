# Barracuda Holdings — Website Rebuild Spec

Static multi-page site. Plain HTML/CSS/vanilla JS, **no build step**, GitHub-Pages ready.
All files live in this folder (`barracuda-site/`).

## Company facts (use ONLY these — do not invent claims)

- **Barracuda Holdings (Pty) Ltd** — privately owned, owner-driven electronic contract manufacturer (EMS).
- Established **2010**; founding partners each with **20+ years** in contract manufacturing.
- **180 skilled staff**, **2,800 m² facility** in Somerset West, Cape Town, South Africa.
- Capabilities: SMD assembly (advanced lines, **258,500 components/hour** placement), wave soldering, conformal coating, potting/encapsulation, BGA/LGA rework, X-ray inspection, flexi & flexi-rigid PCB assembly, laser marking, CNC machining, software development, stencil engineering, industrialization consultation, product configuration, materials procurement (ethical sourcing), testing & packaging.
- Industries: automotive (accessories, diagnostics, fleet management, SVR), utility metering (electricity, water, day/night switches), commercial & home automation, access control, LED lighting, agricultural monitoring (crops & livestock), satellite systems, avionics, industrial control, networking, telephony, IoT.
- Certifications: **ISO 9001:2015**, **IPC member with certified operators**, **B-BBEE compliant**, **eWASA certified**.
- Contact: **021 851 3357** (+27 21 851 3357) · **aengus@ivorygroup.co.za**
- Address: Unit 1, Bataleur Park, Olive Grove Industrial Estate, Ou Paardevlei Road, Somerset West, Cape Town 7130, South Africa.
- Mission line: "enhance your business through cutting-edge technology".

## File ownership (do NOT touch the other agent's files)

| Agent A (core) | Agent B (pages) |
|---|---|
| `css/tokens.css` | `css/inner.css` |
| `css/global.css` | `about.html` |
| `css/home.css` | `contact.html` |
| `js/main.js` | `js/contact.js` |
| `index.html` | |

## Design direction: "Precision Industrial"

Dark graphite surfaces + **copper accent** (PCB trace copper), Swiss grid discipline,
engineering-spec typography. Mono numerals for stats/spec figures. Thin hairline rules,
generous vertical rhythm, asymmetric editorial layouts.

**Banned:** gradient blobs, glassmorphism, centered-hero-with-two-buttons cliché,
uniform card grids with identical padding, stock dark-SaaS look, emoji icons.
Use inline SVG motifs (PCB traces, crosshair/registration marks, dimension lines) for texture.

## Design tokens (Agent A writes EXACTLY these into `css/tokens.css`; Agent B consumes them)

```css
:root {
  --bg: #0B0E12;
  --surface: #12171E;
  --surface-raised: #1A2029;
  --line: #232B36;
  --line-strong: #33404E;
  --text: #E9EDF1;
  --text-muted: #94A0AC;
  --accent: #D07A3F;
  --accent-bright: #E89254;
  --accent-ink: #10131A;

  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: ui-monospace, "Cascadia Mono", "Roboto Mono", Menlo, monospace;

  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.0625rem);
  --text-lg: clamp(1.15rem, 1rem + 0.6vw, 1.5rem);
  --text-h2: clamp(1.75rem, 1.2rem + 2.2vw, 3rem);
  --text-hero: clamp(2.5rem, 1.4rem + 5.2vw, 5.5rem);

  --space-section: clamp(4.5rem, 3rem + 6vw, 9rem);
  --container: 72rem;

  --duration-fast: 160ms;
  --duration-slow: 500ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Shared `<head>` block (both agents, every page — adjust `<title>`/description per page)

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/global.css">
<script src="js/main.js" defer></script>
```

`index.html` additionally loads `css/home.css`; `about.html`/`contact.html` load `css/inner.css`.

## Shared header (use VERBATIM on every page; mark current page with `aria-current="page"`)

```html
<header class="site-header" id="top">
  <div class="container header-inner">
    <a class="brand" href="index.html">Barracuda<span class="brand-sub">Holdings</span></a>
    <nav aria-label="Main navigation">
      <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <ul class="nav-links" id="site-nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">Capabilities</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a class="btn btn-accent" href="contact.html#quote">Request a quote</a></li>
      </ul>
    </nav>
  </div>
</header>
```

## Shared footer (use VERBATIM on every page)

```html
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <p class="footer-brand">Barracuda Holdings (Pty) Ltd</p>
      <p class="footer-muted">Electronic contract manufacturing · Est. 2010 · Somerset West, Cape Town</p>
    </div>
    <address>
      Unit 1, Bataleur Park, Olive Grove Industrial Estate,<br>
      Ou Paardevlei Road, Somerset West, Cape Town 7130<br>
      <a href="tel:+27218513357">021 851 3357</a> · <a href="mailto:aengus@ivorygroup.co.za">aengus@ivorygroup.co.za</a>
    </address>
    <ul class="footer-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">Capabilities</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </div>
  <div class="container footer-meta">
    <p>ISO 9001:2015 · IPC member · B-BBEE compliant · eWASA certified</p>
  </div>
</footer>
```

## Shared classes Agent A MUST define in `css/global.css` (Agent B relies on them)

`.container` (max-width var(--container), inline padding) · `.section` (block padding var(--space-section)) ·
`.eyebrow` (mono, uppercase, letter-spaced, accent) · `.section-head` (h2 + optional lede) ·
`.btn`, `.btn-accent`, `.btn-ghost` · `.site-header`, `.header-inner`, `.brand`, `.brand-sub`, `.nav-toggle`, `.nav-links` ·
`.site-footer`, `.footer-grid`, `.footer-brand`, `.footer-muted`, `.footer-links`, `.footer-meta` ·
`.stat`, `.stat-value` (mono, large), `.stat-label` · `.card` (surface, 1px line border, no radius > 4px) ·
`.grid-2`, `.grid-3` (collapse to 1 col ≤ 720px) · `.reveal` (scroll-reveal target; visible by default when JS absent or reduced motion) ·
`.hairline` (1px --line divider) · base styles: body bg/text/fonts, selection color, `:focus-visible` outline in accent, reduced-motion media query killing transitions.

## `js/main.js` (Agent A)

Vanilla only: (1) mobile nav toggle with aria-expanded sync; (2) IntersectionObserver adding
`.is-visible` to `.reveal` elements — skip entirely under `prefers-reduced-motion: reduce`;
(3) nothing else. No libraries.

## Hero video (Agent A)

The hero uses a generated background video that will be placed at `assets/hero-loop.mp4`
(16:9, dark macro PCB/SMD-assembly footage, copper on graphite). Code against that path
even if the file is not there yet — it is being generated in parallel.

```html
<video class="hero-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true" tabindex="-1">
  <source src="assets/hero-loop.mp4" type="video/mp4">
</video>
```

- Dark overlay gradient on top of the video so headline contrast stays ≥ WCAG AA.
- CSS fallback: hero must look intentional with the video absent (solid `--bg` + PCB-trace SVG motif).
- Under `prefers-reduced-motion: reduce`, hide the video (`display: none`) and show the static fallback; also pause it via JS.

## Page outlines

### index.html (Agent A)
1. Hero — asymmetric, left-aligned, background video per above. Eyebrow "Electronic contract manufacturing — Cape Town, SA". Headline about precision electronics manufacturing. PCB-trace inline SVG motif as fallback texture (subtle, aria-hidden).
2. Stats strip — mono figures: Est. 2010 · 180 staff · 2,800 m² facility · 258,500 cph placement.
3. Capabilities overview — 5–6 headline capabilities, each linking to about.html.
4. Industries — editorial list/grid of sectors served (not uniform cards).
5. Certifications strip — ISO 9001:2015, IPC, B-BBEE, eWASA.
6. CTA band — request a quote → contact.html#quote.

### about.html (Agent B) — title "Capabilities"
1. Page hero: company story (2010, owner-driven, founding partners 20+ yrs).
2. Facility & team: 180 staff, 2,800 m², Somerset West.
3. Full capabilities: complete list from facts, grouped (Assembly / Inspection & Rework / Finishing & Mechanical / Engineering services) — spec-sheet aesthetic, mono labels, hairline rules.
4. Quality & certifications detail.
5. Values: customer/supplier relationships, agility, ethical sourcing.
6. CTA to contact.

### contact.html (Agent B)
1. Page hero: short invite line.
2. Contact details block: phone (tel:), email (mailto:), full address.
3. `#quote` section: quote-request form (name, company, email, phone, project details).
   Static site — **no backend**: `js/contact.js` intercepts submit and opens a prefilled
   `mailto:aengus@ivorygroup.co.za` link built from field values; show inline note that the form opens the visitor's email client. Basic HTML5 validation, labelled inputs, visible focus states.
4. Location block: styled address card + link to Google Maps search URL for the address (plain `<a>`, no embed/API).

## Animations (Agent A leads; Agent B reuses the classes)

Use the Magic MCP tools (`mcp__magic__21st_magic_component_inspiration`, and
`21st_magic_component_builder` if useful) to source high-quality animation patterns —
e.g. staggered hero text reveals, scroll-triggered section entrances, animated stat
count-ups, marquee/certification strips. **Translate whatever you take into vanilla
CSS/JS** (the Magic output is React/Tailwind — extract the motion design: timings,
easings, transforms, stagger logic — do not ship React or Tailwind). Compositor-friendly
properties only (`transform`, `opacity`, `clip-path`). Everything must degrade to visible
static content with JS off and under reduced motion.

## Copy rules — zero AI slop (both agents, hard requirement)

- BANNED words/phrases: "cutting-edge", "seamless", "solutions" (as a noun for what they sell),
  "passionate", "elevate", "unlock", "empower", "world-class", "state-of-the-art",
  "look no further", "in today's fast-paced world", "we pride ourselves".
- Every claim must trace to a fact in this spec. Numbers beat adjectives:
  say "258,500 components placed per hour", not "blazing-fast assembly".
- Write like an engineer selling to an engineer: short sentences, concrete nouns,
  active voice. Headlines can be bold, but they must be *specific* to Barracuda.
- No symmetrical marketing triads ("Quality. Speed. Reliability."). No exclamation marks.

## Quality bar (both agents)

- Semantic landmarks, exactly one `<h1>` per page, logical heading order.
- Keyboard navigable; visible `:focus-visible`; honors `prefers-reduced-motion`.
- Responsive 320 → 1920 px, no horizontal overflow, nav collapses ≤ 860 px.
- No raster images except the hero video; inline SVG only. No JS/CSS libraries or CDNs besides Google Fonts.
- Copy: confident, concrete, engineering-literate — see copy rules above.
