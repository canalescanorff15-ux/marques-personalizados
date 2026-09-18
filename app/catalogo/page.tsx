import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatalogClient from '@/components/CatalogClient';
import JsonLd from '@/components/JsonLd';
import { getCategories, getPublicCatalogPage, getPublicPopularTags, getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';

export const dynamic='force-dynamic';

export async function generateMetadata():Promise<Metadata>{
  const settings=await getSiteSettings();
  const title=`Catálogo | ${settings.brand_name}`;
  const description='Explore peças de papelaria personalizada, filtre por coleção, tema, disponibilidade e faixa de preço e abra cada produto para ver detalhes.';
  return{title,description,alternates:siteUrl?{canonical:`${siteUrl}/catalogo`}:{},openGraph:{title,description,type:'website',url:siteUrl?`${siteUrl}/catalogo`:undefined}};
}

export default async function CatalogPage(){
  const [settings,categories,catalog,popularTags]=await Promise.all([
    getSiteSettings(),
    getCategories(),
    getPublicCatalogPage({page:1,pageSize:18,sort:'curadoria'}),
    getPublicPopularTags(10),
  ]);
  const collectionLd={"@context":"https://schema.org","@type":"CollectionPage",name:`Catálogo — ${settings.brand_name}`,description:'Papelaria personalizada organizada por produto, coleção e tema.',url:siteUrl?`${siteUrl}/catalogo`:undefined,isPartOf:siteUrl?{"@type":"WebSite",name:settings.brand_name,url:siteUrl}:undefined};
  const breadcrumbLd={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:'Início',item:siteUrl||undefined},{"@type":"ListItem",position:2,name:'Catálogo',item:siteUrl?`${siteUrl}/catalogo`:undefined}]};
  return <main className="premium-site kf-theme catalog-premium-page"><Header settings={settings}/><JsonLd data={collectionLd}/><JsonLd data={breadcrumbLd}/>
    <section className="category-hero catalog-root-hero"><div className="container category-hero-inner"><Link className="back-link" href="/"><ArrowLeft size={16}/> Voltar ao início</Link><div className="category-kicker">CATÁLOGO COMPLETO</div><h1>Escolha a peça.<br/>Depois personalize.</h1><p>Veja os produtos disponíveis, filtre por coleção, tema, preço e status e abra cada item para conferir composição, prazo e opções de personalização.</p><div className="category-meta"><span>{String(catalog.total).padStart(2,'0')} {catalog.total===1?'peça':'peças'}</span><i/><a href="#itens">Explorar catálogo <ArrowUpRight size={15}/></a></div></div></section>
    <section className="premium-catalog catalog-root-listing" id="itens"><div className="container"><div className="section-index"><span>01</span><i/><small>PRODUTOS</small></div><div className="catalog-head"><div><div className="eyebrow">Peças sob encomenda</div><h2 className="section-title">Encontre o formato.<br/><em>A arte fica com a sua cara.</em></h2></div><p className="muted">Use a busca e os filtros. Você pode abrir um produto, comparar opções ou adicionar peças à sua lista de orçamento.</p></div><CatalogClient products={catalog.items} total={catalog.total} hasMore={catalog.has_more} categories={categories} popularTags={popularTags} whatsapp={settings.whatsapp_number}/></div></section>
    <Footer settings={settings}/></main>;
}
