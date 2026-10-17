"use client";

import { useEffect, useMemo, useState } from "react";
import { PanelViews } from "@/components/panels";
import { ui } from "@/content/microcopy";
import { panels, type PanelId } from "@/lib/panels";
import { usePanelNav } from "@/lib/use-panel-nav";
import { AvailabilityTab } from "./AvailabilityTab";
import { Dock } from "./Dock";
import { MobileDock } from "./MobileDock";
import { MobileHeader } from "./MobileHeader";
import { PagerNext, PagerPrev } from "./Pager";
import { ProfileCard } from "./ProfileCard";
import { ShellContext, type ShellState } from "./ShellContext";
import { Stage } from "./Stage";

/**
 * The app frame. Desktop (≥ 1024px): profile card | stage | dock, viewport high, with the
 * pager buttons on the card's left edge and the stage's right edge like the reference.
 * Phones and tablets: sticky header, panels in a vertical flow, bottom dock.
 */
export function Shell({ panel }: { panel: PanelId }) {
  const nav = usePanelNav(panel);
  const [workIndex, setWorkIndex] = useState(0);
  // Remembered for this visit: once the visitor has left Home by any means (dock, keys, back button), the hint stops.
  const [navigated, setNavigated] = useState(false);
  if (nav.index !== 0 && !navigated) setNavigated(true);
  const hintNext = nav.index === 0 && !navigated;
  useEffect(() => {
    document.documentElement.setAttribute("data-js", "");
  }, []);
  const value = useMemo<ShellState>(
    () => ({ active: nav.active.id, index: nav.index, count: nav.count, go: nav.go, next: nav.next, prev: nav.prev, workIndex, setWorkIndex, hintNext }),
    [nav.active.id, nav.index, nav.count, nav.go, nav.next, nav.prev, workIndex, hintNext],
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
              const View = PanelViews[p.id];
              return <View key={p.id} />;
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
