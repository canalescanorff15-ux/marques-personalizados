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
    slug:'essencial',code:'TOP-01',name:'Topo Simples',eyebrow:'SIMPLES, BONITO E PERSONALIZADO',
    description:'Topo direto e personalizado, com nome, idade e poucos elementos principais do tema.',
    idealFor:'Quem está começando e quer um topo bonito, personalizado e mais econômico.',
    complexity:'1 camada principal',
    features:['Nome e idade','2 a 4 elementos temáticos','Composição limpa','Recorte preciso'],
    materials:['Papel fotográfico ou matte','Hastes para aplicação'],
    image:'/topper-levels/top-01-simples.svg'
  },
  {
    slug:'camadas-3d',code:'TOP-02',name:'Topo Básico 3D',eyebrow:'VOLUME SEM EXAGERO',
    description:'Elementos sobrepostos com fita banana para criar profundidade sem exagerar na quantidade de peças.',
    idealFor:'Quem quer mais presença e profundidade no bolo sem chegar ao nível premium.',
    complexity:'2 a 3 camadas',
    features:['Efeito 3D','Nome em destaque','Elementos sobrepostos','Mais profundidade'],
    materials:['Papel fotográfico/matte','Color Plus','Fita banana'],
    image:'/topper-levels/top-02-basico-3d.svg'
  },
  {
    slug:'premium',code:'TOP-03',name:'Topo Premium',eyebrow:'MAIS DETALHES',
    description:'Composição mais rica, multicamadas e com acabamentos especiais escolhidos de acordo com o tema.',
    idealFor:'Quem quer um topo de maior impacto visual e acabamento de ateliê.',
    complexity:'3 a 5 camadas',
    features:['Multicamadas','Elementos maiores e menores','Detalhes metalizados quando combinarem','Composição mais trabalhada'],
    materials:['Papéis fotográficos e Color Plus','Papel especial opcional','Fita banana'],
    image:'/topper-levels/top-03-premium.svg'
  },
  {
    slug:'shaker',code:'TOP-04',name:'Topo Shaker',eyebrow:'EFEITO INTERATIVO',
    description:'Inclui uma janela shaker com elementos soltos internos, mantendo o restante do topo equilibrado e recortável.',
    idealFor:'Quem quer movimento, brilho e um detalhe diferente no bolo.',
    complexity:'Premium + módulo shaker',
    features:['Janela shaker','Confetes ou elementos internos','Camadas 3D','Acabamento fechado e limpo'],
    materials:['Papel fotográfico/Color Plus','Acetato na janela','Espuma ou fita de volume','Elementos shaker'],
    image:'/topper-levels/top-04-shaker.svg'
  },
  {
    slug:'acetato',code:'TOP-05',name:'Topo com Acetato',eyebrow:'EFEITO FLUTUANTE',
    description:'Usa acetato transparente para criar elementos suspensos, nomes elevados e profundidade visual mais delicada.',
    idealFor:'Temas modernos, delicados ou elegantes que combinam com efeito leve e transparente.',
    complexity:'Premium + estrutura em acetato',
    features:['Elementos flutuantes','Profundidade sem poluição visual','Nome ou detalhe suspenso','Visual moderno'],
    materials:['Acetato transparente','Papel fotográfico/Color Plus','Fita banana quando necessário'],
    image:'/topper-levels/top-05-acetato.svg'
  },
  {
    slug:'elite-shaker-acetato',code:'TOP-06',name:'Topo Elite Shaker + Acetato',eyebrow:'NOSSO TOPO MAIS COMPLETO',
    description:'Nosso topo mais completo: multicamadas, shaker e acetato combinados em uma composição premium, seguindo o padrão do prompt avançado em desenvolvimento.',
    idealFor:'Quem quer o máximo de impacto, profundidade e acabamento que conseguimos oferecer em um topo de bolo.',
    complexity:'4 a 6+ camadas + shaker + acetato',
    features:['Shaker integrado','Acetato estrutural','Multicamadas avançadas','Efeito 3D','Elementos independentes','Composição premium para fotos'],
    materials:['Acetato','Papéis especiais conforme o projeto','Fita banana/espuma 3D','Elementos shaker','Hastes e reforços estruturais'],
    image:'/topper-levels/top-06-elite-shaker-acetato.svg'
  }
];

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
