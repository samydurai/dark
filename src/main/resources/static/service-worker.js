!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=8)}([function(e,t,n){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}},function(e,t,n){e.exports=n(7)},function(e,t,n){"use strict";try{self["workbox:navigation-preload:5.1.3"]&&_()}catch(e){}},function(e,t){function n(e,t,n,r,o,s,i){try{var a=e[s](i),c=a.value}catch(e){return void n(e)}a.done?t(c):Promise.resolve(c).then(r,o)}e.exports=function(e){return function(){var t=this,r=arguments;return new Promise((function(o,s){var i=e.apply(t,r);function a(e){n(i,o,s,a,c,"next",e)}function c(e){n(i,o,s,a,c,"throw",e)}a(void 0)}))}}},function(e,t,n){var r=function(e){"use strict";var t=Object.prototype,n=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",s=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function a(e,t,n,r){var o=t&&t.prototype instanceof h?t:h,s=Object.create(o.prototype),i=new b(r||[]);return s._invoke=function(e,t,n){var r="suspendedStart";return function(o,s){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw s;return R()}for(n.method=o,n.arg=s;;){var i=n.delegate;if(i){var a=m(i,n);if(a){if(a===u)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var h=c(e,t,n);if("normal"===h.type){if(r=n.done?"completed":"suspendedYield",h.arg===u)continue;return{value:h.arg,done:n.done}}"throw"===h.type&&(r="completed",n.method="throw",n.arg=h.arg)}}}(e,n,i),s}function c(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=a;var u={};function h(){}function l(){}function f(){}var d={};d[o]=function(){return this};var p=Object.getPrototypeOf,y=p&&p(p(x([])));y&&y!==t&&n.call(y,o)&&(d=y);var g=f.prototype=h.prototype=Object.create(d);function w(e){["next","throw","return"].forEach((function(t){e[t]=function(e){return this._invoke(t,e)}}))}function v(e,t){var r;this._invoke=function(o,s){function i(){return new t((function(r,i){!function r(o,s,i,a){var u=c(e[o],e,s);if("throw"!==u.type){var h=u.arg,l=h.value;return l&&"object"==typeof l&&n.call(l,"__await")?t.resolve(l.__await).then((function(e){r("next",e,i,a)}),(function(e){r("throw",e,i,a)})):t.resolve(l).then((function(e){h.value=e,i(h)}),(function(e){return r("throw",e,i,a)}))}a(u.arg)}(o,s,r,i)}))}return r=r?r.then(i,i):i()}}function m(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,m(e,t),"throw"===t.method))return u;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var r=c(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,u;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,u):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,u)}function _(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function b(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(_,this),this.reset(!0)}function x(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,s=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return s.next=s}}return{next:R}}function R(){return{value:void 0,done:!0}}return l.prototype=g.constructor=f,f.constructor=l,f[i]=l.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===l||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,f):(e.__proto__=f,i in e||(e[i]="GeneratorFunction")),e.prototype=Object.create(g),e},e.awrap=function(e){return{__await:e}},w(v.prototype),v.prototype[s]=function(){return this},e.AsyncIterator=v,e.async=function(t,n,r,o,s){void 0===s&&(s=Promise);var i=new v(a(t,n,r,o),s);return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},w(g),g[i]="Generator",g[o]=function(){return this},g.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=x,b.prototype={constructor:b,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return i.type="throw",i.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var s=this.tryEntries[o],i=s.completion;if("root"===s.tryLoc)return r("end");if(s.tryLoc<=this.prev){var a=n.call(s,"catchLoc"),c=n.call(s,"finallyLoc");if(a&&c){if(this.prev<s.catchLoc)return r(s.catchLoc,!0);if(this.prev<s.finallyLoc)return r(s.finallyLoc)}else if(a){if(this.prev<s.catchLoc)return r(s.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return r(s.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var s=o;break}}s&&("break"===e||"continue"===e)&&s.tryLoc<=t&&t<=s.finallyLoc&&(s=null);var i=s?s.completion:{};return i.type=e,i.arg=t,s?(this.method="next",this.next=s.finallyLoc,u):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),u},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),L(n),u}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:x(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),u}},e}(e.exports);try{regeneratorRuntime=r}catch(e){Function("r","regeneratorRuntime = r")(r)}},function(e,t,n){"use strict";n.r(t);var r=n(4),o=n.n(r),s=n(6),i=n.n(s);n(0);n(5);function a(){return Boolean(self.registration&&self.registration.navigationPreload)}n(1);const c=[],u={get:()=>c,add(e){c.push(...e)}};const h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[h.prefix,e,h.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||l(h.precache),d=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),p=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n};class y extends Error{constructor(e,t){super(p(e,t)),this.name=e,this.details=t}}const g=new Set;const w=(e,t)=>e.filter(e=>t in e),v=async({request:e,mode:t,plugins:n=[]})=>{const r=w(n,"cacheKeyWillBeUsed");let o=e;for(const e of r)o=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:o}),"string"==typeof o&&(o=new Request(o));return o},m=async({cacheName:e,request:t,event:n,matchOptions:r,plugins:o=[]})=>{const s=await self.caches.open(e),i=await v({plugins:o,request:t,mode:"read"});let a=await s.match(i,r);for(const t of o)if("cachedResponseWillBeUsed"in t){const o=t.cachedResponseWillBeUsed;a=await o.call(t,{cacheName:e,event:n,matchOptions:r,cachedResponse:a,request:i})}return a},_=async({cacheName:e,request:t,response:n,event:r,plugins:o=[],matchOptions:s})=>{const i=await v({plugins:o,request:t,mode:"write"});if(!n)throw new y("cache-put-with-no-response",{url:d(i.url)});const a=await(async({request:e,response:t,event:n,plugins:r=[]})=>{let o=t,s=!1;for(const t of r)if("cacheWillUpdate"in t){s=!0;const r=t.cacheWillUpdate;if(o=await r.call(t,{request:e,response:o,event:n}),!o)break}return s||(o=o&&200===o.status?o:void 0),o||null})({event:r,plugins:o,response:n,request:i});if(!a)return void 0;const c=await self.caches.open(e),u=w(o,"cacheDidUpdate"),h=u.length>0?await m({cacheName:e,matchOptions:s,request:i}):null;try{await c.put(i,a)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const t of u)await t.cacheDidUpdate.call(t,{cacheName:e,event:r,oldResponse:h,newResponse:a,request:i})},L=async({request:e,fetchOptions:t,event:n,plugins:r=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const o=w(r,"fetchDidFail"),s=o.length>0?e.clone():null;try{for(const t of r)if("requestWillFetch"in t){const r=t.requestWillFetch,o=e.clone();e=await r.call(t,{request:o,event:n})}}catch(e){throw new y("plugin-error-request-will-fetch",{thrownError:e})}const i=e.clone();try{let o;o="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of r)"fetchDidSucceed"in e&&(o=await e.fetchDidSucceed.call(e,{event:n,request:i,response:o}));return o}catch(e){0;for(const t of o)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:s.clone(),request:i.clone()});throw e}};let b;async function x(e,t){const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},o=t?t(r):r,s=function(){if(void 0===b){const e=new Response("");if("body"in e)try{new Response(e.body),b=!0}catch(e){b=!1}b=!1}return b}()?n.body:await n.blob();return new Response(s,o)}function R(e){if(!e)throw new y("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new y("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(n,location.href),o=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",t),{cacheKey:r.href,url:o.href}}class q{constructor(e){this._cacheName=f(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:r}=R(n),o="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==e)throw new y("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new y("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(r,e),this._urlsToCacheModes.set(r,o),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],r=[],o=await self.caches.open(this._cacheName),s=await o.keys(),i=new Set(s.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)i.has(t)?r.push(e):n.push({cacheKey:t,url:e});const a=n.map(({cacheKey:n,url:r})=>{const o=this._cacheKeysToIntegrities.get(n),s=this._urlsToCacheModes.get(r);return this._addURLToCache({cacheKey:n,cacheMode:s,event:e,integrity:o,plugins:t,url:r})});await Promise.all(a);return{updatedURLs:n.map(e=>e.url),notUpdatedURLs:r}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),r=[];for(const o of t)n.has(o.url)||(await e.delete(o),r.push(o.url));return{deletedURLs:r}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:r,plugins:o,integrity:s}){const i=new Request(t,{integrity:s,cache:n,credentials:"same-origin"});let a,c=await L({event:r,plugins:o,request:i});for(const e of o||[])"cacheWillUpdate"in e&&(a=e);if(!(a?await a.cacheWillUpdate({event:r,request:i,response:c}):c.status<400))throw new y("bad-precaching-response",{url:t,status:c.status});c.redirected&&(c=await x(c)),await _({event:r,plugins:o,response:c,request:e===t?i:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new y("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new y("non-precached-url",{url:e});const n=this.createHandler(t),r=new Request(e);return()=>n({request:r})}}let E;const U=()=>(E||(E=new q),E);const T=(e,t)=>{const n=U().getURLsToCacheKeys();for(const r of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:r,urlManipulation:o}={}){const s=new URL(e,location.href);s.hash="",yield s.href;const i=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(s,t);if(yield i.href,n&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=n,yield e.href}if(r){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(o){const e=o({url:s});for(const t of e)yield t.href}}(e,t)){const e=n.get(r);if(e)return e}};let O=!1;function K(e){O||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:r}={})=>{const o=f();self.addEventListener("fetch",s=>{const i=T(s.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:r});if(!i)return void 0;let a=self.caches.open(o).then(e=>e.match(i)).then(e=>e||fetch(i));s.respondWith(a)})})(e),O=!0)}const N=e=>{const t=U(),n=u.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},P=e=>{const t=U();e.waitUntil(t.activate())};n(2);const C=e=>e&&"object"==typeof e?e:{handle:e};class M{constructor(e,t,n="GET"){this.handler=C(t),this.match=e,this.method=n}}class j extends M{constructor(e,t,n){super(({url:t})=>{const n=e.exec(t.href);if(n&&(t.origin===location.origin||0===n.index))return n.slice(1)},t,n)}}class k{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const n=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(n),e.ports&&e.ports[0]&&n.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return void 0;const{params:r,route:o}=this.findMatchingRoute({url:n,request:e,event:t});let s=o&&o.handler;if(!s&&this._defaultHandler&&(s=this._defaultHandler),!s)return void 0;let i;try{i=s.handle({url:n,request:e,event:t,params:r})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this._catchHandler&&(i=i.catch(r=>this._catchHandler.handle({url:n,request:e,event:t}))),i}findMatchingRoute({url:e,request:t,event:n}){const r=this._routes.get(t.method)||[];for(const o of r){let r;const s=o.match({url:e,request:t,event:n});if(s)return r=s,(Array.isArray(s)&&0===s.length||s.constructor===Object&&0===Object.keys(s).length||"boolean"==typeof s)&&(r=void 0),{route:o,params:r}}return{}}setDefaultHandler(e){this._defaultHandler=C(e)}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new y("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new y("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let S;const W=()=>(S||(S=new k,S.addFetchListener(),S.addCacheListener()),S);class F{constructor(e,t,{onupgradeneeded:n,onversionchange:r}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=n,this._onversionchange=r||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let n=!1;setTimeout(()=>{n=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const r=indexedDB.open(this._name,this._version);r.onerror=()=>t(r.error),r.onupgradeneeded=e=>{n?(r.transaction.abort(),r.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},r.onsuccess=()=>{const t=r.result;n?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,n){return await this.getAllMatching(e,{query:t,count:n})}async getAllKeys(e,t,n){return(await this.getAllMatching(e,{query:t,count:n,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:n=null,direction:r="next",count:o,includeKeys:s=!1}={}){return await this.transaction([e],"readonly",(i,a)=>{const c=i.objectStore(e),u=t?c.index(t):c,h=[],l=u.openCursor(n,r);l.onsuccess=()=>{const e=l.result;e?(h.push(s?e:e.value),o&&h.length>=o?a(h):e.continue()):a(h)}})}async transaction(e,t,n){return await this.open(),await new Promise((r,o)=>{const s=this._db.transaction(e,t);s.onabort=()=>o(s.error),s.oncomplete=()=>r(),n(s,e=>r(e))})}async _call(e,t,n,...r){return await this.transaction([t],n,(n,o)=>{const s=n.objectStore(t),i=s[e].apply(s,r);i.onsuccess=()=>o(i.result)})}close(){this._db&&(this._db.close(),this._db=null)}}F.prototype.OPEN_TIMEOUT=2e3;const I={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(I))for(const n of t)n in IDBObjectStore.prototype&&(F.prototype[n]=async function(t,...r){return await this._call(n,t,e,...r)});n(3);var A;self.addEventListener("install",function(){var e=i()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.waitUntil(caches.open("offline-html").then((function(e){return e.add("/offline.html")})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),a()&&self.addEventListener("activate",e=>{e.waitUntil(self.registration.navigationPreload.enable().then(()=>{A&&self.registration.navigationPreload.setHeaderValue(A)}))});var H,B=new class{constructor(e={}){this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions}async handle({event:e,request:t}){let n,r;"string"==typeof t&&(t=new Request(t));try{r=await L({request:t,event:e,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){n=e}if(!r)throw new y("no-response",{url:t.url,error:n});return r}},D=function(){var e=i()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B.handle(t);case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",caches.match("/offline.html",{cacheName:"offline-html"}));case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}();!function(e,t,n){let r;if("string"==typeof e){const o=new URL(e,location.href);0;r=new M(({url:e})=>e.href===o.href,t,n)}else if(e instanceof RegExp)r=new j(e,t,n);else if("function"==typeof e)r=new M(e,t,n);else{if(!(e instanceof M))throw new y("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}W().registerRoute(r)}(new class extends M{constructor(e,{allowlist:t=[/./],denylist:n=[]}={}){super(e=>this._match(e),e),this._allowlist=t,this._denylist=n}_match({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const n=e.pathname+e.search;for(const e of this._denylist)if(e.test(n))return!1;return!!this._allowlist.some(e=>e.test(n))}}(D)),function(e){U().addToCacheList(e),e.length>0&&(self.addEventListener("install",N),self.addEventListener("activate",P))}([{'revision':'e0aab6e98fd3cf15cc0eb2eb5ece0003','url':'/0.80f4f7262558fed5b3af.bundle.js'},{'revision':'4aa24a9b78f1a8105394d903305f9d97','url':'/2.80f4f7262558fed5b3af.bundle.js'},{'revision':'bc46ce4b3ea21db94a7067ea329c0080','url':'/3.80f4f7262558fed5b3af.bundle.js'},{'revision':'81a8ff10fbc03cc05889da5b7fcbd80d','url':'/4.80f4f7262558fed5b3af.bundle.js'},{'revision':'ec23d7606bc0407685d1bf066d1ef37d','url':'/5.80f4f7262558fed5b3af.bundle.js'},{'revision':'b37085c754a95a49c44f9e165ede05c0','url':'/6.80f4f7262558fed5b3af.bundle.js'},{'revision':'ddd414726c70f2e9a6f6c6bffb85a8cc','url':'/7.80f4f7262558fed5b3af.bundle.js'},{'revision':'4be3e5335da8d4e866ac6a9be632a39a','url':'/a385af8355a57c13d813696abde08fa8.mp3'},{'revision':'9f914b6c575040502c390a0de89c518d','url':'/b7d90e95184fbe07ad911a979fe37402.jpg'},{'revision':'bb4e622f5bb6326eef1085a854b6143c','url':'/c1f55f0b0d0a04bdfc1c8024931e0bd3.webp'},{'revision':'e11dfcb828ccdf7ab9fec2eab7d9d0d1','url':'/favicon.ico'},{'revision':'354358cefc19f24893d6f9fd7d033ea3','url':'/index.html'},{'revision':'977f9fed6cd44b8c8d62caf661664af7','url':'/main.80f4f7262558fed5b3af.bundle.js'},{'revision':'db84d34bb718a3b51a68cc96049f1b2e','url':'/manifest.webmanifest'},{'revision':'a00dc6773fec5c597990d1845df0b355','url':'/offline.html'},{'revision':'9c0d3c5124d8c7820f501b350aa0a9ea','url':'/wolf_128.png'},{'revision':'5b7aa88f01b3757337802b0003c4f4d3','url':'/wolf_192.png'},{'revision':'032e3837be786dcaffc4900d93e3e7d4','url':'/wolf_512.png'}]),K(H),self.addEventListener("activate",()=>self.clients.claim()),self.addEventListener("install",()=>self.skipWaiting())}]);