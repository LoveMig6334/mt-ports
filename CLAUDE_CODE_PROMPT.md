# Prompt: Convert Portfolio HTML Prototype to Production Next.js App

## Context

I have a single-page HTML prototype for a freelance Graphic & UI Designer portfolio website called "NOVA". The file is `portfolio.html` in this folder. I need you to convert it into a fully structured, production-ready Next.js application while preserving every visual detail, animation, and the overall bold typographic aesthetic.

Read `portfolio.html` thoroughly first. Understand every CSS animation, every hover state, every layout detail before writing any code.

---

## Tech Stack (install and configure all of these)

- **Next.js 14+** with App Router (`app/` directory)
- **TypeScript**
- **Tailwind CSS v4** — for utility styling alongside custom CSS where needed
- **Framer Motion** — replace ALL CSS keyframe animations and transitions with Framer Motion equivalents
- **Lenis** (`lenis/react`) — for premium smooth scrolling
- **next/font** — for loading Google Fonts (Syne, Space Mono, Instrument Serif)

---

## Project Structure

Create this exact structure:

```
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, smooth scroll provider, grain overlay
│   ├── page.tsx            # Home page composing all sections
│   └── globals.css         # CSS variables, base styles, Tailwind directives, custom utilities
├── components/
│   ├── CustomCursor.tsx    # Animated cursor dot + trailing ring
│   ├── Navbar.tsx          # Fixed nav with blend-mode, scroll-aware links
│   ├── Hero.tsx            # Hero with staggered text reveals and background ghost text
│   ├── Marquee.tsx         # Infinite scrolling text marquee (reusable, accepts direction prop)
│   ├── SectionHeader.tsx   # Reusable section header (number + title with serif accent)
│   ├── WorkGallery.tsx     # Project grid with hover overlays
│   ├── Lightbox.tsx        # Modal lightbox with image navigation and keyboard support
│   ├── StatsBar.tsx        # Animated counter stats section
│   ├── About.tsx           # About section with portrait, bio, and skills grid
│   ├── Contact.tsx         # Contact section with email link and social links
│   └── Footer.tsx          # Minimal footer
├── lib/
│   ├── projects.ts         # Work/project data array (typed)
│   └── animations.ts       # Shared Framer Motion variant presets and transitions
├── hooks/
│   └── useScrollReveal.ts  # Custom hook using framer-motion useInView for reveal animations
├── public/
│   └── (empty for now, images use Unsplash URLs)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Critical Conversion Requirements

### 1. Fonts — Use `next/font/google`

```tsx
import { Syne, Space_Mono } from 'next/font/google';
```

For Instrument Serif (which may not be in next/font), use `@import` in globals.css or load via `<link>` in layout. Map each font to a CSS variable:

- `--font-display`: Syne (headings, hero, big text)
- `--font-body`: Space Mono (body, nav, tags, labels)
- `--font-serif`: Instrument Serif (italic accent words)

### 2. Color System — Preserve exactly

```css
--bg: #0a0a0a;
--fg: #f0ece4;
--accent: #e8ff47;      /* chartreuse/lime */
--coral: #ff6b4a;
--violet: #b48aff;
--cyan: #47f0ff;
```

### 3. Animations — Framer Motion conversions

This is the most important part. Every animation must feel as smooth or smoother than the original.

**Hero text reveal**: Replace CSS `@keyframes slideUp` with Framer Motion staggered children. Each line should slide up from `y: "110%"` with staggered delays (0.4s, 0.55s, 0.7s). Use `overflow: hidden` on parent divs.

```tsx
// Example approach for hero lines:
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
};
const lineVariants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] } }
};
```

**Scroll reveal**: Replace `IntersectionObserver` with Framer Motion's `useInView` hook and `motion.div` with `variants`. Elements should fade up (`y: 50 → 0`, `opacity: 0 → 1`) when they enter the viewport.

**Lightbox**: Use `AnimatePresence` for enter/exit animations. The lightbox should:
- Fade in the backdrop (`opacity: 0 → 1`)
- Scale and slide the image (`scale: 0.9, y: 30 → scale: 1, y: 0`)
- Animate out on close (CSS can't do exit animations — this is a key upgrade)
- Support keyboard navigation (Escape, ArrowLeft, ArrowRight)
- Image transitions when navigating between projects should crossfade or slide

**Hover states**: Use `motion.div` with `whileHover` for work items (image scale), skill pills, social links, and nav link underlines.

**Marquee**: Implement with CSS `@keyframes` (Framer Motion is overkill here). Make it a reusable component with a `direction` prop (`"left" | "right"`) and `speed` prop.

**Stats counter**: Animate numbers counting up from 0 when they scroll into view. Use Framer Motion's `useMotionValue` and `useTransform`, or a simple `useEffect` with `useInView`.

**Custom cursor**: Use `motion.div` with `useMotionValue` and `useSpring` for the trailing ring (spring physics feel better than CSS transitions). The ring should expand on hoverable elements. Only show on non-touch devices.

**Scroll indicator**: The pulsing line in the hero should use Framer Motion's `animate` with `repeat: Infinity`.

### 4. Smooth Scrolling — Lenis

Wrap the app in a Lenis provider in layout.tsx. Configure with:
```tsx
<ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
```

This replaces `scroll-behavior: smooth` and gives that premium buttery scroll feel seen on award-winning portfolio sites.

### 5. Lightbox Component — Full Feature Spec

- Manage open/close state with React state (lifted to WorkGallery or page level)
- `AnimatePresence` for mount/unmount animations
- Navigate with arrow buttons AND keyboard arrows
- Close with ✕ button, Escape key, OR clicking backdrop
- Trap focus inside lightbox when open
- Prevent body scroll when open (`overflow: hidden`)
- Show project title and category tag below the image
- Wrap-around navigation (last → first, first → last)

### 6. Data Layer

In `lib/projects.ts`, define typed project data:

```tsx
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;        // thumbnail URL
  imageFull: string;    // high-res URL for lightbox
  aspectRatio?: string; // for grid layout variation
}
```

Populate with the 6 Unsplash images from the HTML prototype.

### 7. Shared Animation Presets

In `lib/animations.ts`, export reusable variants:

```tsx
export const ease = [0.23, 1, 0.32, 1];  // custom cubic-bezier from the prototype

