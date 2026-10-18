"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Depth for the hero graphic, without an animation library.
 * Desktop: the group writes the pointer position (-1..1) as `--px`/`--py`; each layer's `translate`
 * follows it by `depth` px through a CSS transition, so only the compositor animates.
 * Touch screens have no pointer to follow: there the same layers drift on a slow CSS loop instead.
 * Both are off under reduced motion (see `.parallax-layer` in globals.css).
 */
export function ParallaxGroup({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      schedule();
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      schedule();
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Depth 0 is still; positive moves with the pointer (near), negative against it (far). */
export function ParallaxLayer({ depth, children, className, style }: { depth: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn("parallax-layer", className)} style={{ "--depth": depth, ...style } as CSSProperties}>
      {children}
    </div>
  );
}
