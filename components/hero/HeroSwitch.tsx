"use client";

import { ui } from "@/content/microcopy";
import { cn } from "@/lib/cn";

export type HeroState = "pitch" | "proof";

/** Two-segment control for the hero's two states; the green pill slides between them (a CSS transition). */
export function HeroSwitch({ value, onChange }: { value: HeroState; onChange: (v: HeroState) => void }) {
  const items: { id: HeroState; label: string }[] = [
    { id: "pitch", label: ui.hero.pitch },
    { id: "proof", label: ui.hero.proof },
  ];
  return (
    <div role="group" aria-label={ui.hero.switchLabel} className="relative grid h-9 grid-cols-2 items-center rounded-pill border border-border bg-sunken p-1">
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-pill bg-accent transition-transform duration-(--dur) ease-out"
        style={{ transform: value === "proof" ? "translateX(100%)" : "none" }}
      />
      {items.map((it) => {
        const active = it.id === value;
        return (
          <button
            key={it.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(it.id)}
            className={cn("relative z-10 h-7 whitespace-nowrap rounded-pill px-3.5 text-caption font-medium transition-colors duration-(--dur)", active ? "text-accent-ink" : "text-muted hover:text-text")}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
