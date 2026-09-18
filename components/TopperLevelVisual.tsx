import type { TopperLevel } from '@/lib/topper-catalog';

export default function TopperLevelVisual({level,compact=false,className=''}:{level:TopperLevel;compact?:boolean;className?:string}){
  return <figure className={`topper-level-visual ${compact?'compact':''} ${className}`.trim()}>
    <div className="topper-level-visual-frame">
      <img src={level.image} alt={`Referência visual do ${level.name}`} loading="lazy" decoding="async"/>
      <span>{level.code}</span>
    </div>
    {!compact&&<figcaption><strong>{level.name}</strong><small>{level.complexity}</small></figcaption>}
  </figure>;
}
