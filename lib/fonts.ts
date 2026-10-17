/**
 * The only place fonts are declared. One sans for everything (the references use an
 * Inter-class grotesk) and one italic serif for a single accent word in a headline.
 */
import localFont from "next/font/local";

export const sans = localFont({
  src: [{ path: "../public/fonts/Inter-Variable.woff2", weight: "300 800", style: "normal" }],
  variable: "--ff-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

export const accent = localFont({
  src: [{ path: "../public/fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" }],
  variable: "--ff-accent",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const fontVariables = [sans.variable, accent.variable].join(" ");
