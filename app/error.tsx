'use client';

import Link from 'next/link';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorPage({reset}:{reset:()=>void}){
  return <main className="public-state-page">
    <section className="public-state-card">
      <span className="public-state-icon"><AlertTriangle size={24}/></span>
      <div className="public-kicker">Não foi possível concluir</div>
      <h1>Esta parte do site não carregou.</h1>
      <p>Seus dados não devem ser considerados enviados enquanto houver este erro. Tente novamente ou retorne para uma área segura do site.</p>
      <div className="public-state-actions">
        <button type="button" className="public-primary-button" onClick={reset}><RotateCcw size={16}/> Tentar novamente</button>
        <Link className="public-secondary-button" href="/">Ir para o início</Link>
        <Link className="public-secondary-button" href="/inspiracoes">Ver inspirações</Link>
      </div>
    </section>
  </main>;
}
