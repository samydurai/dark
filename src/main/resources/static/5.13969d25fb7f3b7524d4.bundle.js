(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{104:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(100),c=n.n(a),l=n(0);function s(e){const[t,n]=Object(l.useState)({data:null,isLoading:!1,err:null});return Object(l.useEffect)(()=>{const{data:t,url:a,method:l}=e||{};a&&l&&(n({data:null,isLoading:!0,err:null}),c()({url:a,method:l,data:t}).then(e=>n({data:e,isLoading:!1,err:null})).catch(e=>{n({data:null,isLoading:!1,err:e.response.data.failureReason})}))},[e]),[t.data,t.err,t.isLoading]}},137:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return u}));var a=n(100),c=n.n(a);const l=c.a.create({baseURL:"/api/flow/watch"}),s=c.a.create({baseURL:"/api/flow/ignore"}),o=c.a.create({baseURL:"/api/flow/user"}),r={load:()=>l.get("/").then(e=>e.data),add:e=>l.post("/",{watch:[e]}),delete:e=>l.post("/",{unwatch:[e]})},i={load:()=>s.get("/").then(e=>e.data),add:e=>s.post("/",{ignore:[e]}),delete:e=>s.post("/",{enable:[e]})},u={check:e=>o.get(`/${e}/check`).then(e=>e.data)}},237:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(3),l=n(221),s=n(222),o=n(192),r=n(223),i=n(218),u=n(184),b=n.n(u),d=n(13),m=n(8);const g=d.b.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
`,E=d.b.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 64px);
`,f=d.b.h3`
  flex-grow: 1;
  color: ${m.j};
`;var h=n(104);const p=Object(a.lazy)(()=>n.e(6).then(n.bind(null,242)));var O=n(185),v=n(26),j=n(137),C=n(46),w=function(e,t,n,a){return new(n||(n=Promise))((function(c,l){function s(e){try{r(a.next(e))}catch(e){l(e)}}function o(e){try{r(a.throw(e))}catch(e){l(e)}}function r(e){var t;e.done?c(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,o)}r((a=a.apply(e,t||[])).next())}))};function x(e){const[t,n]=Object(a.useState)([]),c=Object(C.b)(),l=Object(a.useCallback)(e=>{n(t=>t.map(t=>t.username!==e.username?t:e))},[]);Object(a.useEffect)(()=>{!function(){w(this,void 0,void 0,(function*(){const e=yield j.c.load();n(e)}))}()},[]),Object(a.useEffect)(()=>{var t;e&&(t=l,y.subscribe("/user/queue/status",e=>{t(JSON.parse(e.body))}))},[l,e]);const s=Object(a.useCallback)((e,t)=>{t.stopPropagation(),n(t=>t.filter(t=>t.username!==e)),(e=>{j.c.delete(e)})(e)},[]),o=Object(a.useCallback)(e=>w(this,void 0,void 0,(function*(){if("string"==typeof e&&e){(yield j.b.check(e))?(n(t=>-1!==t.findIndex(t=>t.username===e)?t:[...t,{username:e,userStatus:S.OFFLINE}]),(e=>{j.c.add(e)})(e)):c("User does not exist")}})),[c]);return{list:t,updateUserStatus:l,removeUserFromWatchList:s,addUserToWatchList:o}}var S;!function(e){e.ONLINE="ONLINE",e.OFFLINE="OFFLINE"}(S||(S={}));let y=null,k=null;function I(e){y.deactivate(),e(!1),clearInterval(k)}var N;!function(e){e[e.OPEN=0]="OPEN",e[e.CLOSE=1]="CLOSE",e[e.MESSAGE_RECIEVED=2]="MESSAGE_RECIEVED",e[e.MESSAGE_SENT=3]="MESSAGE_SENT",e[e.CLEAR_UNREAD_MESSAGES=4]="CLEAR_UNREAD_MESSAGES",e[e.CHANGE_TAB=5]="CHANGE_TAB",e[e.CHANGE_CONNECTION_STATE=6]="CHANGE_CONNECTION_STATE"}(N||(N={}));const T={activeTab:null,tabs:[],messages:{},isConnected:!1};function A(e,t,n){return e.map(e=>(e.userId!==t||(e.unreadMessages=void 0===n?e.unreadMessages+1:n),e))}function M(e,t){var n;switch(t.action){case N.OPEN:return e.tabs.findIndex(e=>e.userId===t.tab.userId)>=0?Object.assign(Object.assign({},e),{activeTab:t.tab.userId}):Object.assign(Object.assign({},e),{tabs:[...e.tabs,t.tab]});case N.CLOSE:const a=e.tabs.filter(e=>t.tab.userId!==e.userId);return Object.assign(Object.assign({},e),{tabs:a,activeTab:null===(n=a[a.length-1])||void 0===n?void 0:n.userId});case N.MESSAGE_RECIEVED:const c=t.message.from,l=e.messages[c]||[],s=e.activeTab===c,o=!e.activeTab,r=-1!==e.tabs.findIndex(e=>e.userId===c);let i=Object.assign(Object.assign({},e),{messages:Object.assign(Object.assign({},e.messages),{[c]:[...l,t.message]})});return s||(r&&(i=Object.assign(Object.assign({},i),{tabs:A(i.tabs,c)})),r||(i=Object.assign(Object.assign({},i),{tabs:[...i.tabs,{userId:c,unreadMessages:1}]})),o&&(i=Object.assign(Object.assign({},i),{activeTab:c,tabs:A(i.tabs,c,0)}))),i;case N.MESSAGE_SENT:const u=e.messages[t.message.to]||[];return u.push(t.message),Object.assign(Object.assign({},e),{messages:Object.assign(Object.assign({},e.messages),{[t.message.to]:u})});case N.CHANGE_TAB:return Object.assign(Object.assign({},e),{activeTab:t.activeTab,tabs:A(e.tabs,t.activeTab,0)});case N.CHANGE_CONNECTION_STATE:return Object.assign(Object.assign({},e),{isConnected:t.connectionState});default:return e}}function L(){const[e,t]=Object(a.useReducer)(M,T);return{state:e,openChatWindow:Object(a.useCallback)((e,n)=>{t({action:N.OPEN,tab:e}),"boolean"==typeof n&&n&&t({action:N.CHANGE_TAB,activeTab:e.userId})},[t]),closeChatWindow:Object(a.useCallback)(e=>{t({action:N.CLOSE,tab:e})},[t]),sendMessage:Object(a.useCallback)(e=>{t({action:N.MESSAGE_SENT,message:e}),function(e){y.publish({destination:"/app/chat",body:JSON.stringify(e)})}(e)},[t]),recieveMessage:Object(a.useCallback)(e=>{t({action:N.MESSAGE_RECIEVED,message:e})},[t]),changeActiveTab:Object(a.useCallback)(e=>{t({action:N.CHANGE_TAB,activeTab:e})},[t]),changeConnectionState:Object(a.useCallback)(e=>{t({action:N.CHANGE_CONNECTION_STATE,connectionState:e})},[t])}}var _=n(161),R=n.n(_),D=n(239),F=n(244),G=n(90);const W=Object(F.a)(G.a)({alignSelf:"start",width:"fit-content",padding:"10px",margin:"5px"}),U=Object(F.a)(G.a)({alignSelf:"flex-end",width:"fit-content",padding:"5px",margin:"5px",background:"#227F9C"});function H({message:e}){return e.from?a.createElement(W,null,e.message):a.createElement(U,null,e.message)}var $=n(245),P=n(216),B=n(186),J=n.n(B),V=n(213);const z=Object(d.b)(V.a)`
    width: 100%;
`;function q({sendMessage:e,userId:t}){const n=Object(a.useRef)(),c=Object(a.useCallback)(a=>{a.preventDefault();const c={from:"",to:t,timestamp:(new Date).toISOString(),message:n.current.value};n.current.value="",e(c)},[e,t]);return a.createElement("form",{onSubmit:c},a.createElement(z,{variant:"outlined"},a.createElement($.a,{id:"message-input",rows:1,placeholder:"Type Here...",inputRef:n,endAdornment:a.createElement(P.a,{position:"end"},a.createElement(i.a,{onClick:c},a.createElement(J.a,null)))})))}var K=d.b.div`
  overflow-y: auto;
  scrollbar-color: hsla(0, 0%, 100%, 0.16) transparent;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${m.k};
  }
  ::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;const X=d.b.div`
  display: flex;
  flex-flow: column;
  flex: 1 1 calc(100% - 48px);
  max-height: calc(100% - 48px);
