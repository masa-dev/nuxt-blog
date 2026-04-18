---
title: "Cliud Run上で、LaravelのSMTP のメール送信エラーが発生してしまう"
description: "GCPのCloudRun上でLaravelのSMTPのメール送信メソッドで送信した時にエラーが発生  ローカルの環境ではエラーは発生しない。"
pubDate: "2022-12-04T07:10:50.062Z"
updatedDate: "2022-12-04T07:10:50.062Z"
slug: "send-error-by-laravel-smtp-occur-in-cloud-run"
legacyIds:
  - "638c4746ca4a512e0c08f9eb"
tags:
  - "cloud-run"
  - "laravel"
heroImage: "/media/d456b660-e277-4141-89f2-322016184008/laravel.svg"
---

<h2 id="content-h-1">エラー内容</h2>
<p>GCPのCloudRun上でLaravelのSMTPのメール送信メソッドで送信した時にエラーが発生</p>
<p>ローカルの環境ではエラーは発生しない。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#569CD6">local.ERROR</span><span style="color:#D4D4D4">: Expected response code </span><span style="color:#CE9178">"250"</span><span style="color:#D4D4D4"> but got code </span><span style="color:#CE9178">"550"</span><span style="color:#D4D4D4">, with message </span><span style="color:#CE9178">"550 5.7.1 &#x3C;保有しているメールアドレス>... Command rejected"</span><span style="color:#D4D4D4">. </span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4">....</span><span style="color:#CE9178">"exception"</span><span style="color:#D4D4D4">:</span><span style="color:#CE9178">"[object] (Symfony\\Component\\Mailer\\Exception\\TransportException(code: 550): Expected response code \"</span><span style="color:#569CD6">250</span><span style="color:#D4D4D4">\</span><span style="color:#CE9178">" but got code \"</span><span style="color:#569CD6">550</span><span style="color:#D4D4D4">\</span><span style="color:#CE9178">", with message \"</span><span style="color:#569CD6">550</span><span style="color:#569CD6"> 5</span><span style="color:#D4D4D4">.</span><span style="color:#569CD6">7</span><span style="color:#D4D4D4">.</span><span style="color:#569CD6">1</span><span style="color:#D4D4D4"> &#x3C;>... Command rejected\". at /var/www/*****/vendor/symfony/mailer/Transport/Smtp/SmtpTransport.php:</span><span style="color:#569CD6">308</span><span style="color:#D4D4D4">)...</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h2 id="content-h-2">原因</h2>
<p>サクラのレンタルサーバーの設定で、メールの国外IPアドレスフィルタを設定していたため、弾かれていた</p>
<h2 id="content-h-3">解決策</h2>
<p>アクセス制限設定を解除（無効化）する。</p>
<p><img src="/media/5793c916-b9cd-4046-9f71-8aaaa3eb45e3/スクリーンショット0004-10-1215.17.19.png" alt="スクリーンショット0004-10-1215.17.19.png"></p>
