"use client";

import { useReducedMotion as useMotionReduced } from "motion/react";

/** True when the visitor asked for less motion. Every effect checks this. */
export function useReducedMotion(): boolean {
  return useMotionReduced() ?? false;
}