`,Y=Object(d.b)(K)`
  flex: 1 0 calc(100% - 58px);
  flex-flow: column;
  display: flex;
  max-height: calc(100% - 58px);
`;function Q(e){const{value:t,userId:n,messages:c,sendMessage:l}=e;return a.createElement(X,{role:"tabpanel",hidden:t!==n,style:{display:t===n?"flex":"none"}},a.createElement(Y,null,c.map((e,t)=>a.createElement(H,{key:t,message:e}))),a.createElement(q,{sendMessage:l,userId:n}))}var Z=n(226),ee=n(225),te=n(187),ne=n.n(te);const ae=Object(F.a)(G.a)({"justify-content":"space-between","text-transform":"none"}),ce=Object(F.a)(ne.a)({height:"0.5em",width:"0.5em"}),le=d.b.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  div {
    margin: 0px 5px;
    width: 20px;
  }
`;function se(e){const t=Object(a.useMemo)(()=>Object(a.forwardRef)((function(t,n){return a.createElement(ae,Object.assign({ref:n},t,{component:void 0}),e.tab.userId,a.createElement(le,null,a.createElement("div",null,a.createElement(ee.a,{color:"secondary",badgeContent:e.tab.unreadMessages})),a.createElement(i.a,{onClick:e.closeTab.bind(this,e.tab)},a.createElement(ce,null))))})),[e.tab,e.closeTab]);return a.createElement(Z.a,Object.assign({component:t},e,{value:e.tab.userId}))}var oe=n(188),re=n.n(oe);const ie=d.b.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;function ue({openDialog:e}){return a.createElement(ie,null,a.createElement(i.a,{onClick:e,color:"primary"},a.createElement(re.a,{style:{height:"2em",width:"2em"}})))}const be=d.b.div`
  display: flex;
  justify-content: space-between;
  background-color: ${m.c};
`;var de=function(e,t,n,a){return new(n||(n=Promise))((function(c,l){function s(e){try{r(a.next(e))}catch(e){l(e)}}function o(e){try{r(a.throw(e))}catch(e){l(e)}}function r(e){var t;e.done?c(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,o)}r((a=a.apply(e,t||[])).next())}))};const me=Object(a.lazy)(()=>n.e(7).then(n.bind(null,247)));const ge=d.b.div`
  display: flex;
  flex-flow: row;
  height: 100%;
`,Ee=Object(d.b)((function({className:e,state:t,openChatWindow:n,closeChatWindow:c,sendMessage:l,changeActiveTab:s}){const o=Object(C.b)(),[r,u]=Object(a.useState)(!1),b=()=>{u(!0)},d=Object(a.useCallback)(e=>de(this,void 0,void 0,(function*(){if(u(!1),"string"==typeof e&&e){(yield j.b.check(e))?(n({userId:e,unreadMessages:0}),s(e)):o("User does not exist")}})),[o,s,n]),m=Object(a.useCallback)((e,t)=>{t.stopPropagation(),c(e)},[c]);return a.createElement(a.Fragment,null,0!==t.tabs.length&&a.createElement("div",{className:e},a.createElement(be,null,a.createElement(D.a,{value:t.activeTab,onChange:(e,t)=>{s(t)},variant:"scrollable",scrollButtons:"off"},t.tabs.map((e,t)=>a.createElement(se,{key:t,tab:e,closeTab:m,value:e.userId}))),a.createElement(i.a,{onClick:b},a.createElement(R.a,null))),t.tabs.map((e,n)=>{const c=t.messages[e.userId]||[];return a.createElement(Q,{value:t.activeTab,key:n,userId:e.userId,messages:c,sendMessage:l})})),0===t.tabs.length&&a.createElement(ue,{openDialog:b}),r&&a.createElement(me,{open:r,handleClose:d}))}))`
  flex: 1 0 75%;
  display: flex;
  flex-flow: column;
`;var fe=n(190),he=n.n(fe),pe=n(229),Oe=n(189),ve=n.n(Oe),je=n(249);const Ce=d.b.div`
  flex: 0 0 25%;
  height: 100%;
  max-width: 25%;
  border-left: 1px solid ${m.b};
  max-height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  box-sizing: border-box;
`,we=d.b.div`
  flex: 0 1 auto;
  height: 100%;
  border-left: 1px solid ${m.b};
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
`,xe=d.b.div`
  padding: 5px;
  writing-mode: vertical-rl;
`,Se=Object(d.b)(je.a)`
  .MuiDrawer-paper {
    max-width: 60vw;
    width: 60vw;
  }
`;var ye=n(230),ke=n(162),Ie=n.n(ke),Ne=n(224);const Te=d.b.div`
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  color: ${e=>e.isOnline?m.j:m.e};
`,Ae=Object(d.b)(Ne.a)`
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
`;function Me({user:e,removeFn:t,openChatWindow:n}){const c={isOnline:e.userStatus===S.ONLINE};return a.createElement(Ae,{button:!0,onClick:n.bind(null,{userId:e.username,hasNewItems:!1},!0)},a.createElement(Te,Object.assign({},c),e.username),a.createElement(ye.a,{onClick:t.bind(null,e.username)},a.createElement(Ie.a,null)))}var Le=n(219);const _e=d.b.div`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
`,Re=d.b.span`
  text-align: center;
`;function De({openDialog:e}){return a.createElement(_e,null,a.createElement(Re,null,"It's Empty lmao",a.createElement("br",null),"Click on add button to know when a user comes online",a.createElement("br",null),a.createElement("br",null),a.createElement(Le.a,{onClick:e,color:"primary"},a.createElement("b",null,"Add User"))))}var Fe=n(231),Ge=n(233),We=n(234),Ue=n(235),He=n(238),$e=n(236),Pe=n(232);Object(F.a)(Fe.a)({".MuiDialog-paper":{"min-width":"400px"}});const Be=Object(Pe.a)({root:{".MuiDialog-paper":{"min-width":"400px"}}});function Je({open:e,handleClose:t}){const n=Object(a.useRef)(),{root:c}=Be(),l=Object(a.useCallback)(e=>{e.preventDefault(),t(n.current.value)},[t]);return a.createElement(Fe.a,{className:c,open:e,onClose:t,"aria-labelledby":"form-dialog-title"},a.createElement(Ge.a,{id:"form-dialog-title"},"Add to watch list"),a.createElement(We.a,null,a.createElement(Ue.a,null,"Enter the user tag to add user to the watch list. You will be able to see when that user comes online"),a.createElement("form",{onSubmit:l},a.createElement(He.a,{autoFocus:!0,margin:"dense",id:"name",label:"User ID",type:"text",inputRef:n,spellCheck:!1,fullWidth:!0}))),a.createElement($e.a,null,a.createElement(Le.a,{onClick:l},a.createElement("b",null,"Cancel")),a.createElement(Le.a,{onClick:l,color:"primary"},a.createElement("b",null,"Add"))))}var Ve=n(214);const ze=Object(d.b)(Ve.a)``,qe=Object(d.b)(K)`
  flex: 1 0 auto;
  max-height: calc(100% - 48px);
`,Ke=(d.b.div`
  border-left: 1px solid ${m.b};
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`,Object(d.b)(He.a)`
  flex: 0 0 auto;
`,d.b.div`
  display: flex;
  height: 48px;
  justify-content: space-between;
  padding-left: 10px;
  background-color: ${m.c};
`);var Xe,Ye=(Xe=function({openChatWindow:e,connectionState:t}){const{list:n,addUserToWatchList:c,removeUserFromWatchList:l}=x(t),[s,o]=Object(a.useState)(!1),r=Object(a.useCallback)(e=>{o(!1),c(e)},[c]),u=Object(a.useCallback)(t=>t.map((t,n)=>a.createElement(Me,{key:n,user:t,removeFn:l,openChatWindow:e})),[e,l]);return a.createElement(a.Fragment,null,a.createElement(Ke,null,a.createElement("h3",null," Watch List"),a.createElement(i.a,{onClick:o.bind(this,!0)},a.createElement(he.a,null))),!!n.length&&a.createElement(qe,null,a.createElement(ze,null,u(n))),!n.length&&a.createElement(De,{openDialog:o.bind(this,!0)}),a.createElement(Je,{open:s,handleClose:r}))},function(e){const t=Object(pe.a)("(max-width: 640px)"),[n,c]=Object(a.useState)(!1),l=Object(a.useCallback)(e=>{("keydown"!==e.type||"Tab"!==e.key&&"Shift"!==e.key)&&c(!1)},[c]);return a.createElement(a.Fragment,null,!t&&a.createElement(Ce,null,a.createElement(Xe,Object.assign({},e))),t&&a.createElement(a.Fragment,null,a.createElement(we,{onClick:c.bind(this,!0)},a.createElement(ve.a,null),a.createElement(xe,null,"Watch List")),a.createElement(Se,{anchor:"right",open:n,onClose:l},a.createElement(Xe,Object.assign({},e)))))});t.default=function(e){return function(t){const[n,u]=Object(a.useState)(null),[d,m]=Object(a.useState)(!1),[O,v]=Object(a.useState)(!1),[j]=Object(h.a)(n),C=Object(a.useRef)(),w=Object(a.useCallback)(()=>{m(!1),u({url:"/api/logout",method:"post"})},[u,m]),x=Object(a.useCallback)(()=>{m(!1),v(!0)},[v,m]);return j?a.createElement(c.a,{to:"/login"}):a.createElement(g,null,a.createElement(l.a,{position:"sticky",color:"default"},a.createElement(s.a,null,a.createElement(f,null,"Dark"),a.createElement(i.a,{onClick:m.bind(this,!0),ref:C},a.createElement(b.a,null)),a.createElement(o.a,{anchorEl:C.current,keepMounted:!0,open:d,onClose:m.bind(this,!1)},a.createElement(r.a,{onClick:x},"Ignore List"),a.createElement(r.a,{onClick:w},"Logout"))),O&&a.createElement(p,{open:O,handleClose:v.bind(this,!1)})),a.createElement(E,null,a.createElement(e,Object.assign({},t))))}}((function(){const{state:e,openChatWindow:t,closeChatWindow:n,sendMessage:c,recieveMessage:l,changeActiveTab:s,changeConnectionState:o}=L();return Object(a.useEffect)(()=>(function(e){y=new O.Client({connectHeaders:{"CSRF-TOKEN":v.a.XSRF},debug:function(e){console.log(e)},webSocketFactory:()=>new SockJS(`https://${window.location.host}/chat`),reconnectDelay:5e9,heartbeatIncoming:4e3,heartbeatOutgoing:4e3}),y.onConnect=function(t){console.log(t),e(!0),k=setInterval(()=>{y.publish({destination:"/app/ping",body:JSON.stringify({userStatus:S.ONLINE})})},5e3)},y.onStompError=function(e){console.log("Broker reported error: "+e.headers.message),console.log("Additional details: "+e.body)},y.activate()}(o),I.bind(this,o)),[o]),Object(a.useEffect)(()=>{var t;e.isConnected&&(t=l,y.subscribe("/user/queue/reply",e=>t(JSON.parse(e.body))))},[e.isConnected,l]),a.createElement(ge,null,a.createElement(Ee,{state:e,openChatWindow:t,closeChatWindow:n,sendMessage:c,changeActiveTab:s}),a.createElement(Ye,{openChatWindow:t,connectionState:e.isConnected}))}))}}]);