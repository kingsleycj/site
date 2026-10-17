import { test } from "node:test";
import assert from "node:assert/strict";
import { panels, panelOrder, panelByPath, panelIndex } from "../lib/panels.ts";

test("seven panels, unique ids and paths, in order", () => {
  assert.equal(panels.length, 7);
  assert.equal(new Set(panelOrder).size, 7);
  assert.equal(new Set(panels.map((p) => p.path)).size, 7);
  assert.deepEqual(panelOrder, ["home", "about", "path", "work", "toolkit", "now", "contact"]);
});

test("every route maps back to its panel, trailing slash or not", () => {
  assert.equal(panelByPath("/")?.id, "home");
  assert.equal(panelByPath("/work")?.id, "work");
  assert.equal(panelByPath("/work/")?.id, "work");
  assert.equal(panelByPath("/work/humstage"), undefined);
  assert.equal(panelIndex("contact"), 6);
});
