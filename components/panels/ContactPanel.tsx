"use client";

import Link from "next/link";
import { useState } from "react";
import { Panel } from "@/components/shell/Panel";
import { useShell } from "@/components/shell/ShellContext";
import { Icon, SectionHeader, type IconName } from "@/components/ui";
import { ui } from "@/content/microcopy";
import { site } from "@/content/site";
import { panelById } from "@/lib/panels";

const panel = panelById("contact");

export function ContactPanel() {
  const { go } = useShell();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {}
  };
  const rows: { icon: IconName; label: string; value: string; href: string; external?: boolean; download?: boolean }[] = [
    { icon: "whatsapp", label: ui.contact.whatsapp, value: site.contact.phone.label, href: site.contact.whatsapp.href, external: true },
    { icon: "github", label: ui.contact.github, value: site.contact.github.label, href: site.contact.github.href, external: true },
    { icon: "linkedin", label: ui.contact.linkedin, value: site.contact.linkedin.label, href: site.contact.linkedin.href, external: true },
    { icon: "x", label: ui.contact.x, value: site.contact.x.label, href: site.contact.x.href, external: true },
    { icon: "instagram", label: ui.contact.instagram, value: site.contact.instagram.label, href: site.contact.instagram.href, external: true },
    { icon: "phone", label: ui.contact.phone, value: site.contact.phone.label, href: site.contact.phone.href },
    { icon: "download", label: ui.contact.resume, value: site.contact.resume.label, href: site.contact.resume.href, download: true },
  ];
  return (
    <Panel id="contact">
      <SectionHeader id="panel-contact-title" number={panel.number} label={ui.contact.label} title={ui.contact.title} intro={ui.contact.body} as="h1" />

      <div className="mt-10 flex flex-col gap-3">
        <p className="label">{ui.contact.email}</p>
        <a href={`mailto:${site.contact.email}`} className="break-all text-display-md font-medium text-text underline decoration-[color-mix(in_srgb,var(--accent)_70%,transparent)] decoration-2 underline-offset-8 hover:decoration-[var(--accent)]">
          {site.contact.email}
        </a>
        <button type="button" onClick={copy} className="inline-flex h-10 items-center gap-2 self-start rounded-pill border border-border bg-raised px-4 text-small font-medium text-text transition-colors hover:border-border-strong">
          <Icon name={copied ? "check" : "copy"} size={15} />
          <span aria-live="polite">{copied ? ui.contact.copied : ui.contact.copy}</span>
        </button>
      </div>

      <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
        {rows.map((r) => (
          <li key={r.label} className="border-t border-border">
            <a href={r.href} target={r.external ? "_blank" : undefined} rel={r.external ? "noopener noreferrer" : undefined} download={r.download || undefined} className="group flex items-center gap-4 py-4 text-text transition-colors hover:text-accent-text">
              <Icon name={r.icon} size={18} />
              <span className="text-caption text-muted">{r.label}</span>
              <span className="ml-auto truncate text-small font-medium tabular">{r.value}</span>
              <Icon name={r.external ? "arrowUpRight" : "arrowRight"} size={14} className="shrink-0 text-muted transition-transform duration-(--dur) ease-out group-hover:translate-x-0.5" />
              {r.external && <span className="sr-only">({ui.card.newTab})</span>}
            </a>
          </li>
        ))}
      </ul>

      <footer className="mt-16 flex flex-col gap-6 border-t border-border pt-8">
        <p className="font-accent text-display-sm text-text">{ui.footer.line}</p>
        <div className="flex flex-wrap items-center justify-between gap-4 text-caption text-muted">
          <span>{ui.footer.rights} · {site.copyrightYear}</span>
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            className="inline-flex items-center gap-1.5 text-text hover:text-accent-text"
          >
            {ui.dock.toTop}
            <Icon name="arrowUp" size={13} />
          </Link>
        </div>
      </footer>
    </Panel>
  );
}
