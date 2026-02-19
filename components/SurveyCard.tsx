"use client";

import { ease } from "@/lib/animations";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

const categories = [
  "Performance",
  "Creativity",
  "Visual Design",
  "Usability",
  "Content Quality",
  "Overall",
];

/* ─── Star Rating ────────────────────────────────────────────── */
function StarRating({
  name,
  onRate,
  disabled,
}: {
  name: string;
  onRate: (v: number) => void;
  disabled?: boolean;
}) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={`${name}-${v}`}
          type="button"
          disabled={disabled}
          className="text-2xl cursor-pointer bg-transparent border-none p-0 transition-all duration-200 hover:scale-115 disabled:cursor-not-allowed"
          style={{
            color:
              v <= (hoveredStar || selectedStar)
                ? "#e8ff47"
                : "rgba(240,236,228,0.12)",
          }}
          onMouseEnter={() => !disabled && setHoveredStar(v)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={() => {
            if (disabled) return;
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

/* ─── Shared card wrapper styles ─────────────────────────────── */
const cardStyle = {
  background: "rgba(18,18,26,0.7)",
  border: "1px solid rgba(240,236,228,0.08)",
};

/* ─── SurveyCard ─────────────────────────────────────────────── */
export default function SurveyCard() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allRated = categories.every((cat) => ratings[cat] !== undefined);

  const handleRate = useCallback((cat: string, val: number) => {
    setRatings((prev) => ({ ...prev, [cat]: val }));
  }, []);

  const handleSubmit = () => {
    if (!allRated) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-150 mx-auto mt-20 max-[900px]:mt-12">
      <AnimatePresence mode="wait">
        {/* ── Survey form ── */}
        {!submitted && (
          <motion.div
            key="survey"
            className="rounded-[20px] p-12 text-left relative overflow-hidden max-[900px]:p-8"
            style={cardStyle}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease } }}
          >
            {/* Rainbow bar */}
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

            {categories.map((cat, i) => {
              const isRated = ratings[cat] !== undefined;
              return (
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
                  <div className="flex items-center gap-2">
                    <span className="text-[0.74rem] uppercase tracking-[0.08em] text-fg/70">
                      {cat}
                    </span>
                    {!isRated && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "#ff6b4a" }}
                        title="Required"
                      />
                    )}
                  </div>
                  <StarRating name={cat} onRate={(v) => handleRate(cat, v)} />
                </div>
              );
            })}

            <textarea
              className="w-full mt-6 rounded-[10px] text-fg font-body text-[0.75rem] leading-relaxed resize-y min-h-20 outline-none transition-[border-color] duration-300 placeholder:text-fg/22 focus:border-accent"
              style={{
                padding: "1rem 1.2rem",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(240,236,228,0.1)",
              }}
              placeholder="Any additional thoughts? (optional)"
            />

            {/* Validation hint */}
            {!allRated && (
              <p
                className="mt-3 text-[0.68rem] text-center"
                style={{ color: "#ff6b4a" }}
              >
                Please rate all categories before submitting.
              </p>
            )}

            <motion.button
              className={`mt-4 w-full p-4 border-none rounded-full font-body text-[0.72rem] font-bold uppercase tracking-[0.15em] transition-opacity duration-300 ${
                allRated ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
              style={{ background: "#e8ff47", color: "#0a0a0a" }}
              onClick={handleSubmit}
              disabled={!allRated}
              whileHover={
                allRated
                  ? {
                      backgroundColor: "#f0ece4",
                      y: -2,
                      boxShadow: "0 10px 30px rgba(232,255,71,0.15)",
                      transition: { duration: 0.4, ease },
                    }
                  : undefined
              }
            >
              Submit Feedback
            </motion.button>
          </motion.div>
        )}

        {/* ── Thank-you card (replaces the form in-place) ── */}
        {submitted && (
          <motion.div
            key="thankyou"
            className="rounded-[20px] p-12 text-center relative overflow-hidden max-[900px]:p-8"
            style={cardStyle}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.4, ease },
            }}
          >
            {/* Rainbow bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.75"
              style={{
                background:
                  "linear-gradient(90deg, #e8ff47, #ff6b4a, #b48aff, #47f0ff)",
              }}
            />

            {/* Animated checkmark */}
            <motion.div
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "rgba(46,204,113,0.12)",
                border: "1px solid rgba(46,204,113,0.3)",
              }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                },
              }}
            >
              <span style={{ fontSize: "2.2rem", color: "#2ecc71" }}>✓</span>
            </motion.div>

            <h3 className="font-display font-bold text-[1.5rem] mb-2">
              Thank you for your feedback!
            </h3>
            <p className="text-[0.78rem] text-fg/50 leading-relaxed">
              Your thoughts mean a lot and help me keep improving.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
