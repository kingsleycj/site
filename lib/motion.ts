/**
 * Motion language. Durations in seconds (Motion) mirror the CSS vars in globals.css.
 * Use `ease.out` for things arriving, `ease.inOut` for things moving between places.
 */
export const dur = { fast: 0.16, base: 0.28, slow: 0.52, panel: 0.64 } as const;

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const spring = {
  /** Cards, chips, the dock pill. Settles fast, slight overshoot. */
  snappy: { type: "spring", stiffness: 420, damping: 32, mass: 0.8 } as const,
  /** The fanned stack's deal and settle. */
  stage: { type: "spring", stiffness: 190, damping: 28, mass: 1 } as const,
  /** Tile hover lifts. */
  hover: { type: "spring", stiffness: 420, damping: 30 } as const,
};

/** Shared variants. */
export const reveal = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;

export const stagger = (children = 0.05, delay = 0.05) => ({ staggerChildren: children, delayChildren: delay });
