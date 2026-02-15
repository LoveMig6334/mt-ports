"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollReveal(options?: { once?: boolean; margin?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? "0px 0px -40px 0px") as `${number}px ${number}px ${number}px ${number}px`,
    amount: options?.amount ?? 0.12,
  });

  return { ref, isInView };
}
