"use client";

import Link from "next/link";
import { m } from "motion/react";
import { useShell } from "@/components/shell/ShellContext";
import { Icon, StatusBadge, shortStatus } from "@/components/ui";
import { ui } from "@/content/microcopy";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { ProjectPreview } from "./ProjectPreview";

/**
 * Work highlights as a grid straight on the stage, no backdrop. Each tile is one bordered card:
 * the screenshot, then a slim caption bar with the name and the status. Hovering lifts and
 * enlarges it, the profile card follows the hovered project, and a click opens the case study.
 */
export function WorkGrid() {
  const { workIndex, setWorkIndex } = useShell();
  return (
    <section aria-label={ui.work.label}>
      <p className="mb-4 flex items-center gap-2 text-caption text-muted">
        <Icon name="sparkle" size={13} />
        {ui.work.highlights}
      </p>
      <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 wide:grid-cols-3" aria-label="Projects">
        {projects.map((p, i) => {
          const active = i === workIndex;
          return (
            <m.li
              key={p.slug}
              id={`project-${p.slug}`}
              data-index={i}
              data-reveal=""
              className="relative rounded-lg"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(i % 3, 2) * 0.06 } }}
              viewport={{ once: true, margin: "-6% 0px" }}
              whileHover={{ scale: 1.025, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={spring.hover}
              onPointerEnter={() => setWorkIndex(i)}
              onFocus={() => setWorkIndex(i)}
            >
              <Link
                href={`/work/${p.slug}`}
                className={cn("group block overflow-hidden rounded-lg border border-border bg-raised outline-offset-4 transition-shadow duration-(--dur) ease-out hover:shadow-2", active && "shadow-2")}
              >
                <ProjectPreview project={p} variant="card" priority={i === 0} className="rounded-none border-0" />
                <div className="flex h-10 items-center justify-between gap-3 border-t border-border px-3.5">
                  <span className="min-w-0 truncate text-small font-medium text-text">{p.name}</span>
                  <StatusBadge kind={p.status.kind} label={shortStatus[p.status.kind]} note={p.status.note} className="shrink-0 text-muted" />
                </div>
              </Link>
            </m.li>
          );
        })}
      </ol>
    </section>
  );
}

/** Bring a project tile into view: the panel scrolls on the shell, the window on phones. */
export function scrollToProject(index: number) {
  const p = projects[index];
  document.getElementById(`project-${p.slug}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
}
