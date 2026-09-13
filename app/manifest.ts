import type { MetadataRoute } from 'next';
import { getSiteSettings } from '@/lib/db';

export default async function manifest():Promise<MetadataRoute.Manifest>{
  const settings=await getSiteSettings();
  const shortName=(settings.brand_name.split('—')[0]||settings.brand_name).trim().slice(0,18)||'Merlin';
  return {
    id:'/',
    name:settings.brand_name,
    short_name:shortName,
    description:settings.seo_description,
    start_url:'/',
    scope:'/',
    display:'standalone',
    background_color:'#fff7f2',
    theme_color:'#fff7f2',
    lang:'pt-BR',
    categories:['shopping','lifestyle'],
    prefer_related_applications:false,
    icons:[
      {src:'/pwa-icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},
      {src:'/pwa-icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'},
      {src:'/pwa-maskable-512.png',sizes:'512x512',type:'image/png',purpose:'maskable'}
    ],
    shortcuts:[
      {name:'Inspirações',short_name:'Inspirações',url:'/inspiracoes',icons:[{src:'/pwa-icon-192.png',sizes:'192x192',type:'image/png'}]},
      {name:'Catálogo',short_name:'Catálogo',url:'/catalogo',icons:[{src:'/pwa-icon-192.png',sizes:'192x192',type:'image/png'}]},
      {name:'Pedir orçamento',short_name:'Orçamento',url:'/orcamento',icons:[{src:'/pwa-icon-192.png',sizes:'192x192',type:'image/png'}]}
    ]
  };
}
