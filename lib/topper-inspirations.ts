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
  {code:'INSP-TOP-07',slug:'boteco-personalizado',title:'Boteco Personalizado',category:'Masculino adulto',levelSlug:'premium',description:'Elementos de boteco estilizados, plaquinhas e nome personalizado em composição divertida para adultos.',image:'/topper-inspirations/insp-top-07-boteco-personalizado.svg',palette:['Preto','Âmbar','Creme'],tags:['boteco','adulto','aniversário']},
  {code:'INSP-TOP-08',slug:'preto-dourado-masculino',title:'Preto & Dourado Masculino',category:'Masculino adulto',levelSlug:'premium',description:'Tipografia forte, formas geométricas e dourado em destaque para um topo masculino sofisticado.',image:'/topper-inspirations/insp-top-08-preto-dourado-masculino.svg',palette:['Preto','Dourado','Branco'],tags:['preto','dourado','adulto']},
  {code:'INSP-TOP-09',slug:'rose-30-anos',title:'Rosé 30 Anos',category:'Comemorativo',levelSlug:'premium',description:'Número 30 como protagonista, flores rosé e detalhes metalizados para uma composição elegante.',image:'/topper-inspirations/insp-top-09-rose-30-anos.svg',palette:['Rosé','Champagne','Branco'],tags:['30 anos','rosé','aniversário']},
  {code:'INSP-TOP-10',slug:'formatura-preto-dourado',title:'Formatura Preto & Dourado',category:'Comemorativo',levelSlug:'elite-shaker-acetato',description:'Capelo, diploma, nome e detalhes dourados em multicamadas para uma formatura de alto impacto.',image:'/topper-inspirations/insp-top-10-formatura-preto-dourado.svg',palette:['Preto','Dourado','Marfim'],tags:['formatura','diploma','elite']},
  {code:'INSP-TOP-11',slug:'batizado-azul-sereno',title:'Batizado Azul Sereno',category:'Religioso',levelSlug:'premium',description:'Azul suave, branco e símbolos discretos em uma composição leve, delicada e respeitosa.',image:'/topper-inspirations/insp-top-11-batizado-azul-sereno.svg',palette:['Azul claro','Branco','Prata'],tags:['batizado','religioso','delicado']},
  {code:'INSP-TOP-12',slug:'primeira-comunhao-delicada',title:'Primeira Comunhão Delicada',category:'Religioso',levelSlug:'acetato',description:'Elementos religiosos sutis com efeito flutuante em acetato e acabamento claro e elegante.',image:'/topper-inspirations/insp-top-12-primeira-comunhao-delicada.svg',palette:['Branco','Champagne','Verde sálvia'],tags:['comunhão','religioso','acetato']}
];

export function topperInspirationBySlug(slug:string){
  return topperInspirations.find(item=>item.slug===slug)||null;
}
