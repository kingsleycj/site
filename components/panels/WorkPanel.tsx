"use client";

import Link from "next/link";
import { Panel } from "@/components/shell/Panel";
import { Icon, SectionHeader } from "@/components/ui";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ui } from "@/content/microcopy";
import { projects, smallProjects } from "@/content/projects";
import { panelById } from "@/lib/panels";

const panel = panelById("work");

export function WorkPanel() {
  return (
    <Panel id="work">
      <SectionHeader id="panel-work-title" number={panel.number} label={ui.work.label} title={ui.work.title} intro={ui.work.intro} as="h1" />

      <div className="mt-8">
        <WorkGrid />
      </div>

      {/* The list, the way reference-2 does it: number, name, role, year. */}
      <ol className="mt-12 hidden divide-y divide-border border-y border-border shell:block" aria-label="All projects">
        {projects.map((pr, i) => (
          <li key={pr.slug}>
            <Link href={`/work/${pr.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-3.5 sm:grid-cols-[2.5rem_1fr_1fr_auto]">
              <span className="text-caption text-muted tabular">{(i + 1).toString().padStart(2, "0")}</span>
              <span className="text-body font-medium text-text group-hover:text-accent-text">{pr.name}</span>
              <span className="hidden text-small text-muted sm:block">{pr.role}</span>
              <span className="text-caption text-muted tabular">{pr.year}</span>
            </Link>
          </li>
        ))}
      </ol>

      <section className="mt-10 shell:mt-14" aria-labelledby="more-title">
        <h2 id="more-title" className="text-display-sm font-medium text-text">{ui.work.moreLabel}</h2>
        <ul className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {smallProjects.map((s) => (
            <li key={s.name} className="flex flex-col gap-1 border-t border-border pt-4">
              {s.href ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-body font-medium text-text hover:text-accent-text">
                  {s.name}
                  <Icon name="arrowUpRight" size={13} className="text-muted transition-transform duration-(--dur) ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">({ui.card.newTab})</span>
                </a>
              ) : (
                <span className="text-body font-medium text-text">{s.name}</span>
              )}
              <p className="text-small text-muted">{s.blurb}</p>
            </li>
          ))}
        </ul>
      </section>
    </Panel>
  );
}
