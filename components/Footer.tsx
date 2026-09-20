import Link from 'next/link';
import { Layers3, Mail, MapPin, Sparkles } from 'lucide-react';
import type { SiteSettings } from '@/lib/db';
import SocialLinks from './SocialLinks';
import SafeImage from './SafeImage';

export default function Footer({settings}:{settings:SiteSettings}){
  return <footer className="footer premium-footer kf-footer public-v712-footer">
    <div className="container premium-footer-top">
      <div className="footer-brand-block"><span className="kf-footer-logo"><SafeImage src={settings.logo_url||'/merlin-logo.webp'} alt=""/></span><div><small className="footer-brand-kicker">PAPELARIA PERSONALIZADA • FEITO SOB ENCOMENDA</small><strong>{settings.brand_name}</strong><p>Topos de bolo personalizados e papelaria sob encomenda, com cores, tema e detalhes adaptados para cada comemoração.</p><SocialLinks settings={settings} className="footer-social-links"/></div></div>
      <div className="footer-contact-grid">
        <div><small>ATELIÊ</small><span><MapPin size={14}/>{settings.location}</span></div>
        <div><small>PRODUTOS</small><Link href="/catalogo"><Layers3 size={14}/> Topos de bolo</Link><Link href="/personalizados"><Sparkles size={14}/> Papelaria & personalizados</Link></div>
        <div><small>COMECE AQUI</small><Link href="/inspiracoes"><Sparkles size={14}/> Ver inspirações</Link><Link href="/monte-seu-topo"><Layers3 size={14}/> Montar meu topo</Link></div>
        {settings.contact_email&&<div><small>E-MAIL</small><a href={`mailto:${settings.contact_email}`}><Mail size={14}/>{settings.contact_email}</a></div>}
      </div>
    </div>
    <div className="container footer-grid"><div><span>© {new Date().getFullYear()} {settings.brand_name}. Todos os direitos reservados.</span></div><div className="footer-links"><Link href="/catalogo">Topos</Link><Link href="/personalizados">Personalizados</Link><Link href="/inspiracoes">Inspirações</Link><Link href="/#como-pedir">Como funciona</Link><Link href="/monte-seu-topo">Monte seu topo</Link><Link href="/guia-de-precos">Acabamentos</Link><Link href="/orcamento">Orçamento</Link><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos</Link><Link href="/#inicio">Voltar ao topo ↑</Link></div></div>
  </footer>;
}
