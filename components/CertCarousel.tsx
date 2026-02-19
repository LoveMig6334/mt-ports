"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ease, fadeUpVariants } from "@/lib/animations";
import type { Certification } from "@/lib/certifications";
import { certifications } from "@/lib/certifications";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const CertLightbox = dynamic(() => import("./CertLightbox"));

function useCardWidth() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return { cardRef, cardWidth };
}

function CertCard({
  cert,
  index,
  isFirst,
  cardRef,
  visibleCount,
  onOpenLightbox,
}: {
  cert: Certification;
  index: number;
  isFirst: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
  visibleCount: number;
  onOpenLightbox: (cert: Certification) => void;
}) {
  const [hasError, setHasError] = useState(false);
  const handleError = useCallback(() => setHasError(true), []);

  const handleClick = () => {
    onOpenLightbox(cert);
  };

  return (
    <motion.div
      ref={isFirst ? cardRef : undefined}
      className="shrink-0 cursor-pointer rounded-xl overflow-hidden"
      style={{
        width:
          visibleCount === 1
            ? "85%"
            : visibleCount === 2
              ? "calc(50% - 0.75rem)"
              : "calc(33.333% - 1rem)",
        border: "1px solid rgba(240,236,228,0.08)",
      }}
      whileHover={{
        y: -8,
        borderColor: "#e8ff47",
        transition: { duration: 0.3, ease },
      }}
      onClick={handleClick}
    >
      {/* Image / PDF placeholder */}
      <div className="relative w-full" style={{ aspectRatio: "3/2" }}>
        {hasError ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ backgroundColor: "rgba(21,21,21,1)" }}
          >
            <svg
              width="40"
              height="40"
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
              className="text-xs uppercase tracking-widest font-body"
              style={{ color: "#ff6b4a" }}
            >
              Image unavailable
            </span>
          </div>
        ) : (
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            sizes="(max-width: 600px) 85vw, (max-width: 900px) 50vw, 33vw"
            loading={index < 3 ? "eager" : "lazy"}
            className="object-cover"
            onError={handleError}
          />
        )}
      </div>

      {/* Description */}
      <div className="p-4" style={{ backgroundColor: "rgba(15,15,15,1)" }}>
        <h4
          className="text-sm font-display font-bold truncate"
          style={{ color: "#f0ece4" }}
        >
          {cert.title}
        </h4>
        <p
          className="text-xs font-body mt-1 line-clamp-2"
          style={{ color: "rgba(240,236,228,0.5)" }}
        >
          {cert.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function CertCarousel() {
  const { ref, isInView } = useScrollReveal();
  const { cardRef, cardWidth } = useCardWidth();
  const [slideIndex, setSlideIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gap = 24;

  // Responsive: how many cards visible
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 600) setVisibleCount(1);
      else if (window.innerWidth <= 900) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, certifications.length - visibleCount);

  const clampedIndex = Math.min(slideIndex, maxIndex);
  const slideOffset = cardWidth > 0 ? -(clampedIndex * (cardWidth + gap)) : 0;

  const canPrev = clampedIndex > 0;
  const canNext = clampedIndex < maxIndex;

  const handleOpenLightbox = useCallback((cert: Certification) => {
    const index = certifications.findIndex((c) => c.id === cert.id);
    if (index !== -1) setLightboxIndex(index);
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 px-12 max-[900px]:px-6"
      id="certifications"
    >
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-12 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-6">
          <div>
            <h2
              className="text-[2.5rem] font-display font-bold leading-tight max-[600px]:text-[1.8rem]"
              style={{ color: "#f0ece4" }}
            >
              Certifications &{" "}
              <span className="font-serif italic font-normal">
                Achievements
              </span>
            </h2>
            <p
              className="text-sm font-body mt-2"
              style={{ color: "rgba(240,236,228,0.5)" }}
            >
              Awards, certificates & recognitions
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-3">
            <motion.button
              aria-label="Previous slide"
              className="w-11 h-11 rounded-full flex items-center justify-center text-[1rem] cursor-pointer"
              style={{
                background: canPrev
                  ? "rgba(240,236,228,0.05)"
                  : "rgba(240,236,228,0.02)",
                border: canPrev
                  ? "1px solid rgba(240,236,228,0.15)"
                  : "1px solid rgba(240,236,228,0.06)",
                color: canPrev ? "#f0ece4" : "rgba(240,236,228,0.2)",
                opacity: canPrev ? 1 : 0.5,
              }}
              whileHover={
                canPrev
                  ? {
                      backgroundColor: "#e8ff47",
                      borderColor: "#e8ff47",
                      color: "#0a0a0a",
                      transition: { duration: 0.3, ease },
                    }
                  : undefined
              }
              onClick={() => canPrev && setSlideIndex((i) => i - 1)}
              disabled={!canPrev}
            >
              &#8592;
            </motion.button>
            <motion.button
              aria-label="Next slide"
              className="w-11 h-11 rounded-full flex items-center justify-center text-[1rem] cursor-pointer"
              style={{
                background: canNext
                  ? "rgba(240,236,228,0.05)"
                  : "rgba(240,236,228,0.02)",
                border: canNext
                  ? "1px solid rgba(240,236,228,0.15)"
                  : "1px solid rgba(240,236,228,0.06)",
                color: canNext ? "#f0ece4" : "rgba(240,236,228,0.2)",
                opacity: canNext ? 1 : 0.5,
              }}
              whileHover={
                canNext
                  ? {
                      backgroundColor: "#e8ff47",
                      borderColor: "#e8ff47",
                      color: "#0a0a0a",
                      transition: { duration: 0.3, ease },
                    }
                  : undefined
              }
              onClick={() => canNext && setSlideIndex((i) => i + 1)}
              disabled={!canNext}
            >
              &#8594;
            </motion.button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: slideOffset }}
            transition={{ duration: 0.6, ease }}
          >
            {certifications.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                isFirst={i === 0}
                cardRef={cardRef}
                visibleCount={visibleCount}
                onOpenLightbox={handleOpenLightbox}
              />
            ))}
          </motion.div>
        </div>

        {/* Slide indicator dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className="w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300"
              style={{
                backgroundColor:
                  i === clampedIndex ? "#e8ff47" : "rgba(240,236,228,0.2)",
                transform: i === clampedIndex ? "scale(1.4)" : "scale(1)",
              }}
              onClick={() => setSlideIndex(i)}
            />
          ))}
        </div>
      </motion.div>

      <CertLightbox
        isOpen={lightboxIndex !== null}
        items={certifications}
        currentIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
