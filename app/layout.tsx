import type { Metadata, Viewport } from 'next';
import './globals.css';
import './premium.css';
import './shell-v681.css';
import './catalog-v676.css';
import PremiumExperience from '@/components/PremiumExperience';
import { QuoteListProvider } from '@/components/QuoteListProvider';
import { CompareProvider } from '@/components/CompareProvider';
import DeferredTelemetry from '@/components/DeferredTelemetry';
import NetworkStatus from '@/components/NetworkStatus';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import AttributionCapture from '@/components/AttributionCapture';
import { getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#fff7f2'};
export async function generateMetadata():Promise<Metadata>{const s=await getSiteSettings();return{metadataBase:siteUrl?new URL(siteUrl):undefined,title:{default:s.seo_title,template:`%s | ${s.brand_name}`},description:s.seo_description,applicationName:s.brand_name,robots:{index:true,follow:true},openGraph:{type:'website',locale:'pt_BR',siteName:s.brand_name,title:s.seo_title,description:s.seo_description,url:siteUrl||undefined,images:s.hero_image_url?[s.hero_image_url]:s.logo_url?[s.logo_url]:undefined},twitter:{card:'summary_large_image',title:s.seo_title,description:s.seo_description},appleWebApp:{capable:true,statusBarStyle:'default',title:s.brand_name},icons:{icon:'/favicon.svg',apple:'/apple-touch-icon.png'}};}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><QuoteListProvider><CompareProvider><PremiumExperience/><ServiceWorkerRegistration/><DeferredTelemetry/><AttributionCapture/><NetworkStatus/><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><div id="conteudo">{children}</div></CompareProvider></QuoteListProvider></body></html>;}
