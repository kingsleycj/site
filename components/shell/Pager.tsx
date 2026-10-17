"use client";

import { PagerButton } from "@/components/ui";
import { ui } from "@/content/microcopy";
import { cn } from "@/lib/cn";
import { useShell } from "./ShellContext";

/** The two round buttons at the reference's positions: prev on the card's left edge, next on the stage's right edge. */
export function PagerPrev() {
  const { index, prev } = useShell();
  return <PagerButton direction="prev" label={ui.pager.prev} onClick={prev} disabled={index === 0} size={48} className="absolute -left-6 top-1/2 z-30 -translate-y-1/2" />;
}

/** On Home, before the first move, the next button pulses green so the way forward is obvious. */
export function PagerNext() {
  const { index, count, next, hintNext } = useShell();
  return (
    <PagerButton
      direction="next"
      label={hintNext ? `${ui.pager.next}. ${ui.pager.hint}` : ui.pager.next}
      onClick={next}
      disabled={index === count - 1}
      size={48}
      className={cn("absolute -right-6 top-1/2 z-30 -translate-y-1/2", hintNext && "pager-hint")}
    />
  );
}
