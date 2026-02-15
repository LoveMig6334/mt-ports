"use client";

import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/animations";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionHeaderProps {
  number: string;
  title: string;
  serifWord: string;
}

export default function SectionHeader({ number, title, serifWord }: SectionHeaderProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex items-baseline gap-8 pt-24 pb-12 px-12 max-[900px]:px-6"
    >
      <span
        className="text-[0.7rem] tracking-[0.1em] text-[var(--accent)]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {number}
      </span>
      <h2
        className="leading-none tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "-0.04em",
        }}
      >
        {title}{" "}
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>
          {serifWord}
        </span>
      </h2>
    </motion.div>
  );
}
