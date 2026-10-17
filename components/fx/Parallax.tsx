"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface Ctx {
  x: MotionValue<number>;
  y: MotionValue<number>;
}
const ParallaxCtx = createContext<Ctx | null>(null);

/**
 * Pointer parallax. The group tracks the pointer as -1..1; each layer moves by `depth` px at the edges.
 * Depth 0 is still; positive moves with the pointer (near), negative against it (far). Off under reduced motion.
 */
export function ParallaxGroup({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const x = useSpring(rx, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(ry, { stiffness: 60, damping: 18, mass: 0.6 });
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      rx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      ry.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => {
      rx.set(0);
      ry.set(0);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, rx, ry]);
  return (
    <ParallaxCtx.Provider value={{ x, y }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ParallaxCtx.Provider>
  );
}

export function ParallaxLayer({ depth, children, className, style }: { depth: number; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ctx = useContext(ParallaxCtx);
  const zero = useMotionValue(0);
  const tx = useTransform(ctx?.x ?? zero, (v) => v * depth);
  const ty = useTransform(ctx?.y ?? zero, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x: tx, y: ty, ...style }}>
      {children}
    </motion.div>
  );
}
