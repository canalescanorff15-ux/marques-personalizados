import type { InspirationModel } from '@/lib/inspirations';

type PhotoKey='topper'|'firstBirthday'|'boxes'|'woodland'|'ballerina'|'keepsake';

type PhotoDefinition={src:string;focus?:string};

const photos:Record<PhotoKey,PhotoDefinition>={
  topper:{src:'/inspirations/reais/topo-floral-dourado.webp',focus:'50% 45%'},
  firstBirthday:{src:'/inspirations/reais/mesa-primeiro-aniversario.webp',focus:'50% 48%'},
  boxes:{src:'/inspirations/reais/caixas-florais-personalizadas.webp',focus:'50% 52%'},
  woodland:{src:'/inspirations/reais/cupcakes-floresta.webp',focus:'50% 48%'},
  ballerina:{src:'/inspirations/reais/topo-bailarina-rosa.webp',focus:'50% 44%'},
  keepsake:{src:'/inspirations/reais/lembrancas-botanicas-verde-dourado.webp',focus:'50% 48%'},
};

const fallbackOrder:PhotoKey[]=['topper','firstBirthday','boxes','woodland','ballerina','keepsake'];

function numericCode(code:string){
  const value=Number(code.match(/\d+/)?.[0]||0);
  return Number.isFinite(value)?value:0;
}

function photoKeyFor(model:InspirationModel):PhotoKey{
  const haystack=`${model.title} ${model.group} ${model.category} ${model.occasion} ${model.style} ${model.tags.join(' ')}`.toLocaleLowerCase('pt-BR');

  if(/caixa|milk|pirâmide|piramide|bala|sushi|cenário|cenario|sacolinha|embalagem/.test(haystack))return 'boxes';
  if(/cupcake|wrapper|floresta|safari|ursinho|raposa|guaxinim|bichinho|bosque|wild|dinossauro|aventura/.test(haystack))return 'woodland';
  if(/bailarina|ballet|princesa|menininha|boneca|rosa|candy|fofo/.test(haystack))return 'ballerina';
  if(/lembrança|lembranca|tag|presente|casamento|batizado|formatura|botânico|botanico|verde|agradecimento|porta-bombom/.test(haystack))return 'keepsake';
  if(/1 ano|primeiro ano|primeiro aniversário|primeiro aniversario|bebê|bebe|chá|cha |revelação|revelacao|mesversário|mesversario|kit completo|kit personalizado/.test(haystack))return 'firstBirthday';
  if(/topo|bolo|floral|flores|jardim|dourado|rosé|rose|luxo|adulto|aniversário|aniversario/.test(haystack))return 'topper';

  return fallbackOrder[numericCode(model.code)%fallbackOrder.length];
}

export default function InspirationArtwork({model,className='',label=false}:{model:InspirationModel;className?:string;label?:boolean}){
  const photo=photos[photoKeyFor(model)];
  return <div className={`inspiration-artwork inspiration-photo ${className}`.trim()} aria-hidden="true">
    <img src={photo.src} alt="" loading="lazy" decoding="async" style={{objectPosition:photo.focus||'50% 50%'}}/>
    {label&&<span className="inspiration-artwork-label">referência fotográfica</span>}
  </div>;
}
