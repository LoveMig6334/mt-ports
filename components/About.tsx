"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, ease } from "@/lib/animations";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const skills = [
  "Brand Identity",
  "UI/UX Design",
  "Typography",
  "Art Direction",
  "Motion Design",
  "Editorial",
  "Illustration",
  "Packaging",
];

function Portrait() {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div
        className="w-full rounded-[14px] relative overflow-hidden"
        style={{
          aspectRatio: "3/4",
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, var(--coral) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, var(--violet) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, var(--cyan) 0%, transparent 40%)
            `,
            opacity: 0.4,
            animation: "gradShift 8s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute bottom-8 left-8 font-display font-extrabold"
          style={{
            fontSize: "4rem",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          NOVA
          <span
            className="block mt-2 text-accent font-serif italic font-normal text-[1.2rem] tracking-[0.05em]"
          >
            Designer &amp; Creative
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Bio() {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="pt-8"
    >
      <p
        className="mb-8 font-serif italic text-fg"
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
        }}
      >
        I&apos;m a multidisciplinary designer who believes that{" "}
        <span className="text-coral">great design is felt</span> before
        it&apos;s understood.
      </p>
      <p className="mb-12 text-[0.82rem] leading-[1.85] font-body text-fg/50">
        With 8 years of crafting visual identities, digital products, and
        editorial design, I bring a perspective shaped by art, culture, and
        technology. Every project begins with a deep understanding of the problem
        and ends with a solution that moves people — visually and emotionally.
        I&apos;ve had the privilege of working with forward-thinking brands,
        ambitious startups, and cultural institutions across the globe.
      </p>

      <div className="grid grid-cols-2 gap-5 max-[600px]:grid-cols-1">
        {skills.map((skill) => (
          <motion.div
            key={skill}
            className="skill-pill py-4 px-5 rounded-[10px] text-center text-[0.7rem] uppercase tracking-[0.1em] font-body"
            style={{ border: "1px solid rgba(240,236,228,0.1)" }}
            whileHover={{
              borderColor: "#e8ff47",
              backgroundColor: "#e8ff47",
              color: "#0a0a0a",
              transition: { duration: 0.4, ease },
            }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="px-12 pb-24 max-[900px]:px-6">
        <div className="grid grid-cols-2 gap-16 items-start max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <Portrait />
          <Bio />
        </div>
      </div>
    </section>
  );
}
