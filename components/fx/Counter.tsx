"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Counts from 0 to `value` once, when first in view. Renders the final value immediately under reduced motion or SSR. */
export function Counter({ value, duration = 1.4, delay = 0 }: { value: number; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduced) return;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, delay, reduced]);
  return (
    <span ref={ref} className="tabular">
      {value}
    </span>
  );
}
