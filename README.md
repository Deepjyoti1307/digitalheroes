# NorthPeak Digital — Agency Website

A premium, single-page marketing website for **NorthPeak Digital**, a fictional digital agency. Hand-coded in a **Neo-Brutalism** design style with buttery-smooth Lenis scroll, staggered reveal animations, and animated stat counters.

> **Built for:** [Digital Heroes](https://digitalheroesco.com) Internship Qualification Task — Web Development (Role 05/16)

---

## 🔗 Live Demo

<!-- Replace with your deployed URL -->
`Coming soon — deploy to Vercel / Netlify / GitHub Pages`

---

## ✨ Features

### Design
- **Neo-Brutalism aesthetic** — thick 2.5px black borders, hard-offset box shadows, vivid flat accent colors (yellow, pink, blue, green), off-white background
- **Space Grotesk + Space Mono** typography pairing — chunky headings with monospaced labels
- **Zero gradients** — all fills are flat, all shadows are hard offset
- **Stickers, badges, and inline highlights** — rotated labels, colored pills, yellow-highlighted hero text
- **Infinite marquee ticker** — scrolling service keywords between hero and services sections
- **Color-variant cards** — services 4/5/6 use pink, blue, and yellow backgrounds
- **Section color alternation** — off-white → dark → off-white → yellow → dark footer

### Responsiveness
Intentionally designed and tested at:
| Breakpoint | Width   | Behavior |
|:-----------|:--------|:---------|
| Mobile     | 360px   | Single column, hamburger nav, stacked cards, ≥44px tap targets |
| Tablet     | 768px   | 2-column grids, inline nav links, side-by-side form fields |
| Desktop    | 1024px+ | 3-column grids, hero split layout, full pricing comparison |
| Large      | 1440px  | Max-width 1200px container, generous whitespace |

### Animations & Interactions
- **Lenis smooth scroll** — silky 120fps-ready scrolling with exponential easing (`duration: 1.4`)
- **Staggered scroll reveals** — siblings cascade in at 100ms intervals via IntersectionObserver
- **Animated stat counters** — numbers count up from 0 with ease-out quart deceleration on scroll
- **Push/pop button hover** — lift up with growing shadow on hover, snap down on click
- **Card hover effects** — translate + subtle rotation + shadow growth on desktop
- **Art-box interaction** — hero visual rotates, scales, and inner symbol counter-rotates on hover
- **Badge/sticker hover** — tilt and scale micro-interactions
- **Avatar hover** — rotate + scale effect
- **Social icon hover** — flip to yellow background with rotation
- **Form input focus** — inputs lift with hard shadow
- **Nav link underlines** — animated grow-from-left underline on hover/active
- **Footer link underlines** — yellow animated underline on hover
- **`prefers-reduced-motion` respected** — all animations disabled for users who prefer reduced motion

### Accessibility (Target: Lighthouse 95+)
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Single `<h1>`, logical heading hierarchy (`h1 → h2 → h3 → h4`)
- All form inputs have visible `<label>` elements (not placeholder-only)
- Error messages linked via `aria-describedby`, announced with `role="alert"`
- `aria-label` on icon-only links (social icons, logo, burger)
- `aria-expanded` toggled on mobile nav button
- `aria-hidden="true"` on decorative elements (art-box, arrows, stars, avatars, badges)
- Visible `:focus-visible` outline (3px blue) on all interactive elements
- Tab-navigable in logical order
- Sufficient color contrast (WCAG AA minimum)

### Performance (Target: Lighthouse 95+)
- **Zero framework overhead** — vanilla HTML/CSS/JS, only Lenis as a dependency (~7kb gzipped)
- **System font fallback** — Space Grotesk loaded with `font-display: swap`
- **No images** — all visuals are CSS-drawn (shapes, shadows, borders) or inline SVG
- **Minified production build** via Vite + Terser
- **No unused CSS/JS** shipped
- **No layout shift** — no dynamically sized elements, no webfont FOIT

### Form
- Fields: Name (required), Email (required + format validation), Company (optional), Message (required + min 10 chars)
- Inline validation on blur with red border + error text
- Error cleared on input
- Disabled + loading state during simulated 600ms submit
- Success overlay with checkmark icon and confirmation message
- No backend required — fully client-side simulation

---

## 🏗️ Tech Stack

| Layer     | Technology                        |
|:----------|:----------------------------------|
| Structure | Vanilla HTML5                     |
| Styling   | Vanilla CSS (Custom Properties)   |
| Logic     | Vanilla JavaScript (ES Modules)   |
| Scroll    | [Lenis](https://lenis.darkroom.engineering/) |
| Fonts     | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [Space Mono](https://fonts.google.com/specimen/Space+Mono) |
| Build     | [Vite](https://vitejs.dev/) + [Terser](https://terser.org/) |

---

## 📁 Project Structure

```
digitalheroes/
├── index.html              # Semantic HTML structure (single page)
├── src/
│   ├── style.css           # Neo-Brutalism design system (CSS variables, BEM)
│   └── main.js             # Interactions (Lenis, reveals, counters, form)
├── docs/
│   ├── PRD.md              # Product Requirements Document (source of truth)
│   └── Design-Document.md  # Visual design spec (source of truth)
├── package.json            # Vite + Lenis dependencies
├── vite.config.js          # Build config (Terser minification)
├── .gitignore              # Ignores node_modules, dist, docs/
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ installed

### Install

```bash
git clone https://github.com/Deepjyoti1307/digitalheroes.git
cd digitalheroes
npm install
```

### Development

```bash
npm run dev
```

Opens a local dev server at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
```

Outputs optimized files to `dist/`:
- `index.html` — ~22kb (5.4kb gzipped)
- `assets/index-*.css` — ~21kb (4.4kb gzipped)
- `assets/index-*.js` — ~24kb (7kb gzipped, includes Lenis)

### Preview Production Build

```bash
npm run preview
```

Serves the `dist/` folder locally to verify the production build.

---

## 🎨 Design System

### Color Palette

| Role      | Color     | Hex       |
|:----------|:----------|:----------|
| Background | Off-white | `#FFFDF5` |
| Dark       | Near-black | `#1A1A1A` |
| Surface    | White     | `#FFFFFF` |
| Accent 1   | Yellow    | `#FFE600` |
| Accent 2   | Pink      | `#FF6B9D` |
| Accent 3   | Blue      | `#5B7FFF` |
| Accent 4   | Green     | `#BAFF39` |
| Muted text | Gray      | `#6B6B6B` |

### Typography Scale

| Element         | Desktop | Mobile | Weight |
|:----------------|:--------|:-------|:-------|
| Hero (h1)       | 88px    | 40px   | 700    |
| Section title   | 52px    | 32px   | 700    |
| Card title (h3) | 20px    | 20px   | 700    |
| Body            | 16px    | 16px   | 400    |
| Mono labels     | 12px    | 12px   | 700    |

### Spacing

8px base grid: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128`

### Shadow System

| Token        | Value                    |
|:-------------|:-------------------------|
| `--shadow-sm` | `3px 3px 0 #1A1A1A`     |
| `--shadow`    | `5px 5px 0 #1A1A1A`     |
| `--shadow-lg` | `8px 8px 0 #1A1A1A`     |

---

## 📋 Sections Implemented

1. **Sticky Navbar** — fixed header with border-bottom, logo with hover rotation, monospaced nav links with animated underlines, yellow mobile overlay
2. **Hero** — oversized headline with yellow-highlighted word, availability sticker, dual CTAs, decorative art-box with interactive hover states, infinite marquee ticker
3. **Services (6 cards)** — 3×2 grid with numbered cards, three color-variant cards, diagonal arrow hover animation
4. **Results & Testimonials** — 4 animated stat counters, 3 testimonial cards with star ratings, colored avatars
5. **Pricing (3 tiers)** — Starter / Growth (popular, yellow) / Scale, rotated "Most Popular" badge, dashed feature lists, equal-height cards
6. **Contact Form** — 2-column layout on yellow section background, full client-side validation, loading spinner, success overlay
7. **Footer** — dark background, logo, nav links with hover underlines, social icons with yellow hover flip, mandatory credit line linking to digitalheroesco.com

---

## ⚡ Lighthouse Optimization Decisions

| Optimization | Rationale |
|:-------------|:----------|
| System font fallback chain | Prevents render-blocking if Google Fonts CDN is slow |
| `font-display: swap` | No FOIT — text visible immediately with fallback |
| Inline SVG icons | No icon font library overhead (no unused glyphs shipped) |
| CSS-only visuals | Zero image requests — all shapes are borders, shadows, backgrounds |
| Vite + Terser | Hard minification of JS, tree-shaking of unused Lenis internals |
| `will-change` hints | GPU-composited layers for frequently animated elements |
| Passive scroll listeners | Non-blocking scroll handlers via Lenis |
| Single animation curve | Reduces CSS complexity, browser can optimize recurring values |
| No unused CSS/JS | Every rule and function is actively used |
| Semantic HTML | Lighthouse accessibility bonus from proper element usage |

---

## 📜 Changelog

### v1.0.0 — Initial Build
- Scaffolded project with Vite
- Built all 7 sections per PRD spec
- Implemented Neo-Brutalism design system
- Added Lenis smooth scroll
- Added staggered scroll-reveal animations
- Added animated stat counters
- Added comprehensive hover effects on all interactive elements
- Added full client-side form validation
- Achieved production build: ~32kb total gzipped
- Verified at 360px, 768px, 1024px, 1280px, 1440px breakpoints

---

## 📝 PRD & Design Document Compliance

| Requirement | Status |
|:------------|:-------|
| Single-page with anchor navigation | ✅ |
| Sticky navbar with mobile hamburger | ✅ |
| Hero with headline + CTA | ✅ |
| 6-item services grid | ✅ |
| Results with stats + testimonials | ✅ |
| 3-tier pricing with "Popular" badge | ✅ |
| Contact form with validation | ✅ |
| Footer with credit line | ✅ |
| Smooth scroll | ✅ |
| Hover/focus states on all interactives | ✅ |
| Responsive at 360/768/1440px | ✅ |
| Semantic HTML5 | ✅ |
| Proper heading hierarchy | ✅ |
| Keyboard navigable | ✅ |
| ARIA attributes | ✅ |
| `prefers-reduced-motion` | ✅ |
| `font-display: swap` | ✅ |
| No unused CSS/JS | ✅ |
| No inline styles/scripts | ✅ |
| Production-ready build | ✅ |

---

## 👤 Author

**Deep (Deepjyoti Dey)**
Built for the Digital Heroes Internship Qualification Task — July 2026

---

## 📄 License

This project was built as a qualification task. All code is original and hand-written.
