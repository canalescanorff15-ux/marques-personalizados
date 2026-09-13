'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PremiumExperience(){
  const pathname=usePathname();
  useEffect(()=>{
    const root=document.documentElement;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
    root.classList.add('motion-ready');

    let scrollFrame=0,pointerFrame=0;
    let pointerX=0,pointerY=0;
    const writeScroll=()=>{
      scrollFrame=0;
      const max=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
      root.style.setProperty('--scroll-progress',max>0?String(Math.min(1,Math.max(0,window.scrollY/max))):'0');
    };
    const scheduleScroll=()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(writeScroll);};
    const writePointer=()=>{
      pointerFrame=0;
      root.style.setProperty('--pointer-x',`${pointerX}px`);
      root.style.setProperty('--pointer-y',`${pointerY}px`);
    };
    const onPointer=(event:PointerEvent)=>{
      if(!finePointer.matches||reduced.matches)return;
      pointerX=event.clientX;pointerY=event.clientY;
      if(!pointerFrame)pointerFrame=requestAnimationFrame(writePointer);
    };

    let observer:IntersectionObserver|null=null;
    const revealImmediately=(element:HTMLElement)=>{element.dataset.visible='true';};
    const register=(element:HTMLElement)=>{
      if(element.dataset.visible==='true')return;
      if(reduced.matches||!observer){revealImmediately(element);return;}
      observer.observe(element);
    };
    const registerTree=(node:Node)=>{
      if(!(node instanceof HTMLElement))return;
      if(node.matches('[data-reveal]'))register(node);
      node.querySelectorAll<HTMLElement>('[data-reveal]').forEach(register);
    };

    const initialReveal=[...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if(initialReveal.length&&'IntersectionObserver' in window&&!reduced.matches){
      observer=new IntersectionObserver(entries=>{
        for(const entry of entries){
          if(entry.isIntersecting){
            revealImmediately(entry.target as HTMLElement);
            observer?.unobserve(entry.target);
          }
        }
      },{threshold:.1,rootMargin:'0px 0px -28px'});
    }
    initialReveal.forEach(register);

    const mutations=initialReveal.length?new MutationObserver(records=>{
      for(const record of records)for(const node of records.length?record.addedNodes:[])registerTree(node);
    }):null;
    mutations?.observe(document.body,{childList:true,subtree:true});
    const sizeObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(scheduleScroll):null;
    sizeObserver?.observe(document.body);

    const onMotionChange=()=>{
      if(reduced.matches){observer?.disconnect();observer=null;document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(revealImmediately);}
      root.classList.toggle('motion-reduced',reduced.matches);
    };
    onMotionChange();writeScroll();
    window.addEventListener('scroll',scheduleScroll,{passive:true});
    window.addEventListener('resize',scheduleScroll,{passive:true});
    if(finePointer.matches)window.addEventListener('pointermove',onPointer,{passive:true});
    reduced.addEventListener?.('change',onMotionChange);

    return()=>{
      observer?.disconnect();mutations?.disconnect();sizeObserver?.disconnect();
      if(scrollFrame)cancelAnimationFrame(scrollFrame);if(pointerFrame)cancelAnimationFrame(pointerFrame);
      root.classList.remove('motion-ready','motion-reduced');
      window.removeEventListener('scroll',scheduleScroll);
      window.removeEventListener('resize',scheduleScroll);
      window.removeEventListener('pointermove',onPointer);
      reduced.removeEventListener?.('change',onMotionChange);
    };
  },[pathname]);
  return <><div className="scroll-progress" aria-hidden="true"/><div className="pointer-aura" aria-hidden="true"/></>;
}
