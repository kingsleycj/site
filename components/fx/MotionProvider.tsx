"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** One place for Motion defaults. `reducedMotion="user"` drops transform and layout animations for people who asked for less motion; opacity still fades. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
