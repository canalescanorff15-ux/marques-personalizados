export type InspirationModel = {
  code:string;
  title:string;
  group:string;
  category:string;
  occasion:string;
  style:string;
  tier:'Essencial'|'Intermediário'|'Premium';
  palette:'blush'|'sage'|'lilac'|'sky'|'cocoa'|'blackgold'|'candy'|'terracotta';
  description:string;
  tags:string[];
};

export const inspirationModels:InspirationModel[] = [
  {code:'INSP-001',title:'Topo Floral Rosé',group:'Topos de bolo',category:'Topo de bolo',occasion:'Adulto',style:'Floral delicado',tier:'Premium',palette:'blush',description:'Camadas suaves, nome em destaque e composição floral em tons rosé e champanhe.',tags:['floral','rosé','adulto']},
  {code:'INSP-002',title:'Topo Jardim Encantado',group:'Topos de bolo',category:'Topo de bolo',occasion:'Infantil',style:'Botânico',tier:'Premium',palette:'sage',description:'Flores, folhas, borboletas e volume para uma mesa leve e delicada.',tags:['jardim','borboletas','verde']},
  {code:'INSP-003',title:'Topo Luxo Dourado',group:'Topos de bolo',category:'Topo de bolo',occasion:'Adulto',style:'Luxo clássico',tier:'Premium',palette:'blackgold',description:'Tipografia elegante, dourado em evidência e leitura forte para celebrações adultas.',tags:['luxo','dourado','adulto']},
  {code:'INSP-004',title:'Topo Minimal Nude',group:'Topos de bolo',category:'Topo de bolo',occasion:'Adulto',style:'Minimalista',tier:'Intermediário',palette:'cocoa',description:'Poucos elementos, formas limpas e acabamento sofisticado em tons neutros.',tags:['minimalista','nude','elegante']},
  {code:'INSP-005',title:'Topo Personagem em Camadas',group:'Topos de bolo',category:'Topo de bolo',occasion:'Infantil',style:'3D divertido',tier:'Premium',palette:'candy',description:'Personagem central, nome, idade e recortes em camadas para criar profundidade.',tags:['personagem','3d','infantil']},

  {code:'INSP-006',title:'Caixa Milk Floral',group:'Caixas personalizadas',category:'Caixa Milk',occasion:'Adulto',style:'Floral premium',tier:'Premium',palette:'blush',description:'Milk com aplique floral, nome personalizado e acabamento delicado.',tags:['milk','floral','rosé']},
  {code:'INSP-007',title:'Pirâmide Princesa',group:'Caixas personalizadas',category:'Caixa Pirâmide',occasion:'Infantil',style:'Encantado',tier:'Intermediário',palette:'lilac',description:'Formato pirâmide com coroa, nome e detalhes suaves para temas de princesa.',tags:['pirâmide','princesa','lilás']},
  {code:'INSP-008',title:'Caixa Bala Safari',group:'Caixas personalizadas',category:'Caixa Bala',occasion:'Infantil',style:'Safari fofo',tier:'Intermediário',palette:'sage',description:'Bichinhos, folhagens e tons naturais para festas safari e floresta.',tags:['bala','safari','bichinhos']},
  {code:'INSP-009',title:'Caixa Sushi Luxo',group:'Caixas personalizadas',category:'Caixa Sushi',occasion:'Adulto',style:'Elegante',tier:'Premium',palette:'blackgold',description:'Estrutura limpa, cinta personalizada e acabamento sofisticado para doces e lembranças.',tags:['sushi','luxo','dourado']},
  {code:'INSP-010',title:'Caixa Cenário Encanto',group:'Caixas personalizadas',category:'Caixa Cenário',occasion:'Infantil',style:'Cenográfico',tier:'Premium',palette:'candy',description:'Camadas frontais e cenário interno para transformar a caixa em parte da decoração.',tags:['cenário','3d','infantil']},

  {code:'INSP-011',title:'Tag Delicada com Laço',group:'Lembranças e detalhes',category:'Tag',occasion:'Diversos',style:'Romântico',tier:'Essencial',palette:'blush',description:'Tag personalizada para sacolinhas, lembranças, caixas e kits de agradecimento.',tags:['tag','laço','delicado']},
  {code:'INSP-012',title:'Porta-bombom Floral',group:'Lembranças e detalhes',category:'Porta-bombom',occasion:'Adulto',style:'Floral',tier:'Intermediário',palette:'sage',description:'Pequena lembrança com flores, nome e mensagem curta para convidados.',tags:['bombom','floral','lembrança']},
  {code:'INSP-013',title:'Mini Sacolinha Personalizada',group:'Lembranças e detalhes',category:'Sacolinha',occasion:'Infantil',style:'Fofo',tier:'Intermediário',palette:'sky',description:'Sacolinha compacta para doces com tema, nome e idade da criança.',tags:['sacola','doces','infantil']},
  {code:'INSP-014',title:'Kit de Adesivos Recortados',group:'Lembranças e detalhes',category:'Adesivos',occasion:'Diversos',style:'Colorido',tier:'Essencial',palette:'candy',description:'Conjunto de adesivos para copos, caixas, sacolas e lembranças.',tags:['adesivo','recorte','kit']},
  {code:'INSP-015',title:'Display de Mesa 3D',group:'Lembranças e detalhes',category:'Display',occasion:'Diversos',style:'Cenográfico',tier:'Premium',palette:'terracotta',description:'Peça de apoio para compor a mesa com nome, personagem ou elemento principal do tema.',tags:['display','mesa','3d']},

  {code:'INSP-016',title:'Kit Econômico Festa',group:'Kits completos',category:'Kit personalizado',occasion:'Diversos',style:'Essencial',tier:'Essencial',palette:'sky',description:'Uma composição enxuta com topo, tags e itens de destaque para começar bem.',tags:['kit','econômico','festa']},
  {code:'INSP-017',title:'Kit Essencial Coordenado',group:'Kits completos',category:'Kit personalizado',occasion:'Diversos',style:'Coordenado',tier:'Intermediário',palette:'sage',description:'Topo, caixas e detalhes visuais combinando entre si para uma mesa coesa.',tags:['kit','coordenado','essencial']},
  {code:'INSP-018',title:'Kit Completo 30 Convidados',group:'Kits completos',category:'Kit personalizado',occasion:'Aniversário',style:'Completo',tier:'Premium',palette:'blush',description:'Seleção equilibrada de topo, caixas, tags e displays para uma comemoração média.',tags:['kit','30 convidados','completo']},
  {code:'INSP-019',title:'Kit Premium Mesa Principal',group:'Kits completos',category:'Kit personalizado',occasion:'Diversos',style:'Luxo',tier:'Premium',palette:'blackgold',description:'Peças de impacto para a mesa principal, com mais camadas e acabamentos especiais.',tags:['kit','premium','mesa']},
  {code:'INSP-020',title:'Kit Mini Festa em Casa',group:'Kits completos',category:'Kit personalizado',occasion:'Aniversário',style:'Compacto',tier:'Essencial',palette:'candy',description:'Solução compacta para comemorações menores sem perder identidade visual.',tags:['kit','festa em casa','compacto']},

  {code:'INSP-021',title:'Ursinho Tons Neutros',group:'Infantil',category:'Tema infantil',occasion:'1 ano',style:'Fofo',tier:'Intermediário',palette:'cocoa',description:'Ursinho, estrelas e tons neutros para primeiro aniversário ou mesversário.',tags:['ursinho','1 ano','neutro']},
  {code:'INSP-022',title:'Borboletas em Lilás',group:'Infantil',category:'Tema infantil',occasion:'Aniversário',style:'Delicado',tier:'Premium',palette:'lilac',description:'Borboletas, flores e nome em camadas para uma composição leve e feminina.',tags:['borboletas','lilás','flores']},
  {code:'INSP-023',title:'Dinossauro Aventura',group:'Infantil',category:'Tema infantil',occasion:'Aniversário',style:'Aventura',tier:'Intermediário',palette:'sage',description:'Dinossauros, folhagens e cores terrosas com leitura divertida.',tags:['dinossauro','aventura','verde']},
  {code:'INSP-024',title:'Espaço Sideral',group:'Infantil',category:'Tema infantil',occasion:'Aniversário',style:'Galáxia',tier:'Premium',palette:'sky',description:'Foguetes, planetas, estrelas e camadas em uma composição espacial.',tags:['espaço','foguete','planetas']},
  {code:'INSP-025',title:'Futebol Campeão',group:'Infantil',category:'Tema infantil',occasion:'Aniversário',style:'Esportivo',tier:'Intermediário',palette:'sage',description:'Nome, idade, bola e escudo personalizados para fãs de futebol.',tags:['futebol','campeão','esporte']},

  {code:'INSP-026',title:'Rosé 30 Anos',group:'Adulto',category:'Tema adulto',occasion:'30 anos',style:'Elegante',tier:'Premium',palette:'blush',description:'Rosé, dourado e tipografia refinada para uma comemoração adulta elegante.',tags:['30 anos','rosé','adulto']},
  {code:'INSP-027',title:'Boteco Personalizado',group:'Adulto',category:'Tema adulto',occasion:'Aniversário',style:'Descontraído',tier:'Intermediário',palette:'terracotta',description:'Elementos de boteco, nome e frases personalizadas com visual descontraído.',tags:['boteco','adulto','aniversário']},
  {code:'INSP-028',title:'Cinema & Série',group:'Adulto',category:'Tema adulto',occasion:'Aniversário',style:'Temático',tier:'Premium',palette:'blackgold',description:'Referências visuais de filmes e séries organizadas em uma composição sofisticada.',tags:['cinema','série','temático']},
  {code:'INSP-029',title:'Viagem dos Sonhos',group:'Adulto',category:'Tema adulto',occasion:'Aniversário',style:'Memórias',tier:'Intermediário',palette:'sky',description:'Passagens, mapas, destinos e elementos pessoais transformados em papelaria.',tags:['viagem','mapa','memórias']},
  {code:'INSP-030',title:'Profissão em Destaque',group:'Adulto',category:'Tema adulto',occasion:'Aniversário',style:'Personalizado',tier:'Intermediário',palette:'cocoa',description:'Uma linha visual inspirada na profissão, rotina ou paixão de quem comemora.',tags:['profissão','personalizado','adulto']},

  {code:'INSP-031',title:'Chá Revelação Suave',group:'Celebrações',category:'Chá revelação',occasion:'Chá revelação',style:'Delicado',tier:'Intermediário',palette:'sky',description:'Azul, rosa e elementos delicados para uma revelação leve e afetiva.',tags:['chá revelação','bebê','delicado']},
  {code:'INSP-032',title:'Batizado Clássico',group:'Celebrações',category:'Batizado',occasion:'Batizado',style:'Clássico',tier:'Premium',palette:'cocoa',description:'Branco, dourado suave e elementos discretos para uma composição de batizado.',tags:['batizado','clássico','branco']},
  {code:'INSP-033',title:'15 Anos Jardim de Luz',group:'Celebrações',category:'15 anos',occasion:'15 anos',style:'Romântico',tier:'Premium',palette:'lilac',description:'Flores, pontos de luz e tipografia delicada para uma festa de 15 anos.',tags:['15 anos','jardim','romântico']},
  {code:'INSP-034',title:'Casamento Botânico',group:'Celebrações',category:'Casamento',occasion:'Casamento',style:'Botânico',tier:'Premium',palette:'sage',description:'Folhagens, monograma e tons naturais para itens delicados de casamento.',tags:['casamento','botânico','monograma']},
  {code:'INSP-035',title:'Formatura Dourada',group:'Celebrações',category:'Formatura',occasion:'Formatura',style:'Elegante',tier:'Premium',palette:'blackgold',description:'Capelo, curso, nome e dourado para lembranças e detalhes de formatura.',tags:['formatura','dourado','curso']},

  {code:'INSP-036',title:'Floral Botânico',group:'Estilos',category:'Estilo visual',occasion:'Diversos',style:'Botânico',tier:'Premium',palette:'sage',description:'Folhas, flores de traço delicado e cores naturais para várias ocasiões.',tags:['floral','botânico','verde']},
  {code:'INSP-037',title:'Candy Color',group:'Estilos',category:'Estilo visual',occasion:'Infantil',style:'Colorido suave',tier:'Intermediário',palette:'candy',description:'Cores alegres e suaves combinadas em uma linguagem divertida e moderna.',tags:['candy','colorido','infantil']},
  {code:'INSP-038',title:'Preto & Dourado',group:'Estilos',category:'Estilo visual',occasion:'Adulto',style:'Luxo',tier:'Premium',palette:'blackgold',description:'Alto contraste e acabamento sofisticado para festas adultas e eventos.',tags:['preto','dourado','luxo']},
  {code:'INSP-039',title:'Branco Minimal',group:'Estilos',category:'Estilo visual',occasion:'Diversos',style:'Minimalista',tier:'Essencial',palette:'cocoa',description:'Composição limpa, elegante e versátil para quem prefere menos elementos.',tags:['branco','minimalista','clean']},
  {code:'INSP-040',title:'Colorido Fun',group:'Estilos',category:'Estilo visual',occasion:'Diversos',style:'Divertido',tier:'Intermediário',palette:'terracotta',description:'Formas, cores e tipografia descontraída para festas cheias de personalidade.',tags:['colorido','fun','moderno']},

  {code:'INSP-041',title:'Topo Shaker Estrelas',group:'Topos de bolo',category:'Topo de bolo',occasion:'Infantil',style:'Shaker',tier:'Premium',palette:'sky',description:'Camadas com janela shaker, estrelas e nome em destaque para um topo com movimento.',tags:['shaker','estrelas','infantil']},
  {code:'INSP-042',title:'Topo Transparente com Acetato',group:'Topos de bolo',category:'Topo de bolo',occasion:'Diversos',style:'Contemporâneo',tier:'Premium',palette:'blush',description:'Acetato, lettering delicado e poucos elementos para um resultado leve e moderno.',tags:['acetato','transparente','moderno']},
  {code:'INSP-043',title:'Topo Nome & Idade',group:'Topos de bolo',category:'Topo de bolo',occasion:'Diversos',style:'Simples elegante',tier:'Essencial',palette:'cocoa',description:'Nome, idade e dois ou três elementos principais para um topo bonito e econômico.',tags:['simples','nome','idade']},
  {code:'INSP-044',title:'Topo Anime Impacto',group:'Topos de bolo',category:'Topo de bolo',occasion:'Infantil',style:'Ação',tier:'Premium',palette:'terracotta',description:'Composição dinâmica, camadas marcantes e cores fortes inspiradas em universos de anime.',tags:['anime','ação','camadas']},
  {code:'INSP-045',title:'Topo Gamer Neon',group:'Topos de bolo',category:'Topo de bolo',occasion:'Infantil',style:'Gamer',tier:'Intermediário',palette:'blackgold',description:'Controle, elementos digitais e contrastes de neon para aniversários gamer.',tags:['gamer','neon','jogos']},

  {code:'INSP-046',title:'Caixa Coração Delicada',group:'Caixas personalizadas',category:'Caixa Coração',occasion:'Adulto',style:'Romântico',tier:'Premium',palette:'blush',description:'Formato coração com camadas delicadas para lembranças afetivas e festas românticas.',tags:['coração','romântico','caixa']},
  {code:'INSP-047',title:'Caixa Maleta Aventura',group:'Caixas personalizadas',category:'Caixa Maleta',occasion:'Infantil',style:'Aventura',tier:'Intermediário',palette:'sage',description:'Maletinha personalizada com alça, nome e elementos temáticos para doces e lembranças.',tags:['maleta','aventura','infantil']},
  {code:'INSP-048',title:'Caixa Cubo com Visor',group:'Caixas personalizadas',category:'Caixa Cubo',occasion:'Diversos',style:'Clean',tier:'Intermediário',palette:'sky',description:'Cubo com visor frontal para valorizar o conteúdo e manter a identidade do tema.',tags:['cubo','visor','clean']},
  {code:'INSP-049',title:'Porta Chocolate Personalizado',group:'Caixas personalizadas',category:'Porta Chocolate',occasion:'Diversos',style:'Afetivo',tier:'Essencial',palette:'candy',description:'Embalagem personalizada para chocolates, ótima para lembranças e pequenas comemorações.',tags:['chocolate','lembrança','econômico']},
  {code:'INSP-050',title:'Caixa Travesseiro Floral',group:'Caixas personalizadas',category:'Caixa Travesseiro',occasion:'Adulto',style:'Floral',tier:'Intermediário',palette:'lilac',description:'Formato travesseiro com floral suave, nome e fechamento delicado.',tags:['travesseiro','floral','adulto']},

  {code:'INSP-051',title:'Forminha Floral em Camadas',group:'Lembranças e detalhes',category:'Forminha',occasion:'Diversos',style:'Floral',tier:'Intermediário',palette:'blush',description:'Forminha decorativa em camadas para doces, combinando com a identidade da mesa.',tags:['forminha','floral','doces']},
  {code:'INSP-052',title:'Bandeirola Nome & Parabéns',group:'Lembranças e detalhes',category:'Bandeirola',occasion:'Aniversário',style:'Coordenado',tier:'Essencial',palette:'candy',description:'Bandeirola personalizada com nome ou mensagem para completar o cenário da festa.',tags:['bandeirola','nome','parabéns']},
  {code:'INSP-053',title:'Wrapper para Cupcake',group:'Lembranças e detalhes',category:'Wrapper',occasion:'Diversos',style:'Coordenado',tier:'Essencial',palette:'sky',description:'Faixa decorativa para cupcakes com tema, nome ou pequenos elementos gráficos.',tags:['wrapper','cupcake','mesa']},
  {code:'INSP-054',title:'Plaquinha de Mesa Personalizada',group:'Lembranças e detalhes',category:'Plaquinha',occasion:'Diversos',style:'Editorial',tier:'Intermediário',palette:'terracotta',description:'Plaquinha para mesa com frase, nome, idade ou informação da comemoração.',tags:['plaquinha','mesa','frase']},
  {code:'INSP-055',title:'Tag de Agradecimento Premium',group:'Lembranças e detalhes',category:'Tag',occasion:'Diversos',style:'Elegante',tier:'Essencial',palette:'blackgold',description:'Tag de agradecimento com acabamento sofisticado para finalizar lembranças e presentes.',tags:['tag','agradecimento','premium']},

  {code:'INSP-056',title:'Kit Festa 10 Convidados',group:'Kits completos',category:'Kit personalizado',occasion:'Aniversário',style:'Compacto',tier:'Essencial',palette:'candy',description:'Composição pequena para comemorações íntimas, com topo e detalhes essenciais.',tags:['kit','10 convidados','compacto']},
  {code:'INSP-057',title:'Kit Festa 20 Convidados',group:'Kits completos',category:'Kit personalizado',occasion:'Aniversário',style:'Equilibrado',tier:'Intermediário',palette:'sage',description:'Quantidade intermediária de peças para uma mesa completa sem exageros.',tags:['kit','20 convidados','equilibrado']},
  {code:'INSP-058',title:'Kit Festa 50 Convidados',group:'Kits completos',category:'Kit personalizado',occasion:'Aniversário',style:'Completo',tier:'Premium',palette:'blush',description:'Seleção ampla para festas maiores, combinando peças de impacto e lembranças.',tags:['kit','50 convidados','completo']},
  {code:'INSP-059',title:'Kit Chá de Bebê',group:'Kits completos',category:'Kit personalizado',occasion:'Chá de bebê',style:'Delicado',tier:'Intermediário',palette:'sky',description:'Topo, caixas e detalhes suaves coordenados para chá de bebê ou revelação.',tags:['kit','chá de bebê','bebê']},
  {code:'INSP-060',title:'Kit Batizado Elegante',group:'Kits completos',category:'Kit personalizado',occasion:'Batizado',style:'Clássico',tier:'Premium',palette:'cocoa',description:'Composição clara e delicada para batizado, com dourado suave e elementos simbólicos.',tags:['kit','batizado','elegante']},

  {code:'INSP-061',title:'Fundo do Mar Delicado',group:'Infantil',category:'Tema infantil',occasion:'Aniversário',style:'Marinho',tier:'Premium',palette:'sky',description:'Conchas, ondas, peixinhos e camadas suaves em uma leitura lúdica e delicada.',tags:['fundo do mar','peixinhos','oceano']},
  {code:'INSP-062',title:'Fazendinha Aconchegante',group:'Infantil',category:'Tema infantil',occasion:'Aniversário',style:'Rústico fofo',tier:'Intermediário',palette:'terracotta',description:'Bichinhos da fazenda, madeira e tons terrosos em uma composição acolhedora.',tags:['fazendinha','bichinhos','rústico']},
  {code:'INSP-063',title:'Arco-íris Boho',group:'Infantil',category:'Tema infantil',occasion:'1 ano',style:'Boho',tier:'Intermediário',palette:'cocoa',description:'Arco-íris, nuvens e tons terrosos suaves para primeiro aniversário e mesversário.',tags:['arco-íris','boho','1 ano']},
  {code:'INSP-064',title:'Universo Gamer',group:'Infantil',category:'Tema infantil',occasion:'Aniversário',style:'Gamer',tier:'Premium',palette:'blackgold',description:'Elementos de jogos, pixels e controles com visual moderno e alto contraste.',tags:['gamer','jogos','pixel']},

  {code:'INSP-065',title:'Topo Safari Aquarelado',group:'Topos de bolo',category:'Topo de bolo',occasion:'Infantil',style:'Safari delicado',tier:'Intermediário',palette:'sage',description:'Bichinhos suaves, folhagens e nome em destaque com leitura leve e acolhedora.',tags:['safari','aquarela','bichinhos']},
  {code:'INSP-066',title:'Topo Rosa & Borboletas',group:'Topos de bolo',category:'Topo de bolo',occasion:'Infantil',style:'Delicado',tier:'Premium',palette:'blush',description:'Borboletas, flores e camadas rosadas para aniversários delicados e femininos.',tags:['borboletas','rosa','camadas']},
  {code:'INSP-067',title:'Topo Azul Céu 1 Ano',group:'Topos de bolo',category:'Topo de bolo',occasion:'1 ano',style:'Fofo',tier:'Intermediário',palette:'sky',description:'Nuvens, estrelas e número em destaque para primeiro aniversário e mesversário.',tags:['1 ano','nuvens','azul']},
  {code:'INSP-068',title:'Topo Boho Terracota',group:'Topos de bolo',category:'Topo de bolo',occasion:'Adulto',style:'Boho',tier:'Premium',palette:'terracotta',description:'Arcos, folhagens e tons terrosos com acabamento moderno e sofisticado.',tags:['boho','terracota','adulto']},
  {code:'INSP-069',title:'Topo Preto & Dourado',group:'Topos de bolo',category:'Topo de bolo',occasion:'Adulto',style:'Luxo',tier:'Premium',palette:'blackgold',description:'Contraste marcante, nome em evidência e detalhes dourados para festas adultas.',tags:['preto','dourado','luxo']},
  {code:'INSP-070',title:'Topo Arco-íris Pastel',group:'Topos de bolo',category:'Topo de bolo',occasion:'Infantil',style:'Colorido',tier:'Intermediário',palette:'candy',description:'Arco-íris, nuvens e cores suaves em composição alegre sem pesar a mesa.',tags:['arco-íris','pastel','infantil']},
  {code:'INSP-071',title:'Topo Formatura Elegante',group:'Topos de bolo',category:'Topo de bolo',occasion:'Formatura',style:'Elegante',tier:'Premium',palette:'blackgold',description:'Capelo, curso, nome e ano em uma composição refinada para celebrar a conquista.',tags:['formatura','capelo','curso']},
  {code:'INSP-072',title:'Topo Bodas Botânico',group:'Topos de bolo',category:'Topo de bolo',occasion:'Casamento',style:'Botânico',tier:'Premium',palette:'sage',description:'Monograma, folhagens e data especial para bodas, noivado e casamento intimista.',tags:['bodas','casamento','monograma']},

  {code:'INSP-073',title:'Caixa Milk Arco-íris',group:'Caixas personalizadas',category:'Caixa Milk',occasion:'Infantil',style:'Colorido',tier:'Intermediário',palette:'candy',description:'Milk alegre com nome, idade e elementos coordenados em paleta pastel.',tags:['milk','arco-íris','pastel']},
  {code:'INSP-074',title:'Caixa Milk Luxo Rosé',group:'Caixas personalizadas',category:'Caixa Milk',occasion:'Adulto',style:'Luxo',tier:'Premium',palette:'blush',description:'Camadas, aplique floral e acabamento rosé para lembranças de maior impacto.',tags:['milk','luxo','rosé']},
  {code:'INSP-075',title:'Caixa Pirâmide Fundo do Mar',group:'Caixas personalizadas',category:'Caixa Pirâmide',occasion:'Infantil',style:'Marinho',tier:'Intermediário',palette:'sky',description:'Peixinhos, conchas e nome personalizado aplicados ao formato pirâmide.',tags:['pirâmide','fundo do mar','peixinhos']},
  {code:'INSP-076',title:'Caixa Bala Dinossauro',group:'Caixas personalizadas',category:'Caixa Bala',occasion:'Infantil',style:'Aventura',tier:'Intermediário',palette:'sage',description:'Dinossauros e folhagens com fechamento lateral para doces e lembranças.',tags:['bala','dinossauro','aventura']},
  {code:'INSP-077',title:'Caixa Sushi Floral Nude',group:'Caixas personalizadas',category:'Caixa Sushi',occasion:'Adulto',style:'Floral',tier:'Premium',palette:'cocoa',description:'Base neutra, cinta floral e monograma para uma lembrança adulta elegante.',tags:['sushi','floral','nude']},
  {code:'INSP-078',title:'Caixa Maleta Gamer',group:'Caixas personalizadas',category:'Caixa Maleta',occasion:'Infantil',style:'Gamer',tier:'Premium',palette:'blackgold',description:'Formato maleta com pixels, controles e nome em alto contraste.',tags:['maleta','gamer','jogos']},
  {code:'INSP-079',title:'Caixa Coração 15 Anos',group:'Caixas personalizadas',category:'Caixa Coração',occasion:'15 anos',style:'Romântico',tier:'Premium',palette:'lilac',description:'Caixa em formato de coração com flores, nome e detalhe metalizado.',tags:['coração','15 anos','romântico']},
  {code:'INSP-080',title:'Caixa Cubo Batizado',group:'Caixas personalizadas',category:'Caixa Cubo',occasion:'Batizado',style:'Clássico',tier:'Intermediário',palette:'cocoa',description:'Cubo claro com símbolo delicado, nome e data para lembrança de batizado.',tags:['cubo','batizado','clássico']},

  {code:'INSP-081',title:'Adesivo Redondo Floral',group:'Lembranças e detalhes',category:'Adesivos',occasion:'Adulto',style:'Floral',tier:'Essencial',palette:'blush',description:'Adesivo redondo para fechar embalagens, decorar copos ou identificar lembranças.',tags:['adesivo','floral','redondo']},
  {code:'INSP-082',title:'Adesivo Recortado Personagem',group:'Lembranças e detalhes',category:'Adesivos',occasion:'Infantil',style:'Colorido',tier:'Essencial',palette:'candy',description:'Recorte de contorno para personalizar sacolas, caixas, tubetes e mimos.',tags:['adesivo','recortado','personagem']},
  {code:'INSP-083',title:'Display Nome em Camadas',group:'Lembranças e detalhes',category:'Display',occasion:'Diversos',style:'3D',tier:'Premium',palette:'lilac',description:'Nome grande em camadas para mesa principal, painel ou cantinho de lembranças.',tags:['display','nome','camadas']},
  {code:'INSP-084',title:'Display Número de Mesa',group:'Lembranças e detalhes',category:'Display',occasion:'Casamento',style:'Minimalista',tier:'Intermediário',palette:'sage',description:'Identificação elegante de mesas com número, monograma ou pequena mensagem.',tags:['display','mesa','casamento']},
  {code:'INSP-085',title:'Forminha Jardim Rosé',group:'Lembranças e detalhes',category:'Forminha',occasion:'Adulto',style:'Floral',tier:'Intermediário',palette:'blush',description:'Pétalas em camadas para envolver doces e repetir a linguagem floral da festa.',tags:['forminha','jardim','rosé']},
  {code:'INSP-086',title:'Bandeirola Safari',group:'Lembranças e detalhes',category:'Bandeirola',occasion:'Infantil',style:'Safari fofo',tier:'Essencial',palette:'sage',description:'Nome e idade em bandeirolas coordenadas com bichinhos e folhagens.',tags:['bandeirola','safari','nome']},
  {code:'INSP-087',title:'Plaquinha Bem-vindos',group:'Lembranças e detalhes',category:'Plaquinha',occasion:'Diversos',style:'Elegante',tier:'Intermediário',palette:'cocoa',description:'Plaquinha para recepção, mesa de doces ou entrada da comemoração.',tags:['plaquinha','bem-vindos','recepção']},
  {code:'INSP-088',title:'Cartão Obrigado por Vir',group:'Lembranças e detalhes',category:'Tag',occasion:'Diversos',style:'Afetivo',tier:'Essencial',palette:'terracotta',description:'Cartão de agradecimento para acompanhar lembranças e pequenos presentes.',tags:['agradecimento','cartão','lembrança']},

  {code:'INSP-089',title:'Kit Econômico 10 Peças',group:'Kits completos',category:'Kit personalizado',occasion:'Aniversário',style:'Essencial',tier:'Essencial',palette:'sky',description:'Composição pequena com peças-chave para uma celebração prática e personalizada.',tags:['kit','10 peças','econômico']},
  {code:'INSP-090',title:'Kit Topo + 12 Caixas',group:'Kits completos',category:'Kit personalizado',occasion:'Aniversário',style:'Equilibrado',tier:'Intermediário',palette:'sage',description:'Topo coordenado com doze caixas variadas para uma mesa completa sem excesso.',tags:['kit','12 caixas','topo']},
  {code:'INSP-091',title:'Kit Premium 24 Caixas',group:'Kits completos',category:'Kit personalizado',occasion:'Aniversário',style:'Luxo',tier:'Premium',palette:'blush',description:'Mix de formatos, topo e detalhes de mesa para uma composição de maior impacto.',tags:['kit','24 caixas','premium']},
  {code:'INSP-092',title:'Kit Festa na Escola',group:'Kits completos',category:'Kit personalizado',occasion:'Escolar',style:'Prático',tier:'Essencial',palette:'candy',description:'Peças compactas e fáceis de transportar para comemorar na escola ou creche.',tags:['kit','escola','prático']},
  {code:'INSP-093',title:'Kit Mesversário',group:'Kits completos',category:'Kit personalizado',occasion:'Mesversário',style:'Fofo',tier:'Intermediário',palette:'sky',description:'Topo, mini-caixas e detalhes para registrar cada mês do bebê com identidade.',tags:['kit','mesversário','bebê']},
  {code:'INSP-094',title:'Kit 15 Anos Rosé',group:'Kits completos',category:'Kit personalizado',occasion:'15 anos',style:'Romântico',tier:'Premium',palette:'blush',description:'Topo, caixas e lembranças coordenadas em rosé, flores e toques dourados.',tags:['kit','15 anos','rosé']},
  {code:'INSP-095',title:'Kit Chá Revelação',group:'Kits completos',category:'Kit personalizado',occasion:'Chá revelação',style:'Delicado',tier:'Intermediário',palette:'candy',description:'Peças coordenadas em duas cores para criar expectativa e unidade visual.',tags:['kit','chá revelação','bebê']},
  {code:'INSP-096',title:'Kit Casamento Intimista',group:'Kits completos',category:'Kit personalizado',occasion:'Casamento',style:'Botânico',tier:'Premium',palette:'sage',description:'Tags, caixas, displays e lembranças com monograma para celebrações menores.',tags:['kit','casamento','monograma']},

  {code:'INSP-097',title:'Bosque dos Bichinhos',group:'Infantil',category:'Tema infantil',occasion:'Infantil',style:'Botânico',tier:'Premium',palette:'sage',description:'Animais fofos, cogumelos e folhas para uma festa infantil com clima de bosque.',tags:['bosque','bichinhos','folhas']},
  {code:'INSP-098',title:'Nuvens & Estrelinhas',group:'Infantil',category:'Tema infantil',occasion:'1 ano',style:'Delicado',tier:'Intermediário',palette:'sky',description:'Nuvens, luas e estrelas para primeiro ano, mesversário ou chá de bebê.',tags:['nuvens','estrelas','1 ano']},
  {code:'INSP-099',title:'Circo Candy',group:'Infantil',category:'Tema infantil',occasion:'Infantil',style:'Colorido',tier:'Premium',palette:'candy',description:'Listras, estrelas e elementos de circo em uma paleta alegre e suave.',tags:['circo','candy','colorido']},
  {code:'INSP-100',title:'Construção Divertida',group:'Infantil',category:'Tema infantil',occasion:'Infantil',style:'Aventura',tier:'Intermediário',palette:'terracotta',description:'Máquinas, placas e elementos de obra em composição infantil divertida.',tags:['construção','máquinas','infantil']},
  {code:'INSP-101',title:'Jardim das Abelhinhas',group:'Infantil',category:'Tema infantil',occasion:'Infantil',style:'Floral',tier:'Premium',palette:'candy',description:'Abelhinhas, flores e favos em uma linha delicada e alegre.',tags:['abelhinha','jardim','flores']},
  {code:'INSP-102',title:'Aventura no Espaço',group:'Infantil',category:'Tema infantil',occasion:'Infantil',style:'Galáxia',tier:'Premium',palette:'blackgold',description:'Planetas, foguetes e estrelas com contraste para uma mesa de grande presença.',tags:['espaço','planetas','foguete']},
  {code:'INSP-103',title:'Festa das Frutinhas',group:'Infantil',category:'Tema infantil',occasion:'Infantil',style:'Colorido',tier:'Intermediário',palette:'candy',description:'Frutas sorridentes e cores vivas para festas leves e divertidas.',tags:['frutinhas','colorido','fofo']},
  {code:'INSP-104',title:'Pequeno Fazendeiro',group:'Infantil',category:'Tema infantil',occasion:'Infantil',style:'Rústico fofo',tier:'Intermediário',palette:'terracotta',description:'Celeiro, trator e animais em tons naturais para uma fazendinha personalizada.',tags:['fazendinha','trator','rústico']},

  {code:'INSP-105',title:'Floral Marsala 40 Anos',group:'Adulto',category:'Tema adulto',occasion:'40 anos',style:'Floral',tier:'Premium',palette:'terracotta',description:'Flores profundas, dourado suave e tipografia refinada para comemorações adultas.',tags:['40 anos','marsala','floral']},
  {code:'INSP-106',title:'Minimal Preto 50 Anos',group:'Adulto',category:'Tema adulto',occasion:'50 anos',style:'Minimalista',tier:'Premium',palette:'blackgold',description:'Preto, dourado e poucos elementos para uma celebração madura e sofisticada.',tags:['50 anos','preto','minimalista']},
  {code:'INSP-107',title:'Vinho & Queijos',group:'Adulto',category:'Tema adulto',occasion:'Adulto',style:'Rústico elegante',tier:'Intermediário',palette:'cocoa',description:'Rótulos, taças e elementos de madeira para uma comemoração intimista.',tags:['vinho','queijos','adulto']},
  {code:'INSP-108',title:'Churrasco & Resenha',group:'Adulto',category:'Tema adulto',occasion:'Adulto',style:'Descontraído',tier:'Intermediário',palette:'terracotta',description:'Frases, grelha e elementos descontraídos para aniversários e confraternizações.',tags:['churrasco','resenha','adulto']},
  {code:'INSP-109',title:'Música & Vinil',group:'Adulto',category:'Tema adulto',occasion:'Adulto',style:'Retrô',tier:'Premium',palette:'blackgold',description:'Discos, notas e referências musicais personalizadas para quem ama música.',tags:['música','vinil','retrô']},
  {code:'INSP-110',title:'Viagem Tropical',group:'Adulto',category:'Tema adulto',occasion:'Adulto',style:'Tropical',tier:'Intermediário',palette:'sage',description:'Folhagens, mapas e cores quentes para comemorar histórias e destinos.',tags:['viagem','tropical','mapa']},
  {code:'INSP-111',title:'Profissão Saúde',group:'Adulto',category:'Tema adulto',occasion:'Formatura',style:'Elegante',tier:'Premium',palette:'sky',description:'Símbolos da área da saúde, nome e conquista em uma composição limpa.',tags:['saúde','formatura','profissão']},
  {code:'INSP-112',title:'Profissão Educação',group:'Adulto',category:'Tema adulto',occasion:'Formatura',style:'Afetivo',tier:'Intermediário',palette:'candy',description:'Livros, lápis e frases para homenagear professores e formandos da educação.',tags:['educação','professor','formatura']},

  {code:'INSP-113',title:'Noivado Botânico',group:'Celebrações',category:'Noivado',occasion:'Casamento',style:'Botânico',tier:'Premium',palette:'sage',description:'Monograma, folhagens e dourado suave para noivado ou pedido especial.',tags:['noivado','botânico','monograma']},
  {code:'INSP-114',title:'Casamento Rosé',group:'Celebrações',category:'Casamento',occasion:'Casamento',style:'Romântico',tier:'Premium',palette:'blush',description:'Flores rosé, iniciais e detalhes delicados para lembranças e mesa de casamento.',tags:['casamento','rosé','romântico']},
  {code:'INSP-115',title:'Chá de Bebê Ursinho',group:'Celebrações',category:'Chá de bebê',occasion:'Chá de bebê',style:'Fofo',tier:'Intermediário',palette:'cocoa',description:'Ursinho, nuvens e tons neutros para uma recepção delicada do bebê.',tags:['chá de bebê','ursinho','neutro']},
  {code:'INSP-116',title:'Revelação Jardim',group:'Celebrações',category:'Chá revelação',occasion:'Chá revelação',style:'Floral',tier:'Premium',palette:'candy',description:'Flores, borboletas e duas cores em uma composição de revelação mais sofisticada.',tags:['revelação','jardim','flores']},
  {code:'INSP-117',title:'Batizado Azul Sereno',group:'Celebrações',category:'Batizado',occasion:'Batizado',style:'Clássico',tier:'Intermediário',palette:'sky',description:'Azul claro, branco e símbolos discretos para batizado ou apresentação.',tags:['batizado','azul','clássico']},
  {code:'INSP-118',title:'Primeira Comunhão Delicada',group:'Celebrações',category:'Comunhão',occasion:'Religioso',style:'Clássico',tier:'Premium',palette:'cocoa',description:'Elementos simbólicos, branco e dourado suave para uma celebração religiosa.',tags:['comunhão','religioso','dourado']},
  {code:'INSP-119',title:'Formatura Preto & Dourado',group:'Celebrações',category:'Formatura',occasion:'Formatura',style:'Luxo',tier:'Premium',palette:'blackgold',description:'Curso, nome e ano com contraste elegante para comemorar a graduação.',tags:['formatura','dourado','graduação']},
  {code:'INSP-120',title:'Bodas de Ouro',group:'Celebrações',category:'Bodas',occasion:'Casamento',style:'Clássico',tier:'Premium',palette:'blackgold',description:'Monograma, número de anos e dourado em destaque para uma celebração marcante.',tags:['bodas','ouro','casamento']},

  {code:'INSP-121',title:'Cartão Dia das Mães',group:'Datas & presentes',category:'Cartão',occasion:'Dia das Mães',style:'Floral',tier:'Essencial',palette:'blush',description:'Cartão com mensagem, nome e composição floral para acompanhar presentes.',tags:['dia das mães','cartão','floral']},
  {code:'INSP-122',title:'Caixinha Dia dos Pais',group:'Datas & presentes',category:'Caixa presente',occasion:'Dia dos Pais',style:'Clean',tier:'Intermediário',palette:'sky',description:'Embalagem personalizada para chocolate, mimo ou pequena lembrança afetiva.',tags:['dia dos pais','caixa','presente']},
  {code:'INSP-123',title:'Lembrança para Professores',group:'Datas & presentes',category:'Lembrança',occasion:'Professores',style:'Afetivo',tier:'Essencial',palette:'candy',description:'Tag, cartão e embalagem pequena para agradecer professores e educadores.',tags:['professor','lembrança','agradecimento']},
  {code:'INSP-124',title:'Kit Natal Personalizado',group:'Datas & presentes',category:'Kit presente',occasion:'Natal',style:'Clássico',tier:'Premium',palette:'sage',description:'Tags, caixas e cartões coordenados para presentes, clientes ou família.',tags:['natal','kit','presente']},
  {code:'INSP-125',title:'Kit Páscoa Afetiva',group:'Datas & presentes',category:'Kit presente',occasion:'Páscoa',style:'Fofo',tier:'Intermediário',palette:'candy',description:'Porta-chocolate, tag e caixinha em uma composição personalizada para Páscoa.',tags:['páscoa','chocolate','kit']},
  {code:'INSP-126',title:'Volta às Aulas Personalizada',group:'Datas & presentes',category:'Escolar',occasion:'Escolar',style:'Colorido',tier:'Essencial',palette:'candy',description:'Etiquetas, tags e adesivos para identificar materiais com nome e tema.',tags:['escolar','etiquetas','volta às aulas']},
  {code:'INSP-127',title:'Brinde Corporativo Elegante',group:'Datas & presentes',category:'Corporativo',occasion:'Corporativo',style:'Minimalista',tier:'Premium',palette:'blackgold',description:'Tag, cartão e embalagem para pequenos brindes com identidade profissional.',tags:['corporativo','brinde','empresa']},
  {code:'INSP-128',title:'Mimo para Cliente',group:'Datas & presentes',category:'Corporativo',occasion:'Corporativo',style:'Afetivo',tier:'Intermediário',palette:'terracotta',description:'Pequeno presente com agradecimento e identidade da marca para fidelização.',tags:['cliente','mimo','corporativo']},

];

