/** The seven panels of the shell, in slide order. Paths are real routes; the shell slides between them. */
export type PanelId = "home" | "about" | "path" | "work" | "toolkit" | "now" | "contact";

export interface PanelDef {
  id: PanelId;
  path: string;
  label: string;
  /** `(01)—Label` number used by SectionHeader. */
  number: string;
  title: string;
}

export const panels: readonly PanelDef[] = [
  { id: "home", path: "/", label: "Home", number: "00", title: "Kingsley Nweke — Software Engineer, building HumStage" },
  { id: "about", path: "/about", label: "About", number: "01", title: "About — Still mostly curious" },
  { id: "path", path: "/path", label: "Path", number: "02", title: "Path — The road so far" },
  { id: "work", path: "/work", label: "Work", number: "03", title: "Work — Seven I'd happily be quizzed on" },
  { id: "toolkit", path: "/toolkit", label: "Toolkit", number: "04", title: "Toolkit — What I reach for" },
  { id: "now", path: "/now", label: "Right now", number: "05", title: "Right now — On my desk this month" },
  { id: "contact", path: "/contact", label: "Contact", number: "06", title: "Contact — Come tell me what you're building" },
] as const;

export const panelOrder: readonly PanelId[] = panels.map((p) => p.id);

export function panelIndex(id: PanelId): number {
  return panelOrder.indexOf(id);
}

export function panelByPath(pathname: string): PanelDef | undefined {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return panels.find((p) => p.path === clean);
}

export function panelById(id: PanelId): PanelDef {
  const found = panels.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown panel: ${id}`);
  return found;
}
