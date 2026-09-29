export type TopperPricingKey='classic'|'layers'|'premium'|'transparent';
export type TopperPricingStage='launch'|'stage2'|'stage3'|'consolidated';

type TopperPriceTable=Record<TopperPricingKey,number>;

export const pricingStage='launch' as const satisfies TopperPricingStage;

export const topperPricingStages:Record<TopperPricingStage,TopperPriceTable>={
  launch:{classic:35,layers:45,premium:55,transparent:60},
  stage2:{classic:40,layers:50,premium:60,transparent:65},
  stage3:{classic:45,layers:55,premium:65,transparent:70},
  consolidated:{classic:45,layers:55,premium:70,transparent:75}
};

export const topperPricingKeyBySlug:Record<string,TopperPricingKey>={
  essencial:'classic',
  'camadas-3d':'layers',
  premium:'premium',
  acetato:'transparent'
};

export const topperBasePriceNote='Valor base. O orçamento final pode variar conforme tamanho, quantidade de camadas, complexidade, personalização e materiais especiais.';
export const topperLaunchPriceNote='Valores de lançamento, sujeitos a atualização conforme custos de produção e evolução da marca.';

export function topperPriceForSlug(slug:string){
  const key=topperPricingKeyBySlug[slug];
  return key?topperPricingStages[pricingStage][key]:null;
}

export function topperStartingPriceLabel(slug:string){
  const price=topperPriceForSlug(slug);
  return price===null?'':`A partir de R$ ${price}`;
}
