---
title: "FirebaseのCIデプロイが突然落ちるようになった"
description: "本サイトの環境はFirebaseにデプロイしており、GitHub Actionsで自動でデプロイするようにしていますが、突然エラーが発生して落ちるようになりました。"
pubDate: "2022-10-06T17:08:31.771Z"
updatedDate: "2022-10-07T07:46:38.074Z"
slug: "firebase-github-actions-error"
legacyIds:
  - "633f007e2c3aa4b59313ccd1"
tags:
  - "firebase"
  - "github-actions"
heroImage: "/media/819f9f03-7710-4edc-b936-2507fe7e3a9a/firebase.svg"
---

<h2 id="content-h-1">エラー発生</h2>
<p>本サイトの環境はFirebaseにデプロイしており、GitHub Actionsで自動でデプロイするようにしていますが、突然エラーが発生して落ちるようになりました。</p>
<h2 id="content-h-2">エラー内容</h2>
<p>エラー内容は以下です。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#CE9178;font-weight:bold">Error</span><span style="color:#D4D4D4">: Failed to list functions for *******</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4">The process </span><span style="color:#CE9178">'/usr/local/bin/npx'</span><span style="color:#D4D4D4"> failed with exit code </span><span style="color:#569CD6">1</span></span>
<span class="line"><span style="color:#CE9178;font-weight:bold">Error</span><span style="color:#D4D4D4">: The process </span><span style="color:#CE9178">'/usr/local/bin/npx'</span><span style="color:#D4D4D4"> failed with exit code </span><span style="color:#569CD6">1</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>さすがにさっきのだけじゃあ何もわからないので少し探してみる。</p>
<h3 id="content-h-3">エラー1</h3>
<p>調べると以下のエラーが発生していました。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#D4D4D4">[</span><span style="color:#6A9955">2022-10-06T16:20:32.871Z</span><span style="color:#D4D4D4">] [functions] HTTP </span><span style="color:#CE9178;font-weight:bold">Error</span><span style="color:#D4D4D4">: </span><span style="color:#569CD6">403</span><span style="color:#D4D4D4">, Cloud Functions API has not been used in project </span><span style="color:#569CD6">700</span><span style="color:#D4D4D4">***** before or it is disabled. Enable it by visiting </span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>エラーの少し前になんかそれっぽいことが書いてありますね。「Cloud Functions API」とやらが有効化されていないから有効化しろとのことです。</p>
<p>とりあえず、GCPにログインして、対象のプロジェクトで「Cloud Functions API」を有効化します。</p>
<h3 id="content-h-4">エラー2</h3>
<p>先ほどのエラーはなくなりましたが、今度は以下のようなエラーが発生。（もともとあったかもしんない）</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#CE9178;font-weight:bold">Error</span><span style="color:#D4D4D4">: HTTP </span><span style="color:#CE9178;font-weight:bold">Error</span><span style="color:#D4D4D4">: </span><span style="color:#569CD6">403</span><span style="color:#D4D4D4">, Permission </span><span style="color:#CE9178">'cloudfunctions.functions.list'</span><span style="color:#D4D4D4"> denied on </span><span style="color:#CE9178">'projects/**********/locations/-/functions'</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>firebaseのバグっぽい？調べると以下のIssueにあたりました。<br>
<a href="https://github.com/FirebaseExtended/action-hosting-deploy/issues/203">https://github.com/FirebaseExtended/action-hosting-deploy/issues/203</a></p>
<p>一番評価がありそうな解決策を試してみます。<br>
<a href="https://github.com/FirebaseExtended/action-hosting-deploy/issues/203#issuecomment-1127732956">https://github.com/FirebaseExtended/action-hosting-deploy/issues/203#issuecomment-1127732956</a></p>
<p>方法は以下の通りです</p>
<ol>
<li>「IAMと管理 &gt; IAM」に移動して<code>github-actions</code>から始まるアカウントを探す</li>
<li>鉛筆マークで「別のロールを追加」から、<code>Cloud Functions 閲覧者</code>を追加</li>
<li>正しいプロジェクトにいるか念のために確認</li>
</ol>
<p>保存してGithubActionsを再実行したところ、うまく動作しました。</p>
<h2 id="content-h-5">解決策・まとめ</h2>
<p>どうやら、GCP関連の権限不足だった模様です。<br>
どうしていきなり発生したのかはわかりません。本日（2022/10/6）にfirebaseから規約変更などのメールはありましたがそれが原因とは思えません。（GithubのIssueは数か月前のもの）<br>
利用からちょうど３か月経とうかというところなので、無料期間外だからでしょうか。</p>
<p>まぁ、よくわからんけど解決したからヨシ！</p>
<p>2022/10/7 追記<br>
Issueを追ってみたら、昨日あたりからこのエラーが発生したようです。<br>
具体的な原因についてはわかりませんでした。</p>
<p>今回の問題は、以下の二つの操作で解決できました。</p>
<ul>
<li><code>Cloud Functions API</code>の有効化</li>
<li>アカウントのロール追加</li>
</ul>
