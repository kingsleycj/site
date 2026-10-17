"use client";

import Link from "next/link";
import { Reveal } from "@/components/fx/Reveal";
import { Panel } from "@/components/shell/Panel";
import { Icon, SectionHeader, Tag } from "@/components/ui";
import { BuildTestTrainLoop } from "@/components/work/BuildTestTrainLoop";
import { award, certificates, closeToTheUsers, education, pathIntro, timeline } from "@/content/experience";
import { ui } from "@/content/microcopy";
import { renderCopy } from "@/lib/copy";
import { panelById } from "@/lib/panels";

const panel = panelById("path");

export function PathPanel() {
  return (
    <Panel id="path">
      <SectionHeader id="panel-path-title" number={panel.number} label="The road so far" title={pathIntro.title} intro={renderCopy(pathIntro.body)} as="h1" />

      <ol className="relative mt-8 flex flex-col border-l border-border pl-6 shell:mt-12 shell:pl-10" aria-label="Timeline">
        {timeline.map((t, i) => (
          <li key={t.id} id={t.id} className="relative pb-9 last:pb-0 shell:pb-12">
            <span className="absolute -left-6 top-2 grid h-[15px] w-[15px] -translate-x-1/2 place-items-center rounded-pill border border-border bg-surface shell:-left-10" aria-hidden>
              <span className={t.current ? "status-ring absolute inset-0 rounded-pill bg-accent" : "hidden"} />
              <span className={`relative h-2 w-2 rounded-pill ${t.current ? "bg-accent" : "bg-border-strong"}`} />
            </span>
            <Reveal delay={Math.min(i, 3) * 0.04}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Tag>{t.period}</Tag>
                {t.badge && (
                  <span className="inline-flex items-center gap-1.5 text-caption text-muted">
                    <span className="h-1.5 w-1.5 rounded-pill bg-accent" aria-hidden />
                    {t.badge}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-display-sm font-medium text-text">{t.title}</h2>
              <p className="mt-1 text-small text-muted">
                {t.orgHref ? (
                  <a href={t.orgHref} target="_blank" rel="noopener noreferrer" className="text-text underline-offset-4 hover:underline">{t.org}</a>
                ) : (
                  <span className="text-text">{t.org}</span>
                )}
                <span aria-hidden> · </span>
                {t.place}
              </p>
              <ul className="mt-4 flex max-w-[64ch] flex-col gap-2 text-body text-muted">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-pill bg-accent" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {t.award && (
                <div className="mt-5 flex max-w-[64ch] items-start gap-3 rounded-md border border-border bg-raised p-4 shadow-1">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-pill bg-accent text-accent-ink"><Icon name="bolt" size={16} /></span>
                  <div>
                    <p className="text-body font-medium text-text">{t.award.title}</p>
                    <p className="text-small text-muted">{t.award.detail} · {t.award.date}</p>
                  </div>
                </div>
              )}
              {t.project && (
                <Link href={`/work/${t.project}`} className="group mt-4 inline-flex items-center gap-1.5 text-small font-medium text-text hover:text-accent-text">
                  {ui.card.caseStudy}
                  <Icon name="arrowRight" size={14} className="transition-transform duration-(--dur) ease-out group-hover:translate-x-1" />
                </Link>
              )}
            </Reveal>
          </li>
        ))}
      </ol>

      <section id="harmonykloud-loop" className="mt-10 overflow-hidden rounded-xl border border-border bg-raised p-5 shell:mt-16 shell:p-10" aria-labelledby="close-title">
        <div className="grid gap-8 shell:grid-cols-12 shell:gap-x-8">
          <div className="shell:col-span-7">
            <p className="label">HarmonyKloud, 500+ users</p>
            <h2 id="close-title" className="mt-2 text-display-lg font-medium text-text">{closeToTheUsers.title}</h2>
            <p className="mt-4 max-w-[58ch] text-body-lg text-text">{renderCopy(closeToTheUsers.lead)}</p>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2">
              {closeToTheUsers.steps.map((s, i) => (
                <li key={s.id} className="flex flex-col gap-1.5">
                  <span className="text-caption text-muted tabular">0{i + 1}</span>
                  <h3 className="text-display-sm font-medium text-text">{s.title}</h3>
                  <p className="text-small leading-relaxed text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-small text-text">
              {closeToTheUsers.website.line}{" "}
              <a href={closeToTheUsers.website.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium underline underline-offset-4">
                {closeToTheUsers.website.label}
                <Icon name="arrowUpRight" size={12} />
              </a>
            </p>
            <p className="mt-2 text-caption text-muted">{closeToTheUsers.confidentiality}</p>
          </div>
          <div className="flex flex-col items-center gap-3 text-text shell:col-span-5">
            <BuildTestTrainLoop className="max-w-[300px]" />
            <p className="max-w-[32ch] text-center text-caption text-muted">{ui.path.loopCaption}</p>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 shell:mt-12 shell:gap-6">
        <div className="rounded-lg border border-border bg-raised p-5">
          <p className="label">{ui.path.education}</p>
          <p className="mt-2 text-body font-medium text-text">{education.degree}</p>
          <p className="text-small text-muted">{education.school}</p>
          <p className="mt-1 text-caption text-muted">{education.period} · {education.grade}</p>
        </div>
        <div className="rounded-lg border border-border bg-raised p-5">
          <p className="label">{ui.path.certificates}</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {certificates.map((c) => (
              <li key={c.title} className="flex items-baseline justify-between gap-3">
                <span className="text-body font-medium text-text">{c.title}</span>
                <span className="text-caption text-muted">{c.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-raised p-5">
          <p className="label">{ui.path.award}</p>
          <p className="mt-2 flex items-center gap-2 text-body font-medium text-text">
            <Icon name="bolt" size={14} className="text-accent-text" />
            {award.title}
          </p>
          <p className="text-small text-muted">{award.detail}, {award.issuer}</p>
          <p className="mt-1 text-caption text-muted">{award.date}</p>
        </div>
      </div>
    </Panel>
  );
}
