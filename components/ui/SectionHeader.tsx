import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  number: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  size?: "lg" | "md";
  className?: string;
  id?: string;
}

/** The `(01)—Label` eyebrow from the current site, then the title. The numbers are real panel order. */
export function SectionHeader({ number, label, title, intro, as = "h2", size = "lg", className, id }: SectionHeaderProps) {
  const Heading = as;
  return (
    <header className={cn("flex flex-col gap-3", className)}>
      <p className="label flex items-center gap-1">
        <span className="tabular">({number})</span>
        <span aria-hidden>—</span>
        <span>{label}</span>
      </p>
      <Heading id={id} className={cn("font-medium text-text", size === "lg" ? "text-display-lg" : "text-display-md")}>{title}</Heading>
      {intro && <p className="max-w-[60ch] text-body-lg text-muted">{intro}</p>}
    </header>
  );
}
