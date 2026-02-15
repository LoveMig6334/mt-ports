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
      <span className="text-[0.7rem] tracking-widest text-accent font-body">
        {number}
      </span>
      <h2
        className="leading-none tracking-tight font-display font-extrabold"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "-0.04em",
        }}
      >
        {title}{" "}
        <span className="font-serif italic font-normal">
          {serifWord}
        </span>
      </h2>
    </motion.div>
  );
}
