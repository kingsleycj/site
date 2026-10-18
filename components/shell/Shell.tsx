"use client";

import { Fragment, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { loadPanel, loadedPanel } from "@/components/panels";
import { ui } from "@/content/microcopy";
import { panelIndex, panelOrder, panels, type PanelId } from "@/lib/panels";
import { usePanelNav } from "@/lib/use-panel-nav";
import { AvailabilityTab } from "./AvailabilityTab";
import { Dock } from "./Dock";
import { MobileDock } from "./MobileDock";
import { MobileHeader } from "./MobileHeader";
import { PagerNext, PagerPrev } from "./Pager";
import { PanelSlot } from "./Panel";
import { ProfileCard } from "./ProfileCard";
import { ShellContext, type ShellState } from "./ShellContext";
import { Stage } from "./Stage";

/**
 * The app frame. Desktop (≥ 1024px): profile card | stage | dock, viewport high, with the
 * pager buttons on the card's left edge and the stage's right edge like the reference.
 * Phones and tablets: sticky header, one room per page, bottom dock.
 *
 * Only the route's own room is server-rendered and hydrated: the route passes it in as
 * `children`, so it renders without a loading boundary and the route's bundle carries only that
 * room. On the shell the other rooms then mount one per idle moment, nearest first, so sliding to
 * them is instant; on phones they mount only when visited (their code is prefetched meanwhile).
 */
// Safari has no requestIdleCallback; fall back to a short timeout there.
const hasIdle = () => typeof window.requestIdleCallback === "function";
const idle = (cb: () => void): number => (hasIdle() ? window.requestIdleCallback(cb, { timeout: 2500 }) : window.setTimeout(cb, 600));
const cancelIdle = (id: number) => (hasIdle() ? window.cancelIdleCallback(id) : window.clearTimeout(id));

export function Shell({ panel, children }: { panel: PanelId; children: ReactNode }) {
  const nav = usePanelNav(panel);
  const [workIndex, setWorkIndex] = useState(0);
  // Remembered for this visit: once the visitor has left Home by any means (dock, keys, back button), the hint stops.
  const [navigated, setNavigated] = useState(false);
  if (nav.index !== 0 && !navigated) setNavigated(true);
  const hintNext = nav.index === 0 && !navigated;
  const [moved, setMoved] = useState(false);
  if (nav.active.id !== panel && !moved) setMoved(true);

  // Rooms the visitor has opened stay mounted.
  const [visited, setVisited] = useState<ReadonlySet<PanelId>>(() => new Set([panel]));
  if (!visited.has(nav.active.id)) setVisited(new Set(visited).add(nav.active.id));
  // Desktop warm-up order: nearest rooms to the landing one first.
  const warmOrder = useMemo(() => {
    const start = panelIndex(panel);
    return [...panelOrder].sort((a, b) => Math.abs(panelIndex(a) - start) - Math.abs(panelIndex(b) - start));
  }, [panel]);
  const [warmCount, setWarmCount] = useState(0);
  // Re-render when a room's code arrives.
  const [, codeArrived] = useReducer((n: number) => n + 1, 0);
  const wanted = (id: PanelId) => visited.has(id) || warmOrder.indexOf(id) < warmCount;

  useEffect(() => {
    document.documentElement.setAttribute("data-js", "");
  }, []);
  // The room the visitor just opened: fetch its code now if the warm-up hasn't yet.
  useEffect(() => {
    if (nav.active.id !== panel && !loadedPanel(nav.active.id)) void loadPanel(nav.active.id).then(codeArrived);
  }, [nav.active.id, panel]);
  // Warm-up while idle. Desktop: load and mount one more room each time, nearest first.
  // Phones: load every room's code (cheap) but mount none until visited.
  useEffect(() => {
    if (warmCount >= warmOrder.length) return;
    const handle = idle(() => {
      if (window.matchMedia("(min-width: 64rem)").matches) {
        void loadPanel(warmOrder[warmCount]).then(() => setWarmCount((c) => c + 1));
      } else if (warmCount === 0) {
        for (const id of warmOrder) void loadPanel(id).then(codeArrived);
      }
    });
    return () => cancelIdle(handle);
  }, [warmCount, warmOrder]);
  const value = useMemo<ShellState>(
    () => ({ active: nav.active.id, index: nav.index, count: nav.count, go: nav.go, next: nav.next, prev: nav.prev, workIndex, setWorkIndex, hintNext, moved }),
    [nav.active.id, nav.index, nav.count, nav.go, nav.next, nav.prev, workIndex, hintNext, moved],
  );
  return (
    <ShellContext.Provider value={value}>
      <a href={`#panel-${nav.active.id}`} className="sr-only-focusable rounded-pill bg-accent px-4 py-2 text-small font-medium text-accent-ink">
        {ui.skipToContent}
      </a>
      <MobileHeader />
      <div className="hidden shell:block">
        <AvailabilityTab />
      </div>
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1840px] flex-col shell:h-dvh shell:flex-row shell:items-stretch shell:gap-7 shell:py-4 shell:pl-14 shell:pr-4 wide:gap-8 wide:py-5 wide:pl-16 wide:pr-5">
        <div className="relative hidden shell:flex">
          <ProfileCard />
          <PagerPrev />
        </div>
        <main id="main" className="relative flex min-w-0 flex-1">
          <Stage>
            {panels.map((p) => {
              if (p.id === panel) return <Fragment key={p.id}>{children}</Fragment>;
              const View = wanted(p.id) ? loadedPanel(p.id) : undefined;
              return View ? <View key={p.id} /> : <PanelSlot key={p.id} id={p.id} />;
            })}
          </Stage>
          <div className="hidden shell:block">
            <PagerNext />
          </div>
        </main>
        <div className="hidden shell:flex shell:pl-3">
          <Dock />
        </div>
      </div>
      <MobileDock />
    </ShellContext.Provider>
  );
}
