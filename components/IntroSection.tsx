"use client";

import { ease } from "@/lib/animations";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Particles Data ─── */
const particles = [
  { top: "12%", left: "15%", delay: 0, dur: 7 },
  { top: "22%", left: "82%", delay: 1.2, dur: 9 },
  { top: "65%", left: "8%", delay: 2.5, dur: 6.5 },
  { top: "72%", left: "78%", delay: 0.8, dur: 10 },
  { top: "38%", left: "45%", delay: 3.2, dur: 8 },
  { top: "88%", left: "32%", delay: 1.8, dur: 7.5 },
];

/* ─── Eye positions in SVG coordinate space ─── */
const LEFT_EYE = { cx: 70, cy: 110 };
const RIGHT_EYE = { cx: 150, cy: 110 };

export default function IntroSection() {
  const lenis = useLenis();
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilLRef = useRef<SVGGElement>(null);
  const pupilRRef = useRef<SVGGElement>(null);
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const handleProfileError = useCallback(() => setProfileError(true), []);

  /* ─── Eye Tracking ─── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const scaleX = svgRect.width / 220;
      const scaleY = svgRect.height / 220;

      const eyes = [
        { ...LEFT_EYE, pupil: pupilLRef.current },
        { ...RIGHT_EYE, pupil: pupilRRef.current },
      ];

      eyes.forEach(({ cx, cy, pupil }) => {
        if (!pupil) return;
        const eyeScreenX = svgRect.left + cx * scaleX;
        const eyeScreenY = svgRect.top + cy * scaleY;
        const ang = Math.atan2(e.clientY - eyeScreenY, e.clientX - eyeScreenX);
        const dist = Math.min(
          Math.hypot(e.clientX - eyeScreenX, e.clientY - eyeScreenY) / 18,
          8,
        );
        const dx = (Math.cos(ang) * dist) / scaleX;
        const dy = (Math.sin(ang) * dist) / scaleY;
        pupil.setAttribute("transform", `translate(${dx}, ${dy})`);
      });
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

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

      {/* Floating particles (Framer Motion) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute w-0.75 h-0.75 rounded-full"
            style={{
              top: p.top,
              left: p.left,
              background: "#e8ff47",
            }}
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

      {/* ─── Avatar ─── */}
      <motion.div
        className="relative w-55 h-55 mb-10 z-2 max-[600px]:w-42.5 max-[600px]:h-42.5"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.15 }}
        onHoverStart={() => setAvatarHovered(true)}
        onHoverEnd={() => setAvatarHovered(false)}
        onClick={() => lenis?.scrollTo("#about")}
        style={{ cursor: "pointer" }}
      >
        {/* Glow ring (Framer Motion) */}
        <motion.div
          className="absolute -inset-6.5 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,255,71,0.07) 0%, transparent 70%)",
          }}
          animate={{
            scale: avatarHovered ? [1.15, 1.25, 1.15] : [1, 1.12, 1],
            opacity: avatarHovered ? [0.7, 1, 0.7] : [0.5, 1, 0.5],
          }}
          transition={{
            duration: avatarHovered ? 2 : 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* SVG Face (default) */}
        <AnimatePresence>
          {!avatarHovered && (
            <motion.div
              key="face"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 220 220"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="av-faceGrad"
                    x1="0.2"
                    y1="0"
                    x2="0.8"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22223a" />
                    <stop offset="50%" stopColor="#181828" />
                    <stop offset="100%" stopColor="#10101e" />
                  </linearGradient>
                  <linearGradient
                    id="av-hairGrad"
                    x1="0.5"
                    y1="0"
                    x2="0.5"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#141418" />
                    <stop offset="100%" stopColor="#222230" />
                  </linearGradient>
                  <radialGradient id="av-highlight" cx="0.35" cy="0.3" r="0.55">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <linearGradient
                    id="av-eyeGrad"
                    x1="0.5"
                    y1="0"
                    x2="0.5"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#eae8e2" />
                  </linearGradient>
                  <radialGradient
                    id="av-pupilGrad"
                    cx="0.32"
                    cy="0.32"
                    r="0.68"
                  >
                    <stop offset="0%" stopColor="#4f5080" />
                    <stop offset="55%" stopColor="#1c1c30" />
                    <stop offset="100%" stopColor="#0c0c18" />
                  </radialGradient>
                  <clipPath id="av-faceClip">
                    <circle cx="110" cy="110" r="110" />
                  </clipPath>
                  <filter id="av-faceShadow">
                    <feDropShadow
                      dx="0"
                      dy="24"
                      stdDeviation="35"
                      floodColor="#000"
                      floodOpacity="0.55"
                    />
                  </filter>
                </defs>

                {/* Face */}
                <circle
                  cx="110"
                  cy="110"
                  r="110"
                  fill="url(#av-faceGrad)"
                  filter="url(#av-faceShadow)"
                />
                <circle cx="110" cy="110" r="110" fill="url(#av-highlight)" />

                <g clipPath="url(#av-faceClip)">
                  {/* Hair — main top (semicircle top, flat bottom) */}
                  <path
                    d="M15 97 V87 A95 95 0 0 1 110 -8 A95 95 0 0 1 205 87 V97 Z"
                    fill="url(#av-hairGrad)"
                  />
                  {/* Hair — left sideburn */}
                  <path
                    d="M-3 54 H52 V101 A28 28 0 0 1 24 129 H25 A28 28 0 0 1 -3 101 Z"
                    fill="url(#av-hairGrad)"
                  />
                  {/* Hair — right sideburn */}
                  <path
                    d="M168 54 H223 V101 A28 28 0 0 1 195 129 H196 A28 28 0 0 1 168 101 Z"
                    fill="url(#av-hairGrad)"
                  />

                  {/* Eyebrows */}
                  <rect
                    x="38"
                    y="62"
                    width="44"
                    height="7"
                    rx="4"
                    fill="#181820"
                    transform="rotate(-5, 60, 65.5)"
                  />
                  <rect
                    x="138"
                    y="62"
                    width="44"
                    height="7"
                    rx="4"
                    fill="#181820"
                    transform="rotate(5, 160, 65.5)"
                  />

                  {/* Eyes — whites */}
                  <circle cx="70" cy="110" r="21" fill="url(#av-eyeGrad)" />
                  <circle cx="150" cy="110" r="21" fill="url(#av-eyeGrad)" />

                  {/* Pupils + highlights (grouped for mouse tracking) */}
                  <g ref={pupilLRef}>
                    <circle cx="70" cy="110" r="11" fill="url(#av-pupilGrad)" />
                    <circle
                      cx="66"
                      cy="106"
                      r="3.5"
                      fill="rgba(255,255,255,0.85)"
                    />
                    <circle
                      cx="71"
                      cy="113"
                      r="1.5"
                      fill="rgba(255,255,255,0.35)"
                    />
                  </g>
                  <g ref={pupilRRef}>
                    <circle
                      cx="150"
                      cy="110"
                      r="11"
                      fill="url(#av-pupilGrad)"
                    />
                    <circle
                      cx="146"
                      cy="106"
                      r="3.5"
                      fill="rgba(255,255,255,0.85)"
                    />
                    <circle
                      cx="151"
                      cy="113"
                      r="1.5"
                      fill="rgba(255,255,255,0.35)"
                    />
                  </g>

                  {/* Glasses — lenses */}
                  <rect
                    x="41"
                    y="76"
                    width="58"
                    height="46"
                    rx="10"
                    fill="rgba(232,255,71,0.04)"
                    stroke="#e8ff47"
                    strokeWidth="3"
                  />
                  <rect
                    x="121"
                    y="76"
                    width="58"
                    height="46"
                    rx="10"
                    fill="rgba(232,255,71,0.04)"
                    stroke="#e8ff47"
                    strokeWidth="3"
                  />
                  {/* Glasses — bridge */}
                  <line
                    x1="99"
                    y1="99"
                    x2="121"
                    y2="99"
                    stroke="#e8ff47"
                    strokeWidth="3"
                  />
                  {/* Glasses — arms */}
                  <line
                    x1="3"
                    y1="103"
                    x2="41"
                    y2="99"
                    stroke="#e8ff47"
                    strokeWidth="3"
                  />
                  <line
                    x1="179"
                    y1="99"
                    x2="217"
                    y2="103"
                    stroke="#e8ff47"
                    strokeWidth="3"
                  />

                  {/* Nose */}
                  <path
                    d="M100 140 Q110 148 120 140"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Mouth */}
                  <path
                    d="M93 176 Q110 188 127 176"
                    stroke="rgba(255,107,74,0.55)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile photo (shown on hover) — matches About Me portrait */}
        <AnimatePresence>
          {avatarHovered && (
            <motion.div
              key="portrait"
              className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            >
              {profileError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#151515]">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff6b4a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                  <span
                    className="font-body uppercase tracking-widest"
                    style={{ fontSize: "0.45rem", color: "#ff6b4a" }}
                  >
                    Unavailable
                  </span>
                </div>
              ) : (
                <>
                  {/* Real profile photo */}
                  <NextImage
                    src="/profile.jpg"
                    alt="Nova — Designer & Creative"
                    fill
                    className="object-cover object-top"
                    sizes="220px"
                    priority
                    onError={handleProfileError}
                  />
                  {/* Bottom scrim for label readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.1) 45%, transparent 100%)",
                    }}
                  />
                  {/* NOVA label */}
                  <div
                    className="absolute bottom-5 left-5 font-display font-extrabold leading-none"
                    style={{ fontSize: "1.4rem", letterSpacing: "-0.03em" }}
                  >
                    NOVA
                    <span
                      className="block mt-1 text-accent font-serif italic font-normal"
                      style={{ fontSize: "0.5rem", letterSpacing: "0.06em" }}
                    >
                      Designer &amp; Creative
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
        <span
          className="font-serif italic font-normal text-coral"
          style={{ fontSize: "1.12em" }}
        >
          Nova
        </span>
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
          animate={{
            opacity: [0.3, 1, 0.3],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        Explore
      </motion.div>
    </section>
  );
}
