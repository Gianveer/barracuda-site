# Barracuda Holdings — website rebuild

A rebuilt marketing site for [Barracuda Holdings (Pty) Ltd](https://barracuda.org.za/),
an electronic contract manufacturer in Somerset West, Cape Town: SMD assembly at
258,500 components per hour, wave soldering, conformal coating, X-ray inspection,
BGA/LGA rework, CNC machining and engineering services. ISO 9001:2015.

## Stack

Static HTML + CSS + vanilla JS. **No build step, no dependencies.**
Open `index.html` directly, serve the folder with any static server,
or host on GitHub Pages.

## Structure

```
index.html      Homepage — video hero, stats, capabilities, industries, certifications
about.html      Capabilities — company story, facility, full spec-sheet process list
contact.html    Contact — direct lines, mailto quote form, location
css/            tokens.css (design tokens) · global.css (shared system) · home.css · inner.css
js/             main.js (nav, scroll reveal, stat count-ups) · contact.js (quote form → mailto)
assets/         hero-loop.mp4 — AI-generated macro SMD-assembly loop (Veo 3.1 Lite via Higgsfield)
SPEC.md         The design/build specification the site was built against
```

## Design

"Precision Industrial" — dark graphite surfaces, PCB-copper accent, Swiss grid
discipline, mono numerals for spec figures. All facts on the site trace to
Barracuda's published information. Fully responsive (320–1920 px), keyboard
navigable, honors `prefers-reduced-motion`, degrades cleanly with JS disabled.
