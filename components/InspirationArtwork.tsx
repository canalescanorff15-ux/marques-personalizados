import type { InspirationModel } from '@/lib/inspirations';

type PhotoDefinition={src:string;thumb:string;focus?:string};

const codePhotos:Record<string,PhotoDefinition>={
  'INSP-001':{src:'/inspirations/reais/insp-001.webp',thumb:'/inspirations/reais/insp-001-thumb.webp',focus:'50% 48%'},
  'INSP-002':{src:'/inspirations/reais/insp-002.webp',thumb:'/inspirations/reais/insp-002-thumb.webp',focus:'50% 48%'},
  'INSP-003':{src:'/inspirations/reais/insp-003.webp',thumb:'/inspirations/reais/insp-003-thumb.webp',focus:'50% 48%'},
  'INSP-004':{src:'/inspirations/reais/insp-004.webp',thumb:'/inspirations/reais/insp-004-thumb.webp',focus:'50% 48%'},
  'INSP-005':{src:'/inspirations/reais/insp-005.webp',thumb:'/inspirations/reais/insp-005-thumb.webp',focus:'50% 48%'},
  'INSP-006':{src:'/inspirations/reais/insp-006.webp',thumb:'/inspirations/reais/insp-006-thumb.webp',focus:'50% 50%'},
  'INSP-007':{src:'/inspirations/reais/insp-007.webp',thumb:'/inspirations/reais/insp-007-thumb.webp',focus:'50% 50%'},
  'INSP-008':{src:'/inspirations/reais/insp-008.webp',thumb:'/inspirations/reais/insp-008-thumb.webp',focus:'50% 50%'},
  'INSP-009':{src:'/inspirations/reais/insp-009.webp',thumb:'/inspirations/reais/insp-009-thumb.webp',focus:'50% 50%'},
  'INSP-010':{src:'/inspirations/reais/insp-010.webp',thumb:'/inspirations/reais/insp-010-thumb.webp',focus:'50% 50%'},
  'INSP-041':{src:'/inspirations/reais/insp-041.webp',thumb:'/inspirations/reais/insp-041-thumb.webp',focus:'50% 46%'},
  'INSP-042':{src:'/inspirations/reais/insp-042.webp',thumb:'/inspirations/reais/insp-042-thumb.webp',focus:'50% 46%'},
  'INSP-043':{src:'/inspirations/reais/insp-043.webp',thumb:'/inspirations/reais/insp-043-thumb.webp',focus:'50% 46%'},
  'INSP-044':{src:'/inspirations/reais/insp-044.webp',thumb:'/inspirations/reais/insp-044-thumb.webp',focus:'50% 45%'},
  'INSP-045':{src:'/inspirations/reais/insp-045.webp',thumb:'/inspirations/reais/insp-045-thumb.webp',focus:'50% 46%'},
  'INSP-046':{src:'/inspirations/reais/insp-046.webp',thumb:'/inspirations/reais/insp-046-thumb.webp',focus:'50% 50%'},
  'INSP-047':{src:'/inspirations/reais/insp-047.webp',thumb:'/inspirations/reais/insp-047-thumb.webp',focus:'50% 50%'},
  'INSP-048':{src:'/inspirations/reais/insp-048.webp',thumb:'/inspirations/reais/insp-048-thumb.webp',focus:'50% 50%'},
  'INSP-049':{src:'/inspirations/reais/insp-049.webp',thumb:'/inspirations/reais/insp-049-thumb.webp',focus:'50% 50%'},
  'INSP-050':{src:'/inspirations/reais/insp-050.webp',thumb:'/inspirations/reais/insp-050-thumb.webp',focus:'50% 50%'},
  'INSP-113':{src:'/inspirations/reais/insp-113.webp',thumb:'/inspirations/reais/insp-113-thumb.webp',focus:'50% 50%'},
  'INSP-114':{src:'/inspirations/reais/insp-114.webp',thumb:'/inspirations/reais/insp-114-thumb.webp',focus:'50% 50%'},
  'INSP-115':{src:'/inspirations/reais/insp-115.webp',thumb:'/inspirations/reais/insp-115-thumb.webp',focus:'50% 50%'},
  'INSP-116':{src:'/inspirations/reais/insp-116.webp',thumb:'/inspirations/reais/insp-116-thumb.webp',focus:'50% 50%'},
  'INSP-117':{src:'/inspirations/reais/insp-117.webp',thumb:'/inspirations/reais/insp-117-thumb.webp',focus:'50% 50%'},
  'INSP-118':{src:'/inspirations/reais/insp-118.webp',thumb:'/inspirations/reais/insp-118-thumb.webp',focus:'50% 50%'},
};

export default function InspirationArtwork({model,className='',label=false,detail=false}:{model:InspirationModel;className?:string;label?:boolean;detail?:boolean}){
  const photo=codePhotos[model.code];
  if(!photo){
    return <div className={`inspiration-artwork inspiration-pending ${className}`.trim()} aria-hidden="true">
      <div className="inspiration-pending-card"><span>{model.code}</span><strong>Imagem exclusiva em produção</strong><small>{model.title}</small></div>
    </div>;
  }
  const src=detail?photo.src:photo.thumb;
  return <div className={`inspiration-artwork inspiration-photo ${className}`.trim()} aria-hidden="true">
    <img src={src} alt="" loading={detail?'eager':'lazy'} decoding="async" style={{objectPosition:photo.focus||'50% 50%'}}/>
    {label&&<span className="inspiration-artwork-label">referência fotográfica</span>}
  </div>;
}
