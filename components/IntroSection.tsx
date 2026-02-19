"use client";

import { ease } from "@/lib/animations";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

/* ─── Particles Data ─── */
const particles = [
  { top: "12%", left: "15%", delay: "0s", dur: "7s" },
  { top: "22%", left: "82%", delay: "1.2s", dur: "9s" },
  { top: "65%", left: "8%", delay: "2.5s", dur: "6.5s" },
  { top: "72%", left: "78%", delay: "0.8s", dur: "10s" },
  { top: "38%", left: "45%", delay: "3.2s", dur: "8s" },
  { top: "88%", left: "32%", delay: "1.8s", dur: "7.5s" },
];

export default function IntroSection() {
  const lenis = useLenis();
  const pupilLRef = useRef<HTMLDivElement>(null);
  const pupilRRef = useRef<HTMLDivElement>(null);
  const eyeLRef = useRef<HTMLDivElement>(null);
  const eyeRRef = useRef<HTMLDivElement>(null);

  /* ─── Eye Tracking ─── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      [
        { eye: eyeLRef.current, p: pupilLRef.current },
        { eye: eyeRRef.current, p: pupilRRef.current },
      ].forEach(({ eye, p }) => {
        if (!eye || !p) return;
        const r = eye.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = Math.min(
          Math.hypot(e.clientX - cx, e.clientY - cy) / 18,
          8,
        );
        p.style.transform = `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist}px))`;
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
    <section className="intro-section" id="intro">
      {/* Ghost background text */}
      <div className="intro-bg-welcome">WELCOME</div>

      {/* Floating particles */}
      <div className="intro-particles">
        {particles.map((p, i) => (
          <span
            key={i}
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}
      </div>

      {/* ─── Avatar ─── */}
      <motion.div
        className="avatar-wrap"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.15 }}
      >
        <div className="avatar-glow-ring" />
        <div className="avatar-face-div">
          <div className="av-hair" />
          <div className="av-brow l" />
          <div className="av-brow r" />
          <div className="av-eyes">
            <div className="av-eye" ref={eyeLRef}>
              <div className="av-pupil" ref={pupilLRef} />
            </div>
            <div className="av-eye" ref={eyeRRef}>
              <div className="av-pupil" ref={pupilRRef} />
            </div>
          </div>
          <div className="av-glasses">
            <div className="av-arm-g l" />
            <div className="av-glasses-inner">
              <div className="av-lens" />
              <div className="av-bridge" />
              <div className="av-lens" />
            </div>
            <div className="av-arm-g r" />
          </div>
          <div className="av-nose" />
          <div className="av-mouth" />
        </div>
      </motion.div>

      {/* ─── Text ─── */}
      <motion.div
        className="intro-greeting"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.35 }}
      >
        Welcome to my creative space
      </motion.div>

      <motion.h1
        className="intro-hello"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.5 }}
      >
        Hello, I&apos;m <span className="serif-name">Nova</span>
      </motion.h1>

      <motion.div
        className="intro-tagline"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.65 }}
      >
        Graphic &amp; UI Designer
      </motion.div>

      {/* Wave divider */}
      <motion.div
        className="intro-wave"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.75 }}
      >
        <svg
          viewBox="0 0 200 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
        className="intro-desc"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.85 }}
      >
        This portfolio is a curated journey through{" "}
        <strong>
          visual identities, immersive interfaces, and bold design systems
        </strong>{" "}
        I&apos;ve brought to life. Each project here is a story — of
        collaboration, experimentation, and the relentless pursuit of design
        that doesn&apos;t just look beautiful, but <strong>feels alive</strong>.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="intro-btns"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1 }}
      >
        <a
          href="#work"
          className="intro-btn btn-primary"
          onClick={(e) => handleNav(e, "#work")}
        >
          View Work ↓
        </a>
        <a
          href="#about"
          className="intro-btn btn-ghost"
          onClick={(e) => handleNav(e, "#about")}
        >
          About Me
        </a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="intro-scroll-hint"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.3 }}
      >
        <div className="scroll-ln" />
        Explore
      </motion.div>
    </section>
  );
}
