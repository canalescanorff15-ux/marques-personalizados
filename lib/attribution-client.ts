export type MarketingAttribution={source?:string;medium?:string;campaign?:string;content?:string;term?:string;landing_path?:string;referrer_host?:string};
const KEY='marques.marketing.attribution.v1';
function clean(value:unknown,max=100){return String(value??'').trim().replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').slice(0,max);}

export function sanitizeAttribution(value:unknown):MarketingAttribution{
  if(!value||typeof value!=='object'||Array.isArray(value))return{};
  const input=value as Record<string,unknown>;
  const source=clean(input.source,80);
  const medium=clean(input.medium,80);
  const campaign=clean(input.campaign,120);
  const content=clean(input.content,120);
  const term=clean(input.term,120);
  const landingPath=clean(input.landing_path,180);
  const referrerHost=clean(input.referrer_host,120).toLowerCase();
  return{
    ...(source?{source}:{}),
    ...(medium?{medium}:{}),
    ...(campaign?{campaign}:{}),
    ...(content?{content}:{}),
    ...(term?{term}:{}),
    ...(landingPath.startsWith('/')?{landing_path:landingPath}:{}),
    ...(referrerHost&&/^[a-z0-9.-]+$/i.test(referrerHost)?{referrer_host:referrerHost}:{})
  };
}

export function captureAttribution():MarketingAttribution{
  if(typeof window==='undefined')return{};
  try{
    const existing=JSON.parse(sessionStorage.getItem(KEY)||'null');
    if(existing&&typeof existing==='object'){
      const safe=sanitizeAttribution(existing);
      const stored:MarketingAttribution={...safe,source:safe.source||'direto'};
      try{sessionStorage.setItem(KEY,JSON.stringify(stored));}catch{}
      return stored;
    }
  }catch{
    try{sessionStorage.removeItem(KEY);}catch{}
  }
  const url=new URL(window.location.href);
  let referrerHost='';
  try{
    if(document.referrer){
      const ref=new URL(document.referrer);
      if(ref.host!==window.location.host)referrerHost=clean(ref.host,120);
    }
  }catch{}
  const source=clean(url.searchParams.get('utm_source'),80)||referrerHost||'direto';
  const data=sanitizeAttribution({
    source,
    medium:clean(url.searchParams.get('utm_medium'),80),
    campaign:clean(url.searchParams.get('utm_campaign'),120),
    content:clean(url.searchParams.get('utm_content'),120),
    term:clean(url.searchParams.get('utm_term'),120),
    landing_path:clean(url.pathname,180),
    ...(referrerHost?{referrer_host:referrerHost}:{})
  });
  try{sessionStorage.setItem(KEY,JSON.stringify(data));}catch{}
  return data;
}
export function getAttribution(){return captureAttribution();}
