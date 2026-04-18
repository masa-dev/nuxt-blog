---
title: "CloudRun上での.NET Identityセッション切れ問題の解決方法"
description: ".NETをCloudRun上にデプロイした環境で、頻繁にIdentityのセッションが切れてしまう現象が発生します。  この問題の解決方法について、多少の需要があると思いましたので、記事にしました。"
pubDate: "2025-01-03T13:56:13.087Z"
updatedDate: "2025-01-06T00:39:38.624Z"
slug: "dotnet-session-logout"
legacyIds:
  - "6777b64ea98a21b9fbbc527c"
tags:
  - "dotnet"
  - "cloud-run"
heroImage: "/media/d463d130-4d29-499d-b850-ed02c724a768/dotnet.svg"
---

<h2 id="content-h-1">はじめに</h2>
<p>.NETをCloudRun上にデプロイした環境で、頻繁にIdentityのセッションが切れてしまう現象が発生します。</p>
<p>この問題の解決方法について、多少の需要があると思いましたので、記事にしました。</p>
<h2 id="content-h-2">セッションが切断される理由</h2>
<p>.NET Identityではトークン認証を使用しており、サーバー側で暗号化したトークンをCookieでやりとりすることでセッションの状態を管理しています。</p>
<p>この認証に使用される暗号化キーの保存先は、.NETのデータ保護システムに設定された場所に保存されます。デフォルトで暗号化キーは<strong>メモリ</strong>に保存されます。</p>
<p>一般的な単一のオンプレサーバーやVMなどでは、再起動などをしない限りメモリがリセットされないため、問題は発生しません。</p>
<p>ただし、CloudRunのようなアクセス数によってコンテナが増減する場合は問題が発生します。 <br>
コンテナごとにメモリが別れているため、スケールインしてコンテナ数が0になった際にメモリがリセットされ、暗号化キーが失われてしまいます。 <br>
また、スケールアウトしてコンテナ数が増えた場合でも、新規作成されたコンテナのメモリに暗号化キーは保存されていないため、セッションが切れてしまいます。</p>
<p>つまり、セッションが切断される理由は、コンテナ型Webサーバーでコンテナの増減によって、メモリ内に保存されている暗号化キーが失われてしまうからです。</p>
<h2 id="content-h-3">暗号化キーを別ストレージ（DBなど）に保存する</h2>
<p>上記の問題は、暗号化キーの保存先であるデータ保護システムのデフォルト保存先をメモリから別ストレージに変更することで解決できます。</p>
<p><a href="https://learn.microsoft.com/ja-jp/aspnet/core/security/data-protection/implementation/key-storage-providers?view=aspnetcore-9.0&amp;tabs=visual-studio">https://learn.microsoft.com/ja-jp/aspnet/core/security/data-protection/implementation/key-storage-providers?view=aspnetcore-9.0&amp;tabs=visual-studio</a></p>
<p>今回は例として、暗号化キーの保存先をDB（Postgresql）に変更します。MySQLでも同じ方法で保存先を変更できます。</p>
<h3 id="content-h-4">依存パッケージのインストール</h3>
<p>まず、対象のプロジェクトに移動し、以下のパッケージをNugetからインストールします。バージョンは各プロジェクトに合わせます。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#DCDCAA">dotnet</span><span style="color:#CE9178"> add</span><span style="color:#CE9178"> package</span><span style="color:#CE9178"> Microsoft.AspNetCore.DataProtection.EntityFrameworkCore</span><span style="color:#569CD6"> --version</span><span style="color:#B5CEA8"> 9.0.0</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p><a href="https://www.nuget.org/packages/Microsoft.AspNetCore.DataProtection.EntityFrameworkCore/">https://www.nuget.org/packages/Microsoft.AspNetCore.DataProtection.EntityFrameworkCore/</a></p>
<h3 id="content-h-5">コードの変更</h3>
<p>次に、<code>Program.cs</code>に以下の内容を追加します。</p>
<div class="post-code-info"><span>Program.cs</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#C586C0">using</span><span style="color:#4EC9B0"> Microsoft</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">AspNetCore</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">DataProtection</span><span style="color:#D4D4D4">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">// 略</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9CDCFE">builder</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">Services</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">AddDataProtection</span><span style="color:#D4D4D4">()</span></span>
<span class="line"><span style="color:#D4D4D4">    .</span><span style="color:#DCDCAA">PersistKeysToDbContext</span><span style="color:#D4D4D4">&#x3C;</span><span style="color:#4EC9B0">ApplicationDbContext</span><span style="color:#D4D4D4">>();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">var</span><span style="color:#9CDCFE"> app</span><span style="color:#D4D4D4"> = </span><span style="color:#9CDCFE">builder</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">Build</span><span style="color:#D4D4D4">();</span></span>
<span class="line"><span style="color:#6A9955">// 略</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>次に、<code>ApplicationDbContext</code>に<code>IDataProtectionKeyContext</code>を継承し、<code>DataProtectionKeys</code>プロパティを追加します。</p>
<div class="post-code-info"><span>Data/ApplicationDbContext.cs</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#C586C0">using</span><span style="color:#4EC9B0"> Microsoft</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">AspNetCore</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">DataProtection</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">EntityFrameworkCore</span><span style="color:#D4D4D4">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">public</span><span style="color:#569CD6"> class</span><span style="color:#4EC9B0"> ApplicationDbContext</span><span style="color:#D4D4D4"> : </span><span style="color:#4EC9B0">IdentityDbContext</span><span style="color:#D4D4D4">, </span><span style="color:#4EC9B0">IDataProtectionKeyContext</span></span>
<span class="line"><span style="color:#D4D4D4">{</span></span>
<span class="line"><span style="color:#6A9955">    // 略</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">    public</span><span style="color:#4EC9B0"> DbSet</span><span style="color:#D4D4D4">&#x3C;</span><span style="color:#4EC9B0">DataProtectionKey</span><span style="color:#D4D4D4">> </span><span style="color:#9CDCFE">DataProtectionKeys</span><span style="color:#D4D4D4"> { </span><span style="color:#569CD6">get</span><span style="color:#D4D4D4">; </span><span style="color:#569CD6">set</span><span style="color:#D4D4D4">; }</span></span>
<span class="line"><span style="color:#D4D4D4">}</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-6">マイグレーション反映</h3>
<p>上記の追加が完了したら、マイグレーションの作成、DB反映をします。<br>
下記コードはサンプルになります。マイグレーションコードは既存コードに合わせて実行してください。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955"># マイグレーションの発行</span></span>
<span class="line"><span style="color:#DCDCAA">dotnet</span><span style="color:#CE9178"> ef</span><span style="color:#CE9178"> migrations</span><span style="color:#CE9178"> add</span><span style="color:#CE9178"> AddDataProtectionKeysTable</span><span style="color:#569CD6"> --context</span><span style="color:#CE9178"> ApplicationDbContext</span><span style="color:#569CD6"> --output-dir</span><span style="color:#CE9178"> Data/Migrations</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955"># マイグレーションをデータベースに反映</span></span>
<span class="line"><span style="color:#DCDCAA">dotnet</span><span style="color:#CE9178"> ef</span><span style="color:#CE9178"> database</span><span style="color:#CE9178"> update</span><span style="color:#569CD6"> --context</span><span style="color:#CE9178"> ApplicationDbContext</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h3 id="content-h-7">確認</h3>
<p>これでDBに <code>DataProtectionKeys</code> というテーブルが作成されます。</p>
<p><img src="/media/d408e1d2-2147-4985-95fe-edcc1a53147a/dataprotectonkeytable1.png" alt="dataprotectonkeytable1.png"></p>
<p>ログイン時に作成された暗号化キーが保存されます。</p>
<p><img src="/media/de1eae86-6ef9-423a-ade2-7165ec6bb4f1/dataprotectonkeytable.png" alt="dataprotectonkeytable.png"></p>
<h2 id="content-h-8">終わりに</h2>
<p>結構前からこの問題について調査していましたが、検索の仕方が悪かったのか、解決まで実は1年くらいかかっています。</p>
<p>それまでは、外部の認証プロバイダを使用するなりして誤魔化していましたが、記事の解決策のおかげで外部認証に依存せずに済みそうでハッピーです。</p>
<h2 id="content-h-9">参考</h2>
<ul>
<li><a href="https://learn.microsoft.com/ja-jp/aspnet/core/security/data-protection/implementation/key-storage-providers?view=aspnetcore-9.0&amp;tabs=visual-studio">ASP.NET Core でのキー ストレージ プロバイダー | Microsoft Learn</a></li>
</ul>
