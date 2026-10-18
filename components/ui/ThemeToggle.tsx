"use client";

import { m } from "motion/react";
import { useState } from "react";
import { ui } from "@/content/microcopy";
import { cn } from "@/lib/cn";
import { useTheme } from "@/lib/theme";
import { Icon } from "./Icon";

export function ThemeToggle({ className, size = 44 }: { className?: string; size?: number }) {
  const [theme, toggle] = useTheme();
  // Only animate a change the visitor made; the first icon is simply there (no pop-in after hydration).
  const [changed, setChanged] = useState(false);
  const dark = theme === "dark";
  const label = dark ? ui.dock.theme.toLight : ui.dock.theme.toDark;
  return (
    <button
      type="button"
      onClick={() => {
        setChanged(true);
        toggle();
      }}
      aria-label={label}
      title={label}
      className={cn("relative grid place-items-center overflow-hidden rounded-pill text-text transition-colors hover:bg-overlay", className)}
      style={{ width: size, height: size }}
    >
      <m.span
        key={theme}
        initial={changed ? { rotate: -90, opacity: 0, scale: 0.6 } : false}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="grid place-items-center"
      >
        <Icon name={dark ? "sun" : "moon"} size={Math.round(size * 0.42)} />
      </m.span>
    </button>
  );
}