export const inspirationGroups=[...new Set(inspirationModels.map(model=>model.group))];


export type InspirationFacetOption={slug:string;label:string;description:string;value:string};

export const inspirationOccasionCollections:InspirationFacetOption[]=[
  {slug:'infantil',label:'Festa infantil',description:'Do primeiro ano a temas cheios de personalidade.',value:'Infantil'},
  {slug:'adulto',label:'Festa adulta',description:'Ideias elegantes, divertidas ou totalmente personalizadas.',value:'Adulto'},
  {slug:'15-anos',label:'15 anos',description:'Composições delicadas e de maior impacto visual.',value:'15 anos'},
  {slug:'cha-revelacao',label:'Chá & revelação',description:'Bebê, chá de bebê e chá revelação em várias paletas.',value:'Chá'},
  {slug:'batizado',label:'Batizado',description:'Linhas claras, clássicas e delicadas.',value:'Batizado'},
  {slug:'casamento',label:'Casamento & noivado',description:'Monogramas, botânico e acabamentos sofisticados.',value:'Casamento'},
  {slug:'formatura',label:'Formatura',description:'Curso, conquista e profissão em composições especiais.',value:'Formatura'},
  {slug:'escolar',label:'Escola & professores',description:'Festa na escola, etiquetas e pequenos agradecimentos.',value:'Escolar'},
  {slug:'datas',label:'Datas especiais',description:'Páscoa, Natal, mães, pais e presentes afetivos.',value:'presente'},
  {slug:'corporativo',label:'Empresas & clientes',description:'Brindes, mimos e papelaria para relacionamento.',value:'Corporativo'},
];

