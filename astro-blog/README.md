# astro-blog2

`astro-blog` を `Astro + ローカルコンテンツ` に寄せて移植するためのプロジェクトです。

## 現在の方針

- 記事種別は `post` と `note`
- `newtResult/*.json` は移行元データとしてのみ使用
- 同期時に `src/content/post/_migrated` / `src/content/note/_migrated` へ記事ファイルを生成
- タグは `src/content/tag/*.yaml` に独立定義し、記事側は slug だけ持つ
- 正式 URL は `slug`
- 旧 `_id` URL は `public/_redirects` で 301 リダイレクト
- 画像は `public/media` に同期し、本文 URL は `/media/...` へ置換
- 新規記事は `src/content/post` / `src/content/note` の MD / MDX で追加

## データ同期

`newtResult/posts.json`、`note.json`、`tsgs.json` から、以下を生成します。

- `src/content/post/_migrated/*.md`
- `src/content/note/_migrated/*.md`
- `src/content/tag/*.yaml`
- `public/media/*`
- `public/_redirects`

実行コマンド:

```sh
npm run sync:content
```

`dev` と `build` の前にも自動実行されます。

Cloudflare Pages では `SITE_URL` を本番 URL で設定してください。

## 記事 frontmatter

```yaml
title: "..."
description: "..."
pubDate: "2025-01-03T13:56:13.087Z"
updatedDate: "2025-01-06T00:39:38.624Z"
slug: "dotnet-session-logout"
legacyIds:
  - "6777b64ea98a21b9fbbc527c"
tags:
  - "dotnet"
  - "cloud-run"
heroImage: "/media/d463d130-4d29-499d-b850-ed02c724a768/dotnet.svg"
```

## タグ定義

```yaml
name: ".NET"
slug: "dotnet"
image: "/media/d463d130-4d29-499d-b850-ed02c724a768/dotnet.svg"
```
