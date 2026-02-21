"use client";

import {
  ease,
  lightboxBackdropVariants,
  lightboxContentVariants,
} from "@/lib/animations";
import type { CategoryWork } from "@/lib/categoryWorks";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CategoryLightboxProps {
  isOpen: boolean;
  work: CategoryWork;
  onClose: () => void;
}

export default function CategoryLightbox({
  isOpen,
  work,
  onClose,
}: CategoryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errorIndices, setErrorIndices] = useState<Set<number>>(new Set());

  const totalImages = work.images.length;
  const canNavigate = totalImages > 1;

  const navigate = useCallback(
    (dir: number) => {
      setCurrentImageIndex((prev) => (prev + dir + totalImages) % totalImages);
    },
    [totalImages],
  );

  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (canNavigate) {
        if (e.key === "ArrowLeft") navigate(-1);
        if (e.key === "ArrowRight") navigate(1);
      }

      // Focus trap
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
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
      lenis?.start();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose, navigate, canNavigate, lenis]);

  const currentImage = work.images[currentImageIndex];
  const hasError = errorIndices.has(currentImageIndex);

  const handleImageError = useCallback(() => {
    setErrorIndices((prev) => new Set(prev).add(currentImageIndex));
  }, [currentImageIndex]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${work.title} — work preview`}
          tabIndex={-1}
          className="fixed inset-0 z-10002 flex items-center justify-center outline-none"
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
            className="relative z-10 flex flex-col items-center"
            style={{ maxWidth: "85vw", maxHeight: "85vh" }}
            variants={lightboxContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <motion.button
              aria-label="Close lightbox"
              className="absolute -top-12.5 right-0 w-10 h-10 rounded-full flex items-center justify-center text-[1.2rem] cursor-pointer bg-transparent"
              style={{
                border: "1.5px solid rgba(240,236,228,0.3)",
                color: "#f0ece4",
              }}
              whileHover={{
                borderColor: "#ff6b4a",
                rotate: 90,
                transition: { duration: 0.3 },
              }}
              onClick={onClose}
            >
              &#10005;
            </motion.button>

            {/* Prev */}
            {canNavigate && (
              <motion.button
                aria-label="Previous image"
                className="absolute top-1/2 -translate-y-1/2 -left-17.5 w-12.5 h-12.5 rounded-full flex items-center justify-center text-[1.2rem] cursor-pointer max-[900px]:left-2.5"
                style={{
                  background: "rgba(240,236,228,0.05)",
                  border: "1px solid rgba(240,236,228,0.15)",
                  color: "#f0ece4",
                }}
                whileHover={{
                  backgroundColor: "#e8ff47",
                  borderColor: "#e8ff47",
                  color: "#0a0a0a",
                  transition: { duration: 0.3, ease },
                }}
                onClick={() => navigate(-1)}
              >
                &#8592;
              </motion.button>
            )}

            {/* Next */}
            {canNavigate && (
              <motion.button
                aria-label="Next image"
                className="absolute top-1/2 -translate-y-1/2 -right-17.5 w-12.5 h-12.5 rounded-full flex items-center justify-center text-[1.2rem] cursor-pointer max-[900px]:right-2.5"
                style={{
                  background: "rgba(240,236,228,0.05)",
                  border: "1px solid rgba(240,236,228,0.15)",
                  color: "#f0ece4",
                }}
                whileHover={{
                  backgroundColor: "#e8ff47",
                  borderColor: "#e8ff47",
                  color: "#0a0a0a",
                  transition: { duration: 0.3, ease },
                }}
                onClick={() => navigate(1)}
              >
                &#8594;
              </motion.button>
            )}

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                {hasError ? (
                  <div
                    className="flex flex-col items-center justify-center gap-4 rounded-lg"
                    style={{
                      width: "min(85vw, 900px)",
                      height: "min(60vh, 600px)",
                      backgroundColor: "rgba(21,21,21,1)",
                      border: "1px solid rgba(255,107,74,0.25)",
                    }}
                  >
                    <svg
                      width="64"
                      height="64"
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
                    <span
                      className="text-sm uppercase tracking-widest font-body"
                      style={{ color: "#ff6b4a" }}
                    >
                      Image could not be loaded
                    </span>
                    <span
                      className="text-xs font-body"
                      style={{ color: "rgba(240,236,228,0.4)" }}
                    >
                      The source may be unavailable
                    </span>
                  </div>
                ) : (
                  <Image
                    src={currentImage}
                    alt={`${work.title} — image ${currentImageIndex + 1}`}
                    width={1800}
                    height={1200}
                    className="block rounded-lg"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "80vh",
                      width: "auto",
                      height: "auto",
                    }}
                    priority
                    onError={handleImageError}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Info */}
            <div className="flex justify-between items-center mt-5 w-full">
              <div>
                <h3 className="text-[1.2rem] font-display font-bold">
                  {work.title}
                </h3>
                {work.description && (
                  <p
                    className="text-sm font-body mt-1"
                    style={{ color: "rgba(240,236,228,0.6)" }}
                  >
                    {work.description}
                  </p>
                )}
              </div>
              {canNavigate && (
                <span
                  className="text-[0.72rem] uppercase tracking-[0.15em] font-body"
                  style={{ color: "rgba(240,236,228,0.5)" }}
                >
                  {currentImageIndex + 1} / {totalImages}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
