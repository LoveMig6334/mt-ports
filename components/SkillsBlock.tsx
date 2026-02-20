"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ease } from "@/lib/animations";
import { abilities, radarColors, radarLabels, radarVals } from "@/lib/skills";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

const specialSkills = [
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M18 2L22 14L34 15L25 23L27 35L18 29L9 35L11 23L2 15L14 14Z"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="rgba(232,255,71,0.06)"
        />
      </svg>
    ),
    title: "Design Systems",
    sub: "Scalable Design",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <rect
          x="4"
          y="4"
          width="28"
          height="28"
          rx="4"
          stroke="var(--coral)"
          strokeWidth="1.2"
          fill="rgba(255,107,74,0.06)"
        />
        <path
          d="M12 18L16 22L24 14"
          stroke="var(--coral)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Prototyping",
    sub: "Figma & Framer",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M13 13L23 23M23 13L13 23"
          stroke="var(--violet)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect
          x="4"
          y="4"
          width="28"
          height="28"
          rx="6"
          stroke="var(--violet)"
          strokeWidth="1.2"
          fill="rgba(180,138,255,0.06)"
        />
      </svg>
    ),
    title: "Creative Code",
    sub: "CSS & JS Art",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M5 30L18 6L31 30Z"
          stroke="var(--cyan)"
          strokeWidth="1.2"
          fill="rgba(71,240,255,0.06)"
        />
        <circle cx="18" cy="22" r="3" fill="var(--cyan)" opacity="0.4" />
      </svg>
    ),
    title: "3D Design",
    sub: "Blender & Spline",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <circle
          cx="18"
          cy="18"
          r="14"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="rgba(232,255,71,0.06)"
        />
        <circle cx="18" cy="14" r="5" fill="var(--accent)" opacity="0.2" />
        <circle cx="14" cy="21" r="4" fill="var(--coral)" opacity="0.2" />
        <circle cx="22" cy="21" r="4" fill="var(--cyan)" opacity="0.2" />
      </svg>
    ),
    title: "Color Theory",
    sub: "Advanced Palette",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <circle
          cx="18"
          cy="18"
          r="14"
          stroke="var(--coral)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="3 2.5"
        />
        <circle
          cx="18"
          cy="18"
          r="6"
          fill="rgba(255,107,74,0.12)"
          stroke="var(--coral)"
          strokeWidth="0.8"
        />
        <circle cx="18" cy="18" r="2" fill="var(--coral)" />
      </svg>
    ),
    title: "UX Research",
    sub: "Data-Driven UX",
  },
];

