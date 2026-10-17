"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon, ThemeToggle, type IconName } from "@/components/ui";
import { ui } from "@/content/microcopy";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { panels, type PanelId } from "@/lib/panels";
import { useShell } from "./ShellContext";

const icons: Record<PanelId, IconName> = { home: "home", about: "user", path: "path", work: "work", toolkit: "toolkit", now: "now", contact: "contact" };

function DockItem({ id, path, label, onHover }: { id: PanelId; path: string; label: string; onHover: (id: PanelId | null) => void }) {
  const { active, go } = useShell();
  const isActive = active === id;
  return (
    <a
      href={path}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        go(id);
      }}
      onPointerEnter={() => onHover(id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
      className={cn("relative grid h-10 w-10 place-items-center rounded-pill transition-colors duration-(--dur-fast)", isActive ? "bg-accent text-accent-ink" : "text-muted hover:bg-sunken hover:text-text")}
    >
      <Icon name={icons[id]} size={18} />
    </a>
  );
}

/** Floating vertical dock, solid like the reference's: theme on top, the seven panels, back-to-top at the bottom. */
export function Dock() {
  const { active, go } = useShell();
  const [hovered, setHovered] = useState<PanelId | null>(null);
  const labelOf = (id: PanelId) => panels.find((p) => p.id === id)?.label ?? "";
  const toTop = () => document.getElementById(`panel-${active}`)?.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <nav aria-label={ui.dock.label} className="relative flex flex-col items-center gap-1 self-center">
      <div className="flex flex-col items-center gap-1 rounded-pill border border-border bg-overlay p-1.5 shadow-2">
        <ThemeToggle size={40} />
        <span className="my-1 h-px w-5 bg-border" aria-hidden />
        {panels.map((p) => (
          <div key={p.id} className="relative">
            <DockItem id={p.id} path={p.path} label={p.label} onHover={setHovered} />
            <AnimatePresence>
              {hovered === p.id && (
                <motion.span key={`hover-${p.id}`} initial={{ opacity: 0, x: 6, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 6, scale: 0.9 }} transition={spring.snappy} className="dock-label" aria-hidden>
                  {labelOf(p.id)}
                </motion.span>
              )}
              {hovered === null && active === p.id && (
                <motion.span key={`here-${p.id}`} initial={{ opacity: 0, x: 6 }} animate={{ opacity: [0, 1, 1, 0], x: [6, 0, 0, 0] }} transition={{ duration: 2.6, times: [0, 0.08, 0.8, 1], ease: "easeOut" }} className="dock-label" aria-hidden>
                  {labelOf(p.id)}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
        <span className="my-1 h-px w-5 bg-border" aria-hidden />
        <button type="button" onClick={() => (active === "home" ? toTop() : go("home"))} aria-label={ui.dock.toTop} title={ui.dock.toTop} className="grid h-10 w-10 place-items-center rounded-pill text-muted transition-colors hover:bg-sunken hover:text-text">
          <Icon name="arrowUp" size={18} />
        </button>
      </div>
    </nav>
  );
}
