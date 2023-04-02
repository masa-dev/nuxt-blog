__NUXT_JSONP__("/tag/cloud-run", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S){return {data:[{tag:{_id:p,_sys:{raw:{createdAt:b,updatedAt:c,firstPublishedAt:b,publishedAt:c},customOrder:q,createdAt:b,updatedAt:c},name:r,slug:s,image:{_id:t,altText:a,description:a,fileName:u,fileSize:v,fileType:e,height:w,metadata:{},src:x,title:a,width:d}},posts:[{_id:"6425b90086e7de37b82ff1a6",_sys:{raw:{createdAt:"2023-03-30T16:29:52.297Z",updatedAt:y,firstPublishedAt:z,publishedAt:y},customOrder:6,createdAt:z,updatedAt:y},title:A,slug:"dotnet-supabase-cloudrun",description:"少し前に話題になっていた Supabase を最近になって知りました。 SupabaseはFirebaseの代替手段と謳っており、Postgresのデータベースや認証、ストレージなどの機能を提供",meta:{title:A,description:"少し前に話題になっていた Supabase を最近になって知りました。 SupabaseはFirebaseの代替手段と謳っており、Postgresのデータベースや認証などの Postgresのデータベ",ogImage:{_id:B,altText:a,description:a,fileName:C,fileSize:D,fileType:E,height:m,metadata:{},src:F,title:a,width:m}},body:"\u003Ch2\u003Eはじめに\u003C\u002Fh2\u003E\n\u003Cp\u003E少し前に話題になっていた Supabase を最近になって知りました。\u003Cbr\u003E\nSupabaseはFirebaseの代替手段と謳っており、Postgresのデータベースや認証、ストレージなどの機能を提供するプラットフォームのことです。\u003C\u002Fp\u003E\n\u003Cp\u003E個人的にPosrgresデータベースを無料枠で使用することができる点が素晴らしいと思っています。\u003Cbr\u003E\nFirebaseのNoSQLもいいですが、EntityFrameworkとの相性は悪くて開発体験がよくないですから、あまり使いたくはなありません。また、Cloud SQLや RDSのようなフルマネージドデータベースを使用するという選択肢もありますが、いかんせんコストが高いので、個人開発には向きません。\u003C\u002Fp\u003E\n\u003Cp\u003EそんなこんなでCloudRun + Supabaseを使用すれば、実質無料で.NETの環境を作ることができるのではないかと思って、試してみました。\u003C\u002Fp\u003E\n\u003Ch2\u003Eインフラ\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003ECloud Run\u003C\u002Fli\u003E\n\u003Cli\u003ESupabase (Postgres)\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003E環境\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003EDocker\u003C\u002Fli\u003E\n\u003Cli\u003E.NET MVC Identity\u003C\u002Fli\u003E\n\u003Cli\u003EPostgres\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003ESupabaseでプロジェクト作成\u003C\u002Fh2\u003E\n\u003Cp\u003Eログインは割愛します。\u003C\u002Fp\u003E\n\u003Cp\u003Eまず、プロジェクトを作成します。（データベースパスワードは控えておく）\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002Fe842523a-063b-4fb9-abaa-7e9940b1b4a8\u002F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%882023-03-31002638.png\" alt=\"スクリーンショット2023-03-31002638.png\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eプロジェクトを作成してプロジェクト詳細に入ったら、左メニューの設定（Project Settings）&gt;Databaseに移動します。\u003C\u002Fp\u003E\n\u003Cp\u003EConnection stringの.NETタブを選択すると.NETアプリ用の接続設定を取得できます。\u003Cbr\u003E\nこの時点でSQLクライアントソフトから接続確認ができました。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002Fcdd387f3-fc4d-4580-9067-56e57c16fb6a\u002F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%882023-03-31010948.png\" alt=\"スクリーンショット2023-03-31010948.png\"\u003E\u003C\u002Fp\u003E\n\u003Ch2\u003E.NET Core Identity環境の作成\u003C\u002Fh2\u003E\n\u003Cp\u003E.NETの環境を作成します。\u003Cbr\u003E\n開発環境はVSCodeでDev Container拡張機能を使用します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-dockerfile:Dockerfile\"\u003EFROM mcr.microsoft.com\u002Fdotnet\u002Fsdk:7.0 AS runtime\n\nWORKDIR \u002Fapp\n\nCOPY .\u002Fsrc .\n\nRUN apt-get update &amp;&amp; apt-get install -y \\\n    git \\\n    vim\n\nRUN dotnet tool install --global dotnet-ef --version 7.0\nRUN dotnet tool install --global dotnet-aspnet-codegenerator --version 7.0\n\nENV PATH $PATH:\u002Froot\u002F.dotnet\u002Ftools\nENV TZ Asia\u002FTokyo\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-yml:docker-compose.yml\"\u003Eversion: '3.7'\n\nservices:\n  supabase_web:\n    container_name: &quot;supabase_web&quot;\n    build:\n      context: .\u002F\n      dockerfile: Dockerfile\n    ports:\n      - &quot;50001:8080&quot;\n    working_dir: \u002Fapp\u002F\n    tty: true\n    volumes:\n      - .\u002Fsrc\u002F:\u002Fapp\u002F\n\n  supabase_db:\n    container_name: &quot;supabase_db&quot;\n    image: postgres:13-bullseye\n    ports:\n      - 55432:5432\n    volumes:\n      - .dbstore:\u002Fvar\u002Flib\u002Fpostgresql\u002Fdata\n    environment:\n      - POSTGRES_USER=postgres\n      - POSTGRES_DB=postgres\n      - POSTGRES_PASSWORD=A9AbbsJiNXUA\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eコマンドパレットを開き、\u003Ccode\u003E&gt;Dev Containers: Open Folder in Container...\u003C\u002Fcode\u003Eを実行してコンテナを起動します。\u003C\u002Fp\u003E\n\u003Cp\u003E次に、下記コマンドで.NET MVCテンプレートを作成します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Ecd \u002Fapp\ndotnet new webapp --auth Individual -uld -o src -n SupabaseTest\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E作成したら、下記コマンドでPostgresのNugetパッケージをインストールします。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Edotnet add package Npgsql.EntityFrameworkCore.PostgreSQL\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003EPostgreSQLに接続できるように\u003Ccode\u003EProgram.cs\u003C\u002Fcode\u003Eファイルを編集します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-cs:Program.cs\"\u003Eusing Microsoft.AspNetCore.Identity;\nusing Microsoft.EntityFrameworkCore;\nusing SupabaseTest.Data;\n\nvar builder = WebApplication.CreateBuilder(args);\n\nbuilder.WebHost.UseUrls(&quot;http:\u002F\u002F0.0.0.0:8080&quot;);\n\n\u002F\u002F Add services to the container.\nvar connectionString = builder.Configuration.GetConnectionString(&quot;DefaultConnection&quot;) ?? throw new InvalidOperationException(&quot;Connection string 'DefaultConnection' not found.&quot;);\nbuilder.Services.AddDbContext&lt;ApplicationDbContext&gt;(options =&gt;\n    options.UseNpgsql(connectionString));\n\n\u002F\u002F 略 \u002F\u002F\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eまた、\u003Ccode\u003EappSettings.Develop.json\u003C\u002Fcode\u003Eを以下のように変更します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-json:appSettings.Develop.json\"\u003E{\n  &quot;DetailedErrors&quot;: true,\n  &quot;ConnectionStrings&quot;: {\n    &quot;DefaultConnection&quot;: &quot;Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=A9AbbsJiNXUA&quot;\n  },\n  &quot;Logging&quot;: {\n    &quot;LogLevel&quot;: {\n      &quot;Default&quot;: &quot;Information&quot;,\n      &quot;Microsoft.AspNetCore&quot;: &quot;Warning&quot;\n    }\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E次にマイグレーション関連を整理します。\u003C\u002Fp\u003E\n\u003Cp\u003E今のままではマイグレーションがSQL Server用のものとなっており、updateを行ってもエラーが発生します。そのため、下記コマンドで初期マイグレーションを再発行します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Ecd \u002Fapp\nrm test\u002F*.cs\n# マイグレーションの発行\ndotnet ef migrations add InitialCreate --context ApplicationDbContext --output-dir Data\u002FMigrations\n\n# マイグレーションをデータベースに反映\ndotnet ef database update --context ApplicationDbContext\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E次にデバッグできるようにVSCodeの左メニューから、「実行とデバッグ」を開き、「launch.jsonファイルを作成」し、.NET 5+ .NET MVCを選択して\u003Ccode\u003Elaunch.json\u003C\u002Fcode\u003Eを自動生成します。\u003Cbr\u003E\nまた、VSCodeの拡張機能で「C# \u003Ccode\u003Ems-dotnettools.csharp\u003C\u002Fcode\u003E」をインストールしておきます。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003Elaunch.json\u003C\u002Fcode\u003Eファイルが自動生成できたら、\u003Ccode\u003EF5\u003C\u002Fcode\u003Eキーを押してデバッグを開始します。\u003C\u002Fp\u003E\n\u003Cp\u003Eデバッグが実行出来たら、\u003Ca href=\"http:\u002F\u002Flocalhost:50001\u002F\"\u003Ehttp:\u002F\u002Flocalhost:50001\u002F\u003C\u002Fa\u003E でアクセスできます。\u003C\u002Fp\u003E\n\u003Cp\u003Eデータベースに接続できているか確認するために適当にユーザーを登録して、「Click here to confirm your account」をクリックします。その後、ログインができていたらDBは接続できています。\u003C\u002Fp\u003E\n\u003Cp\u003Eこれでローカルで開発できる環境ができました。\u003C\u002Fp\u003E\n\u003Ch2\u003E本番環境にマイグレーション\u003C\u002Fh2\u003E\n\u003Cp\u003ECloudRunにデプロイした際にSupabaseのPostgreに接続できるようにする必要があります。\u003C\u002Fp\u003E\n\u003Cp\u003Eまず、Postgresの接続情報を記載した\u003Ccode\u003Eappsettings.Production.json\u003C\u002Fcode\u003Eを作成します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-json:appsettings.Production.json\"\u003E{\n  &quot;DetailedErrors&quot;: false,\n  &quot;ConnectionStrings&quot;: {\n    &quot;DefaultConnection&quot;: &quot;User Id=postgres;Password=XXXXXXXX;Server=db.xxxxxxxxxxxxxxxxxx.supabase.co;Port=5432;Database=postgre&quot;\n  },\n  &quot;Logging&quot;: {\n    &quot;LogLevel&quot;: {\n      &quot;Default&quot;: &quot;Information&quot;,\n      &quot;Microsoft.AspNetCore&quot;: &quot;Warning&quot;\n    }\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E次に下記のコマンドでsupabaseのデータベースを更新します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Ecd \u002Fapp\nexport ASPNETCORE_ENVIRONMENT=&quot;Production&quot;\ndotnet ef database update\nexport ASPNETCORE_ENVIRONMENT=&quot;Development&quot;\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2\u003ECloud Runにデプロイ\u003C\u002Fh2\u003E\n\u003Cp\u003Eまず、Cloud Runとは、サーバーレスのプラットフォームで、コンテナベースのWebアプリケーションを実行させることができます。\u003C\u002Fp\u003E\n\u003Cp\u003E要はDockerなどのコンテナからアプリケーションを実行するため、任意の言語の環境を使用することができます。また、Dockerベースの開発をする場合、ローカルの環境とCloud Runの環境を同じ環境にすることができるメリットがあります。\u003C\u002Fp\u003E\n\u003Cp\u003E先ほど作成した.NETアプリケーションをCloud Runにデプロイします。\u003C\u002Fp\u003E\n\u003Ch3\u003EGCPのロール変更\u003C\u002Fh3\u003E\n\u003Cp\u003EGCPのサービスアカウントからCloudRunにデプロイするため、権限を付与する必要があります。\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli\u003ECloud Buildに移動して、左メニューの「設定」に移動\u003C\u002Fli\u003E\n\u003Cli\u003E「Cloud Run」のステータスを有効に変更\u003C\u002Fli\u003E\n\u003Cli\u003Eモーダルの「すべてのサービス アカウントにアクセス権を付与」\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Ch3\u003ECloud buildでイメージをビルドする\u003C\u002Fh3\u003E\n\u003Cp\u003Egcloud sdkがローカルにインストールされている前提で話します。\u003C\u002Fp\u003E\n\u003Cp\u003ECloud Runでデプロイするためにはデプロイするコンテナのイメージが必要なので、Cloud Buildを使用してCloud Registryにイメージを保存します。\u003C\u002Fp\u003E\n\u003Cp\u003Eまず、デプロイ用のDocker設定ファイルである\u003Ccode\u003ECloudRun.Dockerfile\u003C\u002Fcode\u003Eを作成します。\u003Cbr\u003E\u003Cbr\u003E\n注意点としては、CloudRunにデプロイする場合は \u003Cstrong\u003E必ず8080ポートを公開する\u003C\u002Fstrong\u003Eことです。そうしないとデプロイ時にエラーが発生します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-dockerfile:CloudRun.Dockerfile\"\u003EFROM mcr.microsoft.com\u002Fdotnet\u002Fsdk:7.0 AS build\n\nWORKDIR \u002Fapp\nCOPY .\u002Fsrc .\n\nRUN dotnet publish -c Release -o dist\n\nFROM mcr.microsoft.com\u002Fdotnet\u002Faspnet:7.0 AS runtime\n\nWORKDIR \u002Fapp\nCOPY --from=build \u002Fapp\u002Fdist .\n\nENV TZ Asia\u002FTokyo\nENV ASPNETCORE_ENVIRONMENT Production\n\nENV PORT=8080\nEXPOSE 8080\n\nENTRYPOINT [&quot;dotnet&quot;, &quot;SupabaseTest.dll&quot;]\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E次にビルド設定の\u003Ccode\u003Ecloudbuild.yml\u003C\u002Fcode\u003Eを作成します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-yml:cloudbuild.yml\"\u003Esteps:\n# Build the container image\n- name: 'gcr.io\u002Fcloud-builders\u002Fdocker'\n  args: ['build', '-t', 'gcr.io\u002FPROJECT_ID\u002FIMAGE', '-f', 'CloudRun.Dockerfile', '.']\n# Push the container image to Container Registry\n- name: 'gcr.io\u002Fcloud-builders\u002Fdocker'\n  args: ['push', 'gcr.io\u002FPROJECT_ID\u002FIMAGE']\n# Deploy container image to Cloud Run\n- name: 'gcr.io\u002Fgoogle.com\u002Fcloudsdktool\u002Fcloud-sdk'\n  entrypoint: gcloud\n  args: ['run', 'deploy', 'SERVICE_NAME', '--image', 'gcr.io\u002FPROJECT_ID\u002FIMAGE', '--region', 'REGION', '--allow-unauthenticated']\nimages:\n- gcr.io\u002FPROJECT_ID\u002FIMAGE\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E\u003Ccode\u003Ecloudbuild.yml\u003C\u002Fcode\u003Eの各項目を変換しておいてください。\u003C\u002Fp\u003E\n\u003Ctable\u003E\n\u003Cthead\u003E\n\u003Ctr\u003E\n\u003Cth\u003E変換前\u003C\u002Fth\u003E\n\u003Cth\u003E内容\u003C\u002Fth\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Fthead\u003E\n\u003Ctbody\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ccode\u003EPROJECT_ID\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003EプロジェクトのID\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ccode\u003EIMAGE\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003EContaier Registoryに保存する名前\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ccode\u003ESERVICE_NAME\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003Eデプロイサービスの名前\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ccode\u003EREGION\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003Eデプロイ先のリージョン\u003Cbr\u003E東京なら\u003Ccode\u003Easia-northeast1\u003C\u002Fcode\u003E\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Ftbody\u003E\n\u003C\u002Ftable\u003E\n\u003Ch3\u003Eデプロイする\u003C\u002Fh3\u003E\n\u003Cp\u003Eローカル環境で\u003Ccode\u003ECloudRun.Dockerfile\u003C\u002Fcode\u003Eのあるフォルダで以下のコマンドを実行します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Egcloud builds submit .\u002F --config cloudbuild.yml\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E特にエラーがなければデプロイの成功です。\u003C\u002Fp\u003E\n\u003Cp\u003E認証の機能が使用できていたので、データベースにも接続できていますね！\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F8e50b2a3-edd8-4f72-9ae7-781009eaaa31\u002F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%882023-04-01001455.png\" alt=\"スクリーンショット2023-04-01001455.png\"\u003E\u003C\u002Fp\u003E\n\u003Ch2\u003Eおわりに\u003C\u002Fh2\u003E\n\u003Cp\u003E実際にCloud RunとSupabaseを使用することで.NETの環境を限りなく安くなるように作成できました。ただ、今回作成した.NETアプリは、Cloud Runの特性上、十数分程度でログインセッションが切れてしまうため、セッションをインメモリからデータベースに保存するなどの対応が必要になりそうです。\u003Cbr\u003E\u003Cbr\u003E\nSupabaseのプロジェクトは無料枠で2つのみなので、数を作成できませんが、個人開発にはもっていこいのサービスだと思います。\u003C\u002Fp\u003E\n\u003Cp\u003ECloud Runなので.NET Coreの環境にとどまらず、頑張ればWordpressの環境も作成できるんじゃないかと思います。ほぼ無料でWordpress環境は夢があっていいですね。\u003C\u002Fp\u003E\n\u003Cp\u003Eさいごに、サクッと記事が書けるだろうと思って書き始めましたが、思ったより基本的な説明に時間をとってしまう形になってしまいました。記事を作成するのは難しいですね...\u003C\u002Fp\u003E\n",image:{_id:B,altText:a,description:a,fileName:C,fileSize:D,fileType:E,height:m,metadata:{},src:F,title:a,width:m},author:{_id:G,_sys:{raw:{createdAt:f,updatedAt:g,firstPublishedAt:f,publishedAt:g},createdAt:f,updatedAt:g},name:n,slug:n,biography:H,image:{_id:I,altText:a,description:a,fileName:J,fileSize:K,fileType:L,height:o,metadata:{},src:M,title:a,width:o}},tags:[{_id:"63ddfeed16bdb9179565e88f",_sys:{raw:{createdAt:h,updatedAt:h,firstPublishedAt:h,publishedAt:h},customOrder:16,createdAt:h,updatedAt:h},name:"Docker",slug:"docker",image:{_id:"63ddfecf16bdb9179565e59a",altText:a,description:a,fileName:"docker-icon.svg",fileSize:900,fileType:e,height:185,metadata:{},src:"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002Fa75363a1-6db1-46cf-a934-b73be93db963\u002Fdocker-icon.svg",title:a,width:d}},{_id:"64272284a184ff3f874d6b48",_sys:{raw:{createdAt:i,updatedAt:i,firstPublishedAt:i,publishedAt:i},customOrder:19,createdAt:i,updatedAt:i},name:"Supabase",slug:"supabase",image:{_id:"64272268a184ff3f874d6804",altText:a,description:a,fileName:"supabase-icon.svg",fileSize:1082,fileType:e,height:263,metadata:{},src:"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002Fcd304215-b72e-4e42-b81d-db72e3b81ad5\u002Fsupabase-icon.svg",title:a,width:d}},{_id:p,_sys:{raw:{createdAt:b,updatedAt:c,firstPublishedAt:b,publishedAt:c},customOrder:q,createdAt:b,updatedAt:c},name:r,slug:s,image:{_id:t,altText:a,description:a,fileName:u,fileSize:v,fileType:e,height:w,metadata:{},src:x,title:a,width:d}},{_id:"642722b7a184ff3f874d85a7",_sys:{raw:{createdAt:j,updatedAt:j,firstPublishedAt:j,publishedAt:j},customOrder:20,createdAt:j,updatedAt:j},name:".NET",slug:"dotnet",image:{_id:"64272294a184ff3f874d7305",altText:a,description:a,fileName:"dotnet.svg",fileSize:1040,fileType:e,height:d,metadata:{},src:"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002Fd463d130-4d29-499d-b850-ed02c724a768\u002Fdotnet.svg",title:a,width:d}}]}],notes:[{_id:"638c4746ca4a512e0c08f9eb",_sys:{raw:{createdAt:"2022-12-04T07:07:50.740Z",updatedAt:l,firstPublishedAt:l,publishedAt:l},customOrder:4,createdAt:l,updatedAt:l},title:N,slug:"send-error-by-laravel-smtp-occur-in-cloud-run",meta:{title:N,description:"GCPのCloudRun上でLaravelのSMTPのメール送信メソッドで送信した時にエラーが発生  ローカルの環境ではエラーは発生しない。",ogimage:{_id:O,altText:a,description:a,fileName:P,fileSize:Q,fileType:e,height:R,metadata:{},src:S,title:a,width:d}},body:"\u003Ch2\u003Eエラー内容\u003C\u002Fh2\u003E\n\u003Cp\u003EGCPのCloudRun上でLaravelのSMTPのメール送信メソッドで送信した時にエラーが発生\u003C\u002Fp\u003E\n\u003Cp\u003Eローカルの環境ではエラーは発生しない。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-log\"\u003Elocal.ERROR: Expected response code &quot;250&quot; but got code &quot;550&quot;, with message &quot;550 5.7.1 &lt;保有しているメールアドレス&gt;... Command rejected&quot;. \n\n....&quot;exception&quot;:&quot;[object] (Symfony\\\\Component\\\\Mailer\\\\Exception\\\\TransportException(code: 550): Expected response code \\&quot;250\\&quot; but got code \\&quot;550\\&quot;, with message \\&quot;550 5.7.1 &lt;&gt;... Command rejected\\&quot;. at \u002Fvar\u002Fwww\u002F*****\u002Fvendor\u002Fsymfony\u002Fmailer\u002FTransport\u002FSmtp\u002FSmtpTransport.php:308)...\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2\u003E原因\u003C\u002Fh2\u003E\n\u003Cp\u003Eサクラのレンタルサーバーの設定で、メールの国外IPアドレスフィルタを設定していたため、弾かれていた\u003C\u002Fp\u003E\n\u003Ch2\u003E解決策\u003C\u002Fh2\u003E\n\u003Cp\u003Eアクセス制限設定を解除（無効化）する。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F5793c916-b9cd-4046-9f71-8aaaa3eb45e3\u002F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%880004-10-1215.17.19.png\" alt=\"スクリーンショット0004-10-1215.17.19.png\"\u003E\u003C\u002Fp\u003E\n",author:{_id:G,_sys:{raw:{createdAt:f,updatedAt:g,firstPublishedAt:f,publishedAt:g},createdAt:f,updatedAt:g},name:n,slug:n,biography:H,image:{_id:I,altText:a,description:a,fileName:J,fileSize:K,fileType:L,height:o,metadata:{},src:M,title:a,width:o}},tags:[{_id:p,_sys:{raw:{createdAt:b,updatedAt:c,firstPublishedAt:b,publishedAt:c},customOrder:q,createdAt:b,updatedAt:c},name:r,slug:s,image:{_id:t,altText:a,description:a,fileName:u,fileSize:v,fileType:e,height:w,metadata:{},src:x,title:a,width:d}},{_id:"638c46cfca4a512e0c08f226",_sys:{raw:{createdAt:k,updatedAt:k,firstPublishedAt:k,publishedAt:k},customOrder:14,createdAt:k,updatedAt:k},name:"Laravel",slug:"laravel",image:{_id:O,altText:a,description:a,fileName:P,fileSize:Q,fileType:e,height:R,metadata:{},src:S,title:a,width:d}}]}]}],fetch:{},mutations:void 0}}("","2022-12-04T07:09:00.714Z","2022-12-04T07:16:39.540Z",256,"image\u002Fsvg+xml","2021-12-01T08:43:09.433Z","2023-02-04T07:00:38.318Z","2023-02-04T06:45:01.047Z","2023-03-31T18:12:20.908Z","2023-03-31T18:13:11.030Z","2022-12-04T07:05:51.813Z","2022-12-04T07:10:50.062Z",null,"masa",2689,"638c478cca4a512e0c0901bb",15,"Cloud Run","cloud-run","638c4773ca4a512e0c0900d2","google-cloud-run.svg",940,231,"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002Fad07d909-e9d9-4a71-bb94-e350f14c72c2\u002Fgoogle-cloud-run.svg","2023-04-02T02:05:21.779Z","2023-03-31T18:25:05.756Z",".NET MVCをSupabase + Cloud Runで動かしてみる","6427216da184ff3f874cba16","スクリーンショット2023-04-01001455.png",19465,"image\u002Fpng","https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F8e50b2a3-edd8-4f72-9ae7-781009eaaa31\u002Fスクリーンショット2023-04-01001455.png","61a7359d8131ac001847fbb4","\u003Cp\u003EWebエンジニアです。\u003C\u002Fp\u003E\u003Cp\u003Eよろしくお願いします。\u003C\u002Fp\u003E","63de027516bdb9179566c9ba","IMG_20191028_124950_2.jpg",611177,"image\u002Fjpeg","https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F7e195ec3-1779-4c5f-9f0e-1d0bcf7d6c34\u002FIMG_20191028_124950_2.jpg","Cliud Run上で、LaravelのSMTP のメール送信エラーが発生してしまう","638c46b3ca4a512e0c08f13c","laravel.svg",2229,264,"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002Fd456b660-e277-4141-89f2-322016184008\u002Flaravel.svg")));