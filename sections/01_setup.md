# 1. Claudeの導入方法

<!-- This section covers everything needed BEFORE you start working:
     which platform to use, and how to set up version control as a baseline habit.
     Skills, MCP, and connectors are covered in Section 2 (Usage) since they require
     understanding prompts and modes first. -->

---

## 1-1. 利用プラットフォームの選び方

Claudeにはいくつかのアクセス方法があります。自分の役割や目的に合ったものを選んでください。

### どれを使えばいいか（早見表）

| 役割                                        | 推奨プラットフォーム    |
| ------------------------------------------- | ----------------------- |
| 一般スタッフ（文書作成・翻訳・Q&A）         | ブラウザ版（claude.ai） |
| スタッフ（SlackやGoogleとの連携も使いたい） | デスクトップアプリ      |
| エンジニア（開発・ファイル操作・デプロイ）  | Claude Code             |
| 開発者（外部システムとの自動連携を作る）    | API                     |

---

### ブラウザ版（claude.ai）

**最もシンプルな使い方です。** ブラウザで [claude.ai](https://claude.ai) にアクセスし、アカウントを作成するだけで使い始められます。

- インストール不要
- ファイルのアップロードや画像の読み込みも可能
- **まず試してみたい方はここから**

---

### デスクトップアプリ（Mac / Windows）

ブラウザ版と機能は同じですが、**MCPコネクタ**（SlackやGoogleカレンダーなどの外部連携）が使えるようになります。

- [公式サイト](https://claude.ai/download) からダウンロード・インストール
- 外部ツールと連携したい方向け

---

### Claude Code

Claude Codeは、**エンジニアおよびPCを使って本格的な作業をしたい方向け**のツールです。ターミナル（黒い画面）から操作します。

- ファイルの読み書き・プログラムの実行・GitHubとの連携が可能
- インストールには Node.js が必要（Claude Codeが案内します）
- 初めて使う方はエンジニアのサポートを受けることを推奨

インストールコマンド（ターミナルに貼り付けて実行）：

```bash
npm install -g @anthropic-ai/claude-code
```

<!-- NOTE: Don't over-explain Claude Code here. Section 2 and 4 cover how to actually use it.
     The goal of this section is just: "is this the right tool for me?" -->

---

### API（開発者向け）

Anthropic APIは、Claudeを外部システムやアプリケーションに組み込むための開発者向けインターフェースです。

- プログラムからClaudeを呼び出して自動化を構築できる
- 利用にはAnthropicアカウントと課金設定が必要
- **エンジニア専用です。一般スタッフが直接使用するものではありません**

---

## 1-2. バージョン管理の基本（GitHub）

<!-- NOTE: VCS is here — not in Section 3 — because it's infrastructure for any
     text-based project work with Claude, not just deployment.
     Framed as "how you safely save and share Claude's work." -->

Claude Codeを使ってプロジェクトを進める場合、作業の記録には**GitHub**を使います。

### バージョン管理とはなにか

バージョン管理とは、**ファイルの変更履歴を記録する仕組み**です。Googleドキュメントの「変更履歴」に似ていますが、あらゆるファイル形式に対応しており、複数人での共同作業も安全に行えます。

**バージョン管理のメリット：**

- 過去のバージョンにいつでも戻れる（「昨日の版に戻したい」が即座にできる）
- 誰がいつ何を変更したかが記録される
- 複数人で同じプロジェクトを分担して進められる
- Claude Codeが自動的に記録してくれるので、操作を覚える必要はほとんどない

### GitHubとツナガル社のOrganization

**GitHub**は、バージョン管理のホスティングサービスです。会社のファイル・コードをクラウド上に保管し、チームで共有します。

ツナガル株式会社のGitHub Organizationは **[github.com/Tsunagaru-Inc](https://github.com/Tsunagaru-Inc)** です。エンジニアが管理しており、プロジェクト単位でリポジトリ（＝プロジェクトフォルダ）が作成されます。

<!-- OPTIM: Once company-standard CLAUDE.md templates and approved skills
     are maintained in the org, replace the paragraph below with a direct link. -->

組織としてClaudeを活用するうえで特に有効なのが、**共通のCLAUDE.mdテンプレートと承認済みスキルリストをGitHub Organizationで管理する**ことです。新しいプロジェクトを始めるとき、このテンプレートを出発点にすることで、全プロジェクトに最低限のセキュリティルールと出力フォーマットが自動的に適用されます。詳細は§2-2（CLAUDE.md）と§2-4（スキル）を参照してください。

### 知っておくべき3つの概念

Claude Codeを使っていると、以下の操作をClaude自身が行います。意味を知っていれば、Claudeの確認ダイアログで慌てなくて済みます。

| 操作                   | 意味                                                 |
| ---------------------- | ---------------------------------------------------- |
| **クローン（clone）**  | GitHub上のリポジトリをPCにダウンロードする           |
| **コミット（commit）** | 現在の変更を「記録」として保存する                   |
| **プッシュ（push）**   | ローカルの記録をGitHub（クラウド）にアップロードする |

> **Claude Codeが「コミットしますか？」と聞いてきたら：**
> 「はい」を選ぶと、現在の作業状態が記録されます。問題ありません。
> 不安な場合は「内容を確認してからにします」とClaude Codeに伝えれば、操作の説明を受けられます。
