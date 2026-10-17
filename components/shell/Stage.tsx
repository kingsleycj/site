"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useShell } from "./ShellContext";
import { StageHeader } from "./StageHeader";

/**
 * The content stage. The header (avatar, name, clock) sits in the flow at the top; below it a
 * horizontal track holds all seven panels and slides by one panel width per step. On phones the
 * track becomes a vertical flow and the header is replaced by the sticky mobile header.
 */
export function Stage({ children, className }: { children: ReactNode; className?: string }) {
  const { index } = useShell();
  return (
    <div
      className={cn("relative isolate flex min-w-0 max-w-full flex-1 flex-col overflow-x-clip shell:overflow-hidden shell:rounded-xl shell:border shell:border-border shell:bg-raised shell:shadow-1", className)}
      style={{ "--i": index } as React.CSSProperties}
      onScroll={(e) => {
        if (e.currentTarget.scrollLeft !== 0) e.currentTarget.scrollLeft = 0;
      }}
    >
      <div className="hidden shrink-0 shell:block">
        <StageHeader />
      </div>
      <div className="stage-track relative flex min-h-0 min-w-0 flex-1 flex-col shell:flex-row" style={{ transform: "translate3d(calc(var(--i) * -100%), 0, 0)" }}>
        {children}
      </div>
    </div>
  );
}
