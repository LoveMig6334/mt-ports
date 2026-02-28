"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ease, fadeUpVariants } from "@/lib/animations";
import { skillToSlug } from "@/lib/categoryWorks";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const skills = [
  "Brand Identity",
  "UI/UX Design",
  "Typography",
  "Art Direction",
  "Motion Design",
  "Editorial",
  "Illustration",
  "Packaging",
];

function Portrait() {
  const { ref, isInView } = useScrollReveal();
  const [hasError, setHasError] = useState(false);
  const handleError = useCallback(() => setHasError(true), []);
  const [showThai, setShowThai] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setShowThai((prev) => !prev), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div
        className="w-full rounded-[14px] relative overflow-hidden"
        style={{ aspectRatio: "3/4" }}
      >
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#151515]">
            <svg
              width="56"
              height="56"
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
            <span className="text-xs uppercase tracking-widest font-body text-(--coral)">
              Image unavailable
            </span>
          </div>
        ) : (
          <NextImage
            src="/profile.jpg"
            alt="Thatt — Designer & Creative"
            fill
            className="object-cover object-top"
            sizes="(max-width: 900px) 100vw, 50vw"
            onError={handleError}
          />
        )}

        {/* Bottom scrim so the label stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.15) 45%, transparent 100%)",
          }}
        />

        {/* THATT label */}
        <div
          className="absolute bottom-8 left-8 font-display font-extrabold"
          style={{
            fontSize: "4rem",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          <div className="grid" style={{ overflow: "hidden" }}>
            {/* Invisible placeholders to prevent width collapse and maintain consistent dimensions */}
            <span className="invisible whitespace-nowrap col-start-1 row-start-1">
              THATT
            </span>
            <span
              className="invisible whitespace-nowrap col-start-1 row-start-1"
              style={{ fontFamily: "'CMU-Bold'", letterSpacing: "0" }}
            >
              ธรรศ บุนนาค
            </span>

            <AnimatePresence mode="sync" initial={false}>
              {showThai ? (
                <motion.span
                  key="thai"
                  className="col-start-1 row-start-1 whitespace-nowrap"
                  style={{ fontFamily: "'CMU-Bold'", letterSpacing: "0" }}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  ธรรศ บุนนาค
                </motion.span>
              ) : (
                <motion.span
                  key="en"
                  className="col-start-1 row-start-1 whitespace-nowrap"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  THATT
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <span className="block mt-2 text-accent font-serif italic font-normal text-[1.2rem] tracking-[0.05em]">
            Designer &amp; Creative
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Bio() {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="pt-8"
    >
      <p
        className="mb-8 font-serif italic text-fg"
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
        }}
      >
        I&apos;m a multidisciplinary designer who believes that{" "}
        <span className="text-coral">great design is felt</span> before
        it&apos;s understood.
      </p>
      <p className="mb-12 text-[0.82rem] leading-[1.85] font-body text-fg/50">
        With 8 years of crafting visual identities, digital products, and
        editorial design, I bring a perspective shaped by art, culture, and
        technology. Every project begins with a deep understanding of the
        problem and ends with a solution that moves people — visually and
        emotionally. I&apos;ve had the privilege of working with
        forward-thinking brands, ambitious startups, and cultural institutions
        across the globe.
      </p>

      <div className="grid grid-cols-2 gap-5 max-[600px]:grid-cols-1">
        {skills.map((skill) => (
          <Link
            key={skill}
            href={`/work/${skillToSlug[skill]}`}
            className="no-underline"
          >
            <motion.div
              className="skill-pill py-4 px-5 rounded-[10px] text-center text-[0.7rem] uppercase tracking-widest font-body"
              style={{ border: "1px solid rgba(240,236,228,0.1)" }}
              whileHover={{
                borderColor: "#e8ff47",
                backgroundColor: "#e8ff47",
                color: "#0a0a0a",
                transition: { duration: 0.4, ease },
              }}
            >
              {skill}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="px-12 pb-24 max-[900px]:px-6">
        <div className="grid grid-cols-2 gap-16 items-start max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <Portrait />
          <Bio />
        </div>
      </div>
    </section>
  );
}
