(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{109:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(105),c=n.n(a),l=n(0);function s(e){const[t,n]=Object(l.useState)({data:null,isLoading:!1,err:null});return Object(l.useEffect)(()=>{const{data:t,url:a,method:l}=e||{};a&&l&&(n({data:null,isLoading:!0,err:null}),c()({url:a,method:l,data:t}).then(e=>n({data:e,isLoading:!1,err:null})).catch(e=>{n({data:null,isLoading:!1,err:e.response.data.failureReason})}))},[e]),[t.data,t.err,t.isLoading]}},142:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return u}));var a=n(105),c=n.n(a);const l=c.a.create({baseURL:"/api/flow/watch"}),s=c.a.create({baseURL:"/api/flow/ignore"}),o=c.a.create({baseURL:"/api/flow/user"}),r={load:()=>l.get("/").then(e=>e.data),add:e=>l.post("/",{watch:[e]}),delete:e=>l.post("/",{unwatch:[e]})},i={load:()=>s.get("/").then(e=>e.data),add:e=>s.post("/",{ignore:[e]}),delete:e=>s.post("/",{enable:[e]})},u={check:e=>o.get(`/${e}/check`).then(e=>e.data)}},242:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(3),l=n(226),s=n(227),o=n(197),r=n(228),i=n(223),u=n(189),b=n.n(u),d=n(13),m=n(8);const g=d.b.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
`,f=d.b.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 64px);
`,E=d.b.h3`
  flex-grow: 1;
  color: ${m.k};
`;var h=n(109);const p=Object(a.lazy)(()=>n.e(6).then(n.bind(null,247)));var O=n(50),v=n(52),j=n(190),x=n(26),w=n(142),C=n(46),S=function(e,t,n,a){return new(n||(n=Promise))((function(c,l){function s(e){try{r(a.next(e))}catch(e){l(e)}}function o(e){try{r(a.throw(e))}catch(e){l(e)}}function r(e){var t;e.done?c(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,o)}r((a=a.apply(e,t||[])).next())}))};function y(e){const[t,n]=Object(a.useState)([]),c=Object(C.b)(),l=Object(a.useCallback)(e=>{n(t=>t.map(t=>t.username!==e.username?t:e))},[]);Object(a.useEffect)(()=>{!function(){S(this,void 0,void 0,(function*(){const e=yield w.c.load();n(e)}))}()},[]),Object(a.useEffect)(()=>{var t;e&&(t=l,N.subscribe("/user/queue/status",e=>{t(JSON.parse(e.body))}))},[l,e]);const s=Object(a.useCallback)((e,t)=>{t.stopPropagation(),n(t=>t.filter(t=>t.username!==e)),(e=>{w.c.delete(e)})(e)},[]),o=Object(a.useCallback)(e=>S(this,void 0,void 0,(function*(){if("string"==typeof e&&e){(yield w.b.check(e))?(n(t=>-1!==t.findIndex(t=>t.username===e)?t:[...t,{username:e,userStatus:k.OFFLINE}]),(e=>{w.c.add(e)})(e)):c("User does not exist")}})),[c]);return{list:t,updateUserStatus:l,removeUserFromWatchList:s,addUserToWatchList:o}}var k;!function(e){e.ONLINE="ONLINE",e.OFFLINE="OFFLINE"}(k||(k={}));let N=null,I=null;function T(e){N.deactivate(),e(!1),clearInterval(I)}var A;!function(e){e[e.OPEN=0]="OPEN",e[e.CLOSE=1]="CLOSE",e[e.MESSAGE_RECEIVED=2]="MESSAGE_RECEIVED",e[e.MESSAGE_SENT=3]="MESSAGE_SENT",e[e.CLEAR_UNREAD_MESSAGES=4]="CLEAR_UNREAD_MESSAGES",e[e.CHANGE_TAB=5]="CHANGE_TAB",e[e.CHANGE_CONNECTION_STATE=6]="CHANGE_CONNECTION_STATE"}(A||(A={}));const M={activeTab:null,tabs:[],messages:{},isConnected:!1};function L(e,t,n){return e.map(e=>(e.userId!==t||(e.unreadMessages=void 0===n?e.unreadMessages+1:n),e))}function R(e,t){var n;switch(t.action){case A.OPEN:return e.tabs.findIndex(e=>e.userId===t.tab.userId)>=0?Object.assign(Object.assign({},e),{activeTab:t.tab.userId}):Object.assign(Object.assign({},e),{tabs:[...e.tabs,t.tab]});case A.CLOSE:const a=e.tabs.filter(e=>t.tab.userId!==e.userId);return Object.assign(Object.assign({},e),{tabs:a,activeTab:null===(n=a[a.length-1])||void 0===n?void 0:n.userId});case A.MESSAGE_RECEIVED:const c=t.message.from,l=e.messages[c]||[],s=e.activeTab===c,o=!e.activeTab,r=-1!==e.tabs.findIndex(e=>e.userId===c);let i=Object.assign(Object.assign({},e),{messages:Object.assign(Object.assign({},e.messages),{[c]:[...l,t.message]})});return s||(r&&(i=Object.assign(Object.assign({},i),{tabs:L(i.tabs,c)})),r||(i=Object.assign(Object.assign({},i),{tabs:[...i.tabs,{userId:c,unreadMessages:1}]})),o&&(i=Object.assign(Object.assign({},i),{activeTab:c,tabs:L(i.tabs,c,0)}))),i;case A.MESSAGE_SENT:const u=e.messages[t.message.to]||[];return u.push(t.message),Object.assign(Object.assign({},e),{messages:Object.assign(Object.assign({},e.messages),{[t.message.to]:u})});case A.CHANGE_TAB:return Object.assign(Object.assign({},e),{activeTab:t.activeTab,tabs:L(e.tabs,t.activeTab,0)});case A.CHANGE_CONNECTION_STATE:return Object.assign(Object.assign({},e),{isConnected:t.connectionState});default:return e}}function _(){const[e,t]=Object(a.useReducer)(R,M);return{state:e,openChatWindow:Object(a.useCallback)((e,n)=>{t({action:A.OPEN,tab:e}),"boolean"==typeof n&&n&&t({action:A.CHANGE_TAB,activeTab:e.userId})},[t]),closeChatWindow:Object(a.useCallback)(e=>{t({action:A.CLOSE,tab:e})},[t]),sendMessage:Object(a.useCallback)(e=>{t({action:A.MESSAGE_SENT,message:e}),function(e){N.publish({destination:"/app/chat",body:JSON.stringify(e)})}(e)},[t]),receiveMessage:Object(a.useCallback)(e=>{Object(O.b)(),Object(v.b)(e),t({action:A.MESSAGE_RECEIVED,message:e})},[t]),changeActiveTab:Object(a.useCallback)(e=>{t({action:A.CHANGE_TAB,activeTab:e})},[t]),changeConnectionState:Object(a.useCallback)(e=>{t({action:A.CHANGE_CONNECTION_STATE,connectionState:e})},[t])}}var W=n(166),D=n.n(W),G=n(244),F=n(51);var H=n(249),U=n(95);const $=Object(H.a)(U.a)({width:"fit-content",maxWidth:"80%",padding:"10px",boxSizing:"border-box",wordBreak:"break-word"}),B=Object(H.a)($)({borderRadius:"0px 4px 4px 4px"}),z=Object(H.a)($)({background:m.e,borderRadius:"4px 0px 4px 4px"}),P=d.b.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  margin-top: ${e=>e.isSame?"3px":"12px"};
`,J=Object(d.b)(P)`
  justify-content: flex-start;
  padding-left: ${e=>e.isSame?"18px":"10px"};