export const fadeUpVariants = { ... };
export const staggerContainer = { ... };
export const scaleIn = { ... };
```

This prevents duplicating animation configs across components.

### 8. Grain Overlay

Keep the SVG noise texture as a fixed overlay with `pointer-events: none` and high z-index. Implement as a `::after` pseudo-element in globals.css (same approach as prototype).

### 9. Responsive Design

Preserve all breakpoints from the prototype:
- `900px`: Single column work grid, stacked about section, 2-column stats
- `600px`: Smaller hero text, adjusted skills grid
- Hide custom cursor on touch devices (check for pointer: coarse)

### 10. Performance Considerations

- Use `next/image` for all Unsplash images with proper `sizes` and `placeholder="blur"` if possible
- Add `loading="lazy"` behavior (Next/Image does this by default)
- Use `'use client'` directive only on components that need interactivity (cursor, lightbox, animations)
- Keep layout.tsx as a server component where possible
- Consider splitting Lightbox into its own dynamic import since it's not needed on initial load

### 11. Metadata

In layout.tsx, set proper metadata:
```tsx
export const metadata: Metadata = {
  title: 'NOVA — Graphic & UI Designer',
  description: 'Portfolio of NOVA, a freelance graphic and UI designer creating bold visual experiences.',
};
```

---

## Style Preservation Checklist

Go through this checklist before considering the conversion complete:

- [ ] Dark background (#0a0a0a) with warm off-white text (#f0ece4)
- [ ] Chartreuse accent (#e8ff47) on tags, highlights, and interactive elements
- [ ] Hero text: massive display font, 3 lines, with italic serif "visual" and accent-colored "alive."
- [ ] Giant ghost watermark text "DESIGN" behind the hero (stroked, nearly invisible)
- [ ] Two marquee strips: one after hero (services), one before contact (CTA phrases), opposite directions
- [ ] Work grid: 2 columns with varying aspect ratios, hover reveals overlay with title + category + arrow button
- [ ] About section: left column has gradient portrait with name overlay, right column has serif intro quote + mono body text + skill pill grid
- [ ] Stats bar: 4 columns with large accent-colored numbers
- [ ] Contact: centered layout, spinning ✦ symbol, large headline with violet serif accent, email with animated underline, circular social link buttons
- [ ] Film grain overlay across entire page
- [ ] Custom cursor (dot + trailing ring) that grows on interactive elements
- [ ] All hover transitions use the custom easing `cubic-bezier(0.23, 1, 0.32, 1)`
- [ ] `mix-blend-mode: difference` on nav and cursor
- [ ] `::selection` styled with accent color

---

## How to Start

1. Initialize the Next.js project in this directory (alongside portfolio.html): `npx create-next-app@latest . --typescript --tailwind --eslint --app --src=false --import-alias "@/*"`
2. Install dependencies: `npm install framer-motion lenis`
3. Clean out all default Next.js boilerplate (default page content, default globals.css styles)
4. Set up fonts, CSS variables, and globals.css first
5. Build components one by one, starting with layout → page → Hero → Marquee → WorkGallery → Lightbox → About → Stats → Contact → Footer → CustomCursor
6. Test that all animations fire correctly and the visual output matches the HTML prototype

Take your time. Read the prototype carefully. Every detail matters — this is a designer's portfolio, and the execution quality IS the portfolio.
