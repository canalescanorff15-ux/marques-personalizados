import type { Metadata } from 'next';
import { ArrowUpRight, Gem, Layers3, PackageOpen, Palette, PartyPopper, Sparkles, Tags, WalletCards } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InspirationExplorer from '@/components/InspirationExplorer';
import { getSiteSettings } from '@/lib/db';
import { inspirationGroups, inspirationInvestmentCollections, inspirationModels, inspirationOccasionCollections, inspirationStyleCollections } from '@/lib/inspirations';
import { inspirationPaletteCollections, inspirationThemeCollections, paletteCount, themeCount } from '@/lib/inspiration-filters';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Inspirações | Merlin Encantos em Papel',description:'Explore modelos de inspiração para topos de bolo, caixas, kits, lembrancinhas e festas personalizadas. Filtre por tema, ocasião, estilo, paleta e nível de composição.'};

function qp(key:string,value:string){return `/inspiracoes?${new URLSearchParams({[key]:value}).toString()}#explorar-inspiracoes`;}

const groupCopy:Record<string,string>={
  'Topos de bolo':'Do simples ao premium, com camadas, acetato, shaker e temas variados.',
  'Caixas personalizadas':'Milk, pirâmide, bala, sushi, maleta, cubo, coração e outros formatos.',
  'Lembranças e detalhes':'Tags, adesivos, displays, forminhas, bandeirolas, wrappers e plaquinhas.',
  'Kits completos':'Combinações prontas por tamanho da festa, ocasião e nível de acabamento.',
  'Infantil':'Temas lúdicos, delicados, aventureiros, coloridos e modernos.',
  'Adulto':'Aniversários, profissões, hobbies e estilos elegantes ou descontraídos.',
  'Celebrações':'15 anos, batizado, chá, formatura, casamento, noivado e bodas.',
  'Datas & presentes':'Datas especiais, lembranças afetivas, escola e opções corporativas.',
};


export default async function InspirationsPage(){
  const settings=await getSiteSettings();
  return <main className="premium-site kf-theme inspiration-page"><Header settings={settings}/>
    <section className="inspiration-page-hero"><div className="container"><div className="eyebrow"><Sparkles size={14}/> Merlin • Encantos em Papel</div><h1>Um catálogo para<br/><em>encontrar seu estilo.</em></h1><p>Use as referências como ponto de partida: escolha uma ideia, misture elementos de modelos diferentes ou envie sua própria referência. Tudo continua sendo produzido sob encomenda e personalizado para a sua festa.</p><div className="inspiration-hero-stats"><span><strong>{inspirationModels.length}</strong> ideias iniciais</span><span><strong>{inspirationGroups.length}</strong> coleções</span><span><strong>{inspirationThemeCollections.length}</strong> temas guiados</span><span><strong>{inspirationStyleCollections.length}</strong> estilos para explorar</span></div><a className="btn btn-primary btn-luxury" href="#explorar-inspiracoes">Explorar catálogo <ArrowUpRight size={16}/></a></div></section>

    <section className="inspiration-discovery product-families"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><PackageOpen size={14}/> Escolha o que quer fazer</div><h2>Comece pela peça.<br/><em>Depois escolha o estilo.</em></h2></div><p>Se você já sabe se quer topo, caixa, kit ou lembrança, este é o caminho mais rápido para chegar às referências certas.</p></div><div className="inspiration-family-grid">{inspirationGroups.map((group,index)=>{const count=inspirationModels.filter(model=>model.group===group).length;return <a href={qp('grupo',group)} key={group}><span>{String(index+1).padStart(2,'0')}</span><div><strong>{group}</strong><small>{groupCopy[group]||'Modelos para personalizar do seu jeito.'}</small></div><b>{count} opções</b><ArrowUpRight size={15}/></a>;})}</div></div></section>

    <section className="inspiration-discovery theme-discovery"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><Tags size={14}/> Comece pelo tema</div><h2>Encontre a ideia.<br/><em>Sem ficar procurando no escuro.</em></h2></div><p>Os temas reúnem referências relacionadas mesmo quando elas estão em produtos ou coleções diferentes. Assim fica mais fácil comparar topo, caixa, kit e lembrança dentro da mesma linguagem.</p></div><div className="inspiration-theme-grid">{inspirationThemeCollections.map(item=><a href={qp('tema',item.slug)} key={item.slug}><span><Tags size={16}/></span><div><strong>{item.label}</strong><small>{item.description}</small></div><b>{themeCount(item.slug)} ideias</b><ArrowUpRight size={15}/></a>)}</div></div></section>

    <section className="inspiration-discovery"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><PartyPopper size={14}/> Comece pela ocasião</div><h2>Escolha a festa.<br/><em>Depois a gente refina.</em></h2></div><p>Esse caminho é ideal para quem ainda não sabe quais peças quer. Você começa pelo evento e vê apenas ideias relacionadas.</p></div><div className="inspiration-collection-grid">{inspirationOccasionCollections.map(item=><a href={qp('ocasiao',item.value)} key={item.slug}><span><PartyPopper size={17}/></span><strong>{item.label}</strong><small>{item.description}</small><ArrowUpRight size={15}/></a>)}</div></div></section>

    <section className="inspiration-discovery alt"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><Gem size={14}/> Escolha pela linguagem visual</div><h2>Do delicado ao impacto.<br/><em>O estilo vem primeiro.</em></h2></div><p>Se você já sabe a sensação que quer passar, filtre pela estética e veja como ela funciona em produtos diferentes.</p></div><div className="inspiration-style-cloud">{inspirationStyleCollections.map(item=><a href={qp('estilo',item.value)} key={item.slug}><strong>{item.label}</strong><span>{item.description}</span></a>)}</div></div></section>

    <section className="inspiration-discovery palette-discovery"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><Palette size={14}/> Escolha pelas cores</div><h2>A paleta também<br/><em>pode guiar a escolha.</em></h2></div><p>Se você já definiu as cores da festa, filtre por uma família visual e veja modelos que combinam melhor com a decoração.</p></div><div className="inspiration-palette-grid">{inspirationPaletteCollections.map(item=><a href={qp('paleta',item.slug)} key={item.slug}><span className={`palette-preview palette-${item.slug}`}/><div><strong>{item.label}</strong><small>{item.description}</small></div><b>{paletteCount(item.slug)} opções</b></a>)}</div></div></section>

    <section className="inspiration-discovery investment"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><WalletCards size={14}/> Nível de composição</div><h2>Mais simples ou mais elaborado.<br/><em>Você escolhe o ponto de partida.</em></h2></div><p>Os níveis não são preços fechados. Eles ajudam a separar ideias enxutas, intermediárias e de maior acabamento antes do orçamento real.</p></div><div className="inspiration-investment-grid">{inspirationInvestmentCollections.map((item,index)=><a href={qp('nivel',item.tier)} key={item.slug}><span>0{index+1}</span><div><strong>{item.label}</strong><p>{item.description}</p></div><Layers3 size={18}/></a>)}</div></div></section>

    <InspirationExplorer whatsapp={settings.whatsapp_number}/>
    <Footer settings={settings}/>
  </main>;
}