`,V=Object(d.b)(P)`
  justify-content: flex-end;
  padding-right: ${e=>e.isSame?"18px":"10px"};
`,q=Object(d.b)((function({className:e}){return a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 8 13",width:"8",height:"13",className:e},a.createElement("path",{opacity:".13",fill:"#0000000",d:"M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"}),a.createElement("path",{fill:"currentColor",d:"M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"}))}))`
  color: ${m.c};
`,K=Object(d.b)((function({className:e}){return a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 8 13",width:"8",height:"13",className:e},a.createElement("path",{opacity:".13",d:"M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"}),a.createElement("path",{fill:"currentColor",d:"M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"}))}))`
  color: ${m.e};
`;function X({message:e,isSame:t}){const n={isSame:t};return e.from?a.createElement(J,Object.assign({},n),!t&&a.createElement(q,null),a.createElement(B,null,e.message)):a.createElement(V,Object.assign({},n),a.createElement(z,null,e.message),!t&&a.createElement(K,null))}var Y=n(250),Q=n(221),Z=n(191),ee=n.n(Z),te=n(218);const ne=Object(d.b)(te.a)`
    width: 100%;
`;function ae({sendMessage:e,userId:t}){const n=Object(a.useRef)(),c=Object(a.useCallback)(a=>{a.preventDefault();const c=n.current.value.trim();if(c){const a={from:"",to:t,timestamp:(new Date).toISOString(),message:c};n.current.value="",e(a)}},[e,t]);return a.createElement("form",{onSubmit:c},a.createElement(ne,{variant:"outlined"},a.createElement(Y.a,{id:"message-input",rows:1,placeholder:"Type Here...",inputRef:n,endAdornment:a.createElement(Q.a,{position:"end"},a.createElement(i.a,{onClick:c},a.createElement(ee.a,null)))})))}var ce=d.b.div`
  overflow-y: auto;
  scrollbar-color: hsla(0, 0%, 100%, 0.16) transparent;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${m.l};
  }
  ::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;const le=d.b.div`
  display: flex;
  flex-flow: column;
  flex: 1 1 calc(100% - 48px);
  max-height: calc(100% - 48px);
`,se=Object(d.b)(ce)`
  flex: 1 0 calc(100% - 58px);
  flex-flow: column;
  display: flex;
  max-height: calc(100% - 58px);
`;function oe(e){const{value:t,userId:n,messages:c,sendMessage:l}=e,s=Object(a.useRef)();return function(e,t){const n=Object(a.useRef)(),c=Object(a.useCallback)(()=>{n.current=e.current.scrollTop+e.current.clientHeight===e.current.scrollHeight},[e]);Object(a.useEffect)(()=>{e.current.onscroll=Object(F.debounce)(c,100)},[c,e]),Object(a.useEffect)(()=>{const a=Object(F.last)(t);!a||a.from&&!n.current||(e.current.scrollTop=e.current.scrollHeight)},[t.length,t,e])}(s,c),a.createElement(le,{role:"tabpanel",hidden:t!==n,style:{display:t===n?"flex":"none"}},a.createElement(se,{ref:s},c.map((e,t)=>{var n;return a.createElement(X,{key:t,message:e,isSame:e.from===(null===(n=c[t-1])||void 0===n?void 0:n.from)})})),a.createElement(ae,{sendMessage:l,userId:n}))}var re=n(231),ie=n(230),ue=n(192),be=n.n(ue);const de=Object(H.a)(U.a)({"justify-content":"space-between","text-transform":"none"}),me=Object(H.a)(be.a)({height:"0.5em",width:"0.5em"}),ge=d.b.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  div {
    margin: 0px 5px;
    width: 20px;
  }
