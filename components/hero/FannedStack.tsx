"use client";

import { motion } from "motion/react";
import { useShell } from "@/components/shell/ShellContext";
import { ProjectPreview } from "@/components/work/ProjectPreview";
import { ui } from "@/content/microcopy";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

/* x is the left offset in % for phones (cards 52% wide) and for the shell (cards 36% wide). */
const poses = [
  { rotate: -9, xm: 0, xd: 0, y: 24 },
  { rotate: -4, xm: 12, xd: 15, y: 10 },
  { rotate: 2, xm: 24, xd: 30, y: 0 },
  { rotate: 7, xm: 36, xd: 45, y: 8 },
  { rotate: 12, xm: 48, xd: 60, y: 22 },
];

/** The hero's second state: the five projects with real screenshots, fanned like dealt cards, HumStage on top. */
export function FannedStack({ className }: { className?: string }) {
  const { go, setWorkIndex } = useShell();
  const five = projects.filter((p) => p.screens.some((s) => s.device === "desktop")).slice(0, 5);
  return (
    <div className={cn("relative flex min-h-0 flex-col", className)}>
      <p className="label mb-3 shrink-0">{ui.hero.stackHint}</p>
      <ul className="stack-box relative aspect-[16/10] w-full shell:aspect-[2.9/1]" role="list">
        {five.map((p, i) => {
          const pose = poses[i];
          const index = projects.indexOf(p);
          return (
            <motion.li
              key={p.slug}
              className="absolute top-0 w-[52%] left-(--xm) shell:w-[36%] shell:left-(--xd)"
              style={{ zIndex: five.length - i, "--xm": `${pose.xm}%`, "--xd": `${pose.xd}%` } as React.CSSProperties}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              animate={{ opacity: 1, y: pose.y, rotate: pose.rotate }}
              transition={{ ...spring.stage, delay: 0.06 * i }}
              whileHover={{ y: pose.y - 14, rotate: pose.rotate * 0.4, scale: 1.03, zIndex: 20 }}
            >
              <a
                href={`/work/${p.slug}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey) return;
                  e.preventDefault();
                  setWorkIndex(index);
                  go("work");
                }}
                className="block rounded-lg shadow-2 outline-offset-4"
                aria-label={`${p.name}: ${p.kicker}. ${p.status.label}.`}
              >
                <ProjectPreview project={p} priority={i === 0} />
              </a>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
