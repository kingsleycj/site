import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface FounderBadgeProps {
  variant?: "pill" | "inline" | "compact";
  className?: string;
}

/** "Building HumStage ↗": always a link to humstage.app in a new tab, with a live dot. */
export function FounderBadge({ variant = "pill", className }: FounderBadgeProps) {
  const { badge, href, badgeHint } = site.humstage;
  const dot = (
    <span className="relative grid h-2.5 w-2.5 place-items-center" aria-hidden>
      <span className="status-ring absolute inset-0 rounded-pill bg-accent" />
      <span className="relative h-2 w-2 rounded-pill bg-accent" />
    </span>
  );
  if (variant === "inline") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" title={badgeHint} className={cn("group inline-flex items-center gap-2 font-medium text-text transition-colors hover:text-accent-text", className)}>
        {dot}
        <span>{badge}</span>
        <Icon name="arrowUpRight" size={14} className="transition-transform duration-(--dur) ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  if (variant === "compact") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" title={badgeHint} className={cn("group inline-flex h-8 items-center gap-2 rounded-pill bg-accent pl-2.5 pr-3 text-caption font-semibold text-accent-ink", className)}>
        <span className="relative h-1.5 w-1.5 rounded-pill bg-accent-ink" aria-hidden />
        <span>HumStage</span>
        <Icon name="arrowUpRight" size={12} />
        <span className="sr-only">Building HumStage (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={badgeHint}
      className={cn(
        "group inline-flex h-10 items-center gap-2.5 rounded-pill border border-border bg-raised pl-3 pr-3.5 text-small font-medium text-text shadow-1 transition-[border-color,transform] duration-(--dur) ease-out hover:border-border-strong active:scale-[0.98]",
        className,
      )}
    >
      {dot}
      <span>{badge}</span>
      <Icon name="arrowUpRight" size={14} className="text-muted transition-transform duration-(--dur) ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
