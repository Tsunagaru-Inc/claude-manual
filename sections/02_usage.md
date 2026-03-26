# 2. Claudeの使い方

<!-- Structure follows a logical learning progression:
     1. How Claude "listens" (system prompt / user prompt concepts)
     2. CLAUDE.md — the company's tool for controlling that listening at scale
     3. Modes — the different ways to interact (Chat, Cowork, Code)
     4. Claude Tools — Skills, Connectors, MCP (extensions to capability)
     5. External CLI tools — what gets installed and why

     Security has been promoted to its own Section 3. -->

---

## 2-1. プロンプトの仕組み

<!-- Foundation: before introducing any tools, explain HOW Claude receives instructions.
     This makes Skills, CLAUDE.md, and MCP make intuitive sense rather than feeling magic. -->

### システムプロンプトとユーザープロンプト

<!-- System prompt: the "briefing" given before the conversation starts.
     Sets role, constraints, tone, language, and permissions.
     User prompt: each individual message in the conversation.
     Analogy: system prompt = job description; user prompt = daily task assignment. -->

### なぜこれを理解する必要があるか

<!-- CLAUDE.md, Skills, and MCP connectors all operate at the system prompt level.
     Understanding this means users can reason about WHY Claude behaves differently
     across different projects, and what to do when it doesn't behave as expected. -->

---

## 2-2. CLAUDE.md — プロジェクトの「憲法」

<!-- KEY SECTION for organizational adoption. This is the primary "sane scaffolding" tool.
     A CLAUDE.md file tells Claude who it's working for, what rules apply, and what's off-limits.
     Creating one per project ensures consistent, safe, repeatable behavior across all staff. -->

### CLAUDE.md に書くべきこと

<!-- - Project purpose and context (what are we building / doing?)
     - Output language and format preferences
     - Permitted and forbidden actions (e.g. "never commit without asking", "always write in Japanese")
     - Security rules (e.g. "never include real customer data in outputs")
     - Relevant tools and their usage constraints
     NOTE: A company-level base CLAUDE.md template should be created and distributed
     from the Tsunagaru GitHub org. Projects then extend it as needed. -->

### CLAUDE.md の作り方（実例）

<!-- Concrete sample to be written during content pass.
     Show: a minimal version (5 lines) and a fuller version (project-specific).
     OPTIM: Link to the company's canonical template in the GitHub org once created. -->

---

## 2-3. 利用モードの違い

<!-- Claude can be used in three fundamentally different modes.
     Choosing the right one for the task determines quality and safety outcomes. -->

### チャットモード（Chat）

<!-- Standard conversation. Best for: Q&A, drafting, brainstorming, translation, summarization.
     No file system access. No tool use. Lowest risk mode.
     Available on: browser, desktop app, mobile. -->

### 協働モード（Cowork）

<!-- Claude Code in interactive mode: Claude and the user work together on a project.
     Claude can read/write files, run commands, use connectors — but asks before acting.
     Best for: guided project work where a non-engineer wants Claude to do more than chat.
     NOTE: This is the recommended mode for most structured work at Tsunagaru. -->

### コードモード（Code / Autonomous）

<!-- Claude Code running with higher autonomy. Used for automated pipelines.
     Best for: engineers setting up recurring tasks or deployment workflows.
     WARN: This mode can make irreversible changes. Requires a solid CLAUDE.md with
     explicit constraints before use. Not recommended for non-technical staff. -->

---

## 2-4. Claudeのツール拡張

<!-- Claude's capabilities can be extended in three complementary ways.
     All three work at the system prompt level — hence why 2-1 comes first. -->

### Skills（スキル）

<!-- What a Skill is: a Markdown file containing specialized instructions and workflows.
     Installing a Skill = adding a domain expert's playbook to Claude's briefing.
     Examples: Google Workspace skill, Vercel skill, presentation (pptx) skill.
     How to install: manual / marketplace / npx skills CLI.
     OPTIM: Tsunagaru-approved skill list to be maintained in the GitHub org. -->

### MCPコネクタ（外部ツール連携）

<!-- MCP (Model Context Protocol): lets Claude directly operate external tools.
     Examples: read/send emails via Gmail, create Notion pages, post to Slack.
     Requires: Desktop app or Claude Code + MCP server configuration.
     NOTE: Cover setup basics here; security implications are in Section 3. -->

### Projects（プロジェクト機能）

<!-- Claude.ai's built-in project memory: persistent context across conversations.
     Useful for ongoing work where you don't want to re-explain context each session.
     Can store a CLAUDE.md equivalent as the project's system prompt. -->

---

## 2-5. 外部CLIツールの準備

<!-- Some workflows require additional tools on your computer.
     Claude Code will tell you when something is missing and often install it for you.
     This section demystifies what gets installed and why — not a step-by-step guide. -->

### 主なツールと用途

<!-- - Node.js / npm: required to run Claude Code and most Skills
     - Git: version control (see Section 1-2)
     - gh (GitHub CLI): lets Claude interact with GitHub repositories
     - gws (Google Workspace CLI): enables Google Drive, Docs, Sheets, Calendar operations
     NOTE: Claude Code handles installation prompts. Staff just need to approve them. -->
