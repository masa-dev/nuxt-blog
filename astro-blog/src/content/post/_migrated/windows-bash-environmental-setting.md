---
title: "Windowsのbash環境を整備していく"
description: "Windowsのbash環境を整備していく"
pubDate: "2023-01-29T17:50:08.797Z"
updatedDate: "2023-02-05T04:42:43.149Z"
slug: "windows-bash-environmental-setting"
legacyIds:
  - "63d6a6932772b5781daab492"
tags:
  - "windows"
heroImage: "/media/1b9d5393-50b4-46d6-9ce5-0ecd5eb384e3/スクリーンショット2023-01-30020344.png"
---

<h2 id="content-h-1">はじめに</h2>
<p>最近（一年前）に引っ越してから Windows 環境を一新したので、 シェル関連で今までやってきたことをまとめようとおもいます。</p>
<h2 id="content-h-2">実行ターミナル</h2>
<p>まず、シェルの実行環境は、Windows Terminal と <a href="https://hyper.is/">Hyper</a> を使用しています。<br><br>
気分でどちらを使うか決めているのですが、使いやすさでいうなら Windows Terminal の方がいいです。Windows の Hyper は画面分割ができますが、コピーとペーストのショートカットが通常と違って使いにくいです。</p>
<p>Hyperにはポケモンのテーマなどもあるので、（見にくくなりますが）気になる人は使ってみてもいいかもしれないですね。</p>
<h2 id="content-h-3">シェル</h2>
<p>基本的に Git Bash を使用しています。<br><br>
Git Bash はGitをインストールする勝手にインストールされているので、使用している人も多いんじゃないでしょうか。</p>
<p>bash でできることが大体できますし、デフォルトでgitのブランチが表示されている点が優秀です。</p>
<p>最初はPowerShellを使用していましたが、<code>ls</code>コマンドが使用できなかったり、専用のコマンドがよくわからなかったりと、不満があったので結果として Git Bash を使う形に落ち着いています。</p>
<h2 id="content-h-4">コマンド</h2>
<p>Git Bashを使いやすくするため、いくつかのコマンドを使えるようにしています。</p>
<ul>
<li>vim</li>
<li>peco</li>
</ul>
<p>それぞれ説明していきます。</p>
<h3 id="content-h-5">Vim</h3>
<p>名前だけは聞いたことがある人も多いんじゃないでしょうか。Vim はコマンドラインエディタの一種であり、アプリの切り替えを行わずにコマンドラインから直接ファイルの編集を行うことができます。</p>
<p><code>.bashrc</code>などのちょっとした設定ファイルなどの編集を行う際などによく使っています。<br><br>
かなり癖のある UI をしていますが、住めば都というように、慣れれば VS Code で Vim の拡張機能を入れたくなるほどになります。</p>
<p>また、プラグインをインストールすることで、デフォルトのカラースキームを変更できたり、エクスプローラーのような機能を追加することもできます。その設定などは機会があれば別の記事にしようと思います。</p>
<h3 id="content-h-6">Peco</h3>
<p><a href="https://github.com/peco/peco">peco</a> は与えられた入力を視覚的に選択できるコマンドです。</p>
<p>基本的なコマンドの使用方法は、与えられた入力リストをselectのように選択させて、選択させたものを文字列として出力します。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955"># ls の出力リストから選択させる</span></span>
<span class="line"><span style="color:#DCDCAA">ls</span><span style="color:#D4D4D4"> | </span><span style="color:#DCDCAA">peco</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>上述のような使い方は基本的にはせずに、<code>.bash_history</code>の内容を読むようにして、<code>Ctrl + r</code>などのバインディングでコマンドの履歴検索をできるようにしています。</p>
<p><img src="/media/1b9d5393-50b4-46d6-9ce5-0ecd5eb384e3/スクリーンショット2023-01-30020344.png" alt="スクリーンショット2023-01-30020344.png"></p>
<h2 id="content-h-7">さいごに</h2>
<p>vim のプラグインなどを考えて記事を書き始めましたが、後からvim関係は別に分けた方がいいのではないかと思い、vim関係を書かなくした結果、思ったより記事の内容が薄くなってしまいました。</p>
<p>まぁ、見てる人そんなにいないし、ここまで見ている人いないから、問題なし！ 安全確認ヨシ！</p>
