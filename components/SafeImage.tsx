'use client';
import Image, { type ImageProps } from 'next/image';
import { useEffect,useState } from 'react';

type SafeImageProps=Omit<ImageProps,'src'> & {src?:string|null;fallback?:string};

function bypassOptimization(src:string){
  const clean=src.split('#')[0].split('?')[0].toLowerCase();
  return src.startsWith('data:')||src.startsWith('blob:')||clean.endsWith('.svg');
}

export default function SafeImage({
  src,
  fallback='/placeholder-topo.svg',
  alt='',
  width,
  height,
  fill,
  sizes='(max-width: 760px) 92vw, (max-width: 1200px) 50vw, 560px',
  quality=76,
  unoptimized,
  onError,
  ...props
}:SafeImageProps){
  const [failed,setFailed]=useState(false);
  useEffect(()=>{setFailed(false);},[src]);
  const candidate=typeof src==='string'?src.trim():'';
  const effective=!failed&&candidate?candidate:fallback;
  const skip=Boolean(unoptimized||bypassOptimization(effective));
  const handleError:NonNullable<ImageProps['onError']>=event=>{
    if(effective!==fallback)setFailed(true);
    onError?.(event);
  };

  if(fill){
    return <Image {...props} src={effective} alt={alt} fill sizes={sizes} quality={quality} unoptimized={skip} onError={handleError}/>;
  }

  return <Image {...props} src={effective} alt={alt} width={width??1200} height={height??1200} sizes={sizes} quality={quality} unoptimized={skip} onError={handleError}/>;
}
