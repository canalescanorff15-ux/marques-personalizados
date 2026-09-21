import { topperInspirationBatch } from './topper-inspirations-batch';
import { topperInspirationsV820 } from './topper-inspirations-v820';

export type TopperInspiration={
  code:string;
  slug:string;
  title:string;
  category:string;
  levelSlug:string;
  description:string;
  image:string;
  palette:string[];
  tags:string[];
};

export const topperInspirations:TopperInspiration[]=[
  {code:'INSP-TOP-01',slug:'jardim-encantado',title:'Jardim Encantado',category:'Infantil delicado',levelSlug:'premium',description:'Flores, folhas, borboletas e composição suave para um topo delicado e cheio de profundidade.',image:'/topper-inspirations/insp-top-01-jardim-encantado.svg',palette:['Rosa suave','Verde sálvia','Creme'],tags:['jardim','flores','borboletas']},
  {code:'INSP-TOP-02',slug:'nuvens-estrelinhas',title:'Nuvens & Estrelinhas',category:'Infantil delicado',levelSlug:'shaker',description:'Nuvens, estrelas e pequenos brilhos em uma composição leve que combina muito bem com shaker.',image:'/topper-inspirations/insp-top-02-nuvens-estrelinhas.svg',palette:['Azul bebê','Branco','Dourado'],tags:['nuvens','estrelas','shaker']},
  {code:'INSP-TOP-03',slug:'aventura-no-espaco',title:'Aventura no Espaço',category:'Infantil menino / unissex',levelSlug:'premium',description:'Foguete, planetas e estrelas organizados em camadas para criar sensação de aventura e profundidade.',image:'/topper-inspirations/insp-top-03-aventura-no-espaco.svg',palette:['Azul profundo','Lilás','Prata'],tags:['espaço','foguete','planetas']},
  {code:'INSP-TOP-04',slug:'pequeno-safari',title:'Pequeno Safari',category:'Infantil menino / unissex',levelSlug:'premium',description:'Animais originais, folhagens e tons naturais em um topo infantil equilibrado e alegre.',image:'/topper-inspirations/insp-top-04-pequeno-safari.svg',palette:['Verde oliva','Areia','Terracota'],tags:['safari','animais','folhagem']},
  {code:'INSP-TOP-05',slug:'floral-rose',title:'Floral Rosé',category:'Feminino elegante',levelSlug:'premium',description:'Flores rosé e detalhes elegantes com nome em destaque para aniversários delicados e adultos.',image:'/topper-inspirations/insp-top-05-floral-rose.svg',palette:['Rosé','Nude','Dourado'],tags:['floral','rosé','elegante']},
  {code:'INSP-TOP-06',slug:'nude-minimalista',title:'Nude Minimalista',category:'Feminino elegante',levelSlug:'essencial',description:'Poucos elementos, lettering em destaque e paleta nude para um topo moderno e limpo.',image:'/topper-inspirations/insp-top-06-nude-minimalista.svg',palette:['Nude','Bege','Marrom'],tags:['minimalista','nude','adulto']},
  {code:'INSP-TOP-07',slug:'boteco-personalizado',title:'Boteco Personalizado',category:'Masculino adulto',levelSlug:'premium',description:'Elementos de boteco estilizados, plaquinhas e nome personalizado em composição divertida para adultos.',image:'https://merlin-topper-assets.floot.app/_cdn/static/bf28e45b-a879-4551-86b9-3b9deaed5493-insp-top-07-boteco-personalizado.png',palette:['Preto','Âmbar','Creme'],tags:['boteco','adulto','aniversário']},
  {code:'INSP-TOP-08',slug:'preto-dourado-masculino',title:'Preto & Dourado Masculino',category:'Masculino adulto',levelSlug:'premium',description:'Tipografia forte, formas geométricas e dourado em destaque para um topo masculino sofisticado.',image:'/topper-inspirations/insp-top-08-preto-dourado-masculino.svg',palette:['Preto','Dourado','Branco'],tags:['preto','dourado','adulto']},
  {code:'INSP-TOP-09',slug:'rose-30-anos',title:'Rosé 30 Anos',category:'Comemorativo',levelSlug:'premium',description:'Número 30 como protagonista, flores rosé e detalhes metalizados para uma composição elegante.',image:'/topper-inspirations/insp-top-09-rose-30-anos.svg',palette:['Rosé','Champagne','Branco'],tags:['30 anos','rosé','aniversário']},
  {code:'INSP-TOP-10',slug:'formatura-preto-dourado',title:'Formatura Preto & Dourado',category:'Comemorativo',levelSlug:'elite-shaker-acetato',description:'Capelo, diploma, nome e detalhes dourados em multicamadas para uma formatura de alto impacto.',image:'/topper-inspirations/insp-top-10-formatura-preto-dourado.svg',palette:['Preto','Dourado','Marfim'],tags:['formatura','diploma','elite']},
  {code:'INSP-TOP-11',slug:'batizado-azul-sereno',title:'Batizado Azul Sereno',category:'Religioso',levelSlug:'premium',description:'Azul suave, branco e símbolos discretos em uma composição leve, delicada e respeitosa.',image:'/topper-inspirations/insp-top-11-batizado-azul-sereno.svg',palette:['Azul claro','Branco','Prata'],tags:['batizado','religioso','delicado']},
  {code:'INSP-TOP-12',slug:'primeira-comunhao-delicada',title:'Primeira Comunhão Delicada',category:'Religioso',levelSlug:'acetato',description:'Elementos religiosos sutis com efeito flutuante em acetato e acabamento claro e elegante.',image:'/topper-inspirations/insp-top-12-primeira-comunhao-delicada.svg',palette:['Branco','Champagne','Verde sálvia'],tags:['comunhão','religioso','acetato']},
  {code:'INSP-TOP-13',slug:'jardim-abelhinhas',title:'Jardim das Abelhinhas',category:'Infantil delicado',levelSlug:'premium',description:'Abelhinhas, flores brancas, folhagens e composição circular delicada em um topo alegre e sofisticado.',image:'https://merlin-topper-assets.floot.app/_cdn/static/9b927b64-ea7f-4f2a-96bf-f1a649dabe22-insp-top-13-jardim-abelhinhas-festa-premium.png',palette:['Amarelo mel','Verde sálvia','Branco'],tags:['abelhinhas','jardim','flores']},
  {code:'INSP-TOP-14',slug:'dino-aventura',title:'Dino Aventura',category:'Infantil menino / unissex',levelSlug:'premium',description:'Dinossauros simpáticos, vulcão e folhagens tropicais em uma composição infantil de bastante presença.',image:'https://merlin-topper-assets.floot.app/_cdn/static/7d95a4ff-9e66-4d78-aebb-4afd297949ba-insp-top-14-dino-aventura-festa-premium.png',palette:['Verde floresta','Laranja','Azul'],tags:['dinossauro','aventura','infantil']},
  {code:'INSP-TOP-15',slug:'ursinho-aviador',title:'Ursinho Aviador',category:'Infantil delicado',levelSlug:'shaker',description:'Ursinho aviador, avião, nuvens e estrelas com módulos shaker para um topo leve e cheio de movimento.',image:'https://merlin-topper-assets.floot.app/_cdn/static/d2c3ea33-c577-4d55-a780-7fd1df1d107d-insp-top-15-ursinho-aviador.png',palette:['Azul bebê','Creme','Dourado'],tags:['ursinho','aviador','shaker']},
  {code:'INSP-TOP-16',slug:'casamento-floral-dourado',title:'Casamento Floral Dourado',category:'Casamento & bodas',levelSlug:'acetato',description:'Arco dourado, flores brancas, folhagens e monograma em acetato para uma composição elegante e romântica.',image:'https://merlin-topper-assets.floot.app/_cdn/static/a0ca3d63-04b8-4372-b2d9-330fe736a35f-insp-top-16-casamento-floral-dourado-festa-premium.png',palette:['Branco','Verde oliva','Dourado'],tags:['casamento','floral','acetato']},
  {code:'INSP-TOP-17',slug:'bailarina-15-anos',title:'Bailarina 15 Anos',category:'Feminino elegante',levelSlug:'elite-shaker-acetato',description:'Bailarina delicada, laços, flores e composição de alto impacto para uma celebração feminina especial.',image:'https://merlin-topper-assets.floot.app/_cdn/static/dd5496e6-b7b3-4ef5-9a67-784fa7738319-insp-top-17-bailarina-15-anos-festa-premium.png',palette:['Rosa','Champagne','Dourado'],tags:['bailarina','15 anos','elite']},
  ...topperInspirationBatch,
  ...topperInspirationsV820
];

