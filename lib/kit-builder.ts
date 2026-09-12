export type KitPieceDefinition={
  id:string;
  label:string;
  category:string;
  description:string;
  unit:string;
  max:number;
  step:number;
};

export type KitPreset={
  slug:'mini'|'essencial'|'completo'|'premium';
  title:string;
  eyebrow:string;
  description:string;
  idealFor:string;
  items:Record<string,number>;
};

export const kitPieceDefinitions:KitPieceDefinition[]=[
  {id:'topo',label:'Topo de bolo',category:'Topos de bolo',description:'Peça principal com nome, idade e elementos do tema.',unit:'un.',max:4,step:1},
  {id:'milk',label:'Caixa Milk',category:'Caixas personalizadas',description:'Caixinha alta para doces e lembrancinhas.',unit:'un.',max:200,step:5},
  {id:'piramide',label:'Caixa Pirâmide',category:'Caixas personalizadas',description:'Formato marcante para compor a mesa.',unit:'un.',max:200,step:5},
  {id:'bala',label:'Caixa Bala',category:'Caixas personalizadas',description:'Modelo divertido para doces e pequenos mimos.',unit:'un.',max:200,step:5},
  {id:'sushi',label:'Caixa Sushi',category:'Caixas personalizadas',description:'Caixa baixa com boa área para personalização.',unit:'un.',max:200,step:5},
  {id:'maleta',label:'Caixa Maleta',category:'Caixas personalizadas',description:'Lembrança estruturada com alça e maior presença visual.',unit:'un.',max:120,step:5},
  {id:'tags',label:'Tags personalizadas',category:'Lembrancinhas',description:'Acabamento para sacolas, doces, caixas e lembranças.',unit:'un.',max:500,step:10},
  {id:'adesivos',label:'Adesivos recortados',category:'Lembrancinhas',description:'Para copos, embalagens, lembranças e identidade da festa.',unit:'un.',max:500,step:10},
  {id:'displays',label:'Displays de mesa',category:'Lembrancinhas',description:'Nome, personagem ou elemento temático para a decoração.',unit:'un.',max:20,step:1},
  {id:'bandeirola',label:'Bandeirola personalizada',category:'Lembrancinhas',description:'Nome, idade ou parabéns para completar o painel.',unit:'conj.',max:6,step:1},
  {id:'forminhas',label:'Forminhas decoradas',category:'Flores',description:'Detalhes coordenados para brigadeiros e doces de mesa.',unit:'un.',max:500,step:10},
  {id:'toppers',label:'Toppers para doces',category:'Lembrancinhas',description:'Mini elementos para cupcake, docinhos e mesa posta.',unit:'un.',max:500,step:10},
];

export const kitPresets:KitPreset[]=[
  {slug:'mini',title:'Mini Festa',eyebrow:'COMPACTO',description:'Uma composição enxuta para comemoração em casa ou mesa pequena.',idealFor:'Até 15 convidados',items:{topo:1,milk:5,tags:10,displays:1}},
  {slug:'essencial',title:'Kit Essencial',eyebrow:'EQUILIBRADO',description:'As peças que mais ajudam a criar identidade sem exagerar na quantidade.',idealFor:'15 a 30 convidados',items:{topo:1,milk:10,piramide:10,tags:20,displays:2}},
  {slug:'completo',title:'Kit Completo',eyebrow:'MAIS VARIEDADE',description:'Mistura formatos, detalhes e elementos de mesa para uma composição mais preenchida.',idealFor:'30 a 60 convidados',items:{topo:1,milk:10,piramide:10,bala:10,tags:30,displays:2,bandeirola:1,toppers:20}},
  {slug:'premium',title:'Kit Premium',eyebrow:'MESA DE IMPACTO',description:'Mais formatos, volume e acabamentos para uma mesa principal com presença visual.',idealFor:'60+ convidados ou acabamento alto',items:{topo:1,milk:12,piramide:12,bala:12,sushi:6,maleta:6,tags:40,adesivos:40,displays:3,bandeirola:1,forminhas:30,toppers:30}},
];

export function emptyKitQuantities(){return Object.fromEntries(kitPieceDefinitions.map(piece=>[piece.id,0])) as Record<string,number>;}
export function quantitiesForPreset(slug:KitPreset['slug']){const preset=kitPresets.find(item=>item.slug===slug)||kitPresets[1];return {...emptyKitQuantities(),...preset.items};}
export function suggestedPresetFor(guestCount:number,budgetRange:string):KitPreset['slug']{
  const budget=budgetRange.toLocaleLowerCase('pt-BR');
  if(budget.includes('até r$ 150'))return 'mini';
  if(budget.includes('150–300')||budget.includes('150-300'))return guestCount>35?'completo':'essencial';
  if(budget.includes('300–500')||budget.includes('300-500'))return guestCount>60?'premium':'completo';
  if(budget.includes('500–800')||budget.includes('acima'))return 'premium';
  if(guestCount<=15)return 'mini';
  if(guestCount<=30)return 'essencial';
  if(guestCount<=60)return 'completo';
  return 'premium';
}

export function kitSummaryLines(quantities:Record<string,number>){
  return kitPieceDefinitions.flatMap(piece=>{const qty=Math.max(0,Math.floor(Number(quantities[piece.id])||0));return qty?[`${piece.label}: ${qty} ${piece.unit}`]:[];});
}
