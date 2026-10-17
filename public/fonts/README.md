# Fonts

One family for everything, plus one italic serif for a single accent word in headlines, following the references.

| Slot (CSS var)   | Face                                | File                              |
|------------------|-------------------------------------|-----------------------------------|
| `--font-sans`    | Inter (variable 300–800)            | `Inter-Variable.woff2`            |
| `--font-accent`  | Instrument Serif Italic             | `InstrumentSerif-Italic.woff2`    |

Both are loaded once in `lib/fonts.ts` with `next/font/local`. `og/` holds TTF copies for the share-image renderer,
which cannot read woff2. Google Fonts, SIL Open Font License 1.1.
