# Portfolio Rebuild Implementation Plan

> **For agentic workers:** executed natively in-session (the owner set the phase order). Steps use checkbox (`- [ ]`) syntax for tracking. The owner commits; never commit on your own.

**Goal:** Rebuild kingsleynweke.vercel.app as a two-zone, sliding-panel portfolio that says "software engineer, building HumStage" in the first screen and proves range through real projects.

**Architecture:** Next.js App Router with one persistent client `Shell` (profile card + stage + dock) rendered by seven thin route files (`/`, `/about`, `/path`, `/work`, `/toolkit`, `/now`, `/contact`). All panels live in one horizontal track; navigation uses `window.history.pushState` so `usePathname()` drives the slide and the back button works. Case studies are separate full-page routes under `/work/[slug]`. All copy lives in typed `content/` modules; tokens live in `app/globals.css` as CSS variables mapped into Tailwind v4 via `@theme inline`.

**Tech Stack:** Next 16.4 (Turbopack, `@tailwindcss/turbopack`), React 19.3, TypeScript 5, Tailwind 4, Motion 14 (`motion/react`), `next/font/local`, `next/image`, `next/og`. Tests: `node --test` on `.ts` files (Node 24 strips types; no test framework dependency).

**Spec:** the owner's build brief (pasted 2026-10-17; sections 1–11 plus 10b git rules), plus `PRODUCT.md`.

## Global Constraints

- Job titles verbatim: Backend Developer (TekAIDA), Backend Developer (HarmonyKloud), Web3 Developer (Genesys), Backend Engineer (Genesys).
- No invented facts, metrics, logos, testimonials, clients, traction. Numbers only from `content/`.
- Never mention a former HumStage name; every HumStage mention links to https://humstage.app.
- HarmonyKloud: no client names, no real app screens, no audit-logging/EVV mention, website claim stays general.
- Fonts: Jost (for Avant Garde Gothic), Caprasimo (for Cooper BT), Golos Text (body), JetBrains Mono (labels), NCL Gasdrifo demo (hero moments only, if legible). All loaded in `lib/fonts.ts` only.
- Display faces never for body or small UI. Max 3 display/text families + mono.
- Animations on transform/opacity (blur/mask allowed when smooth); every effect has a reduced-motion fallback.
- WCAG AA on every text/background pair in both themes (enforced by `tests/contrast.test.ts`).
- Dependencies: next, react, react-dom, motion only at runtime (+ sharp dev for image conversion).
- Git: owner commits; conventional messages shown first; no attribution trailers.

## Review Focus

1. Deep link to `/work` on a 390px phone: the Work panel must be the active one, with the profile header collapsed and the project detail inline. Test: `tests/panels.test.ts` asserts the panel registry maps every route to a panel id and order.
2. Keyboard user tabbing through the shell: focus must never land inside an inactive (offscreen) panel. Inactive panels get `inert` and `aria-hidden`. Test: `tests/panels.test.ts` checks `panelOrder` has no duplicates (the inert logic keys on index).
3. Copy containing a banned phrase or a HumStage mention without a link. Test: `tests/content.test.ts`.
4. A project with a missing or vague status. Test: `tests/content.test.ts` asserts every project has `status.kind` in the allowed set and a non-empty `status.note`.
5. Theme flash on load and a stored theme being ignored: inline `<script>` in `<head>` sets `data-theme` before paint; `ThemeToggle` writes `localStorage.theme`. Verified by Playwright screenshot of first paint in QA.

---

## Decisions where the brief was open