// V8.20 — curadoria pública final: 36 inspirações novas, 6 por cada uma das 6 categorias comerciais de topo.
// O acervo anterior continua preservado no módulo, mas não aparece na vitrine pública.
export const curatedPublicTopperCodes=new Set<string>([
  'INSP-TOP-74',
  'INSP-TOP-75',
  'INSP-TOP-76',
  'INSP-TOP-77',
  'INSP-TOP-78',
  'INSP-TOP-79',
  'INSP-TOP-80',
  'INSP-TOP-81',
  'INSP-TOP-82',
  'INSP-TOP-83',
  'INSP-TOP-84',
  'INSP-TOP-85',
  'INSP-TOP-86',
  'INSP-TOP-87',
  'INSP-TOP-88',
  'INSP-TOP-89',
  'INSP-TOP-90',
  'INSP-TOP-91',
  'INSP-TOP-92',
  'INSP-TOP-93',
  'INSP-TOP-94',
  'INSP-TOP-95',
  'INSP-TOP-96',
  'INSP-TOP-97',
  'INSP-TOP-98',
  'INSP-TOP-99',
  'INSP-TOP-100',
  'INSP-TOP-101',
  'INSP-TOP-102',
  'INSP-TOP-103',
  'INSP-TOP-104',
  'INSP-TOP-105',
  'INSP-TOP-106',
  'INSP-TOP-107',
  'INSP-TOP-108',
  'INSP-TOP-109'
]);

