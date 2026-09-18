import process from 'node:process';
import crypto from 'node:crypto';

const base=(process.argv[2]||process.env.E2E_BASE_URL||'').replace(/\/$/,'');
if(!/^https?:\/\//.test(base)){console.error('Uso: npm run check:e2e -- http://127.0.0.1:3100');process.exit(1);}
const origin=new URL(base).origin;
const adminPassword=process.env.E2E_ADMIN_PASSWORD||'';
const adminTotpSecret=(process.env.E2E_ADMIN_TOTP_SECRET||'').toUpperCase().replace(/[\s-]+/g,'').replace(/=+$/,'');
let failures=0;
let assertions=0;

const base32Alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function decodeBase32(secret){let bits='';for(const char of secret){const index=base32Alphabet.indexOf(char);if(index<0)throw new Error('E2E_ADMIN_TOTP_SECRET inválido.');bits+=index.toString(2).padStart(5,'0');}const bytes=[];for(let offset=0;offset+8<=bits.length;offset+=8)bytes.push(Number.parseInt(bits.slice(offset,offset+8),2));return Buffer.from(bytes);}
function currentTotp(secret){const step=Math.floor(Date.now()/1000/30);const counter=Buffer.alloc(8);counter.writeBigUInt64BE(BigInt(step));const digest=crypto.createHmac('sha1',decodeBase32(secret)).update(counter).digest();const offset=digest[digest.length-1]&15;const binary=((digest[offset]&127)<<24)|((digest[offset+1]&255)<<16)|((digest[offset+2]&255)<<8)|(digest[offset+3]&255);return String(binary%1_000_000).padStart(6,'0');}


function assert(ok,label,detail=''){assertions++;console.log(`${ok?'✓':'✗'} ${label}${detail?` — ${detail}`:''}`);if(!ok)failures++;}
async function request(path,options={}){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12_000);try{return await fetch(`${base}${path}`,{redirect:'manual',...options,signal:controller.signal});}finally{clearTimeout(timer);}}
async function bodyJson(response){try{return await response.json();}catch{return {};}}
function sameOriginHeaders(extra={}){return {'origin':origin,'referer':`${origin}/`,'sec-fetch-site':'same-origin',...extra};}
function responseSetCookies(response){
  if(typeof response.headers.getSetCookie==='function'){
    const values=response.headers.getSetCookie();
    if(Array.isArray(values)&&values.length)return values;
  }
  const raw=response.headers.get('set-cookie')||'';
  if(!raw)return [];
  return raw.split(/,(?=\s*[^;,=\s]+=[^;,]*)/g).map(value=>value.trim()).filter(Boolean);
}
function parsedSetCookie(header){
  const parts=String(header||'').split(';').map(part=>part.trim()).filter(Boolean);
  const first=parts.shift()||'';const index=first.indexOf('=');
  if(index<1)return null;
  const name=first.slice(0,index).trim();const value=first.slice(index+1);
  const attributes=new Map();
  for(const part of parts){const sep=part.indexOf('=');const key=(sep<0?part:part.slice(0,sep)).trim().toLowerCase();const attrValue=sep<0?'':part.slice(sep+1).trim();attributes.set(key,attrValue);}
  return{name,value,attributes,raw:String(header||'')};
}
function setCookieByName(response,name){return responseSetCookies(response).map(parsedSetCookie).find(cookie=>cookie?.name===name)||null;}
function applySetCookies(jar,response){
  for(const parsed of responseSetCookies(response).map(parsedSetCookie)){
    if(!parsed)continue;
    const maxAge=parsed.attributes.get('max-age');
    if(parsed.value===''||maxAge==='0')jar.delete(parsed.name);else jar.set(parsed.name,parsed.value);
  }
}
function cookieHeader(jar){return [...jar].map(([name,value])=>`${name}=${value}`).join('; ');}


async function waitForServer(){for(let i=0;i<40;i++){try{const r=await request('/api/health?mode=live');if(r.ok)return true;}catch{}await new Promise(resolve=>setTimeout(resolve,500));}return false;}

