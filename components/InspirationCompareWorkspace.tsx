'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Heart, Layers3, PackagePlus, Sparkles, Trash2, X } from 'lucide-react';
import { inspirationModels, type InspirationModel } from '@/lib/inspirations';
import { inspirationPaletteCollections } from '@/lib/inspiration-filters';
import InspirationArtwork from './InspirationArtwork';
import { INSPIRATION_COMPARE_EVENT, readInspirationCompare, writeInspirationCompare } from './InspirationCompareButton';

function paletteLabel(model:InspirationModel){return inspirationPaletteCollections.find(item=>item.slug===model.palette)?.label||model.palette;}
function distinct(models:InspirationModel[],read:(model:InspirationModel)=>string){return new Set(models.map(read)).size>1;}

export default function InspirationCompareWorkspace(){
  const [codes,setCodes]=useState<string[]>([]);
  useEffect(()=>{const sync=()=>setCodes(readInspirationCompare());sync();window.addEventListener(INSPIRATION_COMPARE_EVENT,sync);window.addEventListener('storage',sync);return()=>{window.removeEventListener(INSPIRATION_COMPARE_EVENT,sync);window.removeEventListener('storage',sync);};},[]);
  const models=useMemo(()=>codes.map(code=>inspirationModels.find(model=>model.code===code)).filter((model):model is InspirationModel=>Boolean(model)),[codes]);
  const kitHref=`/monte-seu-kit?inspiracoes=${encodeURIComponent(models.map(model=>model.code).join(','))}`;
  function remove(code:string){writeInspirationCompare(codes.filter(item=>item!==code));}
  if(models.length<2)return <section className="inspiration-compare-empty"><div className="container"><Layers3 size={34}/><div><span>COMPARADOR DE INSPIRAÇÕES</span><h1>Escolha pelo menos<br/><em>duas ideias.</em></h1><p>Abra o catálogo e toque em “Comparar” nos modelos que quiser analisar lado a lado. Você pode selecionar até quatro inspirações.</p></div><Link className="btn btn-primary btn-luxury" href="/inspiracoes#explorar-inspiracoes">Escolher inspirações <ArrowRight size={16}/></Link></div></section>;
  const rows=[
    {label:'Peça / coleção',read:(model:InspirationModel)=>model.category},
    {label:'Ocasião',read:(model:InspirationModel)=>model.occasion},
    {label:'Estilo',read:(model:InspirationModel)=>model.style},
    {label:'Nível de composição',read:(model:InspirationModel)=>model.tier},
    {label:'Paleta',read:(model:InspirationModel)=>paletteLabel(model)},
  ];
  return <>
    <section className="inspiration-compare-hero"><div className="container"><Link href="/inspiracoes#explorar-inspiracoes" className="back-link"><ArrowLeft size={16}/> Voltar ao catálogo</Link><div className="inspiration-compare-hero-grid"><div><div className="eyebrow"><Layers3 size={14}/> Comparador Merlin</div><h1>Veja as diferenças.<br/><em>Combine o que gostar.</em></h1></div><div><p>Esta comparação é visual e conceitual: ajuda a escolher estilo, paleta, ocasião e nível de composição. O orçamento real depende das peças, quantidades e acabamentos escolhidos.</p><div className="inspiration-compare-top-actions"><Link className="btn btn-primary btn-luxury" href={kitHref}><PackagePlus size={16}/> Montar kit com estas ideias</Link><Link className="btn" href="/meu-projeto"><Heart size={15}/> Meu projeto</Link><button type="button" className="btn" onClick={()=>writeInspirationCompare([])}><Trash2 size={15}/> Limpar seleção</button></div></div></div></div></section>

    <section className="inspiration-compare-workspace"><div className="container"><div className={`inspiration-compare-models count-${models.length}`}>{models.map(model=><article key={model.code} className="inspiration-compare-model"><button type="button" className="inspiration-compare-remove" onClick={()=>remove(model.code)} aria-label={`Remover ${model.title} da comparação`}><X size={15}/></button><div className={`inspiration-compare-art palette-${model.palette}`}><InspirationArtwork model={model}/><small>{model.code}</small></div><div className="inspiration-compare-model-copy"><small>{model.category}</small><h2>{model.title}</h2><p>{model.description}</p><div>{model.tags.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div><Link href={`/inspiracoes/${encodeURIComponent(model.code)}`}>Abrir ficha <ArrowRight size={14}/></Link></div></article>)}</div>

      <div className="inspiration-compare-table-wrap"><div className="inspiration-compare-table-heading"><div><Sparkles size={15}/><span>Comparação objetiva</span></div><p>Campos destacados indicam onde os modelos seguem direções diferentes.</p></div><div className="inspiration-compare-table" role="table" aria-label="Comparação das inspirações" style={{'--inspiration-compare-count':models.length} as CSSProperties}><div className="compare-row compare-head" role="row"><span role="columnheader">Característica</span>{models.map(model=><strong role="columnheader" key={model.code}>{model.code}</strong>)}</div>{rows.map(row=>{const changed=distinct(models,row.read);return <div className={`compare-row${changed?' is-different':''}`} role="row" key={row.label}><span role="rowheader">{row.label}</span>{models.map(model=><div role="cell" key={model.code}>{row.read(model)}</div>)}</div>;})}<div className="compare-row compare-tags-row" role="row"><span role="rowheader">Elementos / tags</span>{models.map(model=><div role="cell" key={model.code}>{model.tags.slice(0,5).join(' • ')}</div>)}</div></div></div>

      <div className="inspiration-compare-next"><div><span>PRÓXIMO PASSO</span><h2>Gostou de partes diferentes?<br/><em>Você não precisa escolher só uma.</em></h2><p>Leve todas as referências selecionadas para o Monte seu Kit. A Merlin pode combinar a paleta de uma, o estilo de outra e os tipos de peça que fizerem sentido para a sua festa.</p></div><div className="inspiration-compare-next-actions"><Link className="btn btn-primary btn-luxury" href={kitHref}><PackagePlus size={17}/> Usar {models.length} referências no meu kit</Link><Link className="btn" href="/meu-projeto"><Heart size={16}/> Revisar no Meu projeto</Link></div></div>
    </div></section>
  </>;
}
