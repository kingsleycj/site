import type { ComponentType } from "react";
import type { PanelId } from "@/lib/panels";

/**
 * The rooms a visitor moves to after landing (the landing room itself comes from the route as
 * `children`; see Shell). Each is its own chunk, loaded here and kept, then rendered directly.
 * Deliberately not `next/dynamic`: that wraps each room in a Suspense boundary, and React holds a
 * resolved boundary on its fallback for ~300ms, which showed as a blank page after every tap.
 */
const loaders: Record<PanelId, () => Promise<ComponentType>> = {
  home: () => import("./HomePanel").then((m) => m.HomePanel),
  about: () => import("./AboutPanel").then((m) => m.AboutPanel),
  path: () => import("./PathPanel").then((m) => m.PathPanel),
  work: () => import("./WorkPanel").then((m) => m.WorkPanel),
  toolkit: () => import("./ToolkitPanel").then((m) => m.ToolkitPanel),
  now: () => import("./NowPanel").then((m) => m.NowPanel),
  contact: () => import("./ContactPanel").then((m) => m.ContactPanel),
};

const loaded: Partial<Record<PanelId, ComponentType>> = {};
const pending: Partial<Record<PanelId, Promise<ComponentType>>> = {};

/** The room's component if its code has arrived, otherwise undefined (render a PanelSlot meanwhile). */
export function loadedPanel(id: PanelId): ComponentType | undefined {
  return loaded[id];
}

/** Fetch a room's code once; later calls reuse the same promise. */
export function loadPanel(id: PanelId): Promise<ComponentType> {
  pending[id] ??= loaders[id]().then((c) => (loaded[id] = c));
  return pending[id];
}
