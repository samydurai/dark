(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{196:function(e,t,n){"use strict";var a=n(99);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(0)),l=(0,a(n(100)).default)(o.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"}),"CloseOutlined");t.default=l},247:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return D}));var a=n(0),o=n(223),l=n(196),i=n.n(l),r=n(219),c=n(221),d=n(166),s=n.n(d),u=n(241),b=n(224),p=n(235),h=n(167),m=n.n(h),f=n(13),v=n(229);const x=f.b.div`
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
`,w=Object(f.b)(v.a)`
  height: 40px;
  .MuiListItemIcon-root {
    display: none;
    text-align: end;
  }
  :hover {
    .MuiListItemIcon-root {
      display: block;
    }
  }
`;function g({userId:e,removeFn:t}){return a.createElement(w,{button:!0},a.createElement(x,null,e),a.createElement(p.a,{onClick:t.bind(null,e)},a.createElement(m.a,null)))}var E=n(249),k=n(236),y=n(218),j=n(217),O=n(238),C=n(239),I=n(240),L=n(8);const M=Object(E.a)(y.a)({boxSizing:"border-box",width:"100%",padding:"8px 24px"}),S=Object(E.a)(j.a)({height:"40px"}),z=Object(E.a)(O.a)({backgroundColor:L.b,display:"flex",justifyContent:"space-between",alignItems:"center",height:"64px",boxSizing:"border-box"}),A=f.b.h3`
  color: ${L.k};
`,F=Object(f.b)(C.a)`
  overflow-y: auto;
  scrollbar-color: hsla(0, 0%, 100%, 0.16) transparent;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${L.l};
  }
  ::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`,J=Object(E.a)(k.a)({}),P=Object(E.a)(I.a)({padding:"8px 24px"}),R=Object(E.a)(o.a)({height:"48px",width:"48px"});var T=n(116),$=n(46),_=function(e,t,n,a){return new(n||(n=Promise))((function(o,l){function i(e){try{c(a.next(e))}catch(e){l(e)}}function r(e){try{c(a.throw(e))}catch(e){l(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,r)}c((a=a.apply(e,t||[])).next())}))};function D({open:e,handleClose:t}){const[n,l]=Object(a.useState)([]),d=Object($.b)(),p=Object(a.useRef)();Object(a.useEffect)(()=>{!function(){_(this,void 0,void 0,(function*(){const e=yield T.b.load();l(e)}))}()},[]);const h=Object(a.useCallback)(e=>_(this,void 0,void 0,(function*(){e.preventDefault();const t=p.current.value;!!t&&(yield T.c.check(t))?(l(e=>-1===e.findIndex(e=>e===t)&&t?[...e,t]:e),T.b.add(t)):d("User does not exist"),p.current.value=""})),[l,d]),m=Object(a.useCallback)(e=>_(this,void 0,void 0,(function*(){l(t=>t.filter(t=>t!==e)),T.b.delete(e)})),[l]);return a.createElement(J,{open:e,onClose:t,maxWidth:"sm"},a.createElement(z,{disableTypography:!0},a.createElement(A,null,"Ignore List"),a.createElement(R,{edge:"end",color:"inherit",onClick:t,"aria-label":"close"},a.createElement(i.a,null))),a.createElement("form",{onSubmit:h},a.createElement(M,{variant:"outlined"},a.createElement(S,{id:"message-input",rows:1,placeholder:"Add to Ignore list...",inputRef:p,endAdornment:a.createElement(c.a,{position:"end"},a.createElement(o.a,{onClick:h},a.createElement(s.a,{style:{width:"0.5em",height:"0.5em"}})))}))),a.createElement(P,null,"This contains the list of users that you have ignored. You will not be able to recieve messages from ignored users."),a.createElement(F,{style:{padding:"0px 24px"}},a.createElement(r.a,{style:{padding:"0px"}},n.map((e,t)=>a.createElement(g,{userId:e,key:t,removeFn:m.bind(this,e)})))),a.createElement(u.a,null,a.createElement(b.a,{onClick:t,color:"primary"},a.createElement("b",null,"Close"))))}}}]);