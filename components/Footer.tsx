import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import type { SiteSettings } from '@/lib/db';
import SocialLinks from './SocialLinks';
import SafeImage from './SafeImage';

export default function Footer({settings}:{settings:SiteSettings}){
  return <footer className="footer premium-footer kf-footer public-v712-footer v8-simple-footer">
    <div className="container v8-simple-footer-main">
      <div className="v8-simple-footer-brand">
        <span className="kf-footer-logo"><SafeImage src={settings.logo_url||'/merlin-logo.webp'} alt=""/></span>
        <div>
          <small>PAPELARIA PERSONALIZADA</small>
          <strong>{settings.brand_name}</strong>
          <p>Topos de bolo personalizados e papelaria sob encomenda.</p>
        </div>
      </div>

      <nav className="v8-simple-footer-nav" aria-label="Links do rodapé">
        <Link href="/catalogo">Topos</Link>
        <Link href="/personalizados">Personalizados</Link>
        <Link href="/inspiracoes">Inspirações</Link>
        <Link href="/monte-seu-pedido">Monte seu Pedido</Link>
      </nav>

      <div className="v8-simple-footer-contact">
        {settings.location&&<span><MapPin size={14}/>{settings.location}</span>}
        {settings.contact_email&&<a href={`mailto:${settings.contact_email}`}><Mail size={14}/>{settings.contact_email}</a>}
        <SocialLinks settings={settings} className="footer-social-links"/>
      </div>
    </div>

    <div className="container v8-simple-footer-bottom">
      <span>© {new Date().getFullYear()} {settings.brand_name}.</span>
      <div><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos</Link></div>
    </div>
  </footer>;
}
