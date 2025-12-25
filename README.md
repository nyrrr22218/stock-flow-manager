stock-flow-manager

ログイン用  
email : kyomo@gmail.com  
password : 19941203  

前職の現場課題を正確性と速度で解決する在庫管理システム

🚀 パフォーマンスへのこだわり
「現場のストレスをゼロにする」ことを目標に、応答速度の最適化を追求しました。
応答速度（TTFB）: 約60msを実現（Google Lighthouseにて計測）

改善のポイント:
Server Componentsによるデータ取得: useEffect（クライアントサイド）での取得から、Prismaを用いたサーバーサイドでの最速取得も可能なコードへ。
通信の最適化: 開発過程で発生していたfetchとXHRの重複を検知し、通信経路を極力一本化。不要なレンダリングとリクエストを徹底的に削減しました。

🛠 解決したかった課題
前職の在庫管理では、数日おきに手作業での在庫確認が行われており、把握漏れや管理の煩雑さに繋がっていました。
現場で即座に状況を確認できるレスポンス速度と、Zod × TypeScript による、人為的な入力ミスを許さない堅牢なデータバリデーションによって、管理を正確かつ時短で行う事が可能です。

常にさらにより良くできないかを追求しており、今後も機能の追加･拡充に努めてまいります。

💻 技術スタック
Framework: Next.js 15.1.7 (App Router) / React 19.1
Language: TypeScript 5
Database/ORM: Supabase / Prisma 7.2
Validation: Zod
Auth: Supabase Auth
UI: Material UI 7.3.6
