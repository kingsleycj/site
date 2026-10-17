import { test } from "node:test";
import assert from "node:assert/strict";
import { projects, smallProjects } from "../content/projects.ts";
import { timeline, closeToTheUsers, education } from "../content/experience.ts";
import { site, headlines, sublines, stats, marquee, homeStatCount } from "../content/site.ts";
import { about } from "../content/about.ts";
import { now } from "../content/now.ts";
import { toolkit } from "../content/toolkit.ts";
import { ui } from "../content/microcopy.ts";

const allText = JSON.stringify({ projects, smallProjects, timeline, closeToTheUsers, education, site, headlines, sublines, stats, about, now, toolkit, ui });

test("no buzzwords anywhere in the copy", () => {
  for (const phrase of ["passionate about", "cutting-edge", "cutting edge", "ninja", "rockstar", "guru", "synerg"]) {
    assert.ok(!allText.toLowerCase().includes(phrase), `found "${phrase}"`);
  }
});

test("no former product name, no CGPA, no audit logging or EVV, no client names", () => {
  for (const phrase of ["CGPA", "audit log", "Electronic Visit Verification", "EVV", "Twinkle", "Latisha"]) {
    assert.ok(!allText.includes(phrase), `found "${phrase}"`);
  }
});

test("real job titles are untouched", () => {
  const titles = timeline.filter((t) => t.id !== "humstage").map((t) => `${t.title} @ ${t.org}`);
  assert.deepEqual(titles, [
    "Backend Developer @ TekAIDA Consulting",
    "Backend Developer @ HarmonyKloud",
    "Web3 Developer @ Genesys Tech Hub",
    "Backend Engineer @ Genesys Tech Hub",
  ]);
});

test("every project has an honest status with a note and at least one link", () => {
  const kinds = new Set(["live", "devnet", "testnet", "beta", "shipped", "building"]);
  for (const p of projects) {
    assert.ok(kinds.has(p.status.kind), `${p.slug}: status kind`);
    assert.ok(p.status.label.length > 0, `${p.slug}: status label`);
    assert.ok(p.status.note.length > 20, `${p.slug}: status note`);
    assert.ok(p.links.length > 0, `${p.slug}: links`);
    assert.ok(p.problem.length && p.hardPart.length && p.built.length && p.standing.length, `${p.slug}: story sections`);
  }
});

test("projects with screenshots come before the two without", () => {
  const firstWithout = projects.findIndex((p) => !p.screens.some((s) => s.device === "desktop"));
  const lastWith = projects.map((p) => p.screens.some((s) => s.device === "desktop")).lastIndexOf(true);
  assert.ok(firstWithout === -1 || firstWithout > lastWith);
});

test("HumStage leads the work and links to humstage.app", () => {
  assert.equal(projects[0].slug, "humstage");
  assert.ok(projects[0].isStartup);
  assert.ok(projects[0].links.some((l) => l.href === "https://humstage.app"));
  assert.ok(projects[0].links.some((l) => l.href === "https://humstage.app/download"));
  assert.equal(site.humstage.href, "https://humstage.app");
});

test("the HumStage wordmark in the marquee links to humstage.app", () => {
  const hs = marquee.places.find((p) => p.name === "HumStage");
  assert.ok(hs && "href" in hs && hs.href === "https://humstage.app");
});

test("project slugs are unique and url-safe", () => {
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/);
});

test("the HarmonyKloud website claim stays general", () => {
  const hk = projects.find((p) => p.slug === "harmonykloud-website");
  assert.ok(hk);
  assert.equal(hk.stack.length, 0, "no stack claimed for the HarmonyKloud website");
  assert.ok(hk.built.join(" ").includes("I revamped the HarmonyKloud website"));
  assert.ok(hk.links.some((l) => l.href === "https://harmonykloud.com"));
});

test("stats carry only sourced numbers and the home page shows two", () => {
  const values = stats.map((s) => `${s.value}${s.suffix ?? ""}`);
  assert.deepEqual(values, ["4+", "500+", "633", "100/100"]);
  assert.equal(homeStatCount, 2);
});

test("the headline has two chips, an accent word and alternates", () => {
  assert.equal(headlines.primary.chips.length, 2);
  assert.ok(headlines.primary.accent.length > 0);
  assert.ok(headlines.alternates.length >= 2);
  assert.ok(sublines.length >= 2);
});

test("the socials and WhatsApp are present", () => {
  assert.equal(site.contact.instagram.href, "https://instagram.com/kingsleycj_");
  assert.equal(site.contact.x.href, "https://x.com/kingsleycj8");
  assert.equal(site.contact.linkedin.href, "https://linkedin.com/in/kingsleycj");
  assert.match(site.contact.whatsapp.href, /^https:\/\/wa\.me\/234\d{10}$/);
});

test("education has no grade point average", () => {
  assert.equal(education.grade, "Second Class (Upper)");
});

test("every now item and toolkit group is non-empty", () => {
  assert.ok(now.items.length >= 3);
  for (const g of toolkit) assert.ok(g.tools.length >= 4, g.id);
});

test("every timeline project reference resolves", () => {
  const slugs = new Set(projects.map((p) => p.slug));
  for (const t of timeline) if (t.project) assert.ok(slugs.has(t.project), t.id);
  for (const n of now.items) if (n.project) assert.ok(slugs.has(n.project), n.title);
});
