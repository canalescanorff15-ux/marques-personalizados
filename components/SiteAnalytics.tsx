'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type IdleCapableWindow=Window&{requestIdleCallback?:(callback:()=>void,options?:{timeout:number})=>number;cancelIdleCallback?:(id:number)=>void};
function send(event:string,path:string){const body=JSON.stringify({event,path});try{if(navigator.sendBeacon){navigator.sendBeacon('/api/events',new Blob([body],{type:'application/json'}));return;}}catch{}fetch('/api/events',{method:'POST',headers:{'content-type':'application/json'},body,keepalive:true}).catch(()=>{});}
export function trackSessionEvent(event:string,path:string,key:string){try{if(sessionStorage.getItem(key))return;sessionStorage.setItem(key,'1');}catch{}send(event,path);}
export default function SiteAnalytics(){
  const pathname=usePathname();
  useEffect(()=>{
    const path=pathname||'/';if(path.startsWith('/admin'))return;
    const idleWindow=window as IdleCapableWindow;let cancelled=false;let timeoutId=0;let idleId=0;
    const run=()=>{if(!cancelled)trackSessionEvent('page_view',path,`marques:pv:${path}`);};
    if(idleWindow.requestIdleCallback)idleId=idleWindow.requestIdleCallback(run,{timeout:1600});else timeoutId=window.setTimeout(run,700);
    return()=>{cancelled=true;if(idleId)idleWindow.cancelIdleCallback?.(idleId);if(timeoutId)clearTimeout(timeoutId);};
  },[pathname]);
  useEffect(()=>{
    if((pathname||'/').startsWith('/admin'))return;
    const onClick=(event:MouseEvent)=>{const target=event.target instanceof Element?event.target.closest('a[href]'):null;if(!(target instanceof HTMLAnchorElement))return;let url:URL;try{url=new URL(target.href,location.href);}catch{return;}const host=url.hostname.replace(/^www\./,'').toLowerCase();if(host==='wa.me'||host.endsWith('whatsapp.com')){trackSessionEvent('whatsapp_click',pathname||'/',`marques:wa:${pathname||'/'}`);return;}const networks:['instagram'|'facebook'|'tiktok'|'pinterest'|'youtube',string[]][]=[['instagram',['instagram.com']],['facebook',['facebook.com','fb.com']],['tiktok',['tiktok.com']],['pinterest',['pinterest.com','pin.it']],['youtube',['youtube.com','youtu.be']]];for(const [name,hosts] of networks)if(hosts.some(h=>host===h||host.endsWith(`.${h}`))){trackSessionEvent('social_click',name,`marques:social:${name}`);break;}};
    document.addEventListener('click',onClick,true);return()=>document.removeEventListener('click',onClick,true);
  },[pathname]);
  return null;
}
