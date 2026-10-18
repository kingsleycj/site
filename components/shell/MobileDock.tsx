"use client";

import { Icon, type IconName } from "@/components/ui";
import { ui } from "@/content/microcopy";
import { cn } from "@/lib/cn";
import { panels, type PanelId } from "@/lib/panels";
import { useShell } from "./ShellContext";

const icons: Record<PanelId, IconName> = { home: "home", about: "user", path: "path", work: "work", toolkit: "toolkit", now: "now", contact: "contact" };

/** The dock as a bottom bar on small screens: icons only, the active one filled green. */
export function MobileDock() {
  const { active, go } = useShell();
  return (
    <nav aria-label={ui.dock.label} className="fixed inset-x-3 bottom-3 z-30 shell:hidden">
      <ul className="glass flex items-center justify-between rounded-pill px-1.5 py-1.5 shadow-2">
        {panels.map((p) => {
          const isActive = active === p.id;
          return (
            <li key={p.id}>
              <a
                href={p.path}
                aria-label={p.label}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(p.id);
                }}
                className={cn("grid h-11 w-11 place-items-center rounded-pill transition-colors active:scale-95", isActive ? "bg-accent text-accent-ink" : "text-muted")}
              >
                <Icon name={icons[p.id]} size={19} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
