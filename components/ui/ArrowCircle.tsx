import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export interface ArrowCircleProps {
  icon?: IconName;
  tone?: "accent" | "tonal" | "ghost";
  size?: number;
  className?: string;
}

const tones = {
  accent: "bg-accent text-accent-ink",
  tonal: "bg-sunken text-text",
  ghost: "bg-raised text-text border border-border",
};

/** The round arrow inside a pill button. Rotates towards the pointer on hover via the parent's group class. */
export function ArrowCircle({ icon = "arrowUpRight", tone = "accent", size = 36, className }: ArrowCircleProps) {
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-pill transition-transform duration-(--dur) ease-out group-hover:rotate-45 group-active:scale-90", tones[tone], className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Icon name={icon} size={Math.round(size * 0.5)} />
    </span>
  );
}
