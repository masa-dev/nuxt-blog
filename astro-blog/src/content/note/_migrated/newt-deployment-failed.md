---
title: "NewtCMSでGithub Actionsの自動デプロイが実行されなくなった"
description: "1年ちょっと程更新を怠っていたブログを久しぶりに更新したら、Github Actionsのデプロイが実行されなくなった  (´・ω・`)"
pubDate: "2024-09-22T09:50:37.765Z"
updatedDate: "2024-09-22T09:50:37.765Z"
slug: "newt-deployment-failed"
legacyIds:
  - "66efe86d4ef7a227ab757aab"
tags:
  - "github-actions"
  - "firebase"
heroImage: "/media/dab30154-e186-44f8-a2b2-8b5dc826d34d/スクリーンショット2024-09-13004334.png"
---

<p>1年ちょっと程更新を怠っていたブログを久しぶりに更新したら、Github Actionsのデプロイが実行されなくなった  (´・ω・`)</p>
<h2 id="content-h-1">経緯</h2>
<p>NeoVimのKickstartの内容を理解するためにメモ程度の内容を更新しようとしたところ、webhookを設定していたはずのGithub Actionsが一切実行されなくなっていました。</p>
<h2 id="content-h-2">原因</h2>
<p>普通にWebhook用のCredentialの期限が切れてるっぽい</p>
<p><img src="/media/a1d8150c-f2c1-4830-b665-4b14e7985790/スクリーンショット2024-09-13004530.png" alt="スクリーンショット2024-09-13004530.png"></p>
<h2 id="content-h-3">対応</h2>
<p>NewtがGithub ActionsへのWebhookの設定についての記事があるためそれを参考にします。</p>
<p><a href="https://www.newt.so/docs/tutorials/trigger-github-actions-with-webhooks">https://www.newt.so/docs/tutorials/trigger-github-actions-with-webhooks</a></p>
<blockquote>
<p>「contents:write」へのアクセスが許可されている個人アクセストークンを設定します。</p>
</blockquote>
<p>アクセストークンはGithubくんが推奨している「Fine-grained personal access tokens」を作ってみます。（Beta版だけどまぁ問題ないでしょ、知らんけど）</p>
<p>ちなみに設定は以下の場所にあります。<br>
「ユーザー設定 &gt; Developper settings &gt; Personal access token」</p>
<p>特にトークン作成で考えることはありませんが、webhookを実行するためにNewtのサイトにあるようにContentsに読み込み・書き込み権限を付与する必要があります。</p>
<p>ちなみにこの権限については権限とエンドポイントの対応一覧を以下サイトから確認できます。</p>
<p><a href="https://docs.github.com/ja/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28">https://docs.github.com/ja/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28</a></p>
<p>トークンが作成出来たら、apiトークンが取得できるので、NewtのWebhookを編集して、<code>Authorization</code>ヘッダーを置き換えれば動くはずです。</p>
<p>※私の場合は動かなかったので、一から作り直しました、まあええか</p>
<h2 id="content-h-4">参考</h2>
<p><a href="https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">個人用アクセス トークンを管理する - GitHub Docs</a></p>