- **Pager buttons** sit stacked on the seam between card and stage (prev above next, with a `01 / 07` counter).
- **Mobile**: same panel model as a swipe pager (Motion drag), compact header (avatar, name, founder badge, availability dot), bottom dock, each panel scrolls vertically; detail-card content moves inline at the top of the Work panel.
- **Theme default**: stored choice → OS preference → dark.
- **Hero graphic**: "request loop" — a glossy mint ribbon drawn as an SVG path with packets travelling along it, three glass nodes (phone → server → projector), and a rotating badge reading "BUILDING HUMSTAGE · SINCE 2022". Cursor parallax on three depth layers.
- **Headline**: "I build [backends] [& payment rails] that hold up." Chip pairs cycle every 3.2s: (backends, & payment rails) → (AI systems, & realtime rooms) → (whole websites, & desktop apps) → (smart contracts, & the box it runs on). Reduced motion shows the first pair.
- **Second hero state** toggled by a two-segment control ("The pitch" / "The proof"): fanned stack of five previews led by HumStage, each a link into Work.
- **Marquee**: two rows, places worked (with role) and stack; text wordmarks, no logos.
- **Work stage**: seven entries in the pager (HumStage, DojoPay, VibeCraft, SIMBI-AI Bot, gNGN Token, Imago Dynamics Media, HarmonyKloud website), the last two labelled "Shipped for a client"; "And a few more" list below (CivicLink, Tutera, eBuzz, Medbloc).
- **Path**: timeline includes a "Co-founder, HumStage" entry (status Building) above the four jobs; HarmonyKloud gets the "Close to the users" loop graphic; education compact; award callout inside the Genesys Web3 entry.
- **Toolkit**: six groups as shelves; each tool chip knows which projects use it (derived from project stacks) and reveals them on hover/focus.
- **Immersion picks** (recorded in DESIGN.md): cursor spotlight on the stage, three-layer pointer parallax in the hero, kinetic chip headline, layered panel slide with background at half speed and per-project world crossfade, grain + glass. No sound.

## File Structure

```
app/
  layout.tsx            fonts, theme script, metadata, JSON-LD, grain
  globals.css           tokens (@theme inline), base styles, utilities
  page.tsx              <Shell panel="home" />        (+ about/ path/ work/ toolkit/ now/ contact/)
  work/[slug]/page.tsx  case study page, generateStaticParams
  not-found.tsx, opengraph-image.tsx, sitemap.ts, robots.ts
content/
  types.ts site.ts projects.ts experience.ts toolkit.ts now.ts about.ts microcopy.ts
lib/
  fonts.ts panels.ts theme.ts motion.ts contrast.ts use-reduced-motion.ts use-panel-nav.ts
components/
  ui/        Chip PillButton ArrowCircle PagerButton StatusBadge Tag StatBlock SectionHeader
             RotatingBadge FounderBadge ThemeToggle Marquee DeviceFrame Icons
  shell/     Shell ProfileCard Dock Stage Pager Clock AvailabilityTab StageHeader MobileHeader
  panels/    HomePanel AboutPanel PathPanel WorkPanel ToolkitPanel NowPanel ContactPanel
  hero/      RequestLoop ChipHeadline FannedStack Stats
  work/      ProjectCard ProjectDetail ProjectPreview CaseStudy BuildTestTrainLoop
  fx/        Spotlight Grain Parallax Counter Reveal
tests/       content.test.ts contrast.test.ts panels.test.ts
public/      fonts/ screens/ images/ resume/
CLAUDE.md DESIGN.md SUGGESTIONS.md PRODUCT.md
```

## Phase 1: Design system — DONE 2026-10-17 (awaiting owner review)

- [x] `lib/fonts.ts` with four `next/font/local` loaders exposing `--font-display`, `--font-warm`, `--font-text`, `--font-mono` (+ optional `--font-hero` for NCL Gasdrifo demo).
- [x] `app/globals.css`: palette scales, semantic tokens for `[data-theme=dark]` and `[data-theme=light]`, project world tokens (`data-world="humstage"` …), status palette, type scale, radius, shadows, motion vars, grain and glass utilities, focus ring, selection, scrollbar.
- [x] `content/types.ts` and all content modules with the full copy.
- [x] `lib/contrast.ts` (relative luminance, contrast ratio) and `tests/contrast.test.ts` checking every declared text/bg pair ≥ 4.5 (≥ 3 for display pairs).
- [x] `tests/content.test.ts`: banned phrases, HumStage links, statuses, titles, no CGPA, no former name.
- [x] Primitives in `components/ui/`.
- [x] `DESIGN.md`, `CLAUDE.md`.
- [x] Verify: `npm test`, `npx tsc --noEmit`, `npm run lint`.

