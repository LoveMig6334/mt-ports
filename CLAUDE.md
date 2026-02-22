# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Serve production build
npm run lint     # ESLint (flat config, core-web-vitals + typescript)
```

No test framework is configured.

## Architecture

Portfolio site using **Next.js 16 App Router** with two routes:
- `app/page.tsx` — Home page composing all sections
- `app/work/[slug]/page.tsx` — Dynamic category pages (Brand Identity, UI/UX Design, Typography, Art Direction, Motion Design, Editorial)

**Rendering model:** `app/layout.tsx`, `app/page.tsx`, and `app/work/[slug]/page.tsx` are Server Components. All interactive components in `components/` are Client Components (`"use client"`). Below-the-fold sections are lazy-loaded via `next/dynamic` in `page.tsx` for code-splitting. Category pages use `generateStaticParams()` for static pre-rendering.

**Data flow:** No global state management. All state is component-local or lifted one level (e.g., `lightboxIndex` in `WorkGallery` passed to `Lightbox`). Static data lives in `lib/`:
- `lib/projects.ts` — Home page project data
- `lib/skills.ts` — Abilities, radar chart data, and skill gradients
- `lib/certifications.ts` — Certification entries (images in `public/certificate/`)
- `lib/categoryWorks.ts` — Category definitions and per-category work items (images in `public/category/`)

**Key shared modules:**
- `lib/animations.ts` — Framer Motion variant presets (`fadeUpVariants`, `staggerContainer`, `heroLineVariants`, `scaleIn`, lightbox variants) and a shared `ease` curve
- `hooks/useScrollReveal.ts` — Wraps `useInView` from framer-motion; used by most section components for scroll-triggered reveals

**Smooth scrolling:** Lenis via `ReactLenis` in `components/SmoothScroll.tsx`, wrapping the entire page.

**Custom cursor:** `CustomCursor.tsx` uses `useMotionValue` (dot) + `useSpring` (ring) and a `MutationObserver` for hover detection. `CustomCursorLoader.tsx` is the `"use client"` wrapper that handles the `ssr: false` dynamic import.

## Styling

**Tailwind v4** — no `tailwind.config.ts`. All theme configuration is in `app/globals.css` under `@theme inline {}`.

Theme colors: `--bg: #0a0a0a`, `--fg: #f0ece4`, `--accent: #e8ff47`, `--coral: #ff6b4a`, `--violet: #b48aff`, `--cyan: #47f0ff`. Use as `text-fg`, `bg-accent`, `border-coral`, etc.

Fonts (loaded via `next/font/google` in `layout.tsx`):
- `font-display` — Syne (headings)
- `font-body` — Space Mono (body text)
- `font-serif` — Instrument Serif (italic accents)

Responsive breakpoints use Tailwind v4 arbitrary variants: `max-[900px]:` and `max-[600px]:`.

Film grain overlay is applied via `body::after` in `globals.css`.

## Critical Rules

### Framer Motion + Tailwind v4 color incompatibility

Tailwind v4 outputs colors in `lab()` format. Framer Motion cannot animate `lab()` — it only supports `rgba`/`hex`/`hsla`.

**On any element with Framer Motion `whileHover`/`animate` that transitions `borderColor`, `backgroundColor`, or `color`:** use inline `style` with `rgba()`/hex for the initial state AND hex values in the animation target. Do NOT use Tailwind color classes (`border-fg/10`, `text-fg`, `bg-accent`) on these elements.

Tailwind color classes are safe on elements without Framer Motion color animations.

### `ssr: false` in Server Components

`dynamic(() => import(...), { ssr: false })` is NOT allowed in Server Components in Next.js 16. Create a `"use client"` wrapper component that does the dynamic import. See `CustomCursorLoader.tsx` for the established pattern.

## Remote Images

`next.config.ts` allowlists `images.unsplash.com`. Add any new image domains there.
