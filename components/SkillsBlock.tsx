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
      .map(
        (p, i) =>
          `${i === 0 ? "M" : "L"} ${mx + p.x * rr} ${my + p.y * rr}`,
      )
      .join(" ") + " Z"
  );
});

const labelPositions = radarLabels.map((_, i) => {
  const a = start + step * i;
  const lr = R + 34;
  return { x: mx + Math.cos(a) * lr, y: my + Math.sin(a) * lr };
});

/* ─── Radar Chart Component ─── */
const RadarChart = memo(function RadarChart({
  animate,
}: {
  animate: boolean;
}) {
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
              fontFamily="'Space Mono', monospace"
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
