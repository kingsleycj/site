"use client";

import { Panel } from "@/components/shell/Panel";
import { SectionHeader } from "@/components/ui";
import { ui } from "@/content/microcopy";
import { toolkit, toolkitIntro } from "@/content/toolkit";
import { panelById } from "@/lib/panels";

const panel = panelById("toolkit");

/** Six groups, each a sentence of tools. No chips, no scores. */
export function ToolkitPanel() {
  return (
    <Panel id="toolkit">
      <SectionHeader id="panel-toolkit-title" number={panel.number} label={ui.toolkit.label} title={toolkitIntro.title} intro={toolkitIntro.body} as="h1" />
      <div className="mt-8 flex flex-col">
        {toolkit.map((g) => (
          <section key={g.id} className="grid gap-3 border-t border-border py-7 shell:grid-cols-12 shell:gap-x-8" aria-labelledby={`tk-${g.id}`}>
            <div className="shell:col-span-4">
              <h2 id={`tk-${g.id}`} className="text-display-sm font-medium text-text">{g.title}</h2>
              <p className="mt-1.5 max-w-[34ch] text-small text-muted">{g.line}</p>
            </div>
            <p className="max-w-[62ch] text-body leading-relaxed text-text shell:col-span-8">{g.tools.join(" · ")}</p>
          </section>
        ))}
      </div>
    </Panel>
  );
}
