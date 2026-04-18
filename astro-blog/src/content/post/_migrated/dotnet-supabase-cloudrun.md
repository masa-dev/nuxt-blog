---
title: ".NET MVCをSupabase + Cloud Runで動かしてみる"
description: "少し前に話題になっていた Supabase を最近になって知りました。 SupabaseはFirebaseの代替手段と謳っており、Postgresのデータベースや認証、ストレージなどの機能を提供"
pubDate: "2023-03-31T18:25:05.756Z"
updatedDate: "2025-01-03T09:46:04.313Z"
slug: "dotnet-supabase-cloudrun"
legacyIds:
  - "6425b90086e7de37b82ff1a6"
tags:
  - "docker"
  - "supabase"
  - "cloud-run"
  - "dotnet"
heroImage: "/media/aecceb25-e97f-4276-9269-071a54595d36/スクリーンショット2023-04-01001455.png"
---

<h2 id="content-h-1">はじめに</h2>
<p>少し前に話題になっていた Supabase を最近になって知りました。<br>
SupabaseはFirebaseの代替手段と謳っており、Postgresのデータベースや認証、ストレージなどの機能を提供するプラットフォームのことです。</p>
<p>個人的にPosrgresデータベースを無料枠で使用することができる点が素晴らしいと思っています。<br>
FirebaseのNoSQLもいいですが、EntityFrameworkとの相性は悪くて開発体験がよくないですから、あまり使いたくはありません。また、Cloud SQLや RDSのようなフルマネージドデータベースを使用するという選択肢もありますが、いかんせんコストが高いので、個人開発には向きません。</p>
<p>そんなこんなでCloudRun + Supabaseを使用すれば、実質無料で.NETの環境を作ることができるのではないかと思って、試してみました。</p>
<h2 id="content-h-2">インフラ</h2>
<ul>
<li>Cloud Run</li>
<li>Supabase (Postgres)</li>
</ul>
<h2 id="content-h-3">環境</h2>
<ul>
<li>Docker</li>
<li>.NET MVC Identity</li>
<li>Postgres</li>
</ul>
<h2 id="content-h-4">Supabaseでプロジェクト作成</h2>
<p>ログインは割愛します。</p>
<p>まず、プロジェクトを作成します。（データベースパスワードは控えておく）</p>
<p><img src="/media/e842523a-063b-4fb9-abaa-7e9940b1b4a8/スクリーンショット2023-03-31002638.png" alt="スクリーンショット2023-03-31002638.png"></p>
<p>プロジェクトを作成してプロジェクト詳細に入ったら、左メニューの設定（Project Settings）&gt;Databaseに移動します。</p>
<p>Connection stringの.NETタブを選択すると.NETアプリ用の接続設定を取得できます。<br>
この時点でSQLクライアントソフトから接続確認ができました。</p>
<p><img src="/media/cdd387f3-fc4d-4580-9067-56e57c16fb6a/スクリーンショット2023-03-31010948.png" alt="スクリーンショット2023-03-31010948.png"></p>
<h2 id="content-h-5">.NET Core Identity環境の作成</h2>
<p>.NETの環境を作成します。<br>
開発環境はVSCodeでDev Container拡張機能を使用します。</p>
<div class="post-code-info"><span>Dockerfile</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#569CD6">FROM</span><span style="color:#D4D4D4"> mcr.microsoft.com/dotnet/sdk:7.0 </span><span style="color:#569CD6">AS</span><span style="color:#D4D4D4"> runtime</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">WORKDIR</span><span style="color:#D4D4D4"> /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">COPY</span><span style="color:#D4D4D4"> ./src .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">RUN</span><span style="color:#D4D4D4"> apt-get update &#x26;&#x26; apt-get install -y \</span></span>
<span class="line"><span style="color:#D4D4D4">    git \</span></span>
<span class="line"><span style="color:#D4D4D4">    vim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">RUN</span><span style="color:#D4D4D4"> dotnet tool install --global dotnet-ef --version 7.0</span></span>
<span class="line"><span style="color:#569CD6">RUN</span><span style="color:#D4D4D4"> dotnet tool install --global dotnet-aspnet-codegenerator --version 7.0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">ENV</span><span style="color:#D4D4D4"> PATH $PATH:/root/.dotnet/tools</span></span>
<span class="line"><span style="color:#569CD6">ENV</span><span style="color:#D4D4D4"> TZ Asia/Tokyo</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<div class="post-code-info"><span>docker-compose.yml</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#569CD6">version</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">'3.7'</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">services</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#569CD6">  supabase_web</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#569CD6">    container_name</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">"supabase_web"</span></span>
<span class="line"><span style="color:#569CD6">    build</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#569CD6">      context</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">./</span></span>
<span class="line"><span style="color:#569CD6">      dockerfile</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">Dockerfile</span></span>
<span class="line"><span style="color:#569CD6">    ports</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#D4D4D4">      - </span><span style="color:#CE9178">"50001:8080"</span></span>
<span class="line"><span style="color:#569CD6">    working_dir</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">/app/</span></span>
<span class="line"><span style="color:#569CD6">    tty</span><span style="color:#D4D4D4">: </span><span style="color:#569CD6">true</span></span>
<span class="line"><span style="color:#569CD6">    volumes</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#D4D4D4">      - </span><span style="color:#CE9178">./src/:/app/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">  supabase_db</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#569CD6">    container_name</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">"supabase_db"</span></span>
<span class="line"><span style="color:#569CD6">    image</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">postgres:13-bullseye</span></span>
<span class="line"><span style="color:#569CD6">    ports</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#D4D4D4">      - </span><span style="color:#CE9178">"55432:5432"</span></span>
<span class="line"><span style="color:#569CD6">    volumes</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#D4D4D4">      - </span><span style="color:#CE9178">.dbstore:/var/lib/postgresql/data</span></span>
<span class="line"><span style="color:#569CD6">    environment</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#D4D4D4">      - </span><span style="color:#CE9178">POSTGRES_USER=postgres</span></span>
<span class="line"><span style="color:#D4D4D4">      - </span><span style="color:#CE9178">POSTGRES_DB=postgres</span></span>
<span class="line"><span style="color:#D4D4D4">      - </span><span style="color:#CE9178">POSTGRES_PASSWORD=A9AbbsJiNXUA</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p><code>mkdir src</code>でsrcフォルダを作成したあとに、コマンドパレットを開き、<code>&gt;Dev Containers: Open Folder in Container...</code>を実行してコンテナを起動します。</p>
<p>次に、下記コマンドで.NET MVCテンプレートを作成します。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#DCDCAA">cd</span><span style="color:#CE9178"> /</span></span>
<span class="line"><span style="color:#DCDCAA">dotnet</span><span style="color:#CE9178"> new</span><span style="color:#CE9178"> mvc</span><span style="color:#569CD6"> --auth</span><span style="color:#CE9178"> Individual</span><span style="color:#569CD6"> -uld</span><span style="color:#569CD6"> -o</span><span style="color:#CE9178"> app</span><span style="color:#569CD6"> -n</span><span style="color:#CE9178"> SupabaseTest</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>併せて、gitignoreファイルも作成します。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#DCDCAA">cd</span><span style="color:#CE9178"> /app</span><span style="color:#D4D4D4"> &#x26;&#x26; </span><span style="color:#DCDCAA">dotnet</span><span style="color:#CE9178"> new</span><span style="color:#CE9178"> gitignore</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>作成したら、下記コマンドでPostgresのNugetパッケージをインストールします。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#DCDCAA">dotnet</span><span style="color:#CE9178"> add</span><span style="color:#CE9178"> package</span><span style="color:#CE9178"> Npgsql.EntityFrameworkCore.PostgreSQL</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>PostgreSQLに接続できるように<code>Program.cs</code>ファイルを編集します。</p>
<div class="post-code-info"><span>Program.cs</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#C586C0">using</span><span style="color:#4EC9B0"> Microsoft</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">AspNetCore</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">Identity</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#C586C0">using</span><span style="color:#4EC9B0"> Microsoft</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">EntityFrameworkCore</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#C586C0">using</span><span style="color:#4EC9B0"> SupabaseTest</span><span style="color:#D4D4D4">.</span><span style="color:#4EC9B0">Data</span><span style="color:#D4D4D4">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">var</span><span style="color:#9CDCFE"> builder</span><span style="color:#D4D4D4"> = </span><span style="color:#9CDCFE">WebApplication</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">CreateBuilder</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">args</span><span style="color:#D4D4D4">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9CDCFE">builder</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">WebHost</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">UseUrls</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">"http://0.0.0.0:8080"</span><span style="color:#D4D4D4">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">// Add services to the container.</span></span>
<span class="line"><span style="color:#569CD6">var</span><span style="color:#9CDCFE"> connectionString</span><span style="color:#D4D4D4"> = </span><span style="color:#9CDCFE">builder</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">Configuration</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">GetConnectionString</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">"DefaultConnection"</span><span style="color:#D4D4D4">) ?? </span><span style="color:#C586C0">throw</span><span style="color:#569CD6"> new</span><span style="color:#4EC9B0"> InvalidOperationException</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">"Connection string 'DefaultConnection' not found."</span><span style="color:#D4D4D4">);</span></span>
<span class="line"><span style="color:#9CDCFE">builder</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">Services</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">AddDbContext</span><span style="color:#D4D4D4">&#x3C;</span><span style="color:#4EC9B0">ApplicationDbContext</span><span style="color:#D4D4D4">>(</span><span style="color:#9CDCFE">options</span><span style="color:#D4D4D4"> =></span></span>
<span class="line"><span style="color:#9CDCFE">    options</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">UseNpgsql</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">connectionString</span><span style="color:#D4D4D4">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">// 略 //</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>また、<code>appSettings.Develop.json</code>を以下のように変更します。</p>
<div class="post-code-info"><span>appSettings.Develop.json</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#D4D4D4">{</span></span>
<span class="line"><span style="color:#9CDCFE">  "DetailedErrors"</span><span style="color:#D4D4D4">: </span><span style="color:#569CD6">true</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">  "ConnectionStrings"</span><span style="color:#D4D4D4">: {</span></span>
<span class="line"><span style="color:#9CDCFE">    "DefaultConnection"</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">"Host= supabase_db;Port=5432;Database=postgres;Username=postgres;Password=A9AbbsJiNXUA"</span></span>
<span class="line"><span style="color:#D4D4D4">  },</span></span>
<span class="line"><span style="color:#9CDCFE">  "Logging"</span><span style="color:#D4D4D4">: {</span></span>
<span class="line"><span style="color:#9CDCFE">    "LogLevel"</span><span style="color:#D4D4D4">: {</span></span>
<span class="line"><span style="color:#9CDCFE">      "Default"</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">"Information"</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">      "Microsoft.AspNetCore"</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">"Warning"</span></span>
<span class="line"><span style="color:#D4D4D4">    }</span></span>
<span class="line"><span style="color:#D4D4D4">  }</span></span>
<span class="line"><span style="color:#D4D4D4">}</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>次にマイグレーション関連を整理します。</p>
<p>今のままではマイグレーションがSQL Server用のものとなっており、updateを行ってもエラーが発生します。そのため、下記コマンドで初期マイグレーションを再発行します。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#DCDCAA">cd</span><span style="color:#CE9178"> /app</span></span>
<span class="line"><span style="color:#DCDCAA">rm</span><span style="color:#CE9178"> Data/Migrations/</span><span style="color:#569CD6">*</span><span style="color:#CE9178">.cs</span></span>
<span class="line"><span style="color:#6A9955"># マイグレーションの発行</span></span>
<span class="line"><span style="color:#DCDCAA">dotnet</span><span style="color:#CE9178"> ef</span><span style="color:#CE9178"> migrations</span><span style="color:#CE9178"> add</span><span style="color:#CE9178"> InitialCreate</span><span style="color:#569CD6"> --context</span><span style="color:#CE9178"> ApplicationDbContext</span><span style="color:#569CD6"> --output-dir</span><span style="color:#CE9178"> Data/Migrations</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955"># マイグレーションをデータベースに反映</span></span>
<span class="line"><span style="color:#DCDCAA">dotnet</span><span style="color:#CE9178"> ef</span><span style="color:#CE9178"> database</span><span style="color:#CE9178"> update</span><span style="color:#569CD6"> --context</span><span style="color:#CE9178"> ApplicationDbContext</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>次にデバッグできるようにVSCodeの左メニューから、「実行とデバッグ」を開き、「launch.jsonファイルを作成」し、.NET 5+ .NET MVCを選択して<code>launch.json</code>を自動生成します。<br>
また、VSCodeの拡張機能で「C# <code>ms-dotnettools.csharp</code>」をインストールしておきます。</p>
<p><code>launch.json</code>ファイルが自動生成できたら、<code>F5</code>キーを押してデバッグを開始します。</p>
<p>デバッグが実行出来たら、<a href="http://localhost:50001/">http://localhost:50001/</a> でアクセスできます。</p>
<p>データベースに接続できているか確認するために適当にユーザーを登録して、「Click here to confirm your account」をクリックします。その後、ログインができていたらDBは接続できています。</p>
<p>これでローカルで開発できる環境ができました。</p>
<h2 id="content-h-6">本番環境にマイグレーション</h2>
<p>CloudRunにデプロイした際にSupabaseのPostgreに接続できるようにする必要があります。</p>
<p>まず、Postgresの接続情報を記載した<code>appsettings.Production.json</code>を作成します。</p>
<div class="post-code-info"><span>appsettings.Production.json</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#D4D4D4">{</span></span>
<span class="line"><span style="color:#9CDCFE">  "DetailedErrors"</span><span style="color:#D4D4D4">: </span><span style="color:#569CD6">false</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">  "ConnectionStrings"</span><span style="color:#D4D4D4">: {</span></span>
<span class="line"><span style="color:#9CDCFE">    "DefaultConnection"</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">"User Id=postgres;Password=XXXXXXXX;Server=db.xxxxxxxxxxxxxxxxxx.supabase.co;Port=5432;Database=postgre"</span></span>
<span class="line"><span style="color:#D4D4D4">  },</span></span>
<span class="line"><span style="color:#9CDCFE">  "Logging"</span><span style="color:#D4D4D4">: {</span></span>
<span class="line"><span style="color:#9CDCFE">    "LogLevel"</span><span style="color:#D4D4D4">: {</span></span>
<span class="line"><span style="color:#9CDCFE">      "Default"</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">"Information"</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">      "Microsoft.AspNetCore"</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">"Warning"</span></span>
<span class="line"><span style="color:#D4D4D4">    }</span></span>
<span class="line"><span style="color:#D4D4D4">  }</span></span>
<span class="line"><span style="color:#D4D4D4">}</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>次に下記のコマンドでsupabaseのデータベースを更新します。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#DCDCAA">cd</span><span style="color:#CE9178"> /app</span></span>
<span class="line"><span style="color:#569CD6">export</span><span style="color:#9CDCFE"> ASPNETCORE_ENVIRONMENT</span><span style="color:#D4D4D4">=</span><span style="color:#CE9178">"Production"</span></span>
<span class="line"><span style="color:#DCDCAA">dotnet</span><span style="color:#CE9178"> ef</span><span style="color:#CE9178"> database</span><span style="color:#CE9178"> update</span></span>
<span class="line"><span style="color:#569CD6">export</span><span style="color:#9CDCFE"> ASPNETCORE_ENVIRONMENT</span><span style="color:#D4D4D4">=</span><span style="color:#CE9178">"Development"</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h2 id="content-h-7">Cloud Runにデプロイ</h2>
<p>まず、Cloud Runとは、サーバーレスのプラットフォームで、コンテナベースのWebアプリケーションを実行させることができます。</p>
<p>要はDockerなどのコンテナからアプリケーションを実行するため、任意の言語の環境を使用することができます。また、Dockerベースの開発をする場合、ローカルの環境とCloud Runの環境を同じ環境にすることができるメリットがあります。</p>
<p>先ほど作成した.NETアプリケーションをCloud Runにデプロイします。</p>
<h3 id="content-h-8">GCPのロール変更</h3>
<p>GCPのサービスアカウントからCloudRunにデプロイするため、権限を付与する必要があります。</p>
<ol>
<li>Cloud Buildに移動して、左メニューの「設定」に移動</li>
<li>「Cloud Run」のステータスを有効に変更</li>
<li>モーダルの「すべてのサービス アカウントにアクセス権を付与」</li>
</ol>
<h3 id="content-h-9">Cloud buildでイメージをビルドする</h3>
<p>gcloud sdkがローカルにインストールされている前提で話します。</p>
<p>Cloud Runでデプロイするためにはデプロイするコンテナのイメージが必要なので、Cloud Buildを使用してCloud Registryにイメージを保存します。</p>
<p>まず、デプロイ用のDocker設定ファイルである<code>CloudRun.Dockerfile</code>を作成します。<br><br>
注意点としては、CloudRunにデプロイする場合は <strong>必ず8080ポートを公開する</strong>ことです。そうしないとデプロイ時にエラーが発生します。</p>
<div class="post-code-info"><span>CloudRun.Dockerfile</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#569CD6">FROM</span><span style="color:#D4D4D4"> mcr.microsoft.com/dotnet/sdk:7.0 </span><span style="color:#569CD6">AS</span><span style="color:#D4D4D4"> build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">WORKDIR</span><span style="color:#D4D4D4"> /app</span></span>
<span class="line"><span style="color:#569CD6">COPY</span><span style="color:#D4D4D4"> ./src .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">RUN</span><span style="color:#D4D4D4"> dotnet publish -c Release -o dist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">FROM</span><span style="color:#D4D4D4"> mcr.microsoft.com/dotnet/aspnet:7.0 </span><span style="color:#569CD6">AS</span><span style="color:#D4D4D4"> runtime</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">WORKDIR</span><span style="color:#D4D4D4"> /app</span></span>
<span class="line"><span style="color:#569CD6">COPY</span><span style="color:#D4D4D4"> --from=build /app/dist .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">ENV</span><span style="color:#D4D4D4"> TZ Asia/Tokyo</span></span>
<span class="line"><span style="color:#569CD6">ENV</span><span style="color:#D4D4D4"> ASPNETCORE_ENVIRONMENT Production</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">ENV</span><span style="color:#D4D4D4"> PORT=8080</span></span>
<span class="line"><span style="color:#569CD6">EXPOSE</span><span style="color:#D4D4D4"> 8080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">ENTRYPOINT</span><span style="color:#D4D4D4"> [</span><span style="color:#CE9178">"dotnet"</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">"SupabaseTest.dll"</span><span style="color:#D4D4D4">]</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>次にビルド設定の<code>cloudbuild.yml</code>を作成します。</p>
<div class="post-code-info"><span>cloudbuild.yml</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#569CD6">steps</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#6A9955"># Build the container image</span></span>
<span class="line"><span style="color:#D4D4D4">- </span><span style="color:#569CD6">name</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">'gcr.io/cloud-builders/docker'</span></span>
<span class="line"><span style="color:#569CD6">  args</span><span style="color:#D4D4D4">: [</span><span style="color:#CE9178">'build'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'-t'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'gcr.io/PROJECT_ID/IMAGE'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'-f'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'CloudRun.Dockerfile'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'.'</span><span style="color:#D4D4D4">]</span></span>
<span class="line"><span style="color:#6A9955"># Push the container image to Container Registry</span></span>
<span class="line"><span style="color:#D4D4D4">- </span><span style="color:#569CD6">name</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">'gcr.io/cloud-builders/docker'</span></span>
<span class="line"><span style="color:#569CD6">  args</span><span style="color:#D4D4D4">: [</span><span style="color:#CE9178">'push'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'gcr.io/PROJECT_ID/IMAGE'</span><span style="color:#D4D4D4">]</span></span>
<span class="line"><span style="color:#6A9955"># Deploy container image to Cloud Run</span></span>
<span class="line"><span style="color:#D4D4D4">- </span><span style="color:#569CD6">name</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">'gcr.io/google.com/cloudsdktool/cloud-sdk'</span></span>
<span class="line"><span style="color:#569CD6">  entrypoint</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">gcloud</span></span>
<span class="line"><span style="color:#569CD6">  args</span><span style="color:#D4D4D4">: [</span><span style="color:#CE9178">'run'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'deploy'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'SERVICE_NAME'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'--image'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'gcr.io/PROJECT_ID/IMAGE'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'--region'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'REGION'</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">'--allow-unauthenticated'</span><span style="color:#D4D4D4">]</span></span>
<span class="line"><span style="color:#569CD6">images</span><span style="color:#D4D4D4">:</span></span>
<span class="line"><span style="color:#D4D4D4">- </span><span style="color:#CE9178">gcr.io/PROJECT_ID/IMAGE</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p><code>cloudbuild.yml</code>の各項目を変換しておいてください。</p>
<table>
<thead>
<tr>
<th>変換前</th>
<th>内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>PROJECT_ID</code></td>
<td>プロジェクトのID</td>
</tr>
<tr>
<td><code>IMAGE</code></td>
<td>Contaier Registoryに保存する名前</td>
</tr>
<tr>
<td><code>SERVICE_NAME</code></td>
<td>デプロイサービスの名前</td>
</tr>
<tr>
<td><code>REGION</code></td>
<td>デプロイ先のリージョン<br>東京なら<code>asia-northeast1</code></td>
</tr>
</tbody>
</table>
<h3 id="content-h-10">デプロイする</h3>
<p>ローカル環境で<code>CloudRun.Dockerfile</code>のあるフォルダで以下のコマンドを実行します。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#DCDCAA">gcloud</span><span style="color:#CE9178"> builds</span><span style="color:#CE9178"> submit</span><span style="color:#CE9178"> ./</span><span style="color:#569CD6"> --config</span><span style="color:#CE9178"> cloudbuild.yml</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>特にエラーがなければデプロイの成功です。</p>
<p>認証の機能が使用できていたので、データベースにも接続できていますね！</p>
<p><img src="/media/8e50b2a3-edd8-4f72-9ae7-781009eaaa31/スクリーンショット2023-04-01001455.png" alt="スクリーンショット2023-04-01001455.png"></p>
<h2 id="content-h-11">おわりに</h2>
<p>実際にCloud RunとSupabaseを使用することで.NETの環境を限りなく安くなるように作成できました。ただ、今回作成した.NETアプリは、Cloud Runの特性上、十数分程度でログインセッションが切れてしまうため、セッションをインメモリからデータベースに保存するなどの対応が必要になりそうです。<br><br>
Supabaseのプロジェクトは無料枠で2つのみなので、数を作成できませんが、個人開発にはもっていこいのサービスだと思います。</p>
<p>Cloud Runなので.NET Coreの環境にとどまらず、頑張ればWordpressの環境も作成できるんじゃないかと思います。ほぼ無料でWordpress環境は夢があっていいですね。</p>
<p>さいごに、サクッと記事が書けるだろうと思って書き始めましたが、思ったより基本的な説明に時間をとってしまう形になってしまいました。記事を作成するのは難しいですね...</p>
