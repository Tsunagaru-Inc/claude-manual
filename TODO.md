# TODO — Claude 社内活用マニュアル

## Phase 2: Content Pass (v0.1.0)

- [x] Skeleton structure agreed and committed
- [ ] Section 00: overview prose
- [ ] Section 01: setup prose
- [ ] Section 02: usage prose (incl. CLAUDE.md sample)
- [ ] Section 03: security prose
- [ ] Section 04: use cases prose + deployment subsection
- [ ] Tag v0.1.0 + push to remote

## Phase 3: Review & Depth Pass (v0.2.0)

- [ ] Resolve all TODO/FIXME/WARN comments in section files
- [ ] Add CLAUDE.md template example (real sample, not placeholder)
- [ ] Add company-specific use cases from 西園さん's list
- [ ] README final pass
- [ ] Tag v0.2.0

## Phase 4: Presentation Layer (separate session)

- [ ] reveal.js slide deck via `revealjs` skill
- [ ] PDF export via `anthropic-skills:pdf`
- [ ] Distribute via Notion or Slack MCP

## Decisions Log

| Date       | Decision                                              | Rationale                                              |
|------------|-------------------------------------------------------|--------------------------------------------------------|
| 2026-03-26 | Security promoted to standalone section (§3)          | High-enthusiasm low-skill context requires prominence  |
| 2026-03-26 | Section 3 renamed to Use Cases; deploy is subsection  | Deployment is one output type, not the main narrative  |
| 2026-03-26 | GitHub/VCS moved to §1 Setup                          | VCS is infrastructure, not a use case                  |
| 2026-03-26 | Skills/MCP moved to §2 Usage                          | Requires understanding prompts first                   |
