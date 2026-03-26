# 3. セキュリティの考え方

<!-- PROMOTED from a subsection of Section 2 to a standalone section.
     Rationale: given the "high-enthusiasm, low-skill" adoption context at Tsunagaru,
     security cannot be an afterthought or a footnote. It needs to be a first-class topic
     that any staff member encounters before they start doing real work.

     This section is NOT about technical security. It's about building a decision-making
     instinct: "should I be giving this information to Claude right now?" -->

---

## 3-1. なぜAI利用にはリスクがあるのか

<!-- Explain the core risk in plain terms: Claude is a cloud service.
     What you type is sent to Anthropic's servers (and potentially used for training
     unless you're on an enterprise plan with data opt-out).
     This doesn't make Claude dangerous — it makes INPUT CHOICES important.
     Analogy: like sending a work email to an external contractor. Would you share this? -->

---

## 3-2. 情報のリスクレベル分類

<!-- A 3-level model gives non-technical staff a mental framework they can actually use.
     The goal is fast, instinctive decision-making — not a lengthy compliance checklist. -->

### レベル1：低リスク（自由に使える）

<!-- Public or fully anonymized information. Safe to use without restrictions.
     Examples: writing/editing text, translating public content, brainstorming ideas,
     summarizing articles, creating presentation outlines, generating templates.
     Rule: if it could be posted on the company website, it's Level 1. -->

### レベル2：中リスク（注意して使う）

<!-- Non-public internal information that doesn't directly identify individuals.
     Examples: internal process documentation, anonymized project notes,
     general business strategy discussion (without sensitive financials).
     Rule: anonymize before inputting. Remove names, client identifiers, specific numbers. -->

### レベル3：高リスク（使用前に確認必須）

<!-- Personal data, client information, financial records, login credentials, API keys.
     Examples: employee records, customer names/contacts, contracts, passwords.
     Rule: DO NOT input without explicit approval from your manager AND IT/engineering.
     NOTE: This is not a technical rule — it is company policy. -->

---

## 3-3. 絶対に入力してはいけない情報

<!-- A clear, short list. No nuance needed here — just hard stops.
     - Passwords and login credentials (any account, any system)
     - API keys and secret tokens
     - Personal identification numbers (マイナンバー, passport, etc.)
     - Unpublished financial data or M&A information
     - Customer personal data (names, emails, addresses, phone numbers)
     - Any data subject to NDA or confidentiality agreement
     WARN: Claude will not refuse to accept this information — the responsibility is yours. -->

---

## 3-4. シークレット管理の基本

<!-- For staff who work on Claude Code projects that involve API keys or credentials.
     Core principle: secrets never go in files, never go in prompts.
     Environment variables explained as a concept (not technically).
     Analogy: a lockbox vs. a sticky note on your monitor.
     NOTE: If Claude asks you to put a password in a file, that is a mistake — tell it to use
     environment variables instead, or ask an engineer to set it up. -->

---

## 3-5. エンジニアを必ず関与させるケース

<!-- Non-negotiable checklist. If any of these apply, loop in an engineer before proceeding.
     - The project will be accessible by external users (customers, partners, public)
     - The project connects to a live database or production system
     - The project handles authentication (login, permissions)
     - The project processes or stores personal data
     - You're unsure which risk level applies
     This is not about blocking work — it's about having the right people in the loop early,
     when changes are cheap, rather than late when they are expensive. -->
