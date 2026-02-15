"use client";

import { motion } from "framer-motion";
import { staggerContainer, heroLineVariants, fadeUpVariants, ease } from "@/lib/animations";

const heroLines = [
  <>
    Creating <em className="not-italic" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--coral)" }}>visual</em>
  </>,
  <>experiences that</>,
  <>
    feel <span className="text-[var(--accent)]">alive.</span>
  </>,
];

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center px-12 relative overflow-hidden max-[900px]:px-6">
      {/* Ghost background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(10rem, 20vw, 22rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(240,236,228,0.06)",
          lineHeight: 0.85,
        }}
      >
        DESIGN
      </div>

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.3 }}
        className="text-[0.7rem] uppercase tracking-[0.25em] text-[var(--accent)] mb-8"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Graphic &amp; UI Designer — Available for Freelance
      </motion.div>

      {/* Main headline */}
      <motion.h1
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-8"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(3.2rem, 9vw, 8.5rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
        }}
      >
        {heroLines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span className="inline-block" variants={heroLineVariants}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      {/* Bottom area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 1 }}
        className="flex justify-between items-end mt-12 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-8"
      >
        <p
          className="max-w-[340px] text-[0.8rem] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "rgba(240,236,228,0.55)" }}
        >
          I craft bold identities, immersive interfaces, and visual systems that
          speak louder than words. Based in Brooklyn, working globally.
        </p>
        <div className="flex flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: "rgba(240,236,228,0.35)" }}>
          <motion.div
            className="w-px h-[60px]"
            style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [1, 1.2, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
          Scroll
        </div>
      </motion.div>
    </section>
  );
}
