# Kingsley Nweke — portfolio

Software engineer, co-founder of HumStage. A two-zone shell: a profile card that morphs per panel, a stage that slides between seven rooms, a floating dock. Next.js 16, TypeScript, Tailwind 4, Motion, deployed on Vercel.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
```

## Check and build

```bash
npm run check      # typecheck + lint + content/contrast/panel tests
npm run build      # production build (21 static routes)
npm start          # serve the build
```

## Deploy

Push to the Git remote connected to the Vercel project; the defaults (framework Next.js, `npm run build`) are all it needs. No environment variables.

## Where things live

- `content/` — every word and number on the site, typed. Edit copy here, never in components.
- `app/globals.css` — the design tokens (dark and light themes, project worlds, type scale, motion).
- `lib/fonts.ts` — the one place fonts are declared (Inter, Instrument Serif italic).
- `DESIGN.md` — the design system as built. `CLAUDE.md` — project conventions. `PRODUCT.md` — product truth. `SUGGESTIONS.md` — things to reconsider.
- `public/screens/` — WebP captures of the live sites, served through `next/image`.
