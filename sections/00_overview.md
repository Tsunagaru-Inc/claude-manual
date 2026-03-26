# 0. Claudeとは何か

<!-- Section goal: set expectations before anyone touches a tool.
     Tone: grounded and honest. Acknowledge the hype, but frame Claude as a
     powerful-but-fallible assistant, not a magic solution.
     Audience: all staff, including those who have never used an AI tool. -->

---

## 0-1. Claudeの概要

Claudeは、Anthropicが開発した**AIアシスタント**です。文章を読んで理解し、質問に答え、文書を作成し、コードを書き、複雑な問題を一緒に考えることができます。

よく「AIチャットボット」と呼ばれますが、従来のチャットボットとは大きく異なります。従来のボットは決まった質問に決まった答えを返すだけでしたが、Claudeは文脈を理解し、曖昧な指示にも柔軟に対応し、長い会話の流れを記憶しながら作業を進めることができます。

**Claudeが得意なこと:**

- 文章の作成・翻訳・要約・校正
- 情報の整理と構造化（レポート、議事録、仕様書など）
- アイデアの壁打ちとフィードバック
- コードの生成・説明・デバッグ（エンジニア向け）
- 複雑なドキュメントの読み込みと分析

**Claudeが苦手なこと・できないこと:**

- リアルタイムの情報取得（インターネット検索は基本的に行わない）
- 100%の正確性の保証（事実確認は必ず行うこと）
- 機密性の高い判断（法律・医療・財務上の最終判断は専門家に委ねること）

<!-- NOTE: The "what it cannot do" list is as important as the capability list.
     Setting honest expectations here prevents over-reliance downstream. -->

---

<!-- INFO: This manual is the first version targeted for my manager, there is no
     need to highlight Anthropic trustworthiness for now.
     OPTIM: A comparison of services and use-cases-pertinent tools will later be
     needed.

<!-- ## 0-2. Anthropicについて
<!--
<!-- Anthropicは、2021年にAIの安全性研究を専門とする目的で設立されたアメリカの企業です。OpenAI（ChatGPTの開発元）の元研究者たちが「AIを安全に開発する」という使命のもとに立ち上げました。
<!--
<!-- Anthropicの特徴は、**安全性を製品の中心に置いている**点です。「Constitutional AI（憲法的AI）」と呼ばれる独自の手法により、Claudeは有害な出力を避け、誠実に振る舞うよう設計されています。これは単なる宣伝文句ではなく、企業の研究活動と製品設計の根幹をなす方針です。
<!--
<!-- ツナガル株式会社がAIツールとしてClaude（Anthropic製）を選択したのは、この安全性と信頼性への姿勢、そして企業向けのデータ管理ポリシーの透明性を評価したためです。
<!--
<!-- <!-- NOTE: Keep this short. The goal is trust, not a marketing pitch.
<!--      One sentence on why Tsunagaru chose Anthropic specifically adds useful context.

<!-- ## <!--
<!--
<!-- ## 0-3. 料金プラン
<!--
<!-- Claudeには用途に応じた複数のプランがあります。個人で試す場合から、会社全体で本格導入する場合まで対応しています。
<!--
<!-- | プラン         | 対象                 | 月額（目安） | 主な特徴                         |
<!-- | -------------- | -------------------- | ------------ | -------------------------------- |
<!-- | **Free**       | 個人（試用）         | 無料         | 基本機能のみ。利用制限あり       |
<!-- | **Pro**        | 個人（本格利用）     | $20 / 人     | 制限緩和。優先アクセス           |
<!-- | **Team**       | チーム・部署         | $25 / 人     | 管理者機能。利用状況の把握が可能 |
<!-- | **Enterprise** | 全社導入             | 要問い合わせ | SSO・高度なデータ管理・SLA       |
<!-- | **API**        | 開発者・システム連携 | 従量課金     | 外部システムとの連携・自動化     |
<!--
<!-- <!-- NOTE: Pricing changes frequently. Always verify at https://www.anthropic.com/pricing
<!--      before quoting numbers internally. The table above is indicative, not contractual.
<!--
<!-- ツナガル社での現在の方針は、まず**Teamプラン**から始め、利用状況を見ながらEnterpriseへの移行を検討する予定です。APIの利用はエンジニアが管理します。
---
-->

## 0-2. モデルの比較

Claudeには複数のモデルがあり、速度・精度・コストのバランスが異なります。用途に応じて使い分けることで、コストを抑えながら最適な出力を得られます。

| モデル            | 特徴               | 向いている用途               |
| ----------------- | ------------------ | ---------------------------- |
| **Claude Haiku**  | 高速・低コスト     | 簡単な質問、翻訳、短い要約   |
| **Claude Sonnet** | バランス型（推奨） | 文書作成、分析、日常業務全般 |
| **Claude Opus**   | 高精度・低速       | 複雑な分析、戦略的な判断支援 |

<!-- OPTIM: Add a simple decision flowchart in a later pass:
     "Is  the task complex" → Yes → Opus / No → "Is cost/volume important?" → Yes → Haiku / No → Sonnet -->

日常業務では**Claude Sonnet**が最もバランスよく使えます。特に指定がなければSonnetを使ってください。

---

## 0-3. AIツール活用の心構え

Claudeを導入する前に、チーム全員で共有しておきたい考え方があります。

### Claudeは「優秀だが間違えるアシスタント」

Claudeは非常に有能なアシスタントですが、**常に正しいわけではありません**。自信を持って誤った情報を出力することがあります（これを「ハルシネーション」と呼びます）。重要な判断を下す前は、必ずClaudeの出力を自分で確認してください。

「AIが言ったから正しい」という判断は禁物です。

### ツールは目的ではなく手段

AIツールの導入は、**業務の質を上げることが目的**です。ツールを使うこと自体を目標にしないでください。効率化できる作業に使い、より大事な判断や創造的な仕事に時間を使うことが理想です。

### 「試してみる」が一番の学習

Claudeは使いながら覚えるツールです。難しく考えずに、まず日常業務の中で小さなことから試してみてください。指示（プロンプト）が上手くなるほど、Claudeの出力も良くなります。

### このマニュアルの使い方

このマニュアルは、Claudeを「正しく・安全に・効果的に」使うための道標です。最初から全部読む必要はありません。**まずセクション3（セキュリティ）を読んでから**、使いたい機能のセクションに進んでください。

<!-- NOTE: The pointer to Section 3 before anything else is intentional.
     Security awareness must precede capability exploration in this context. -->
