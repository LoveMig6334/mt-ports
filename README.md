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
├── layout.tsx                # Root layout: fonts, metadata
├── page.tsx                  # Home page composing all sections
├── globals.css               # CSS variables, Tailwind directives, grain overlay
├── error.tsx                 # Error boundary
└── work/
    └── [slug]/
        ├── page.tsx          # Dynamic category page (statically generated)
        └── not-found.tsx     # 404 for invalid category slugs
components/
├── CustomCursor.tsx          # Animated cursor dot + spring-physics trailing ring
├── CustomCursorLoader.tsx    # "use client" wrapper for dynamic import
├── Navbar.tsx                # Fixed nav with mix-blend-mode difference
├── Hero.tsx                  # Staggered text reveal, ghost watermark
├── HeroDivider.tsx           # Divider between hero sections
├── HeroRight.tsx             # Right-side hero content
├── IntroSection.tsx          # Introduction section
├── Marquee.tsx               # Reusable infinite scrolling text
├── SectionHeader.tsx         # Reusable numbered section header with serif accent
├── WorkGallery.tsx           # Project grid with hover overlays
├── Lightbox.tsx              # Modal with AnimatePresence, keyboard nav
├── StatsBar.tsx              # Animated counting numbers on scroll
├── About.tsx                 # Portrait with gradient shift, bio, skill links
├── SkillsBlock.tsx           # Skills radar chart and ability display
├── CertCarousel.tsx          # Horizontal carousel of certifications
├── CertLightbox.tsx          # Lightbox for certificate viewing
├── Contact.tsx               # Spinning star, email link, social links
├── SurveyCard.tsx            # Star rating survey with animated feedback
├── Footer.tsx                # Minimal footer
├── SmoothScroll.tsx          # Lenis smooth scroll provider
├── CategoryNavbar.tsx        # Navigation for category work pages
├── CategoryWorkGallery.tsx   # Gallery for category-specific works
└── CategoryLightbox.tsx      # Lightbox for category work items
lib/
├── projects.ts               # Typed project data array
├── animations.ts             # Shared Framer Motion variant presets
├── skills.ts                 # Abilities, radar chart data, gradients
├── certifications.ts         # Certification entries
└── categoryWorks.ts          # Category definitions and per-category works
hooks/
└── useScrollReveal.ts        # Custom hook using framer-motion useInView
public/
├── grain.png                 # Film grain overlay texture
├── profile.jpg               # Profile portrait
├── certificate/              # Certification images
└── category/                 # Category work images (per-category subfolders)
```

## Features

- Dark theme with chartreuse accent color system
- Staggered hero text reveal animations
- Infinite scrolling marquee strips
- Work gallery with hover overlays and fullscreen lightbox
- Category-based work pages with dedicated navigation and lightbox
- Lightbox with keyboard navigation (Escape, Arrow keys) and wrap-around
- Skills radar chart and ability percentage display
- Certification carousel with lightbox viewing
- Star rating survey card with animated thank-you feedback
- Animated stat counters that trigger on scroll
- Custom cursor with spring-physics trailing ring (hidden on touch devices)
- Film grain overlay
- Lenis smooth scrolling
- Fully responsive (900px / 600px breakpoints)

## License

This project is for personal portfolio use.