`;function fe(e){const t=Object(a.useMemo)(()=>Object(a.forwardRef)((function(t,n){return a.createElement(de,Object.assign({ref:n},t,{component:void 0}),e.tab.userId,a.createElement(ge,null,a.createElement("div",null,a.createElement(ie.a,{color:"secondary",badgeContent:e.tab.unreadMessages})),a.createElement(i.a,{onClick:e.closeTab.bind(this,e.tab)},a.createElement(me,null))))})),[e.tab,e.closeTab]);return a.createElement(re.a,Object.assign({component:t},e,{value:e.tab.userId}))}var Ee=n(193),he=n.n(Ee);const pe=d.b.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;function Oe({openDialog:e}){return a.createElement(pe,null,a.createElement(i.a,{onClick:e,color:"primary"},a.createElement(he.a,{style:{height:"2em",width:"2em"}})))}const ve=d.b.div`
  display: flex;
  justify-content: space-between;
  background-color: ${m.c};
`;var je=function(e,t,n,a){return new(n||(n=Promise))((function(c,l){function s(e){try{r(a.next(e))}catch(e){l(e)}}function o(e){try{r(a.throw(e))}catch(e){l(e)}}function r(e){var t;e.done?c(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,o)}r((a=a.apply(e,t||[])).next())}))};const xe=Object(a.lazy)(()=>n.e(7).then(n.bind(null,252)));const we=d.b.div`
  display: flex;
  flex-flow: row;
  height: 100%;
