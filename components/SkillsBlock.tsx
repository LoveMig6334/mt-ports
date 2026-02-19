"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ease } from "@/lib/animations";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

/* ─── Data ─── */
const abilities = [
  {
    name: "UI/UX Design",
    pct: 95,
    gradient: "linear-gradient(90deg, #e8ff47, #c6e840)",
  },
  {
    name: "Brand Identity",
    pct: 92,
    gradient: "linear-gradient(90deg, #ff6b4a, #ff966b)",
  },
  {
    name: "Typography",
    pct: 88,
    gradient: "linear-gradient(90deg, #b48aff, #d3b3ff)",
  },
  {
    name: "Motion Design",
    pct: 78,
    gradient: "linear-gradient(90deg, #47f0ff, #80f5ff)",
  },
  {
    name: "Illustration",
    pct: 82,
    gradient: "linear-gradient(90deg, #e8ff47, #ff6b4a)",
  },
  {
    name: "Art Direction",
    pct: 90,
    gradient: "linear-gradient(90deg, #47f0ff, #b48aff)",
  },
];

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

const radarLabels = [
  "UI/UX",
  "Branding",
  "Typography",
  "Motion",
  "Illustration",
  "Art Direction",
];
const radarVals = [0.95, 0.92, 0.88, 0.78, 0.82, 0.9];
const radarColors = [
  "#e8ff47",
  "#ff6b4a",
  "#b48aff",
  "#47f0ff",
  "#ff6b4a",
  "#e8ff47",
];

/* ─── Radar Chart ─── */
function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const S = 380;
    c.width = S * dpr;
    c.height = S * dpr;
    c.style.width = S + "px";
    c.style.height = S + "px";
    ctx.scale(dpr, dpr);
    const cx = S / 2,
      cy = S / 2,
      R = 140;
    const N = radarLabels.length,
      step = (Math.PI * 2) / N,
      start = -Math.PI / 2;

    /* Grid rings */
    for (let ring = 1; ring <= 4; ring++) {
      const rr = (R / 4) * ring;
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const a = start + step * i;
        const x = cx + Math.cos(a) * rr,
          y = cy + Math.sin(a) * rr;
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
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.strokeStyle = "rgba(240,236,228,0.06)";
      ctx.stroke();
    }

    /* Data polygon */
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const idx = i % N;
      const a = start + step * idx;
      const r = R * radarVals[idx];
      const x = cx + Math.cos(a) * r,
        y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.fillStyle = "rgba(232,255,71,0.08)";
    ctx.fill();
    ctx.strokeStyle = "#e8ff47";
    ctx.lineWidth = 2;
    ctx.stroke();

    /* Data points */
    for (let i = 0; i < N; i++) {
      const a = start + step * i;
      const r = R * radarVals[i];
      const x = cx + Math.cos(a) * r,
        y = cy + Math.sin(a) * r;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = radarColors[i];
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a0a";
      ctx.fill();
    }

    /* Labels */
    ctx.font = "11px 'Space Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < N; i++) {
      const a = start + step * i;
      const lr = R + 28;
      const x = cx + Math.cos(a) * lr,
        y = cy + Math.sin(a) * lr;
      ctx.fillStyle = "rgba(240,236,228,0.45)";
      ctx.fillText(radarLabels[i], x, y);
    }
  }, []);

  useEffect(() => {
    draw();
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
      <div className="grid grid-cols-2 gap-16 items-center max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <RadarChart />
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
