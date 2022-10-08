# Nuxt-Blog

新規ブログのリポジトリです。

## サイトURL
https://masa-dev.net

## 構成
NuxtのJamStack構成

- Nuxt.js
- Docker (開発用)
- Firebase Hosting
- Newt (記事管理)

## 記事管理
記事管理のサービスとして、[Newt](https://www.newt.so/) を使用しています。

Newtの採用理由は、記事をMarkdownで記述できる点です。<br />
（MicroCMSだとhighlight.jsのAutoHighlightに頼らざるを得ず、コードブロックのカスタマイズ時にNuxtのwebpackがCheerioを使うとエラーを吐くため、Prism.jsと相性の良いNewtに切り替えた）

## 検証環境
https://gh-pages-dev.masa-dev.net/