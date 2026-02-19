"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ease, heroLineVariants, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

const heroLines = [
  <>
    Creating{" "}
    <em className="font-serif italic font-normal text-(--violet)">visual</em>
  </>,
  <>experiences that</>,
  <>
    feel <span className="text-(--cyan)">alive.</span>
  </>,
];

export default function HeroRight() {
  const { ref, isInView } = useScrollReveal({ amount: 0.25 });

  return (
    <section
      ref={ref}
      className="h-screen flex flex-col justify-center items-end px-12 relative overflow-hidden text-right max-[900px]:px-6"
    >
      {/* Ghost background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none font-display font-extrabold"
        style={{
          fontSize: "clamp(10rem, 20vw, 22rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(240,236,228,0.06)",
          lineHeight: 0.85,
        }}
      >
        CREATE
      </div>

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.9, ease }}
        className="text-[0.7rem] uppercase tracking-[0.25em] text-accent mb-8 font-body"
      >
        Graphic &amp; UI Designer — Available for Freelance
      </motion.div>

      {/* Main headline */}
      <motion.h1
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-8 font-display font-extrabold text-right"
        style={{
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
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease, delay: 0.5 }}
        className="flex justify-between items-end mt-12 w-full max-[600px]:flex-col max-[600px]:gap-8 max-[600px]:items-end"
      >
        {/* Scroll indicator on the left */}
        <div className="flex flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.2em] text-fg/35">
          <motion.div
            className="w-px h-15"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent), transparent)",
            }}
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [1, 1.2, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
          Scroll
        </div>
        {/* Description on the right */}
        <p className="max-w-85 text-[0.8rem] leading-[1.7] font-body text-fg/55 text-right ml-auto">
          I craft bold identities, immersive interfaces, and visual systems that
          speak louder than words. Based in Brooklyn, working globally.
        </p>
      </motion.div>
    </section>
  );
}
