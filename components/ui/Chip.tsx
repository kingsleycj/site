import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Variant = "hero" | "tonal" | "filled" | "outline";
type Size = "sm" | "md" | "lg" | "display";

const variants: Record<Variant, string> = {
  /** The headline's filled chip: the reference's green with white text. Display size only. */
  hero: "bg-accent-chip text-white",
  /** The headline's second chip: dark with green text, as in the reference. */
  tonal: "bg-tonal text-(--tonal-accent)",
  /** Small green pill with dark ink, for buttons and badges. */
  filled: "bg-accent text-accent-ink",
  outline: "border border-border text-text",
};

const sizes: Record<Size, string> = {
  sm: "h-6 px-2.5 text-caption",
  md: "h-8 px-3.5 text-small",
  lg: "h-10 px-4 text-body",
  display: "px-[0.42em] pb-[0.08em] leading-none",
};

export type ChipProps<T extends ElementType = "span"> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/** A pill. `size="display"` is the headline chip: it inherits the headline's font-size and sits inline. */
export function Chip<T extends ElementType = "span">({ as, variant = "outline", size = "md", className, ...rest }: ChipProps<T>) {
  const Tag = (as ?? "span") as ElementType;
  return <Tag className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill align-middle font-medium", variants[variant], sizes[size], className)} {...rest} />;
}
