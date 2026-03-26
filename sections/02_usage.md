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

Claudeに何かをお願いするとき、あなたが入力するテキストを**プロンプト**と呼びます。
プロンプトの書き方が、Claudeの出力の質を大きく左右します。

### システムプロンプトとユーザープロンプト

Claudeへの指示には、2種類あります。

**システムプロンプト**は、会話が始まる前に設定される「前提条件」です。
Claudeの役割・言語・ルール・制約などを定義します。一度設定すれば、
同じプロジェクトの中で毎回繰り返す必要はありません。

**ユーザープロンプト**は、会話の中で送る個々のメッセージです。「この文章を翻訳して」「要点をまとめて」など、その都度の依頼です。

わかりやすく言えば：

> システムプロンプト ＝ 「あなたはこういう仕事をする人です」という職務定義
> ユーザープロンプト ＝ 「今日はこれをやってください」という日々の指示

<!-- NOTE: This analogy is central to understanding CLAUDE.md, Skills, and MCP.
     Getting this right means users can reason about tool behavior, not just use it blindly. -->

### 良いプロンプトの書き方

Claudeへの指示は、具体的であるほど良い出力が得られます。

| NG（曖昧）         | OK（具体的）                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| 「メールを書いて」 | 「A社の竹田さんへ、先日の打ち合わせのお礼と次回日程調整の依頼を書いて。丁寧なビジネス敬語で、200字以内」 |
| 「これを要約して」 | 「この会議メモを、決定事項・未解決事項・次のアクションの3項目に分けて箇条書きにして」                    |
| 「翻訳して」       | 「以下の日本語を、英語ネイティブのビジネスパーソン向けに自然な英語に翻訳して」                           |

---

## 2-2. CLAUDE.md — プロジェクトの「憲法」

<!-- KEY SECTION for organizational adoption. This is the primary "sane scaffolding" tool.
     A CLAUDE.md file tells Claude who it's working for, what rules apply, and what's off-limits.
     Creating one per project ensures consistent, safe, repeatable behavior across all staff. -->

**CLAUDE.md**は、プロジェクトのルールをClaudeに伝えるための設定ファイルです。プロジェクトフォルダに置いておくと、Claude Codeがそのフォルダで作業するたびに自動的に読み込みます。

「毎回Claudeに同じことを説明しなくていい」状態を作れるのが最大のメリットです。また、チームメンバー全員が同じCLAUDE.mdを使うことで、Claudeの振る舞いを組織として統一できます。

### CLAUDE.md に書くべきこと

- **プロジェクトの目的と背景**（何を作っているか、誰のためか）
- **出力言語とフォーマット**（日本語で書く、常にMarkdownで返すなど）
- **使っていいツールとダメなツール**
- **セキュリティルール**（入力してはいけない情報の定義）
- **禁止事項**（確認なしにファイルを削除しない、コミットしない、など）

### CLAUDE.md のサンプル（最小構成）

```markdown
# プロジェクト：社内レポート自動化

## 目的

月次の営業レポートを自動生成するツール。対象読者は経営陣と各部門マネージャー。

## 出力ルール

- 出力言語は日本語
- 文体はですます調（丁寧語）
- 数値は3桁区切りのカンマ付きで表記（例：1,234,567円）

## セキュリティ

- 実際の顧客名・担当者名をコードやファイルに含めない
- APIキーやパスワードをファイルに直書きしない（環境変数を使うこと）

## 禁止事項

- 確認なしに本番データベースへの書き込みを行わない
- 確認なしにgitにコミット・プッシュしない
```

<!-- NOTE: The sample is intentionally minimal — 5 rules, not 50.
     OPTIM: A company-level base template should be created and distributed
     from the Tsunagaru GitHub org once real use cases are identified. -->

### 会社共通のCLAUDE.mdテンプレート

個々のプロジェクトのCLAUDE.mdに加え、**会社全体の共通テンプレート**をツナガル社のGitHub Organizationで管理することを推奨します。共通テンプレートには、全プロジェクトに適用すべき最低限のセキュリティルール（§3参照）やフォーマット規則を記載します。新しいプロジェクトを始める際は、このテンプレートをコピーして出発点にすることで、設定漏れを防げます。

---

## 2-3. 利用モードの違い

Claudeには、用途に応じた3つの利用モードがあります。
適切なモードを選ぶことが、安全で効率的な作業につながります。

### チャットモード（Chat）

**claude.ai**またはデスクトップアプリを使った通常の会話形式です。

- ファイルへのアクセスなし。PCを直接操作しない
- 最もリスクが低く、始めやすい
- 向いている作業：文章作成・翻訳・要約・Q&A・ブレインストーミング

