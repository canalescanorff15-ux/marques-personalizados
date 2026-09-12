import {
  inspirationModels,
  inspirationOccasionCollections,
  inspirationSearchText,
  inspirationStyleCollections,
  type InspirationModel,
} from './inspirations';

export type InspirationSort='catalog'|'az'|'premium'|'essential';
export type InspirationFacetKey='group'|'occasion'|'style'|'tier'|'theme'|'palette';

export type InspirationFilters={
  query:string;
  group:string;
  occasion:string;
  style:string;
  tier:string;
  theme:string;
  palette:string;
  sort:InspirationSort;
};

export type InspirationThemeOption={slug:string;label:string;description:string;terms:string[]};
export type InspirationPaletteOption={slug:InspirationModel['palette'];label:string;description:string};

export const inspirationThemeCollections:InspirationThemeOption[]=[
  {slug:'floral-jardim',label:'Floral & jardim',description:'Flores, folhagens, borboletas e composições botânicas.',terms:['floral','flores','jardim','botanico','borboleta']},
  {slug:'safari-animais',label:'Safari & animais',description:'Bichinhos, floresta, fazendinha e aventuras naturais.',terms:['safari','bichinhos','animal','fazendinha','floresta','dinossauro']},
  {slug:'princesa-encantado',label:'Princesa & encanto',description:'Coroas, castelos, delicadeza e clima de conto de fadas.',terms:['princesa','coroa','encantado','magico','magica','conto']},
  {slug:'espaco-aventura',label:'Espaço & aventura',description:'Foguetes, planetas, exploração e temas de ação.',terms:['espaco','foguete','planeta','aventura','acao']},
  {slug:'gamer',label:'Gamer & jogos',description:'Games, controles, pixels, neon e universos digitais.',terms:['gamer','jogos','pixel','controle','neon']},
  {slug:'esportes',label:'Esportes',description:'Futebol e outras paixões esportivas personalizadas.',terms:['futebol','esporte','campeao','campeã']},
  {slug:'romance-casamento',label:'Romance & casamento',description:'Noivado, casamento, bodas, corações e monogramas.',terms:['casamento','noivado','bodas','romantico','coracao','monograma']},
  {slug:'religioso',label:'Religioso',description:'Batizado, comunhão e celebrações de fé.',terms:['batizado','comunhao','religioso']},
  {slug:'profissao-formatura',label:'Profissão & formatura',description:'Curso, profissão, conquista e graduação.',terms:['profissao','formatura','graduacao','curso']},
  {slug:'viagem-memorias',label:'Viagem & memórias',description:'Destinos, mapas, lembranças e histórias pessoais.',terms:['viagem','mapa','memorias']},
  {slug:'datas-presentes',label:'Datas & presentes',description:'Páscoa, Natal, mães, pais e lembranças afetivas.',terms:['pascoa','natal','dia das maes','dia dos pais','presente','agradecimento']},
  {slug:'corporativo-escolar',label:'Empresa & escola',description:'Clientes, brindes, professores, etiquetas e escola.',terms:['corporativo','empresa','cliente','professor','escolar','etiqueta']},
];

export const inspirationPaletteCollections:InspirationPaletteOption[]=[
  {slug:'blush',label:'Rosé & blush',description:'Rosa suave, champanhe e delicadeza.'},
  {slug:'sage',label:'Verde sálvia',description:'Natural, botânico e acolhedor.'},
  {slug:'lilac',label:'Lilás',description:'Leve, romântico e delicado.'},
  {slug:'sky',label:'Azul',description:'Azul claro, marinho e composições frescas.'},
  {slug:'cocoa',label:'Neutros',description:'Nude, bege, marrom e tons sofisticados.'},
  {slug:'blackgold',label:'Preto & dourado',description:'Contraste forte e acabamento luxuoso.'},
  {slug:'candy',label:'Colorido',description:'Cores alegres, infantis e vibrantes.'},
  {slug:'terracotta',label:'Terrosos',description:'Terracota, boho, rústico e quente.'},
];

