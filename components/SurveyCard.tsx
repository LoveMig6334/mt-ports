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
  return (
    <div className="star-rating">
      {[5, 4, 3, 2, 1].map((v) => (
        <label key={v}>
          <input
            type="radio"
            name={name}
            value={v}
            onChange={() => onRate(v)}
          />
          ★
        </label>
      ))}
    </div>
  );
}

export default function SurveyCard() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [avg, setAvg] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleRate = useCallback((cat: string, val: number) => {
    setRatings((prev) => ({ ...prev, [cat]: val }));
  }, []);

  const handleSubmit = () => {
    const vals = Object.values(ratings);
    if (vals.length === 0) return;
    const average = +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
    setAvg(average);
    setSubmitted(true);
  };

  return (
    <div className="survey-card">
      <h3 className="font-display font-bold text-[1.4rem] mb-1 text-center">
        Rate This Portfolio
      </h3>
      <p className="survey-sub text-[0.68rem] text-fg/40 text-center mb-8 tracking-[0.05em]">
        Your feedback helps me grow — takes 30 seconds
      </p>

      {categories.map((cat) => (
        <div key={cat} className="survey-row">
          <span className="sr-label">{cat}</span>
          <StarRating name={cat} onRate={(v) => handleRate(cat, v)} />
        </div>
      ))}

      <textarea
        className="survey-textarea"
        placeholder="Any additional thoughts? (optional)"
      />

      <motion.button
        ref={btnRef}
        className={`survey-btn ${submitted ? "done" : ""}`}
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
        <div className="survey-result show">
          ✦ Thank you! Your average score: <strong>{avg}</strong>/5
        </div>
      )}
    </div>
  );
}
