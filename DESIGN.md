# DESIGN.md — the system behind every pixel

The portfolio of Kingsley Nweke: software engineer, co-founder of HumStage. This file is the design system as built, after the
owner's revision of 2026-10-17: the palette, layout and ribbon follow `reference/refrerence-1.png`; the headline treatment follows
`reference/reference-2.jpeg`. Tokens live in `app/globals.css`, components in `components/`, every word in `content/`.
If this file and the code disagree, fix one.

## 1. Idea

**An engineer's workbench you step into.** A fixed profile card on the left, a stage on the right that slides sideways between seven
rooms (Home, About, Path, Work, Toolkit, Right now, Contact), a floating dock to jump between them. The first screen says three things
within five seconds: *software engineer*, *building HumStage*, *open to what's next*. Everything after that is proof.

What it refuses: colour worlds per project, decorative chips, scores and counts, more than two numbers on the first screen.

## 2. Colour

Strategy: **neutral with one green.** Near-black page and slightly lighter cards in dark; `#f5f5f5` and white in light.
Green does three jobs only: the headline chip, the ribbon and the button, and the small "running" dots. Nothing else is coloured:
the Work tiles sit straight on the stage with no backdrop (the owner dropped the reference's blue-lilac wash).

| Token | Dark | Light | Job |
|---|---|---|---|
| `--surface` | `#161616` | `#f5f5f5` | page |
| `--surface-raised` | `#1a1a1a` | `#ffffff` | the card, the stage, cards |
| `--surface-overlay` | `#222322` | `#ffffff` | the dock, hovers |
| `--surface-sunken` | `#111111` | `#ececec` | wells, tags, small arrow circles |
| `--border` / `--border-strong` | `#262626` / `#333333` | `#e4e4e4` / `#d0d0d0` | hairlines |
| `--text` / `--text-muted` / `--text-faint` | `#f2f2f2` / `#9a9a9a` / `#6a6a6a` | `#141414` / `#6b6b6b` / `#9a9a9a` | ink |
| `--accent` | `#00e155` | `#00e155` | the ribbon, the button green, the live dot |
| `--accent-chip` | `#0ebf4d` | `#0ebf4d` | the filled headline chip (white text, the reference's own pairing) |
| `--accent-deep` | `#0c8b39` | `#0c8b39` | the ribbon's shaded ends |
| `--accent-ink` | `#0b1a10` | `#0b1a10` | ink on the button green |
| `--accent-text` | `#22d862` | `#0b7a37` | green as text: the italic accent word, hover colour. Never the bright green on light |
| `--tonal-bg` / `--tonal-text` / `--tonal-accent` | `#242424` / `#e4e4e4` / `#22d862` | `#141414` / `#f5f5f5` / `#00e155` | the dark "& brands" chip with green text, both themes |
| `--status-on` / `--status-off` | `#00e155` / `#8a8a8a` | `#0b7a37` / `#8a8a8a` | status dots: running vs not yet |
| `--shadow-1`, `--shadow-2` | offset + blur | | depth |

Rules
- Every text/background pair is AA (`tests/contrast.test.ts`).
- Portraits are pre-made WebP files in `public/images/portrait/` (320/480/640/896px wide plus a 160px face crop for avatars, dark-filtered and natural colour), served by `Portrait` as a plain `srcset` with no on-demand optimiser. Both theme variants are `loading="lazy"`, so the hidden variant, and any copy inside a hidden container (the desktop card on a phone), is never downloaded. The original PNGs stay in `public/images/` as sources (and for the share image).
- Screenshots go through `next/image` (cached a month at the edge, `images.minimumCacheTTL`). Theme-switched pairs are lazy; only a page's main image uses `priority` (eager + high fetch priority). Never use the deprecated `priority`/`preload` of `next/image` itself: it preloads even hidden variants. The one exception is the headline chip, white on `#0ebf4d` (~2.4:1), kept because the reference does it and the owner asked for the exact palette; it is display size only.
- No gradients except the ribbon. No grain, no glow, no colour per project, no backdrop behind the work tiles.
- A DojoPay screenshot is brown because DojoPay is brown: screenshots sit on neutral dark cards, never on a tinted tile.

## 3. Typography

| Slot | Face | Use |
|---|---|---|
| `font-sans` (`--ff-sans`) | **Inter** variable 300–800 | everything: headlines (500), body (400), labels (400, 12px), buttons (500) |
| `font-accent` (`--ff-accent`) | **Instrument Serif** italic | one word in a headline ("hold up"), the pull-quote, the footer line |

Loaded once in `lib/fonts.ts`. `font-feature-settings: "cv11", "ss01"` gives Inter the single-storey a and open digits that read like the reference.

Scale: `text-display-xl` clamp(2.5–4.25rem) / 1.06 / -0.03em · `display-lg` clamp(2–3.25rem) · `display-md` clamp(1.5–2.125rem) · `display-sm` 1.25rem ·
`stat` clamp(2.5–3.75rem) · `body-lg` 1.0625rem · `body` 0.9375rem · `small` 0.875rem · `caption` 0.75rem · `micro` 0.6875rem.
The hero headline uses `.hero-headline` (clamp 2.3–4.4rem, weight 500) because it is sized for the stage, not the viewport.

### The headline
`I build [backends] / [& whole websites] that / hold up.` — three lines on the shell, like the reference. Chip one is `Chip variant="hero"`
(green, white text), chip two `variant="tonal"` (dark, green text), both `size="display"` so they inherit the headline size; the last
two words are the italic serif in `--accent-text`. Static: the range lives in the bio and the work, not in a word cycler.

Labels (`.label`) are Inter at 12px, sentence case, muted, tabular numerals. The `(01)—Label` eyebrow above each panel title is the
owner's house pattern; the numbers are real panel order.

## 4. Space, shape, depth
- 4px grid. Panels pad 32px (40px wide) at the sides and 32px top on the shell; sections inside a panel separate by 48–64px.
- Radii: `xs` 6 · `sm` 10 · `md` 16 · `lg` 24 · `xl` 32 · `pill` 999. Card and stage `xl`; project cards `lg`; chips and buttons `pill`; tags `xs`.
- Shadows carry an offset and a blur; the ribbon has its own soft drop shadow drawn in the SVG.

## 5. Motion
Durations 160 / 280 / 520 / 640ms. `ease-out` (.22,1,.36,1) for arrivals, `ease-in-out` (.65,0,.35,1) for moves, `spring.snappy` for the dock label,
`spring.stage` for the fanned stack's deal.

| Moment | Behaviour |
|---|---|
| Panel slide | the stage track translates one panel width (CSS transition 640ms); inactive panels sit at 50% opacity and are `inert`; the URL is the source of truth |
| Card morph | the card body cross-fades 280ms with a 10px lift |
| Dock label | hover/focus pill with `spring.snappy`; "you are here" shows 2.6s after a change, then fades |
| Page enter (phones) | a room reached by navigating rises 14px and fades in over 420ms (`.panel[data-enter]`); never on first load, so the landing page paints at once |
| Touch feedback | Work tiles and fanned cards scale to 0.97–0.98 while pressed; Work tiles also rise into view as you scroll |
| Theme icon | animates only when the visitor changes the theme; the first icon is simply there |
| Next-page hint | on Home, until the visitor's first move this visit (any means: button, dock, keys, back button), the next button carries `.pager-hint`: a green border, a 2.4s breathing glow, and a 2px ring that expands to 2.1× and fades (`::before`). Hover pauses it; reduced motion swaps it for a static green halo. Desktop only, since the buttons are |
| Counters | the two stats count up once in view (1.4s, a small rAF tween in `Counter`, no library) |
| Ribbon | the badge's 30s rotation; on desktop a 5–11px pointer parallax (the group writes `--px`/`--py`, each `.parallax-layer` follows through a `translate` transition); on touch screens the same layers drift on an 11s CSS loop (`@keyframes drift` on `translate`, compositor-only). The silhouette is `components/hero/ribbon-path.ts`, traced from reference-1 with a contour tracer, smoothed and evenly resampled. Shading, mapped to the silhouette's span (`RIBBON_SPAN`): one lengthwise gradient only, dark at both ends, bright through the middle, with a dip where the band passes behind the crossing; both ends dissolve over the last sixth; a soft drop shadow (lighter in light mode via `--ribbon-shadow`). No rims or cross-width washes: those read as a tube, and the reference is a flat band. The badge sits on the crossing at viewBox (375, 82) r77 and is translucent |
| Fanned stack | five cards deal in with `spring.stage`, lift 14px on hover |
| Work grid | tiles lift and enlarge on hover (`spring.hover`, scale 1.025); hovering or focusing a tile hands that project to the card; the card's arrows step through tiles |
| Hover / press | 2px lifts, press to 0.98, arrow circles rotate 45° |

`MotionProvider` sets `reducedMotion="user"`; CSS keyframes are zeroed under `prefers-reduced-motion`. Never branch rendered markup on
`useReducedMotion()` (the server cannot know it); use the hook only inside effects.

## 6. Layout
- **Shell (≥ 1024px)**: viewport-high frame, 16px padding (20px at ≥ 1440px) with extra room on the left for the tab. Profile card 360px (380px wide), `xl` corners, the prev button on its left edge (half outside); 28px (32px wide) to the stage. Stage: `xl` corners, the header row in flow (avatar, name, role · Building HumStage ↗, date/time), then the sliding track, the next button on its right edge; panels scroll inside with the scrollbar hidden (the reference shows none) so the header and the content share one right edge. Measured at 1920×1080: every left edge in the stage sits at the same x, as do the switch, stats, strip and clock on the right. Dock: a solid `#222322` pill (52px) on the right with the theme toggle, seven icons and back-to-top. The "Open to what's next" tab is fixed to the left edge of the screen: a dark rounded-right tab, 192px tall, vertical text, green dot at the bottom, like the reference's "Available for work".
- **Home**: a two-row grid. Row 1 the headline (cols 1–11); the ribbon band spans both rows in cols 5–12 (`.ribbon-band`, a size container) so the ribbon rises beside the headline's short last line as in the reference, and the ribbon itself is `width: min(100%, 180cqh)`: as wide as the band unless the band's height is the tighter limit. Two stats and the places strip sit at the bottom, the Next link last. Verified to fit without scrolling from 1280×720 up, in both hero states.
- **Work**: a grid of tiles straight on the stage (2 columns, 3 at ≥ 1440px), under a small muted "Work highlights" label: each tile is one bordered card, the screenshot above a 40px caption bar with the name on the left and the status on the right; hover lifts and enlarges the tile, click opens the case study. Then a numbered list of all projects (number, name, role, year, as reference-2 does), then "And a few more".
- **Text panels**: content in 7 columns, aside in 5 (About); two columns (Now); 4 + 8 (Toolkit, group → a sentence of tools).
- **Rendering**: each route passes its own room to `Shell` as `children`, so only that room is server-rendered and hydrated and the route's bundle carries only its code. The other rooms come from `components/panels/index.tsx` (a small loader, deliberately not `next/dynamic`: its Suspense boundary held a blank fallback ~300ms after every tap). On the shell they mount one per idle moment, nearest first, so slides are instant; on phones their code is fetched while idle and they mount on visit (tap to room ≈ 40–90ms). An unmounted room is a `PanelSlot` of the same size so the sliding track never misaligns.
- **Mobile and tablet (< 1024px)**: each route is its own page: only the active panel shows (`max-shell:hidden` on the others), under the sticky header (avatar, name, role, compact HumStage pill, theme), above an icon-only bottom dock; navigation pushes the URL and scrolls the window to the top; each panel ends with a Next link. The profile intro renders at the top of Home; the numbered project list is desktop-only (the tiles already carry it). The hero bands flow normally there (no container sizing); the fanned stack uses 52%-wide cards stepped 12% so the fan fits the width. Measured on 430, 480 and 820px wide: Home is about one screen, nothing overflows horizontally.
- Breakpoints used: `sm` 640 · `shell` 1024 · `wide` 1440.

## 7. Components
`components/ui`: `Icon` (hand-drawn stroke set; `x`, `instagram`, `whatsapp`, `linkedin`, `github` included), `Chip` (hero / tonal / filled / outline; sm md lg display),
`ArrowCircle`, `PillButton` (primary / secondary / ghost), `PagerButton`, `StatusBadge` (dot + word, optional pill), `Tag`, `SectionHeader`,
`RotatingBadge` (dark disc, circling text, coil mark), `FounderBadge` (pill / inline / compact), `ThemeToggle`, `Marquee`, `StatBlock`, `DeviceFrame`.
`components/fx`: `Counter`, `Reveal` (visible until hydration via `html[data-js]`), `ParallaxGroup/Layer`, `MotionProvider`.
`components/shell`: `Shell`, `Stage`, `StageHeader`, `Panel`, `Pager`, `Dock`, `MobileDock`, `MobileHeader`, `ProfileCard` + `card-states` (Home with the three social buttons on the portrait, About, Path with `CareerStrip`, Work with Year / Role / Status and the project pager, Toolkit, Now, Contact), `AvailabilityTab`, `Clock`.
`components/hero`: `ChipHeadline`, `Ribbon`, `FannedStack`, `HeroSwitch`, `Stats`, `WorkedAt`, `MobileIntro`.
`components/work`: `WorkGrid`, `ProjectPreview` → `ThemedScreen` or `AbstractScreen` (dark card, name set large), `CaseStudy`, `BuildTestTrainLoop`.

### Case-study page
Structured like an agency work page: counter and title, the one-liner, a four-column facts row between hairlines (Period, Role, Kind/For, Status),
one hero composition on the plain page (`ScreenSwitcher`): on tablets and up the desktop capture in a browser frame with the phone beside it; on phones one preview at a time behind a Desktop / Mobile toggle, never repeated below,
then Overview with the links, the four story sections (The problem, The hard part, What I built, Where it honestly stands) as label-left reading
rows, Built with as a sentence, and previous/next project cards. The slim sticky bar carries back-to-work, name, the compact HumStage pill and the theme toggle.

## 8. Inventing a screen that isn't in the reference
1. Decide the room: a panel (lives in the stage, gets a card state, a dock icon, a `(0n)—Label`) or a page (full width, the slim top bar).
2. Ground: `bg-surface`; cards `bg-raised` with `border-border`. No washes or tinted backdrops.
3. Compose from primitives. A new component is allowed only when two panels need it.
4. Type: one Inter headline, body in Inter, at most one italic serif word. No chips unless the reference shows one there.
5. Green: a chip in a headline, a button, a dot. Never a background, never body text.
6. Motion: one orchestrated moment on enter, hover lifts, nothing autoplaying except the status dot and the badge.
7. Check: `npm run check`, keyboard reachable, reduced motion, 390px width.

## 9. Accessibility floor
Landmarks, skip link, visible focus ring in green, inactive panels `inert`, keyboard pager and dock, alt text from `content/`, status notes for
screen readers, AA contrast enforced by test (with the one documented exception), reduced motion respected.
