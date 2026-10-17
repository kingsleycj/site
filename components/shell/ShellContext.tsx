"use client";

import { createContext, useContext } from "react";
import type { PanelId } from "@/lib/panels";

export interface ShellState {
  active: PanelId;
  index: number;
  count: number;
  go: (id: PanelId) => void;
  next: () => void;
  prev: () => void;
  /** Which project the Work panel is showing; the card mirrors it. */
  workIndex: number;
  setWorkIndex: (i: number) => void;
  /** True on Home until the visitor has moved to another panel this visit: the next button pulses. */
  hintNext: boolean;
}

export const ShellContext = createContext<ShellState | null>(null);

export function useShell(): ShellState {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used inside <Shell>");
  return ctx;
}
