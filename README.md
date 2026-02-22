# The Graphic & UI Designer Portfolio

A bold, animation-rich portfolio website for a freelance graphic and UI designer. Built with Next.js, Framer Motion, and Tailwind CSS.

## Tech Stack

- **Next.js 16** — App Router, TypeScript, `next/font`, `next/image`
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Page animations, scroll reveals, lightbox transitions, custom cursor physics
- **Lenis** — Premium smooth scrolling
- **Google Fonts** — Syne, Space Mono, Instrument Serif

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx             # Root layout: fonts, metadata
├── page.tsx               # Home page composing all sections
└── globals.css            # CSS variables, Tailwind directives, grain overlay
components/
├── CustomCursor.tsx       # Animated cursor dot + spring-physics trailing ring
├── Navbar.tsx             # Fixed nav with mix-blend-mode difference
├── Hero.tsx               # Staggered text reveal, ghost watermark, scroll indicator
├── Marquee.tsx            # Reusable infinite scrolling text (direction + speed props)
├── SectionHeader.tsx      # Reusable numbered section header with serif accent
├── WorkGallery.tsx        # Project grid with hover overlays
├── Lightbox.tsx           # Modal with AnimatePresence, keyboard nav, crossfade
├── StatsBar.tsx           # Animated counting numbers on scroll
├── About.tsx              # Portrait with gradient shift, bio, skills grid
├── Contact.tsx            # Spinning star, email link, social links
├── Footer.tsx             # Minimal footer
└── SmoothScroll.tsx       # Lenis smooth scroll provider
lib/
├── projects.ts            # Typed project data array
└── animations.ts          # Shared Framer Motion variant presets
hooks/
└── useScrollReveal.ts     # Custom hook using framer-motion useInView
```

## Features

- Dark theme with chartreuse accent color system
- Staggered hero text reveal animations
- Infinite scrolling marquee strips
- Work gallery with hover overlays and fullscreen lightbox
- Lightbox with keyboard navigation (Escape, Arrow keys) and wrap-around
- Animated stat counters that trigger on scroll
- Custom cursor with spring-physics trailing ring (hidden on touch devices)
- Film grain SVG overlay
- Lenis smooth scrolling
- Fully responsive (900px / 600px breakpoints)

## License

This project is for personal portfolio use.
