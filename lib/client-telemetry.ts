export function isCanonicalTelemetryOrigin(){
  if(typeof window==='undefined')return false;
  const configured=String(process.env.NEXT_PUBLIC_SITE_URL||'').trim();
  if(!configured)return true;
  try{return window.location.origin===new URL(configured).origin;}catch{return false;}
}