`,Ce=Object(d.b)((function({className:e,state:t,openChatWindow:n,closeChatWindow:c,sendMessage:l,changeActiveTab:s}){const o=Object(C.b)(),[r,u]=Object(a.useState)(!1),b=()=>{u(!0)},d=Object(a.useCallback)(e=>je(this,void 0,void 0,(function*(){if(u(!1),"string"==typeof e&&e){(yield w.b.check(e))?(n({userId:e,unreadMessages:0}),s(e)):o("User does not exist")}})),[o,s,n]),m=Object(a.useCallback)((e,t)=>{t.stopPropagation(),c(e)},[c]);return a.createElement(a.Fragment,null,0!==t.tabs.length&&a.createElement("div",{className:e},a.createElement(ve,null,a.createElement(G.a,{value:t.activeTab,onChange:(e,t)=>{s(t)},variant:"scrollable",scrollButtons:"off"},t.tabs.map((e,t)=>a.createElement(fe,{key:t,tab:e,closeTab:m,value:e.userId}))),a.createElement(i.a,{onClick:b},a.createElement(D.a,null))),t.tabs.map((e,n)=>{const c=t.messages[e.userId]||[];return a.createElement(oe,{value:t.activeTab,key:n,userId:e.userId,messages:c,sendMessage:l})})),0===t.tabs.length&&a.createElement(Oe,{openDialog:b}),r&&a.createElement(xe,{open:r,handleClose:d}))}))`
  flex: 1 0 75%;
  display: flex;
  flex-flow: column;
`;var Se=n(195),ye=n.n(Se),ke=n(234),Ne=n(194),Ie=n.n(Ne),Te=n(254);const Ae=d.b.div`
  flex: 0 0 25%;
  height: 100%;
  max-width: 25%;
  border-left: 1px solid ${m.b};
  max-height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  box-sizing: border-box;
`,Me=d.b.div`
  flex: 0 1 auto;
  height: 100%;
  border-left: 1px solid ${m.b};
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
`,Le=d.b.div`
  padding: 5px;
  writing-mode: vertical-rl;
`,Re=Object(d.b)(Te.a)`
  .MuiDrawer-paper {
    max-width: 60vw;
    width: 60vw;
  }
`;var _e=n(235),We=n(167),De=n.n(We),Ge=n(229);const Fe=d.b.div`
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  color: ${e=>e.isOnline?m.k:m.f};
`,He=Object(d.b)(Ge.a)`
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
`;function Ue({user:e,removeFn:t,openChatWindow:n}){const c={isOnline:e.userStatus===k.ONLINE};return a.createElement(He,{button:!0,onClick:n.bind(null,{userId:e.username,hasNewItems:!1},!0)},a.createElement(Fe,Object.assign({},c),e.username),a.createElement(_e.a,{onClick:t.bind(null,e.username)},a.createElement(De.a,null)))}var $e=n(224);const Be=d.b.div`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
`,ze=d.b.span`
  text-align: center;
`;function Pe({openDialog:e}){return a.createElement(Be,null,a.createElement(ze,null,"It's Empty",a.createElement("br",null),"Click on add button to know when a user comes online",a.createElement("br",null),a.createElement("br",null),a.createElement($e.a,{onClick:e,color:"primary"},a.createElement("b",null,"Add User"))))}var Je=n(236),Ve=n(238),qe=n(239),Ke=n(240),Xe=n(243),Ye=n(241),Qe=n(237);Object(H.a)(Je.a)({".MuiDialog-paper":{"min-width":"400px"}});const Ze=Object(Qe.a)({root:{".MuiDialog-paper":{"min-width":"400px"}}});function et({open:e,handleClose:t}){const n=Object(a.useRef)(),{root:c}=Ze(),l=Object(a.useCallback)(e=>{e.preventDefault(),t(n.current.value)},[t]);return a.createElement(Je.a,{className:c,open:e,onClose:t,"aria-labelledby":"form-dialog-title"},a.createElement(Ve.a,{id:"form-dialog-title"},"Add to watch list"),a.createElement(qe.a,null,a.createElement(Ke.a,null,"Enter the user tag to add user to the watch list. You will be able to see when that user comes online"),a.createElement("form",{onSubmit:l},a.createElement(Xe.a,{autoFocus:!0,margin:"dense",id:"name",label:"User ID",type:"text",inputRef:n,spellCheck:!1,fullWidth:!0}))),a.createElement(Ye.a,null,a.createElement($e.a,{onClick:l},a.createElement("b",null,"Cancel")),a.createElement($e.a,{onClick:l,color:"primary"},a.createElement("b",null,"Add"))))}var tt=n(219);const nt=Object(d.b)(tt.a)``,at=Object(d.b)(ce)`
  flex: 1 0 auto;
  max-height: calc(100% - 48px);
