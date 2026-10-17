import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface PagerButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  direction: "prev" | "next" | "up";
  label: string;
  size?: number;
}

/** Round button for moving between panels or projects. Solid, like the reference's. */
export function PagerButton({ direction, label, size = 48, className, ...rest }: PagerButtonProps) {
  const icon = direction === "prev" ? "chevronLeft" : direction === "next" ? "chevronRight" : "chevronUp";
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "relative grid place-items-center rounded-pill border border-border bg-raised text-text shadow-1 transition-[transform,background-color,opacity,border-color,box-shadow] duration-(--dur) ease-out hover:bg-overlay active:scale-95 disabled:cursor-not-allowed disabled:opacity-35",
        className,
      )}
      style={{ width: size, height: size }}
      {...rest}
    >
      <Icon name={icon} size={Math.round(size * 0.42)} />
    </button>
  );
}
