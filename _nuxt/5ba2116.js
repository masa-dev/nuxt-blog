(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{387:function(t,e,n){var content=n(419);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(68).default)("d76d638c",content,!0,{sourceMap:!1})},418:function(t,e,n){"use strict";n(387)},419:function(t,e,n){var r=n(67)(!1);r.push([t.i,".note-tag-list[data-v-22f45da0]{display:flex;flex-wrap:wrap}",""]),t.exports=r},432:function(t,e,n){"use strict";n.r(e);n(76),n(17),n(25),n(69),n(55),n(10),n(5),n(70),n(77),n(56);var r=n(35),o=n(19),c=n(20),l=n(40),f=n(51),d=n(28),y=n(27),v=(n(94),n(4),n(1),n(13),n(358)),h=n(95),m=n.n(h),_=n(383),j=n(386);function w(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return O(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return O(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function O(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var A=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(y.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},C=function(t){Object(l.a)(f,t);var e,n=x(f);function f(){return Object(o.a)(this,f),n.apply(this,arguments)}return Object(c.a)(f,[{key:"head",value:function(){var t=this.tags?this.tags[0].image.src:"";return{title:"".concat(this.note.title," - Note"),meta:[{property:"og:title",content:this.note.title},{property:"og:image",content:t}],link:[{rel:"canonical",href:"https://masa-dev.net/note/".concat(this.note._id)}]}}},{key:"asyncData",value:(e=Object(r.a)(regeneratorRuntime.mark((function t(e){var n,r,o,c,l,f,d,y,v,h,_,O,x;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.params,r=e.$config,o=e.redirect,c=n.slug,l=r,t.prev=3,t.next=6,m.a.get("".concat(l.apiUrl,"/note/").concat(c),{headers:{Authorization:"Bearer ".concat(l.apiKey)}});case 6:f=t.sent,(d=f.data).body=Object(j.a)(d.body),y=[],v=w(d.tags),t.prev=11,v.s();case 13:if((h=v.n()).done){t.next=21;break}return _=h.value,t.next=17,m.a.get("".concat(l.apiUrl,"/tag/").concat(_._id),{headers:{Authorization:"Bearer ".concat(l.apiKey)}});case 17:O=t.sent,y.push(O.data);case 19:t.next=13;break;case 21:t.next=26;break;case 23:t.prev=23,t.t0=t.catch(11),v.e(t.t0);case 26:return t.prev=26,v.f(),t.finish(26);case 29:return t.abrupt("return",{body:d.body,note:d,tags:y});case 32:t.prev=32,t.t1=t.catch(3),x=t.t1,o(x.response.status,"/note");case 36:case"end":return t.stop()}}),t,null,[[3,32],[11,23,26,29]])}))),function(t){return e.apply(this,arguments)})},{key:"mounted",value:function(){Object(_.a)()}}]),f}(v.Vue),k=C=A([Object(v.Component)({name:"NoteContent"})],C),R=(n(418),n(50)),component=Object(R.a)(k,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"d-flex justify-content-between"},[e("div",{staticClass:"n-container-xl mb-5 px-lg-4"},[e("h1",{staticClass:"mt-4 mb-3 mb-sm-5 font-weight-bold h2-lg"},[t._v(t._s(t.note.title))]),t._v(" "),e("CreateAndUpdateTime",{attrs:{"created-at":t.note._sys.createdAt,"updated-at":t.note._sys.updatedAt}}),t._v(" "),e("div",{staticClass:"note-tag-list"},t._l(t.tags,(function(t){return e("TagIconSmall",{key:t._id,staticClass:"mr-2 mb-2",attrs:{tag:t}})})),1),t._v(" "),e("div",{staticClass:"post-content",domProps:{innerHTML:t._s(t.body)}})],1),t._v(" "),e("ContentSideBar",{attrs:{title:t.note.title,"created-at":t.note._sys.createdAt,"updated-at":t.note._sys.updatedAt}})],1)}),[],!1,null,"22f45da0",null);e.default=component.exports;installComponents(component,{CreateAndUpdateTime:n(377).default,TagIconSmall:n(378).default,ContentSideBar:n(379).default})}}]);