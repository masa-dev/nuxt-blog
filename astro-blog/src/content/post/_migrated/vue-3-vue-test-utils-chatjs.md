---
title: "Vue3のVue Test Utils で地獄をみた（Chart.js部門）"
description: "はじめはVuexのストアが問題で発生していると思い込んで、ひたすらモック作成に取り組んでいたけど一向にエラー文が変わらない絶望 そんなこんなで、色々いじくりまわしてるとあることに気づいた"
pubDate: "2022-09-24T19:13:26.484Z"
updatedDate: "2023-04-02T01:53:43.479Z"
slug: "vue-3-vue-test-utils-chatjs"
legacyIds:
  - "632f56d68834f719d021b2d6"
tags:
  - "vuejs"
heroImage: "/media/4cc2a9dc-036c-4164-9c6e-ad2de68644c0/vue.svg"
---

<p>あまり気力がないのでかなり端折って書きます。</p>
<h2 id="content-h-1">環境</h2>
<ul>
<li>vue@3.2.19</li>
<li>vuex@4.0.2</li>
<li>chart.js@2.9.4</li>
<li>@vue/test-utils@2.0.0-rc.15</li>
</ul>
<p>ここで関係のなさそうな一般ライブラリが入っているってことは、つまりそういうことなんです。</p>
<h2 id="content-h-2">問題の部分</h2>
<p>本当ならもっと長いけど、問題となった部分はここだけ</p>
<div class="post-code-info"><span>src/components/Chart.vue</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#808080">&#x3C;</span><span style="color:#569CD6">template</span><span style="color:#808080">></span></span>
<span class="line"><span style="color:#808080">  &#x3C;</span><span style="color:#569CD6">div</span><span style="color:#9CDCFE"> class</span><span style="color:#D4D4D4">=</span><span style="color:#CE9178">"chart"</span><span style="color:#808080">></span></span>
<span class="line"><span style="color:#808080">    &#x3C;</span><span style="color:#569CD6">canvas</span><span style="color:#9CDCFE"> id</span><span style="color:#D4D4D4">=</span><span style="color:#CE9178">"myChart"</span><span style="color:#808080">>&#x3C;/</span><span style="color:#569CD6">canvas</span><span style="color:#808080">></span></span>
<span class="line"><span style="color:#808080">  &#x3C;/</span><span style="color:#569CD6">div</span><span style="color:#808080">></span></span>
<span class="line"><span style="color:#808080">&#x3C;/</span><span style="color:#569CD6">template</span><span style="color:#808080">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#808080">&#x3C;</span><span style="color:#569CD6">script</span><span style="color:#808080">></span></span>
<span class="line"><span style="color:#C586C0">import</span><span style="color:#9CDCFE"> Chart</span><span style="color:#C586C0"> from</span><span style="color:#CE9178"> "chart.js"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#C586C0">import</span><span style="color:#CE9178"> "chartjs-plugin-colorschemes"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0">export</span><span style="color:#C586C0"> default</span><span style="color:#D4D4D4"> {</span></span>
<span class="line"><span style="color:#D4D4D4">  ...</span><span style="color:#9CDCFE">略</span></span>
<span class="line"><span style="color:#9CDCFE">  methods</span><span style="color:#D4D4D4">: {</span></span>
<span class="line"><span style="color:#DCDCAA">    drawLineChart</span><span style="color:#D4D4D4">() {</span></span>
<span class="line"><span style="color:#569CD6">      const</span><span style="color:#4FC1FF"> ctx</span><span style="color:#D4D4D4"> = </span><span style="color:#9CDCFE">document</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">getElementById</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">"myChart"</span><span style="color:#D4D4D4">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">      // グラフの作成及び設定を指定する</span></span>
<span class="line"><span style="color:#9CDCFE">      window</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">populationChart</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">new</span><span style="color:#DCDCAA"> Chart</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">ctx</span><span style="color:#D4D4D4">, {</span></span>
<span class="line"><span style="color:#D4D4D4">	    ...</span><span style="color:#9CDCFE">略</span></span>
<span class="line"><span style="color:#D4D4D4">	  });</span></span>
<span class="line"><span style="color:#D4D4D4">    },</span></span>
<span class="line"><span style="color:#D4D4D4">  },</span></span>
<span class="line"><span style="color:#DCDCAA">  mounted</span><span style="color:#D4D4D4">() {</span></span>
<span class="line"><span style="color:#6A9955">    // グラフの作成</span></span>
<span class="line"><span style="color:#569CD6">    this</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">drawLineChart</span><span style="color:#D4D4D4">();</span></span>
<span class="line"><span style="color:#D4D4D4">  },</span></span>
<span class="line"><span style="color:#D4D4D4">};</span></span>
<span class="line"><span style="color:#808080">&#x3C;/</span><span style="color:#569CD6">script</span><span style="color:#808080">></span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
</br>
<div class="post-code-info"><span>tests/unit/Chart.spec.js</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#C586C0">import</span><span style="color:#D4D4D4"> { </span><span style="color:#9CDCFE">shallowMount</span><span style="color:#D4D4D4"> } </span><span style="color:#C586C0">from</span><span style="color:#CE9178"> "@vue/test-utils"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#C586C0">import</span><span style="color:#9CDCFE"> Chart</span><span style="color:#C586C0"> from</span><span style="color:#CE9178"> "@/components/Chart.vue"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#DCDCAA">test</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">"Chart"</span><span style="color:#D4D4D4">, () </span><span style="color:#569CD6">=></span><span style="color:#D4D4D4"> {</span></span>
<span class="line"><span style="color:#569CD6">  const</span><span style="color:#4FC1FF"> state</span><span style="color:#D4D4D4"> = {</span></span>
<span class="line"><span style="color:#D4D4D4">	...</span><span style="color:#9CDCFE">略</span></span>
<span class="line"><span style="color:#D4D4D4">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">  const</span><span style="color:#4FC1FF"> $store</span><span style="color:#D4D4D4"> = {</span></span>
<span class="line"><span style="color:#D4D4D4">	...</span><span style="color:#9CDCFE">略</span></span>
<span class="line"><span style="color:#D4D4D4">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">  const</span><span style="color:#4FC1FF"> wrapper</span><span style="color:#D4D4D4"> = </span><span style="color:#DCDCAA">shallowMount</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">Chart</span><span style="color:#D4D4D4">, {</span></span>
<span class="line"><span style="color:#9CDCFE">    global:</span><span style="color:#D4D4D4"> {</span></span>
<span class="line"><span style="color:#9CDCFE">      mocks:</span><span style="color:#D4D4D4"> {</span></span>
<span class="line"><span style="color:#9CDCFE">        $store</span></span>
<span class="line"><span style="color:#D4D4D4">      }</span></span>
<span class="line"><span style="color:#D4D4D4">    }</span></span>
<span class="line"><span style="color:#D4D4D4">  })</span></span>
<span class="line"><span style="color:#D4D4D4">});</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h2 id="content-h-3">何が起きたのか・エラー内容</h2>
<p>なんと！こんな素敵なエラーが出てきました✨✨</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#CE9178;font-weight:bold">FAIL</span><span style="color:#D4D4D4">  tests/unit/PopulationChart.</span><span style="color:#569CD6">spec.js</span></span>
<span class="line"><span style="color:#D4D4D4"> ● Console</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">console.warn</span><span style="color:#D4D4D4"> node_modules/@vue/runtime-core/dist/runtime-</span><span style="color:#569CD6">core.cjs.js</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">6465</span></span>
<span class="line"><span style="color:#D4D4D4">  [Vue warn]: Unhandled error during execution of mounted hook </span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">	at &#x3C;PopulationChart ref="VTU_COMPONENT" > </span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">	at &#x3C;VTUROOT></span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4"> ● </span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4">  TypeError: Cannot read property </span><span style="color:#CE9178">'length'</span><span style="color:#D4D4D4"> of </span><span style="color:#569CD6">null</span></span>
<span class="line"><span style="color:#D4D4D4">  </span></span>
<span class="line"><span style="color:#D4D4D4">  ...略</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>な...何を言っているのかわからねーと思うが、おれも何をされたのかわからなかった...</p>
<p>どこのことを言っているの分からなかったし、時間をかけて調べても何にも出てこない、マジで</p>
<p>はじめはVuexのストアが問題で発生していると思い込んで、ひたすらモック作成に取り組んでいたけど一向にエラー文が変わらない絶望...</p>
<p>そんなこんなで、色々いじくりまわしてるとあることに気づいた</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#D4D4D4">TypeError: Cannot read property </span><span style="color:#CE9178">'length'</span><span style="color:#D4D4D4"> of </span><span style="color:#569CD6">null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at Object.acquireContext (node_modules/chart.js/dist/Chart.js:7756:19)</span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at Chart.construct (node_modules/chart.js/dist/Chart.js:9324:26)</span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at new Chart (node_modules/chart.js/dist/Chart.js:9311:7)</span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at Proxy.drawLineChart (src/components/PopulationChart.vue:760:32)</span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at Proxy.mounted (src/components/PopulationChart.vue:816:10)</span></span>
<span class="line"><span style="color:#D4D4D4">  ...略</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>さっきは略していましたが、よく見ると<code>Chart</code>やら<code>Context</code>やら書いてある...</p>
<p>もしかしてもしかするとこの<code>Chart.js</code>が問題のパターン？と思い、たくさん調べてみましたよ。</p>
<p>ライブラリの問題部分を読んでみると、どうやらコンストラクタの引数のcanvasエレメントが問題だった。さらに調べた結果、canvasが表示されきってないとかどうとかで読み込めなかったらしい。／(^o^)＼ﾅﾝﾃｺｯﾀｲ</p>
<h2 id="content-h-4">問題の解決方法</h2>
<p>ということで、数時間かけて問題に対処した結果、コードの修正部分は以下の通りです‼‼‼‼</p>
<p><code>src/components/Chart.vue</code>の<code>mounted</code></p>
<div class="post-code-info"><span>src/components/Chart.vue</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#DCDCAA">  mounted</span><span style="color:#D4D4D4">() {</span></span>
<span class="line"><span style="color:#6A9955">    // this.$nextTickで囲むだけ‼‼‼‼‼‼ 簡単だね‼</span></span>
<span class="line"><span style="color:#569CD6">    this</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">$nextTick</span><span style="color:#D4D4D4">(</span><span style="color:#569CD6">function</span><span style="color:#D4D4D4"> () {</span></span>
<span class="line"><span style="color:#6A9955">      // グラフの作成</span></span>
<span class="line"><span style="color:#569CD6">      this</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">drawLineChart</span><span style="color:#D4D4D4">();</span></span>
<span class="line"><span style="color:#D4D4D4">    });</span></span>
<span class="line"><span style="color:#D4D4D4">  },</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>そう、ここだけ‼</p>
<p><code>canvas</code>がマウントされきっていないため、<code>$nextTick</code>を使ってすべてのコンポーネントがマウントされるのを待ったらいけました。</p>
<p>というのも、<code>mounted</code>では子コンポーネント全てをマウントしたことは保証しないらしく、すべてのコンポーネントがマウントされているとは限らないそうです。公式ドキュメントにも普通に書いてあったので参考に載っけときます。</p>
<h2 id="content-h-5">おわりに</h2>
<p>数時間悩んだ結果2行追加で解決でつらいよ、俺の努力はいったい...</p>
<p>／(^o^)＼ﾅﾝﾃｺｯﾀｲ</p>
<p>深夜テンションで書きましたのでもう寝ます( ˘ω˘)ｽﾔｧ</p>
<p>誤字脱字はゆるしてください</p>
<h2 id="content-h-6">参考</h2>
<blockquote>
<p><a href="https://qiita.com/chan_kaku/items/7f3233053b0e209ef355#mounted">Vueのライフサイクルを完全に理解した - Qiita</a><br>
<a href="https://jp.vuejs.org/v2/api/index.html#mounted">API — Vue.js</a></p>
</blockquote>
