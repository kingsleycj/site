import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * For the two projects that live in a chat window and a block explorer: a dark card with the
 * name set large, the way the reference shows "DRONE". No colour world, no decoration.
 */
export function AbstractScreen({ project, className, compact }: { project: Project; className?: string; compact?: boolean }) {
  return (
    <div
      className={cn("relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-lg bg-[#0b0b0b] p-5 text-[#f2f2f2] sm:p-7", className)}
      style={{ background: "radial-gradient(80% 60% at 50% 100%, #1b1b1b, #0b0b0b 70%)" }}
      aria-label={`${project.name}: ${project.kicker}`}
      role="img"
    >
      <span className="text-caption text-[#9a9a9a]">{project.status.label}</span>
      <span className={cn("font-semibold leading-[0.95] tracking-[-0.04em]", compact ? "text-[2.4rem]" : "text-[clamp(2.75rem,7vw,6rem)]")}>{project.name}</span>
    </div>
  );
}
