"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ease, fadeUpVariants } from "@/lib/animations";
import { projects } from "@/lib/projects";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";

const Lightbox = dynamic(() => import("./Lightbox"));

function WorkItem({
  index,
  onOpen,
}: {
  index: number;
  onOpen: (i: number) => void;
}) {
  const project = projects[index];
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
      style={{ aspectRatio: project.aspectRatio || "4/3" }}
      onClick={() => onOpen(index)}
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
            src={project.image}
            alt={project.title}
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
          {project.category}
        </span>
        <h3
          className="text-[1.6rem] tracking-tight mb-0 font-display font-bold"
          style={{ letterSpacing: "-0.02em" }}
        >
          {project.title}
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

export default function WorkGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="pb-16" id="work">
      <div className="grid grid-cols-2 gap-6 px-12 max-[900px]:grid-cols-1 max-[900px]:px-6">
        {projects.map((project, i) => (
          <WorkItem key={project.id} index={i} onOpen={setLightboxIndex} />
        ))}
      </div>

      <Lightbox
        isOpen={lightboxIndex !== null}
        currentIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
