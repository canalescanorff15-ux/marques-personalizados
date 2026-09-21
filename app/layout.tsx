import type { Metadata, Viewport } from 'next';
import './globals.css';
import './premium.css';
import './shell-v681.css';
import './catalog-v676.css';
import './catalog-photo-focus-v692.css';
import './inspiration-v687.css';
import './public-v710.css';
import './public-v712.css';
import './public-v715.css';
import './public-v716.css';
import './public-v717.css';
import './public-v718.css';
import './public-v719.css';
import './public-v721.css';
import './v8-design-system.css';
import './v8-image-policy.css';
import './v8-home.css';
import './v8-inspirations.css';
import './v8-inspiration-detail.css';
import './v8-order-builder.css';
import './v8-clean-ui.css';
import './v8-global-clean.css';
import './v8-storefront-clean.css';
import './v8-sales-minimal.css';
import './v8-home-minimal.css';
import PremiumExperience from '@/components/PremiumExperience';
import { QuoteListProvider } from '@/components/QuoteListProvider';
import { CompareProvider } from '@/components/CompareProvider';
import DeferredTelemetry from '@/components/DeferredTelemetry';
import NetworkStatus from '@/components/NetworkStatus';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import AttributionCapture from '@/components/AttributionCapture';
import { getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';

const topperDescription='Topos de bolo e papelaria personalizada feitos sob encomenda, com criação adaptada ao tema, cores e detalhes de cada comemoração.';
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#fffaf8'};

export async function generateMetadata():Promise<Metadata>{
 const s=await getSiteSettings();
 const title=`${s.brand_name} | Papelaria personalizada e topos de bolo`;
 return{
  metadataBase:siteUrl?new URL(siteUrl):undefined,
  title:{default:title,template:`%s | ${s.brand_name}`},
  description:topperDescription,
  applicationName:s.brand_name,
  robots:{index:true,follow:true},
  openGraph:{type:'website',locale:'pt_BR',siteName:s.brand_name,title,description:topperDescription,url:siteUrl||undefined,images:s.logo_url?[s.logo_url]:undefined},
  twitter:{card:'summary_large_image',title,description:topperDescription},
  appleWebApp:{capable:true,statusBarStyle:'default',title:s.brand_name},
  icons:{icon:'/favicon.svg',apple:'/apple-touch-icon.png'}
 };
}

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="pt-BR"><body><QuoteListProvider><CompareProvider><PremiumExperience/><ServiceWorkerRegistration/><DeferredTelemetry/><AttributionCapture/><NetworkStatus/><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><div id="conteudo">{children}</div></CompareProvider></QuoteListProvider></body></html>;
}
