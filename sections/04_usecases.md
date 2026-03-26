# 4. 活用事例

<!-- Replaces the original "deploy" section. Deployment is now a sub-topic within use cases,
     not the headline. This better serves non-technical readers who need concrete examples
     before they can appreciate the deployment workflow.

     Structure: everyday use cases first (low barrier), building up to technical outputs.
     Each use case maps to a risk level from Section 3.

     OPTIM: As real Tsunagaru use cases emerge from the team (西園さん's use case list,
     GM会 initiative), replace the generic examples below with company-specific ones. -->

---

## 4-1. 文書作成・翻訳・要約

<!-- Risk Level 1. No special tools required. Browser version is sufficient.
     Examples:
     - Drafting internal memos, meeting summaries, job postings
     - Translating documents between Japanese and English
     - Summarizing long reports or email threads
     - Creating structured templates for recurring documents
     NOTE: This is the ideal entry point for ALL non-technical staff.
     Good CLAUDE.md to introduce: output language, tone, format preferences. -->

---

## 4-2. スプレッドシート・データ整理

<!-- Risk Level 1-2 depending on data content. Desktop app or Claude Code.
     Examples:
     - Cleaning and reformatting CSV/spreadsheet data
     - Generating formulas and pivot table structures
     - Summarizing data into a narrative report
     WARN: If the spreadsheet contains customer data, treat as Level 2 or 3.
     Anonymize before inputting. -->

---

## 4-3. プレゼンテーション・資料作成

<!-- Risk Level 1. Uses the pptx skill or Google Slides connector.
     Examples:
     - Generating a slide deck outline from a brief
     - Populating a template with new content
     - Redesigning slide structure for clarity
     NOTE: The pptx skill enables working with PowerPoint files directly in Claude Code. -->

---

## 4-4. 社内ツール・ダッシュボードの作成

<!-- Risk Level 2-3 depending on data. Claude Code required.
     Examples:
     - HTML/CSS dashboard displaying internal KPIs
     - Simple data visualization from a spreadsheet
     - Internal form for collecting structured information
     WARN: If the tool will be accessed by others, see Section 4-5 (deployment)
     and Section 3-5 (when to involve an engineer). -->

---

## 4-5. アプリ・ツールの公開（デプロイ）

<!-- Risk Level 3 for anything externally accessible. Engineer involvement required.
     This sub-section covers the deployment pipeline used for Section 4-4 outputs. -->

### GitHub を使ったコード管理

<!-- All deployable projects should live in a GitHub repository (see Section 1-2).
     Claude Code handles most git operations — staff need to understand what's happening,
     not execute commands manually. -->

### Vercel を使った公開

<!-- Vercel: connect a GitHub repo and it auto-deploys on every code push.
     Good for: static sites, dashboards, internal tools, simple web apps.
     Walk through the basic flow: GitHub repo → Vercel project → live URL. -->

### 公開範囲とアクセス制御

<!-- The most important decision before deploying: who can access this?
     - Internal only: use Vercel password protection or Basic Auth as a minimum.
     - External (customers/partners): requires proper authentication — involve an engineer.
     NOTE: "It has a URL" does not mean "it is private." A URL with no access control
     is publicly accessible. This is a common and costly mistake. -->
