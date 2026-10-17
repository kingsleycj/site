import { cn } from "@/lib/cn";

/** Tiny label for metadata: dates and the odd "Shipped for a client". */
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex h-6 items-center rounded-xs bg-sunken px-1.5 text-micro text-muted tabular", className)}>{children}</span>;
}
