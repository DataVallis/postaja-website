# Rules for AI agents in this repo

- Talk to the owner (David) in **Slovenian**; code, comments, commits and PRs in **English**.
- Slovenian is the default locale. Every text lives in `messages/sl.json` **and** `messages/en.json` with the same keys
  (`pnpm test` fails otherwise). No copy hard-coded in components.
- Business facts (prices, plans, credits, company data, URLs) live only in `src/site.ts`. Prices must match the
  Postaja business plan; never invent numbers — unknown values stay `null` and are hidden.
- Brand: colours and type from `docs/brand/BRAND.md` in `DataVallis/postaja` (ink `#12172B`, signal `#FF5A1F`,
  paper `#F4EFE6`, Inter). Voice: short, calm, practical, no hype words, no emoji.
- Do not single out Slovenian diacritics as a selling point — correct č/š/ž is a given, not a feature (owner, 2026-10-11).
- Before a PR: `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.
