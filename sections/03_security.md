# 3. セキュリティの考え方

<!-- PROMOTED from a subsection of Section 2 to a standalone section.
     Rationale: given the "high-enthusiasm, low-skill" adoption context at Tsunagaru,
     security cannot be an afterthought or a footnote. It needs to be a first-class topic
     that any staff member encounters before they start doing real work.

     This section is NOT about technical security. It's about building a decision-making
     instinct: "should I be giving this information to Claude right now?" -->

> このセクションは、Claudeを使い始める前に**全員が読む**必要があります。
> ツールの使い方よりも先に、「何を入力してはいけないか」を理解してください。

---

## 3-1. なぜAI利用にはリスクがあるのか

Claudeはクラウドサービスです。あなたがClaude.aiに入力したテキストは、Anthropicのサーバーに送信されます。

これはGmailやGoogleドキュメントを使うときと本質的に同じです。クラウドサービスを使う以上、**何を送信するかを意識的に選ぶ責任**があります。

特に注意が必要なのは、Claudeが「気持ちよく何でも受け取ってくれる」点です。機密情報を入力しても、Claudeは断りません。判断するのは常に**あなた自身**です。

<!-- NOTE: The analogy to Gmail/Google Docs makes the concept concrete for non-technical staff
     without introducing jargon. Emphasize human responsibility, not tool limitation. -->

---

## 3-2. 情報のリスクレベル分類

<!-- A 3-level model gives non-technical staff a mental framework they can actually use.
     The goal is fast, instinctive decision-making — not a lengthy compliance checklist. -->

AIに入力する情報を、以下の3段階で判断してください。

### レベル1：低リスク ✅ 自由に使える

**定義：** 公開しても問題のない情報、または完全に匿名化された情報。

**例：**
- 文章の作成・翻訳・校正（個人情報を含まないもの）
- 公開情報をもとにした調査・まとめ
- 社内向けテンプレートや文書のひな形作成
- アイデアのブレインストーミング

**判断基準：** 「これを会社のウェブサイトに載せても問題ないか？」→ YESならレベル1。

---

### レベル2：中リスク ⚠️ 匿名化してから使う

**定義：** 社内の非公開情報だが、個人を特定する情報を含まないもの。

**例：**
- 案件名・固有名詞を伏せた業務プロセスの整理
- 数値を仮の値に置き換えた資料の構成検討
- 部署名や担当者名を省いた議事録の要約

**対処法：** 固有名詞・人名・社名・具体的な数値を入力する前に削除または置換してください。

**NGの例：**
> ❌ 「田中さんの案件、A社との契約金額が○○円なのですが…」
> ✅ 「ある案件について、契約金額の調整が必要なのですが…」

---

### レベル3：高リスク 🚫 使用前に必ず確認

**定義：** 個人情報・機密情報・認証情報を含むもの。

**例：**
- 社員の個人情報（氏名・連絡先・給与・評価）
- 顧客情報（氏名・メールアドレス・住所・電話番号）
- 未公開の財務情報・契約内容
- ログイン情報・パスワード・APIキー

**ルール：** 上長とIT/エンジニアの承認なしに、これらの情報をClaudeに入力しないでください。

<!-- NOTE: Framing Level 3 as "confirm first" rather than "never use" is intentional.
     Absolute bans get bypassed. A "check first" policy builds sustainable habits. -->

---

## 3-3. 絶対に入力してはいけない情報

どんな状況でも、以下の情報はClaudeに入力しないでください。

| 情報の種類 | 具体例 |
|-----------|-------|
| 認証情報 | パスワード、PINコード、セキュリティコード |
| APIキー・トークン | `sk-ant-...` のような文字列、アクセストークン |
| 個人識別情報 | マイナンバー、パスポート番号、免許証番号 |
| 顧客の個人情報 | 氏名・メールアドレス・電話番号・住所 |
| 未公開の財務情報 | M&A情報、未発表の決算データ |
| NDA対象の情報 | 守秘義務のある取引先・契約内容 |

<!-- WARN: Claude will never refuse to accept this information — the responsibility
     is entirely on the user. This must be stated clearly. -->

> ⚠️ **重要：** Claudeはこれらの情報を「受け取らない」とは言いません。
> 入力を止めるのはシステムではなく、**あなた自身**です。

---

## 3-4. シークレット管理の基本

<!-- For staff who work on Claude Code projects that involve API keys or credentials.
     Core principle: secrets never go in files, never go in prompts.
     Kept conceptual here — no technical commands. -->

開発プロジェクトでClaudeを使う場合、**APIキーやパスワードをファイルに直接書かない**ことが原則です。

**なぜか？** コードをGitHubに保存するとき、ファイルに書かれた秘密情報は誰にでも見られる状態になる可能性があります。「環境変数」という仕組みを使えば、秘密情報をコードから切り離して管理できます。

**もしClaude（またはClaude Code）が「ファイルにパスワードやAPIキーを書いてください」と指示してきたら、それは間違いです。** 必ずエンジニアに相談してください。

<!-- NOTE: This is the one place where we gently override Claude's potential instructions.
     Non-technical staff need to know that Claude can be wrong about security. -->

---

## 3-5. エンジニアを必ず関与させるケース

以下のいずれかに該当する場合は、作業を進める前にエンジニアに相談してください。

- [ ] そのシステムやツールは、社外のユーザー（顧客・取引先・一般公開）がアクセスする
- [ ] 本番のデータベースや業務システムに接続する
- [ ] ログイン・権限管理（誰がアクセスできるか）を扱う
- [ ] 個人情報を処理・保存する
- [ ] どのリスクレベルに該当するか判断できない

**これは「作業を止める」ためのルールではありません。** 問題が小さいうちに、適切な人を巻き込むためのルールです。後から修正するコストは、最初から相談するコストの何倍にもなります。

<!-- NOTE: Frame this as "cheap early, expensive late" — not as gatekeeping.
     The goal is to normalize asking engineers early, not to create anxiety. -->
