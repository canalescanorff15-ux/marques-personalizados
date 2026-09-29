const CANONICAL_PRODUCTION_ORIGIN='https://merlin.encantos.workers.dev';

function localHostname(hostname:string){
  const host=hostname.toLowerCase().replace(/^\[|\]$/g,'');
  return host==='localhost'||host==='127.0.0.1'||host==='::1';
}

function normalizeOrigin(rawValue:string){
  const raw=String(rawValue||'').trim();
  if(!raw)return'';
  try{
    const url=new URL(raw);
    if(url.username||url.password||url.pathname!=='/'||url.search||url.hash)return'';
    if(url.protocol!=='https:'&&!(url.protocol==='http:'&&localHostname(url.hostname)))return'';
    return url.origin;
  }catch{return'';}
}

function configuredProductionOrigin(){
  return normalizeOrigin(String(process.env.NEXT_PUBLIC_SITE_URL||''));
}

function trustedProductionOrigins(){
  const origins=new Set<string>([CANONICAL_PRODUCTION_ORIGIN]);
  const configured=configuredProductionOrigin();
  if(configured)origins.add(configured);
  return origins;
}

export function trustedRequestOrigin(request:Request){
  if(process.env.NODE_ENV==='production')return configuredProductionOrigin()||CANONICAL_PRODUCTION_ORIGIN;
  try{return new URL(request.url).origin;}catch{return'';}
}

export function sameOriginBoundary(request:Request){
  const fetchSite=request.headers.get('sec-fetch-site')?.trim().toLowerCase();
  if(fetchSite&&!['same-origin','none'].includes(fetchSite))return false;

  const trusted=process.env.NODE_ENV==='production'
    ? trustedProductionOrigins()
    : new Set([trustedRequestOrigin(request)].filter(Boolean));
  if(!trusted.size)return false;

  const origin=request.headers.get('origin');
  if(origin){try{return trusted.has(new URL(origin).origin);}catch{return false;}}
  const referer=request.headers.get('referer');
  if(referer){try{return trusted.has(new URL(referer).origin);}catch{return false;}}

  // Requisições não-browser (CLI/health tooling) não carregam Fetch Metadata.
  // No navegador, Origin/Referer + Sec-Fetch-Site continuam protegendo mutações cross-site.
  return !fetchSite;
}
