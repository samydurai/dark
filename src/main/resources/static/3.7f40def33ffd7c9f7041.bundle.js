(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{103:function(e,t,n){var r=n(130).Symbol;e.exports=r},109:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(104),o=n.n(r),a=n(0);function l(e){const[t,n]=Object(a.useState)({data:null,isLoading:!1,err:null});return Object(a.useEffect)(()=>{const{data:t,url:r,method:a}=e||{};r&&a&&(n({data:null,isLoading:!0,err:null}),o()({url:r,method:a,data:t}).then(e=>n({data:e,isLoading:!1,err:null})).catch(e=>{n({data:null,isLoading:!1,err:e.response.data.failureReason})}))},[e]),[t.data,t.err,t.isLoading]}},118:function(e,t,n){"use strict";var r=n(13),o=n(8);const a=r.b.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  padding: 20px;
  background-color: ${o.b};
  box-shadow: 0 8px 6px -6px black;
  border-radius: 5px;
`;t.a=a},119:function(e,t,n){"use strict";var r=n(13),o=n(8);const a=r.b.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: ${o.a};
`;t.a=a},120:function(e,t,n){"use strict";var r=n(13),o=n(8);const a=r.b.div`
  padding: 0.75rem 1.25rem;
  color: ${o.i};
  background-color: ${o.d};
  border: 1px solid ${o.j};
  border-radius: 5px;
`;t.a=a},121:function(e,t,n){"use strict";var r=n(243),o=n(249);const a=Object(o.a)(r.a)({marginBottom:"25px",width:"250px"});t.a=a},126:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var r=n(0),o=n(139),a=n.n(o),l=n(140),c=n.n(l),i=n(221),u=n(223),s=n(250),d=n(251),f=n(127),p=n.n(f),b=n(218),v=n(220);function m(e){const[t,n]=Object(r.useState)(!1),o=Object(r.useCallback)(()=>{n(e=>!e)},[]),l=p()();return r.createElement(b.a,{variant:"outlined",style:{width:"250px",marginBottom:"25px"},error:e.error},r.createElement(d.a,{htmlFor:e.id||l,color:e.color,variant:"outlined",error:e.error},e.label),r.createElement(s.a,Object.assign({},e,{id:e.id||l,type:t?"text":"password",endAdornment:r.createElement(i.a,{position:"end"},r.createElement(u.a,{"aria-label":"toggle password visibility",onClick:o,type:"button"},t?r.createElement(a.a,null):r.createElement(c.a,null)))})),r.createElement(v.a,null,e.helperText))}},127:function(e,t,n){var r=n(128),o=0;e.exports=function(e){var t=++o;return r(e)+t}},128:function(e,t,n){var r=n(129);e.exports=function(e){return null==e?"":r(e)}},129:function(e,t,n){var r=n(103),o=n(132),a=n(133),l=n(134),c=r?r.prototype:void 0,i=c?c.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(a(t))return o(t,e)+"";if(l(t))return i?i.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n}},130:function(e,t,n){var r=n(131),o="object"==typeof self&&self&&self.Object===Object&&self,a=r||o||Function("return this")();e.exports=a},131:function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n(47))},132:function(e,t){e.exports=function(e,t){for(var n=-1,r=null==e?0:e.length,o=Array(r);++n<r;)o[n]=t(e[n],n,e);return o}},133:function(e,t){var n=Array.isArray;e.exports=n},134:function(e,t,n){var r=n(135),o=n(138);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},135:function(e,t,n){var r=n(103),o=n(136),a=n(137),l=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":l&&l in Object(e)?o(e):a(e)}},136:function(e,t,n){var r=n(103),o=Object.prototype,a=o.hasOwnProperty,l=o.toString,c=r?r.toStringTag:void 0;e.exports=function(e){var t=a.call(e,c),n=e[c];try{e[c]=void 0;var r=!0}catch(e){}var o=l.call(e);return r&&(t?e[c]=n:delete e[c]),o}},137:function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},138:function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},139:function(e,t,n){"use strict";var r=n(99);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(0)),a=(0,r(n(100)).default)(o.default.createElement("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.default=a},140:function(e,t,n){"use strict";var r=n(99);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(0)),a=(0,r(n(100)).default)(o.default.createElement("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.default=a},141:function(e,t,n){"use strict";const r=n(13).b.form`
  display: flex;
  flex-flow: column;
`;t.a=r},248:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return y}));var r=n(0),o=n(3),a=n(224),l=n(118),c=n(119),i=n(120),u=n(121),s=n(126),d=n(141),f=n(26),p=n(109),b=n(13),v=n(37),m=n(8);const x=b.b.span`
  color: ${m.h};
`,g=Object(b.b)(v.b)`
  text-decoration: none;
  color: ${m.l};
`;function y(){const[e,t]=Object(r.useState)(""),[n,b]=Object(r.useState)(""),[v,m]=Object(r.useState)(null),[y,j]=Object(p.a)(v);Object(r.useEffect)(()=>{y&&Object(f.b)()},[y]);const h=Object(r.useCallback)(t=>{t.preventDefault(),m({url:"/api/authenticate",method:"post",data:{username:e,password:n}})},[m,e,n]);return y?r.createElement(o.a,{to:"/chat"}):r.createElement(c.a,null,r.createElement(l.a,null,r.createElement(d.a,{onSubmit:h},r.createElement(u.a,{color:"secondary",label:"ID",variant:"outlined",value:e,onChange:e=>{t(e.target.value)},spellCheck:!1}),r.createElement(s.a,{label:"Password",color:"secondary",onChange:e=>{b(e.target.value)},value:n}),r.createElement(a.a,{color:"primary",type:"submit",onClick:h},r.createElement("b",null,"Login")))),r.createElement("div",{style:{marginTop:"10px"}},r.createElement(x,null,"New User? "),r.createElement(g,{to:"/register"},"Sign Up")),r.createElement("br",null),j&&r.createElement(i.a,null,j))}}}]);