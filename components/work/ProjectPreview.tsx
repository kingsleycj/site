import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { AbstractScreen } from "./AbstractScreen";
import { ThemedScreen } from "./ThemedScreen";

export interface ProjectPreviewProps {
  project: Project;
  /** card: a rounded screenshot for stacks and grids; stage: the big card on Work. */
  variant?: "card" | "stage";
  priority?: boolean;
  className?: string;
}

/** A project's face: the real desktop capture with a hairline border, or the typographic card when there is none. */
export function ProjectPreview({ project, variant = "card", priority, className }: ProjectPreviewProps) {
  const hasDesktop = project.screens.some((s) => s.device === "desktop");
  if (!hasDesktop) return <AbstractScreen project={project} className={className} compact={variant === "card"} />;
  return (
    <div className={cn("relative overflow-hidden rounded-lg border border-border bg-[#0b0b0b]", className)}>
      <ThemedScreen
        screens={project.screens}
        priority={priority}
        sizes={variant === "stage" ? "(min-width: 1024px) 34vw, 100vw" : "(min-width: 1024px) 26vw, 60vw"}
        imgClassName="aspect-[16/10] w-full object-cover object-top"
      />
    </div>
  );
}
