"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";
const KEY = "theme";

/**
 * Runs inline in <head> before first paint. Order: stored choice, then OS preference, then dark.
 * Keep it dependency-free and tiny; it is stringified into a <script>.
 */
export const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("${KEY}");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

function read(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function emit() {
  for (const l of listeners) l();
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
  emit();
}

export function useTheme(): [Theme, () => void] {
  const theme = useSyncExternalStore(subscribe, read, () => "dark" as Theme);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      try {
        if (localStorage.getItem(KEY)) return; // an explicit choice wins over the OS
      } catch {}
      document.documentElement.setAttribute("data-theme", mq.matches ? "light" : "dark");
      emit();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const toggle = useCallback(() => applyTheme(read() === "dark" ? "light" : "dark"), []);
  return [theme, toggle];
}
