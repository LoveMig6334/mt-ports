"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ease } from "@/lib/animations";
import { abilities, radarColors, radarLabels, radarVals } from "@/lib/skills";
import { motion } from "framer-motion";
import { memo } from "react";

const specialSkills = [
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <polygon
          points="18,3 32,11 32,25 18,33 4,25 4,11"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="rgba(232,255,71,0.06)"
        />
        <line
          x1="18"
          y1="13"
          x2="18"
          y2="23"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line
          x1="13"
          y1="18"
          x2="23"
          y2="18"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Python",
    sub: "Programming",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <rect
          x="4"
          y="4"
          width="28"
          height="28"
          rx="3"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="rgba(232,255,71,0.06)"
        />
        <line
          x1="10"
          y1="15"
          x2="26"
          y2="15"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="15"
          x2="16"
          y2="26"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "TypeScript",
    sub: "Programming",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M5 30L18 6L31 30Z"
          stroke="var(--coral)"
          strokeWidth="1.2"
          fill="rgba(255,107,74,0.06)"
        />
        <line
          x1="13"
          y1="24"
          x2="23"
          y2="24"
          stroke="var(--coral)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Next.js",
    sub: "React Framework",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <rect
          x="5"
          y="5"
          width="26"
          height="26"
          rx="4"
          stroke="var(--violet)"
          strokeWidth="1.2"
          fill="rgba(180,138,255,0.06)"
        />
        <rect
          x="9"
          y="9"
          width="8"
          height="8"
          rx="2"
          stroke="var(--violet)"
          strokeWidth="1"
          fill="rgba(180,138,255,0.1)"
        />
        <rect
          x="9"
          y="21"
          width="8"
          height="6"
          rx="2"
          stroke="var(--violet)"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="23"
          cy="13"
          r="5"
          stroke="var(--violet)"
          strokeWidth="1"
          fill="rgba(180,138,255,0.1)"
        />
      </svg>
    ),
    title: "Figma",
    sub: "UI/UX Tool",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M10 6L4 18L10 30"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="20"
          y1="14"
          x2="20"
          y2="22"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="18"
          x2="24"
          y2="18"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="14"
          x2="28"
          y2="22"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="18"
          x2="32"
          y2="18"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "C++",
    sub: "Programming",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M22 6C14 6 8 12 8 20C8 28 14 32 22 32C18 32 14 28 14 20C14 12 18 8 22 6Z"
          stroke="var(--violet)"
          strokeWidth="1.2"
          fill="rgba(180,138,255,0.06)"
        />
        <circle cx="24" cy="12" r="2" fill="var(--violet)" opacity="0.5" />
        <circle cx="26" cy="17" r="1.5" fill="var(--violet)" opacity="0.3" />
      </svg>
    ),
    title: "Lua",
    sub: "Scripting",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <rect
          x="4"
          y="4"
          width="28"
          height="20"
          rx="3"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="rgba(232,255,71,0.06)"
        />
        <rect
          x="4"
          y="28"
          width="28"
          height="4"
          rx="1"
          stroke="var(--accent)"
          strokeWidth="1"
          fill="rgba(232,255,71,0.04)"
        />
        <line
          x1="18"
          y1="24"
          x2="18"
          y2="28"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <circle
          cx="18"
          cy="14"
          r="4"
          stroke="var(--accent)"
          strokeWidth="1"
          fill="rgba(232,255,71,0.08)"
        />
      </svg>
    ),
    title: "UI/UX Design",
    sub: "User Experience",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <line
          x1="6"
          y1="8"
          x2="30"
          y2="8"
          stroke="var(--coral)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="8"
          x2="18"
          y2="28"
          stroke="var(--coral)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="28"
          x2="26"
          y2="28"
          stroke="var(--coral)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
    title: "Typography",
    sub: "Visual Comm.",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M6 18C6 10 12 6 18 6"
          stroke="var(--violet)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 26C12 32 22 34 28 28"
          stroke="var(--violet)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="18"
          cy="18"
          r="5"
          stroke="var(--violet)"
          strokeWidth="1.2"
          fill="rgba(180,138,255,0.08)"
        />
        <path
          d="M21 13L25 9L21 12"
          stroke="var(--violet)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Motion Design",
    sub: "Animation",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M13 8L6 18L13 28"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M23 8L30 18L23 28"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="15"
          y1="18"
          x2="21"
          y2="18"
          stroke="var(--cyan)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
    title: "Coding",
    sub: "Development",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <rect
          x="14"
          y="4"
          width="8"
          height="8"
          rx="2"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="rgba(232,255,71,0.08)"
        />
        <rect
          x="4"
          y="24"
          width="8"
          height="8"
          rx="2"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="rgba(232,255,71,0.06)"
        />
        <rect
          x="24"
          y="24"
          width="8"
          height="8"
          rx="2"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="rgba(232,255,71,0.06)"
        />
        <line
          x1="18"
          y1="12"
          x2="8"
          y2="24"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="12"
          x2="28"
          y2="24"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Systems Design",
    sub: "Architecture",
  },
  {
    icon: (
      <svg viewBox="0 0 36 36" fill="none">
        <rect
          x="5"
          y="20"
          width="6"
          height="12"
          rx="1"
          stroke="var(--coral)"
          strokeWidth="1.2"
          fill="rgba(255,107,74,0.1)"
        />
        <rect
          x="14"
          y="14"
          width="6"
          height="18"
          rx="1"
          stroke="var(--coral)"
          strokeWidth="1.2"
          fill="rgba(255,107,74,0.08)"
        />
        <rect
          x="23"
          y="8"
          width="6"
          height="24"
          rx="1"
          stroke="var(--coral)"
          strokeWidth="1.2"
          fill="rgba(255,107,74,0.06)"
        />
        <line
          x1="3"
          y1="32"
          x2="32"
          y2="32"
          stroke="var(--coral)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    ),
    title: "Data Analytics",
    sub: "Analysis",
  },
];