// Referências de cenário completo preservadas apenas como acervo interno.
// Não devem aparecer na galeria pública nem em páginas individuais públicas.
export const archivedSceneTopperCodes=new Set<string>([
  'INSP-TOP-51',
  'INSP-TOP-52',
  'INSP-TOP-53',
  'INSP-TOP-54',
  'INSP-TOP-55',
  'INSP-TOP-56',
  'INSP-TOP-57',
  'INSP-TOP-58',
  'INSP-TOP-59',
  'INSP-TOP-60',
  'INSP-TOP-61',
  'INSP-TOP-62',
  'INSP-TOP-63',
  'INSP-TOP-64',
  'INSP-TOP-65',
  'INSP-TOP-66',
  'INSP-TOP-67',
  'INSP-TOP-68',
  'INSP-TOP-69',
  'INSP-TOP-70',
  'INSP-TOP-71',
  'INSP-TOP-72',
  'INSP-TOP-73'
]);

export const publicTopperInspirations=topperInspirations.filter(item=>curatedPublicTopperCodes.has(item.code));

export const archivedTopperInspirations=topperInspirations.filter(item=>!curatedPublicTopperCodes.has(item.code));

export const archivedSceneTopperInspirations=topperInspirations.filter(item=>archivedSceneTopperCodes.has(item.code));

export function isPublicTopperInspiration(code:string){
  const normalized=code.trim().toUpperCase();
  return publicTopperInspirations.some(item=>item.code.toUpperCase()===normalized);
}

export function topperInspirationBySlug(slug:string){
  return topperInspirations.find(item=>item.slug===slug)||null;
}

export function topperInspirationByCode(code:string){
  const normalized=code.trim().toUpperCase();
  return topperInspirations.find(item=>item.code.toUpperCase()===normalized)||null;
}
