import type { Metadata } from 'next';
import { ArrowUpRight, PackageSearch } from 'lucide-react';
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
  const description='Explore topos de bolo, caixas, lembrancinhas, kits e papelaria personalizada. Use os filtros para encontrar a peça ideal para o seu evento.';
  return {title,description,alternates:siteUrl?{canonical:`${siteUrl}/catalogo`}:{},openGraph:{title,description,type:'website',url:siteUrl?`${siteUrl}/catalogo`:undefined}};
}

export default async function CatalogPage(){
  const [settings,categories,catalog,popularTags]=await Promise.all([
    getSiteSettings(),
    getCategories(),
    getPublicCatalogPage({page:1,pageSize:18,sort:'curadoria'}),
    getPublicPopularTags(10),
  ]);
  const collectionLd={
    '@context':'https://schema.org','@type':'CollectionPage',name:`Catálogo | ${settings.brand_name}`,
    description:'Catálogo completo de papelaria personalizada com peças sob encomenda para festas e celebrações.',
    url:siteUrl?`${siteUrl}/catalogo`:undefined,
    isPartOf:siteUrl?{'@type':'WebSite',name:settings.brand_name,url:siteUrl}:undefined,
  };
  const breadcrumbLd={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Início',item:siteUrl||undefined},
    {'@type':'ListItem',position:2,name:'Catálogo',item:siteUrl?`${siteUrl}/catalogo`:undefined},
  ]};
  return <main className="premium-site category-premium-page">
    <Header settings={settings}/><JsonLd data={collectionLd}/><JsonLd data={breadcrumbLd}/>
    <section className="category-hero"><div className="container category-hero-inner">
      <div className="category-kicker">CATÁLOGO COMPLETO</div>
      <h1>Peças para montar sua festa.</h1>
      <p>Explore os produtos, filtre por coleção, tema, faixa de preço ou disponibilidade e abra cada peça para conferir detalhes e personalização.</p>
      <div className="category-meta"><span><PackageSearch size={16}/>{catalog.total} {catalog.total===1?'peça':'peças'}</span><i/><span>{categories.length} coleções</span><i/><a href="#itens">Explorar catálogo <ArrowUpRight size={15}/></a></div>
      <div className="catalog-page-shortcuts"><Link className="btn btn-primary" href="/inspiracoes">Ver inspirações</Link><Link className="btn" href="/monte-seu-kit">Montar meu kit</Link></div>
    </div></section>
    <section className="category-listing" id="itens"><div className="container"><div className="section-index"><span>01</span><i/><small>PRODUTOS</small></div>
      <CatalogClient products={catalog.items} total={catalog.total} hasMore={catalog.has_more} categories={categories} popularTags={popularTags} whatsapp={settings.whatsapp_number}/>
    </div></section>
    <Footer settings={settings}/>
  </main>;
}
