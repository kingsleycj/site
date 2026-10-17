import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  label?: string;
}

/**
 * Infinite horizontal strip. Content is duplicated once for the loop; the copy is aria-hidden.
 * Pauses on hover and focus; under reduced motion it becomes a wrapping row.
 */
export function Marquee({ children, duration = 44, reverse, className, label }: MarqueeProps) {
  return (
    <div className={cn("marquee group/m relative overflow-hidden", className)} aria-label={label} role={label ? "group" : undefined}>
      <div className="marquee-track flex w-max items-center gap-10" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : undefined }}>
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        {/* The loop copy: hidden from assistive tech and inert, so its links are never a second tab stop. */}
        <div className="flex shrink-0 items-center gap-10" aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  );
}
