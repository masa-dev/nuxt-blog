(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{386:function(t,e,r){var content=r(416);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(70).default)("0e342f93",content,!0,{sourceMap:!1})},415:function(t,e,r){"use strict";r(386)},416:function(t,e,r){var n=r(69)(!1);n.push([t.i,".post-tag-list[data-v-46f6464a]{display:flex;flex-wrap:wrap}.post-thumb-wrapper[data-v-46f6464a]{max-height:480px;text-align:center}.post-thumb-wrapper img[data-v-46f6464a]{max-height:inherit;max-width:100%}",""]),t.exports=n},428:function(t,e,r){"use strict";r.r(e);r(77),r(17),r(24),r(62),r(53),r(11),r(71),r(56);var n=r(35),o=r(19),c=r(20),l=r(40),f=r(50),d=r(28),m=r(27),h=(r(94),r(4),r(1),r(5),r(63),r(13),r(358)),y=r(95),v=r.n(y),w=r(383);function x(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return _(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw o}}}}function _(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}function j(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(f.a)(this,r)}}var O=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},C=function(t){Object(l.a)(f,t);var e,r=j(f);function f(){return Object(o.a)(this,f),r.apply(this,arguments)}return Object(c.a)(f,[{key:"head",value:function(){return{title:"".concat(this.post.title," - Post"),meta:[{property:"og:title",content:this.post.title},{property:"og:image",content:this.post.image?this.post.image.src:"/img/dummy image"},{property:"description",content:this.post.description?this.post.description:""}]}}},{key:"asyncData",value:(e=Object(n.a)(regeneratorRuntime.mark((function t(e){var r,n,o,c,l,f,d,m,h,y,w,_,j;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.params,n=e.$config,o=e.redirect,c=r.slug,l=n,t.prev=3,t.next=6,v.a.get("".concat(l.apiUrl,"/post/").concat(c),{headers:{Authorization:"Bearer ".concat(l.apiKey)}});case 6:f=t.sent,d=f.data,m=[],h=x(d.tags),t.prev=10,h.s();case 12:if((y=h.n()).done){t.next=20;break}return w=y.value,t.next=16,v.a.get("".concat(l.apiUrl,"/tag/").concat(w._id),{headers:{Authorization:"Bearer ".concat(l.apiKey)}});case 16:_=t.sent,m.push(_.data);case 18:t.next=12;break;case 20:t.next=25;break;case 22:t.prev=22,t.t0=t.catch(10),h.e(t.t0);case 25:return t.prev=25,h.f(),t.finish(25);case 28:return t.abrupt("return",{post:d,tags:m});case 31:t.prev=31,t.t1=t.catch(3),j=t.t1,o(j.response.status,"/post");case 35:case"end":return t.stop()}}),t,null,[[3,31],[10,22,25,28]])}))),function(t){return e.apply(this,arguments)})},{key:"mounted",value:function(){Object(w.a)()}}]),f}(h.Vue),A=C=O([Object(h.Component)({name:"PostContent"})],C),k=(r(415),r(55)),component=Object(k.a)(A,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"d-flex justify-content-between"},[e("div",{staticClass:"n-container-xl mb-5 px-lg-4"},[e("h1",{staticClass:"mt-4 mb-3 mb-sm-5 font-weight-bold"},[t._v(t._s(t.post.title))]),t._v(" "),e("div",{staticClass:"mb-4 post-thumb-wrapper"},[t.post.image?e("img",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],staticClass:"d-block mx-auto",attrs:{"data-src":t.post.image.src,alt:t.post.image.alt,width:t.post.image.width,height:t.post.image.height}}):e("img",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],attrs:{"data-src":"/img/dummy.png",alt:"dummy image"}})]),t._v(" "),e("CreateAndUpdateTime",{attrs:{"created-at":t.post._sys.createdAt,"updated-at":t.post._sys.updatedAt}}),t._v(" "),e("div",{staticClass:"post-tag-list"},t._l(t.tags,(function(t){return e("TagIconSmall",{key:t._id,staticClass:"mr-2 mb-2",attrs:{tag:t}})})),1),t._v(" "),e("div",{staticClass:"post-content",domProps:{innerHTML:t._s(t.post.body)}})],1),t._v(" "),e("ContentSideBar",{attrs:{title:t.post.title,"created-at":t.post._sys.createdAt,"updated-at":t.post._sys.updatedAt}})],1)}),[],!1,null,"46f6464a",null);e.default=component.exports;installComponents(component,{CreateAndUpdateTime:r(377).default,TagIconSmall:r(378).default,ContentSideBar:r(379).default})}}]);