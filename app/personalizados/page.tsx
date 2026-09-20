import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Box, Gift, KeyRound, Layers3, PackageOpen, Sparkles, Sticker, Tags } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';

export const metadata:Metadata={
  title:'Papelaria & Personalizados | Merlin Encantos em Papel',
  description:'Conheça as linhas de papelaria personalizada da Merlin: caixinhas, lembrancinhas, adesivos, chaveiros, itens para doces, kits e outros personalizados sob encomenda.'
};

const lines=[
  {
    id:'caixinhas',
    icon:Box,
    eyebrow:'FESTA PERSONALIZADA',
    title:'Caixinhas',
    copy:'Caixinhas para doces, lembranças e pequenos presentes, personalizadas com tema, nome, idade e paleta do evento.',
    items:['Milk','Bala','Pirâmide','Sushi','Modelos especiais'],
    cta:'Quero orçamento de caixinhas',
    href:'/monte-seu-pedido?produto=caixinhas'
  },
  {
    id:'lembrancinhas',
    icon:Gift,
    eyebrow:'PARA PRESENTEAR',
    title:'Lembrancinhas',
    copy:'Peças personalizadas para entregar aos convidados e marcar a comemoração com identidade visual própria.',
    items:['Mimos personalizados','Embalagens','Tags','Kits lembrança'],
    cta:'Quero orçamento de lembrancinhas',
    href:'/monte-seu-pedido?produto=lembrancinhas'
  },
  {
    id:'adesivos-chaveiros',
    icon:KeyRound,
    eyebrow:'PERSONALIZAÇÃO',
    title:'Adesivos & Chaveiros',
    copy:'Personalização para lembranças, presentes e pequenos itens, com aplicação de nome, foto, tema ou identidade visual.',
    items:['Adesivos','Chaveiros','Frente e verso','Formatos especiais'],
    cta:'Quero orçamento de adesivos ou chaveiros',
    href:'/monte-seu-pedido?produto=chaveiros'
  },
  {
    id:'doces',
    icon:Sticker,
    eyebrow:'DETALHES DA MESA',
    title:'Doces & Complementos',
    copy:'Peças que levam o tema para brigadeiros, cupcakes e outros doces sem confundir com serviço de confeitaria ou decoração completa.',
    items:['Toppers','Wrappers','Tags','Plaquinhas'],
    cta:'Quero orçamento para doces',
    href:'/monte-seu-pedido?produto=doces'
  },
  {
    id:'kits',
    icon:PackageOpen,
    eyebrow:'CONJUNTO PERSONALIZADO',
    title:'Kits Personalizados',
    copy:'Combinações de diferentes peças seguindo a mesma identidade visual para deixar o pedido mais completo e coerente.',
    items:['Topo + caixinhas','Lembrancinhas','Tags','Complementos'],
    cta:'Quero montar um kit',
    href:'/monte-seu-pedido?produto=kit'
  },
  {
    id:'outros',
    icon:Sparkles,
    eyebrow:'IDEIA DIFERENTE',
    title:'Outros Personalizados',
    copy:'Se você tem uma referência ou ideia que não aparece nas categorias, pode enviar e pedir avaliação para produção personalizada.',
    items:['Projetos sob consulta','Referências próprias','Adaptações de tema'],
    cta:'Contar minha ideia',
    href:'/monte-seu-pedido?produto=outro'
  }
];

