import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { contrast } from "../lib/contrast.ts";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

function block(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  assert.ok(start >= 0, `selector ${selector} not found`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  const out: Record<string, string> = {};
  for (const m of css.slice(open + 1, close).matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})\s*;/gi)) out[m[1]] = m[2].toLowerCase();
  return out;
}

const dark = block(':root[data-theme="dark"]');
const light = block(':root[data-theme="light"]');
// the tonal accent lives in a trailing block
for (const m of css.matchAll(/:root(?:\[data-theme="(dark|light)"\])?[^{]*\{\s*--tonal-accent:\s*(#[0-9a-f]{6});/gi)) {
  (m[1] === "light" ? light : dark)["tonal-accent"] = m[2].toLowerCase();
}

/** [foreground, background, minimum]. 4.5 for body-size text, 3 for large text and dots. */
const pairs: [string, string, number][] = [
  ["text", "surface", 4.5],
  ["text", "surface-raised", 4.5],
  ["text", "surface-overlay", 4.5],
  ["text-muted", "surface", 4.5],
  ["text-muted", "surface-raised", 4.5],
  ["text-muted", "surface-overlay", 4.5],
  ["accent-ink", "accent", 4.5],
  ["tonal-text", "tonal-bg", 4.5],
  ["tonal-accent", "tonal-bg", 4.5],
  ["accent-text", "surface", 4.5],
  ["accent-text", "surface-raised", 4.5],
  ["status-on", "surface", 3],
  ["status-off", "surface", 3],
];

for (const [name, tokens] of [["dark", dark], ["light", light]] as const) {
  test(`${name}: every text/background pair meets WCAG AA`, () => {
    for (const [fg, bg, min] of pairs) {
      assert.ok(tokens[fg], `${name}: missing --${fg}`);
      assert.ok(tokens[bg], `${name}: missing --${bg}`);
      const ratio = contrast(tokens[fg], tokens[bg]);
      assert.ok(ratio >= min, `${name}: --${fg} on --${bg} is ${ratio.toFixed(2)}:1, needs ${min}:1`);
    }
  });
}

test("light theme never uses the bright green as text", () => {
  assert.notEqual(light["accent-text"], light["accent"]);
  assert.ok(contrast(light["accent-text"], light["surface"]) >= 4.5);
});

test("the headline chip follows the reference (white on green) and is the one documented exception", () => {
  // Large display text only; recorded in DESIGN.md. Keep the number visible so a change is noticed.
  const ratio = contrast("#ffffff", dark["accent-chip"]);
  assert.ok(ratio > 2.2 && ratio < 3.2, `white on the chip green is ${ratio.toFixed(2)}:1`);
});