export const inspirationSortOptions:{value:InspirationSort;label:string}[]=[
  {value:'catalog',label:'Ordem do catálogo'},
  {value:'az',label:'Nome A–Z'},
  {value:'premium',label:'Premium primeiro'},
  {value:'essential',label:'Essencial primeiro'},
];

export const inspirationQuickFilters=[
  {slug:'infantil',label:'Festa infantil',filters:{occasion:'Infantil'}},
  {slug:'adulto-elegante',label:'Adulto elegante',filters:{occasion:'Adulto',style:'elegante'}},
  {slug:'floral-premium',label:'Floral premium',filters:{theme:'floral-jardim',tier:'Premium'}},
  {slug:'gamer',label:'Gamer',filters:{theme:'gamer'}},
  {slug:'casamento',label:'Casamento',filters:{theme:'romance-casamento'}},
  {slug:'lembrancinhas',label:'Lembrancinhas',filters:{group:'Lembranças e detalhes'}},
] satisfies {slug:string;label:string;filters:Partial<InspirationFilters>}[];

export const emptyInspirationFilters:InspirationFilters={query:'',group:'',occasion:'',style:'',tier:'',theme:'',palette:'',sort:'catalog'};

function normalize(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();}
function structuredText(model:InspirationModel){return normalize([model.title,model.group,model.category,model.occasion,model.style,...model.tags].join(' '));}
function optionValueExists(value:string,options:{value:string}[]){return options.some(option=>option.value===value);}
function matchesCollection(model:InspirationModel,value:string,kind:'occasion'|'style'){
  if(!value)return true;
  const source=kind==='occasion'
    ? normalize([model.occasion,model.group,model.category,...model.tags].join(' '))
    : normalize([model.style,...model.tags].join(' '));
  const normalizedValue=normalize(value);
  if(source.includes(normalizedValue))return true;
  // Preserve links created by older catalog versions even if an option label changes.
  const known=kind==='occasion'?optionValueExists(value,inspirationOccasionCollections):optionValueExists(value,inspirationStyleCollections);
  return known&&inspirationSearchText(model).includes(normalizedValue);
}
function matchesTheme(model:InspirationModel,slug:string){
  if(!slug)return true;
  const option=inspirationThemeCollections.find(item=>item.slug===slug);
  if(!option)return false;
  const hay=structuredText(model);
  return option.terms.some(term=>hay.includes(normalize(term)));
}
function tierRank(tier:InspirationModel['tier']){return tier==='Premium'?3:tier==='Intermediário'?2:1;}
function codeRank(code:string){return Number(code.replace(/\D/g,''))||0;}

export function filterInspirations(filters:InspirationFilters,models:InspirationModel[]=inspirationModels){
  const q=normalize(filters.query);
  const filtered=models.filter(model=>
    (!q||inspirationSearchText(model).includes(q))&&
    (!filters.group||model.group===filters.group)&&
    matchesCollection(model,filters.occasion,'occasion')&&
    matchesCollection(model,filters.style,'style')&&
    (!filters.tier||model.tier===filters.tier)&&
    matchesTheme(model,filters.theme)&&
    (!filters.palette||model.palette===filters.palette)
  );
  return [...filtered].sort((a,b)=>{
    if(filters.sort==='az')return a.title.localeCompare(b.title,'pt-BR');
    if(filters.sort==='premium')return tierRank(b.tier)-tierRank(a.tier)||codeRank(a.code)-codeRank(b.code);
    if(filters.sort==='essential')return tierRank(a.tier)-tierRank(b.tier)||codeRank(a.code)-codeRank(b.code);
    return codeRank(a.code)-codeRank(b.code);
  });
}

export function facetCount(filters:InspirationFilters,facet:InspirationFacetKey,value:string){
  return filterInspirations({...filters,[facet]:value,sort:'catalog'}).length;
}

export function themeCount(slug:string){return inspirationModels.filter(model=>matchesTheme(model,slug)).length;}
export function paletteCount(slug:InspirationModel['palette']){return inspirationModels.filter(model=>model.palette===slug).length;}
