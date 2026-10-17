"use client";

import { motion } from "motion/react";
import { ui } from "@/content/microcopy";
import { cn } from "@/lib/cn";
import { useTheme } from "@/lib/theme";
import { Icon } from "./Icon";

export function ThemeToggle({ className, size = 44 }: { className?: string; size?: number }) {
  const [theme, toggle] = useTheme();
  const dark = theme === "dark";
  const label = dark ? ui.dock.theme.toLight : ui.dock.theme.toDark;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn("relative grid place-items-center overflow-hidden rounded-pill text-text transition-colors hover:bg-overlay", className)}
      style={{ width: size, height: size }}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="grid place-items-center"
      >
        <Icon name={dark ? "sun" : "moon"} size={Math.round(size * 0.42)} />
      </motion.span>
    </button>
  );
}
