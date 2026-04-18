---
title: "NeoVim kickstartの設定説明メモ（オプション編）"
description: "最近NeoVimのキックスタートを使ってみたところ、意外と使いやすかったので、そのキックスタートの設定の内容のまとめ"
pubDate: "2024-09-12T00:41:01.825Z"
updatedDate: "2024-10-06T16:20:14.678Z"
slug: "neovim-kickstart-options"
legacyIds:
  - "66e23631e6213d85f24fb260"
tags:
  - "neovim"
  - "lua"
heroImage: "/media/bb3e7fee-9d09-4f3c-8bab-892ddd535260/1000001300.svg"
---

<p>最近NeoVimのキックスタートを使ってみたところ、意外と使いやすかったので、そのキックスタートの設定の内容のまとめ</p>
<p>↓nvim kickstart</p>
<p><a href="https://github.com/nvim-lua/kickstart.nvim">https://github.com/nvim-lua/kickstart.nvim</a></p>
<p>続くかわからないけど、今回はオプション周りをまとめる</p>
<h2 id="content-h-1">設定内容</h2>
<h3 id="content-h-2"><code>&lt;Leader&gt;</code>キーの設定</h3>
<p><code>&lt;Leader&gt;</code>キーの設定を半角スペースにする<br>
デフォルトはバックスラッシュ（<code>\</code>）</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Set &#x3C;space> as the leader key</span></span>
<span class="line"><span style="color:#6A9955">-- See `:help mapleader`</span></span>
<span class="line"><span style="color:#6A9955">--  NOTE: Must happen before plugins are loaded (otherwise wrong leader will be used)</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">g</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">mapleader</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">' '</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">g</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">maplocalleader</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">' '</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-3">Nerd Fontに対応しているか</h3>
<p>Nerd Font対応していれば <code>true</code> にする</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Set to true if you have a Nerd Font installed and selected in the terminal</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">g</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">have_nerd_font</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">false</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-4">行番号の有効化</h3>
<p>相対的な行番号も設定できるとのこと</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Make line numbers default</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">number</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span></span>
<span class="line"><span style="color:#6A9955">-- You can also add relative line numbers, to help with jumping.</span></span>
<span class="line"><span style="color:#6A9955">--  Experiment for yourself to see if you like it!</span></span>
<span class="line"><span style="color:#6A9955">-- vim.opt.relativenumber = true</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-5">マウスモードを有効化</h3>
<p>有効化するとマウスでのカーソル位置の移動ができる様になる</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Enable mouse mode, can be useful for resizing splits for example!</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">mouse</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'a'</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-6">モードを表示するかの設定</h3>
<p>すでにステータスラインに表示しているため表示しないとのこと</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Don't show the mode, since it's already in the status line</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">showmode</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">false</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-7">クリックボードの同期</h3>
<p>OSとのクリップボード同期を有効化するが、起動時間が長くなるため<code>UiEnter</code>の後に設定</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Sync clipboard between OS and Neovim.</span></span>
<span class="line"><span style="color:#6A9955">--  Schedule the setting after `UiEnter` because it can increase startup-time.</span></span>
<span class="line"><span style="color:#6A9955">--  Remove this option if you want your OS clipboard to remain independent.</span></span>
<span class="line"><span style="color:#6A9955">--  See `:help 'clipboard'`</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">schedule</span><span style="color:#D4D4D4">(</span><span style="color:#C586C0">function</span><span style="color:#D4D4D4">()</span></span>
<span class="line"><span style="color:#9CDCFE">  vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">clipboard</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'unnamedplus'</span></span>
<span class="line"><span style="color:#C586C0">end</span><span style="color:#D4D4D4">)</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-8">ブレークインデントの有効化</h3>
<p>有効にすると改行時にインデントされた状態になる</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Enable break indent</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">breakindent</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-9">Undoファイルの有効化</h3>
<p><code>u</code>コマンドのでのundoを記録する</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Save undo history</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">undofile</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-10">検索時の大文字・小文字の無視設定</h3>
<p><code>\C</code>か大文字が含まれていない限りは区別せずに検索する</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Case-insensitive searching UNLESS \C or one or more capital letters in the search term</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">ignorecase</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">smartcase</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-11">サインカラムの有効化</h3>
<p>サインカラムをデフォルトに設定する<br>
サインカラムは、行番号の左に表示される記号の行のこと</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Keep signcolumn on by default</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">signcolumn</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'yes'</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-12">スワップファイルの更新時間</h3>
<p>この時間の間 (ミリ秒単位) 入力がなければ、スワップファイルがディスクに書き込まれる（参照：<a href="https://vim-jp.org/vimdoc-ja/options.html">https://vim-jp.org/vimdoc-ja/options.html</a>）</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Decrease update time</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">updatetime</span><span style="color:#D4D4D4"> = </span><span style="color:#B5CEA8">250</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-13">キーマッピングシーケンスの待ち時間</h3>
<p>キーマッピングシーケンスの待ち時間を減らす<br>
例）<code>&lt;Leader&gt;w</code>のマッピングの場合、<code>&lt;Leader&gt;</code>入力後の待ち時間を設定する<br>
which-keyのポップアップ表示を早めるために0.3秒に設定</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Decrease mapped sequence wait time</span></span>
<span class="line"><span style="color:#6A9955">-- Displays which-key popup sooner</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">timeoutlen</span><span style="color:#D4D4D4"> = </span><span style="color:#B5CEA8">300</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-14">分割画面の方向設定</h3>
<ul>
<li>横に分割する場合は、右に新しいウインドウを作成</li>
<li>縦に分割する場合は、下に新しいウインドウを作成</li>
</ul>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Configure how new splits should be opened</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">splitright</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">splitbelow</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-15">リストモードの有効化</h3>
<p>有効化した場合、<code>listchars</code>にある文字が反映される</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Sets how neovim will display certain whitespace characters in the editor.</span></span>
<span class="line"><span style="color:#6A9955">--  See `:help 'list'`</span></span>
<span class="line"><span style="color:#6A9955">--  and `:help 'listchars'`</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">list</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">listchars</span><span style="color:#D4D4D4"> = { </span><span style="color:#9CDCFE">tab</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'» '</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">trail</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'·'</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">nbsp</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'␣' </span><span style="color:#D4D4D4">}</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-16">コマンド結果のプレビュー</h3>
<p>コマンドの結果を分割画面でプレビューできる<br>
置換（<code>:%s/</code>）がわかりやすい</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Preview substitutions live, as you type!</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">inccommand</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'split'</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-17">カーソル行の強調表示</h3>
<p>カーソルの行がどこにあるかわかる様にする</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Show which line your cursor is on</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">cursorline</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-18">カーソルの上下に表示する行数の設定</h3>
<p>カーソルの上下に表示する画面行数の最小値を設定する</p>
<p>開始・終了行以外では、設定された行数より下にカーソルを移動するとスクロールする</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Minimal number of screen lines to keep above and below the cursor.</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">opt</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">scrolloff</span><span style="color:#D4D4D4"> = </span><span style="color:#B5CEA8">10</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h2 id="content-h-19">参考</h2>
<blockquote>
<p><a href="https://vim-jp.org/vimdoc-ja/map.html">https://vim-jp.org/vimdoc-ja/map.html</a><br>
<a href="https://vim-jp.org/vimdoc-ja/options.html">https://vim-jp.org/vimdoc-ja/options.html</a></p>
</blockquote>