## Phase 2: Shell — DONE 2026-10-17 (awaiting owner review)

- [x] `lib/panels.ts` registry: id, path, label, icon, order.
- [x] `components/shell/*` and the seven route files; theme script; clock; availability tab; dock with label pill; pager; mobile header + bottom dock; swipe.
- [x] Verify: `npm run build`, keyboard walk-through in Playwright, back button.

## Phase 3: Home — DONE 2026-10-17

- [x] `components/hero/*`, stats counters, marquee, founder badge, fanned stack state, profile card home state.
- [x] Screenshots converted into `public/screens/` (WebP) via `scripts/screens.mjs`-free one-off (scratchpad) and referenced from `content/projects.ts`.

## Phase 4: Remaining panels — DONE 2026-10-17

- [x] About, Path (timeline + loop graphic + education), Work (stage + detail card morph + lists), Toolkit, Now, Contact. Card states per panel.

## Phase 5: Case-study pages — DONE 2026-10-17

- [x] `/work/[slug]` with world backdrop, problem / hard part / what I built / where it stands / links, screenshots in frames, prev/next, metadata per project. 404 page. OG image. Sitemap, robots, JSON-LD.

## Phase 6: Polish and QA — DONE 2026-10-17

- [x] `impeccable detect`, screenshots desktop+mobile both themes into `.impeccable/review/`, finish reviewer, documenter check of DESIGN.md, Lighthouse ≥ 90 all metrics, axe-style checks, `SUGGESTIONS.md`.

## Phase 7: Reference alignment — DONE 2026-10-17 (owner revision)

Owner feedback after the first build: too many chips and numbers, a green-tinted "riot of colours and fonts", per-project tiles,
off copy, and not enough of the references. Changes:
- [x] Palette sampled from reference-1 (`#161616` / `#1a1a1a` / `#f5f5f5`, green `#00e155` and `#0ebf4d`, blue-lilac work stage); all colour worlds, glows, grain and coloured copy removed.
- [x] One typeface (Inter) plus Instrument Serif italic for the headline accent, as in reference-2; Jost, Caprasimo, Golos, JetBrains Mono and the Gasdrifo loader removed.
- [x] The ribbon redrawn as the reference's glossy tube with the badge on the crossing; packets and node labels removed.
- [x] Home shows two numbers; the stage header sits in flow so nothing scrolls under it; the proof state fits without scrolling.
- [x] Work is a stacked list of neutral screenshot cards on the lilac stage, ordered HumStage, DojoPay, VibeCraft, Imago, HarmonyKloud, then SIMBI and gNGN; a numbered list below as in reference-2.
- [x] Tags removed from projects, the timeline and the toolkit; toolkit tools as plain sentences; counts and tiers gone.
- [x] Socials (X, LinkedIn, Instagram) on the card and Contact; WhatsApp added.
- [x] Copy fixes: the "not a title" line removed, body accents removed.
- [x] Audit: production build, screenshots of every panel in both themes and widths, 20 interaction checks, axe clean, Lighthouse.

## Phase 8: Second owner revision — DONE 2026-10-17

