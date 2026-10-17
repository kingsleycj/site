import { StatBlock } from "@/components/ui";
import { homeStatCount, stats } from "@/content/site";
import { cn } from "@/lib/cn";

/** Two numbers, like the reference. The rest live in the case studies. */
export function Stats({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-14 gap-y-6", className)} aria-label="By the numbers">
      {stats.slice(0, homeStatCount).map((s, i) => (
        <li key={s.label}>
          <StatBlock stat={s} delay={0.08 * i} />
        </li>
      ))}
    </ul>
  );
}
