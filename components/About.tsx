"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ease, fadeUpVariants } from "@/lib/animations";
import { skillToSlug } from "@/lib/categoryWorks";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const subjects = [
  "ภาษาไทย",
  "ภาษาอังกฤษ",
  "คณิตศาสตร์",
  "ฟิสิกส์",
  "เคมี",
  "ชีววิทยา",
  "คอมพิวเตอร์",
  "สังคมศึกษา",
];

const personalInfo = [
  { label: "ชื่อ นามสกุล", value: "นายธรรศ บุนนาค" },
  { label: "ชื่อเล่น", value: "มิก" },
  { label: "วัน/เดือน/ปีเกิด", value: "17 พฤศจิกายน 2552" },
  { label: "ศาสนา", value: "พุทธ" },
  {
    label: "ระดับชั้น",
    value: "ม.4/1 แผนการเรียน วิทยาศาสตร์-คณิตศาสตร์ โรงเรียนจิตรดา",
  },
  { label: "อีเมล", value: "06334@cds.ac.th" },
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
            alt="Thatt — นักเรียน ม.4/1 วิทย์-คณิต"
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
          <div className="grid pb-[0.25em]" style={{ overflow: "hidden" }}>
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
          <span
            className="block mt-2 text-accent font-normal text-[1.2rem] tracking-[0.05em]"
            style={{ fontFamily: "'CMU-Italic'" }}
          >
            นักเรียน ม.4/1 วิทย์-คณิต
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
        className="mb-10 text-[1rem] leading-[1.9] text-fg/65"
        style={{ fontFamily: "'CMU-Regular'" }}
      >
        ข้าพเจ้าเป็นผู้ที่มีความสนใจในด้านเทคโนโลยีและการเขียนโปรแกรมควบคู่ไปกับความชื่นชอบในงานออกแบบและศิลปะ
        แม้จะเรียนอยู่ในแผนวิทยาศาสตร์-คณิตศาสตร์
        แต่ข้าพเจ้าเชื่อว่าความคิดสร้างสรรค์และตรรกะไม่ได้แยกจากกัน
        หากแต่เสริมส่งซึ่งกันและกัน
        การเรียนรู้สิ่งใหม่คือสิ่งที่ขับเคลื่อนข้าพเจ้าเสมอ
        ไม่ว่าจะเป็นภาษาโปรแกรมมิ่งใหม่ แนวคิดทางวิทยาศาสตร์ หรือทักษะการออกแบบ
        ข้าพเจ้าพยายามนำทุกสิ่งที่เรียนมาถ่ายทอดออกมาเป็นผลงานที่มีความหมาย
      </p>

      <dl
        className="mb-12 grid gap-y-3"
        style={{ fontFamily: "'CMU-Regular'" }}
      >
        {personalInfo.map(({ label, value }) => (
          <div
            key={label}
            className="grid gap-x-4 text-[1rem] leading-[1.85]"
            style={{ gridTemplateColumns: "auto 1fr" }}
          >
            <dt className="text-fg/40 whitespace-nowrap">{label}:</dt>
            <dd className="text-fg/80 m-0">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-2 gap-5 max-[600px]:grid-cols-1">
        {subjects.map((subject) => (
          <Link
            key={subject}
            href={`/work/${skillToSlug[subject]}`}
            className="no-underline"
          >
            <motion.div
              className="skill-pill py-4 px-5 rounded-[10px] text-center text-[0.9rem] uppercase tracking-widest"
              style={{
                border: "1px solid rgba(240,236,228,0.1)",
                fontFamily: "'CMU-Regular'",
              }}
              whileHover={{
                borderColor: "#e8ff47",
                backgroundColor: "#e8ff47",
                color: "#0a0a0a",
                transition: { duration: 0.4, ease },
              }}
            >
              {subject}
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
