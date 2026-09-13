'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration(){
  useEffect(()=>{
    if(!('serviceWorker' in navigator))return;
    const isSecure=window.location.protocol==='https:'||window.location.hostname==='localhost'||window.location.hostname==='127.0.0.1';
    if(!isSecure)return;

    const timer=window.setTimeout(()=>{
      navigator.serviceWorker.register('/sw.js',{scope:'/'})
        .then((registration)=>registration.update().catch(()=>undefined))
        .catch(()=>undefined);
    },1200);

    return ()=>window.clearTimeout(timer);
  },[]);

  return null;
}
