'use client';

import dynamic from 'next/dynamic';
import { useEffect,useState } from 'react';

const SiteAnalytics=dynamic(()=>import('./SiteAnalytics'),{ssr:false});
const WebVitalsReporter=dynamic(()=>import('./WebVitalsReporter'),{ssr:false});

type IdleWindow=Window&{
  requestIdleCallback?:(callback:()=>void,options?:{timeout:number})=>number;
  cancelIdleCallback?:(id:number)=>void;
};

export default function DeferredTelemetry(){
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const idleWindow=window as IdleWindow;
    let cancelled=false,idleId=0,timeoutId=0;
    const activate=()=>{if(!cancelled)setReady(true);};
    if(idleWindow.requestIdleCallback)idleId=idleWindow.requestIdleCallback(activate,{timeout:1800});
    else timeoutId=window.setTimeout(activate,900);
    return()=>{
      cancelled=true;
      if(idleId)idleWindow.cancelIdleCallback?.(idleId);
      if(timeoutId)window.clearTimeout(timeoutId);
    };
  },[]);
  if(!ready)return null;
  return <><SiteAnalytics/><WebVitalsReporter/></>;
}