export const inspirationStyleCollections:InspirationFacetOption[]=[
  {slug:'delicado',label:'Delicado',description:'Leve, suave e afetivo.',value:'delicado'},
  {slug:'floral',label:'Floral',description:'Flores, folhas e composições botânicas.',value:'floral'},
  {slug:'luxo',label:'Luxo',description:'Camadas, dourado e maior presença visual.',value:'luxo'},
  {slug:'minimalista',label:'Minimalista',description:'Poucos elementos e leitura limpa.',value:'minimalista'},
  {slug:'colorido',label:'Colorido',description:'Alegre, divertido e cheio de personalidade.',value:'colorido'},
  {slug:'3d',label:'3D & camadas',description:'Profundidade, volume e efeito cenográfico.',value:'3d'},
  {slug:'gamer',label:'Gamer',description:'Contraste, pixels, controles e neon.',value:'gamer'},
  {slug:'boho',label:'Boho',description:'Tons terrosos e visual aconchegante.',value:'boho'},
  {slug:'romantico',label:'Romântico',description:'Corações, flores e composições afetivas.',value:'romântico'},
  {slug:'elegante',label:'Elegante',description:'Tipografia refinada e composição equilibrada.',value:'elegante'},
  {slug:'rustico',label:'Rústico',description:'Texturas naturais, madeira e tons terrosos.',value:'rústico'},
  {slug:'clean',label:'Clean',description:'Visual leve, organizado e contemporâneo.',value:'clean'},
];

