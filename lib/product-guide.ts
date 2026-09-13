import type { Product } from './db';

export type ProductBuyingGuide={
  ideal:string[];
  define:string[];
  valueDrivers:string[];
  preparation:string[];
};

const guides:Record<string,ProductBuyingGuide>={
  'Topos de bolo':{
    ideal:['Bolo principal','Festa em casa ou salão','Composição com nome e idade'],
    define:['Tema e paleta','Nome e idade','Tamanho aproximado do bolo'],
    valueDrivers:['Número de camadas','Shaker, acetato e efeitos','Quantidade de elementos e recortes'],
    preparation:['Confirme a medida do bolo','Envie referências de cores','Informe a data do evento'],
  },
  'Caixas personalizadas':{
    ideal:['Lembrancinhas','Doces e pequenos mimos','Composição coordenada de mesa'],
    define:['Quantidade','Tema e paleta','Conteúdo que irá dentro'],
    valueDrivers:['Modelo da caixa','Quantidade total','Papéis e acabamentos especiais'],
    preparation:['Considere uma unidade por convidado quando fizer sentido','Confirme o tamanho do mimo','Separe referências do tema'],
  },
  'Lembrancinhas':{
    ideal:['Finalização de embalagens','Mesa de doces','Identidade visual da festa'],
    define:['Quantidade real','Onde será aplicado','Tema, nome e idade'],
    valueDrivers:['Quantidade','Tamanho e formato','Recorte, laminação e camadas'],
    preparation:['Conte doces ou embalagens','Defina se haverá aplicação manual','Envie medidas quando necessário'],
  },
  'Kits personalizados':{
    ideal:['Quem quer resolver várias peças de uma vez','Mesa coordenada','Festa em casa ou evento completo'],
    define:['Número de convidados','Peças prioritárias','Faixa de investimento'],
    valueDrivers:['Quantidade de itens','Variedade de formatos','Nível de acabamento'],
    preparation:['Use o Monte seu Kit','Informe a data do evento','Separe até 6 inspirações'],
  },
  'Mesa & festa':{
    ideal:['Decoração de mesa','Painel e cantinhos especiais','Fotos e composição visual'],
    define:['Quantidade de pontos de decoração','Tamanho disponível','Tema e mensagem'],
    valueDrivers:['Tamanho','Estrutura e suporte','Número de elementos e camadas'],
    preparation:['Meça o espaço disponível','Informe se precisa ficar em pé','Envie foto da mesa quando possível'],
  },
  'Flores & acabamentos':{
    ideal:['Volume e textura','Finalização premium','Detalhes de caixas e painéis'],
    define:['Quantidade','Tamanho','Paleta de cores'],
    valueDrivers:['Número de camadas','Tamanho final','Papel e montagem'],
    preparation:['Defina onde será aplicado','Informe medidas','Combine com a paleta principal'],
  },
};
const fallback:ProductBuyingGuide={ideal:['Papelaria personalizada sob encomenda','Composição coordenada com o tema'],define:['Tema','Quantidade','Data do evento'],valueDrivers:['Quantidade','Complexidade da arte','Materiais e acabamento'],preparation:['Separe referências','Informe medidas quando necessário','Confirme a data do evento']};
export function productBuyingGuide(product:Pick<Product,'category'>){return guides[product.category]||fallback;}
