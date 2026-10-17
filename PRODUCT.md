# Product

<!-- impeccable:product-schema 1 -->

> Written from the owner's build brief (2026-10-17) with no interview; the brief said not to stop for questions. Facts marked *(inferred)* are my reading of the brief, everything else is quoted or paraphrased from it or from the sources it names.

## Platform

web

## Stack

delegated: Next.js (App Router), TypeScript, Tailwind CSS, Motion, deployed on Vercel. The brief pins these and asks for minimal dependencies, hand-drawn SVG, no template, component kit, or icon pack.

## Users

- Hiring managers, founders and engineers deciding whether to talk to Kingsley about a role or contract work; they arrive from LinkedIn, GitHub or a shared link and decide in the first screen *(inferred)*.
- People who meet HumStage first and want to know who is behind it *(inferred)*.
- Kingsley himself, editing copy in `content/` without touching components.

## Product Purpose

A personal portfolio for Kingsley Nweke, software engineer and co-founder of HumStage. Success: within five seconds the first screen says who he is, what he builds, and that he is building HumStage; the rest of the site proves range with depth through real projects, an honest timeline, and a toolkit grouped by problem solved.

## Positioning

Headline identity is **software engineer**, full stop. The co-founder thread (HumStage) is a second, always-visible line. Range is shown as proof (projects, timeline, toolkit), never as narrow labels. The HarmonyKloud story is the sharpest proof of range: he builds the feature, tests it, trains clients on it, and sits with the people using it (forward-deployed, as a way of working, never a title).

## Operating Context

- Panels: Home, About, Path, Work, Toolkit, Right now, Contact; each linkable by URL. Case-study pages under `/work/<slug>`.
- Honest status vocabulary is part of the brand: Live, Devnet, Testnet, Beta, Shipped (client work).
- HumStage is live; its desktop app is in beta with unsigned installers. Every HumStage mention links to https://humstage.app.

## Capabilities and Constraints

- Real job titles stay exactly: Backend Developer (TekAIDA Consulting, 04/2026–present), Backend Developer (HarmonyKloud, 06/2025–present), Web3 Developer (Genesys Tech Hub, 12/2024–12/2025), Backend Engineer (Genesys Tech Hub, 03/2022–07/2023).
- Never invent facts, metrics, logos, testimonials, clients, or traction. Only numbers from the sources: 4+ years building (since 2022), 500+ users on HarmonyKloud, 633 tests on HumStage, 255ms vote propagation at a 500-person event, 95/100 mobile and 100/100 desktop PageSpeed on Imago Dynamics Media, 300+ SIMBI-AI questions during the Learnable demo, 50+ students on eBuzz launch week.
- HarmonyKloud: never name client organisations or individuals; never show the real app or any client or patient data; never mention audit logging or Electronic Visit Verification; don't dwell on payer-specific billing; website-revamp claim stays general and links to https://harmonykloud.com.
- Do not mention any former name of HumStage. VibeCraft's database is PostgreSQL on Supabase. Education shows no CGPA.
- Copy: first person, dry, honest, curious; no "passionate about", "cutting-edge", "ninja"; projects told as hard part → what I did → where it honestly stands.

## Brand Commitments

- Voice from the current site (https://kingsleynweke.vercel.app): "Still mostly curious", "Allergic to hand-waving", section numbering `(01)—Label`.
- Visual direction (revised by the owner on 2026-10-17 after the first build): follow `reference/refrerence-1.png` exactly for palette and layout (near-black `#161616` page, `#1a1a1a` cards, `#f5f5f5` light page, one green `#00e155`/`#0ebf4d`, a soft blue-lilac work stage) and its ribbon; one Inter-class typeface with reference-2's italic serif accent word; no per-project colour worlds, no decorative chips, few numbers.
- Craft ethos: hand-drawn SVG, no icon pack, no template.

## Evidence on Hand

- Portraits: `public/images/kingsley-dark.png` (896×1200, dark filter, used in dark mode) and `public/images/kingsley-colored.png` (960×1280, natural colour, used in light mode); both transparent cut-outs.
- Résumé: `public/resume/kingsley-resume.pdf`.
- Reference layouts: `reference/refrerence-1.png`, `reference/reference-2.jpeg` (layout logic only; never copy copy, imagery, logos or the 3D asset).
- Screenshots captured by Playwright from humstage.app, vibecraft.today, dojopay.vercel.app, imagodynamicsmedia.com, harmonykloud.com (public marketing only) into `public/screens/`.
- Absent, never fabricate: client logos, testimonials, traction numbers for HumStage, results of the HarmonyKloud website revamp, commercial fonts.

## Product Principles

1. Honest over impressive: a testnet, a beta or an unsigned installer is said with style, never hidden.
2. Range shown as proof, not labels.
3. Every number on the page has a source in `content/`.
4. The owner edits copy without touching components.
5. Immersion never hides content or breaks keyboard navigation; first paint stays fast.

## Accessibility & Inclusion

WCAG AA contrast in both themes (enforced by a token test), semantic landmarks, visible focus, keyboard-operable pager and dock, alt text, `prefers-reduced-motion` fallbacks for every effect.
