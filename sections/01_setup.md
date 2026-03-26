# 1. Claudeの導入方法

<!-- This section covers everything needed BEFORE you start working:
     which platform to use, and how to set up version control as a baseline habit.
     Skills, MCP, and connectors are covered in Section 2 (Usage) since they require
     understanding prompts and modes first. -->

## 1-1. 利用プラットフォームの選び方

<!-- Decision guide: match the platform to the user's role and technical level.
     Keep this practical — each subsection should answer "is this for me?" clearly. -->

### ブラウザ版（claude.ai）

<!-- Easiest entry point. Just create an account. No installation needed.
     Best for: non-technical staff, document drafting, Q&A, translation, summarization.
     Limitation: no MCP connector support, no file system access. -->

### デスクトップアプリ

<!-- Mac / Windows native app. Visually identical to browser but enables MCP connectors.
     Best for: staff who want to connect Claude to Slack, Google Workspace, Notion, etc.
     NOTE: MCP setup still requires some configuration — covered in Section 2. -->

### API

<!-- For developers building automated workflows or integrating Claude into other systems.
     Not for non-technical staff to use directly.
     NOTE: Requires an Anthropic account with billing set up. -->

### Claude Code

<!-- CLI tool for engineers. Handles code generation, file operations, git, deployment.
     This is the primary tool used to produce the deliverables in Section 4 (Use Cases).
     Best for: engineers and technically confident staff working on projects end-to-end. -->

---

## 1-2. バージョン管理の基本（GitHub）

<!-- NOTE: VCS is moved here from the original Section 3 because it's infrastructure,
     not a use case. Anyone producing text-based work with Claude benefits from Git —
     not just developers. Frame it as "how you save and share Claude's work safely." -->

### バージョン管理とはなにか

<!-- Analogy: Google Docs revision history, but for any file type.
     Key benefits: full change history, safe collaboration, ability to roll back mistakes.
     This becomes essential once Claude starts producing files you want to keep and reuse. -->

### GitHubとツナガル社のOrganization

<!-- Introduce github.com/Tsunagaru-Inc as the company's shared workspace.
     Explain: repositories = project folders with history.
     OPTIM: Later, we could distribute company-standard CLAUDE.md templates and
     approved skills directly from the org account. -->

### 非エンジニア向け：Gitの最低限の概念

<!-- Cover only: clone, commit, push. Enough to understand what Claude Code is doing.
     Avoid command details here — Claude Code handles the commands itself.
     The goal is for staff to not be alarmed when Claude says "I'm committing this file." -->