/* ─── Radar Chart ─── */
function RadarChart({ animate }: { animate: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const hasAnimated = useRef(false);
  const rafRef = useRef<number>(0);

  const draw = useCallback((progress: number) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const S = 400;
    c.width = S * dpr;
    c.height = S * dpr;
    c.style.width = S + "px";
    c.style.height = S + "px";
    ctx.scale(dpr, dpr);
    const mx = S / 2,
      my = S / 2,
      R = 130;
    const N = radarLabels.length,
      step = (Math.PI * 2) / N,
      start = -Math.PI / 2;

    const t = progress;

    const hexRgba = (hex: string, a: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    /* Pre-calculate data points */
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < N; i++) {
      const a = start + step * i;
      const r = R * radarVals[i] * t;
      pts.push({ x: mx + Math.cos(a) * r, y: my + Math.sin(a) * r });
    }

    /* Grid rings */
    for (let ring = 1; ring <= 4; ring++) {
      const rr = (R / 4) * ring * t;
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const a = start + step * i;
        const x = mx + Math.cos(a) * rr,
          y = my + Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle =
        ring === 4 ? "rgba(240,236,228,0.08)" : "rgba(240,236,228,0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    /* Axes */
    for (let i = 0; i < N; i++) {
      const a = start + step * i;
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(mx + Math.cos(a) * R * t, my + Math.sin(a) * R * t);
      ctx.strokeStyle = "rgba(240,236,228,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    /* Data polygon */
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const idx = i % N;
      const { x, y } = pts[idx];
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.fillStyle = `rgba(232,255,71,${0.08 * t})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(232,255,71,${t})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    /* Data points with glow */
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    for (let i = 0; i < N; i++) {
      /* Soft glow halo */
      ctx.beginPath();
      ctx.arc(pts[i].x, pts[i].y, 9 * t, 0, Math.PI * 2);
      ctx.fillStyle = hexRgba(radarColors[i], 0.15 * t);
      ctx.fill();
      /* Outer ring */
      ctx.beginPath();
      ctx.arc(pts[i].x, pts[i].y, 5 * t, 0, Math.PI * 2);
      ctx.fillStyle = hexRgba(radarColors[i], 0.9 * t);
      ctx.fill();
      /* Inner dot */
      ctx.beginPath();
      ctx.arc(pts[i].x, pts[i].y, 2 * t, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a0a";
      ctx.globalAlpha = t;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;

    /* Labels — topic name + percentage */
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < N; i++) {
      const a = start + step * i;
      const lr = R + 34;
      const x = mx + Math.cos(a) * lr,
        y = my + Math.sin(a) * lr;

      /* Topic name */
      ctx.font = "11px 'Space Mono', monospace";
      ctx.fillStyle = hexRgba(radarColors[i], 0.85 * t);
      ctx.fillText(radarLabels[i], x, y - 7);

      /* Percentage */
      ctx.font = "bold 13px 'Syne', sans-serif";
      ctx.fillStyle = hexRgba(radarColors[i], 0.55 * t);
      ctx.fillText(Math.round(radarVals[i] * 100) + "%", x, y + 8);
    }
  }, []);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1200;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const raw = Math.min(elapsed / duration, 1);
      /* cubic-bezier ease-out */
      const t = 1 - Math.pow(1 - raw, 3);
      progressRef.current = t;
      draw(t);
      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, draw]);

  /* Draw initial empty state */
  useEffect(() => {
    if (!hasAnimated.current) draw(0);
  }, [draw]);

  return (
    <div className="flex items-center justify-center">
      <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
    </div>
  );
}

/* ─── Main Component ─── */
export default function SkillsBlock() {
  const { ref, isInView } = useScrollReveal();
  const barsRevealed = useRef(false);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && !barsRevealed.current) {
      barsRevealed.current = true;
      barsRef.current
        ?.querySelectorAll<HTMLDivElement>("[data-w]")
        .forEach((el) => {
          const w = el.dataset.w;
          if (w) el.style.width = w + "%";
        });
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="py-16 px-12 border-t border-fg/6 max-[900px]:py-12 max-[900px]:px-6"
    >
      {/* Header */}
      <div className="mb-12">
        <h2
          className="text-[2.5rem] font-display font-bold leading-tight max-[600px]:text-[1.8rem]"
          style={{ color: "#f0ece4" }}
        >
          Skills &{" "}
          <span
            className="font-serif italic font-normal"
            style={{ color: "#e8ff47" }}
          >
            Abilities
          </span>
        </h2>
        <p
          className="text-sm font-body mt-2"
          style={{ color: "rgba(240,236,228,0.5)" }}
        >
          Professional expertise and proficiencies
        </p>
      </div>

      <div className="grid grid-cols-2 gap-16 items-center max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <RadarChart animate={isInView} />
        <div ref={barsRef}>
          <h3 className="font-display font-bold text-2xl mb-1">
            Core Abilities
          </h3>
          <div className="text-[0.68rem] uppercase tracking-[0.18em] text-accent mb-8">
            Proficiency Breakdown
          </div>
          {abilities.map((ab) => (
            <div key={ab.name} className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[0.72rem] uppercase tracking-[0.08em] text-fg/75">
                  {ab.name}
                </span>
                <span className="font-display font-bold text-[0.85rem] text-accent">
                  {ab.pct}%
                </span>
              </div>
              <div className="w-full h-1.25 rounded-sm overflow-hidden bg-fg/8">
                <div
                  className="h-full rounded-sm"
                  data-w={ab.pct}
                  style={{
                    width: 0,
                    background: ab.gradient,
                    transition: "width 1.5s cubic-bezier(0.23,1,0.32,1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Special Skills ─── */}
      <div className="specials mt-12 pt-8 border-t border-fg/6">
        <h4 className="font-display font-bold text-xl mb-1">Special Skills</h4>
        <div className="sub-label text-[0.68rem] uppercase tracking-[0.18em] text-accent mb-6">
          Unique Expertise &amp; Tools
        </div>
        <div className="specials-row flex gap-4 flex-wrap">
          {specialSkills.map((sk) => (
            <motion.div
              key={sk.title}
              className="sp-card flex-1 min-w-30 max-w-40 p-5 text-center rounded-[14px] cursor-default max-[900px]:min-w-25 max-[600px]:min-w-22.5"
              style={{
                background: "rgba(240,236,228,0.025)",
                border: "1px solid rgba(240,236,228,0.07)",
              }}
              whileHover={{
                borderColor: "#e8ff47",
                background: "rgba(232,255,71,0.04)",
                y: -4,
                transition: { duration: 0.4, ease },
              }}
            >
              <div className="w-9 h-9 mx-auto mb-3">{sk.icon}</div>
              <h5 className="font-display font-semibold text-[0.72rem] mb-0.5">
                {sk.title}
              </h5>
              <p className="text-[0.58rem] text-fg/35 uppercase tracking-[0.08em] leading-snug">
                {sk.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
