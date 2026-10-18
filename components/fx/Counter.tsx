"use client";

import { useEffect, useRef } from "react";

/**
 * Counts from 0 to `value` once, when first in view. The server and the first paint show the
 * final number; under reduced motion it never moves. A few lines of rAF, no animation library.
 */
export function Counter({ value, duration = 1.4, delay = 0 }: { value: number; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / (duration * 1000));
            el.textContent = String(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, delay * 1000);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [value, duration, delay]);
  return (
    <span ref={ref} className="tabular">
      {value}
    </span>
  );
}
