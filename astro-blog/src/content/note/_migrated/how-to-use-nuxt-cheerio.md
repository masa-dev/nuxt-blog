---
title: "Nuxtでcheerioを使えるようにする"
description: ""
pubDate: "2023-04-08T18:39:42.999Z"
updatedDate: "2023-04-09T05:59:51.636Z"
slug: "how-to-use-nuxt-cheerio"
legacyIds:
  - "6431b4ee3b7747446c0762b5"
tags:
  - "nuxt"
  - "typescript"
---

<p>NuxtでCheerioを使ってHTMLパースを使用しようとするとエラーが出るので、使えるようにします。</p>
<h2 id="content-h-1">環境</h2>
<ul>
<li>Nuxt: 2.15.8</li>
<li>Vue: 2.6.14</li>
</ul>
<h2 id="content-h-2">問題</h2>
<p>以下のようにNuxt環境で<code>cheerio</code>を使用するコードがあります。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#C586C0">import</span><span style="color:#569CD6"> *</span><span style="color:#C586C0"> as</span><span style="color:#9CDCFE"> cheerio</span><span style="color:#C586C0"> from</span><span style="color:#CE9178"> 'cheerio'</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">const</span><span style="color:#4FC1FF"> $</span><span style="color:#D4D4D4"> = </span><span style="color:#9CDCFE">cheerio</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">load</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">'&#x3C;div>test&#x3C;/div>'</span><span style="color:#D4D4D4">)</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>上記のコードを含めてビルドすると以下のようなエラーが出ます。</p>
<div class="code-wrapper">
<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#CE9178;font-weight:bold">ERROR</span><span style="color:#D4D4D4"> in ./node_modules/htmlparser2/lib/esm/index.js </span><span style="color:#569CD6">48</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">9</span></span>
<span class="line"><span style="color:#D4D4D4">Module parse failed: Unexpected token (</span><span style="color:#569CD6">48</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">9</span><span style="color:#D4D4D4">)</span></span>
<span class="line"><span style="color:#D4D4D4">You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See </span><span style="color:#569CD6">https://webpack.js.org/concepts#loaders</span></span>
<span class="line"><span style="color:#D4D4D4">|  * They should probably be removed eventually.</span></span>
<span class="line"><span style="color:#D4D4D4">|  */</span></span>
<span class="line"><span style="color:#D4D4D4">> export * as ElementType from </span><span style="color:#CE9178">"domelementtype"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">| import { getFeed } from </span><span style="color:#CE9178">"domutils"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">| export { getFeed } from </span><span style="color:#CE9178">"domutils"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4"> @ ./node_modules/cheerio/lib/esm/index.js </span><span style="color:#569CD6">11</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">0</span><span style="color:#D4D4D4">-</span><span style="color:#569CD6">68</span><span style="color:#569CD6"> 13</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">6</span><span style="color:#D4D4D4">-</span><span style="color:#569CD6">26</span></span>
<span class="line"><span style="color:#D4D4D4">## 省略 ##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CE9178;font-weight:bold">ERROR</span><span style="color:#D4D4D4"> in ./node_modules/cheerio/node_modules/parse5/dist/index.js </span><span style="color:#569CD6">7</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">9</span></span>
<span class="line"><span style="color:#D4D4D4">Module parse failed: Unexpected token (</span><span style="color:#569CD6">7</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">9</span><span style="color:#D4D4D4">)</span></span>
<span class="line"><span style="color:#D4D4D4">You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See </span><span style="color:#569CD6">https://webpack.js.org/concepts#loaders</span></span>
<span class="line"><span style="color:#D4D4D4">| export { ERR as ErrorCodes } from </span><span style="color:#CE9178">'./common/error-codes.js'</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">| /** @internal */</span></span>
<span class="line"><span style="color:#D4D4D4">> export * as foreignContent from </span><span style="color:#CE9178">'./common/foreign-content.js'</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">| /** @internal */</span></span>
<span class="line"><span style="color:#D4D4D4">| export * as html from </span><span style="color:#CE9178">'./common/html.js'</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4"> @ ./node_modules/cheerio/lib/esm/parsers/parse5-</span><span style="color:#569CD6">adapter.js</span><span style="color:#569CD6"> 2</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">0</span><span style="color:#D4D4D4">-</span><span style="color:#569CD6">79</span><span style="color:#6A9955"> 22:10</span><span style="color:#D4D4D4">-</span><span style="color:#569CD6">23</span><span style="color:#6A9955"> 23:10</span><span style="color:#D4D4D4">-</span><span style="color:#569CD6">23</span><span style="color:#6A9955"> 48:18</span><span style="color:#D4D4D4">-</span><span style="color:#569CD6">32</span></span>
<span class="line"><span style="color:#D4D4D4"> @ ./node_modules/cheerio/lib/esm/index.js</span></span>
<span class="line"><span style="color:#D4D4D4">## 省略 ##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CE9178;font-weight:bold">ERROR</span><span style="color:#D4D4D4"> in ./node_modules/parse5-htmlparser2-tree-adapter/node_modules/parse5/dist/index.js </span><span style="color:#569CD6">7</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">9</span></span>
<span class="line"><span style="color:#D4D4D4">Module parse failed: Unexpected token (</span><span style="color:#569CD6">7</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">9</span><span style="color:#D4D4D4">)</span></span>
<span class="line"><span style="color:#D4D4D4">You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See </span><span style="color:#569CD6">https://webpack.js.org/concepts#loaders</span></span>
<span class="line"><span style="color:#D4D4D4">| export { ERR as ErrorCodes } from </span><span style="color:#CE9178">'./common/error-codes.js'</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">| /** @internal */</span></span>
<span class="line"><span style="color:#D4D4D4">> export * as foreignContent from </span><span style="color:#CE9178">'./common/foreign-content.js'</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">| /** @internal */</span></span>
<span class="line"><span style="color:#D4D4D4">| export * as html from </span><span style="color:#CE9178">'./common/html.js'</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4"> @ ./node_modules/parse5-htmlparser2-tree-adapter/dist/index.js </span><span style="color:#569CD6">1</span><span style="color:#D4D4D4">:</span><span style="color:#569CD6">0</span><span style="color:#D4D4D4">-</span><span style="color:#569CD6">30</span><span style="color:#6A9955"> 35:25</span><span style="color:#D4D4D4">-</span><span style="color:#569CD6">29</span></span>
<span class="line"><span style="color:#D4D4D4"> @ ./node_modules/cheerio/lib/esm/parsers/parse5-</span><span style="color:#569CD6">adapter.js</span></span>
<span class="line"><span style="color:#D4D4D4"> @ ./node_modules/cheerio/lib/esm/index.js</span></span>
<span class="line"><span style="color:#D4D4D4">## 省略 ##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CE9178;font-weight:bold"> FATAL</span><span style="color:#D4D4D4">  Nuxt build error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at WebpackBundler.webpackCompile (node_modules/@nuxt/webpack/dist/webpack.js:2127:21)</span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at processTicksAndRejections (node:internal/process/task_queues:96:5)</span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at async WebpackBundler.build (node_modules/@nuxt/webpack/dist/webpack.js:2076:5)</span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at async Builder.build (node_modules/@nuxt/builder/dist/builder.js:327:5)</span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at async Object.run (node_modules/@nuxt/cli/dist/cli-build.js:110:7)</span></span>
<span class="line"><span style="color:#CE9178;font-style:italic">  at async NuxtCommand.run (node_modules/@nuxt/cli/dist/cli-index.js:413:7)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4">   ╭─────────────────────────────╮</span></span>
<span class="line"><span style="color:#D4D4D4">   │                             │</span></span>
<span class="line"><span style="color:#D4D4D4">   │   ✖ Nuxt </span><span style="color:#CE9178;font-weight:bold">Fatal</span><span style="color:#CE9178;font-weight:bold"> Error</span><span style="color:#D4D4D4">       │</span></span>
<span class="line"><span style="color:#D4D4D4">   │                             │</span></span>
<span class="line"><span style="color:#D4D4D4">   │   </span><span style="color:#CE9178;font-weight:bold">Error</span><span style="color:#D4D4D4">: Nuxt build error   │</span></span>
<span class="line"><span style="color:#D4D4D4">   │                             │</span></span>
<span class="line"><span style="color:#D4D4D4">   ╰─────────────────────────────╯</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<h2 id="content-h-3">解決策</h2>
<p>解決策としては、webpackにcheerio用のローダーを読み込ませることで使用できるようになります。</p>
<p>以下のように<code>nuxt.config.ts</code>を変更します。</p>
<div class="post-code-info"><span>nuxt.config.ts</span></div><div class="code-wrapper">
<pre class="code-with-file shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#C586C0">export</span><span style="color:#C586C0"> default</span><span style="color:#D4D4D4"> {</span></span>
<span class="line"><span style="color:#6A9955">  /* 略 */</span></span>
<span class="line"><span style="color:#9CDCFE">  build:</span><span style="color:#D4D4D4"> {</span></span>
<span class="line"><span style="color:#DCDCAA">    extend</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">config</span><span style="color:#D4D4D4">: </span><span style="color:#4EC9B0">any</span><span style="color:#D4D4D4">) {</span></span>
<span class="line"><span style="color:#6A9955">      // htmlparser2 loader</span></span>
<span class="line"><span style="color:#9CDCFE">      config</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">module</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">rules</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">push</span><span style="color:#D4D4D4">({</span></span>
<span class="line"><span style="color:#9CDCFE">        test:</span><span style="color:#6A9955"> //node_modules/htmlparser2/lib/esm/index\.js$/,</span></span>
<span class="line"><span style="color:#9CDCFE">        loader</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">'babel-loader'</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">        options:</span><span style="color:#D4D4D4"> {</span></span>
<span class="line"><span style="color:#9CDCFE">          presets:</span><span style="color:#D4D4D4"> [</span><span style="color:#CE9178">'@babel/preset-env'</span><span style="color:#D4D4D4">],</span></span>
<span class="line"><span style="color:#D4D4D4">        },</span></span>
<span class="line"><span style="color:#D4D4D4">      })</span></span>
<span class="line"><span style="color:#6A9955">      // cheerio loader</span></span>
<span class="line"><span style="color:#9CDCFE">      config</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">module</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">rules</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">push</span><span style="color:#D4D4D4">({</span></span>
<span class="line"><span style="color:#9CDCFE">        test:</span><span style="color:#6A9955"> //node_modules/cheerio/node_modules/parse5/dist/index\.js$/,</span></span>
<span class="line"><span style="color:#9CDCFE">        loader</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">'babel-loader'</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">        options:</span><span style="color:#D4D4D4"> {</span></span>
<span class="line"><span style="color:#9CDCFE">          presets:</span><span style="color:#D4D4D4"> [</span><span style="color:#CE9178">'@babel/preset-env'</span><span style="color:#D4D4D4">],</span></span>
<span class="line"><span style="color:#D4D4D4">        },</span></span>
<span class="line"><span style="color:#D4D4D4">      })</span></span>
<span class="line"><span style="color:#6A9955">      // parse5-htmlparser2-tree-adapter loader</span></span>
<span class="line"><span style="color:#9CDCFE">      config</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">module</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">rules</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">push</span><span style="color:#D4D4D4">({</span></span>
<span class="line"><span style="color:#9CDCFE">        test:</span><span style="color:#6A9955"> //node_modules/parse5-htmlparser2-tree-adapter/node_modules/parse5/dist/index\.js$/,</span></span>
<span class="line"><span style="color:#9CDCFE">        loader</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">'babel-loader'</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">        options:</span><span style="color:#D4D4D4"> {</span></span>
<span class="line"><span style="color:#9CDCFE">          presets:</span><span style="color:#D4D4D4"> [</span><span style="color:#CE9178">'@babel/preset-env'</span><span style="color:#D4D4D4">],</span></span>
<span class="line"><span style="color:#D4D4D4">        },</span></span>
<span class="line"><span style="color:#D4D4D4">      })</span></span>
<span class="line"><span style="color:#D4D4D4">    },</span></span>
<span class="line"><span style="color:#D4D4D4">  },</span></span>
<span class="line"><span style="color:#6A9955">  /* 略 */</span></span>
<span class="line"><span style="color:#D4D4D4">}</span></span>
<span class="line"></span></code></pre>
<button class="postBody_copyToClipboard" tabindex="-1">
<img src="/img/code_copy.svg" width="20" height="20">
</button>
</div>
<p>これで読み込めるようになるはずです。</p>
