"use client";

import { ease } from "@/lib/animations";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const links = [
  { href: "#intro", label: "Intro" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const lenis = useLenis();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    lenis?.scrollTo(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-12 py-6 z-1000 mix-blend-difference max-[900px]:px-6 max-[900px]:py-5">
      <a
        href="#"
        className="font-display font-extrabold text-[1.4rem] tracking-tight text-fg no-underline"
      >
        NOVA&copy;
      </a>
      <ul className="flex gap-10 list-none max-[900px]:gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <motion.a
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="relative pb-1 text-[0.72rem] uppercase tracking-[0.15em] text-fg no-underline font-body"
              whileHover="hover"
            >
              {link.label}
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
            </motion.a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
