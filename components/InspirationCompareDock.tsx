'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Layers3, Trash2 } from 'lucide-react';
import { inspirationModels } from '@/lib/inspirations';
import { INSPIRATION_COMPARE_EVENT, readInspirationCompare, writeInspirationCompare } from './InspirationCompareButton';

export default function InspirationCompareDock(){
  const [codes,setCodes]=useState<string[]>([]);
  useEffect(()=>{const sync=()=>setCodes(readInspirationCompare());sync();window.addEventListener(INSPIRATION_COMPARE_EVENT,sync);window.addEventListener('storage',sync);return()=>{window.removeEventListener(INSPIRATION_COMPARE_EVENT,sync);window.removeEventListener('storage',sync);};},[]);
  const validCodes=useMemo(()=>codes.filter(code=>inspirationModels.some(model=>model.code===code)),[codes]);
  if(!validCodes.length)return null;
  const ready=validCodes.length>=2;
  return <aside className="inspiration-compare-dock" aria-label="Inspirações selecionadas para comparar"><div><Layers3 size={17}/><span><strong>{validCodes.length}</strong> de 4 selecionadas</span><small>{ready?'Compare estilo, paleta e nível lado a lado.':'Escolha mais uma inspiração para comparar.'}</small></div><div className="inspiration-compare-dock-actions"><button type="button" onClick={()=>writeInspirationCompare([])} aria-label="Limpar comparação"><Trash2 size={15}/><span>Limpar</span></button>{ready?<Link href="/comparar-inspiracoes">Comparar agora <ArrowRight size={15}/></Link>:<a href="#explorar-inspiracoes">Escolher mais uma</a>}</div></aside>;
}
