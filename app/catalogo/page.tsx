import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatalogClient from '@/components/CatalogClient';
import { getCategories, getPublicCatalogPage, getPublicPopularTags, getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';
import { jsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Catálogo completo | Merlin — Encantos em Papel',
  description: 'Explore o catálogo completo da Merlin Encantos em Papel, compare peças, veja preços iniciais e monte sua seleção para orçamento.',
};

export default async function CatalogPage() {
  const [catalog, categories, popularTags, settings] = await Promise.all([
    getPublicCatalogPage({ page: 1, pageSize: 18, sort: 'curadoria' }),
    getCategories(),
    getPublicPopularTags(8),
    getSiteSettings(),
  ]);

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Catálogo completo',
    description: 'Catálogo de papelaria personalizada da Merlin Encantos em Papel.',
    url: siteUrl ? `${siteUrl}/catalogo` : undefined,
    isPartOf: siteUrl ? { '@type': 'WebSite', name: settings.brand_name, url: siteUrl } : undefined,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl || undefined },
      { '@type': 'ListItem', position: 2, name: 'Catálogo', item: siteUrl ? `${siteUrl}/catalogo` : undefined },
    ],
  };

  return (
    <main className="premium-site catalog-premium-page">
      <Header settings={settings} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />

      <section className="category-hero">
        <div className="container category-hero-inner">
          <Link className="back-link" href="/">
            <ArrowLeft size={16} /> Voltar ao início
          </Link>
          <div className="category-kicker">CATÁLOGO MERLIN</div>
          <h1>Encontre a peça certa para sua comemoração.</h1>
          <p>
            Explore todos os produtos, filtre por categoria, tema e faixa de preço e adicione suas escolhas à lista de orçamento.
          </p>
          <div className="category-meta">
            <span>{String(catalog.total).padStart(2, '0')} {catalog.total === 1 ? 'peça' : 'peças'}</span>
            <i />
            <a href="#itens">Explorar catálogo <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="catalog-section premium-catalog" id="itens">
        <div className="container">
          <div className="section-index">
            <span>01</span><i /><small>CATÁLOGO COMPLETO</small>
          </div>
          <div className="catalog-head">
            <div>
              <div className="eyebrow">Escolha, compare e personalize</div>
              <h2 className="section-title">Monte sua seleção.<br /><em>Peça tudo de uma vez.</em></h2>
            </div>
            <p className="muted">
              Os valores exibidos são preços iniciais. Quantidade, tamanho, acabamento, camadas e nível de personalização podem alterar o orçamento final.
            </p>
          </div>
          <CatalogClient
            products={catalog.items}
            total={catalog.total}
            hasMore={catalog.has_more}
            categories={categories}
            popularTags={popularTags}
            whatsapp={settings.whatsapp_number}
          />
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}
