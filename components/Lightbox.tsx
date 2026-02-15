"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projects";
import { lightboxBackdropVariants, lightboxContentVariants, ease } from "@/lib/animations";

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ isOpen, currentIndex, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(
    (dir: number) => {
      const next = (currentIndex + dir + projects.length) % projects.length;
      onNavigate(next);
    },
    [currentIndex, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);

      // Focus trap
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose, navigate]);

  const project = projects[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — project preview`}
          tabIndex={-1}
          className="fixed inset-0 z-[10002] flex items-center justify-center outline-none"
          style={{ backdropFilter: "blur(20px)" }}
          variants={lightboxBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(5,5,5,0.96)" }}
          />

          <motion.div
            className="relative z-10"
            style={{ maxWidth: "85vw", maxHeight: "85vh" }}
            variants={lightboxContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <motion.button
              aria-label="Close lightbox"
              className="absolute -top-[50px] right-0 w-10 h-10 rounded-full flex items-center justify-center text-[1.2rem] text-[var(--fg)] cursor-pointer bg-transparent"
              style={{ border: "1.5px solid rgba(240,236,228,0.3)" }}
              whileHover={{
                borderColor: "var(--coral)",
                rotate: 90,
                transition: { duration: 0.3 },
              }}
              onClick={onClose}
            >
              &#10005;
            </motion.button>

            {/* Prev */}
            <motion.button
              aria-label="Previous project"
              className="absolute top-1/2 -translate-y-1/2 -left-[70px] w-[50px] h-[50px] rounded-full flex items-center justify-center text-[1.2rem] text-[var(--fg)] cursor-pointer max-[900px]:left-[10px]"
              style={{
                background: "rgba(240,236,228,0.05)",
                border: "1px solid rgba(240,236,228,0.15)",
              }}
              whileHover={{
                backgroundColor: "var(--accent)",
                borderColor: "var(--accent)",
                color: "var(--bg)",
                transition: { duration: 0.3, ease },
              }}
              onClick={() => navigate(-1)}
            >
              &#8592;
            </motion.button>

            {/* Next */}
            <motion.button
              aria-label="Next project"
              className="absolute top-1/2 -translate-y-1/2 -right-[70px] w-[50px] h-[50px] rounded-full flex items-center justify-center text-[1.2rem] text-[var(--fg)] cursor-pointer max-[900px]:right-[10px]"
              style={{
                background: "rgba(240,236,228,0.05)",
                border: "1px solid rgba(240,236,228,0.15)",
              }}
              whileHover={{
                backgroundColor: "var(--accent)",
                borderColor: "var(--accent)",
                color: "var(--bg)",
                transition: { duration: 0.3, ease },
              }}
              onClick={() => navigate(1)}
            >
              &#8594;
            </motion.button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                <Image
                  src={project.imageFull}
                  alt={project.title}
                  width={1800}
                  height={1200}
                  className="block rounded-lg"
                  style={{ maxWidth: "100%", maxHeight: "80vh", width: "auto", height: "auto" }}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Info */}
            <div className="flex justify-between items-center mt-5">
              <h3 className="text-[1.2rem] font-display font-bold">
                {project.title}
              </h3>
              <span className="text-[0.65rem] uppercase tracking-[0.15em] text-accent font-body">
                {project.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
