import { redirect } from 'next/navigation';

export default function LegacyTopperBuilderPage(){
  redirect('/monte-seu-pedido?produto=topo');
}
