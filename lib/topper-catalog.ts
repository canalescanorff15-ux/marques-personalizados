// V8.23 — quatro linhas comerciais atuais. Slugs técnicos preservados para manter links e rascunhos compatíveis.
export type TopperLevel={
  slug:string;
  code:string;
  name:string;
  eyebrow:string;
  description:string;
  idealFor:string;
  complexity:string;
  features:string[];
  materials:string[];
  image:string;
  highlight?:boolean;
};

export const topperLevels:TopperLevel[]=[
  {
    slug:'essencial',code:'TOP-01',name:'Topo Clássico',eyebrow:'PERSONALIZADO, LIMPO E DIRETO',
    description:'Topo personalizado com nome, idade e os principais elementos do tema, em uma composição limpa e fácil de entender.',
    idealFor:'Quem quer um topo bonito, personalizado e com acabamento mais direto.',
    complexity:'1 camada principal',
    features:['Nome e idade','2 a 4 elementos temáticos','Composição limpa','Recorte preciso'],
    materials:['Papel fotográfico ou matte','Hastes para aplicação'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/e2c98970-b9a1-457b-a3af-03c9bbe4f6c6-topo-simples-borboletas-lia-5.png'
  },
  {
    slug:'camadas-3d',code:'TOP-02',name:'Topo em Camadas',eyebrow:'CAMADAS E PROFUNDIDADE',
    description:'Elementos sobrepostos com fita de volume para criar efeito 3D, profundidade e mais presença no bolo.',
    idealFor:'Quem quer mais destaque e profundidade sem partir para um modelo muito elaborado.',
    complexity:'2 a 3 camadas',
    features:['Efeito 3D','Nome em destaque','Elementos sobrepostos','Mais profundidade'],
    materials:['Papel fotográfico/matte','Color Plus','Fita banana'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/25dcd304-a60f-4c1a-81da-52736c4714bd-topo-basico-3d-safari-lia-5.png'
  },
  {
    slug:'premium',code:'TOP-03',name:'Topo Premium',eyebrow:'MAIS DETALHES E ACABAMENTO',
    description:'Composição mais rica, com várias camadas e acabamentos especiais escolhidos de acordo com o tema.',
    idealFor:'Quem quer um topo com mais impacto visual e acabamento mais elaborado.',
    complexity:'3 a 5 camadas',
    features:['Multicamadas','Elementos maiores e menores','Detalhes metalizados quando combinarem','Composição mais trabalhada'],
    materials:['Papéis fotográficos e Color Plus','Papel especial opcional','Fita banana'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/5411f2b0-3246-4c05-aea9-f0749a4fba8f-topo-premium-bailarina-lia-5.png'
  },
  {
    slug:'acetato',code:'TOP-05',name:'Topo Transparente',eyebrow:'EFEITO LEVE E TRANSPARENTE',
    description:'Usa acetato transparente para criar elementos suspensos, nomes elevados e um visual mais leve e moderno.',
    idealFor:'Temas delicados, modernos ou elegantes que combinam com efeito transparente.',
    complexity:'Camadas + estrutura em acetato',
    features:['Elementos flutuantes','Profundidade sem poluição visual','Nome ou detalhe suspenso','Visual moderno'],
    materials:['Acetato transparente','Papel fotográfico/Color Plus','Fita banana quando necessário'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/7ed8f014-823d-4afe-a6b2-89442bc58319-topo-acetato-unicornio-lia-5.png'
  }
];

// Mantidos apenas como referência interna para migração de dados/links antigos; não são produtos públicos atuais.
export const retiredTopperSlugs=['shaker','elite-shaker-acetato'] as const;

export const topperThemes=[
  {slug:'infantil',label:'Infantil',description:'Personagens originais, animais, brinquedos, cores e elementos lúdicos.'},
  {slug:'floral',label:'Floral & delicado',description:'Flores, borboletas, jardim, tons suaves e composições elegantes.'},
  {slug:'adulto',label:'Adulto elegante',description:'Idades marcantes, minimalista, preto e dourado, hobbies e celebrações.'},
  {slug:'esportes',label:'Esportes',description:'Futebol, quadra, bola, camisa, número e elementos esportivos personalizados.'},
  {slug:'gamer',label:'Gamer',description:'Controles, pixels, neon e universo de jogos sem depender de marcas.'},
  {slug:'aventura',label:'Aventura & espaço',description:'Foguetes, planetas, exploração, construção, fazenda e outros temas de aventura.'},
  {slug:'religioso',label:'Religioso',description:'Batizado, primeira comunhão e celebrações delicadas com símbolos discretos.'},
  {slug:'casamento',label:'Casamento & bodas',description:'Monogramas, flores, alianças, dourado e aniversários de casamento.'},
  {slug:'formatura',label:'Formatura & profissão',description:'Capelo, diploma, curso, profissão e elementos de conquista.'},
  {slug:'personalizado',label:'Tema totalmente personalizado',description:'A partir de uma ideia, foto de referência, cores ou história do cliente.'}
];

export function topperLevelBySlug(slug:string){return topperLevels.find(item=>item.slug===slug)||null;}
