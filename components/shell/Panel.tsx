"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { panelById, panelIndex, panelOrder, type PanelId } from "@/lib/panels";
import { useShell } from "./ShellContext";

export interface PanelProps {
  id: PanelId;
  children: ReactNode;
  /** Remove the default padding (Home draws its own layout). */
  bare?: boolean;
  className?: string;
}

/**
 * One room in the stage. On the shell it is a full-size slide that scrolls inside itself;
 * on phones and tablets only the active room renders (each route is its own page there).
 * Inactive slides are inert so focus never lands offscreen.
 */
export function Panel({ id, children, bare, className }: PanelProps) {
  const { active, go } = useShell();
  const isActive = active === id;
  const i = panelIndex(id);
  const nextId = panelOrder[i + 1];
  const next = nextId ? panelById(nextId) : null;
  return (
    <section
      id={`panel-${id}`}
      aria-labelledby={`panel-${id}-title`}
      aria-hidden={!isActive || undefined}
      inert={!isActive || undefined}
      data-active={isActive || undefined}
      className={cn(
        "panel relative w-full min-w-0 shrink-0 shell:h-full shell:overflow-y-auto shell:overscroll-contain",
        "transition-opacity duration-(--dur-panel) ease-in-out",
        !isActive && "max-shell:hidden shell:opacity-50",
        className,
      )}
    >
      <div className={cn("flex min-h-full flex-col", !bare && "px-5 pb-24 pt-5 sm:px-8 shell:px-10 shell:pb-10 shell:pt-8 wide:px-14 wide:pt-10")}>
        <div className="flex flex-1 flex-col">{children}</div>
        {next && (
          <a
            href={next.path}
            onClick={(e) => {
              e.preventDefault();
              go(next.id);
            }}
            className={cn(
              "group inline-flex items-center gap-2 self-start text-small font-medium text-muted transition-colors hover:text-text",
              bare ? "mx-5 mb-28 sm:mx-8 shell:mx-8 shell:mb-6 wide:mx-12" : "mt-16",
            )}
          >
            <span className="text-caption tabular">({next.number})</span>
            <span>Next: {next.label}</span>
            <Icon name="arrowRight" size={16} className="transition-transform duration-(--dur) ease-out group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </section>
  );
}
