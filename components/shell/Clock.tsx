"use client";

import { useEffect, useState } from "react";
import { ui } from "@/content/microcopy";
import { cn } from "@/lib/cn";

/** Date and time in Lagos, rendered only after mount so the server and client never disagree. */
export function Clock({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  const date = now ? new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Africa/Lagos" }).format(now) : "";
  const time = now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Lagos" }).format(now) : "";
  return (
    <time className={cn("flex min-w-[5.5rem] flex-col items-end text-caption leading-tight text-muted tabular", className)} dateTime={now?.toISOString()} title={ui.clock.label} suppressHydrationWarning>
      <span>{date || " "}</span>
      <span>{time || " "}</span>
    </time>
  );
}
