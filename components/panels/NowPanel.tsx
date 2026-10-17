"use client";

import Link from "next/link";
import { Reveal } from "@/components/fx/Reveal";
import { Panel } from "@/components/shell/Panel";
import { Icon, SectionHeader } from "@/components/ui";
import { ui } from "@/content/microcopy";
import { now } from "@/content/now";
import { panelById } from "@/lib/panels";

const panel = panelById("now");

export function NowPanel() {
  return (
    <Panel id="now">
      <SectionHeader id="panel-now-title" number={panel.number} label={ui.now.label} title={now.title} intro={<span className="text-small text-muted">{now.month}</span>} as="h1" />
      <ol className="mt-10 grid gap-x-10 gap-y-10 shell:grid-cols-2">
        {now.items.map((item, i) => (
          <li key={item.title} className="relative border-t border-border pt-5">
            <Reveal delay={i * 0.05}>
              <div className="flex items-start gap-5">
                <span className="text-display-md font-medium leading-none text-muted tabular" aria-hidden>
                  0{i + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h2 className="text-display-sm font-medium text-text">{item.title}</h2>
                  <p className="max-w-[52ch] text-body text-muted">{item.body}</p>
                  {item.project && (
                    <Link href={`/work/${item.project}`} className="group mt-1 inline-flex items-center gap-1 text-small font-medium text-text hover:text-accent-text">
                      {ui.card.viewProject}
                      <Icon name="arrowRight" size={13} className="transition-transform duration-(--dur) ease-out group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
