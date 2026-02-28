"use client";

import { ease } from "@/lib/animations";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import NextImage from "next/image";
import { useState } from "react";

/* ─── Background particles ─── */
const bgParticles = [
  { top: "12%", left: "15%", delay: 0, dur: 7 },
  { top: "22%", left: "82%", delay: 1.2, dur: 9 },
  { top: "65%", left: "8%", delay: 2.5, dur: 6.5 },
  { top: "72%", left: "78%", delay: 0.8, dur: 10 },
  { top: "38%", left: "45%", delay: 3.2, dur: 8 },
  { top: "88%", left: "32%", delay: 1.8, dur: 7.5 },
];

/* ─── Dust particles orbiting the profile ─── */
const dustParticles = [
  {
    x: -118,
    y: -38,
    size: 2.5,
    color: "#e8ff47",
    delay: 0,
    dur: 2.5,
    driftY: -9,
    driftX: 4,
  },
  {
    x: 120,
    y: -52,
    size: 2,
    color: "#e8ff47",
    delay: 0.6,
    dur: 3,
    driftY: -7,
    driftX: -3,
  },
  {
    x: -88,
    y: 82,
    size: 3,
    color: "#b48aff",
    delay: 1.2,
    dur: 2.8,
    driftY: 9,
    driftX: -5,
  },
  {
    x: 96,
    y: 72,
    size: 2,
    color: "#47f0ff",
    delay: 0.3,
    dur: 3.2,
    driftY: 7,
    driftX: 5,
  },
  {
    x: -52,
    y: -108,
    size: 2.5,
    color: "#e8ff47",
    delay: 0.9,
    dur: 2.2,
    driftY: -11,
    driftX: -4,
  },
  {
    x: 58,
    y: -102,
    size: 2,
    color: "#e8ff47",
    delay: 1.5,
    dur: 2.7,
    driftY: -9,
    driftX: 3,
  },
  {
    x: -132,
    y: 14,
    size: 2,
    color: "#47f0ff",
    delay: 0.5,
    dur: 3.5,
    driftY: 5,
    driftX: -7,
  },
  {
    x: 126,
    y: 22,
    size: 3,
    color: "#b48aff",
    delay: 1.8,
    dur: 2.9,
    driftY: -6,
    driftX: 7,
  },
  {
    x: 8,
    y: -124,
    size: 2,
    color: "#e8ff47",
    delay: 0.2,
    dur: 3.1,
    driftY: -13,
    driftX: 2,
  },
  {
    x: -18,
    y: 118,
    size: 2.5,
    color: "#e8ff47",
    delay: 1.1,
    dur: 2.4,
    driftY: 11,
    driftX: -3,
  },
  {
    x: 82,
    y: -88,
    size: 1.5,
    color: "#ff6b4a",
    delay: 0.7,
    dur: 3.3,
    driftY: -8,
    driftX: 5,
  },
  {
    x: -78,
    y: 96,
    size: 1.5,
    color: "#ff6b4a",
    delay: 1.4,
    dur: 2.6,
    driftY: 10,
    driftX: -4,
  },
];

