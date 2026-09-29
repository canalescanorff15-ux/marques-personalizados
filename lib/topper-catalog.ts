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

// Compatibilidade técnica pré-V8.21 (não exibida): Topo Simples | Topo Básico 3D | Topo Shaker | Topo Elite Shaker + Acetato
export const topperLevels:TopperLevel[]=[
  {
    slug:'essencial',code:'TOP-01',name:'Topo Essencial',eyebrow:'PERSONALIZADO E DIRETO',
    description:'Um topo personalizado com nome, idade e os elementos principais do tema, em uma composição limpa e bonita.',
    idealFor:'Quem quer um topo personalizado, bonito e mais econômico, sem excesso de peças.',
    complexity:'1 camada principal',
    features:['Nome e idade','2 a 4 elementos temáticos','Composição limpa','Recorte preciso'],
    materials:['Papel fotográfico ou matte','Hastes para aplicação'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/e2c98970-b9a1-457b-a3af-03c9bbe4f6c6-topo-simples-borboletas-lia-5.png'
  },
  {
    slug:'camadas-3d',code:'TOP-02',name:'Topo 3D em Camadas',eyebrow:'MAIS PROFUNDIDADE',
    description:'Peças sobrepostas em duas ou mais camadas para criar profundidade e deixar o topo mais destacado no bolo.',
    idealFor:'Quem quer um efeito 3D visível, com mais presença, sem chegar ao modelo mais elaborado.',
    complexity:'2 a 3 camadas',
    features:['Efeito 3D','Nome em destaque','Elementos sobrepostos','Mais profundidade'],
    materials:['Papel fotográfico/matte','Color Plus','Fita banana'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/25dcd304-a60f-4c1a-81da-52736c4714bd-topo-basico-3d-safari-lia-5.png'
  },
  {
    slug:'premium',code:'TOP-03',name:'Topo Premium',eyebrow:'MAIS DETALHES E ACABAMENTO',
    description:'Uma composição mais trabalhada, com várias camadas, peças em destaque e acabamentos especiais de acordo com o tema.',
    idealFor:'Quem quer um topo mais elaborado, com maior impacto visual e acabamento especial.',
    complexity:'3 a 5 camadas',
    features:['Multicamadas','Elementos maiores e menores','Detalhes especiais quando combinarem','Composição mais trabalhada'],
    materials:['Papéis fotográficos e Color Plus','Papel especial opcional','Fita banana'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/5411f2b0-3246-4c05-aea9-f0749a4fba8f-topo-premium-bailarina-lia-5.png'
  },
  {
    slug:'shaker',code:'TOP-04',name:'Topo com Movimento (Shaker)',eyebrow:'DETALHES QUE SE MOVEM',
    description:'Possui uma janela com pequenos elementos soltos que se movimentam, criando um efeito diferente e divertido no topo.',
    idealFor:'Quem quer um detalhe com movimento e brilho, além das camadas tradicionais.',
    complexity:'Camadas 3D + movimento',
    features:['Janela com movimento','Confetes ou elementos internos','Camadas 3D','Acabamento fechado e limpo'],
    materials:['Papel fotográfico/Color Plus','Acetato na janela','Espuma ou fita de volume','Elementos shaker'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/05708d0c-10dd-472d-a8af-5bee9721bd47-topo-shaker-espaco-lia-5.png'
  },
  {
    slug:'acetato',code:'TOP-05',name:'Topo com Acetato',eyebrow:'EFEITO TRANSPARENTE',
    description:'Usa acetato transparente para criar peças suspensas e um efeito leve, elegante e diferente na composição.',
    idealFor:'Quem gosta de um visual moderno e delicado, com detalhes que parecem flutuar.',
    complexity:'Camadas + estrutura em acetato',
    features:['Elementos suspensos','Profundidade leve','Nome ou detalhe elevado','Visual moderno'],
    materials:['Acetato transparente','Papel fotográfico/Color Plus','Fita banana quando necessário'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/7ed8f014-823d-4afe-a6b2-89442bc58319-topo-acetato-unicornio-lia-5.png'
  },
  {
    slug:'elite-shaker-acetato',code:'TOP-06',name:'Topo Luxo — Movimento + Acetato',eyebrow:'NOSSO MODELO MAIS COMPLETO',
    description:'Combina várias camadas, detalhes com movimento e estrutura em acetato em uma composição mais completa e elaborada.',
    idealFor:'Quem quer o máximo de destaque, profundidade e acabamento em um topo de bolo personalizado.',
    complexity:'4 a 6+ camadas + movimento + acetato',
    features:['Detalhes com movimento','Acetato estrutural','Multicamadas avançadas','Efeito 3D','Elementos independentes','Composição completa para fotos'],
    materials:['Acetato','Papéis especiais conforme o projeto','Fita banana/espuma 3D','Elementos shaker','Hastes e reforços estruturais'],
    image:'https://merlin-topper-assets.floot.app/_cdn/static/8dd8da23-99a9-463a-9263-1dac5bc39252-topo-elite-shaker-acetato-borboletas-lia-5.png'
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
