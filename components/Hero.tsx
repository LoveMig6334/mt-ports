"use client";

import { ease, heroLineVariants, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

const heroLines = [
  <>
    <span style={{ fontFamily: "'CMU-Bold'", letterSpacing: "-0.02em" }}>
      แฟ้มสะสม
    </span>{" "}
    <span
      className="text-accent"
      style={{ fontFamily: "'CMU-Bold'", letterSpacing: "-0.02em" }}
    >
      ผลงาน
    </span>{" "}
    <span
      className="font-body text-fg/30 align-middle"
      style={{ fontSize: "0.3em", letterSpacing: "0.08em" }}
    >
      online
    </span>
  </>,
  <>that</>,
  <>
    speak for{" "}
    <em className="font-serif italic font-normal text-(--coral)">itself.</em>
  </>,
];

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center px-12 relative overflow-hidden max-[900px]:px-6">
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
        PORTFOLIO
      </div>

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.3 }}
        className="text-[0.9rem] uppercase tracking-[0.25em] text-accent mb-8"
        style={{ fontFamily: "'CMU-Regular'" }}
      >
        นักเรียนชั้น ม.4/1 วิทย์-คณิต — โรงเรียนจิตรลดา
      </motion.div>

      {/* Main headline */}
      <motion.h1
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-8 font-display font-extrabold"
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 1 }}
        className="flex justify-between items-end mt-12 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-8"
      >
        <p
          className="max-w-85 text-[0.85rem] leading-[1.7] text-fg/55"
          style={{ fontFamily: "'CMU-Regular'" }}
        >
          แฟ้มสะสมผลงานนี้รวบรวมผลงานและประสบการณ์การเรียนรู้ตลอดปีการศึกษา ม.4
          โรงเรียนจิตรลดา
        </p>
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
      </motion.div>
    </section>
  );
}