try{
  const up=await waitForServer();assert(up,'Servidor iniciou e respondeu ao liveness');if(!up)throw new Error('Servidor indisponível.');

  let r=await request('/');assert(r.ok,'Home responde',`HTTP ${r.status}`);const html=await r.text();assert(/<main|<body/i.test(html),'Home retorna documento HTML');

  r=await request('/admin/login');assert(r.ok,'Login administrativo responde',`HTTP ${r.status}`);const adminCsp=r.headers.get('content-security-policy')||'';const adminScript=adminCsp.split(';').map(x=>x.trim()).find(x=>x.startsWith('script-src '))||'';assert(/'nonce-[A-Za-z0-9+/_=-]+'/.test(adminScript),'Admin recebe nonce CSP por requisição');assert(adminScript.includes("'strict-dynamic'")&&!adminScript.includes("'unsafe-inline'"),'Admin bloqueia script inline sem nonce');assert((r.headers.get('cache-control')||'').includes('no-store'),'Login administrativo não é armazenado em cache');assert((r.headers.get('x-robots-tag')||'').includes('noindex'),'Login administrativo recebe X-Robots-Tag noindex');

  r=await request('/catalogo');assert(r.ok,'Catálogo de topos responde',`HTTP ${r.status}`);
  r=await request('/catalogo/essencial');assert(r.ok,'Detalhe TOP-01 responde',`HTTP ${r.status}`);
  const topperHtml=await r.text();assert(/Topo Essencial|TOP-01/i.test(topperHtml),'Detalhe TOP-01 contém identificação do nível');
  r=await request('/monte-seu-topo');assert(r.ok,'Monte seu topo responde',`HTTP ${r.status}`);
  const builderHtml=await r.text();assert(/Monte seu topo|Do simples ao Elite/i.test(builderHtml),'Configurador de topo retorna a nova jornada');
  r=await request('/monte-seu-kit');assert([301,302,303,307,308].includes(r.status),'Monte seu kit legado redireciona',`HTTP ${r.status}`);assert((r.headers.get('location')||'').includes('/monte-seu-topo'),'Redirecionamento legado aponta para Monte seu topo');
  r=await request('/categorias/legado');assert([301,302,303,307,308].includes(r.status),'Categoria legada não expõe catálogo antigo',`HTTP ${r.status}`);
  r=await request('/api/catalog?page=1&limit=3');const catalog=await bodyJson(r);assert(r.ok&&Array.isArray(catalog.items),'API de catálogo preservada para compatibilidade interna');assert(Number.isInteger(catalog.page)&&Number.isInteger(catalog.page_size),'API de catálogo mantém paginação consistente');
  const first=Array.isArray(catalog.items)?catalog.items[0]:null;
  if(first?.slug){
    r=await request(`/api/quote-list?items=${encodeURIComponent(`${first.slug}:1`)}`);const shared=await bodyJson(r);assert(r.ok&&Array.isArray(shared.items),'Lista compartilhável continua revalidada no servidor');
    const token=String(first.name||'').trim().split(/\s+/)[0]||'topo';r=await request(`/api/search?q=${encodeURIComponent(token)}`);const search=await bodyJson(r);assert(r.ok&&Array.isArray(search.products)&&Array.isArray(search.categories),'API de busca legada mantém contrato interno');
  }

  r=await request('/api/concierge',{method:'POST',headers:sameOriginHeaders({'content-type':'application/json'}),body:JSON.stringify({theme:'aniversário',categories:[]})});const concierge=await bodyJson(r);assert(r.ok&&Array.isArray(concierge.products),'Concierge responde com recomendações');
  r=await request('/api/events',{method:'POST',headers:sameOriginHeaders({'content-type':'application/json'}),body:JSON.stringify({event:'page_view',path:'/e2e'})});const event=await bodyJson(r);assert(r.ok&&event.ok===true,'Telemetria aceita evento same-origin');

  r=await request('/api/inquiries',{method:'POST',headers:sameOriginHeaders({'content-type':'application/json'}),body:'[]'});assert(r.status===400,'Orçamento rejeita JSON que não seja objeto',`HTTP ${r.status}`);
  r=await request('/api/inquiries',{method:'POST',headers:sameOriginHeaders({'content-type':'application/json'}),body:JSON.stringify({name:'A'})});assert(r.status===400,'Orçamento rejeita formulário incompleto',`HTTP ${r.status}`);
  r=await request('/api/inquiries',{method:'POST',headers:{'content-type':'application/json','origin':'https://cross-origin.invalid','sec-fetch-site':'cross-site'},body:'{}'});assert(r.status===403,'Orçamento rejeita origem cruzada',`HTTP ${r.status}`);

  r=await request('/api/admin/backup');assert(r.status===401,'Backup exige autenticação',`HTTP ${r.status}`);
  r=await request('/api/admin/login',{method:'POST',headers:sameOriginHeaders({'content-type':'application/json'}),body:JSON.stringify({password:'__invalid_e2e_password__'})});assert(r.status===401,'Login rejeita senha inválida',`HTTP ${r.status}`);

  if(adminPassword){
    const jar=new Map();
    r=await request('/api/admin/login',{method:'POST',headers:sameOriginHeaders({'content-type':'application/json'}),body:JSON.stringify({password:adminPassword})});const login=await bodyJson(r);const loginChallenge=setCookieByName(r,'catalog_admin_mfa_challenge');applySetCookies(jar,r);assert(r.ok&&login.ok===true,'Senha administrativa válida é aceita',`HTTP ${r.status}`);
    if(login.mfa_required){
      assert(Boolean(loginChallenge)&&loginChallenge.attributes.has('httponly'),'Senha válida emite desafio MFA temporário HttpOnly');
      assert(Boolean(adminTotpSecret),'E2E possui segredo TOTP para concluir o segundo fator');
      const code=currentTotp(adminTotpSecret);const wrong=code==='000000'?'000001':'000000';
      r=await request('/api/admin/mfa/verify',{method:'POST',headers:sameOriginHeaders({'content-type':'application/json','cookie':cookieHeader(jar)}),body:JSON.stringify({code:wrong})});assert(r.status===401,'MFA rejeita código incorreto',`HTTP ${r.status}`);
      r=await request('/api/admin/mfa/verify',{method:'POST',headers:sameOriginHeaders({'content-type':'application/json','cookie':cookieHeader(jar)}),body:JSON.stringify({code})});const mfa=await bodyJson(r);const sessionCookie=setCookieByName(r,'catalog_admin_session');applySetCookies(jar,r);assert(r.ok&&mfa.ok===true,'MFA aceita código TOTP válido',`HTTP ${r.status}`);assert(Boolean(sessionCookie)&&sessionCookie.attributes.has('httponly')&&jar.has('catalog_admin_session'),'MFA concluído emite cookie de sessão HttpOnly');
    }else{
      const sessionCookie=setCookieByName(r,'catalog_admin_session');assert(Boolean(sessionCookie)&&sessionCookie.attributes.has('httponly')&&jar.has('catalog_admin_session'),'Login não-MFA em ambiente local emite cookie de sessão HttpOnly');
    }
    const authHeaders={'cookie':cookieHeader(jar)};
    r=await request('/admin',{headers:authHeaders});assert(r.ok,'Sessão autenticada acessa /admin',`HTTP ${r.status}`);
    r=await request('/api/admin/analytics?days=7',{headers:authHeaders});const analytics=await bodyJson(r);assert(r.ok&&analytics.days===7&&analytics.analytics,'Sessão autenticada acessa API administrativa');
    r=await request('/api/admin/sessions',{headers:authHeaders});const sessionState=await bodyJson(r);assert(r.ok&&['database','stateless'].includes(sessionState.store)&&Array.isArray(sessionState.sessions),'Sessão autenticada consulta dispositivos ativos');if(sessionState.store==='database')assert(typeof sessionState.current_session_id==='string'&&sessionState.sessions.some(session=>session.id===sessionState.current_session_id),'Sessão atual aparece no controle de dispositivos');
    r=await request('/api/admin/security',{headers:authHeaders});const securityState=await bodyJson(r);assert(r.ok&&['database','stateless'].includes(securityState.store)&&Array.isArray(securityState.devices)&&Array.isArray(securityState.events),'Sessão autenticada acessa central de segurança');
    r=await request('/api/admin/operations?summary=1',{headers:authHeaders});const operationsState=await bodyJson(r);assert(r.ok&&operationsState.schema&&operationsState.integrity&&operationsState.audit_integrity&&operationsState.storage&&operationsState.release&&operationsState.incident_summary,'Sessão autenticada acessa central operacional');
    r=await request('/api/admin/restore',{headers:authHeaders});const restoreState=await bodyJson(r);assert(r.ok&&Array.isArray(restoreState.snapshots),'Sessão autenticada acessa snapshots de recuperação');
    r=await request('/api/admin/logout',{method:'POST',headers:sameOriginHeaders(authHeaders)});const logout=await bodyJson(r);const clearedSession=setCookieByName(r,'catalog_admin_session');assert(r.ok&&logout.ok===true,'Logout administrativo funciona');assert(Boolean(clearedSession)&&clearedSession.value===''&&clearedSession.attributes.get('max-age')==='0','Logout expira o cookie administrativo');applySetCookies(jar,r);
    r=await request('/admin',{headers:{cookie:cookieHeader(jar)}});const loggedOutBody=[302,303,307,308].includes(r.status)?'':await r.text();const redirectedToLogin=[302,303,307,308].includes(r.status)||(r.status===200&&/admin\/login/i.test(loggedOutBody)&&/(http-equiv=[\"']refresh|NEXT_REDIRECT|redirect)/i.test(loggedOutBody));assert(redirectedToLogin,'Navegador sem cookie ativo volta a exigir login',`HTTP ${r.status}`);
  }else console.warn('Aviso: E2E_ADMIN_PASSWORD ausente; fluxo positivo de login foi ignorado.');
}catch(error){console.error('Falha inesperada no E2E HTTP:',error instanceof Error?error.message:String(error));failures++;}

if(failures){console.error(`E2E HTTP: ${failures} falha(s) em ${assertions} asserções.`);process.exit(1);}console.log(`E2E HTTP: OK (${assertions} asserções funcionais).`);
