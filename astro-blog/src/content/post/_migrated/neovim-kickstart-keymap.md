---
title: "NeoVim kickstartの設定説明メモ（KeyMap編）"
description: "設定内容（KeyMap） 検索結果のハイライト削除  検索結果のハイライトを`ESC`キーで解除する。 デフォルトでは`/`で検索を確定した後、別の検索をしないとそのハイライトが残り続ける。結構邪魔。"
pubDate: "2024-10-06T15:40:44.010Z"
updatedDate: "2024-10-06T16:26:35.176Z"
slug: "neovim-kickstart-keymap"
legacyIds:
  - "670280a2e016366845bc387a"
tags:
  - "neovim"
  - "lua"
heroImage: "/media/bb3e7fee-9d09-4f3c-8bab-892ddd535260/1000001300.svg"
---

<p>前回の続き</p>
<p><a href="https://masa-dev.net/post/66e23631e6213d85f24fb260">NeoVim kickstartの設定説明メモ（オプション編）</a></p>
<h2 id="content-h-1">設定内容（KeyMap）</h2>
<h3 id="content-h-2">検索結果のハイライト削除</h3>
<p>検索結果のハイライトを<code>ESC</code>キーで解除する。<br>
デフォルトでは<code>/</code>で検索を確定した後、別の検索をしないとそのハイライトが残り続ける。結構邪魔。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Clear highlights on search when pressing &#x3C;Esc> in normal mode</span></span>
<span class="line"><span style="color:#6A9955">--  See `:help hlsearch`</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;Esc>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;cmd>nohlsearch&#x3C;CR>'</span><span style="color:#D4D4D4">)</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-3">診断ツールを表示する</h3>
<p><code>&lt;Space&gt;</code> + <code>q</code> で診断ツールを分割ウインドウとして表示する。<br>
診断ツールはLSPのアラートなどの表示のこと。VSCodeでいう「問題」タブ。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Diagnostic keymaps</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;leader>q'</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">diagnostic</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">setloclist</span><span style="color:#D4D4D4">, { </span><span style="color:#9CDCFE">desc</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'Open diagnostic [Q]uickfix list' </span><span style="color:#D4D4D4">})</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-4">ターミナルモードからノーマルモードに戻る</h3>
<p>ターミナルモードからノーマルモードに戻るためのショートカット。<br>
通常のノーマルモードに戻るコマンドは<code>Ctrl \</code> <code>Ctrl n</code> になっている。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Exit terminal mode in the builtin terminal with a shortcut that is a bit easier</span></span>
<span class="line"><span style="color:#6A9955">-- for people to discover. Otherwise, you normally need to press &#x3C;C-\>&#x3C;C-n>, which</span></span>
<span class="line"><span style="color:#6A9955">-- is not what someone will guess without a bit more experience.</span></span>
<span class="line"><span style="color:#6A9955">--</span></span>
<span class="line"><span style="color:#6A9955">-- NOTE: This won't work in all terminal emulators/tmux/etc. Try your own mapping</span></span>
<span class="line"><span style="color:#6A9955">-- or just use &#x3C;C-\>&#x3C;C-n> to exit terminal mode</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'t'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;Esc>&#x3C;Esc>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;C-</span><span style="color:#D7BA7D">\\</span><span style="color:#CE9178">>&#x3C;C-n>'</span><span style="color:#D4D4D4">, { </span><span style="color:#9CDCFE">desc</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'Exit terminal mode' </span><span style="color:#D4D4D4">})</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-5">矢印キーの無効化</h3>
<p>ノーマルモードでの矢印キーを無効化する。矢印キーを無効化したい場合はコメントアウトを外す。<br>
矢印キーでの移動を絶対に許さないマン向け設定。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- TIP: Disable arrow keys in normal mode</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;left>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;cmd>echo "Use h to move!!"&#x3C;CR>'</span><span style="color:#D4D4D4">)</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;right>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;cmd>echo "Use l to move!!"&#x3C;CR>'</span><span style="color:#D4D4D4">)</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;up>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;cmd>echo "Use k to move!!"&#x3C;CR>'</span><span style="color:#D4D4D4">)</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;down>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;cmd>echo "Use j to move!!"&#x3C;CR>'</span><span style="color:#D4D4D4">)</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-6">分割ウインドウ移動</h3>
<p>分割ウインドウを<code>Ctrl h</code>, <code>Ctrl l</code>, <code>Ctrl j</code>, <code>Ctrl k</code> で移動できるようにする。<br>
ちなみにウインドウ分割は以下の方法でできる。</p>
<ul>
<li><code>Ctrl w</code> + <code>v</code> 垂直分割</li>
<li><code>Ctrl w</code> + <code>s</code> 水平分割</li>
</ul>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Keybinds to make split navigation easier.</span></span>
<span class="line"><span style="color:#6A9955">--  Use CTRL+&#x3C;hjkl> to switch between windows</span></span>
<span class="line"><span style="color:#6A9955">--</span></span>
<span class="line"><span style="color:#6A9955">--  See `:help wincmd` for a list of all window commands</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;C-h>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;C-w>&#x3C;C-h>'</span><span style="color:#D4D4D4">, { </span><span style="color:#9CDCFE">desc</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'Move focus to the left window' </span><span style="color:#D4D4D4">})</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;C-l>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;C-w>&#x3C;C-l>'</span><span style="color:#D4D4D4">, { </span><span style="color:#9CDCFE">desc</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'Move focus to the right window' </span><span style="color:#D4D4D4">})</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;C-j>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;C-w>&#x3C;C-j>'</span><span style="color:#D4D4D4">, { </span><span style="color:#9CDCFE">desc</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'Move focus to the lower window' </span><span style="color:#D4D4D4">})</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">keymap</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'n'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;C-k>'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'&#x3C;C-w>&#x3C;C-k>'</span><span style="color:#D4D4D4">, { </span><span style="color:#9CDCFE">desc</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'Move focus to the upper window' </span><span style="color:#D4D4D4">})</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h2 id="content-h-7">設定内容（Basic Autocommands）</h2>
<h3 id="content-h-8">ヤンク部分のハイライト</h3>
<p>NeovimのAutocommandは、特定のイベントが発生したときに自動的にコマンドを実行する機能のこと。</p>
<p>以下の設定では<code>TextYankPost</code>というイベントで発火し、ヤンク時にヤンクした文字範囲をハイライトする。<br>
<code>TextYankPost</code>はテキストをヤンクした後に実行されるイベントのこと。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">-- Highlight when yanking (copying) text</span></span>
<span class="line"><span style="color:#6A9955">--  Try it with `yap` in normal mode</span></span>
<span class="line"><span style="color:#6A9955">--  See `:help vim.highlight.on_yank()`</span></span>
<span class="line"><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">api</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">nvim_create_autocmd</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'TextYankPost'</span><span style="color:#D4D4D4">, {</span></span>
<span class="line"><span style="color:#9CDCFE">  desc</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">'Highlight when yanking (copying) text'</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">  group</span><span style="color:#D4D4D4"> = </span><span style="color:#9CDCFE">vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">api</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">nvim_create_augroup</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'kickstart-highlight-yank'</span><span style="color:#D4D4D4">, { </span><span style="color:#9CDCFE">clear</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span><span style="color:#D4D4D4"> }),</span></span>
<span class="line"><span style="color:#DCDCAA">  callback</span><span style="color:#D4D4D4"> = </span><span style="color:#C586C0">function</span><span style="color:#D4D4D4">()</span></span>
<span class="line"><span style="color:#9CDCFE">    vim</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">highlight</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">on_yank</span><span style="color:#D4D4D4">()</span></span>
<span class="line"><span style="color:#C586C0">  end</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#D4D4D4">})</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p><img src="/media/8783fb06-b261-4f4f-b3a3-0f4bf91abab4/basic-autocmd-yank-highlight.gif" alt="basic-autocmd-yank-highlight.gif"></p>
<h2 id="content-h-9">終わりに</h2>
<p>次回は長大なpluginなので投稿できるかな…?</p>
<h2 id="content-h-10">参考</h2>
<blockquote>
<p><a href="https://neovim.io/doc/user/autocmd.html">https://neovim.io/doc/user/autocmd.html</a></p>
</blockquote>