`,ct=(d.b.div`
  border-left: 1px solid ${m.b};
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`,Object(d.b)(Xe.a)`
  flex: 0 0 auto;
`,d.b.div`
  display: flex;
  height: 48px;
  justify-content: space-between;
  padding-left: 10px;
  background-color: ${m.c};
`);var lt,st=(lt=function({openChatWindow:e,connectionState:t}){const{list:n,addUserToWatchList:c,removeUserFromWatchList:l}=y(t),[s,o]=Object(a.useState)(!1),r=Object(a.useCallback)(e=>{o(!1),c(e)},[c]),u=Object(a.useCallback)(t=>t.map((t,n)=>a.createElement(Ue,{key:n,user:t,removeFn:l,openChatWindow:e})),[e,l]);return a.createElement(a.Fragment,null,a.createElement(ct,null,a.createElement("h3",null," Watch List"),a.createElement(i.a,{onClick:o.bind(this,!0)},a.createElement(ye.a,null))),!!n.length&&a.createElement(at,null,a.createElement(nt,null,u(n))),!n.length&&a.createElement(Pe,{openDialog:o.bind(this,!0)}),a.createElement(et,{open:s,handleClose:r}))},function(e){const t=Object(ke.a)("(max-width: 640px)"),[n,c]=Object(a.useState)(!1),l=Object(a.useCallback)(e=>{("keydown"!==e.type||"Tab"!==e.key&&"Shift"!==e.key)&&c(!1)},[c]);return a.createElement(a.Fragment,null,!t&&a.createElement(Ae,null,a.createElement(lt,Object.assign({},e))),t&&a.createElement(a.Fragment,null,a.createElement(Me,{onClick:c.bind(this,!0)},a.createElement(Ie.a,null),a.createElement(Le,null,"Watch List")),a.createElement(Re,{anchor:"right",open:n,onClose:l},a.createElement(lt,Object.assign({},e)))))});t.default=function(e){return function(t){const[n,u]=Object(a.useState)(null),[d,m]=Object(a.useState)(!1),[O,v]=Object(a.useState)(!1),[j]=Object(h.a)(n),x=Object(a.useRef)(),w=Object(a.useCallback)(()=>{m(!1),u({url:"/api/logout",method:"post"})},[u,m]),C=Object(a.useCallback)(()=>{m(!1),v(!0)},[v,m]);return j?a.createElement(c.a,{to:"/login"}):a.createElement(g,null,a.createElement(l.a,{position:"sticky",color:"default"},a.createElement(s.a,null,a.createElement(E,null,"Dark"),a.createElement(i.a,{onClick:m.bind(this,!0),ref:x},a.createElement(b.a,null)),a.createElement(o.a,{anchorEl:x.current,keepMounted:!0,open:d,onClose:m.bind(this,!1)},a.createElement(r.a,{onClick:C},"Ignore List"),a.createElement(r.a,{onClick:w},"Logout"))),O&&a.createElement(p,{open:O,handleClose:v.bind(this,!1)})),a.createElement(f,null,a.createElement(e,Object.assign({},t))))}}((function(){const{state:e,openChatWindow:t,closeChatWindow:n,sendMessage:c,receiveMessage:l,changeActiveTab:s,changeConnectionState:o}=_();return Object(a.useEffect)(()=>(function(e){N=new j.Client({connectHeaders:{"CSRF-TOKEN":x.a.XSRF},debug:function(e){console.log(e)},webSocketFactory:()=>new SockJS(window.location.origin+"/chat"),reconnectDelay:5e9,heartbeatIncoming:4e3,heartbeatOutgoing:4e3}),N.onConnect=function(t){console.log(t),e(!0),I=setInterval(()=>{N.publish({destination:"/app/ping",body:JSON.stringify({userStatus:k.ONLINE})})},5e3)},N.onStompError=function(e){console.log("Broker reported error: "+e.headers.message),console.log("Additional details: "+e.body)},N.activate()}(o),T.bind(this,o)),[o]),Object(a.useEffect)(()=>{var t;e.isConnected&&(t=l,N.subscribe("/user/queue/reply",e=>t(JSON.parse(e.body))))},[e.isConnected,l]),a.createElement(we,null,a.createElement(Ce,{state:e,openChatWindow:t,closeChatWindow:n,sendMessage:c,changeActiveTab:s}),a.createElement(st,{openChatWindow:t,connectionState:e.isConnected}))}))}}]);