---
title: "GCSにアップロードしたPDFのリンクが勝手にダウンロードしてしまう"
description: ""
pubDate: "2022-11-01T19:25:21.280Z"
updatedDate: "2022-11-01T19:27:41.821Z"
slug: "gcs-pdf-open-another-tab"
legacyIds:
  - "636170453548a57ba116761e"
tags:
  - "google-cloud-storage"
---

<h2 id="content-h-1">問題</h2>
<p>GoogleCloudStorageでアップロードしたpdfのリンクをクリックするとPDF viewerが開かずにダウンロードされる。</p>
<h2 id="content-h-2">原因</h2>
<p>ファイルアップロード時に、<code>Content-Type</code>を明示的に指定しないと、<code>Content-Type</code>が勝手に<code>application/octet-stream</code>となってしまい、ファイルの種類が分からないが故に、ダウンロードしてしまうようです。</p>
<p>Google Cloud Storageで「種類」をしていすることでPDF Viewerで開くことができます。</p>
<h2 id="content-h-3">解決策</h2>
<p>プログラムで明示的にContentTypeを指定します。</p>
<h3 id="content-h-4">GCSから設定する場合</h3>
<p>オブジェクトの詳細から、「メタデータを編集」をクリックします。その際に開くモーダルウインドウでContent-Typeを指定します。</p>
<h3 id="content-h-5">C#の例</h3>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#9CDCFE">storage</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">UploadObject</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">bucketName</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">objectName</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">contentType</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">FileSource</span><span style="color:#D4D4D4">);</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-6">コマンド</h3>
<p>すでにアップロードしているファイルは、以下のコマンドで一括変更が可能</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#DCDCAA">gsutil</span><span style="color:#CE9178"> ls</span><span style="color:#CE9178"> "gs://my-bucket-name/folder-name/"</span><span style="color:#D7BA7D"> \</span></span>
<span class="line"><span style="color:#D4D4D4">| </span><span style="color:#DCDCAA">grep</span><span style="color:#CE9178"> "\.pdf"</span><span style="color:#D7BA7D"> \</span></span>
<span class="line"><span style="color:#D4D4D4">| </span><span style="color:#DCDCAA">xargs</span><span style="color:#569CD6"> -I</span><span style="color:#CE9178"> {}</span><span style="color:#CE9178"> gsutil</span><span style="color:#CE9178"> setmeta</span><span style="color:#569CD6"> -h</span><span style="color:#CE9178"> "Content-Type: application/pdf"</span><span style="color:#CE9178"> "{}"</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
