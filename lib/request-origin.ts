function localHostname(hostname:string){
  const host=hostname.toLowerCase().replace(/^\[|\]$/g,'');
  return host==='localhost'||host==='127.0.0.1'||host==='::1';
}

const OFFICIAL_PRODUCTION_ORIGINS=new Set([
  'https://merlin.encantos.workers.dev',
  // Alias de transição mantido para não quebrar pedidos durante propagação/cache antigo.
  'https://merlin-encantos-em-papel.encantos.workers.dev',
  'https://merlin-encantos-em-papel.canalescanorff15.workers.dev'
]);

function configuredProductionOrigin(){
  const raw=String(process.env.NEXT_PUBLIC_SITE_URL||'').trim();
  if(!raw)return'';
  try{
    const url=new URL(raw);
    if(url.username||url.password||url.pathname!=='/'||url.search||url.hash)return'';
    if(url.protocol!=='https:'&&!(url.protocol==='http:'&&localHostname(url.hostname)))return'';
    return url.origin;
  }catch{return'';}
}

function allowedProductionOrigins(){
  const allowed=new Set(OFFICIAL_PRODUCTION_ORIGINS);
  const configured=configuredProductionOrigin();
  if(configured)allowed.add(configured);
  return allowed;
}

export function trustedRequestOrigin(request:Request){
  try{
    const requestOrigin=new URL(request.url).origin;
    if(process.env.NODE_ENV!=='production')return requestOrigin;
    return allowedProductionOrigins().has(requestOrigin)?requestOrigin:'';
  }catch{return'';}
}

export function sameOriginBoundary(request:Request){
  const fetchSite=request.headers.get('sec-fetch-site')?.trim().toLowerCase();
  if(fetchSite&&!['same-origin','none'].includes(fetchSite))return false;
  const expected=trustedRequestOrigin(request);if(!expected)return false;
  const origin=request.headers.get('origin');
  if(origin){try{return new URL(origin).origin===expected;}catch{return false;}}
  const referer=request.headers.get('referer');
  if(referer){try{return new URL(referer).origin===expected;}catch{return false;}}
  // Clientes não-browser sem Fetch Metadata continuam suportados somente quando
  // o próprio URL da requisição pertence à lista explícita de origens confiáveis.
  return !fetchSite;
}
