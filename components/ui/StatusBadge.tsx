import type { StatusKind } from "@/content/types";
import { ui } from "@/content/microcopy";
import { cn } from "@/lib/cn";

export interface StatusBadgeProps {
  kind: StatusKind;
  label: string;
  note?: string;
  /** Plain text with a dot (default) or a small bordered pill. */
  pill?: boolean;
  className?: string;
}

const on = new Set<StatusKind>(["live", "shipped", "building"]);

/** One word per kind, for tight places like the Work tiles. */
export const shortStatus: Record<StatusKind, string> = { live: "Live", devnet: "Devnet", testnet: "Testnet", beta: "Beta", shipped: "Shipped", building: "Building" };

/** Live / Devnet / Testnet / Beta / Shipped: a dot and a word. Green means running; gray means not yet. */
export function StatusBadge({ kind, label, note, pill, className }: StatusBadgeProps) {
  const colour = on.has(kind) ? "var(--status-on)" : "var(--status-off)";
  const pulses = kind === "live" || kind === "building";
  return (
    <span
      className={cn("inline-flex items-start gap-2 text-caption text-text tabular", pill && "h-7 items-center rounded-pill border border-border px-2.5", className)}
      title={note ?? ui.status[kind]}
    >
      <span className="relative mt-[calc(0.5lh-0.3125rem)] grid h-2.5 w-2.5 shrink-0 place-items-center self-start" aria-hidden>
        {pulses && <span className="status-ring absolute inset-0 rounded-pill" style={{ background: colour }} />}
        <span className="relative h-2 w-2 rounded-pill" style={{ background: colour }} />
      </span>
      <span>{label}</span>
      {note && <span className="sr-only">. {note}</span>}
    </span>
  );
}
