---
title: "「コマンド'Dev Containers: Open Folder in Container...'  でエラー (Illegal argument: base) が発生しました」の対処法"
description: "「コマンド'Dev Containers: Open Folder in Container...'  でエラー (Illegal argument: base) が発生しました」の対処法"
pubDate: "2023-02-04T10:02:01.974Z"
updatedDate: "2023-02-08T15:19:10.258Z"
slug: "devcontainer-illegal-argument-base-error"
legacyIds:
  - "63de2d1916bdb9179574394b"
tags:
  - "vscode"
  - "windows"
  - "docker"
heroImage: "/media/212e7cf7-92fa-4693-97db-3392a984bd34/スクリーンショット2023-02-04184412.png"
---

<p>ふと家のWindows環境でWSLのUbuntuからDevContainerを起動しようとしたところ、エラーが発生しました。</p>
<p><img src="/media/212e7cf7-92fa-4693-97db-3392a984bd34/スクリーンショット2023-02-04184412.png" alt="スクリーンショット2023-02-04184412.png"></p>
<p>調べても一切情報がなかったため、記事にしておきます。</p>
<h2 id="content-h-1">試したこと（意味なかったこと）</h2>
<ul>
<li>Windowsの再起動</li>
<li>Docker Desktopの再インストール</li>
<li>WSLのアップデート</li>
<li>Ubuntuの再インストール</li>
</ul>
<p>※Ubuntuの再インストールはアプリのアンインストール後に<a href="https://softantenna.com/blog/wsl-delete-data/">wslから登録解除</a>を行う必要があります。</p>
<h2 id="content-h-2">解決方法</h2>
<p>VSCodeのDevContainer拡張機能ページから別のバージョンをインストールする</p>
<p><img src="/media/8c640caa-ec9c-4514-9c0b-efa41463bc74/スクリーンショット2023-02-04185252.png" alt="スクリーンショット2023-02-04185252.png"></p>
<p>今回の問題点はプラグインの自動アップデートによる不具合のため、バージョンを戻したら正常に動作しました。</p>
<p>後日談ですが、ChatGPT君に聞いてみたところ割といい線をいっていて、感心しました。</p>
<p><img src="/media/c436d203-2d4b-4e2e-9f65-ad012450ccbc/スクリーンショット2023-02-04185952.png" alt="スクリーンショット2023-02-04185952.png"></p>
<h2 id="content-h-3">おわりに</h2>
<p>ひとこと言わせてください。</p>
<p><strong>分かるかぁ！</strong></p>