export const inspirationInvestmentCollections=[
  {slug:'essencial',label:'Essencial',tier:'Essencial' as const,description:'Para começar com peças-chave e uma composição mais econômica.'},
  {slug:'intermediario',label:'Intermediário',tier:'Intermediário' as const,description:'Mais elementos e variedade, equilibrando impacto e investimento.'},
  {slug:'premium',label:'Premium',tier:'Premium' as const,description:'Mais camadas, acabamentos e peças de destaque para a mesa.'},
];

export const featuredInspirationCodes=['INSP-001','INSP-006','INSP-016','INSP-021','INSP-026','INSP-031','INSP-065','INSP-074','INSP-091','INSP-099','INSP-105','INSP-114'];

function normalize(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();}
function budgetTiers(budget:string){const b=normalize(budget);if(!b||b.includes('orientacao'))return [] as InspirationModel['tier'][];if(b.includes('ate r$ 150'))return ['Essencial'];if(b.includes('150')&&b.includes('300'))return ['Essencial','Intermediário'];if(b.includes('300')&&b.includes('500'))return ['Intermediário','Premium'];if(b.includes('500')||b.includes('acima'))return ['Premium'];return [] as InspirationModel['tier'][];}

export function inspirationSearchText(model:InspirationModel){return normalize([model.code,model.title,model.group,model.category,model.occasion,model.style,model.tier,...model.tags].join(' '));}

