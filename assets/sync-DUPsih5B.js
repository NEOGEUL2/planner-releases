const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./backup-BPRpPcR3.js","./store-D716N2EP.js","./index-BGYsm0u8.js","./index-CqKTvM8n.css","./idb-C0B5Ti2O.js"])))=>i.map(i=>d[i]);
import{r as Oe,_ as ge}from"./index-BGYsm0u8.js";import{A as Ue,ay as Me,bF as _,bG as Z,bH as Fe,av as Ye}from"./store-D716N2EP.js";const qe=25e3;function Ve(e){const t=e.WS||globalThis.WebSocket;if(!t)return{close(){},refreshToken(){}};const n=`realtime:girok-kv-${e.uid}`;let o=null,r=null,i=null,a=2e3,c=0,l=!1;const d=(v,J,P=n)=>{(o==null?void 0:o.readyState)===1&&o.send(JSON.stringify({topic:P,event:v,payload:J,ref:String(++c),join_ref:P===n?"1":void 0}))};async function y(){if(l)return;let v;try{v=await e.token()}catch{return D()}if(l)return;const J=e.url.replace(/^http/,"ws").replace(/\/+$/,"");o=new t(`${J}/realtime/v1/websocket?apikey=${encodeURIComponent(e.key)}&vsn=1.0.0`),o.onopen=()=>{a=2e3,d("phx_join",{config:{broadcast:{self:!1},presence:{key:""},postgres_changes:[{event:"*",schema:"public",table:"planner_kv",filter:`user_id=eq.${e.uid}`}],private:!1},access_token:v}),r=setInterval(()=>d("heartbeat",{},"phoenix"),qe)},o.onmessage=P=>{var W,s;let V;try{V=JSON.parse(P.data)}catch{return}if(V.event!=="postgres_changes")return;const T=(s=(W=V.payload)==null?void 0:W.data)==null?void 0:s.record;T!=null&&T.k&&e.onChange({k:T.k,version:T.version})},o.onclose=()=>{clearInterval(r),o=null,D()},o.onerror=()=>o==null?void 0:o.close()}function D(){l||(clearTimeout(i),i=setTimeout(y,a),a=Math.min(a*2,6e4))}return y(),{close(){l=!0,clearTimeout(i),clearInterval(r),o&&(o.onclose=null,o.close()),o=null},refreshToken(v){d("access_token",{access_token:v})}}}const Le="yeonkki-sync-session",M="yeonkki-sync-base",Te="planner_state",Y="planner_kv",We=6e4,Qe=2e3,Ie=["items","routines","routineLog","goals","notes","labels","ledger","ledgerCats","ledgerBudget","meals","trackers","trackerPics","daySummaries","workStamps","workOverride","captureNotes","ledgerRecurring","diary","calSubs","commissions","commTypes","commReplies","commPrefs","commCanceled","stickers","memos","health","meds","miniNotes","miniLearn","miniPace","lastfm","travel","places","weather","exams","langLog","langPrefs","sleepPlan","habits","habitLog","chores","supplies","shopList","wishes","tweets","steam"],ae="yeonkki-sync-config";let h=(()=>{try{const e=JSON.parse(localStorage.getItem(ae));if(e!=null&&e.url&&(e!=null&&e.key))return e}catch{}return{url:"",key:""}})();const j=()=>!!(h.url&&h.key),$t=()=>({url:h.url,key:h.key,host:h.url.replace(/^https?:\/\//,"").replace(/\/.*$/,""),fromFile:!localStorage.getItem(ae)&&!1}),B=()=>h.url.replace(/\/+$/,"");function Pe(e){let t=String(e||"").trim();if(!t)return"";const n=t.match(/supabase\.com\/dashboard\/project\/([a-z0-9]+)/i);if(n)return`https://${n[1]}.supabase.co`;if(/^[a-z0-9]{15,30}$/i.test(t))return`https://${t}.supabase.co`;/^https?:\/\//i.test(t)||(t=`https://${t}`);try{const o=new URL(t);return`${o.protocol}//${o.host}`}catch{return""}}function He(e){const t=String(e||"").trim();if(!t)return"키를 넣어 주세요.";if(/^sb_secret_/i.test(t))return"이건 비밀(secret) 키예요. publishable 키(sb_publishable_…)나 anon public 키를 넣어 주세요.";if(t.split(".").length===3){try{if(JSON.parse(atob(t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"))).role==="service_role")return"이건 service_role(비밀) 키예요. anon public 키를 넣어 주세요."}catch{}return""}return/^sb_publishable_/i.test(t)?"":"키 모양이 낯설어요. Project Settings → API Keys의 publishable 키나 anon public 키를 복사해 주세요."}async function Et(e,t){const n=Pe(e);if(!n)return{ok:!1,error:"주소 모양이 맞지 않아요. 예) https://abcdefg.supabase.co"};const o=He(t);if(o)return{ok:!1,error:o};const r=t.trim();try{const i=await fetch(`${n}/auth/v1/settings`,{headers:{apikey:r}});if(i.status===401||i.status===403)return{ok:!1,error:"키가 이 프로젝트 것이 아니에요. 같은 프로젝트의 키를 넣어 주세요."};if(!i.ok)return{ok:!1,error:`서버에 연결하지 못했어요. (${i.status}) 주소를 확인해 주세요.`};const a=await i.json().catch(()=>({})),c=await fetch(`${n}/rest/v1/${Te}?select=version&limit=1`,{headers:{apikey:r}}),l=await c.json().catch(()=>null);if(!c.ok){const d=`${(l==null?void 0:l.code)||""} ${(l==null?void 0:l.message)||""}`;return/PGRST205|42P01|does not exist|could not find the table/i.test(d)?{ok:!1,needsTable:!0,url:n,error:"서버는 찾았는데 planner_state 표가 아직 없어요. 2번의 SQL을 실행해 주세요."}:{ok:!1,error:`표를 확인하지 못했어요. (${((l==null?void 0:l.message)||c.status).toString().slice(0,80)})`}}return{ok:!0,url:n,emailConfirm:(a==null?void 0:a.mailer_autoconfirm)===!1}}catch{return{ok:!1,error:"서버에 닿지 않아요. 주소와 인터넷 연결을 확인해 주세요."}}}function Xe(e,t){const n={url:Pe(e),key:String(t||"").trim()};f&&we(),be(),$e(),h=n,localStorage.setItem(ae,JSON.stringify(n)),g({phase:"off",server:n.url})}function Ot(){f&&we(),be(),$e(),localStorage.removeItem(ae),h={url:"",key:""},g({phase:"off",server:""})}const Ze=()=>`YK1.${btoa(unescape(encodeURIComponent(JSON.stringify({u:h.url,k:h.key}))))}`;function et(e){const n=String(e||"").trim().match(/YK1\.[A-Za-z0-9+/=_-]+/);if(!n)return null;try{const o=JSON.parse(decodeURIComponent(escape(atob(n[0].slice(4)))));return o.u&&o.k?{url:o.u,key:o.k}:null}catch{return null}}const Lt=()=>`${location.origin}${location.pathname}#connect=${Ze()}`;function tt(){try{const e=location.hash.match(/connect=(YK1\.[^&]+)/);if(!e)return;const t=et(decodeURIComponent(e[1]));history.replaceState(null,"",location.pathname+location.search),t&&!j()&&Xe(t.url,t.key)}catch{}}const nt=`-- Yeonkki Planner 동기화용 표 (한 사람당 한 줄)
create table if not exists public.planner_state (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  updated_at timestamptz not null default now()
);

-- 내 줄만 읽고 쓸 수 있게 (다른 사람 데이터는 못 봄)
alter table public.planner_state enable row level security;

drop policy if exists "own row select" on public.planner_state;
drop policy if exists "own row insert" on public.planner_state;
drop policy if exists "own row update" on public.planner_state;
drop policy if exists "own row delete" on public.planner_state;
create policy "own row select" on public.planner_state for select to authenticated using (auth.uid() = user_id);
create policy "own row insert" on public.planner_state for insert to authenticated with check (auth.uid() = user_id);
create policy "own row update" on public.planner_state for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own row delete" on public.planner_state for delete to authenticated using (auth.uid() = user_id);

grant select, insert, update, delete on public.planner_state to authenticated;
`,ot=`-- 기록: 동기화를 칸마다 따로 (바뀐 칸만 오가게). 여러 번 실행해도 괜찮음
create table if not exists public.planner_kv (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  k text not null,
  data jsonb,
  version integer not null default 1,
  updated_at timestamptz not null default now(),
  primary key (user_id, k)
);

alter table public.planner_kv enable row level security;

drop policy if exists "own kv select" on public.planner_kv;
drop policy if exists "own kv insert" on public.planner_kv;
drop policy if exists "own kv update" on public.planner_kv;
drop policy if exists "own kv delete" on public.planner_kv;
create policy "own kv select" on public.planner_kv for select to authenticated using (auth.uid() = user_id);
create policy "own kv insert" on public.planner_kv for insert to authenticated with check (auth.uid() = user_id);
create policy "own kv update" on public.planner_kv for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own kv delete" on public.planner_kv for delete to authenticated using (auth.uid() = user_id);

grant select, insert, update, delete on public.planner_kv to authenticated;

-- 바로 반영: 다른 기기가 저장하면 알려 주기 (Realtime)
do $$ begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'planner_kv') then
    alter publication supabase_realtime add table public.planner_kv;
  end if;
end $$;
`,Tt=`${nt}
${ot}`,rt=e=>{try{return JSON.parse(localStorage.getItem(e))}catch{return null}},Ae=(e,t)=>{try{t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}catch{}};let O={phase:"off",email:null,lastSync:null,error:null};const ue=new Set;function g(e){O={...O,...e},ue.forEach(t=>t(O))}function It(){const[e,t]=Oe.useState(O);return Oe.useEffect(()=>(ue.add(t),()=>ue.delete(t)),[]),e}function b(e=Ue()){var n,o;const t={};for(const r of Ie)t[r]=e[r]??(r==="notes"||r==="meals"||r==="diary"||r==="health"||r==="places"||r==="weather"?{}:void 0);return t.weekStart=((n=e.settings)==null?void 0:n.weekStart)??0,t.workLog=((o=e.work)==null?void 0:o.log)||{},t}let de=!1;function I(e){de=!0;try{Ye(t=>{const n={};for(const o of Ie)e[o]!==void 0&&(n[o]=e[o]);return Array.isArray(n.trackerPics)&&(n.trackerPics=n.trackerPics.map(o=>(o==null?void 0:o.id)==="bear"&&o.on?{id:o.id,name:o.name}:o)),n.settings={...t.settings,weekStart:e.weekStart??t.settings.weekStart},e.workLog&&(n.work={...t.work,log:e.workLog}),n},{remote:!0})}finally{de=!1}}let f=rt(Le);function se(e){f=e,Ae(Le,e)}function _e(e){var t,n;return{access_token:e.access_token,refresh_token:e.refresh_token,expires_at:Date.now()+(e.expires_in||3600)*1e3,user:{id:(t=e.user)==null?void 0:t.id,email:(n=e.user)==null?void 0:n.email}}}async function ke(e,t){const n=await fetch(`${B()}/auth/v1/${e}`,{method:"POST",headers:{apikey:h.key,"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await n.json().catch(()=>({}));if(!n.ok){const r=new Error(it(o));throw r.status=n.status,r}return o}function it(e){const t=`${e.error_code||""} ${e.msg||e.error_description||e.message||e.error||""}`.toLowerCase();return t.includes("invalid login")||t.includes("invalid_credentials")?"이메일이나 비밀번호가 맞지 않아요.":t.includes("not confirmed")?"이메일 인증이 아직 안 됐어요. 메일함의 확인 링크를 누르거나, Supabase에서 이메일 확인을 꺼 주세요.":t.includes("already registered")||t.includes("user_already_exists")?"이미 가입된 이메일이에요. 로그인을 눌러 주세요.":t.includes("password")?"비밀번호는 6자 이상이어야 해요.":`로그인하지 못했어요. (${(e.msg||e.message||e.error||"알 수 없는 오류").toString().slice(0,80)})`}async function Pt(e,t){const n=await ke("signup",{email:e,password:t});if(!n.access_token)throw new Error("가입은 됐어요. 메일함의 확인 링크를 누른 뒤 로그인해 주세요. (Supabase에서 이메일 확인을 끄면 이 단계가 없어요)");return se(_e(n)),Ge()}async function At(e,t){const n=await ke("token?grant_type=password",{email:e,password:t});return se(_e(n)),Ge()}function we(){se(null),be(),$e(),ze(),g({phase:"off",email:null,lastSync:null,error:null})}async function q(){if(!f)throw new Error("로그인이 필요해요.");if(Date.now()>f.expires_at-6e4)try{const e=await ke("token?grant_type=refresh_token",{refresh_token:f.refresh_token});se(_e(e)),E==null||E.refreshToken(f.access_token)}catch(e){throw[400,401,403].includes(e.status)?(we(),new Error("로그인이 만료됐어요. 다시 로그인해 주세요.")):new Error("서버에 닿지 않아요. 연결되면 자동으로 다시 맞춰요.")}return f.access_token}const z="commission-files",Rt=`-- 기록: 사진 보관함 (커미션 자료 사진 · 스티커 · 트래커 그림) (나만 읽고 쓸 수 있게, 여러 번 실행해도 괜찮음)
insert into storage.buckets (id, name, public)
values ('${z}', '${z}', false)
on conflict (id) do nothing;

drop policy if exists "commission files select" on storage.objects;
drop policy if exists "commission files insert" on storage.objects;
drop policy if exists "commission files update" on storage.objects;
drop policy if exists "commission files delete" on storage.objects;
create policy "commission files select" on storage.objects for select to authenticated
  using (bucket_id = '${z}' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "commission files insert" on storage.objects for insert to authenticated
  with check (bucket_id = '${z}' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "commission files update" on storage.objects for update to authenticated
  using (bucket_id = '${z}' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "commission files delete" on storage.objects for delete to authenticated
  using (bucket_id = '${z}' and (storage.foldername(name))[1] = auth.uid()::text);
`,Ct=`-- 기록: JLPT 공부 앱 공부 기록 (한 번 공부 = 한 줄, 나만 읽고 쓸 수 있게, 여러 번 실행해도 괜찮음)
create table if not exists public.study_log (
  id text primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  day date not null,
  at bigint not null,
  sec integer not null default 0,
  part text not null default 'other',
  n integer not null default 0,
  ok integer not null default 0,
  learned integer not null default 0,
  what text,
  updated_at timestamptz not null default now()
);
create index if not exists study_log_user_day on public.study_log (user_id, day);

alter table public.study_log enable row level security;
drop policy if exists "own study select" on public.study_log;
drop policy if exists "own study insert" on public.study_log;
drop policy if exists "own study update" on public.study_log;
drop policy if exists "own study delete" on public.study_log;
create policy "own study select" on public.study_log for select to authenticated using (auth.uid() = user_id);
create policy "own study insert" on public.study_log for insert to authenticated with check (auth.uid() = user_id);
create policy "own study update" on public.study_log for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own study delete" on public.study_log for delete to authenticated using (auth.uid() = user_id);
grant select, insert, update, delete on public.study_log to authenticated;
`;async function Nt(e){if(!j()||!f)return null;const t=`?select=id,day,at,sec,part,n,ok,learned,what&day=gte.${e}&order=at.asc&limit=5000`,n=await fetch(`${B()}/rest/v1/study_log${t}`,{headers:{apikey:h.key,Authorization:`Bearer ${await q()}`}}),o=await n.json().catch(()=>null);if(!n.ok){const r=new Error((o==null?void 0:o.message)||`공부 기록 ${n.status}`);throw r.noTable=n.status===404||/does not exist|could not find the table/i.test(r.message),r}return o||[]}const jt=`-- 기록: 메일로 온 커미션 신청 받은함 (나만 읽고 쓸 수 있게, 여러 번 실행해도 괜찮음)
create table if not exists public.comm_inbox_keys (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  token text not null unique
);
create table if not exists public.comm_inbox (
  id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  src text not null default 'mail',
  at bigint not null,
  sender text,
  subject text,
  body text,
  nfiles integer not null default 0,
  st text not null default 'new',
  comm_id text,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);
create table if not exists public.comm_inbox_files (
  user_id uuid not null references auth.users (id) on delete cascade,
  mail_id text not null,
  n integer not null,
  name text,
  type text,
  data text,
  primary key (user_id, mail_id, n)
);
alter table public.comm_inbox_keys enable row level security;
alter table public.comm_inbox enable row level security;
alter table public.comm_inbox_files enable row level security;
drop policy if exists "own inbox key" on public.comm_inbox_keys;
drop policy if exists "own inbox" on public.comm_inbox;
drop policy if exists "own inbox files" on public.comm_inbox_files;
create policy "own inbox key" on public.comm_inbox_keys for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own inbox" on public.comm_inbox for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own inbox files" on public.comm_inbox_files for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
grant select, insert, update, delete on public.comm_inbox_keys, public.comm_inbox, public.comm_inbox_files to authenticated;

create or replace function public.comm_inbox_add(p_token text, p_id text, p_at bigint, p_sender text, p_subject text, p_body text, p_nfiles integer, p_src text default 'mail')
returns boolean language plpgsql security definer set search_path = public as $$
declare uid uuid;
begin
  select user_id into uid from public.comm_inbox_keys where token = p_token and length(p_token) >= 24;
  if uid is null then raise exception 'bad token'; end if;
  insert into public.comm_inbox (id, user_id, src, at, sender, subject, body, nfiles)
  values (left(p_id, 200), uid, left(coalesce(p_src, 'mail'), 20), p_at, left(p_sender, 300), left(p_subject, 500), left(p_body, 30000), least(greatest(coalesce(p_nfiles, 0), 0), 10))
  on conflict do nothing;
  return found;
end $$;
create or replace function public.comm_inbox_file(p_token text, p_id text, p_n integer, p_name text, p_type text, p_data text)
returns boolean language plpgsql security definer set search_path = public as $$
declare uid uuid;
begin
  select user_id into uid from public.comm_inbox_keys where token = p_token and length(p_token) >= 24;
  if uid is null then raise exception 'bad token'; end if;
  if p_n < 0 or p_n > 9 or length(p_data) > 11000000 then return false; end if;
  if not exists (select 1 from public.comm_inbox where user_id = uid and id = p_id and st = 'new') then return false; end if;
  insert into public.comm_inbox_files (user_id, mail_id, n, name, type, data)
  values (uid, p_id, p_n, left(p_name, 200), left(p_type, 100), p_data)
  on conflict do nothing;
  return found;
end $$;
revoke all on function public.comm_inbox_add(text, text, bigint, text, text, text, integer, text) from public;
revoke all on function public.comm_inbox_file(text, text, integer, text, text, text) from public;
grant execute on function public.comm_inbox_add(text, text, bigint, text, text, text, integer, text) to anon, authenticated;
grant execute on function public.comm_inbox_file(text, text, integer, text, text, text) to anon, authenticated;
`;async function Bt(e,{method:t="GET",body:n,prefer:o}={}){if(!j()||!f){const c=new Error("로그인이 필요해요.");throw c.noLogin=!0,c}const r={apikey:h.key,Authorization:`Bearer ${await q()}`};n!==void 0&&(r["Content-Type"]="application/json"),o&&(r.Prefer=o);const i=await fetch(`${B()}/rest/v1/${e}`,{method:t,headers:r,body:n!==void 0?JSON.stringify(n):void 0}),a=i.status===204?null:await i.json().catch(()=>null);if(!i.ok){const c=new Error((a==null?void 0:a.message)||`서버 오류 ${i.status}`);throw c.noTable=i.status===404||/PGRST205|42P01/.test((a==null?void 0:a.code)||"")||/does not exist|could not find the table/i.test(c.message),c}return a}const Dt=()=>{var e;return(e=f==null?void 0:f.user)!=null&&e.id&&j()?f.user.id:null};async function Jt(e){if(!j())throw new Error("로그인이 필요해요.");const t=await fetch(`${B()}/functions/v1/works`,{method:"POST",headers:{apikey:h.key,Authorization:`Bearer ${await q()}`,"Content-Type":"application/json"},body:JSON.stringify(e)});if(t.status===404)throw new Error("works functions 404");if((e==null?void 0:e.a)==="img"){if(!t.ok)throw new Error(`그림 ${t.status}`);return t.blob()}const n=await t.json().catch(()=>null);if(!t.ok)throw new Error((n==null?void 0:n.error)||(n==null?void 0:n.message)||(n==null?void 0:n.msg)||`works ${t.status}`);return n}async function Kt(e,{method:t="GET",body:n,contentType:o,upsert:r,cache:i}={}){const a={apikey:h.key,Authorization:`Bearer ${await q()}`};o&&(a["Content-Type"]=o),r&&(a["x-upsert"]="true");const c=await fetch(`${B()}/storage/v1/${e}`,{method:t,headers:a,body:n,...i?{cache:i}:{}});if(!c.ok){const l=await c.json().catch(()=>null),d=(l==null?void 0:l.message)||(l==null?void 0:l.error)||`보관함 오류 ${c.status}`,y=new Error(/bucket not found/i.test(d)?"사진 보관함이 아직 없어요. 설정 → 일반 → 커미션에서 SQL을 실행해 주세요.":d);throw y.status=c.status,y}return c}async function $(e,t,n,o,r=Te){const i={apikey:h.key,Authorization:`Bearer ${await q()}`,"Content-Type":"application/json"};o&&(i.Prefer=o);const a=await fetch(`${B()}/rest/v1/${r}${t}`,{method:e,headers:i,body:n?JSON.stringify(n):void 0});if(a.status===409)return{conflict:!0};const c=await a.json().catch(()=>null);if(!a.ok){const l=(c==null?void 0:c.message)||`서버 오류 ${a.status}`;if(/PGRST205|42P01/.test((c==null?void 0:c.code)||"")||/relation .* does not exist|could not find the table/i.test(l)){const d=new Error(`서버에 ${r} 표가 없어요. 가이드의 SQL을 Supabase에서 실행해 주세요.`);throw d.missing=!0,d}throw new Error(l)}return c}async function Re(){const e=await $("GET","?select=version",null);return e&&e.length?e[0].version:null}async function Ce(){const e=await $("GET","?select=data,version",null);return e&&e.length?e[0]:null}async function at(e){const t=await $("POST","",{data:e,version:1},"return=representation");return t.conflict||(ee=Date.now()),t.conflict?null:{data:e,version:1}}async function H(e,t){const n=await $("PATCH",`?user_id=eq.${f.user.id}&version=eq.${t}`,{data:e,version:t+1,updated_at:new Date().toISOString()},"return=representation");return n&&n.length&&(ee=Date.now()),n&&n.length?{data:e,version:t+1}:null}let x,G=!1;const oe="syncBase",N=()=>ge(()=>import("./idb-C0B5Ti2O.js"),[],import.meta.url);function F(){if(x===void 0)try{x=localStorage.getItem(M)}catch{x=null}try{return x?JSON.parse(x):null}catch{return null}}function w(e){x=JSON.stringify(e);try{localStorage.setItem(M,x),G&&(G=!1,N().then(({idbDel:t})=>t("mirror",oe)).catch(()=>{}))}catch{try{localStorage.removeItem(M)}catch{}G=!0,N().then(({idbPut:n})=>n("mirror",oe,{at:Date.now(),text:x})).catch(()=>{})}}function be(){x=null,Ae(M,null),G&&N().then(({idbDel:e})=>e("mirror",oe)).catch(()=>{}),G=!1}let ce=null;function st(){return localStorage.getItem(M)||typeof indexedDB>"u"?Promise.resolve():N().then(({idbGet:e})=>Promise.race([e("mirror",oe),new Promise(t=>setTimeout(()=>t(null),1500))])).then(e=>{e!=null&&e.text&&!localStorage.getItem(M)&&(x=e.text,G=!0)}).catch(()=>{})}let Q=null,le=!1;function S(){return!f||!j()?Promise.resolve():Q?(le=!0,Q):(Q=(async()=>{ce||(ce=st()),await ce,g({phase:"syncing",error:null});try{for(let e=0;e<4&&!await lt();e++);O.phase!=="choose"&&g({phase:"idle",lastSync:Date.now()}),ie&&vt()}catch(e){const t=typeof navigator<"u"&&navigator.onLine===!1;g({phase:"error",error:t?"인터넷에 연결되어 있지 않아요. 연결되면 자동으로 다시 맞춰요.":e.message})}finally{Q=null,le&&(le=!1,S())}})(),Q)}const Ne=5*6e4;let ee=0;const ct=(e,t)=>_({...e,workLog:null},{...t,workLog:null});async function lt(){return await pt()?kt():je()}function ve(e,t,n,o,r){var a,c;const i=Fe(t,n,o,r);if(i!==o){console.warn(`[sync] '${e}' 칸이 서버 쪽 때문에 한꺼번에 비어서 지우지 않고 남겼어요`);try{(c=(a=window.planner)==null?void 0:a.appLog)==null||c.call(a,`[동기화] '${e}' 한꺼번에 사라짐 막음 (이 기기 ${Array.isArray(n)?n.length:Object.keys(n||{}).length}개 → 합친 결과 ${Array.isArray(o)?o.length:Object.keys(o||{}).length}개)`)}catch{}}return i}function ut(e,t,n,o){if(!n||typeof n!="object")return n;const r={...n};for(const i of new Set([...Object.keys(t||{}),...Object.keys(n)])){if(i.startsWith("_"))continue;const a=ve(i,e==null?void 0:e[i],t==null?void 0:t[i],n[i],o==null?void 0:o[i]);a!==n[i]&&(r[i]=a)}return r}async function je(){const e=b(),t=F();if(t){const a=await Re();if(a===t.version){if(_(e,t.data)||Date.now()-ee<Ne&&ct(e,t.data))return!0;const c=await H(e,a);return c?(w(c),!0):!1}}const n=await Ce();if(!n){const a=await at(e);return a?(w(a),!0):!1}if(!t)return _(e,n.data)?(w(n),!0):De(e,n.data)?(await Je(n),!0):(C=n,g({phase:"choose"}),!0);if(n.version===t.version){if(_(e,t.data))return!0;const a=await H(e,n.version);return a?(w(a),!0):!1}const o=ut(t.data,e,Z(t.data,e,n.data),n.data),r=b();if(I(_(r,e)?o:Z(e,r,o)),_(o,n.data))return w(n),!0;const i=await H(o,n.version);return i?(w(i),!0):!1}const dt=10*6e4,ft=14*864e5,te="yeonkki-sync-kv:",xe=e=>e.startsWith("_");let k=null;function zt(){return k!=="ok"&&(k=null),S()}async function pt(){if(k==="ok")return!0;if(k&&Date.now()-k.missing<dt)return!1;try{await $("GET","?select=k&limit=1",null,null,Y),k="ok"}catch(e){if(!e.missing)throw e;k={missing:Date.now()}}return g({mode:k==="ok"?"kv":"legacy"}),k==="ok"}let L=null;const Se=()=>typeof indexedDB<"u";async function ht(){if(L)return L;const e=new Map,t=(n,o)=>{var r;return o&&typeof o.v=="number"&&!(((r=e.get(n))==null?void 0:r.v)>o.v)&&e.set(n,o)};if(Se())try{const{idbKeys:n,idbGet:o}=await N(),r=(await n("mirror")).map(String).filter(a=>a.startsWith("kv:")),i=await Promise.all(r.map(a=>o("mirror",a)));r.forEach((a,c)=>t(a.slice(3),i[c]))}catch{}try{for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o!=null&&o.startsWith(te)&&t(o.slice(te.length),JSON.parse(localStorage.getItem(o)))}}catch{}return L=e,e}const fe=e=>{const t=L==null?void 0:L.get(e);return t?{v:t.v,data:JSON.parse(t.text)}:null};function R(e,t,n){const o={v:t,text:JSON.stringify(n??null)};L.set(e,o);const r=()=>{try{localStorage.setItem(te+e,JSON.stringify(o))}catch{}};if(!Se())return r();N().then(({idbPut:i})=>i("mirror",`kv:${e}`,o)).then(()=>localStorage.removeItem(te+e),r)}function $e(){L=null,k=null;try{for(const e of Object.keys(localStorage))e.startsWith(te)&&localStorage.removeItem(e)}catch{}Se()&&N().then(async({idbKeys:e,idbDel:t})=>{for(const n of await e("mirror"))String(n).startsWith("kv:")&&await t("mirror",n)}).catch(()=>{})}const re=e=>Object.keys(e).filter(t=>!xe(t)&&e[t]!==void 0);async function pe(e){const t=await $("GET",`?select=k,data,version&k=in.(${e.map(encodeURIComponent).join(",")})`,null,null,Y);return new Map((t||[]).map(n=>[n.k,{data:n.data,version:n.version}]))}async function mt(e,t,n){const o=await $("PATCH",`?user_id=eq.${f.user.id}&k=eq.${encodeURIComponent(e)}&version=eq.${n}&select=k,version`,{data:t,version:n+1,updated_at:new Date().toISOString()},"return=representation",Y);return o&&o.length?n+1:null}async function Be(e){if(!e.length)return new Set;const t=await $("POST","?on_conflict=user_id,k&select=k",e.map(([n,o])=>({k:n,data:o,version:1})),"return=representation,resolution=ignore-duplicates",Y);return new Set((t!=null&&t.conflict?[]:t||[]).map(n=>n.k))}async function yt(){let e=!1;for(let r=0;r<4&&!e;r++)e=await je();if(!e||O.phase==="choose")return!0;const t=F();if(!t)return!1;try{const{makeBackup:r}=await ge(async()=>{const{makeBackup:i}=await import("./backup-BPRpPcR3.js");return{makeBackup:i}},__vite__mapDeps([0,1,2,3,4]),import.meta.url);await r("동기화옮기기전")}catch(r){console.warn("[sync] 옮기기 전 백업 실패 (예전 줄은 그대로라 계속)",r)}const n=re(t.data).map(r=>[r,t.data[r]]),o=await Be(n);if(o.size){const r=await pe([...o]);for(const i of o){if(!r.has(i)||!_(r.get(i).data,t.data[i]))throw k={missing:Date.now()+365*864e5},g({mode:"legacy"}),new Error("동기화 옮기기를 확인하다 다른 점을 찾아서 예전 방식으로 계속 맞춰요.");R(i,r.get(i).version,r.get(i).data)}}return!1}async function gt(){var r,i,a;const e=F(),t=await Re();if(t==null||e&&t===e.version)return!1;const n=await Ce();if(!n)return!1;if(!e)return w(n),!1;const o=((r=n.data)==null?void 0:r._kv)!==n.version;if(o){const c=b(),l={};for(const d of re(n.data)){const y=ve(d,(i=e==null?void 0:e.data)==null?void 0:i[d],c[d],Z((a=e==null?void 0:e.data)==null?void 0:a[d],c[d],n.data[d]),n.data[d]);_(y,c[d])||(l[d]=y)}Object.keys(l).length&&I(l),await $("POST","?on_conflict=user_id,k",{k:"_bridge",data:{at:Date.now()},version:1,updated_at:new Date().toISOString()},"resolution=merge-duplicates",Y)}return w(n),o}async function _t(){const e=F();if(!e)return;const t={...b(),_kv:e.version+1},n=await H(t,e.version);n&&w(n)}async function kt(){var T,W;await ht();const e=await $("GET","?select=k,version,updated_at",null,null,Y)||[],t=new Map(e.filter(s=>!xe(s.k)).map(s=>[s.k,s.version]));if(!t.size)return yt();if(!L.size&&!F()){const s=b(),u=await pe([...t.keys()]),p=Object.fromEntries([...u].map(([m,A])=>[m,A.data]));if(re(s).every(m=>_(s[m],p[m]))&&Object.keys(p).every(m=>_(s[m],p[m]))){for(const[m,A]of u)R(m,A.version,A.data);return!0}return De(s,p)?(await Je({kv:u,data:p}),!0):(C={kv:u,data:p},g({phase:"choose"}),!0)}const n=await gt(),o=(T=e.find(s=>s.k==="_bridge"))==null?void 0:T.updated_at,r=n||o&&Date.now()-Date.parse(o)<ft,i=F(),a=b(),c=[...t].filter(([s,u])=>{var p;return((p=fe(s))==null?void 0:p.v)!==u}).map(([s])=>s),l=c.length?await pe(c):new Map,d={},y=[];for(const s of new Set([...re(a),...t.keys()])){const u=a[s],p=fe(s);if(l.has(s)){const m=l.get(s),A=p?p.data:(W=i==null?void 0:i.data)==null?void 0:W[s],K=ve(s,A,u,Z(A,u,m.data),m.data);K!==void 0&&!_(K,u)&&(d[s]=K),R(s,m.version,m.data),K!==void 0&&!_(K,m.data)&&y.push([s,K,m.version])}else t.has(s)?u!==void 0&&!_(u,p.data)&&y.push([s,u,t.get(s)]):u!==void 0&&y.push([s,u,null])}if(Object.keys(d).length){const s=b();for(const u of Object.keys(d))s[u]!==a[u]&&(d[u]=Z(a[u],s[u],d[u]));I(d)}const D=y.filter(([s])=>!(s==="workLog"&&y.length===1&&!l.has(s)&&Date.now()-ee<Ne));if(!D.length)return!0;let v=!1;const J=D.filter(([,,s])=>s==null),P=await Be(J.map(([s,u])=>[s,u]));for(const[s,u]of J)P.has(s)?R(s,1,u):v=!0;const V=await Promise.all(D.filter(([,,s])=>s!=null).map(async([s,u,p])=>[s,u,await mt(s,u,p)]));for(const[s,u,p]of V)p?R(s,p,u):v=!0;return ee=Date.now(),r&&await _t(),!v}let C=null;const X=e=>{try{return JSON.stringify(e??{}).length}catch{return 0}},De=(e,t)=>X(t)>2e4&&X(e)<X(t)*.3;async function Je(e){try{const{makeBackup:t}=await ge(async()=>{const{makeBackup:n}=await import("./backup-BPRpPcR3.js");return{makeBackup:n}},__vite__mapDeps([0,1,2,3,4]),import.meta.url);await t("처음로그인전")}catch{}if(e.kv)for(const[t,n]of e.kv)R(t,n.version,n.data);else w(e);I(e.data)}function Gt(){if(!C)return null;const e=b(),t=C.data||{},n=r=>Array.isArray(r)?r.length:r&&typeof r=="object"?Object.keys(r).length:0;return{rows:[["일정·할 일","items"],["커미션","commissions"],["시험","exams"],["일기","diary"],["가계부","ledger"],["트래커","trackers"]].map(([r,i])=>({name:r,local:n(e[i]),remote:n(t[i])})),smaller:X(e)<X(t)}}async function Ut(e){var n,o;if(!C)return;const t=C;C=null;try{if(t.kv){for(const[r,i]of t.kv)R(r,i.version,i.data);if(e==="remote")I(t.data);else{const r={...((n=t.data)==null?void 0:n.workLog)||{}};for(const[i,a]of Object.entries(b().workLog||{}))r[i]={...r[i]||{},...a};I({workLog:r}),await S()}}else if(e==="remote")I(t.data),w(t);else{const r=b(),i={...((o=t.data)==null?void 0:o.workLog)||{}};for(const[c,l]of Object.entries(r.workLog||{}))i[c]={...i[c]||{},...l};r.workLog=i,I({workLog:i});const a=await H(r,t.version);if(w(a||t),!a)return S()}g({phase:"idle",lastSync:Date.now()}),Ee()}catch(r){g({phase:"error",error:r.message})}}let ie=null,he=null,ne=null,me=null;function wt(e){const t={};for(const n of Object.keys(e))t[n]={ref:e[n],json:null};return t}function bt(e){const t=[];for(const n of Object.keys(e)){const o=me[n];if(o&&o.ref===e[n])continue;const r=JSON.stringify(e[n])??"";(!o||(o.json??JSON.stringify(o.ref)??"")!==r)&&t.push(n),me[n]={ref:e[n],json:r}}return t}function U(){if(document.visibilityState==="hidden")return Ke();S()}let E=null,ye=null;function vt(){E||k!=="ok"||!f||O.phase==="choose"||document.visibilityState==="hidden"||(E=Ve({url:B(),key:h.key,token:q,uid:f.user.id,onChange:({k:e,version:t})=>{var n;xe(e)||((n=fe(e))==null?void 0:n.v)===t||(clearTimeout(ye),ye=setTimeout(S,300))}}))}function Ke(){clearTimeout(ye),E==null||E.close(),E=null}function Ee(){ze(),ie=setInterval(()=>document.visibilityState!=="hidden"&&S(),We),window.addEventListener("focus",U),window.addEventListener("online",U),document.addEventListener("visibilitychange",U),me=wt(b()),ne=Me(()=>{if(de||O.phase==="choose")return;const e=bt(b());e.length&&(e.every(t=>t==="workLog")||(clearTimeout(he),he=setTimeout(S,Qe)))})}function ze(){Ke(),clearInterval(ie),ie=null,clearTimeout(he),window.removeEventListener("focus",U),window.removeEventListener("online",U),document.removeEventListener("visibilitychange",U),ne&&ne(),ne=null}async function Ge(){g({phase:"idle",email:f.user.email,error:null}),await S(),O.phase!=="choose"&&Ee()}function Mt(){tt(),!(!j()||!f)&&(g({phase:"idle",email:f.user.email}),Ee(),S())}export{ot as KV_SQL,jt as MAIL_SQL,Tt as SETUP_SQL,z as STORAGE_BUCKET,Rt as STORAGE_SQL,Ct as STUDY_SQL,Ie as SYNC_KEYS,Ot as clearServer,Ze as connectCode,Lt as connectLink,Gt as firstSyncCompare,Mt as initSync,j as isConfigured,He as keyProblem,Pe as normalizeUrl,et as parseConnectCode,b as pick,zt as recheckKv,Ut as resolveFirstSync,Bt as restFetch,$t as serverInfo,Xe as setServer,At as signIn,we as signOut,Pt as signUp,Kt as storageFetch,Nt as studyLogFetch,S as syncNow,Dt as syncUserId,Et as testServer,De as thinLocal,It as useSyncStatus,Jt as worksFetch};
