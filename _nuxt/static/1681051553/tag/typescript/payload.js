__NUXT_JSONP__("/tag/typescript", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){return {data:[{tag:{_id:j,_sys:{raw:{createdAt:a,updatedAt:a,firstPublishedAt:a,publishedAt:a},createdAt:a,updatedAt:a},name:k,slug:l,image:{_id:m,altText:b,description:b,fileName:n,fileSize:o,fileType:e,height:d,metadata:{},src:p,title:b,width:d}},posts:[],notes:[{_id:"6431b4ee3b7747446c0762b5",_sys:{raw:{createdAt:f,updatedAt:g,firstPublishedAt:f,publishedAt:g},customOrder:6,createdAt:f,updatedAt:g},title:"Nuxtでcheerioを使えるようにする",slug:"how-to-use-nuxt-cheerio",body:"\u003Cp\u003ENuxtでCheerioを使ってHTMLパースを使用しようとするとエラーが出るので、使えるようにします。\u003C\u002Fp\u003E\n\u003Ch2\u003E環境\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003ENuxt: 2.15.8\u003C\u002Fli\u003E\n\u003Cli\u003EVue: 2.6.14\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003E問題\u003C\u002Fh2\u003E\n\u003Cp\u003E以下のようにNuxt環境で\u003Ccode\u003Echeerio\u003C\u002Fcode\u003Eを使用するコードがあります。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-ts\"\u003Eimport * as cheerio from 'cheerio'\n\nconst $ = cheerio.load('&lt;div&gt;test&lt;\u002Fdiv&gt;')\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E上記のコードを含めてビルドすると以下のようなエラーが出ます。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-log\"\u003EERROR in .\u002Fnode_modules\u002Fhtmlparser2\u002Flib\u002Fesm\u002Findex.js 48:9\nModule parse failed: Unexpected token (48:9)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https:\u002F\u002Fwebpack.js.org\u002Fconcepts#loaders\n|  * They should probably be removed eventually.\n|  *\u002F\n&gt; export * as ElementType from &quot;domelementtype&quot;;\n| import { getFeed } from &quot;domutils&quot;;\n| export { getFeed } from &quot;domutils&quot;;\n @ .\u002Fnode_modules\u002Fcheerio\u002Flib\u002Fesm\u002Findex.js 11:0-68 13:6-26\n## 省略 ##\n\nERROR in .\u002Fnode_modules\u002Fcheerio\u002Fnode_modules\u002Fparse5\u002Fdist\u002Findex.js 7:9\nModule parse failed: Unexpected token (7:9)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https:\u002F\u002Fwebpack.js.org\u002Fconcepts#loaders\n| export { ERR as ErrorCodes } from '.\u002Fcommon\u002Ferror-codes.js';\n| \u002F** @internal *\u002F\n&gt; export * as foreignContent from '.\u002Fcommon\u002Fforeign-content.js';\n| \u002F** @internal *\u002F\n| export * as html from '.\u002Fcommon\u002Fhtml.js';\n @ .\u002Fnode_modules\u002Fcheerio\u002Flib\u002Fesm\u002Fparsers\u002Fparse5-adapter.js 2:0-79 22:10-23 23:10-23 48:18-32\n @ .\u002Fnode_modules\u002Fcheerio\u002Flib\u002Fesm\u002Findex.js\n## 省略 ##\n\nERROR in .\u002Fnode_modules\u002Fparse5-htmlparser2-tree-adapter\u002Fnode_modules\u002Fparse5\u002Fdist\u002Findex.js 7:9\nModule parse failed: Unexpected token (7:9)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https:\u002F\u002Fwebpack.js.org\u002Fconcepts#loaders\n| export { ERR as ErrorCodes } from '.\u002Fcommon\u002Ferror-codes.js';\n| \u002F** @internal *\u002F\n&gt; export * as foreignContent from '.\u002Fcommon\u002Fforeign-content.js';\n| \u002F** @internal *\u002F\n| export * as html from '.\u002Fcommon\u002Fhtml.js';\n @ .\u002Fnode_modules\u002Fparse5-htmlparser2-tree-adapter\u002Fdist\u002Findex.js 1:0-30 35:25-29\n @ .\u002Fnode_modules\u002Fcheerio\u002Flib\u002Fesm\u002Fparsers\u002Fparse5-adapter.js\n @ .\u002Fnode_modules\u002Fcheerio\u002Flib\u002Fesm\u002Findex.js\n## 省略 ##\n\n FATAL  Nuxt build error\n\n  at WebpackBundler.webpackCompile (node_modules\u002F@nuxt\u002Fwebpack\u002Fdist\u002Fwebpack.js:2127:21)\n  at processTicksAndRejections (node:internal\u002Fprocess\u002Ftask_queues:96:5)\n  at async WebpackBundler.build (node_modules\u002F@nuxt\u002Fwebpack\u002Fdist\u002Fwebpack.js:2076:5)\n  at async Builder.build (node_modules\u002F@nuxt\u002Fbuilder\u002Fdist\u002Fbuilder.js:327:5)\n  at async Object.run (node_modules\u002F@nuxt\u002Fcli\u002Fdist\u002Fcli-build.js:110:7)\n  at async NuxtCommand.run (node_modules\u002F@nuxt\u002Fcli\u002Fdist\u002Fcli-index.js:413:7)\n\n   ╭─────────────────────────────╮\n   │                             │\n   │   ✖ Nuxt Fatal Error       │\n   │                             │\n   │   Error: Nuxt build error   │\n   │                             │\n   ╰─────────────────────────────╯\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2\u003E解決策\u003C\u002Fh2\u003E\n\u003Cp\u003E解決策としては、webpackにcheerio用のローダーを読み込ませることで使用できるようになります。\u003C\u002Fp\u003E\n\u003Cp\u003E以下のように\u003Ccode\u003Enuxt.config.ts\u003C\u002Fcode\u003Eを変更します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-ts:nuxt.config.ts\"\u003Eexport default {\n  \u002F* 略 *\u002F\n  build: {\n    extend(config: any) {\n      \u002F\u002F htmlparser2 loader\n      config.module.rules.push({\n        test: \u002F\\\u002Fnode_modules\\\u002Fhtmlparser2\\\u002Flib\\\u002Fesm\\\u002Findex\\.js$\u002F,\n        loader: 'babel-loader',\n        options: {\n          presets: ['@babel\u002Fpreset-env'],\n        },\n      })\n      \u002F\u002F cheerio loader\n      config.module.rules.push({\n        test: \u002F\\\u002Fnode_modules\\\u002Fcheerio\\\u002Fnode_modules\\\u002Fparse5\\\u002Fdist\\\u002Findex\\.js$\u002F,\n        loader: 'babel-loader',\n        options: {\n          presets: ['@babel\u002Fpreset-env'],\n        },\n      })\n      \u002F\u002F parse5-htmlparser2-tree-adapter loader\n      config.module.rules.push({\n        test: \u002F\\\u002Fnode_modules\\\u002Fparse5-htmlparser2-tree-adapter\\\u002Fnode_modules\\\u002Fparse5\\\u002Fdist\\\u002Findex\\.js$\u002F,\n        loader: 'babel-loader',\n        options: {\n          presets: ['@babel\u002Fpreset-env'],\n        },\n      })\n    },\n  },\n  \u002F* 略 *\u002F\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eこれで読み込めるようになるはずです。\u003C\u002Fp\u003E\n",author:{_id:"61a7359d8131ac001847fbb4",_sys:{raw:{createdAt:h,updatedAt:i,firstPublishedAt:h,publishedAt:i},createdAt:h,updatedAt:i},name:q,slug:q,biography:"\u003Cp\u003EWebエンジニアです。\u003C\u002Fp\u003E\u003Cp\u003Eよろしくお願いします。\u003C\u002Fp\u003E",image:{_id:"63de027516bdb9179566c9ba",altText:b,description:b,fileName:"IMG_20191028_124950_2.jpg",fileSize:611177,fileType:"image\u002Fjpeg",height:r,metadata:{},src:"https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F7e195ec3-1779-4c5f-9f0e-1d0bcf7d6c34\u002FIMG_20191028_124950_2.jpg",title:b,width:r}},tags:[{_id:"63161dcad59cbbc5fa89ad11",_sys:{raw:{createdAt:c,updatedAt:c,firstPublishedAt:c,publishedAt:c},createdAt:c,updatedAt:c},name:"Nuxt",slug:"nuxt",image:{_id:"63161dbbd59cbbc5fa89ac6c",altText:b,description:b,fileName:"nuxt-icon.svg",fileSize:947,fileType:e,height:172,metadata:{},src:"https:\u002F\u002Fstorage.googleapis.com\u002Fp_6302578c3183a77882ff85f3\u002Fe144d635-0edd-4b08-9479-78dcf44d6d1f%2Fnuxt-icon.svg",title:b,width:d}},{_id:j,_sys:{raw:{createdAt:a,updatedAt:a,firstPublishedAt:a,publishedAt:a},createdAt:a,updatedAt:a},name:k,slug:l,image:{_id:m,altText:b,description:b,fileName:n,fileSize:o,fileType:e,height:d,metadata:{},src:p,title:b,width:d}}]}]}],fetch:{},mutations:void 0}}("2022-09-05T16:04:34.994Z","","2022-09-05T16:03:22.823Z",256,"image\u002Fsvg+xml","2023-04-08T18:39:42.999Z","2023-04-09T05:59:51.636Z","2021-12-01T08:43:09.433Z","2023-02-04T07:00:38.318Z","63161e12d59cbbc5fa89b16c","TypeScript","typescript","63161df6d59cbbc5fa89b0c6","typescript-icon.svg",2551,"https:\u002F\u002Fstorage.googleapis.com\u002Fp_6302578c3183a77882ff85f3\u002Fa7dc8c94-d46c-4e3c-b704-d61de1364868%2Ftypescript-icon.svg","masa",2689)));