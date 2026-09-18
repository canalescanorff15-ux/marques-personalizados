import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Layers3, MessageCircle, Sparkles } from 'lucide-react';
import { getSiteSettings } from '@/lib/db';
import { normalizeWhatsapp } from '@/lib/links';
import SafeImage from '@/components/SafeImage';
import SocialLinks from '@/components/SocialLinks';
import { topperLevels } from '@/lib/topper-catalog';
import { siteUrl } from '@/lib/config';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Links | Topos de bolo Merlin',description:'Topos de bolo personalizados, inspirações, orçamento e redes sociais.',robots:{index:false,follow:true}};

export default async function LinksPage(){
 const settings=await getSiteSettings();
 const phone=normalizeWhatsapp(settings.whatsapp_number);
 const wa=phone?`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo link da Merlin Encantos em Papel e quero orçamento para um topo de bolo.')}`:'';
 return <main className="bio-page"><section className="bio-shell">
  <div className="bio-brand">{settings.logo_url?<SafeImage src={settings.logo_url} alt={settings.brand_name}/>:<span className="bio-monogram">{settings.brand_initial||'M'}</span>}<div className="eyebrow">TOPOS DE BOLO PERSONALIZADOS</div><h1>{settings.brand_name}</h1><p>Do Simples ao Elite com shaker + acetato. Produção sob encomenda e personalizada para o seu tema.</p><SocialLinks settings={settings} showLabels/></div>
  <div className="bio-actions">{wa&&<a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Pedir orçamento</a>}<Link className="btn" href="/catalogo">Ver topos <ArrowUpRight size={16}/></Link></div>
  <section className="bio-collections"><div className="bio-section-title"><small>LINHA DE TOPOS</small><h2>Escolha o nível</h2></div><div>{topperLevels.map(level=><Link key={level.slug} href={`/catalogo/${level.slug}`}><span><Layers3 size={14}/> {level.code} — {level.name}</span><ArrowUpRight size={14}/></Link>)}</div></section>
  <section className="bio-collections"><div className="bio-section-title"><small>COMECE AQUI</small><h2>Atalhos</h2></div><div><Link href="/inspiracoes"><span><Sparkles size={14}/> Inspirações de temas</span><ArrowUpRight size={14}/></Link><Link href="/monte-seu-topo"><span><Layers3 size={14}/> Monte seu topo</span><ArrowUpRight size={14}/></Link><Link href="/guia-de-precos"><span>Níveis & preços</span><ArrowUpRight size={14}/></Link></div></section>
  <footer className="bio-footer"><span>{settings.brand_name}</span><small>{settings.location}</small>{siteUrl&&<a href={siteUrl}>Site oficial</a>}</footer>
 </section></main>;
}
