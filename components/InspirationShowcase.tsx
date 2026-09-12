import Link from 'next/link';
import { ArrowUpRight, CakeSlice, Gem, Gift, MessageCircle, PackageOpen, PartyPopper, Sparkles, Tags, WalletCards } from 'lucide-react';
import { featuredInspirationCodes, inspirationInvestmentCollections, inspirationModels, inspirationOccasionCollections, inspirationStyleCollections, type InspirationModel } from '@/lib/inspirations';
import { whatsappUrl } from '@/lib/links';
import { inspirationThemeCollections } from '@/lib/inspiration-filters';
import InspirationFavoriteButton from './InspirationFavoriteButton';
import InspirationCompareButton from './InspirationCompareButton';

function initials(title:string){return title.split(/\s+/).slice(0,2).map(part=>part[0]).join('').toUpperCase();}
function queryLink(key:string,value:string){return `/inspiracoes?${new URLSearchParams({[key]:value}).toString()}#explorar-inspiracoes`;}
function visualIcon(model:InspirationModel){if(model.group==='Topos de bolo')return <CakeSlice size={27}/>;if(model.group==='Caixas personalizadas')return <PackageOpen size={27}/>;if(model.group==='Lembranças e detalhes')return <Tags size={27}/>;if(model.group==='Kits completos')return <Gift size={27}/>;return <Sparkles size={27}/>;}

export function InspirationCard({model,whatsapp}:{model:InspirationModel;whatsapp:string}){
  const wa=whatsappUrl(whatsapp,`Olá! Vi o modelo de inspiração ${model.code} — ${model.title} no catálogo da Merlin Encantos em Papel. Quero fazer algo nesse estilo e gostaria de um orçamento.`);
  return <article className="inspiration-card" data-reveal>
    <div className={`inspiration-art palette-${model.palette}`}>
      <span className="inspiration-orbit orbit-one"/><span className="inspiration-orbit orbit-two"/><span className="inspiration-petal petal-one"/><span className="inspiration-petal petal-two"/>
      <span className="inspiration-kind">{visualIcon(model)}</span><span className="inspiration-monogram">{initials(model.title)}</span><small>{model.code}</small><InspirationFavoriteButton code={model.code}/>
    </div>
    <div className="inspiration-card-copy">
      <div className="inspiration-meta"><span>{model.category}</span><span>{model.tier}</span></div>
      <h3>{model.title}</h3><p>{model.description}</p>
      <div className="inspiration-tags">{model.tags.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div>
      <div className="inspiration-actions">{wa&&<a href={wa} target="_blank" rel="noreferrer"><MessageCircle size={15}/> Quero nesse estilo</a>}<Link href={`/inspiracoes/${encodeURIComponent(model.code)}`}>Ver detalhes <ArrowUpRight size={14}/></Link><InspirationCompareButton code={model.code} compact/></div>
    </div>
  </article>;
}

export default function InspirationShowcase({whatsapp,limit=12,compact=false}:{whatsapp:string;limit?:number;compact?:boolean}){
  const featured=featuredInspirationCodes.map(code=>inspirationModels.find(model=>model.code===code)).filter((model):model is InspirationModel=>Boolean(model));
  const models=featured.slice(0,Math.max(1,limit));
  return <section className={`inspiration-showcase ${compact?'is-compact':''}`} id="inspiracoes"><div className="container"><div className="section-index" data-reveal><span>01</span><i/><small>INSPIRAÇÕES</small></div><div className="inspiration-head" data-reveal><div><div className="eyebrow"><Sparkles size={14}/> Catálogo de ideias</div><h2 className="section-title">Comece por uma ideia.<br/><em>Personalize do seu jeito.</em></h2></div><div><p>Modelos conceituais para ajudar você a escolher estilo, composição e nível de acabamento. Nome, idade, cores, tema e detalhes podem ser adaptados ao seu evento.</p><span className="inspiration-disclaimer">Modelo de inspiração • produção sob encomenda</span></div></div>
    <div className="inspiration-grid">{models.map(model=><InspirationCard model={model} whatsapp={whatsapp} key={model.code}/>)}</div>
    <div className="home-discovery-rails" data-reveal><div><span><Tags size={15}/> Por tema</span><nav>{inspirationThemeCollections.slice(0,6).map(item=><Link key={item.slug} href={queryLink('tema',item.slug)}>{item.label}</Link>)}</nav></div><div><span><PartyPopper size={15}/> Por ocasião</span><nav>{inspirationOccasionCollections.slice(0,6).map(item=><Link key={item.slug} href={queryLink('ocasiao',item.value)}>{item.label}</Link>)}</nav></div><div><span><Gem size={15}/> Por estilo</span><nav>{inspirationStyleCollections.slice(0,6).map(item=><Link key={item.slug} href={queryLink('estilo',item.value)}>{item.label}</Link>)}</nav></div><div><span><WalletCards size={15}/> Por nível</span><nav>{inspirationInvestmentCollections.map(item=><Link key={item.slug} href={queryLink('nivel',item.tier)}>{item.label}</Link>)}</nav></div></div>
    <div className="inspiration-more" data-reveal><div><strong>{inspirationModels.length} ideias organizadas</strong><span>Topos, caixas, kits, lembranças, infantil, adulto e celebrações — agora com filtros por tema, ocasião, estilo, paleta e nível.</span></div><Link className="btn btn-primary btn-luxury" href="/inspiracoes">Explorar catálogo completo <ArrowUpRight size={16}/></Link></div></div></section>;
}
