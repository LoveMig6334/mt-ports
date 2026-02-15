import type { Transition, Variants } from "framer-motion";

export const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

export const smoothTransition: Transition = {
  duration: 1.2,
  ease,
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

export const heroLineVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 1.2, ease },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

export const lightboxBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, transition: { duration: 0.3, ease } },
};

export const lightboxContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: { duration: 0.3, ease },
  },
};
