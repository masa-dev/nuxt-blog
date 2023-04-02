__NUXT_JSONP__("/post/page/1", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M){return {data:[{page:y,posts:[{_id:"6425b90086e7de37b82ff1a6",_sys:{raw:{createdAt:"2023-03-30T16:29:52.297Z",updatedAt:q,firstPublishedAt:z,publishedAt:q},customOrder:6,createdAt:z,updatedAt:q},title:A,slug:"dotnet-supabase-cloudrun",description:"少し前に話題になっていた Supabase を最近になって知りました。 SupabaseはFirebaseの代替手段と謳っており、Postgresのデータベースや認証、ストレージなどの機能を提供",meta:{title:A,description:"少し前に話題になっていた Supabase を最近になって知りました。 SupabaseはFirebaseの代替手段と謳っており、Postgresのデータベースや認証などの Postgresのデータベ",ogImage:{_id:B,altText:a,description:a,fileName:C,fileSize:D,fileType:r,height:d,metadata:{},src:E,title:a,width:d}},body:"\u003Ch2\u003Eはじめに\u003C\u002Fh2\u003E\n\u003Cp\u003E少し前に話題になっていた Supabase を最近になって知りました。\u003Cbr\u003E\nSupabaseはFirebaseの代替手段と謳っており、Postgresのデータベースや認証、ストレージなどの機能を提供するプラットフォームのことです。\u003C\u002Fp\u003E\n\u003Cp\u003E個人的にPosrgresデータベースを無料枠で使用することができる点が素晴らしいと思っています。\u003Cbr\u003E\nFirebaseのNoSQLもいいですが、EntityFrameworkとの相性は悪くて開発体験がよくないですから、あまり使いたくはなありません。また、Cloud SQLや RDSのようなフルマネージドデータベースを使用するという選択肢もありますが、いかんせんコストが高いので、個人開発には向きません。\u003C\u002Fp\u003E\n\u003Cp\u003EそんなこんなでCloudRun + Supabaseを使用すれば、実質無料で.NETの環境を作ることができるのではないかと思って、試してみました。\u003C\u002Fp\u003E\n\u003Ch2\u003Eインフラ\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003ECloud Run\u003C\u002Fli\u003E\n\u003Cli\u003ESupabase (Postgres)\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003E環境\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003EDocker\u003C\u002Fli\u003E\n\u003Cli\u003E.NET MVC Identity\u003C\u002Fli\u003E\n\u003Cli\u003EPostgres\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003ESupabaseでプロジェクト作成\u003C\u002Fh2\u003E\n\u003Cp\u003Eログインは割愛します。\u003C\u002Fp\u003E\n\u003Cp\u003Eまず、プロジェクトを作成します。（データベースパスワードは控えておく）\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002Fe842523a-063b-4fb9-abaa-7e9940b1b4a8\u002F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%882023-03-31002638.png\" alt=\"スクリーンショット2023-03-31002638.png\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eプロジェクトを作成してプロジェクト詳細に入ったら、左メニューの設定（Project Settings）&gt;Databaseに移動します。\u003C\u002Fp\u003E\n\u003Cp\u003EConnection stringの.NETタブを選択すると.NETアプリ用の接続設定を取得できます。\u003Cbr\u003E\nこの時点でSQLクライアントソフトから接続確認ができました。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002Fcdd387f3-fc4d-4580-9067-56e57c16fb6a\u002F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%882023-03-31010948.png\" alt=\"スクリーンショット2023-03-31010948.png\"\u003E\u003C\u002Fp\u003E\n\u003Ch2\u003E.NET Core Identity環境の作成\u003C\u002Fh2\u003E\n\u003Cp\u003E.NETの環境を作成します。\u003Cbr\u003E\n開発環境はVSCodeでDev Container拡張機能を使用します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-dockerfile:Dockerfile\"\u003EFROM mcr.microsoft.com\u002Fdotnet\u002Fsdk:7.0 AS runtime\n\nWORKDIR \u002Fapp\n\nCOPY .\u002Fsrc .\n\nRUN apt-get update &amp;&amp; apt-get install -y \\\n    git \\\n    vim\n\nRUN dotnet tool install --global dotnet-ef --version 7.0\nRUN dotnet tool install --global dotnet-aspnet-codegenerator --version 7.0\n\nENV PATH $PATH:\u002Froot\u002F.dotnet\u002Ftools\nENV TZ Asia\u002FTokyo\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-yml:docker-compose.yml\"\u003Eversion: '3.7'\n\nservices:\n  supabase_web:\n    container_name: &quot;supabase_web&quot;\n    build:\n      context: .\u002F\n      dockerfile: Dockerfile\n    ports:\n      - &quot;50001:8080&quot;\n    working_dir: \u002Fapp\u002F\n    tty: true\n    volumes:\n      - .\u002Fsrc\u002F:\u002Fapp\u002F\n\n  supabase_db:\n    container_name: &quot;supabase_db&quot;\n    image: postgres:13-bullseye\n    ports:\n      - &quot;55432:5432&quot;\n    volumes:\n      - .dbstore:\u002Fvar\u002Flib\u002Fpostgresql\u002Fdata\n    environment:\n      - POSTGRES_USER=postgres\n      - POSTGRES_DB=postgres\n      - POSTGRES_PASSWORD=A9AbbsJiNXUA\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eコマンドパレットを開き、\u003Ccode\u003E&gt;Dev Containers: Open Folder in Container...\u003C\u002Fcode\u003Eを実行してコンテナを起動します。\u003C\u002Fp\u003E\n\u003Cp\u003E次に、下記コマンドで.NET MVCテンプレートを作成します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Ecd \u002Fapp\ndotnet new webapp --auth Individual -uld -o src -n SupabaseTest\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E作成したら、下記コマンドでPostgresのNugetパッケージをインストールします。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Edotnet add package Npgsql.EntityFrameworkCore.PostgreSQL\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003EPostgreSQLに接続できるように\u003Ccode\u003EProgram.cs\u003C\u002Fcode\u003Eファイルを編集します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-cs:Program.cs\"\u003Eusing Microsoft.AspNetCore.Identity;\nusing Microsoft.EntityFrameworkCore;\nusing SupabaseTest.Data;\n\nvar builder = WebApplication.CreateBuilder(args);\n\nbuilder.WebHost.UseUrls(&quot;http:\u002F\u002F0.0.0.0:8080&quot;);\n\n\u002F\u002F Add services to the container.\nvar connectionString = builder.Configuration.GetConnectionString(&quot;DefaultConnection&quot;) ?? throw new InvalidOperationException(&quot;Connection string 'DefaultConnection' not found.&quot;);\nbuilder.Services.AddDbContext&lt;ApplicationDbContext&gt;(options =&gt;\n    options.UseNpgsql(connectionString));\n\n\u002F\u002F 略 \u002F\u002F\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eまた、\u003Ccode\u003EappSettings.Develop.json\u003C\u002Fcode\u003Eを以下のように変更します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-json:appSettings.Develop.json\"\u003E{\n  &quot;DetailedErrors&quot;: true,\n  &quot;ConnectionStrings&quot;: {\n    &quot;DefaultConnection&quot;: &quot;Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=A9AbbsJiNXUA&quot;\n  },\n  &quot;Logging&quot;: {\n    &quot;LogLevel&quot;: {\n      &quot;Default&quot;: &quot;Information&quot;,\n      &quot;Microsoft.AspNetCore&quot;: &quot;Warning&quot;\n    }\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E次にマイグレーション関連を整理します。\u003C\u002Fp\u003E\n\u003Cp\u003E今のままではマイグレーションがSQL Server用のものとなっており、updateを行ってもエラーが発生します。そのため、下記コマンドで初期マイグレーションを再発行します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Ecd \u002Fapp\nrm test\u002F*.cs\n# マイグレーションの発行\ndotnet ef migrations add InitialCreate --context ApplicationDbContext --output-dir Data\u002FMigrations\n\n# マイグレーションをデータベースに反映\ndotnet ef database update --context ApplicationDbContext\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E次にデバッグできるようにVSCodeの左メニューから、「実行とデバッグ」を開き、「launch.jsonファイルを作成」し、.NET 5+ .NET MVCを選択して\u003Ccode\u003Elaunch.json\u003C\u002Fcode\u003Eを自動生成します。\u003Cbr\u003E\nまた、VSCodeの拡張機能で「C# \u003Ccode\u003Ems-dotnettools.csharp\u003C\u002Fcode\u003E」をインストールしておきます。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003Elaunch.json\u003C\u002Fcode\u003Eファイルが自動生成できたら、\u003Ccode\u003EF5\u003C\u002Fcode\u003Eキーを押してデバッグを開始します。\u003C\u002Fp\u003E\n\u003Cp\u003Eデバッグが実行出来たら、\u003Ca href=\"http:\u002F\u002Flocalhost:50001\u002F\"\u003Ehttp:\u002F\u002Flocalhost:50001\u002F\u003C\u002Fa\u003E でアクセスできます。\u003C\u002Fp\u003E\n\u003Cp\u003Eデータベースに接続できているか確認するために適当にユーザーを登録して、「Click here to confirm your account」をクリックします。その後、ログインができていたらDBは接続できています。\u003C\u002Fp\u003E\n\u003Cp\u003Eこれでローカルで開発できる環境ができました。\u003C\u002Fp\u003E\n\u003Ch2\u003E本番環境にマイグレーション\u003C\u002Fh2\u003E\n\u003Cp\u003ECloudRunにデプロイした際にSupabaseのPostgreに接続できるようにする必要があります。\u003C\u002Fp\u003E\n\u003Cp\u003Eまず、Postgresの接続情報を記載した\u003Ccode\u003Eappsettings.Production.json\u003C\u002Fcode\u003Eを作成します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-json:appsettings.Production.json\"\u003E{\n  &quot;DetailedErrors&quot;: false,\n  &quot;ConnectionStrings&quot;: {\n    &quot;DefaultConnection&quot;: &quot;User Id=postgres;Password=XXXXXXXX;Server=db.xxxxxxxxxxxxxxxxxx.supabase.co;Port=5432;Database=postgre&quot;\n  },\n  &quot;Logging&quot;: {\n    &quot;LogLevel&quot;: {\n      &quot;Default&quot;: &quot;Information&quot;,\n      &quot;Microsoft.AspNetCore&quot;: &quot;Warning&quot;\n    }\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E次に下記のコマンドでsupabaseのデータベースを更新します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Ecd \u002Fapp\nexport ASPNETCORE_ENVIRONMENT=&quot;Production&quot;\ndotnet ef database update\nexport ASPNETCORE_ENVIRONMENT=&quot;Development&quot;\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2\u003ECloud Runにデプロイ\u003C\u002Fh2\u003E\n\u003Cp\u003Eまず、Cloud Runとは、サーバーレスのプラットフォームで、コンテナベースのWebアプリケーションを実行させることができます。\u003C\u002Fp\u003E\n\u003Cp\u003E要はDockerなどのコンテナからアプリケーションを実行するため、任意の言語の環境を使用することができます。また、Dockerベースの開発をする場合、ローカルの環境とCloud Runの環境を同じ環境にすることができるメリットがあります。\u003C\u002Fp\u003E\n\u003Cp\u003E先ほど作成した.NETアプリケーションをCloud Runにデプロイします。\u003C\u002Fp\u003E\n\u003Ch3\u003EGCPのロール変更\u003C\u002Fh3\u003E\n\u003Cp\u003EGCPのサービスアカウントからCloudRunにデプロイするため、権限を付与する必要があります。\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli\u003ECloud Buildに移動して、左メニューの「設定」に移動\u003C\u002Fli\u003E\n\u003Cli\u003E「Cloud Run」のステータスを有効に変更\u003C\u002Fli\u003E\n\u003Cli\u003Eモーダルの「すべてのサービス アカウントにアクセス権を付与」\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Ch3\u003ECloud buildでイメージをビルドする\u003C\u002Fh3\u003E\n\u003Cp\u003Egcloud sdkがローカルにインストールされている前提で話します。\u003C\u002Fp\u003E\n\u003Cp\u003ECloud Runでデプロイするためにはデプロイするコンテナのイメージが必要なので、Cloud Buildを使用してCloud Registryにイメージを保存します。\u003C\u002Fp\u003E\n\u003Cp\u003Eまず、デプロイ用のDocker設定ファイルである\u003Ccode\u003ECloudRun.Dockerfile\u003C\u002Fcode\u003Eを作成します。\u003Cbr\u003E\u003Cbr\u003E\n注意点としては、CloudRunにデプロイする場合は \u003Cstrong\u003E必ず8080ポートを公開する\u003C\u002Fstrong\u003Eことです。そうしないとデプロイ時にエラーが発生します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-dockerfile:CloudRun.Dockerfile\"\u003EFROM mcr.microsoft.com\u002Fdotnet\u002Fsdk:7.0 AS build\n\nWORKDIR \u002Fapp\nCOPY .\u002Fsrc .\n\nRUN dotnet publish -c Release -o dist\n\nFROM mcr.microsoft.com\u002Fdotnet\u002Faspnet:7.0 AS runtime\n\nWORKDIR \u002Fapp\nCOPY --from=build \u002Fapp\u002Fdist .\n\nENV TZ Asia\u002FTokyo\nENV ASPNETCORE_ENVIRONMENT Production\n\nENV PORT=8080\nEXPOSE 8080\n\nENTRYPOINT [&quot;dotnet&quot;, &quot;SupabaseTest.dll&quot;]\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E次にビルド設定の\u003Ccode\u003Ecloudbuild.yml\u003C\u002Fcode\u003Eを作成します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-yml:cloudbuild.yml\"\u003Esteps:\n# Build the container image\n- name: 'gcr.io\u002Fcloud-builders\u002Fdocker'\n  args: ['build', '-t', 'gcr.io\u002FPROJECT_ID\u002FIMAGE', '-f', 'CloudRun.Dockerfile', '.']\n# Push the container image to Container Registry\n- name: 'gcr.io\u002Fcloud-builders\u002Fdocker'\n  args: ['push', 'gcr.io\u002FPROJECT_ID\u002FIMAGE']\n# Deploy container image to Cloud Run\n- name: 'gcr.io\u002Fgoogle.com\u002Fcloudsdktool\u002Fcloud-sdk'\n  entrypoint: gcloud\n  args: ['run', 'deploy', 'SERVICE_NAME', '--image', 'gcr.io\u002FPROJECT_ID\u002FIMAGE', '--region', 'REGION', '--allow-unauthenticated']\nimages:\n- gcr.io\u002FPROJECT_ID\u002FIMAGE\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E\u003Ccode\u003Ecloudbuild.yml\u003C\u002Fcode\u003Eの各項目を変換しておいてください。\u003C\u002Fp\u003E\n\u003Ctable\u003E\n\u003Cthead\u003E\n\u003Ctr\u003E\n\u003Cth\u003E変換前\u003C\u002Fth\u003E\n\u003Cth\u003E内容\u003C\u002Fth\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Fthead\u003E\n\u003Ctbody\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ccode\u003EPROJECT_ID\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003EプロジェクトのID\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ccode\u003EIMAGE\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003EContaier Registoryに保存する名前\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ccode\u003ESERVICE_NAME\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003Eデプロイサービスの名前\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ccode\u003EREGION\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003Eデプロイ先のリージョン\u003Cbr\u003E東京なら\u003Ccode\u003Easia-northeast1\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Ftbody\u003E\n\u003C\u002Ftable\u003E\n\u003Ch3\u003Eデプロイする\u003C\u002Fh3\u003E\n\u003Cp\u003Eローカル環境で\u003Ccode\u003ECloudRun.Dockerfile\u003C\u002Fcode\u003Eのあるフォルダで以下のコマンドを実行します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Egcloud builds submit .\u002F --config cloudbuild.yml\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E特にエラーがなければデプロイの成功です。\u003C\u002Fp\u003E\n\u003Cp\u003E認証の機能が使用できていたので、データベースにも接続できていますね！\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F8e50b2a3-edd8-4f72-9ae7-781009eaaa31\u002F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%882023-04-01001455.png\" alt=\"スクリーンショット2023-04-01001455.png\"\u003E\u003C\u002Fp\u003E\n\u003Ch2\u003Eおわりに\u003C\u002Fh2\u003E\n\u003Cp\u003E実際にCloud RunとSupabaseを使用することで.NETの環境を限りなく安くなるように作成できました。ただ、今回作成した.NETアプリは、Cloud Runの特性上、十数分程度でログインセッションが切れてしまうため、セッションをインメモリからデータベースに保存するなどの対応が必要になりそうです。\u003Cbr\u003E\u003Cbr\u003E\nSupabaseのプロジェクトは無料枠で2つのみなので、数を作成できませんが、個人開発にはもっていこいのサービスだと思います。\u003C\u002Fp\u003E\n\u003Cp\u003ECloud Runなので.NET Coreの環境にとどまらず、頑張ればWordpressの環境も作成できるんじゃないかと思います。ほぼ無料でWordpress環境は夢があっていいですね。\u003C\u002Fp\u003E\n\u003Cp\u003Eさいごに、サクッと記事が書けるだろうと思って書き始めましたが、思ったより基本的な説明に時間をとってしまう形になってしまいました。記事を作成するのは難しいですね...\u003C\u002Fp\u003E\n",image:{_id:B,altText:a,description:a,fileName:C,fileSize:D,fileType:r,height:d,metadata:{},src:E,title:a,width:d},author:{_id:m,_sys:{raw:{createdAt:b,updatedAt:c,firstPublishedAt:b,publishedAt:c},createdAt:b,updatedAt:c},name:e,slug:e,biography:n,image:o},tags:[{_id:"63ddfeed16bdb9179565e88f",_sys:{raw:{createdAt:f,updatedAt:f,firstPublishedAt:f,publishedAt:f},customOrder:16,createdAt:f,updatedAt:f},name:"Docker",slug:"docker",image:"63ddfecf16bdb9179565e59a"},{_id:"64272284a184ff3f874d6b48",_sys:{raw:{createdAt:g,updatedAt:g,firstPublishedAt:g,publishedAt:g},customOrder:19,createdAt:g,updatedAt:g},name:"Supabase",slug:"supabase",image:"64272268a184ff3f874d6804"},{_id:"638c478cca4a512e0c0901bb",_sys:{raw:{createdAt:s,updatedAt:t,firstPublishedAt:s,publishedAt:t},customOrder:15,createdAt:s,updatedAt:t},name:"Cloud Run",slug:"cloud-run",image:"638c4773ca4a512e0c0900d2"},{_id:"642722b7a184ff3f874d85a7",_sys:{raw:{createdAt:h,updatedAt:h,firstPublishedAt:h,publishedAt:h},customOrder:20,createdAt:h,updatedAt:h},name:".NET",slug:"dotnet",image:"64272294a184ff3f874d7305"}]},{_id:"63d6a6932772b5781daab492",_sys:{raw:{createdAt:"2023-01-29T17:02:11.761Z",updatedAt:u,firstPublishedAt:F,publishedAt:u},customOrder:4,createdAt:F,updatedAt:u},title:p,slug:"windows-bash-environmental-setting",description:p,meta:{title:p,description:p,ogImage:d},body:"\u003Ch2\u003Eはじめに\u003C\u002Fh2\u003E\n\u003Cp\u003E最近（一年前）に引っ越してから Windows 環境を一新したので、 シェル関連で今までやってきたことをまとめようとおもいます。\u003C\u002Fp\u003E\n\u003Ch2\u003E実行ターミナル\u003C\u002Fh2\u003E\n\u003Cp\u003Eまず、シェルの実行環境は、Windows Terminal と \u003Ca href=\"https:\u002F\u002Fhyper.is\u002F\"\u003EHyper\u003C\u002Fa\u003E を使用しています。\u003Cbr\u003E\u003Cbr\u003E\n気分でどちらを使うか決めているのですが、使いやすさでいうなら Windows Terminal の方がいいです。Windows の Hyper は画面分割ができますが、コピーとペーストのショートカットが通常と違って使いにくいです。\u003C\u002Fp\u003E\n\u003Cp\u003EHyperにはポケモンのテーマなどもあるので、（見にくくなりますが）気になる人は使ってみてもいいかもしれないですね。\u003C\u002Fp\u003E\n\u003Ch2\u003Eシェル\u003C\u002Fh2\u003E\n\u003Cp\u003E基本的に Git Bash を使用しています。\u003Cbr\u003E\u003Cbr\u003E\nGit Bash はGitをインストールする勝手にインストールされているので、使用している人も多いんじゃないでしょうか。\u003C\u002Fp\u003E\n\u003Cp\u003Ebash でできることが大体できますし、デフォルトでgitのブランチが表示されている点が優秀です。\u003C\u002Fp\u003E\n\u003Cp\u003E最初はPowerShellを使用していましたが、\u003Ccode\u003Els\u003C\u002Fcode\u003Eコマンドが使用できなかったり、専用のコマンドがよくわからなかったりと、不満があったので結果として Git Bash を使う形に落ち着いています。\u003C\u002Fp\u003E\n\u003Ch2\u003Eコマンド\u003C\u002Fh2\u003E\n\u003Cp\u003EGit Bashを使いやすくするため、いくつかのコマンドを使えるようにしています。\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003Evim\u003C\u002Fli\u003E\n\u003Cli\u003Epeco\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003Eそれぞれ説明していきます。\u003C\u002Fp\u003E\n\u003Ch3\u003EVim\u003C\u002Fh3\u003E\n\u003Cp\u003E名前だけは聞いたことがある人も多いんじゃないでしょうか。Vim はコマンドラインエディタの一種であり、アプリの切り替えを行わずにコマンドラインから直接ファイルの編集を行うことができます。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003E.bashrc\u003C\u002Fcode\u003Eなどのちょっとした設定ファイルなどの編集を行う際などによく使っています。\u003Cbr\u003E\u003Cbr\u003E\nかなり癖のある UI をしていますが、住めば都というように、慣れれば VS Code で Vim の拡張機能を入れたくなるほどになります。\u003C\u002Fp\u003E\n\u003Cp\u003Eまた、プラグインをインストールすることで、デフォルトのカラースキームを変更できたり、エクスプローラーのような機能を追加することもできます。その設定などは機会があれば別の記事にしようと思います。\u003C\u002Fp\u003E\n\u003Ch3\u003EPeco\u003C\u002Fh3\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Fpeco\u002Fpeco\"\u003Epeco\u003C\u002Fa\u003E は与えられた入力を視覚的に選択できるコマンドです。\u003C\u002Fp\u003E\n\u003Cp\u003E基本的なコマンドの使用方法は、与えられた入力リストをselectのように選択させて、選択させたものを文字列として出力します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003E# ls の出力リストから選択させる\nls | peco\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E上述のような使い方は基本的にはせずに、\u003Ccode\u003E.bash_history\u003C\u002Fcode\u003Eの内容を読むようにして、\u003Ccode\u003ECtrl + r\u003C\u002Fcode\u003Eなどのバインディングでコマンドの履歴検索をできるようにしています。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F1b9d5393-50b4-46d6-9ce5-0ecd5eb384e3\u002F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%882023-01-30020344.png\" alt=\"スクリーンショット2023-01-30020344.png\"\u003E\u003C\u002Fp\u003E\n\u003Ch2\u003Eさいごに\u003C\u002Fh2\u003E\n\u003Cp\u003Evim のプラグインなどを考えて記事を書き始めましたが、後からvim関係は別に分けた方がいいのではないかと思い、vim関係を書かなくした結果、思ったより記事の内容が薄くなってしまいました。\u003C\u002Fp\u003E\n\u003Cp\u003Eまぁ、見てる人そんなにいないし、ここまで見ている人いないから、問題なし！ 安全確認ヨシ！\u003C\u002Fp\u003E\n",image:{_id:"63d6a6ff2772b5781daacccc",altText:G,description:a,fileName:"スクリーンショット2023-01-30020344.png",fileSize:6272,fileType:r,height:d,metadata:{},src:"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F1b9d5393-50b4-46d6-9ce5-0ecd5eb384e3\u002Fスクリーンショット2023-01-30020344.png",title:G,width:d},author:{_id:m,_sys:{raw:{createdAt:b,updatedAt:c,firstPublishedAt:b,publishedAt:c},createdAt:b,updatedAt:c},name:e,slug:e,biography:n,image:o},tags:[{_id:"631454fed59cbbc5fa2b599f",_sys:{raw:{createdAt:i,updatedAt:i,firstPublishedAt:i,publishedAt:i},createdAt:i,updatedAt:i},name:"Windows",slug:"windows",image:"631454f0d59cbbc5fa2b5941"}]},{_id:"633f007e2c3aa4b59313ccd1",_sys:{raw:{createdAt:"2022-10-06T16:21:18.615Z",updatedAt:v,firstPublishedAt:H,publishedAt:v},createdAt:H,updatedAt:v},title:"FirebaseのCIデプロイが突然落ちるようになった",slug:"firebase-github-actions-error",description:"本サイトの環境はFirebaseにデプロイしており、GitHub Actionsで自動でデプロイするようにしていますが、突然エラーが発生して落ちるようになりました。",meta:{title:"FirebaseのCIデプロイが突然落散るようになった",description:a,ogImage:d},body:"\u003Ch2\u003Eエラー発生\u003C\u002Fh2\u003E\n\u003Cp\u003E本サイトの環境はFirebaseにデプロイしており、GitHub Actionsで自動でデプロイするようにしていますが、突然エラーが発生して落ちるようになりました。\u003C\u002Fp\u003E\n\u003Ch2\u003Eエラー内容\u003C\u002Fh2\u003E\n\u003Cp\u003Eエラー内容は以下です。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-log\"\u003EError: Failed to list functions for *******\n\nThe process '\u002Fusr\u002Flocal\u002Fbin\u002Fnpx' failed with exit code 1\nError: The process '\u002Fusr\u002Flocal\u002Fbin\u002Fnpx' failed with exit code 1\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eさすがにさっきのだけじゃあ何もわからないので少し探してみる。\u003C\u002Fp\u003E\n\u003Ch3\u003Eエラー1\u003C\u002Fh3\u003E\n\u003Cp\u003E調べると以下のエラーが発生していました。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-log\"\u003E[2022-10-06T16:20:32.871Z] [functions] HTTP Error: 403, Cloud Functions API has not been used in project 700***** before or it is disabled. Enable it by visiting \n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eエラーの少し前になんかそれっぽいことが書いてありますね。「Cloud Functions API」とやらが有効化されていないから有効化しろとのことです。\u003C\u002Fp\u003E\n\u003Cp\u003Eとりあえず、GCPにログインして、対象のプロジェクトで「Cloud Functions API」を有効化します。\u003C\u002Fp\u003E\n\u003Ch3\u003Eエラー2\u003C\u002Fh3\u003E\n\u003Cp\u003E先ほどのエラーはなくなりましたが、今度は以下のようなエラーが発生。（もともとあったかもしんない）\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-log\"\u003EError: HTTP Error: 403, Permission 'cloudfunctions.functions.list' denied on 'projects\u002F**********\u002Flocations\u002F-\u002Ffunctions'\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Efirebaseのバグっぽい？調べると以下のIssueにあたりました。\u003Cbr\u003E\n\u003Ca href=\"https:\u002F\u002Fgithub.com\u002FFirebaseExtended\u002Faction-hosting-deploy\u002Fissues\u002F203\"\u003Ehttps:\u002F\u002Fgithub.com\u002FFirebaseExtended\u002Faction-hosting-deploy\u002Fissues\u002F203\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E一番評価がありそうな解決策を試してみます。\u003Cbr\u003E\n\u003Ca href=\"https:\u002F\u002Fgithub.com\u002FFirebaseExtended\u002Faction-hosting-deploy\u002Fissues\u002F203#issuecomment-1127732956\"\u003Ehttps:\u002F\u002Fgithub.com\u002FFirebaseExtended\u002Faction-hosting-deploy\u002Fissues\u002F203#issuecomment-1127732956\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E方法は以下の通りです\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli\u003E「IAMと管理 &gt; IAM」に移動して\u003Ccode\u003Egithub-actions\u003C\u002Fcode\u003Eから始まるアカウントを探す\u003C\u002Fli\u003E\n\u003Cli\u003E鉛筆マークで「別のロールを追加」から、\u003Ccode\u003ECloud Functions 閲覧者\u003C\u002Fcode\u003Eを追加\u003C\u002Fli\u003E\n\u003Cli\u003E正しいプロジェクトにいるか念のために確認\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cp\u003E保存してGithubActionsを再実行したところ、うまく動作しました。\u003C\u002Fp\u003E\n\u003Ch2\u003E解決策・まとめ\u003C\u002Fh2\u003E\n\u003Cp\u003Eどうやら、GCP関連の権限不足だった模様です。\u003Cbr\u003E\nどうしていきなり発生したのかはわかりません。本日（2022\u002F10\u002F6）にfirebaseから規約変更などのメールはありましたがそれが原因とは思えません。（GithubのIssueは数か月前のもの）\u003Cbr\u003E\n利用からちょうど３か月経とうかというところなので、無料期間外だからでしょうか。\u003C\u002Fp\u003E\n\u003Cp\u003Eまぁ、よくわからんけど解決したからヨシ！\u003C\u002Fp\u003E\n\u003Cp\u003E2022\u002F10\u002F7 追記\u003Cbr\u003E\nIssueを追ってみたら、昨日あたりからこのエラーが発生したようです。\u003Cbr\u003E\n具体的な原因についてはわかりませんでした。\u003C\u002Fp\u003E\n\u003Cp\u003E今回の問題は、以下の二つの操作で解決できました。\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003ECloud Functions API\u003C\u002Fcode\u003Eの有効化\u003C\u002Fli\u003E\n\u003Cli\u003Eアカウントのロール追加\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n",image:{_id:I,altText:a,description:a,fileName:"firebase.svg",fileSize:2608,fileType:J,height:351,metadata:{},src:"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F819f9f03-7710-4edc-b936-2507fe7e3a9a\u002Ffirebase.svg",title:a,width:K},author:{_id:m,_sys:{raw:{createdAt:b,updatedAt:c,firstPublishedAt:b,publishedAt:c},createdAt:b,updatedAt:c},name:e,slug:e,biography:n,image:o},tags:[{_id:"633f0f082c3aa4b593186c2d",_sys:{raw:{createdAt:j,updatedAt:j,firstPublishedAt:j,publishedAt:j},createdAt:j,updatedAt:j},name:"Firebase",slug:"firebase",image:I},{_id:"633f0f262c3aa4b593186ec4",_sys:{raw:{createdAt:k,updatedAt:k,firstPublishedAt:k,publishedAt:k},createdAt:k,updatedAt:k},name:"Github Actions",slug:"github-actions",image:"633f0f1e2c3aa4b593186e62"}]},{_id:"632f56d68834f719d021b2d6",_sys:{raw:{createdAt:w,updatedAt:x,firstPublishedAt:w,publishedAt:x},createdAt:w,updatedAt:x},title:L,slug:"vue-3-vue-test-utils-chatjs",description:"はじめはVuexのストアが問題で発生していると思い込んで、ひたすらモック作成に取り組んでいたけど一向にエラー文が変わらない絶望 そんなこんなで、色々いじくりまわしてるとあることに気づいた",meta:{title:L,description:"というのも、mountedでは子コンポーネント全てをマウントしたことは保証しないらしく、すべてのコンポーネントがマウントされているとは限らないそうです。公式ドキュメントにも普通に書いてあったので参考に載っけときます。",ogImage:d},body:"\u003Cp\u003Eあまり気力がないのでかなり端折って書きます。\u003C\u002Fp\u003E\n\u003Ch2\u003E環境\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003Evue@3.2.19\u003C\u002Fli\u003E\n\u003Cli\u003Evuex@4.0.2\u003C\u002Fli\u003E\n\u003Cli\u003Echart.js@2.9.4\u003C\u002Fli\u003E\n\u003Cli\u003E@vue\u002Ftest-utils@2.0.0-rc.15\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003Eここで関係のなさそうな一般ライブラリが入っているってことは、つまりそういうことなんです。\u003C\u002Fp\u003E\n\u003Ch2\u003E問題の部分\u003C\u002Fh2\u003E\n\u003Cp\u003E本当ならもっと長いけど、問題となった部分はここだけ\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-html:src\u002Fcomponents\u002FChart.vue\"\u003E&lt;template&gt;\n  &lt;div class=&quot;chart&quot;&gt;\n    &lt;canvas id=&quot;myChart&quot;&gt;&lt;\u002Fcanvas&gt;\n  &lt;\u002Fdiv&gt;\n&lt;\u002Ftemplate&gt;\n\n&lt;script&gt;\nimport Chart from &quot;chart.js&quot;;\nimport &quot;chartjs-plugin-colorschemes&quot;;\n\nexport default {\n  ...略\n  methods: {\n    drawLineChart() {\n      const ctx = document.getElementById(&quot;myChart&quot;);\n\n      \u002F\u002F グラフの作成及び設定を指定する\n      window.populationChart = new Chart(ctx, {\n\t    ...略\n\t  });\n    },\n  },\n  mounted() {\n    \u002F\u002F グラフの作成\n    this.drawLineChart();\n  },\n};\n&lt;\u002Fscript&gt;\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fbr\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js:tests\u002Funit\u002FChart.spec.js\"\u003Eimport { shallowMount } from &quot;@vue\u002Ftest-utils&quot;;\nimport Chart from &quot;@\u002Fcomponents\u002FChart.vue&quot;;\n\n\ntest(&quot;Chart&quot;, () =&gt; {\n  const state = {\n\t...略\n  }\n\n  const $store = {\n\t...略\n  }\n\n  const wrapper = shallowMount(Chart, {\n    global: {\n      mocks: {\n        $store\n      }\n    }\n  })\n});\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2\u003E何が起きたのか・エラー内容\u003C\u002Fh2\u003E\n\u003Cp\u003Eなんと！こんな素敵なエラーが出てきました✨✨\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-log\"\u003EFAIL  tests\u002Funit\u002FPopulationChart.spec.js\n ● Console\n\nconsole.warn node_modules\u002F@vue\u002Fruntime-core\u002Fdist\u002Fruntime-core.cjs.js:6465\n  [Vue warn]: Unhandled error during execution of mounted hook \n\tat &lt;PopulationChart ref=&quot;VTU_COMPONENT&quot; &gt; \n\tat &lt;VTUROOT&gt;\n\n ● \n\n  TypeError: Cannot read property 'length' of null\n  \n  ...略\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eな...何を言っているのかわからねーと思うが、おれも何をされたのかわからなかった...\u003C\u002Fp\u003E\n\u003Cp\u003Eどこのことを言っているの分からなかったし、時間をかけて調べても何にも出てこない、マジで\u003C\u002Fp\u003E\n\u003Cp\u003EはじめはVuexのストアが問題で発生していると思い込んで、ひたすらモック作成に取り組んでいたけど一向にエラー文が変わらない絶望...\u003C\u002Fp\u003E\n\u003Cp\u003Eそんなこんなで、色々いじくりまわしてるとあることに気づいた\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-log\"\u003ETypeError: Cannot read property 'length' of null\n\n  at Object.acquireContext (node_modules\u002Fchart.js\u002Fdist\u002FChart.js:7756:19)\n  at Chart.construct (node_modules\u002Fchart.js\u002Fdist\u002FChart.js:9324:26)\n  at new Chart (node_modules\u002Fchart.js\u002Fdist\u002FChart.js:9311:7)\n  at Proxy.drawLineChart (src\u002Fcomponents\u002FPopulationChart.vue:760:32)\n  at Proxy.mounted (src\u002Fcomponents\u002FPopulationChart.vue:816:10)\n  ...略\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eさっきは略していましたが、よく見ると\u003Ccode\u003EChart\u003C\u002Fcode\u003Eやら\u003Ccode\u003EContext\u003C\u002Fcode\u003Eやら書いてある...\u003C\u002Fp\u003E\n\u003Cp\u003Eもしかしてもしかするとこの\u003Ccode\u003EChart.js\u003C\u002Fcode\u003Eが問題のパターン？と思い、たくさん調べてみましたよ。\u003C\u002Fp\u003E\n\u003Cp\u003Eライブラリの問題部分を読んでみると、どうやらコンストラクタの引数のcanvasエレメントが問題だった。さらに調べた結果、canvasが表示されきってないとかどうとかで読み込めなかったらしい。／(^o^)＼ﾅﾝﾃｺｯﾀｲ\u003C\u002Fp\u003E\n\u003Ch2\u003E問題の解決方法\u003C\u002Fh2\u003E\n\u003Cp\u003Eということで、数時間かけて問題に対処した結果、コードの修正部分は以下の通りです‼‼‼‼\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003Esrc\u002Fcomponents\u002FChart.vue\u003C\u002Fcode\u003Eの\u003Ccode\u003Emounted\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js:src\u002Fcomponents\u002FChart.vue\"\u003E  mounted() {\n    \u002F\u002F this.$nextTickで囲むだけ‼‼‼‼‼‼ 簡単だね‼\n    this.$nextTick(function () {\n      \u002F\u002F グラフの作成\n      this.drawLineChart();\n    });\n  },\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eそう、ここだけ‼\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003Ecanvas\u003C\u002Fcode\u003Eがマウントされきっていないため、\u003Ccode\u003E$nextTick\u003C\u002Fcode\u003Eを使ってすべてのコンポーネントがマウントされるのを待ったらいけました。\u003C\u002Fp\u003E\n\u003Cp\u003Eというのも、\u003Ccode\u003Emounted\u003C\u002Fcode\u003Eでは子コンポーネント全てをマウントしたことは保証しないらしく、すべてのコンポーネントがマウントされているとは限らないそうです。公式ドキュメントにも普通に書いてあったので参考に載っけときます。\u003C\u002Fp\u003E\n\u003Ch2\u003Eおわりに\u003C\u002Fh2\u003E\n\u003Cp\u003E数時間悩んだ結果2行追加で解決でつらいよ、俺の努力はいったい...\u003C\u002Fp\u003E\n\u003Cp\u003E／(^o^)＼ﾅﾝﾃｺｯﾀｲ\u003C\u002Fp\u003E\n\u003Cp\u003E深夜テンションで書きましたのでもう寝ます( ˘ω˘)ｽﾔｧ\u003C\u002Fp\u003E\n\u003Cp\u003E誤字脱字はゆるしてください\u003C\u002Fp\u003E\n\u003Ch2\u003E参考\u003C\u002Fh2\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fqiita.com\u002Fchan_kaku\u002Fitems\u002F7f3233053b0e209ef355#mounted\"\u003EVueのライフサイクルを完全に理解した - Qiita\u003C\u002Fa\u003E\u003Cbr\u003E\n\u003Ca href=\"https:\u002F\u002Fjp.vuejs.org\u002Fv2\u002Fapi\u002Findex.html#mounted\"\u003EAPI — Vue.js\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n",image:{_id:M,altText:a,description:a,fileName:"vue.svg",fileSize:569,fileType:J,height:221,metadata:{},src:"https:\u002F\u002Fstorage.googleapis.com\u002Fp_6302578c3183a77882ff85f3\u002F4cc2a9dc-036c-4164-9c6e-ad2de68644c0%2Fvue.svg",title:a,width:K},author:{_id:m,_sys:{raw:{createdAt:b,updatedAt:c,firstPublishedAt:b,publishedAt:c},createdAt:b,updatedAt:c},name:e,slug:e,biography:n,image:o},tags:[{_id:"63161d44d59cbbc5fa89a71c",_sys:{raw:{createdAt:l,updatedAt:l,firstPublishedAt:l,publishedAt:l},createdAt:l,updatedAt:l},name:"Vue.js",slug:"vuejs",image:M}]}],pageMeta:{rows:1,perPage:10,currentPage:y}}],fetch:{},mutations:void 0}}("","2021-12-01T08:43:09.433Z","2023-02-04T07:00:38.318Z",null,"masa","2023-02-04T06:45:01.047Z","2023-03-31T18:12:20.908Z","2023-03-31T18:13:11.030Z","2022-09-04T07:34:22.644Z","2022-10-06T17:23:20.446Z","2022-10-06T17:23:50.965Z","2022-09-05T16:01:08.024Z","61a7359d8131ac001847fbb4","\u003Cp\u003EWebエンジニアです。\u003C\u002Fp\u003E\u003Cp\u003Eよろしくお願いします。\u003C\u002Fp\u003E","63de027516bdb9179566c9ba","Windowsのbash環境を整備していく","2023-04-02T08:56:47.853Z","image\u002Fpng","2022-12-04T07:09:00.714Z","2022-12-04T07:16:39.540Z","2023-02-05T04:42:43.149Z","2022-10-07T07:46:38.074Z","2022-09-24T19:13:26.484Z","2023-04-02T01:53:43.479Z","1","2023-03-31T18:25:05.756Z",".NET MVCをSupabase + Cloud Runで動かしてみる","6427216da184ff3f874cba16","スクリーンショット2023-04-01001455.png",19465,"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F8e50b2a3-edd8-4f72-9ae7-781009eaaa31\u002Fスクリーンショット2023-04-01001455.png","2023-01-29T17:50:08.797Z","peco bash windows","2022-10-06T17:08:31.771Z","633f00f52c3aa4b593141c01","image\u002Fsvg+xml",256,"Vue3のVue Test Utils で地獄をみた（Chart.js部門）","63161d23d59cbbc5fa89a677")));