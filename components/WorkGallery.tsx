"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import { fadeUpVariants, ease } from "@/lib/animations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Lightbox from "./Lightbox";

function WorkItem({
  index,
  onOpen,
}: {
  index: number;
  onOpen: (i: number) => void;
}) {
  const project = projects[index];
  const { ref, isInView } = useScrollReveal();

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
      <div className="relative w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          loading={index === 0 ? "eager" : "lazy"}
          className="object-cover saturate-[0.85] group-hover:saturate-[1.1] transition-[filter] duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        />
      </div>
      <div
        className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 55%)",
          transition: "opacity 0.5s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.15em] text-accent font-body">
          {project.category}
        </span>
        <h3 className="text-[1.6rem] tracking-tight mb-0 font-display font-bold" style={{ letterSpacing: "-0.02em" }}>
          {project.title}
        </h3>
        <motion.div
          className="absolute top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center text-[1.3rem] text-fg border-[1.5px] border-fg"
          whileHover={{
            backgroundColor: "var(--accent)",
            borderColor: "var(--accent)",
            color: "var(--bg)",
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
        {projects.map((_, i) => (
          <WorkItem key={i} index={i} onOpen={setLightboxIndex} />
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
