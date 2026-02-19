"use client";

import { ease } from "@/lib/animations";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

const categories = [
  "Performance",
  "Creativity",
  "Visual Design",
  "Usability",
  "Content Quality",
  "Overall",
];

function StarRating({
  name,
  onRate,
}: {
  name: string;
  onRate: (v: number) => void;
}) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={`${name}-${v}`}
          type="button"
          className="text-2xl cursor-pointer bg-transparent border-none p-0 transition-all duration-200 hover:scale-115"
          style={{
            color:
              v <= (hoveredStar || selectedStar)
                ? "#e8ff47"
                : "rgba(240,236,228,0.12)",
          }}
          onMouseEnter={() => setHoveredStar(v)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={() => {
            setSelectedStar(v);
            onRate(v);
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function SurveyCard() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const vals = Object.values(ratings);
  const avg =
    submitted && vals.length > 0
      ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
      : 0;

  const handleRate = useCallback((cat: string, val: number) => {
    setRatings((prev) => ({ ...prev, [cat]: val }));
  }, []);

  const handleSubmit = () => {
    if (vals.length === 0) return;
    setSubmitted(true);
  };

  return (
    <div
      className="max-w-150 mx-auto mt-20 rounded-[20px] p-12 text-left relative overflow-hidden max-[900px]:mt-12 max-[900px]:p-8"
      style={{
        background: "rgba(18,18,26,0.7)",
        border: "1px solid rgba(240,236,228,0.08)",
      }}
    >
      {/* Rainbow bar (replaces ::before) */}
      <div
        className="absolute top-0 left-0 right-0 h-0.75"
        style={{
          background:
            "linear-gradient(90deg, #e8ff47, #ff6b4a, #b48aff, #47f0ff)",
        }}
      />

      <h3 className="font-display font-bold text-[1.4rem] mb-1 text-center">
        Rate This Portfolio
      </h3>
      <p className="text-[0.68rem] text-fg/40 text-center mb-8 tracking-[0.05em]">
        Your feedback helps me grow — takes 30 seconds
      </p>

      {categories.map((cat, i) => (
        <div
          key={cat}
          className="flex justify-between items-center py-4"
          style={{
            borderBottom:
              i < categories.length - 1
                ? "1px solid rgba(240,236,228,0.05)"
                : "none",
          }}
        >
          <span className="text-[0.74rem] uppercase tracking-[0.08em] text-fg/70">
            {cat}
          </span>
          <StarRating name={cat} onRate={(v) => handleRate(cat, v)} />
        </div>
      ))}

      <textarea
        className="w-full mt-6 rounded-[10px] text-fg font-body text-[0.75rem] leading-relaxed resize-y min-h-20 outline-none transition-[border-color] duration-300 placeholder:text-fg/22 focus:border-accent"
        style={{
          padding: "1rem 1.2rem",
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(240,236,228,0.1)",
        }}
        placeholder="Any additional thoughts? (optional)"
      />

      <motion.button
        ref={btnRef}
        className={`mt-6 w-full p-4 border-none rounded-full font-body text-[0.72rem] font-bold uppercase tracking-[0.15em] cursor-pointer ${
          submitted ? "pointer-events-none" : ""
        }`}
        style={{
          background: submitted ? "#2ecc71" : "#e8ff47",
          color: "#0a0a0a",
        }}
        onClick={handleSubmit}
        disabled={submitted}
        whileHover={
          !submitted
            ? {
                backgroundColor: "#f0ece4",
                y: -2,
                boxShadow: "0 10px 30px rgba(232,255,71,0.15)",
                transition: { duration: 0.4, ease },
              }
            : undefined
        }
      >
        {submitted ? "✓ Submitted!" : "Submit Feedback"}
      </motion.button>

      {submitted && (
        <div
          className="mt-6 p-5 rounded-[10px] text-center text-[0.78rem]"
          style={{
            background: "rgba(46,204,113,0.08)",
            border: "1px solid rgba(46,204,113,0.2)",
            color: "#2ecc71",
          }}
        >
          ✦ Thank you! Your average score: <strong>{avg}</strong>/5
        </div>
      )}
    </div>
  );
}
