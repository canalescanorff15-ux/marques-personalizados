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
  'INSP-011':{src:'/inspirations/reais/insp-011.webp',focus:'50% 50%'},
  'INSP-012':{src:'/inspirations/reais/insp-012.webp',focus:'50% 50%'},
  'INSP-013':{src:'/inspirations/reais/insp-013.webp',focus:'50% 50%'},
  'INSP-014':{src:'/inspirations/reais/insp-014.webp',focus:'50% 50%'},
  'INSP-015':{src:'/inspirations/reais/insp-015.webp',focus:'50% 50%'},
  'INSP-016':{src:'/inspirations/reais/insp-016.webp',focus:'50% 50%'},
  'INSP-017':{src:'/inspirations/reais/insp-017.webp',focus:'50% 50%'},
  'INSP-018':{src:'/inspirations/reais/insp-018.webp',focus:'50% 50%'},
  'INSP-019':{src:'/inspirations/reais/insp-019.webp',focus:'50% 50%'},
  'INSP-020':{src:'/inspirations/reais/insp-020.webp',focus:'50% 50%'},
  'INSP-021':{src:'/inspirations/reais/insp-021.webp',focus:'50% 50%'},
  'INSP-022':{src:'/inspirations/reais/insp-022.webp',focus:'50% 50%'},
  'INSP-023':{src:'/inspirations/reais/insp-023.webp',focus:'50% 50%'},
  'INSP-024':{src:'/inspirations/reais/insp-024.webp',focus:'50% 50%'},
  'INSP-025':{src:'/inspirations/reais/insp-025.webp',focus:'50% 50%'},
  'INSP-051':{src:'/inspirations/reais/insp-051.webp',focus:'50% 50%'},
  'INSP-052':{src:'/inspirations/reais/insp-052.webp',focus:'50% 50%'},
  'INSP-053':{src:'/inspirations/reais/insp-053.webp',focus:'50% 50%'},
  'INSP-054':{src:'/inspirations/reais/insp-054.webp',focus:'50% 50%'},
  'INSP-055':{src:'/inspirations/reais/insp-055.webp',focus:'50% 50%'},
  'INSP-056':{src:'/inspirations/reais/insp-056.webp',focus:'50% 50%'},
  'INSP-057':{src:'/inspirations/reais/insp-057.webp',focus:'50% 50%'},
  'INSP-058':{src:'/inspirations/reais/insp-058.webp',focus:'50% 50%'},
  'INSP-059':{src:'/inspirations/reais/insp-059.webp',focus:'50% 50%'},
  'INSP-060':{src:'/inspirations/reais/insp-060.webp',focus:'50% 50%'},
  'INSP-061':{src:'/inspirations/reais/insp-061.webp',focus:'50% 50%'},
  'INSP-062':{src:'/inspirations/reais/insp-062.webp',focus:'50% 50%'},
  'INSP-063':{src:'/inspirations/reais/insp-063.webp',focus:'50% 50%'},
  'INSP-064':{src:'/inspirations/reais/insp-064.webp',focus:'50% 50%'},
  'INSP-081':{src:'/inspirations/reais/insp-081.webp',focus:'50% 50%'},
  'INSP-082':{src:'/inspirations/reais/insp-082.webp',focus:'50% 50%'},
  'INSP-083':{src:'/inspirations/reais/insp-083.webp',focus:'50% 50%'},
  'INSP-084':{src:'/inspirations/reais/insp-084.webp',focus:'50% 50%'},
  'INSP-085':{src:'/inspirations/reais/insp-085.webp',focus:'50% 50%'},
  'INSP-086':{src:'/inspirations/reais/insp-086.webp',focus:'50% 50%'},
  'INSP-087':{src:'/inspirations/reais/insp-087.webp',focus:'50% 50%'},
  'INSP-088':{src:'/inspirations/reais/insp-088.webp',focus:'50% 50%'},
  'INSP-097':{src:'/inspirations/reais/insp-097.webp',focus:'50% 50%'},
  'INSP-102':{src:'/inspirations/reais/insp-102.webp',focus:'50% 50%'},
  'INSP-113':{src:'/inspirations/reais/insp-113.webp',focus:'50% 50%'},
  'INSP-114':{src:'/inspirations/reais/insp-114.webp',focus:'50% 50%'},
  'INSP-115':{src:'/inspirations/reais/insp-115.webp',focus:'50% 50%'},
  'INSP-116':{src:'/inspirations/reais/insp-116.webp',focus:'50% 50%'},
  'INSP-117':{src:'/inspirations/reais/insp-117.webp',focus:'50% 50%'},
  'INSP-118':{src:'/inspirations/reais/insp-118.webp',focus:'50% 50%'},
};

const pendingStyle:CSSProperties={
  background:'linear-gradient(145deg,#f7eee9 0%,#fffaf7 52%,#efe2db 100%)',
  display:'grid',placeItems:'center',padding:'24px',textAlign:'center',color:'#76584f',
};
const pendingInnerStyle:CSSProperties={display:'grid',gap:'6px',maxWidth:'22rem'};
const pendingCodeStyle:CSSProperties={fontSize:'.68rem',fontWeight:800,letterSpacing:'.14em',textTransform:'uppercase',opacity:.72};
const pendingTitleStyle:CSSProperties={fontFamily:'var(--display)',fontSize:'clamp(1.2rem,2vw,1.75rem)',fontWeight:600,lineHeight:1.05};
const pendingCopyStyle:CSSProperties={fontSize:'.72rem',lineHeight:1.45,opacity:.76};

export default function InspirationArtwork({model,className='',label=false}:{model:InspirationModel;className?:string;label?:boolean}){
  const photo=codePhotos[model.code];
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
