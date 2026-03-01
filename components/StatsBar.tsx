"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUpVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: Stat[] = [
  { value: 3.92, suffix: "", label: "GPAX", decimals: 2 },
  { value: 7, suffix: "", label: "Projects Done" },
  { value: 15, suffix: "+", label: "Awards" },
  { value: 2, suffix: "", label: "Years Experience" },
];

function AnimatedNumber({
  value,
  suffix,
  decimals,
  isInView,
}: {
  value: number;
  suffix: string;
  decimals?: number;
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
        const current = eased * value;
        spanRef.current.textContent =
          decimals && decimals > 0
            ? current.toFixed(decimals) + suffix
            : Math.floor(current) + suffix;
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
  }, [isInView, value, suffix, decimals]);

  const initial =
    decimals && decimals > 0
      ? (0).toFixed(decimals) + suffix
      : "0" + suffix;

  return <span ref={spanRef}>{initial}</span>;
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
              decimals={stat.decimals}
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
