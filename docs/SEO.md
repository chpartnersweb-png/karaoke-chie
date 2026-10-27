# カラオケ喫茶チエ SEO設定

実装日：2026年10月27日

## 正規URL

https://karaoke-chie.pages.dev/

`src/data/site-config.mjs` の `SITE_URL` を単一の参照元とし、Astroのsite、canonical、og:url、画像の絶対URL、JSON-LD、robots.txt、サイトマップで共有する。

## 実装内容

- タイトル：カラオケ喫茶チエ｜北九州・小倉駅徒歩6分のカラオケ喫茶
- 店舗の地域、アクセス、食事・利用案内、営業時間、定休日、電話を含むdescription。
- canonical、index/follow、大きな画像プレビューを許可するrobotsメタ情報。
- OGPおよびX/Twitterの大きな画像カード。画像は生成ヒーローではなく、提供された実際の外観写真を採用。
- 外観写真からビルド時に1200×630のJPEG共有画像を生成する設定。画像URLは本番URLを基準に絶対URL化。
- JSON-LD：CafeOrCoffeeShop（LocalBusinessの下位分類）、WebSite、WebPage、ImageObjectをIDで関連付け。
- 店舗の正式名称、電話、住所、Instagram、地図、メニューへのリンク、曜日別の通常営業時間を構造化。
- 表示用住所・営業時間と構造化データは `src/data/site.ts` を共通参照。
- `/robots.txt` と `/sitemap.xml` の静的エンドポイント。サイトマップはルート1ページのみを掲載。
- 日本語lang、既存のH1、画像alt、ヒーローの優先読み込み、下部画像の遅延読み込みは既存実装を維持。

## 未確認情報の扱い

- 郵便番号、座標、評価、口コミ、確定していない価格帯、創業年、架空の予約ページは構造化データに加えない。
- チラシ由来の料金や、未提供の料理価格は構造化データのOfferにしない。
- 通常営業時間は火〜金13:00〜23:00、土日13:00〜23:30。月曜日はopens/closesとも00:00として休業を表現。
- 祝日の表示案内は引き続き「土日祝13:00〜23:30」。祝日の具体的な営業日と、祝日が月曜日の場合の優先ルールは未確認のため、specialOpeningHoursSpecificationには追加しない。

## 実装ファイル

- `astro.config.mjs`
- `src/data/site-config.mjs`
- `src/data/site.ts`
- `src/lib/seo.ts`
- `src/components/Seo.astro`
- `src/pages/index.astro`
- `src/pages/robots.txt.ts`
- `src/pages/sitemap.xml.ts`

## 確認・公開の状態

ユーザーの「実装後の確認は自分で行うので不要です」という指定に従い、ビルド、生成HTML・画像・XMLの確認、ブラウザ表示、構造化データのテスト、公開サイトへのアクセス確認は実施していない。

この作業はローカルソースの変更。デプロイおよびGoogle Search Consoleの操作は実施していない。

公開後にSearch Consoleで登録するサイトマップ：
https://karaoke-chie.pages.dev/sitemap.xml

Search ConsoleでのURL検査対象：
https://karaoke-chie.pages.dev/

## 参照した公式資料

- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://docs.astro.build/en/basics/astro-components/
- https://docs.astro.build/en/guides/routing/
- https://docs.astro.build/en/guides/endpoints/
- https://docs.astro.build/en/guides/images/