export default function IntroSection() {
  const lenis = useLenis();
  const [hovered, setHovered] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    lenis?.scrollTo(href);
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden max-[900px]:py-24 max-[900px]:px-6"
      style={{ padding: "7rem 3rem 4rem" }}
      id="intro"
    >
      {/* Ghost background text */}
      <div
        className="absolute top-1/2 left-1/2 font-display font-extrabold whitespace-nowrap pointer-events-none select-none leading-none"
        style={{
          transform: "translate(-50%, -60%)",
          fontSize: "clamp(4rem, 14vw, 16rem)",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(240,236,228,0.04)",
          letterSpacing: "-0.04em",
        }}
      >
        WELCOME
      </div>

      {/* Floating background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {bgParticles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute w-0.75 h-0.75 rounded-full"
            style={{ top: p.top, left: p.left, background: "#e8ff47" }}
            animate={{
              y: [0, -25, -12, -32, 0],
              x: [0, 12, -18, 8, 0],
              opacity: [0.12, 0.35, 0.18, 0.3, 0.12],
            }}
            transition={{
              duration: p.dur,
              ease: "easeInOut",
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ─── Profile Image ─── */}
      <motion.div
        className="relative w-55 h-55 mb-10 z-2 max-[600px]:w-42.5 max-[600px]:h-42.5 avatar-hover"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.15 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => lenis?.scrollTo("#about")}
        style={{ cursor: "pointer" }}
      >
        {/* Outer diffuse glow — base layer (always visible, subtly) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: "-44px",
            background:
              "radial-gradient(circle, rgba(232,255,71,0.055) 0%, transparent 68%)",
          }}
        />

        {/* Outer diffuse glow — hover layer */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: "-44px",
            background:
              "radial-gradient(circle, rgba(232,255,71,0.2) 0%, rgba(180,138,255,0.08) 42%, transparent 68%)",
          }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* Pulsing mid-glow (always running, more intense on hover) */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: "-18px",
            background:
              "radial-gradient(circle, rgba(232,255,71,0.16) 0%, transparent 58%)",
          }}
          animate={{
            opacity: hovered ? [0.55, 1, 0.55] : [0.08, 0.18, 0.08],
            scale: hovered ? [1, 1.07, 1] : [1, 1.04, 1],
          }}
          transition={{
            duration: hovered ? 1.8 : 3.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Dust particles — faded in on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {dustParticles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                left: `calc(50% + ${p.x}px)`,
                top: `calc(50% + ${p.y}px)`,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
                boxShadow: `0 0 ${p.size * 2.5}px ${p.color}`,
              }}
              animate={{
                opacity: [0, 0.85, 0],
                y: [0, p.driftY, p.driftY * 1.6],
                x: [0, p.driftX, p.driftX * 1.3],
                scale: [0.3, 1.3, 0.3],
              }}
              transition={{
                duration: p.dur,
                ease: "easeInOut",
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}
        </motion.div>

        {/* Glow ring — base */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: "0 0 0 1.5px rgba(232,255,71,0.1)" }}
        />

        {/* Glow ring — hover */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow:
              "0 0 0 2px rgba(232,255,71,0.55), 0 0 22px rgba(232,255,71,0.28), 0 0 55px rgba(232,255,71,0.1)",
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* Profile photo — scales on hover */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <NextImage
            src="/profile.jpg"
            alt="Thatt — Designer & Creative"
            fill
            className="object-cover object-top"
            sizes="220px"
          />
        </motion.div>
      </motion.div>

      {/* ─── Text ─── */}
      <motion.div
        className="font-body text-[0.72rem] uppercase tracking-[0.35em] text-accent mb-5 z-2"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.35 }}
      >
        Welcome to my creative space
      </motion.div>

      <motion.h1
        className="font-display font-extrabold text-center mb-4 z-2 leading-none max-[600px]:text-[2.4rem]"
        style={{
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          letterSpacing: "-0.04em",
        }}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.5 }}
      >
        Hello, I&apos;m{" "}
        <motion.span
          className="font-serif italic font-normal text-coral relative"
          style={{ fontSize: "1.12em", display: "inline-grid" }}
          onHoverStart={() => setNameHovered(true)}
          onHoverEnd={() => setNameHovered(false)}
        >
          {/* Hidden ghost spans lock the grid cell to the max width of both texts */}
          <span
            aria-hidden
            style={{
              gridArea: "1 / 1",
              visibility: "hidden",
              fontFamily: "'SOV_YoongYerng'",
              fontStyle: "normal",
              pointerEvents: "none",
            }}
          >
            ธรรศ
          </span>
          <span
            aria-hidden
            style={{
              gridArea: "1 / 1",
              visibility: "hidden",
              pointerEvents: "none",
            }}
          >
            Thatt
          </span>
          <AnimatePresence mode="wait" initial={false}>
            {nameHovered ? (
              <motion.span
                key="thai"
                style={{
                  gridArea: "1 / 1",
                  fontFamily: "'SOV_YoongYerng'",
                  fontStyle: "normal",
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              >
                ธรรศ
              </motion.span>
            ) : (
              <motion.span
                key="en"
                style={{ gridArea: "1 / 1" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              >
                Thatt
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </motion.h1>

      <motion.div
        className="font-body text-[0.72rem] uppercase tracking-[0.22em] text-center mb-8 z-2"
        style={{ color: "rgba(240,236,228,0.4)" }}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.65 }}
      >
        Graphic &amp; UI Designer
      </motion.div>

      {/* Wave divider */}
      <motion.div
        className="w-50 h-6 mx-auto mb-8 z-2 opacity-40"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.75 }}
      >
        <svg
          viewBox="0 0 200 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M0 12 C20 0, 40 24, 60 12 S100 0, 120 12 S160 24, 180 12 S200 0, 200 12"
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M0 16 C20 4, 40 28, 60 16 S100 4, 120 16 S160 28, 180 16 S200 4, 200 16"
            stroke="var(--coral)"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      {/* Description */}
      <motion.p
        className="max-w-155 text-center text-[0.88rem] leading-relaxed mb-11 z-2 font-body"
        style={{ color: "rgba(240,236,228,0.5)", lineHeight: "1.9" }}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.85 }}
      >
        This portfolio is a curated journey through{" "}
        <strong className="text-fg font-normal">
          visual identities, immersive interfaces, and bold design systems
        </strong>{" "}
        I&apos;ve brought to life. Each project here is a story — of
        collaboration, experimentation, and the relentless pursuit of design
        that doesn&apos;t just look beautiful, but{" "}
        <strong className="text-fg font-normal">feels alive</strong>.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex gap-5 items-center z-2 max-[900px]:flex-col"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1 }}
      >
        <a
          href="#work"
          className="inline-flex items-center gap-2.5 rounded-full font-body text-[0.72rem] uppercase no-underline cursor-pointer border-none bg-accent text-bg tracking-[0.14em] hover:-translate-y-0.75"
          style={{
            padding: "1rem 2.2rem",
            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            letterSpacing: "0.14em",
          }}
          onClick={(e) => handleNav(e, "#work")}
        >
          View Work ↓
        </a>
        <a
          href="#about"
          className="inline-flex items-center gap-2.5 rounded-full font-body text-[0.72rem] uppercase no-underline cursor-pointer text-fg tracking-[0.14em] hover:-translate-y-0.75"
          style={{
            padding: "1rem 2.2rem",
            border: "1.5px solid rgba(240,236,228,0.2)",
            background: "transparent",
            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            letterSpacing: "0.14em",
          }}
          onClick={(e) => handleNav(e, "#about")}
        >
          About Me
        </a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2.5 text-[0.56rem] uppercase tracking-[0.22em] z-2"
        style={{ color: "rgba(240,236,228,0.22)" }}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.3 }}
      >
        <motion.div
          className="w-px h-12.5"
          style={{
            background: "linear-gradient(to bottom, #e8ff47, transparent)",
          }}
          animate={{ opacity: [0.3, 1, 0.3], scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        />
        Explore
      </motion.div>
    </section>
  );
}
