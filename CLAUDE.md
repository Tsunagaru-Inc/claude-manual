# Claude Manual — Project Instructions

## Project
Internal Claude adoption manual for ツナガル株式会社. Primary audience: non-technical Japanese staff and managers. Language: Japanese throughout. Comments in code/markdown: English.

## Comment Tags
Use these markers in markdown files:
- `<!-- TODO: ... -->` — work to be done
- `<!-- OPTIM: ... -->` — deferred improvement
- `<!-- NOTE: ... -->` — editorial intent, do not remove
- `<!-- WARN: ... -->` — safety-critical content, do not soften
- `<!-- FIX: ... -->` — broken content to repair

## Conventions
- Section files: `sections/NN_name.md` (00–04)
- Sections are numbered `N-N` (e.g., `2-3`) and cross-referenced as `§2-3`
- Japanese body text in ですます調
- Strip HTML comments from all reader-facing output (HTML, PDF, Google Docs)
- Commit after each section using conventional commits: `docs(section): ...`
- Use `jj commit -m "..."` — never leave `@` with no description

## Version Control
- Use `jj` (Jujutsu) for all VCS operations
- Use bookmarks, not branches: `jj bookmark set main -r @-`
- Push: `jj git push --bookmark main`
- Tag releases: `jj tag set vX.Y.Z -r @-` then `git push origin vX.Y.Z`

## Design Context

### Users
Non-technical Japanese staff at ツナガル株式会社. High enthusiasm, low technical skill. Manager-level sophistication for v0.1. Goal: confident, informed adoption of Claude — not overwhelmed.

### Brand Personality
安心・実直・構造的 — Trustworthy, straightforward, structured. Not a marketing doc. A well-made internal handbook.

### Aesthetic Direction
- **Color:** Neutral — #FFFFFF bg, #1A1A1A text, #4A4A4A accent, #F5F5F5 callout, #F0F0F0 code
- **Typography:** Noto Sans JP + system stack, 16px body, 1.75 line-height, strong heading scale
- **Layout:** 800px centered, sticky left sidebar, mobile-collapsible
- **References:** Notion, Apple manuals, Stripe docs
- **Anti-references:** Startup landing pages, gradients, decorative icons, anything ad-like
- **Theme:** Light only. Print-ready.

### Design Principles
1. Hierarchy over decoration
2. Typography is the design
3. Callouts earn their place
4. Progressive disclosure — sections are self-contained
5. Print-ready HTML as the canonical output format
