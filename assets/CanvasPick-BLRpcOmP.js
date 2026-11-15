import{r as d,j as p}from"./index-BGYsm0u8.js";import{restFetch as m,serverInfo as I}from"./sync-DUPsih5B.js";import{_ as L,b as M,D as P,J as C,A as j,n as D}from"./store-D716N2EP.js";import{u as A}from"./common-DWs_cNw2.js";const K="petal-planner-files",k="images";let S=null;function F(){return S||(S=new Promise((e,t)=>{const n=indexedDB.open(K,1);n.onupgradeneeded=()=>n.result.createObjectStore(k),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})),S}function O(e,t){return F().then(n=>new Promise((s,i)=>{const a=n.transaction(k,e),c=t(a.objectStore(k));a.oncomplete=()=>s(c&&c.result),a.onerror=()=>i(a.error)}))}const oe=(e,t)=>O("readwrite",n=>n.put(t,e)),re=e=>O("readonly",t=>t.get(e)),ie=e=>(B.delete(e),O("readwrite",t=>t.delete(e))),ae=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,B=new Map,U=5*60*1e3,G=60*1e3;let T=0,g=null,u={list:[],noTable:!1,noLogin:!1,at:0,error:null};const E=new Set,b=e=>{u={...u,...e},E.forEach(t=>t(u))},_=encodeURIComponent;async function x({force:e}={}){return g||(!e&&Date.now()-T<G?null:(T=Date.now(),g=(async()=>{try{const t=await m("comm_inbox?select=id,src,at,sender,subject,body,nfiles,st&st=eq.new&order=at.desc&limit=50");return b({list:t||[],noTable:!1,noLogin:!1,at:Date.now(),error:null}),(t==null?void 0:t.length)||0}catch(t){return b({list:[],noTable:!!t.noTable,noLogin:!!t.noLogin,error:t.noTable||t.noLogin?null:t.message}),null}finally{g=null}})(),g))}function ce(){d.useEffect(()=>{const e=setTimeout(()=>x(),4e3),t=setInterval(()=>document.visibilityState!=="hidden"&&x(),U),n=()=>document.visibilityState!=="hidden"&&x();return document.addEventListener("visibilitychange",n),window.addEventListener("focus",n),()=>{clearTimeout(e),clearInterval(t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",n)}},[])}function le(){const[e,t]=d.useState(u);return d.useEffect(()=>(E.add(t),t(u),()=>E.delete(t)),[]),e}const J=e=>b({list:u.list.filter(t=>t.id!==e)});function W(e=""){const t=String(e).match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);if(t)return{name:t[1].trim(),email:t[2].trim()};const n=String(e).match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/);return{name:"",email:n?n[0]:""}}function pe(e){const t=String((e==null?void 0:e.body)||"").replace(/\r/g,"").split(`
`),n=[];for(const o of t)if(!/^\s*>/.test(o)){if(/^\s*(On .+wrote:|20\d\d.+(작성|님이 씀|wrote)[:：]?\s*$|-{2,}\s*(Original Message|원본 메일|원래 메일)\s*-{2,})/i.test(o))break;n.push(o)}const s=n.join(`
`).replace(/\n{3,}/g,`

`).trim(),i=String((e==null?void 0:e.subject)||"").trim(),a=q(i),c=a?[`타입: ${a.type}`,`닉네임: ${a.nick}`,a.count?`장수: ${a.count}`:""].filter(Boolean).join(`
`):i;return c&&!s.startsWith(c)?`${c}

${s}`.trim():s}function q(e=""){const t=String(e).match(/\[\s*([^\]\/]+?)\s*\/\s*([^\]\/]+?)\s*\/\s*([^\]]+?)\s*\]/);if(!t)return null;const n=t[3].match(/\d+/);return{type:t[1],nick:t[2],count:n?Number(n[0]):0}}function ue(e){const{name:t,email:n}=W(e==null?void 0:e.sender);return{platform:"메일",email:n,nick:t&&!t.includes("@")?t:""}}const H=async e=>{const n=await(await fetch(`data:${e.type||"image/jpeg"};base64,${e.data}`)).blob();return new File([n],e.name||"mail.jpg",{type:e.type||n.type||"image/jpeg"})};async function me(e){if(!(e!=null&&e.nfiles))return[];const t=await m(`comm_inbox_files?select=n,name,type,data&mail_id=eq.${_(e.id)}&order=n.asc`),n=[];for(const s of t||[])s.data&&/^image\//.test(s.type||"image/")&&n.push(await H(s).catch(()=>null));return n.filter(Boolean)}async function $(e,t,n){J(e.id),await m(`comm_inbox?id=eq.${_(e.id)}`,{method:"PATCH",body:{st:t,...n?{comm_id:n}:{}},prefer:"return=minimal"}),await m(`comm_inbox_files?mail_id=eq.${_(e.id)}`,{method:"DELETE",prefer:"return=minimal"}).catch(()=>{})}const de=(e,t)=>$(e,"done",t),fe=e=>$(e,"skip");async function ge(e){await m(`comm_inbox?id=eq.${_(e.id)}`,{method:"PATCH",body:{st:"new"},prefer:"return=minimal"}),b({list:[e,...u.list.filter(t=>t.id!==e.id)].sort((t,n)=>n.at-t.at)})}async function V(){var s;const e=await m("comm_inbox_keys?select=token");if((s=e==null?void 0:e[0])!=null&&s.token)return e[0].token;const t=new Uint8Array(24);crypto.getRandomValues(t);const n=Array.from(t,i=>i.toString(16).padStart(2,"0")).join("");return await m("comm_inbox_keys",{method:"POST",body:{token:n},prefer:"return=minimal"}),n}function Y({url:e,key:t,token:n}){return`// 기록 · 메일 커미션 받은함 — 이 글 전체를 붙여 넣고, 위에서 'setup' 을 골라 ▶ 실행을 한 번 눌러 주세요.
// 그다음부터는 10분마다 저절로 커미션 메일을 기록 앱으로 보내요. (끄려면 'stop' 을 골라 ▶ 실행)

const GIROK_URL = '${e}';
const GIROK_KEY = '${t}';
const GIROK_TOKEN = '${n}';

// 커미션 메일로 보는 것 (하나라도 맞으면). 지메일 '커미션' 라벨을 붙인 메일도 보내요
//  1) 제목이 [타입명 / 신청자 닉네임 / 인수 or 장수] 양식
//  2) 본문에 내 신청 양식 칸이 있음 (FORM_WORDS)
//  3) 제목에 SUBJECT_WORDS 가 있음
const FORM_WORDS = ['입금자명', '완성본을 받을 이메일'];
const SUBJECT_WORDS = ['커미션', 'commission'];
// 이 말이 보낸 사람에 있으면 건너뛰어요 (광고·자동 메일)
const SKIP_FROM = ['noreply', 'no-reply', 'mailer-daemon', 'newsletter', 'notification'];
// 이 말이 제목에 있으면 건너뛰어요 (학교·인증 메일 등)
const SKIP_SUBJECT = ['수강신청', '인증번호', '(광고)', '[광고]', '뉴스레터'];
const MAX_FILE = 8 * 1024 * 1024; // 사진 한 장 8MB까지

function setup() {
  stop();
  ScriptApp.newTrigger('check').timeBased().everyMinutes(10).create();
  check();
  Logger.log('준비 끝! 이제 10분마다 확인해요.');
}

function isCommMail(subject, body) {
  if (/\\[[^\\]\\/]+\\/[^\\]\\/]+\\/[^\\]]+\\]/.test(subject)) return true;
  const head = String(body || '').slice(0, 6000);
  if (FORM_WORDS.some(function (w) { return head.indexOf(w) >= 0; })) return true;
  const low = String(subject || '').toLowerCase();
  return SUBJECT_WORDS.some(function (w) { return low.indexOf(w.toLowerCase()) >= 0; });
}

function stop() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
}

function check() {
  const props = PropertiesService.getScriptProperties();
  const sent = JSON.parse(props.getProperty('sent') || '[]');
  const seen = {};
  sent.forEach(function (id) { seen[id] = 1; });
  const me = Session.getActiveUser().getEmail().toLowerCase();
  const threads = GmailApp.search('newer_than:3d -in:sent -in:chats -in:spam -in:trash -category:promotions -category:social', 0, 40)
    .concat(GmailApp.search('label:커미션 newer_than:3d', 0, 20));
  let count = 0;
  threads.forEach(function (th) {
    const labeled = th.getLabels().some(function (l) { return l.getName() === '커미션'; });
    th.getMessages().forEach(function (m) {
      const id = m.getId();
      if (seen[id]) return;
      const from = m.getFrom();
      if (me && from.toLowerCase().indexOf(me) >= 0) return;
      if (SKIP_FROM.some(function (w) { return from.toLowerCase().indexOf(w) >= 0; })) return;
      const subject = m.getSubject() || '';
      const body = m.getPlainBody() || '';
      if (!labeled && SKIP_SUBJECT.some(function (w) { return subject.indexOf(w) >= 0; })) return;
      if (!labeled && !isCommMail(subject, body)) return;
      const pics = m.getAttachments({ includeInlineImages: true }).filter(function (a) {
        return /^image\\//.test(a.getContentType()) && a.getSize() <= MAX_FILE;
      }).slice(0, 10);
      const ok = call('comm_inbox_add', { p_token: GIROK_TOKEN, p_id: id, p_at: m.getDate().getTime(), p_sender: from, p_subject: subject, p_body: body.slice(0, 30000), p_nfiles: pics.length, p_src: 'mail' });
      if (ok === null) return; // 서버에 못 닿음 → 다음에 다시
      pics.forEach(function (a, n) {
        call('comm_inbox_file', { p_token: GIROK_TOKEN, p_id: id, p_n: n, p_name: a.getName(), p_type: a.getContentType(), p_data: Utilities.base64Encode(a.getBytes()) });
      });
      seen[id] = 1;
      sent.push(id);
      count++;
    });
  });
  props.setProperty('sent', JSON.stringify(sent.slice(-400)));
  Logger.log('보낸 메일 ' + count + '통');
}

function call(fn, payload) {
  const r = UrlFetchApp.fetch(GIROK_URL.replace(/\\/+$/, '') + '/rest/v1/rpc/' + fn, {
    method: 'post',
    contentType: 'application/json',
    headers: { apikey: GIROK_KEY },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  if (r.getResponseCode() >= 300) {
    Logger.log(fn + ' 실패 ' + r.getResponseCode() + ' ' + r.getContentText().slice(0, 300));
    return null;
  }
  return r.getContentText();
}
`}async function he(){const{url:e,key:t}=I(),n=await V();return Y({url:e.replace(/\/+$/,""),key:t,token:n})}const be=()=>{var e;return typeof window<"u"&&!!((e=window.planner)!=null&&e.commCanvas)},X=e=>{const t=new Date(e||Date.now());return`${String(t.getMonth()+1).padStart(2,"0")}${String(t.getDate()).padStart(2,"0")}`},v=e=>String(e||"").split(/[\\/]/).pop(),N=e=>v(e).replace(/\.[^.]+$/,""),z=e=>String(e||"").slice(0,Math.max(String(e||"").lastIndexOf("\\"),String(e||"").lastIndexOf("/"))),Q=e=>(Array.isArray(e)?e:e?[{path:e}]:[]).filter(t=>t&&(typeof t=="string"||t.path)).map(t=>typeof t=="string"?{path:t}:t).map(t=>({path:t.path,name:String(t.name||"").trim()||N(t.path)}));function _e(e,t,n={}){const s=L(e),i=s?M(e):[e],a=[],c=[];return i.forEach((o,l)=>{const r=P(o,t);if(!r)return;const f=Q(n[r.id]);if(!f.length){c.includes(r.name)||c.push(r.name);return}const h=[e.nick||"의뢰",r.name,X(e.createdAt)].join("_")+(s?`_${C(l)}`:"");a.some(w=>w.name===h)||a.push({name:h,type:r.name,part:s?C(l):"",choices:f})}),{jobs:a,missing:c}}function Z(e,t=0){const n=e.choices[t];return n?{template:n.path,name:e.choices.length>1?`${e.name}_${n.name}`:e.name}:null}const R=(e,t,n=[])=>{const s=new Set((j().commissions||[]).map(c=>c.id)),i=Object.fromEntries(Object.entries(j().settings.commCanvasPaths||{}).filter(([c])=>s.has(c))),a=[...new Set([...i[e]||[],...t])].filter(c=>!n.includes(c));D.setSettings({commCanvasPaths:{...i,[e]:a}})};async function ye(e,t,n=[],s=[]){const i=j().settings||{},a={opened:[],created:0,missing:s,errors:[]};for(const[c,o]of t.entries()){const l=Z(o,n[c]??0);if(!l)continue;const r=await window.planner.commOpenWork({...l,dir:i.commWorkDir||""});r!=null&&r.path&&!r.error?(a.opened.push(r.path),r.created&&(a.created+=1)):a.errors.push((r==null?void 0:r.error)==="no-template"?`견본 파일을 못 찾았어요 (${v(l.template)})`:(r==null?void 0:r.error)||"열지 못했어요")}return a.opened.length&&R(e.id,a.opened),a}async function we(e,t){const n={opened:[],gone:[],errors:[]};for(const s of t){const i=await window.planner.commOpenWork({template:s,dir:z(s),name:N(s)});i!=null&&i.path&&!i.error?n.opened.push(i.path):(i==null?void 0:i.error)==="no-template"?n.gone.push(s):n.errors.push((i==null?void 0:i.error)||"열지 못했어요")}return n.gone.length&&R(e.id,[],n.gone),n}let y=null;function Se(e,t){return y?y(e,t):Promise.resolve(t.map(()=>0))}function xe(){const[e,t]=d.useState(null);d.useEffect(()=>(y=(o,l)=>new Promise(r=>t({c:o,jobs:l,picks:l.map(()=>0),done:r})),()=>{y=null}),[]);const n=o=>{e==null||e.done(o),t(null)},s=e&&e.jobs.length===1?e.jobs[0]:null;if(d.useEffect(()=>{if(!e)return;const o=l=>{const r=Number(l.key);s&&r>=1&&r<=s.choices.length&&n([r-1])};return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)}),A(()=>n(null),!!e),!e)return null;const{c:i,jobs:a,picks:c}=e;return p.jsx("div",{className:"cxp-back",onMouseDown:o=>{o.target===o.currentTarget&&n(null)},children:p.jsxs("div",{className:"cxp",role:"dialog","aria-label":"열 파일 고르기",children:[p.jsxs("div",{className:"cxp__hd",children:[p.jsx("b",{children:"어떤 파일로 시작할까요?"}),p.jsxs("span",{className:"cxp__sub",children:[i.nick||"의뢰",s?` · ${s.type}`:""]})]}),s?p.jsx("div",{className:"cxp__opts",children:s.choices.map((o,l)=>p.jsxs("button",{type:"button",className:"cxp__opt",onClick:()=>n([l]),autoFocus:l===0,children:[p.jsx("span",{className:"cxp__key",children:l+1}),p.jsx("span",{className:"cxp__name",children:o.name}),p.jsx("span",{className:"cxp__file",title:o.path,children:v(o.path)})]},o.path))}):a.map((o,l)=>p.jsxs("div",{className:"cxp__part",children:[p.jsxs("span",{className:"cxp__ptitle",children:[o.part?`${o.part} · `:"",o.type]}),p.jsx("div",{className:"cxp__chips",role:"radiogroup","aria-label":`${o.type} 파일`,children:o.choices.map((r,f)=>p.jsx("button",{type:"button",role:"radio","aria-checked":c[l]===f,title:r.path,onClick:()=>t({...e,picks:c.map((h,w)=>w===l?f:h)}),children:r.name},r.path))})]},o.name)),p.jsxs("div",{className:"cxp__ft",children:[p.jsx("button",{type:"button",className:"cxp__ghost",onClick:()=>n(a.map(()=>-1)),children:"파일 없이 시작"}),p.jsx("button",{type:"button",className:"cxp__ghost",onClick:()=>n(null),children:"취소"}),!s&&p.jsx("button",{type:"button",className:"cxp__go",onClick:()=>n(c),children:"시작"})]})]})})}export{xe as C,W as a,ge as b,he as c,de as d,ue as e,ce as f,re as g,ie as h,me as i,oe as j,be as k,_e as l,pe as m,Se as n,ye as o,x as p,N as q,we as r,fe as s,Q as t,le as u,v,ae as w};
