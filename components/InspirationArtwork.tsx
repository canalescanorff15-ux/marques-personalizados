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
  'INSP-010':{src:'/inspirations/reais/insp-010.webp',focus:'50% 50%'},
  'INSP-041':{src:'/inspirations/reais/insp-041.webp',focus:'50% 46%'},
  'INSP-042':{src:'/inspirations/reais/insp-042.webp',focus:'50% 46%'},
  'INSP-043':{src:'/inspirations/reais/insp-043.webp',focus:'50% 46%'},
  'INSP-044':{src:'/inspirations/reais/insp-044.webp',focus:'50% 45%'},
  'INSP-045':{src:'/inspirations/reais/insp-045.webp',focus:'50% 46%'},
  'INSP-046':{src:'/inspirations/reais/insp-046.webp',focus:'50% 50%'},
  'INSP-047':{src:'/inspirations/reais/insp-047.webp',focus:'50% 50%'},
  'INSP-048':{src:'/inspirations/reais/insp-048.webp',focus:'50% 50%'},
  'INSP-050':{src:'/inspirations/reais/insp-050.webp',focus:'50% 50%'},
};

export default function InspirationArtwork({model,className='',label=false,detail=false}:{model:InspirationModel;className?:string;label?:boolean;detail?:boolean}){
  const photo=codePhotos[model.code];
  if(!photo){
    return <div className={`inspiration-artwork inspiration-pending ${className}`.trim()} aria-hidden="true">
      <div className="inspiration-pending-card"><span>{model.code}</span><strong>Imagem exclusiva em produção</strong><small>{model.title}</small></div>
    </div>;
  }
  const src=photo.src;
  return <div className={`inspiration-artwork inspiration-photo ${className}`.trim()} aria-hidden="true">
    <img src={src} alt="" loading={detail?'eager':'lazy'} decoding="async" style={{objectPosition:photo.focus||'50% 50%'}}/>
    {label&&<span className="inspiration-artwork-label">referência fotográfica</span>}
  </div>;
}
