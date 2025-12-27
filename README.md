# 📦 stock-flow-manager

前職の現場課題を「正確性」と「速度」で解決する、プロフェッショナルな在庫管理システムです。

## 🌐 デモアカウント

アプリケーションの動作をすぐに確認いただけます。

- **URL**: [https://stock-flow-manager.vercel.app/]
- **Email**: `kyomo@gmail.com`
- **Password**: `19941203`

---

## 🚀 パフォーマンスへのこだわり

「現場のストレスをゼロにする」ことを目標に、応答速度の最適化を徹底的に追求しました。

- **応答速度**: **約 60ms** を実現（Google Lighthouseにて計測）
- **改善のポイント**:
  - **Server Componentsによる最適化**: 従来のクライアントサイド（useEffect）でのデータ取得を廃止。Next.js 15 + Prisma を活用し、サーバーサイドでの最速取得を実現。
  - **通信経路の極力一本化**: 開発過程で発生していた fetch と XHR の重複を検知・修正。不要なレンダリングとリクエストを徹底的に削減し、無駄のないデータフローを構築しました。

## 🛠 解決したかった課題

前職の在庫管理において発生していた「手作業による在庫確認の遅れ」や「把握漏れ」を、デジタルの力で解決します。

1. **レスポンス速度**: 現場で即座に状況を確認・入力できる、一切の「待ち」を感じさせないUI。
2. **堅牢なバリデーション**: **Zod × TypeScript** により、人為的な入力ミスをシステムレベルでブロック。正確なデータ管理を保証します。
3. **時短と正確性の両立**: 管理の煩雑さを取り除き、本来の業務に集中できる環境を提供します。

## 💻 技術スタック

最新の技術選定により、型安全かつ高パフォーマンスな開発を実現しています。

- **Framework**: [Next.js](nextjs.org) 15.5.7 (App Router) / [React](react.dev) 19.1
- **Language**: [TypeScript](www.typescriptlang.org) 5
- **Database/ORM**: [Supabase](supabase.com) / [Prisma](www.prisma.io) 7.2
- **Validation**: [Zod](zod.dev)
- **UI & Visualization**:
  - [Material UI](mui.com) 7.3.6 (MUI X Data Grid / Date Pickers 8.23)
  - [Framer Motion](www.framer.com) 12.2 (高度なUIアニメーション)
  - [Recharts](recharts.org) 3.6 (データ可視化)
- **Styling**: [Tailwind CSS](tailwindcss.com) 4.0 / [Emotion](emotion.sh)
- **API Client**: [Axios](axios-http.com)

---

## 🏗 今後の展望

「常により良く」をモットーに、以下の機能拡充を予定しています。

- 不具合報告フォームの追加
