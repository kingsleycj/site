"use client";

import Link from "next/link";
import { useState } from "react";
import { FounderBadge, Icon, PillButton, Portrait, StatusBadge, type IconName } from "@/components/ui";
import { scrollToProject } from "@/components/work/WorkGrid";
import { about } from "@/content/about";
import { award, education, timeline } from "@/content/experience";
import { ui } from "@/content/microcopy";
import { now } from "@/content/now";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { toolkit } from "@/content/toolkit";
import { CareerStrip } from "./CareerStrip";
import { useShell } from "./ShellContext";

/* Each state is the one thing a visitor would ask the card about on that panel. */

const socials: { icon: IconName; label: string; href: string }[] = [
  { icon: "x", label: "X", href: site.contact.x.href },
  { icon: "linkedin", label: "LinkedIn", href: site.contact.linkedin.href },
  { icon: "instagram", label: "Instagram", href: site.contact.instagram.href },
];

function Socials({ className }: { className?: string }) {
  return (
    <ul className={className} aria-label="Social links">
      {socials.map((s) => (
        <li key={s.label}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} title={s.label} className="grid h-9 w-9 place-items-center rounded-pill border border-border bg-raised text-text transition-colors hover:bg-overlay">
            <Icon name={s.icon} size={15} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function HomeState() {
  return (
    <div className="flex h-full flex-col">
      <div className="card-portrait relative min-h-0 flex-[1.15]">
        <Socials className="absolute right-4 top-4 z-10 flex flex-col gap-2" />
        <Portrait priority />
      </div>
      <div className="flex flex-col gap-4 px-7 pb-7 pt-5">
        <div className="flex flex-col gap-2">
          <p className="text-display-sm font-medium text-text">{site.greeting}</p>
          <p className="text-small text-muted">{site.bio}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <PillButton href="/contact" className="h-11">{ui.card.talk}</PillButton>
          <a href={site.contact.resume.href} download className="inline-flex items-center gap-1.5 text-small font-medium text-text underline-offset-4 hover:underline">
            <Icon name="download" size={15} />
            {ui.card.resume}
          </a>
        </div>
        <FounderBadge className="self-start" />
      </div>
    </div>
  );
}

export function AboutState() {
  return (
    <div className="flex h-full flex-col gap-6 px-7 py-7">
      <div className="card-portrait relative aspect-square w-32 overflow-hidden rounded-lg">
        <Portrait sizes="128px" />
      </div>
      <dl className="flex flex-col divide-y divide-border">
        {about.facts.map((f) => (
          <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-caption text-muted">{f.label}</dt>
            <dd className="text-right text-small font-medium text-text">
              {f.href ? (
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent-text">
                  {f.value}
                  <Icon name="arrowUpRight" size={12} />
                </a>
              ) : (
                f.value
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-auto text-small text-muted">{about.traits.join(" ")}</p>
    </div>
  );
}

export function PathState() {
  const current = timeline.filter((t) => t.current);
  return (
    <div className="flex h-full flex-col gap-5 px-7 py-7">
      <p className="label">Right now, in parallel</p>
      <ul className="flex flex-col divide-y divide-border">
        {current.map((t) => (
          <li key={t.id} className="flex flex-col gap-0.5 py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-small font-medium text-text">{t.title}</span>
              <span className="inline-flex items-center gap-1.5 text-caption text-muted">
                <span className="h-1.5 w-1.5 rounded-pill bg-accent" aria-hidden />
                {t.badge}
              </span>
            </div>
            <span className="text-caption text-muted">
              {t.orgHref ? (
                <a href={t.orgHref} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-text hover:underline">{t.org}</a>
              ) : (
                t.org
              )}
              {" · "}
              {t.period}
            </span>
          </li>
        ))}
      </ul>
      <CareerStrip className="mt-1" />
      <div className="mt-2 flex items-start gap-3 rounded-md border border-border bg-sunken p-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-pill bg-accent text-accent-ink"><Icon name="bolt" size={14} /></span>
        <div className="flex flex-col">
          <span className="text-small font-medium text-text">{award.title}</span>
          <span className="text-caption text-muted">{award.detail}, {award.issuer} · {award.date}</span>
        </div>
      </div>
      <dl className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4">
        <dt className="text-caption text-muted">Education</dt>
        <dd className="text-small font-medium text-text">{education.degree}</dd>
        <dd className="text-caption text-muted">{education.school} · {education.period}</dd>
      </dl>
    </div>
  );
}

export function WorkState() {
  const { workIndex, setWorkIndex } = useShell();
  const p = projects[workIndex] ?? projects[0];
  const n = projects.length;
  const pad = (v: number) => v.toString().padStart(2, "0");
  return (
    <div className="flex h-full flex-col gap-5 px-7 py-7">
      <div className="flex flex-col gap-2">
        <h2 className="text-display-md font-medium text-text">{p.name}</h2>
        <p className="text-body text-muted">{p.summary}</p>
      </div>
      <dl className="flex flex-col gap-4">
        <div><dt className="text-caption text-muted">Year</dt><dd className="text-body font-medium text-text">{p.year}</dd></div>
        <div><dt className="text-caption text-muted">Role</dt><dd className="text-body font-medium text-text">{p.role}</dd></div>
        <div><dt className="text-caption text-muted">Status</dt><dd className="pt-0.5"><StatusBadge kind={p.status.kind} label={p.status.label} note={p.status.note} /></dd></div>
        {p.group === "client" && <div><dt className="text-caption text-muted">For</dt><dd className="text-body font-medium text-text">A client</dd></div>}
      </dl>
      <div className="mt-auto flex items-center justify-between gap-3">
        <PillButton href={`/work/${p.slug}`} className="h-11">{ui.card.viewProject}</PillButton>
        <div className="flex items-center gap-2">
          <button type="button" aria-label={ui.work.prevProject} onClick={() => { const i = (workIndex - 1 + n) % n; setWorkIndex(i); scrollToProject(i); }} className="grid h-8 w-8 place-items-center rounded-pill text-muted transition-colors hover:bg-sunken hover:text-text">
            <Icon name="chevronLeft" size={14} />
          </button>
          <span className="text-caption text-muted tabular" aria-live="polite">
            {pad(workIndex + 1)}&thinsp;/&thinsp;{pad(n)}
          </span>
          <button type="button" aria-label={ui.work.nextProject} onClick={() => { const i = (workIndex + 1) % n; setWorkIndex(i); scrollToProject(i); }} className="grid h-8 w-8 place-items-center rounded-pill text-muted transition-colors hover:bg-sunken hover:text-text">
            <Icon name="chevronRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ToolkitState() {
  return (
    <div className="flex h-full flex-col gap-5 px-7 py-7">
      <p className="label">Six groups</p>
      <ol className="flex flex-col divide-y divide-border">
        {toolkit.map((g) => (
          <li key={g.id} className="flex flex-col gap-0.5 py-3">
            <span className="text-small font-medium text-text">{g.title}</span>
            <span className="text-caption text-muted">{g.line}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function NowState() {
  return (
    <div className="flex h-full flex-col gap-5 px-7 py-7">
      <div className="flex flex-col gap-1">
        <p className="label">On my desk</p>
        <p className="text-display-md font-medium text-text">{now.month}</p>
      </div>
      <ol className="flex flex-col divide-y divide-border">
        {now.items.map((item, i) => (
          <li key={item.title} className="flex items-baseline gap-3 py-3">
            <span className="text-caption text-muted tabular">{(i + 1).toString().padStart(2, "0")}</span>
            <span className="text-small font-medium text-text">{item.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ContactState() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {}
  };
  const rows: { icon: IconName; label: string; href: string; external?: boolean }[] = [
    { icon: "whatsapp", label: ui.contact.whatsapp, href: site.contact.whatsapp.href, external: true },
    { icon: "github", label: ui.contact.github, href: site.contact.github.href, external: true },
    { icon: "linkedin", label: ui.contact.linkedin, href: site.contact.linkedin.href, external: true },
    { icon: "x", label: ui.contact.x, href: site.contact.x.href, external: true },
    { icon: "instagram", label: ui.contact.instagram, href: site.contact.instagram.href, external: true },
    { icon: "phone", label: ui.contact.phone, href: site.contact.phone.href },
  ];
  return (
    <div className="flex h-full flex-col gap-6 px-7 py-7">
      <p className="label">{ui.contact.email}</p>
      <a href={`mailto:${site.contact.email}`} className="break-all text-display-sm font-medium text-text underline-offset-4 hover:underline">
        {site.contact.email}
      </a>
      <button type="button" onClick={copy} className="inline-flex h-10 items-center gap-2 self-start rounded-pill border border-border bg-sunken px-4 text-small font-medium text-text transition-colors hover:border-border-strong">
        <Icon name={copied ? "check" : "copy"} size={15} />
        <span aria-live="polite">{copied ? ui.contact.copied : ui.contact.copy}</span>
      </button>
      <ul className="mt-auto flex flex-col divide-y divide-border">
        {rows.map((r) => (
          <li key={r.label} className="py-2.5">
            <a href={r.href} target={r.external ? "_blank" : undefined} rel={r.external ? "noopener noreferrer" : undefined} className="flex items-center gap-3 text-small text-text hover:text-accent-text">
              <Icon name={r.icon} size={16} />
              <span>{r.label}</span>
              <Icon name={r.external ? "arrowUpRight" : "arrowRight"} size={13} className="ml-auto text-muted" />
              {r.external && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          </li>
        ))}
        <li className="py-2.5">
          <Link href={site.contact.resume.href} className="flex items-center gap-3 text-small text-text hover:text-accent-text">
            <Icon name="download" size={16} />
            <span>{ui.contact.resume}</span>
            <Icon name="arrowRight" size={13} className="ml-auto text-muted" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
