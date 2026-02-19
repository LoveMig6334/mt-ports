"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUpVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 8, suffix: "", label: "Years Experience" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "", label: "Awards Won" },
];

function AnimatedNumber({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (spanRef.current) {
        spanRef.current.textContent = Math.floor(eased * value) + suffix;
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, value, suffix]);

  return <span ref={spanRef}>0{suffix}</span>;
}

export default function StatsBar() {
  const { ref, isInView } = useScrollReveal({ once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-2 border-y border-fg/8"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="p-12 text-center max-[900px]:p-8"
          style={{
            borderRight:
              i === stats.length - 1
                ? "none"
                : "1px solid rgba(240,236,228,0.08)",
            ...(i === 1 && { borderRight: undefined }),
          }}
        >
          <div
            className="leading-none mb-2 text-accent font-display font-extrabold"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.04em",
            }}
          >
            <AnimatedNumber
              value={stat.value}
              suffix={stat.suffix}
              isInView={isInView}
            />
          </div>
          <div className="text-[0.65rem] uppercase tracking-[0.15em] font-body text-fg/40">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
