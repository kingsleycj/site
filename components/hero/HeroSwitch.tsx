"use client";

import { motion } from "motion/react";
import { ui } from "@/content/microcopy";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

export type HeroState = "pitch" | "proof";

/** Two-segment control for the hero's two states; the active pill slides. */
export function HeroSwitch({ value, onChange }: { value: HeroState; onChange: (v: HeroState) => void }) {
  const items: { id: HeroState; label: string }[] = [
    { id: "pitch", label: ui.hero.pitch },
    { id: "proof", label: ui.hero.proof },
  ];
  return (
    <div role="group" aria-label={ui.hero.switchLabel} className="relative inline-flex h-9 items-center rounded-pill border border-border bg-sunken p-1">
      {items.map((it) => {
        const active = it.id === value;
        return (
          <button
            key={it.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(it.id)}
            className={cn("relative z-10 h-7 rounded-pill px-3.5 text-caption font-medium transition-colors", active ? "text-accent-ink" : "text-muted hover:text-text")}
          >
            {active && <motion.span layoutId="hero-switch-pill" className="absolute inset-0 -z-10 rounded-pill bg-accent" transition={spring.snappy} />}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
