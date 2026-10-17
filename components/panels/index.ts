import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { PanelId } from "@/lib/panels";
import { HomePanel } from "./HomePanel";

/**
 * Home ships in the main bundle; the other rooms are server-rendered but hydrate from their
 * own chunks, so the first screen's main-thread work stays small on phones.
 */
export const PanelViews: Record<PanelId, ComponentType> = {
  home: HomePanel,
  about: dynamic(() => import("./AboutPanel").then((m) => m.AboutPanel)),
  path: dynamic(() => import("./PathPanel").then((m) => m.PathPanel)),
  work: dynamic(() => import("./WorkPanel").then((m) => m.WorkPanel)),
  toolkit: dynamic(() => import("./ToolkitPanel").then((m) => m.ToolkitPanel)),
  now: dynamic(() => import("./NowPanel").then((m) => m.NowPanel)),
  contact: dynamic(() => import("./ContactPanel").then((m) => m.ContactPanel)),
};
