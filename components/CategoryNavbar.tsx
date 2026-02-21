"use client";

import { ease } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";

interface CategoryNavbarProps {
  categoryName: string;
}

export default function CategoryNavbar({ categoryName }: CategoryNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-12 py-6 z-1000 mix-blend-difference max-[900px]:px-6 max-[900px]:py-5">
      <Link
        href="/"
        className="font-display font-extrabold text-[1.4rem] tracking-tight text-fg no-underline"
      >
        NOVA&copy;
      </Link>

      <div className="flex items-center gap-10 max-[900px]:gap-6">
        <span className="text-[0.72rem] uppercase tracking-[0.15em] text-fg/50 font-body max-[600px]:hidden">
          {categoryName}
        </span>
        <Link href="/#about">
          <motion.span
            className="relative pb-1 text-[0.72rem] uppercase tracking-[0.15em] text-fg no-underline font-body cursor-pointer inline-block"
            whileHover="hover"
          >
            &larr; Back
            <motion.span
              className="absolute bottom-0 left-0 h-[1.5px] bg-accent"
              initial={{ width: "0%" }}
              variants={{
                hover: {
                  width: "100%",
                  transition: { duration: 0.5, ease },
                },
              }}
            />
          </motion.span>
        </Link>
      </div>
    </nav>
  );
}