/* ─── Radar Chart — hoisted constants & geometry ─── */
const S = 400;
const mx = S / 2;
const my = S / 2;
const R = 130;
const N = radarLabels.length;
const step = (Math.PI * 2) / N;
const start = -Math.PI / 2;
const rings = [1, 2, 3, 4];
const easeCurve: [number, number, number, number] = [0.23, 1, 0.32, 1];
const duration = 1.2;

const hexRgba = (hex: string, a: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};

const hexPts = radarLabels.map((_, i) => {
  const a = start + step * i;
  return { x: Math.cos(a), y: Math.sin(a) };
});

const pts = hexPts.map((p, i) => ({
  x: mx + p.x * R * radarVals[i],
  y: my + p.y * R * radarVals[i],
}));

const centerPath =
  hexPts.map((_, i) => `${i === 0 ? "M" : "L"} ${mx} ${my}`).join(" ") + " Z";

const dataPath =
  pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

const ringPaths = rings.map((ring) => {
  const rr = (R / 4) * ring;
  return (
    hexPts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${mx + p.x * rr} ${my + p.y * rr}`)
      .join(" ") + " Z"
  );
});

const labelPositions = radarLabels.map((_, i) => {
  const a = start + step * i;
  const lr = R + 34;
  return { x: mx + Math.cos(a) * lr, y: my + Math.sin(a) * lr };
});

/* ─── Radar Chart Component ─── */
const RadarChart = memo(function RadarChart({ animate }: { animate: boolean }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${S} ${S}`}
        style={{ maxWidth: S, maxHeight: S }}
        className="overflow-visible"
      >
        {/* Grid rings */}
        {rings.map((ring, idx) => (
          <motion.path
            key={`ring-${ring}`}
            initial={{ d: centerPath }}
            animate={animate ? { d: ringPaths[idx] } : { d: centerPath }}
            transition={{ duration, ease: easeCurve }}
            fill="none"
            stroke={
              ring === 4 ? "rgba(240,236,228,0.08)" : "rgba(240,236,228,0.04)"
            }
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        {hexPts.map((p, i) => (
          <motion.line
            key={`axis-${i}`}
            x1={mx}
            y1={my}
            x2={mx}
            y2={my}
            animate={
              animate
                ? { x2: mx + p.x * R, y2: my + p.y * R }
                : { x2: mx, y2: my }
            }
            transition={{ duration, ease: easeCurve }}
            stroke="rgba(240,236,228,0.06)"
            strokeWidth={1}
          />
        ))}

        {/* Data polygon */}
        <motion.path
          initial={{
            d: centerPath,
            fill: "rgba(232,255,71,0)",
            stroke: "rgba(232,255,71,0)",
          }}
          animate={
            animate
              ? {
                  d: dataPath,
                  fill: "rgba(232,255,71,0.08)",
                  stroke: "rgba(232,255,71,1)",
                }
              : {
                  d: centerPath,
                  fill: "rgba(232,255,71,0)",
                  stroke: "rgba(232,255,71,0)",
                }
          }
          transition={{ duration, ease: easeCurve }}
          strokeWidth={2}
        />

        {/* Data points */}
        {pts.map((p, i) => (
          <motion.g
            key={`pt-${i}`}
            initial={{ x: mx, y: my, opacity: 0 }}
            animate={
              animate
                ? { x: p.x, y: p.y, opacity: 1 }
                : { x: mx, y: my, opacity: 0 }
            }
            transition={{ duration, ease: easeCurve }}
          >
            {/* Soft glow halo */}
            <motion.circle
              r={0}
              animate={animate ? { r: 9 } : { r: 0 }}
              transition={{ duration, ease: easeCurve }}
              fill={hexRgba(radarColors[i], 0.15)}
            />
            {/* Outer ring */}
            <motion.circle
              r={0}
              animate={animate ? { r: 5 } : { r: 0 }}
              transition={{ duration, ease: easeCurve }}
              fill={hexRgba(radarColors[i], 0.9)}
            />
            {/* Inner dot */}
            <motion.circle
              r={0}
              animate={animate ? { r: 2 } : { r: 0 }}
              transition={{ duration, ease: easeCurve }}
              fill="#0a0a0a"
            />
          </motion.g>
        ))}

        {/* Labels — topic name + percentage */}
        {radarLabels.map((lbl, i) => (
          <motion.g
            key={`lbl-${i}`}
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration, ease: easeCurve, delay: 0.2 }}
          >
            {/* Topic name */}
            <text
              x={labelPositions[i].x}
              y={labelPositions[i].y - 7}
              textAnchor="middle"
              dominantBaseline="central"
              fill={hexRgba(radarColors[i], 0.85)}
              fontSize="11"
              fontFamily="'CMU-Regular', sans-serif"
            >
              {lbl}
            </text>

            {/* Percentage */}
            <text
              x={labelPositions[i].x}
              y={labelPositions[i].y + 8}
              textAnchor="middle"
              dominantBaseline="central"
              fill={hexRgba(radarColors[i], 0.55)}
              fontSize="13"
              fontWeight="bold"
              fontFamily="'Syne', sans-serif"
            >
              {Math.round(radarVals[i] * 100)}%
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
});

/* ─── Main Component ─── */
export default function SkillsBlock() {
  const { ref, isInView } = useScrollReveal();

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
        <div>
          <h3 className="font-display font-bold text-2xl mb-1">
            Core Abilities
          </h3>
          <div className="text-[0.68rem] uppercase tracking-[0.18em] text-accent mb-8">
            Proficiency Breakdown
          </div>
          {abilities.map((ab) => (
            <div key={ab.name} className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <span
                  className="text-[0.72rem] uppercase tracking-[0.08em] text-fg/75"
                  style={{ fontFamily: "'CMU-Regular'" }}
                >
                  {ab.name}
                </span>
                <span className="font-display font-bold text-[0.85rem] text-accent">
                  {ab.pct}%
                </span>
              </div>
              <div className="w-full h-1.25 rounded-sm overflow-hidden bg-fg/8">
                <div
                  className="h-full rounded-sm"
                  style={{
                    width: isInView ? `${ab.pct}%` : 0,
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
