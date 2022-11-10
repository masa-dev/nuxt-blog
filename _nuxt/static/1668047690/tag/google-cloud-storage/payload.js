__NUXT_JSONP__("/tag/google-cloud-storage", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){return {data:[{tag:{_id:f,_sys:{raw:{createdAt:a,updatedAt:a,firstPublishedAt:a,publishedAt:a},customOrder:g,createdAt:a,updatedAt:a},name:h,slug:i,image:{_id:j,altText:b,description:b,fileName:k,fileSize:l,fileType:m,height:c,metadata:{},src:n,title:b,width:c}},posts:[],notes:[{_id:"636170453548a57ba116761e",_sys:{raw:{createdAt:"2022-11-01T19:15:17.916Z",updatedAt:d,firstPublishedAt:o,publishedAt:d},customOrder:3,createdAt:o,updatedAt:d},title:"GCSにアップロードしたPDFのリンクが勝手にダウンロードしてしまう",slug:"gcs-pdf-open-another-tab",body:"\u003Ch2\u003E問題\u003C\u002Fh2\u003E\n\u003Cp\u003EGoogleCloudStorageでアップロードしたpdfのリンクをクリックするとPDF viewerが開かずにダウンロードされる。\u003C\u002Fp\u003E\n\u003Ch2\u003E原因\u003C\u002Fh2\u003E\n\u003Cp\u003Eファイルアップロード時に、\u003Ccode\u003EContent-Type\u003C\u002Fcode\u003Eを明示的に指定しないと、\u003Ccode\u003EContent-Type\u003C\u002Fcode\u003Eが勝手に\u003Ccode\u003Eapplication\u002Foctet-stream\u003C\u002Fcode\u003Eとなってしまい、ファイルの種類が分からないが故に、ダウンロードしてしまうようです。\u003C\u002Fp\u003E\n\u003Cp\u003EGoogle Cloud Storageで「種類」をしていすることでPDF Viewerで開くことができます。\u003C\u002Fp\u003E\n\u003Ch2\u003E解決策\u003C\u002Fh2\u003E\n\u003Cp\u003Eプログラムで明示的にContentTypeを指定します。\u003C\u002Fp\u003E\n\u003Ch3\u003EGCSから設定する場合\u003C\u002Fh3\u003E\n\u003Cp\u003Eオブジェクトの詳細から、「メタデータを編集」をクリックします。その際に開くモーダルウインドウでContent-Typeを指定します。\u003C\u002Fp\u003E\n\u003Ch3\u003EC#の例\u003C\u002Fh3\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-cs\"\u003Estorage.UploadObject(bucketName, objectName, contentType, FileSource);\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003Eコマンド\u003C\u002Fh3\u003E\n\u003Cp\u003Eすでにアップロードしているファイルは、以下のコマンドで一括変更が可能\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-bash\"\u003Egsutil ls &quot;gs:\u002F\u002Fmy-bucket-name\u002Ffolder-name\u002F&quot; \\\n| grep &quot;\\.pdf&quot; \\\n| xargs -I {} gsutil setmeta -h &quot;Content-Type: application\u002Fpdf&quot; &quot;{}&quot;\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n",author:{_id:"61a7359d8131ac001847fbb4",_sys:{raw:{createdAt:e,updatedAt:"2022-08-21T16:42:17.357Z",firstPublishedAt:e,publishedAt:p},createdAt:e,updatedAt:p},name:q,slug:q,biography:"\u003Cp\u003EWebエンジニアです。\u003C\u002Fp\u003E\u003Cp\u003Eよろしくお願いします。\u003C\u002Fp\u003E",image:null},tags:[{_id:f,_sys:{raw:{createdAt:a,updatedAt:a,firstPublishedAt:a,publishedAt:a},customOrder:g,createdAt:a,updatedAt:a},name:h,slug:i,image:{_id:j,altText:b,description:b,fileName:k,fileSize:l,fileType:m,height:c,metadata:{},src:n,title:b,width:c}}]}]}],fetch:{},mutations:void 0}}("2022-11-01T19:25:13.490Z","",24,"2022-11-01T19:27:41.821Z","2021-12-01T08:43:09.433Z","636172993548a57ba116a49e",13,"Google Cloud Storage","google-cloud-storage","6361727b3548a57ba116a3b5","cloud_storage.svg",745,"image\u002Fsvg+xml","https:\u002F\u002Fik.imagekit.io\u002Fmasahikoproject\u002F966a47dd-970a-4d41-a073-d8515f12d909\u002Fcloud_storage.svg","2022-11-01T19:25:21.280Z","2022-08-21T16:40:12.899Z","masa")));