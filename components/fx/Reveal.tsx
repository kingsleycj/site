"use client";

import { m, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { dur, ease } from "@/lib/motion";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & { children?: ReactNode; delay?: number; y?: number; once?: boolean };

/**
 * Fade-and-lift when an element enters view. Use once per section, not on every card.
 * Renders the same markup on server and client; MotionConfig drops the lift for reduced motion.
 * Until the app has hydrated (`html[data-js]`, set by the Shell), a CSS rule keeps the content
 * visible, so nothing is blank without JavaScript or while the bundle is still loading.
 */
export function Reveal({ delay = 0, y = 14, once = true, children, ...rest }: RevealProps) {
  return (
    <m.div
      data-reveal=""
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ duration: dur.slow, ease: ease.out, delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
