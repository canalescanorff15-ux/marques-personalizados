import type { CSSProperties } from 'react';
import type { InspirationModel } from '@/lib/inspirations';

type PhotoDefinition={src:string;focus?:string};

const codePhotos:Record<string,PhotoDefinition>={
  'INSP-001':{src:'/inspirations/reais/insp-001.webp',focus:'50% 48%'},
  'INSP-002':{src:'/inspirations/reais/insp-002.webp',focus:'50% 48%'},
  'INSP-003':{src:'/inspirations/reais/insp-003.webp',focus:'50% 48%'},
  'INSP-004':{src:'/inspirations/reais/insp-004.webp',focus:'50% 48%'},
  'INSP-005':{src:'/inspirations/reais/insp-005.webp',focus:'50% 48%'},
  'INSP-006':{src:'/inspirations/reais/insp-006.webp',focus:'50% 50%'},
  'INSP-007':{src:'/inspirations/reais/insp-007.webp',focus:'50% 50%'},
  'INSP-008':{src:'/inspirations/reais/insp-008.webp',focus:'50% 50%'},
  'INSP-009':{src:'/inspirations/reais/insp-009.webp',focus:'50% 50%'},
  'INSP-010':{src:'/inspirations/reais/insp-010.webp',focus:'50% 50%'},
  'INSP-041':{src:'/inspirations/reais/insp-041.webp',focus:'50% 46%'},
  'INSP-042':{src:'/inspirations/reais/insp-042.webp',focus:'50% 46%'},
  'INSP-043':{src:'/inspirations/reais/insp-043.webp',focus:'50% 46%'},
  'INSP-044':{src:'/inspirations/reais/insp-044.webp',focus:'50% 46%'},
  'INSP-045':{src:'/inspirations/reais/insp-045.webp',focus:'50% 46%'},
  'INSP-046':{src:'/inspirations/reais/insp-046.webp',focus:'50% 50%'},
  'INSP-047':{src:'/inspirations/reais/insp-047.webp',focus:'50% 50%'},
  'INSP-048':{src:'/inspirations/reais/insp-048.webp',focus:'50% 50%'},
  'INSP-049':{src:'/inspirations/reais/insp-049.webp',focus:'50% 50%'},
  'INSP-050':{src:'/inspirations/reais/insp-050.webp',focus:'50% 50%'},
};

const pendingStyle:CSSProperties={
  background:'linear-gradient(145deg,#f7eee9 0%,#fffaf7 52%,#efe2db 100%)',
  display:'grid',placeItems:'center',padding:'24px',textAlign:'center',color:'#76584f',
};
const pendingInnerStyle:CSSProperties={display:'grid',gap:'6px',maxWidth:'22rem'};
const pendingCodeStyle:CSSProperties={fontSize:'.68rem',fontWeight:800,letterSpacing:'.14em',textTransform:'uppercase',opacity:.72};
const pendingTitleStyle:CSSProperties={fontFamily:'var(--display)',fontSize:'clamp(1.2rem,2vw,1.75rem)',fontWeight:600,lineHeight:1.05};
const pendingCopyStyle:CSSProperties={fontSize:'.72rem',lineHeight:1.45,opacity:.76};

export function getInspirationPhoto(code:string){return codePhotos[code]||null;}

export default function InspirationArtwork({model,className='',label=false}:{model:InspirationModel;className?:string;label?:boolean}){
  const photo=getInspirationPhoto(model.code);
  if(!photo){
    return <div className={`inspiration-artwork inspiration-photo inspiration-photo-pending ${className}`.trim()} aria-hidden="true" style={pendingStyle}>
      <div style={pendingInnerStyle}><span style={pendingCodeStyle}>{model.code}</span><strong style={pendingTitleStyle}>{model.title}</strong><small style={pendingCopyStyle}>Imagem exclusiva em produção</small></div>
    </div>;
  }
  return <div className={`inspiration-artwork inspiration-photo ${className}`.trim()} aria-hidden="true">
    <img src={photo.src} alt="" loading="lazy" decoding="async" style={{objectPosition:photo.focus||'50% 50%'}}/>
    {label&&<span className="inspiration-artwork-label">referência fotográfica</span>}
  </div>;
}
