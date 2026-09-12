import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CakeSlice, Check, Gift, Heart, Layers3, MessageCircle, PackageOpen, Palette, Sparkles, Tags } from 'lucide-react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InspirationFavoriteButton from '@/components/InspirationFavoriteButton';
import InspirationShareButton from '@/components/InspirationShareButton';
import InspirationQuickQuote from '@/components/InspirationQuickQuote';
import InspirationCompareButton from '@/components/InspirationCompareButton';
import InspirationCompareDock from '@/components/InspirationCompareDock';
import { InspirationCard } from '@/components/InspirationShowcase';
import { getSiteSettings } from '@/lib/db';
import { getInspirationByCode, getRelatedInspirations, type InspirationModel } from '@/lib/inspirations';
import { inspirationPaletteCollections } from '@/lib/inspiration-filters';
import { whatsappUrl } from '@/lib/links';
import { siteUrl } from '@/lib/config';
import { jsonLd as serializeJsonLd } from '@/lib/seo';

type Props={params:Promise<{code:string}>};

function initials(title:string){return title.split(/\s+/).slice(0,2).map(part=>part[0]).join('').toUpperCase();}
function visualIcon(model:InspirationModel){if(model.group==='Topos de bolo')return <CakeSlice size={46}/>;if(model.group==='Caixas personalizadas')return <PackageOpen size={46}/>;if(model.group==='Lembranças e detalhes')return <Tags size={46}/>;if(model.group==='Kits completos')return <Gift size={46}/>;return <Sparkles size={46}/>;}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {code}=await params;
  const model=getInspirationByCode(code);
  if(!model)return{title:'Inspiração não encontrada'};
  const title=`${model.title} • ${model.code}`;
  const description=`Inspiração ${model.code} da Merlin Encantos em Papel: ${model.description} Personalize tema, cores e detalhes para o seu evento.`;
  const canonical=siteUrl?`${siteUrl}/inspiracoes/${model.code}`:undefined;
  return{title,description,alternates:canonical?{canonical}:{},openGraph:{title,description,type:'website',url:canonical},twitter:{card:'summary',title,description}};
}

export const dynamic='force-dynamic';

export default async function InspirationDetailPage({params}:Props){
  const {code}=await params;
  const model=getInspirationByCode(code);
  if(!model)return notFound();
  const settings=await getSiteSettings();
  const related=getRelatedInspirations(model,4);
  const palette=inspirationPaletteCollections.find(item=>item.slug===model.palette);
  const wa=whatsappUrl(settings.whatsapp_number,`Olá! Quero um orçamento usando como referência a inspiração ${model.code} — ${model.title}, do catálogo Merlin Encantos em Papel.\n\nCategoria: ${model.category}\nEstilo: ${model.style}\nPaleta de referência: ${palette?.label||model.palette}\nNível de composição: ${model.tier}\n\nQuero adaptar essa ideia ao meu tema, cores, nome/idade e às peças da minha festa.`);
  const canonical=siteUrl?`${siteUrl}/inspiracoes/${model.code}`:undefined;
  const creativeWork={"@context":"https://schema.org","@type":"CreativeWork",name:model.title,identifier:model.code,description:model.description,url:canonical,creator:{"@type":"Organization",name:settings.brand_name}};
  const breadcrumbs={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:'Início',item:siteUrl||undefined},{"@type":"ListItem",position:2,name:'Inspirações',item:siteUrl?`${siteUrl}/inspiracoes`:undefined},{"@type":"ListItem",position:3,name:model.title,item:canonical}]};
  return <main className="premium-site kf-theme inspiration-detail-page"><Header settings={settings}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd(creativeWork)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd(breadcrumbs)}}/>
    <section className="inspiration-detail-hero"><div className="container"><Link className="back-link inspiration-detail-back" href="/inspiracoes"><ArrowLeft size={16}/> Voltar às inspirações</Link><div className="inspiration-detail-grid">
      <div className={`inspiration-detail-art palette-${model.palette}`}><span className="inspiration-orbit orbit-one"/><span className="inspiration-orbit orbit-two"/><span className="inspiration-petal petal-one"/><span className="inspiration-petal petal-two"/><span className="inspiration-detail-kind">{visualIcon(model)}</span><span className="inspiration-detail-monogram">{initials(model.title)}</span><small>{model.code}</small><InspirationFavoriteButton code={model.code}/></div>
      <div className="inspiration-detail-copy"><div className="eyebrow"><Sparkles size={14}/> Modelo de inspiração • sob encomenda</div><div className="inspiration-detail-title-row"><div><span>{model.code}</span><h1>{model.title}</h1></div><InspirationFavoriteButton code={model.code}/></div><p className="inspiration-detail-description">{model.description}</p>
        <div className="inspiration-detail-facts"><span><b>Peça / coleção</b>{model.category}</span><span><b>Ocasião</b>{model.occasion}</span><span><b>Estilo</b>{model.style}</span><span><b>Nível</b>{model.tier}</span><span><b>Paleta</b>{palette?.label||model.palette}</span></div>
        <div className="inspiration-detail-tags">{model.tags.map(tag=><Link key={tag} href={`/inspiracoes?busca=${encodeURIComponent(tag)}#explorar-inspiracoes`}>{tag}</Link>)}</div>
        <div className="inspiration-detail-actions"><a className="btn btn-primary btn-luxury" href="#orcamento-rapido"><MessageCircle size={17}/> Quero orçamento desse estilo</a><Link className="btn" href={`/monte-seu-kit?inspiracao=${encodeURIComponent(model.code)}`}><Layers3 size={17}/> Adicionar ao meu kit</Link>{wa&&<a className="btn" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Tirar dúvida no WhatsApp</a>}<InspirationCompareButton code={model.code}/><InspirationShareButton title={model.title} code={model.code}/></div>
      </div>
    </div></div></section>

    <section className="inspiration-detail-guidance"><div className="container"><div className="inspiration-detail-guidance-head"><div><div className="eyebrow"><Palette size={14}/> Transforme a referência em algo seu</div><h2>Você escolhe a direção.<br/><em>A Merlin personaliza.</em></h2></div><p>Este modelo é um ponto de partida visual. Ele pode orientar a composição sem obrigar você a copiar todos os elementos.</p></div><div className="inspiration-detail-steps"><article><span>01</span><Check size={17}/><strong>Tema e cores</strong><p>Troque a paleta, personagens, flores, símbolos ou elementos para combinar com a festa.</p></article><article><span>02</span><Heart size={17}/><strong>Nome e ocasião</strong><p>Personalize nome, idade, frase, data ou homenagem conforme o evento.</p></article><article><span>03</span><Layers3 size={17}/><strong>Peças e acabamento</strong><p>Use a mesma linguagem em topo, caixas, tags, displays, lembranças ou um kit completo.</p></article></div></div></section>

    <section className="inspiration-quick-wrap"><div className="container"><InspirationQuickQuote model={model}/></div></section>

    {related.length>0&&<section className="inspiration-related"><div className="container"><div className="inspiration-related-head"><div><div className="eyebrow"><Sparkles size={14}/> Continue explorando</div><h2>Outras ideias que<br/><em>combinam com esta.</em></h2></div><Link href={`/inspiracoes?grupo=${encodeURIComponent(model.group)}#explorar-inspiracoes`}>Ver coleção {model.group} <ArrowRight size={15}/></Link></div><div className="inspiration-grid">{related.map(item=><InspirationCard model={item} whatsapp={settings.whatsapp_number} key={item.code}/>)}</div></div></section>}
    <InspirationCompareDock/><Footer settings={settings}/>
  </main>;
}
