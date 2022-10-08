__NUXT_JSONP__("/note", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y){return {data:[{page:i,notes:[{_id:"631ca172868b21f0f1aaf665",_sys:{raw:{createdAt:j,updatedAt:k,firstPublishedAt:j,publishedAt:k},createdAt:j,updatedAt:k},title:p,slug:"sinki-note",meta:{title:p,description:a,ogimage:l},body:"\u003Ch1\u003E新規ノートてすと\u003C\u002Fh1\u003E\n\u003Cp\u003Eテキスト\u003C\u002Fp\u003E\n\u003Ch2\u003EH2ノートテスト\u003C\u002Fh2\u003E\n\u003Cp\u003E次のテスト\u003C\u002Fp\u003E\n\u003Ch3\u003EH3ノートテスト\u003C\u002Fh3\u003E\n\u003Cp\u003Eｈｗテストでーす感じ\u003C\u002Fp\u003E\n\u003Ch4\u003EH4ノートテスト\u003C\u002Fh4\u003E\n\u003Cp\u003Eノートテスト\u003C\u002Fp\u003E\n\u003Ch5\u003Eh5ノートテスト\u003C\u002Fh5\u003E\n\u003Cp\u003Eテスト\u003C\u002Fp\u003E\n\u003Ch6\u003Eh6ノートテスト\u003C\u002Fh6\u003E\n\u003Cp\u003Eあああああああああああ\u003C\u002Fp\u003E\n\u003Cp\u003Eコードテキストのテスト\u003Ccode\u003Enpm run dev\u003C\u002Fcode\u003Eを実行\u003C\u002Fp\u003E\n\u003Ctable\u003E\n\u003Cthead\u003E\n\u003Ctr\u003E\n\u003Cth\u003EHead\u003C\u002Fth\u003E\n\u003Cth\u003EHead\u003C\u002Fth\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Fthead\u003E\n\u003Ctbody\u003E\n\u003Ctr\u003E\n\u003Ctd\u003EData\u003C\u002Ftd\u003E\n\u003Ctd\u003EData\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003EData\u003C\u002Ftd\u003E\n\u003Ctd\u003EData\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003EData\u003C\u002Ftd\u003E\n\u003Ctd\u003Eデータ\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Ftbody\u003E\n\u003C\u002Ftable\u003E\n\u003Col\u003E\n\u003Cli\u003Eabc\u003C\u002Fli\u003E\n\u003Cli\u003Eいちちち\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E参考です\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cul\u003E\n\u003Cli\u003E2332\u003C\u002Fli\u003E\n\u003Cli\u003E-2332\u003C\u002Fli\u003E\n\u003Cli\u003Esdfasf\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-markup\"\u003E&lt;template&gt;\n  &lt;div class=&quot;d-flex flex-wrap justify-content-between mb-3&quot;&gt;\n    &lt;div v-for=&quot;note in noteList&quot; :key=&quot;note._id&quot; class=&quot;note-item mb-5&quot;&gt;\n      &lt;nuxt-link :to=&quot;`\u002Fnote\u002F${note._id}`&quot;&gt;\n        &lt;div v-if=&quot;note.tag.length &gt; 0 || note.tag[0].image&quot;&gt;\n          &lt;img :src=&quot;note.tag[0].image.src&quot; \u002F&gt;\n        &lt;\u002Fdiv&gt;\n        &lt;div v-else&gt;\n          &lt;b-icon-circle-fill \u002F&gt;\n          &lt;BIconCircleFill \u002F&gt;\n          &lt;!-- コメント　--&gt;\n        &lt;\u002Fdiv&gt;\n        {{ note.title }}\n      &lt;\u002Fnuxt-link&gt;\n    &lt;\u002Fdiv&gt;\n  &lt;\u002Fdiv&gt;\n&lt;\u002Ftemplate&gt;\n\n&lt;script lang=&quot;ts&quot;&gt;\nimport { Vue, Component, Prop } from 'vue-property-decorator'\nimport dayjs from 'dayjs'\nimport { Image, Note } from '..\u002Ftypes\u002FnewtApi'\n\n@Component({\n  name: 'NoteListComponent',\n})\nexport default class NoteListComponent extends Vue {\n  @Prop({ type: Array })\n  noteList!: Note[]\n\n  dayjs = dayjs\n\n  mounted() {\n    console.log((this.noteList[0].tag[0].image as Image).src)\n  }\n}\n&lt;\u002Fscript&gt;\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-tsx\"\u003Eexport interface Config {\n  apiUrl: string\n  apiKey: string\n  _app: {\n    basePath?: string\n    assetsPath?: string\n    cdnURL?: string\n  }\n}\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-treeview\"\u003E.\n|-- README.md\n|-- assets\u002F\n|   `-- scss\u002F\n|-- blog.config.ts\n|-- components\u002F\n|   |-- Footer.vue\n|   |-- Header.vue\n|   |-- NoteListComponent.vue\n|   |-- NuxtLogo.vue\n|   |-- PostListComponent.vue\n|   |-- TagIconSmall.vue\n|   `-- Tutorial.vue\n|-- dist\u002F\n|   |-- 404.html\n|   |-- _nuxt\u002F\n|   |-- about\u002F\n|   |-- favicon.ico\n|   |-- img\u002F\n|   |-- index.html\n|   |-- note\u002F\n|   |-- post\u002F\n|   `-- tag\u002F\n|-- jest.config.js\n|-- jsconfig.json\n|-- layouts\u002F\n|   |-- default.vue\n|   `-- error.vue\n|-- nuxt.config.ts\n|-- package-lock.json\n|-- package.json\n|-- pages\u002F\n|   |-- 404.vue\n|   |-- about.vue\n|   |-- index.vue\n|   |-- note\u002F\n|   |-- post\u002F\n|   `-- tag\u002F\n|-- static\u002F\n|   |-- favicon.ico\n|   `-- img\u002F\n|-- store\u002F\n|   `-- README.md\n|-- test\u002F\n|   `-- NuxtLogo.spec.js\n|-- tsconfig.json\n|-- types\u002F\n|   |-- api.ts\n|   |-- config.ts\n|   `-- newtApi.ts\n`-- util\u002F\n    |-- codeHighlight.ts\n    `-- searchParam.ts\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n",author:l,tags:[{_id:"63161f5bd59cbbc5fa89bf5a",_sys:{raw:{createdAt:c,updatedAt:c,firstPublishedAt:c,publishedAt:c},createdAt:c,updatedAt:c},name:"Next.js",slug:"nextjs",image:{_id:"63161f47d59cbbc5fa89beb5",altText:a,description:a,fileName:"nextjs-icon.svg",fileSize:2960,fileType:g,height:b,metadata:{},src:"https:\u002F\u002Fstorage.googleapis.com\u002Fp_6302578c3183a77882ff85f3\u002F5a94cf51-c3e6-4d43-918c-68d1ac7dfcf0%2Fnextjs-icon.svg",title:a,width:b}}]},{_id:"63145da0d59cbbc5fa2f60d5",_sys:{raw:{createdAt:m,updatedAt:n,firstPublishedAt:m,publishedAt:n},createdAt:m,updatedAt:n},title:q,slug:"note-test",meta:{title:q,description:"ノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテスト",ogimage:{_id:r,altText:s,description:h,fileName:t,fileSize:u,fileType:g,height:v,metadata:{},src:w,title:h,width:b}},body:"\u003Ch2\u003Eノートのテスト\u003C\u002Fh2\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-ts\"\u003Etry {\n  const noteRes = await axios.get(`${config.apiUrl}\u002Fnote\u002F${slug}`, {\n    headers: {\n      Authorization: `Bearer ${config.apiKey}`,\n    },\n  })\n\n  const note = noteRes.data as Note\n\n  return {\n    body: note.body,\n    note: note,\n  }\n} catch (e) {\n  const axiosError = e as AxiosError\n  redirect(axiosError.response!.status, '\u002Fnote')\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-css\"\u003E.select {\n    color: #fff\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-treeview\"\u003Eroot_folder\u002F\n├── a first folder\u002F\n|   ├── holidays.mov\n|   ├── javascript-file.js\n|   └── some_picture.jpg\n├── documents\u002F\n|   ├── spreadsheet.xls\n|   ├── manual.pdf\n|   ├── document.docx\n|   └── presentation.ppt\n└── etc.\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003Eノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテストノートのテスト\u003C\u002Fp\u003E\n",author:{_id:"61a7359d8131ac001847fbb4",_sys:{raw:{createdAt:o,updatedAt:"2022-08-21T16:42:17.357Z",firstPublishedAt:o,publishedAt:x},createdAt:o,updatedAt:x},name:y,slug:y,biography:"\u003Cp\u003EWebエンジニアです。\u003C\u002Fp\u003E\u003Cp\u003Eよろしくお願いします。\u003C\u002Fp\u003E",image:l},tags:[{_id:"631454fed59cbbc5fa2b599f",_sys:{raw:{createdAt:d,updatedAt:d,firstPublishedAt:d,publishedAt:d},createdAt:d,updatedAt:d},name:"Windows",slug:"windows",image:{_id:r,altText:s,description:h,fileName:t,fileSize:u,fileType:g,height:v,metadata:{},src:w,title:h,width:b}},{_id:"63161dcad59cbbc5fa89ad11",_sys:{raw:{createdAt:e,updatedAt:e,firstPublishedAt:e,publishedAt:e},createdAt:e,updatedAt:e},name:"Nuxt",slug:"nuxt",image:{_id:"63161dbbd59cbbc5fa89ac6c",altText:a,description:a,fileName:"nuxt-icon.svg",fileSize:947,fileType:g,height:172,metadata:{},src:"https:\u002F\u002Fstorage.googleapis.com\u002Fp_6302578c3183a77882ff85f3\u002Fe144d635-0edd-4b08-9479-78dcf44d6d1f%2Fnuxt-icon.svg",title:a,width:b}},{_id:"63161e12d59cbbc5fa89b16c",_sys:{raw:{createdAt:f,updatedAt:f,firstPublishedAt:f,publishedAt:f},createdAt:f,updatedAt:f},name:"TypeScript",slug:"typescript",image:{_id:"63161df6d59cbbc5fa89b0c6",altText:a,description:a,fileName:"typescript-icon.svg",fileSize:2551,fileType:g,height:b,metadata:{},src:"https:\u002F\u002Fstorage.googleapis.com\u002Fp_6302578c3183a77882ff85f3\u002Fa7dc8c94-d46c-4e3c-b704-d61de1364868%2Ftypescript-icon.svg",title:a,width:b}}]}],noteMeta:{rows:i,perPage:20,currentPage:i}}],fetch:{},mutations:void 0}}("",256,"2022-09-05T16:10:03.065Z","2022-09-04T07:34:22.644Z","2022-09-05T16:03:22.823Z","2022-09-05T16:04:34.994Z","image\u002Fsvg+xml","Windows ロゴ",1,"2022-09-10T14:38:42.287Z","2022-10-01T02:06:12.731Z",null,"2022-09-04T08:11:12.280Z","2022-09-25T06:09:41.955Z","2021-12-01T08:43:09.433Z","新規ノート","ノートのテスト","631454f0d59cbbc5fa2b5941","windows-logo","microsoft-windows.svg",740,257,"https:\u002F\u002Fstorage.googleapis.com\u002Fp_6302578c3183a77882ff85f3\u002F37f55cea-032f-4675-bc9e-e8bb4dbeeedc%2Fmicrosoft-windows.svg","2022-08-21T16:40:12.899Z","masa")));