Owner feedback: ribbon too large and not the reference's shape; badge opacity and size; availability tab unlike the reference;
Work listed poorly; borders too thick; wanted a hover-expanding clickable grid; case pages ugly with the same screenshot twice;
alignment audit; portrait still soft. Changes:
- [x] Ribbon silhouette traced from reference-1 (`components/hero/ribbon-path.ts`), flat with two gradients and fading ends; sized to ~60% of the stage; translucent badge on the crossing at the reference's proportion.
- [x] "Open to what's next" tab fixed to the screen's left edge like the reference; pager buttons moved to the card's left edge and the stage's right edge.
- [x] Work: hover-expanding grid of hairline-bordered tiles (2 columns, 3 at ≥1440px) that drive the profile card and open the case study; numbered list and "And a few more" below.
- [x] Case pages restructured: counter, title, facts row, one device-duo hero (desktop + phone) on the soft stage, Overview with links, four story rows, Built with, previous/next.
- [x] Portrait served at its display width (`sizes`, quality 90, `images.qualities` declared), never upscaled.
- [x] Alignment audited with computed boxes at 1920×1080: all stage left edges equal, all right edges equal (panel scrollbar hidden on the shell), card text edges equal, pager centres on the card/stage edges.
- [x] A mobile layout shift on case pages fixed (the hero shrink-wrapped before its images loaded).
- [x] Audit: production build, 20 interaction checks, axe clean on every route, Lighthouse desktop 100 / mobile 94–96, CLS 0.

## Phase 9: Third owner revision — DONE 2026-10-17

- [x] 404: apology line and HumStage button removed.
- [x] Home pitch fits without scrolling (ribbon sizes to its band's height; verified 1280×720 to 1920×1080, both hero states).
- [x] HumStage copy: "an all-in-one platform for events", one infrastructure line, no installer-signing talk anywhere (projects, timeline, Right now, meta).
- [x] Work tiles: one bordered card with a caption bar (name, status).
- [x] PillButton: padding classes no longer stack, so text is centred in arrow-less pills.
- [x] Case hero: no blue wash; desktop and phone side by side on tablets and up; a Desktop / Mobile toggle on phones; both link pills the same height.
- [x] Ribbon: ends fade out over the last sixth of the span, lengthwise shading dark-bright-dark, satin rims; path re-smoothed and evenly resampled. Proof state bounded by height as well (fits from 1280×720 up).
- [x] Work tiles show one-word statuses so names never truncate; wrapped status dots align with the first line; 404 buttons on one row.
- [x] Role lines made concise ("Co-founder and product engineer" etc.); ribbon returned to a flat band (rims removed); proof stack restored (band made a grid item so its height units resolve).
- [x] Mobile: one panel per route (no long flow), hero bands flow normally below the shell breakpoint, fanned stack fits the width, Path spacing tightened, duplicate project list hidden on phones. Audited at 430/480/820px: no overflow, no overlap.
- [x] Case pages on phones: the previous/next cards had no min-width guard, so a nowrap one-liner pushed them past the viewport and clipped everything to the right; fixed and every route probed at 393/430/480/768/820/1023px for anything outside the viewport. Colophon removed from Contact.
- [x] Work: the blue-lilac backdrop behind the tiles removed at the owner's request; tiles sit straight on the stage under a muted label. `--stage-a/b` tokens and `.stage-bg` deleted.
- [x] Next-page hint: the right pager button pulses green on Home until the first navigation (`hintNext` in the shell context, `.pager-hint` in globals.css).
- [x] Mobile motion and performance round: touch screens get their own motion (CSS ribbon drift, page-enter on navigation, tile reveal and tap feedback); icon-only mobile dock; portraits pre-converted to WebP (6 files/~143KB → 2 files/14–19KB on a phone's Home, no preloads); each route renders only its own room (HTML 143KB → 68KB, DOM 1,077 → 433 nodes); Suspense-free room loader (tap → room ~680ms → 40–90ms); Motion trimmed with LazyMotion (46KB → 30KB gz) and parallax/counters/switch moved to CSS; first-load fade and theme-icon pop-in removed. Remaining mobile blocking time is React DOM's own startup.
