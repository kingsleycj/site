"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { site } from "@/content/site";
import { panelById, panelByPath, panelIndex, panelOrder, type PanelDef, type PanelId } from "./panels";

/**
 * Panel navigation. The URL is the source of truth: `go()` pushes a real path with the
 * History API (Next syncs `usePathname`), so the back button, deep links and new-tab
 * clicks all work. Arrow keys move between panels when focus is not in a field.
 */
export function usePanelNav(initial: PanelId) {
  const pathname = usePathname();
  const active: PanelDef = useMemo(() => panelByPath(pathname) ?? panelById(initial), [pathname, initial]);
  const index = panelIndex(active.id);

  const go = useCallback((id: PanelId) => {
    const target = panelById(id);
    if (typeof window === "undefined") return;
    if (window.location.pathname !== target.path) window.history.pushState(null, "", target.path);
    const el = document.getElementById(`panel-${id}`);
    if (!el) return;
    if (window.matchMedia("(min-width: 64rem)").matches) {
      // Shell: the stage slides; the arriving room starts at its top.
      el.scrollTo({ top: 0 });
    } else {
      // Phones: only the active room renders, so the page itself starts at the top.
      window.scrollTo({ top: 0 });
    }
  }, []);

  const next = useCallback(() => {
    if (index < panelOrder.length - 1) go(panelOrder[index + 1]);
  }, [go, index]);
  const prev = useCallback(() => {
    if (index > 0) go(panelOrder[index - 1]);
  }, [go, index]);

  useEffect(() => {
    document.title = active.id === "home" ? site.meta.title : `${active.title} · ${site.name}`;
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return { active, index, go, next, prev, count: panelOrder.length };
}
