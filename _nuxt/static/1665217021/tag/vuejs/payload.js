__NUXT_JSONP__("/tag/vuejs", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){return {data:[{tag:{_id:m,_sys:{raw:{createdAt:a,updatedAt:a,firstPublishedAt:a,publishedAt:a},createdAt:a,updatedAt:a},name:n,slug:o,image:{_id:c,altText:b,description:b,fileName:d,fileSize:e,fileType:f,height:g,metadata:{},src:h,title:b,width:i}},posts:[{_id:"632f56d68834f719d021b2d6",_sys:{raw:{createdAt:j,updatedAt:k,firstPublishedAt:j,publishedAt:k},createdAt:j,updatedAt:k},title:p,slug:"vue-3-vue-test-utils-chatjs",description:"はじめはVuexのストアが問題で発生していると思い込んで、ひたすらモック作成に取り組んでいたけど一向にエラー文が変わらない絶望 そんなこんなで、色々いじくりまわしてるとあることに気づいた",meta:{title:p,description:"というのも、mountedでは子コンポーネント全てをマウントしたことは保証しないらしく、すべてのコンポーネントがマウントされているとは限らないそうです。公式ドキュメントにも普通に書いてあったので参考に載っけときます。",ogImage:q},body:"\u003Cp\u003Eあまり気力がないのでかなり端折って書きます。\u003C\u002Fp\u003E\n\u003Ch2\u003E環境\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003Evue@3.2.19\u003C\u002Fli\u003E\n\u003Cli\u003Evuex@4.0.2\u003C\u002Fli\u003E\n\u003Cli\u003Echart.js@2.9.4\u003C\u002Fli\u003E\n\u003Cli\u003E@vue\u002Ftest-utils@2.0.0-rc.15\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003Eここで関係のなさそうな一般ライブラリが入っているってことは、つまりそういうことなんです。\u003C\u002Fp\u003E\n\u003Ch2\u003E問題の部分\u003C\u002Fh2\u003E\n\u003Cp\u003E本当ならもっと長いけど、問題となった部分はここだけ\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003Esrc\u002Fcomponents\u002FChart.vue\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-html\"\u003E&lt;template&gt;\n  &lt;div class=&quot;chart&quot;&gt;\n    &lt;canvas id=&quot;myChart&quot;&gt;&lt;\u002Fcanvas&gt;\n  &lt;\u002Fdiv&gt;\n&lt;\u002Ftemplate&gt;\n\n&lt;script&gt;\nimport Chart from &quot;chart.js&quot;;\nimport &quot;chartjs-plugin-colorschemes&quot;;\n\nexport default {\n  ...略\n  methods: {\n    drawLineChart() {\n      const ctx = document.getElementById(&quot;myChart&quot;);\n\n      \u002F\u002F グラフの作成及び設定を指定する\n      window.populationChart = new Chart(ctx, {\n\t    ...略\n\t  });\n    },\n  },\n  mounted() {\n    \u002F\u002F グラフの作成\n    this.drawLineChart();\n  },\n};\n&lt;\u002Fscript&gt;\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fbr\u003E\n\u003Cp\u003E\u003Ccode\u003Etests\u002Funit\u002FChart.spec.js\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003Eimport { shallowMount } from &quot;@vue\u002Ftest-utils&quot;;\nimport Chart from &quot;@\u002Fcomponents\u002FChart.vue&quot;;\n\n\ntest(&quot;Chart&quot;, () =&gt; {\n  const state = {\n\t...略\n  }\n\n  const $store = {\n\t...略\n  }\n\n  const wrapper = shallowMount(Chart, {\n    global: {\n      mocks: {\n        $store\n      }\n    }\n  })\n});\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2\u003E何が起きたのか・エラー内容\u003C\u002Fh2\u003E\n\u003Cp\u003Eなんと！こんな素敵なエラーが出てきました✨✨\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-log\"\u003EFAIL  tests\u002Funit\u002FPopulationChart.spec.js\n ● Console\n\nconsole.warn node_modules\u002F@vue\u002Fruntime-core\u002Fdist\u002Fruntime-core.cjs.js:6465\n  [Vue warn]: Unhandled error during execution of mounted hook \n\tat &lt;PopulationChart ref=&quot;VTU_COMPONENT&quot; &gt; \n\tat &lt;VTUROOT&gt;\n\n ● \n\n  TypeError: Cannot read property 'length' of null\n  \n  ...略\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eな...何を言っているのかわからねーと思うが、おれも何をされたのかわからなかった...\u003C\u002Fp\u003E\n\u003Cp\u003Eどこのことを言っているの分からなかったし、時間をかけて調べても何にも出てこない、マジで\u003C\u002Fp\u003E\n\u003Cp\u003EはじめはVuexのストアが問題で発生していると思い込んで、ひたすらモック作成に取り組んでいたけど一向にエラー文が変わらない絶望...\u003C\u002Fp\u003E\n\u003Cp\u003Eそんなこんなで、色々いじくりまわしてるとあることに気づいた\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-log\"\u003ETypeError: Cannot read property 'length' of null\n\n  at Object.acquireContext (node_modules\u002Fchart.js\u002Fdist\u002FChart.js:7756:19)\n  at Chart.construct (node_modules\u002Fchart.js\u002Fdist\u002FChart.js:9324:26)\n  at new Chart (node_modules\u002Fchart.js\u002Fdist\u002FChart.js:9311:7)\n  at Proxy.drawLineChart (src\u002Fcomponents\u002FPopulationChart.vue:760:32)\n  at Proxy.mounted (src\u002Fcomponents\u002FPopulationChart.vue:816:10)\n  ...略\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eさっきは略していましたが、よく見ると\u003Ccode\u003EChart\u003C\u002Fcode\u003Eやら\u003Ccode\u003EContext\u003C\u002Fcode\u003Eやら書いてある...\u003C\u002Fp\u003E\n\u003Cp\u003Eもしかしてもしかするとこの\u003Ccode\u003EChart.js\u003C\u002Fcode\u003Eが問題のパターン？と思い、たくさん調べてみましたよ。\u003C\u002Fp\u003E\n\u003Cp\u003Eライブラリの問題部分を読んでみると、どうやらコンストラクタの引数のcanvasエレメントが問題だった。さらに調べた結果、canvasが表示されきってないとかどうとかで読み込めなかったらしい。／(^o^)＼ﾅﾝﾃｺｯﾀｲ\u003C\u002Fp\u003E\n\u003Ch2\u003E問題の解決方法\u003C\u002Fh2\u003E\n\u003Cp\u003Eということで、数時間かけて問題に対処した結果、コードの修正部分は以下の通りです‼‼‼‼\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003Esrc\u002Fcomponents\u002FChart.vue\u003C\u002Fcode\u003Eの\u003Ccode\u003Emounted\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003E  mounted() {\n    \u002F\u002F this.$nextTickで囲むだけ‼‼‼‼‼‼ 簡単だね‼\n    this.$nextTick(function () {\n      \u002F\u002F グラフの作成\n      this.drawLineChart();\n    });\n  },\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eそう、ここだけ‼\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003Ecanvas\u003C\u002Fcode\u003Eがマウントされきっていないため、\u003Ccode\u003E$nextTick\u003C\u002Fcode\u003Eを使ってすべてのコンポーネントがマウントされるのを待ったらいけました。\u003C\u002Fp\u003E\n\u003Cp\u003Eというのも、\u003Ccode\u003Emounted\u003C\u002Fcode\u003Eでは子コンポーネント全てをマウントしたことは保証しないらしく、すべてのコンポーネントがマウントされているとは限らないそうです。公式ドキュメントにも普通に書いてあったので参考に載っけときます。\u003C\u002Fp\u003E\n\u003Ch2\u003Eおわりに\u003C\u002Fh2\u003E\n\u003Cp\u003E数時間悩んだ結果2行追加で解決でつらいよ、俺の努力はいったい...\u003C\u002Fp\u003E\n\u003Cp\u003E／(^o^)＼ﾅﾝﾃｺｯﾀｲ\u003C\u002Fp\u003E\n\u003Cp\u003E深夜テンションで書きましたのでもう寝ます( ˘ω˘)ｽﾔｧ\u003C\u002Fp\u003E\n\u003Cp\u003E誤字脱字はゆるしてください\u003C\u002Fp\u003E\n\u003Ch2\u003E参考\u003C\u002Fh2\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fqiita.com\u002Fchan_kaku\u002Fitems\u002F7f3233053b0e209ef355#mounted\"\u003EVueのライフサイクルを完全に理解した - Qiita\u003C\u002Fa\u003E\u003Cbr\u003E\n\u003Ca href=\"https:\u002F\u002Fjp.vuejs.org\u002Fv2\u002Fapi\u002Findex.html#mounted\"\u003EAPI — Vue.js\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n",image:{_id:c,altText:b,description:b,fileName:d,fileSize:e,fileType:f,height:g,metadata:{},src:h,title:b,width:i},author:{_id:"61a7359d8131ac001847fbb4",_sys:{raw:{createdAt:l,updatedAt:"2022-08-21T16:42:17.357Z",firstPublishedAt:l,publishedAt:r},createdAt:l,updatedAt:r},name:s,slug:s,biography:"\u003Cp\u003EWebエンジニアです。\u003C\u002Fp\u003E\u003Cp\u003Eよろしくお願いします。\u003C\u002Fp\u003E",image:q},tags:[{_id:m,_sys:{raw:{createdAt:a,updatedAt:a,firstPublishedAt:a,publishedAt:a},createdAt:a,updatedAt:a},name:n,slug:o,image:{_id:c,altText:b,description:b,fileName:d,fileSize:e,fileType:f,height:g,metadata:{},src:h,title:b,width:i}}]}],notes:[]}],fetch:{},mutations:void 0}}("2022-09-05T16:01:08.024Z","","63161d23d59cbbc5fa89a677","vue.svg",569,"image\u002Fsvg+xml",221,"https:\u002F\u002Fstorage.googleapis.com\u002Fp_6302578c3183a77882ff85f3\u002F4cc2a9dc-036c-4164-9c6e-ad2de68644c0%2Fvue.svg",256,"2022-09-24T19:13:26.484Z","2022-10-08T08:14:55.576Z","2021-12-01T08:43:09.433Z","63161d44d59cbbc5fa89a71c","Vue.js","vuejs","Vue3のVue Test Utils で地獄をみた（Chart.js部門）",null,"2022-08-21T16:40:12.899Z","masa")));