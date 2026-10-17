"use client";

import { Reveal } from "@/components/fx/Reveal";
import { Panel } from "@/components/shell/Panel";
import { Icon, Portrait, SectionHeader } from "@/components/ui";
import { about } from "@/content/about";
import { renderCopy } from "@/lib/copy";
import { panelById } from "@/lib/panels";

const panel = panelById("about");

export function AboutPanel() {
  return (
    <Panel id="about">
      <SectionHeader id="panel-about-title" number={panel.number} label={panel.label} title={about.title} as="h1" />

      <div className="mt-10 grid gap-10 shell:grid-cols-12 shell:gap-x-8">
        <div className="flex flex-col gap-6 shell:col-span-7">
          <div className="card-portrait relative aspect-[4/5] w-40 overflow-hidden rounded-lg shell:hidden">
            <Portrait sizes="160px" />
          </div>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="max-w-[58ch] text-body-lg text-text">{renderCopy(p)}</p>
            </Reveal>
          ))}
          <p className="mt-2 text-body text-muted">{about.traits.join(" ")}</p>
        </div>

        <aside className="flex flex-col gap-8 shell:col-span-5 shell:pl-4">
          <Reveal delay={0.1}>
            <figure className="rounded-lg border border-border bg-raised p-6 shadow-1">
              <blockquote className="font-accent text-display-md leading-[1.2] text-text">“{about.pullQuote.text}”</blockquote>
              <figcaption className="label mt-4">{about.pullQuote.label}</figcaption>
            </figure>
          </Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
            {about.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5">
                <dt className="text-caption text-muted">{f.label}</dt>
                <dd className="text-body font-medium text-text">
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent-text">
                      {f.value}
                      <Icon name="arrowUpRight" size={12} />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-2">
            <p className="label">Comfortable across</p>
            <p className="text-body text-text">{about.comfortableAcross.join(" · ")}</p>
          </div>
        </aside>
      </div>
    </Panel>
  );
}