export function recommendInspirations(input:{theme?:string;occasion?:string;budget?:string;categories?:string[]},limit=6){
  const theme=normalize(input.theme||'');const occasion=normalize(input.occasion||'');const categories=(input.categories||[]).map(normalize).filter(Boolean);const tiers=budgetTiers(input.budget||'');
  const ranked=inspirationModels.map((model,index)=>{const hay=inspirationSearchText(model);let score=0;if(theme){for(const token of theme.split(/\s+/).filter(Boolean)){if(hay.includes(token))score+=4;}}if(occasion){for(const token of occasion.split(/\s+/).filter(token=>token.length>2)){if(hay.includes(token))score+=3;}}if(categories.length){for(const category of categories){const words=category.split(/\s+/).filter(token=>token.length>2);if(words.some(word=>hay.includes(word)))score+=3;}}if(tiers.includes(model.tier))score+=2;return {model,score,index};});
  const anySignal=Boolean(theme||occasion||categories.length||tiers.length);return ranked.sort((a,b)=>b.score-a.score||a.index-b.index).filter(item=>!anySignal||item.score>0).slice(0,Math.max(1,limit)).map(item=>item.model);
}


export function getInspirationByCode(code:string){
  const normalized=String(code||'').trim().toUpperCase();
  return inspirationModels.find(model=>model.code===normalized)||null;
}

export function getRelatedInspirations(model:InspirationModel,limit=4){
  const sourceTags=new Set(model.tags.map(normalize));
  return inspirationModels
    .filter(candidate=>candidate.code!==model.code)
    .map((candidate,index)=>{
      let score=0;
      if(candidate.group===model.group)score+=6;
      if(normalize(candidate.occasion)===normalize(model.occasion))score+=5;
      if(normalize(candidate.style)===normalize(model.style))score+=4;
      if(candidate.palette===model.palette)score+=3;
      if(candidate.tier===model.tier)score+=1;
      for(const tag of candidate.tags.map(normalize)){if(sourceTags.has(tag))score+=2;}
      return {candidate,score,index};
    })
    .sort((a,b)=>b.score-a.score||a.index-b.index)
    .slice(0,Math.max(1,limit))
    .map(row=>row.candidate);
}
