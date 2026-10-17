# CLAUDE.md — project conventions

Portfolio for Kingsley Nweke (software engineer, co-founder of HumStage). Next.js 16 App Router, TypeScript, Tailwind 4, Motion, Vercel.
Read `DESIGN.md` for the design system and `PRODUCT.md` for product truth before changing UI.

## Commands
- `npm run dev` · `npm run build` · `npm start`
- `npm run check` = `tsc --noEmit` + `eslint .` + `node --test tests/**/*.test.ts` (no test framework; Node 24 strips types)
- Screenshots for QA: Playwright lives outside the repo (see scratchpad notes in the session), never as a dependency. On this machine Playwright 1.63 matches the cached Chromium build; newer browser downloads fail on this OS.
- Never branch rendered markup on `useReducedMotion()`; see DESIGN.md. `MotionProvider` handles reduced motion globally.
- Before calling any layout change done, probe every route (panels, case pages, 404) at phone and tablet widths for elements outside the viewport, not just the panels; a `truncate` inside a grid or flex item needs `min-w-0` on the item or the card grows past the screen.
- Palette and layout follow `reference/refrerence-1.png` (neutral near-black and #f5f5f5, one green, the blue-lilac work stage); the headline treatment follows `reference/reference-2.jpeg` (chips plus one italic serif word). No per-project colour worlds, no decorative chips or counts.

## Structure
- `content/` — every word and number on the site, typed by `content/types.ts`. Components never hard-code copy.
- `lib/` — `fonts.ts` (the only place fonts are declared), `panels.ts` (panel registry and routes), `theme.ts` (no-flash script + hook), `motion.ts`, `contrast.ts`, `cn.ts`.
- `components/ui` primitives · `components/fx` effects · `components/shell` the app frame · `components/panels` one file per panel · `components/hero` · `components/work`.
- `app/` — thin routes: `/`, `/about`, `/path`, `/work`, `/toolkit`, `/now`, `/contact` render the shell with the active panel; `/work/[slug]` case studies; `not-found`, `opengraph-image`, `sitemap`, `robots`.
- `public/screens` WebP captures of the live sites · `public/fonts` font files (+ README) · `public/images/kingsley-dark.png` + `kingsley-colored.png` (theme-matched portraits) · `public/resume/`.
- `tests/` — content guardrails, token contrast, panel registry.

## Rules from the brief (do not relax)
- Real job titles stay: Backend Developer (TekAIDA), Backend Developer (HarmonyKloud), Web3 Developer and Backend Engineer (Genesys Tech Hub).
- Never invent facts, metrics, logos, testimonials, clients or traction. Numbers only from `content/`.
- Never mention a former name of HumStage. Every HumStage mention links to https://humstage.app (new tab).
- HarmonyKloud: no client names or individuals, no real app screens, no audit-logging or EVV mention, website claim stays "I revamped the HarmonyKloud website".
- Honest status (Live / Devnet / Testnet / Beta / Shipped / Building) on every project.
- Voice: first person, dry, short sentences, no buzzwords (`tests/content.test.ts` checks a few).
- One typeface (Inter) everywhere; Instrument Serif italic only for a single accent word in a headline. The bright green is never text on light surfaces (`--accent-text` is the deep green there).
- Dependencies stay minimal: `next`, `react`, `react-dom`, `motion` at runtime. No icon pack, no component kit; icons are hand-drawn in `components/ui/Icon.tsx`.
- Animate transform/opacity (blur and mask allowed when smooth); every effect has a reduced-motion fallback.

## Git
The owner commits. Do not run commands that change history or the index (add, commit, amend, rebase, merge, push, tag, branch deletion)
unless told to in that message. When asked, propose a conventional message like `feat(shell): add profile card and dock`, show it first,
and add no attribution trailers. `SUGGESTIONS.md`, `CLAUDE.md`, `DESIGN.md` stay as normal working-tree files.

## Working style
- Phases: Design system → Shell → Home → remaining panels → Case-study pages → Polish and QA. Stop at the end of each phase and summarise.
- Keep scope tight; don't refactor what wasn't asked. Record disagreements in `SUGGESTIONS.md` instead of deviating.
- The Next.js in `node_modules` is newer than training data: read `node_modules/next/dist/docs/` before using an API you're unsure of. Known: with Cache Components, `dynamicParams` is gone and `notFound()` inside a `"use cache"` page returns 200, so `/work/[slug]` reads params inside Suspense.
