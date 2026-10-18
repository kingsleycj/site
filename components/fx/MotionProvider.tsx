"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * One place for Motion. `LazyMotion` with the `domAnimation` feature set (no layout or drag
 * animations, which nothing here uses) keeps the library's startup cost small; `strict` makes
 * any stray full `motion.*` component an error, so components use the light `m.*` ones.
 * `reducedMotion="user"` drops transform animations for people who asked for less motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