export default async function PersonalizadosPage(){
  const settings=await getSiteSettings();

  return <main className="premium-site public-v712 v8-personalizados-page">
    <Header settings={settings}/>

    <section className="v8-personalizados-hero">
      <div className="container">
        <div className="v8-personalizados-hero-copy">
          <span className="eyebrow"><Sparkles size={14}/> PAPELARIA PERSONALIZADA</span>
          <h1>Mais do que topos.<br/><em>Detalhes para completar o seu momento.</em></h1>
          <p>Escolha o tipo de produto e depois personalize tema, nome, idade, cores e quantidade. Cada peça é feita sob encomenda e o orçamento é confirmado antes da produção.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-luxury" href="/monte-seu-pedido">Montar meu pedido <ArrowUpRight size={16}/></Link>
            <Link className="btn btn-ghost" href="/inspiracoes">Ver inspirações <Sparkles size={16}/></Link>
          </div>
        </div>
        <aside className="v8-personalizados-promise" aria-label="O que você encontra aqui">
          <strong>O foco é o produto.</strong>
          <p>As imagens e referências do site servem para mostrar estilo, acabamento e composição do item personalizado.</p>
          <div>
            <span><Layers3 size={15}/> Feito sob encomenda</span>
            <span><Tags size={15}/> Tema e dados personalizáveis</span>
            <span><Gift size={15}/> Produto pensado para o seu evento</span>
          </div>
        </aside>
      </div>
    </section>

    <section className="v8-personalizados-grid-section" id="produtos">
      <div className="container">
        <div className="v8-personalizados-section-head">
          <div>
            <span className="eyebrow"><i/> ESCOLHA POR PRODUTO</span>
            <h2>O que podemos<br/><em>criar para você.</em></h2>
          </div>
          <p>Você não precisa conhecer o nome técnico de tudo. Escolha a categoria mais próxima do que imagina e explique os detalhes no orçamento.</p>
        </div>

        <div className="v8-personalizados-grid">
          {lines.map(line=>{
            const Icon=line.icon;
            return <article className="v8-personalizado-card" id={line.id} key={line.id}>
              <div className="v8-personalizado-card-icon"><Icon size={24}/></div>
              <small>{line.eyebrow}</small>
              <h3>{line.title}</h3>
              <p>{line.copy}</p>
              <div className="v8-personalizado-tags">{line.items.map(item=><span key={item}>{item}</span>)}</div>
              <Link href={line.href}>{line.cta} <ArrowUpRight size={15}/></Link>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section className="v8-scope-section">
      <div className="container">
        <div className="v8-scope-card">
          <div>
            <span className="eyebrow"><i/> TRANSPARÊNCIA NO PEDIDO</span>
            <h2>Você compra o personalizado.<br/><em>Não o cenário inteiro da foto.</em></h2>
          </div>
          <div className="v8-scope-columns">
            <article>
              <strong>O que pode estar incluso</strong>
              <ul>
                <li>Peça de papelaria personalizada</li>
                <li>Arte adaptada ao tema e aos dados do pedido</li>
                <li>Acabamentos combinados no orçamento</li>
                <li>Quantidade aprovada antes da produção</li>
              </ul>
            </article>
            <article>
              <strong>O que não está incluso por padrão</strong>
              <ul>
                <li>Bolo, doces ou alimentos</li>
                <li>Balões, painel e decoração do ambiente</li>
                <li>Móveis, mesa posta e flores de cenário</li>
                <li>Itens que não estejam descritos no orçamento</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section className="v8-personalizados-steps">
      <div className="container">
        <div className="v8-personalizados-section-head">
          <div><span className="eyebrow"><i/> COMO PEDIR</span><h2>Simples para você.<br/><em>Organizado para produzir.</em></h2></div>
          <p>Uma referência já é suficiente para começar. Depois confirmamos os detalhes do produto, quantidade, acabamento, prazo e valor.</p>
        </div>
        <div className="v8-personalizados-step-grid">
          <article><b>01</b><strong>Escolha o produto</strong><p>Caixinha, lembrancinha, chaveiro, complemento ou outro personalizado.</p></article>
          <article><b>02</b><strong>Envie tema e referências</strong><p>Nome, idade, cores, fotos ou exemplos ajudam a direcionar a criação.</p></article>
          <article><b>03</b><strong>Confirme o orçamento</strong><p>Quantidade, materiais, prazo e acabamento são definidos antes da produção.</p></article>
        </div>
        <div className="v8-personalizados-final-cta">
          <div><small>PRONTO PARA COMEÇAR?</small><strong>Conte o que você quer personalizar.</strong></div>
          <Link className="btn btn-primary btn-luxury" href="/monte-seu-pedido">Montar meu pedido <ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
