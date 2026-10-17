"use client";

import { useState } from "react";
import { DeviceFrame } from "@/components/ui";
import type { Screen } from "@/content/types";
import { cn } from "@/lib/cn";
import { ThemedScreen } from "./ThemedScreen";

export interface ScreenSwitcherProps {
  screens: Screen[];
}

type View = "desktop" | "mobile";

/**
 * The case-study hero: on tablets and up the desktop frame and the phone sit side by side;
 * on phones one preview shows at a time behind a Desktop / Mobile toggle.
 */
export function ScreenSwitcher({ screens }: ScreenSwitcherProps) {
  const desktops = screens.filter((s) => s.device === "desktop");
  const desktopDark = desktops.find((s) => s.scheme === "dark") ?? desktops[0];
  const desktopLight = desktops.find((s) => s.scheme === "light") ?? desktops[0];
  const two = Boolean(desktopDark && desktopLight && desktopDark.src !== desktopLight.src);
  const mobile = screens.find((s) => s.device === "mobile");
  const [view, setView] = useState<View>(mobile ? "mobile" : "desktop");

  return (
    <div className="flex flex-col gap-4">
      {mobile && desktopDark && (
        <div role="group" aria-label="Preview" className="inline-flex h-9 items-center self-start rounded-pill border border-border bg-sunken p-1 sm:hidden">
          {(["desktop", "mobile"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn("h-7 rounded-pill px-3.5 text-caption font-medium capitalize transition-colors", view === v ? "bg-accent text-accent-ink" : "text-muted hover:text-text")}
            >
              {v}
            </button>
          ))}
        </div>
      )}
      <div className="sm:flex sm:items-end sm:gap-6">
        {desktopDark && (
          <div className={cn("w-full sm:block sm:min-w-0 sm:flex-1", view !== "desktop" && mobile && "hidden")}>
            <DeviceFrame screen={desktopDark} priority className={two ? "screen-dark" : undefined} />
            {two && <DeviceFrame screen={desktopLight} className="screen-light" />}
          </div>
        )}
        {mobile && (
          <div className={cn("mx-auto w-[64%] max-w-[250px] sm:mx-0 sm:block sm:w-[26%] sm:max-w-[230px] sm:shrink-0", view !== "mobile" && "hidden")}>
            <ThemedScreen screens={screens} device="mobile" sizes="250px" className="overflow-hidden rounded-[1.6rem] border-[5px] border-[#0d0d0d] bg-[#0d0d0d] shadow-2" imgClassName="aspect-[390/844] w-full object-cover object-top" />
          </div>
        )}
      </div>
    </div>
  );
}