**非エンジニアスタッフは、まずこのモードから始めてください。**

### 協働モード（Cowork / Claude Code）

Claude Coworkというツールを使い、ClaudeとPCの作業を一緒に進めるモードです。

- ファイルの読み書き・作成ができる
- コマンドの実行やGitHub操作ができる
- **Claudeは実行前に確認を求めます**（「この操作をしていいですか？」）
- 向いている作業：プロジェクト単位の文書整理・コード生成・ダッシュボード作成

<!-- NOTE: "Cowork" framing makes this accessible to non-engineers.
     The key safety message: Claude asks before acting in this mode. -->

### 自律モード（Autonomous / Code）

Claude Codeを高い自律性で動作させるモードです。
主にエンジニアが設定した自動化パイプラインで使用します。

- 確認なしに連続して操作を行う
- 不可逆な変更を加える可能性がある
- **しっかりしたCLAUDE.mdと制約の設定が必須**

> ⚠️ このモードは非エンジニアスタッフには推奨しません。
> 使用する場合はエンジニアに相談してください。

---

## 2-4. Claudeのツール拡張

Claudeの標準機能を超えた作業が必要な場合、以下の3つの方法で能力を拡張できます。

### Skills（スキル）

スキルは、特定の分野や作業に特化した**追加指示セット**です。
Markdownファイルで構成されており、インストールすることでClaudeが
その分野のベストプラクティスを知った状態で作業を開始できます。

**例：**

- **Google Workspaceスキル**：GmailやGoogleドキュメントをClaudeから操作できる
- **PPTXスキル**：PowerPointファイルの生成・編集ができる
- **Vercelスキル**：Webページや、アプリのデプロイ作業を自動化できる

スキルのインストール方法は3種類あります。

**① デスクトップアプリのCowork Customizeから（推奨）**

Claude デスクトップアプリを開き、チャット入力欄の左下にある **＋アイコン → "Customize"** を選択します。スキルの検索・プレビュー・インストールをGUIで操作できます。技術的な知識は不要です。

**② CLIツール `npx skills` を使う（Claude Code）**

Claude Codeのターミナルで以下のコマンドを実行します：

```bash
npx skills
```

スキルの一覧が表示され、番号を選んでインストールできます。Claude Code自体がこの操作を代行してくれる場合もあります。

**③ 手動インストール**

スキルのMarkdownファイルを `~/.claude/skills/` に配置することでもインストールできます。GitHub Organizationで承認済みスキルを管理している場合は、このパスを使って配布できます。

<!-- OPTIM: Tsunagaru-approved skill list to be maintained in the GitHub org.
     Add link here once established. -->

### MCPコネクタ（外部ツール連携）

MCP（Model Context Protocol）は、ClaudeがSlack・Notion・Googleカレンダーなどの外部ツールを**直接操作できる**ようにする仕組みです。

設定が完了すると、たとえば「今週のSlackのメッセージをまとめて」「Notionのページを更新して」といった指示をClaude Codeに出すことができます。

デスクトップアプリまたはClaude Codeでの設定が必要です。詳細はエンジニアに相談してください。

<!-- NOTE: MCP setup details intentionally omitted at v0.1.
     Cover in Section 4 use cases with concrete examples. -->

### Projects（プロジェクト機能）

Claude.aiのブラウザ版・デスクトップアプリには**Projectsという機能**があります。プロジェクトを作成すると、会話をまたいで文脈（コンテキスト）が保持されます。

毎回「あなたはこういう仕事をしています」と説明し直す必要がなくなるため、継続的な作業に特に有効です。
CLAUDE.mdに近い役割を、技術的な設定なしに実現できます。

---

## 2-5. 外部CLIツールの準備

Claude Codeを使って高度な作業を行う場合、追加のツールがPCにインストールされている必要があります。
Claude Code自体が「このツールが必要です、インストールしていいですか？」と確認してくれるため、手動でインストールする必要はほとんどありません。

**主なツールと用途（参考）：**

| ツール                      | 用途                                |
| --------------------------- | ----------------------------------- |
| Node.js / npm               | Claude Codeおよびスキルの動作に必要 |
| gws（Google Workspace CLI） | Google Drive・Docs・Sheetsの操作    |
| Git                         | バージョン管理 — ファイルの変更履歴を記録する仕組み（詳細は§1-2参照） |
| gh（GitHub CLI）            | GitHubリポジトリの操作              |

<!-- NOTE: Git explanation lives in §1-2 to avoid duplication. Cross-reference added to the table row above. -->

Claude Codeの指示に従ってインストールを進めれば問題ありません。不明な点はエンジニアに確認してください。
