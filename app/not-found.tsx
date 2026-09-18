import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound(){
  return <main className="public-state-page">
    <section className="public-state-card">
      <span className="public-state-code">404</span>
      <div className="public-kicker"><Sparkles size={14}/> Página não encontrada</div>
      <h1>Esse caminho não existe mais.</h1>
      <p>Você pode voltar ao início, escolher uma inspiração ou continuar direto para montar o seu topo.</p>
      <div className="public-state-actions">
        <Link className="public-primary-button" href="/"><ArrowLeft size={16}/> Voltar ao início</Link>
        <Link className="public-secondary-button" href="/inspiracoes">Ver inspirações</Link>
        <Link className="public-secondary-button" href="/monte-seu-topo">Montar meu topo</Link>
      </div>
    </section>
  </main>;
}
