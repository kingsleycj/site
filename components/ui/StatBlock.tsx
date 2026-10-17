import Link from "next/link";
import type { Stat } from "@/content/types";
import { cn } from "@/lib/cn";
import { Counter } from "@/components/fx/Counter";

/** Big number, small label, like the reference's "10+ Year of experience". */
export function StatBlock({ stat, className, delay = 0 }: { stat: Stat; className?: string; delay?: number }) {
  const inner = (
    <>
      <span className="flex items-baseline text-stat font-medium leading-none text-text tabular">
        {stat.prefix}
        <Counter value={stat.value} delay={delay} />
        {stat.suffix}
      </span>
      <span className="whitespace-nowrap text-small text-muted">{stat.label}</span>
    </>
  );
  const classes = cn("group flex flex-col gap-1.5", className);
  return stat.href ? (
    <Link href={stat.href} className={cn(classes, "rounded-md")}>
      {inner}
    </Link>
  ) : (
    <div className={classes}>{inner}</div>
  );
}
