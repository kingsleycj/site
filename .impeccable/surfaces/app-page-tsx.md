---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/layout.tsx","components/shell/Shell.tsx"]
---

# Surface: the shell and its seven panels (app/page.tsx and siblings)

Scope: the whole app shell (profile card, sliding stage, dock) and the seven panels; case-study pages inherit the world tokens.
Visitor mode: Experience, with a Persuade job on the first viewport.
Audience: hiring managers, founders and engineers deciding whether to email; people who met HumStage first.
Job: in five seconds say software engineer, building HumStage, open to what's next; then prove range.
Action: email (Let's talk) or open HumStage. Proof: seven projects with honest status, timeline, toolkit, stats from content/.
Constraints: brief-pinned layout (two-zone shell, sliding panels, dock), palette family (mint on carbon, powder light, cyan ash, steel, navy), fonts (Jost/Caprasimo fallbacks, Golos Text, JetBrains Mono, NCL Gasdrifo demo), no invented facts, HarmonyKloud confidentiality.
Memorable moment: the stage sliding sideways between rooms while the card morphs; the request-loop ribbon with the rotating "Building HumStage" badge.
Unresolved: none the brief leaves to the owner; mobile is a swipe pager (recorded in DESIGN.md).

## Direction contract

THESIS: An engineer's workbench you step into: a fixed profile card and a stage that slides sideways between seven rooms. It refuses the long scrolling page of equal cards, the hero-metric template, and the logo wall.

OWN-WORLD: Reference-1's neutrals and one green: page #161616, cards #1a1a1a, light page #f5f5f5, a filled headline chip #0ebf4d with white text, a dark chip with green text, the bright green #00e155 only on the ribbon, the button and the live dots. No tinted backdrops (the owner dropped the reference's blue-lilac work wash). One typeface (Inter) with reference-2's italic serif for a single accent word. No per-project colour, no decorative chips, no counts.

STORY: Software engineer, building HumStage, open to what's next. Then range as proof: projects told as hard part → what I built → where it honestly stands; the build-test-teach-listen loop at HarmonyKloud; a toolkit grouped by problem. The visitor emails, or opens HumStage.

FIRST VIEWPORT: Left, a 360–380px rounded card: cut-out portrait on a navy-to-carbon gradient, "Hey, I'm Kingsley", one-line bio, "Let's talk" pill with a mint arrow circle, "Take my résumé", the pulsing "Building HumStage ↗" pill. On the seam: stacked prev/next and 01 / 07. Right, the stage: a header strip (avatar, name, "Software engineer · Building HumStage ↗", date/time), the headline "I build [backends] [& payment rails] that hold up." at display-xl with cycling chips, under it the request-loop ribbon in mint with packets travelling and a rotating badge at its knot, four stats, and a two-row marquee at the bottom. A floating vertical dock on the far right. The primary action is the "Let's talk" pill in the card.

FORM: Two-zone app shell with a sliding stage, pinned by the brief (reference screenshot). Position on the ordered list: pinned, no list. Seed key: none; the concept roll was skipped because the brief pins the direction and forbids stopping for questions.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
