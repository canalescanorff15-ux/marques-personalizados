import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';
import { topperLevels } from '@/lib/topper-catalog';
import { topperInspirations } from '@/lib/topper-inspirations';

export default function sitemap():MetadataRoute.Sitemap{
 if(!siteUrl)return[];
 const now=new Date();
 return [
  {url:siteUrl,lastModified:now,changeFrequency:'weekly',priority:1},
  {url:`${siteUrl}/catalogo`,lastModified:now,changeFrequency:'weekly',priority:.95},
  ...topperLevels.map(level=>({url:`${siteUrl}/catalogo/${level.slug}`,lastModified:now,changeFrequency:'monthly' as const,priority:.82})),
  {url:`${siteUrl}/inspiracoes`,lastModified:now,changeFrequency:'weekly',priority:.9},
  ...topperInspirations.map(item=>({url:`${siteUrl}/inspiracoes/${encodeURIComponent(item.code)}`,lastModified:now,changeFrequency:'monthly' as const,priority:.76})),
  {url:`${siteUrl}/monte-seu-topo`,lastModified:now,changeFrequency:'weekly',priority:.92},
  {url:`${siteUrl}/guia-de-precos`,lastModified:now,changeFrequency:'weekly',priority:.82},
  {url:`${siteUrl}/privacidade`,lastModified:now,changeFrequency:'yearly',priority:.2},
  {url:`${siteUrl}/termos`,lastModified:now,changeFrequency:'yearly',priority:.2}
 ];
}
