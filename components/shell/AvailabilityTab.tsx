"use client";

import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { useShell } from "./ShellContext";

/** The "Open to what's next" tab on the left edge of the screen, like the reference's "Available for work". Goes to Contact. */
export function AvailabilityTab({ className }: { className?: string }) {
  const { go } = useShell();
  return (
    <aside aria-label="Availability">
    <a
      href="/contact"
      onClick={(e) => {
        e.preventDefault();
        go("contact");
      }}
      className={cn(
        "fixed left-0 top-1/2 z-20 flex h-48 w-10 -translate-y-1/2 items-center justify-center rounded-r-[14px] bg-[#1a1a1a] text-[#d6d6d6] shadow-2 transition-colors hover:text-white",
        className,
      )}
      aria-label={`${site.availability}. Go to contact.`}
    >
      <span className="flex items-center gap-3 [writing-mode:vertical-rl]" style={{ rotate: "180deg" }}>
        <span className="h-2 w-2 rounded-pill bg-accent" aria-hidden />
        <span className="text-caption font-medium">{site.availability}</span>
      </span>
    </a>
    </aside>
  );
}
