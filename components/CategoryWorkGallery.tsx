"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ease, fadeUpVariants } from "@/lib/animations";
import type { Category, CategoryWork } from "@/lib/categoryWorks";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";

const CategoryLightbox = dynamic(() => import("./CategoryLightbox"));

function CategoryWorkItem({
  work,
  index,
  onOpen,
}: {
  work: CategoryWork;
  index: number;
  onOpen: (id: string) => void;
}) {
  const { ref, isInView } = useScrollReveal();
  const [hasError, setHasError] = useState(false);
  const handleError = useCallback(() => setHasError(true), []);

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="work-item relative rounded-xl overflow-hidden cursor-pointer group bg-[#151515]"
      style={{ aspectRatio: work.aspectRatio || "4/3" }}
      onClick={() => onOpen(work.id)}
    >
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <svg
            width="48"
            height="48"
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
        <div className="relative w-full h-full transition-transform duration-800 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]">
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover saturate-[0.85] group-hover:saturate-[1.1] transition-[filter] duration-600 ease-[cubic-bezier(0.23,1,0.32,1)]"
            onError={handleError}
          />
        </div>
      )}
      <div
        className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 55%)",
          transition: "opacity 0.5s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.15em] text-accent font-body">
          {work.images.length} image{work.images.length !== 1 ? "s" : ""}
        </span>
        <h3
          className="text-[1.6rem] tracking-tight mb-0 font-display font-bold"
          style={{ letterSpacing: "-0.02em" }}
        >
          {work.title}
        </h3>
        <motion.div
          className="absolute top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center text-[1.3rem]"
          style={{
            color: "#f0ece4",
            border: "1.5px solid #f0ece4",
          }}
          whileHover={{
            backgroundColor: "#e8ff47",
            borderColor: "#e8ff47",
            color: "#0a0a0a",
            transition: { duration: 0.3, ease },
          }}
        >
          &#8599;
        </motion.div>
      </div>
    </motion.div>
  );
}

interface CategoryWorkGalleryProps {
  category: Category;
}

export default function CategoryWorkGallery({
  category,
}: CategoryWorkGalleryProps) {
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const selectedWork =
    category.works.find((w) => w.id === selectedWorkId) ?? null;

  return (
    <section className="pb-16 pt-40">
      {/* Category header */}
      <div className="px-12 mb-16 max-[900px]:px-6">
        <h1
          className="font-display font-extrabold tracking-tight text-fg"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {category.name}
        </h1>
        <p
          className="mt-4 text-[0.82rem] leading-[1.85] font-body"
          style={{ color: "rgba(240,236,228,0.5)" }}
        >
          {category.description}
        </p>
      </div>

      {category.works.length === 0 ? (
        <div className="px-12 max-[900px]:px-6">
          <div
            className="flex flex-col items-center justify-center gap-4 rounded-xl py-32"
            style={{
              border: "1px solid rgba(240,236,228,0.08)",
              backgroundColor: "rgba(240,236,228,0.02)",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(240,236,228,0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span
              className="text-sm uppercase tracking-widest font-body"
              style={{ color: "rgba(240,236,228,0.3)" }}
            >
              Works coming soon
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 px-12 max-[900px]:grid-cols-1 max-[900px]:px-6">
          {category.works.map((work, i) => (
            <CategoryWorkItem
              key={work.id}
              work={work}
              index={i}
              onOpen={setSelectedWorkId}
            />
          ))}
        </div>
      )}

      {selectedWork && (
        <CategoryLightbox
          key={selectedWork.id}
          isOpen={selectedWorkId !== null}
          work={selectedWork}
          onClose={() => setSelectedWorkId(null)}
        />
      )}
    </section>
  );
}
