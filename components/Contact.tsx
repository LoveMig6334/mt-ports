"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, ease } from "@/lib/animations";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const socialLinks = [
  { label: "Dr", title: "Dribbble" },
  { label: "Be", title: "Behance" },
  { label: "Ig", title: "Instagram" },
  { label: "Tw", title: "Twitter" },
  { label: "Li", title: "LinkedIn" },
];

export default function Contact() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-32 px-12 text-center relative max-[900px]:py-20 max-[900px]:px-6" id="contact">
      <motion.div
        ref={ref}
        variants={fadeUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Spinning star */}
        <motion.div
          className="text-[1.5rem] text-[var(--accent)] mb-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        >
          &#10022;
        </motion.div>

        <h2
          className="mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
        >
          Have a project
          <br />
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--violet)",
            }}
          >
            in mind?
          </span>
        </h2>

        <p
          className="mx-auto mb-12 max-w-[440px] text-[0.82rem] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "rgba(240,236,228,0.45)" }}
        >
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </p>

        <a
          href="mailto:hello@nova.design"
          className="relative inline-block pb-1.5 no-underline group"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
            color: "var(--fg)",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--fg)";
          }}
        >
          hello@nova.design
          <span
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] origin-right group-hover:origin-left scale-x-0 group-hover:scale-x-100"
            style={{ transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)" }}
          />
        </a>

        <div className="flex justify-center gap-6 mt-12">
          {socialLinks.map((link) => (
            <motion.a
              key={link.title}
              href="#"
              title={link.title}
              className="social-link w-[50px] h-[50px] rounded-full flex items-center justify-center no-underline text-[0.75rem] uppercase tracking-[0.05em] text-[var(--fg)]"
              style={{
                border: "1px solid rgba(240,236,228,0.15)",
                fontFamily: "var(--font-body)",
              }}
              whileHover={{
                backgroundColor: "var(--fg)",
                color: "var(--bg)",
                borderColor: "var(--fg)",
                y: -3,
                transition: { duration: 0.4, ease },
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
