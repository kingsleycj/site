import Link from "next/link";
import { FounderBadge, Icon, PillButton, Portrait, StatusBadge, ThemeToggle } from "@/components/ui";
import { ui } from "@/content/microcopy";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import type { Project } from "@/content/types";
import { AbstractScreen } from "./AbstractScreen";
import { ScreenSwitcher } from "./ScreenSwitcher";

const linkIcon = { live: "arrowUpRight", source: "github", download: "download", contract: "contract", telegram: "telegram" } as const;

const story: { key: "problem" | "hardPart" | "built" | "standing"; label: string }[] = [
  { key: "problem", label: ui.work.sections.problem },
  { key: "hardPart", label: ui.work.sections.hardPart },
  { key: "built", label: ui.work.sections.built },
  { key: "standing", label: ui.work.sections.standing },
];

/**
 * A case-study page, structured the way agency work pages are: a title block with the facts in
 * one row, one hero composition (desktop and phone side by side), the story in a reading
 * column, the stack, links, and the next project. Nothing is shown twice.
 */
export function CaseStudy({ project: p }: { project: Project }) {
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const hasDesktop = p.screens.some((s) => s.device === "desktop");

  return (
    <div className="min-h-dvh bg-surface">
      <header className="sticky top-0 z-30">
        <div className="glass flex items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link href="/work" className="group inline-flex items-center gap-2 text-small font-medium text-text">
            <Icon name="arrowLeft" size={16} className="transition-transform duration-(--dur) ease-out group-hover:-translate-x-1" />
            {ui.work.allWork}
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden items-center gap-2 sm:inline-flex">
              <Portrait variant="avatar" size={28} alt="" />
              <span className="text-small font-medium text-text">{site.name}</span>
            </Link>
            <FounderBadge variant="compact" />
            <ThemeToggle size={36} />
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[1240px] px-5 sm:px-8 shell:px-12">
        {/* Title block */}
        <section className="pt-12 shell:pt-16">
          <p className="text-caption text-muted">
            {(i + 1).toString().padStart(2, "0")} / {projects.length.toString().padStart(2, "0")}
          </p>
          <h1 className="mt-3 text-display-xl font-medium text-text">{p.name}</h1>
          <p className="mt-2 max-w-[28ch] text-display-md text-muted">{p.kicker}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-5 sm:grid-cols-4">
            <div><dt className="text-caption text-muted">Period</dt><dd className="mt-1 text-small font-medium text-text">{p.period}</dd></div>
            <div><dt className="text-caption text-muted">Role</dt><dd className="mt-1 text-small font-medium text-text">{p.role}</dd></div>
            <div><dt className="text-caption text-muted">{p.group === "client" ? "For" : "Kind"}</dt><dd className="mt-1 text-small font-medium text-text">{p.group === "client" ? "A client" : p.isStartup ? "My startup" : "A product"}</dd></div>
            <div><dt className="text-caption text-muted">Status</dt><dd className="mt-1"><StatusBadge kind={p.status.kind} label={p.status.label} note={p.status.note} className="text-small font-medium" /></dd></div>
          </dl>
        </section>

        {/* One hero composition: desktop and phone side by side; one at a time behind a toggle on phones */}
        <section className="mt-8 shell:mt-10" aria-label="Screens">
          {hasDesktop ? <ScreenSwitcher screens={p.screens} /> : <AbstractScreen project={p} className="aspect-[21/9]" />}
        </section>

        {/* Overview and links */}
        <section className="grid gap-8 border-b border-border py-12 shell:grid-cols-12 shell:gap-x-10 shell:py-16">
          <h2 className="text-display-sm font-medium text-text shell:col-span-3">Overview</h2>
          <div className="flex flex-col gap-6 shell:col-span-9">
            <p className="max-w-[62ch] text-display-sm font-normal leading-snug text-text">{p.summary}</p>
            <div className="flex flex-wrap items-center gap-3">
              {p.links.map((l, k) => (
                <PillButton key={l.href} href={l.href} tone={k === 0 ? "primary" : "secondary"} icon={linkIcon[l.kind]} arrow={k === 0 ? "leading" : "none"}>
                  {l.label}
                </PillButton>
              ))}
            </div>
          </div>
        </section>

        {/* The story, in a reading column */}
        {story.map((s) => (
          <section key={s.key} className="grid gap-4 border-b border-border py-12 shell:grid-cols-12 shell:gap-x-10 shell:py-16" aria-labelledby={`cs-${s.key}`}>
            <h2 id={`cs-${s.key}`} className="text-display-sm font-medium text-text shell:col-span-3">{s.label}</h2>
            <div className="flex flex-col gap-5 shell:col-span-9">
              {p[s.key].map((para) => (
                <p key={para} className="max-w-[64ch] text-body-lg text-text">{para}</p>
              ))}
              {s.key === "standing" && <p className="max-w-[64ch] text-small text-muted">{p.status.note}</p>}
            </div>
          </section>
        ))}

        {p.stack.length > 0 && (
          <section className="grid gap-4 border-b border-border py-12 shell:grid-cols-12 shell:gap-x-10" aria-labelledby="cs-stack">
            <h2 id="cs-stack" className="text-display-sm font-medium text-text shell:col-span-3">{ui.work.sections.stack}</h2>
            <p className="max-w-[64ch] text-body text-muted shell:col-span-9">{p.stack.join(", ")}.</p>
          </section>
        )}

        {/* Next and previous */}
        <nav aria-label="More work" className="grid min-w-0 gap-4 py-12 sm:grid-cols-2 shell:py-16">
          {[{ q: prev, label: ui.work.prevProject }, { q: next, label: ui.work.nextProject }].map(({ q, label }) => (
            <Link key={q.slug} href={`/work/${q.slug}`} className="group flex min-w-0 items-center justify-between gap-4 overflow-hidden rounded-lg border border-border bg-raised p-5 transition-colors hover:border-border-strong">
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-caption text-muted">{label}</span>
                <span className="text-display-sm font-medium text-text">{q.name}</span>
                <span className="truncate text-small text-muted">{q.kicker}</span>
              </span>
              <Icon name="arrowRight" size={18} className="shrink-0 text-muted transition-transform duration-(--dur) ease-out group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>
      </main>

      <footer className="border-t border-border px-5 py-8 sm:px-8 shell:px-12">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 text-caption text-muted">
          <span>{ui.footer.rights} · {site.copyrightYear}</span>
          <Link href="/" className="inline-flex items-center gap-1.5 text-text hover:text-accent-text">
            {ui.notFound.home}
            <Icon name="arrowRight" size={13} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
