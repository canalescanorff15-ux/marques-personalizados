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
import './v8-product-focus.css';
import './v8-gallery-minimal.css';
import './v8-final-polish.css';
import './v8-typography-balance.css';
import './v8-catalog-real-photos.css';
import './v821-stabilization.css';
import PremiumExperience from '@/components/PremiumExperience';
import { QuoteListProvider } from '@/components/QuoteListProvider';
import { CompareProvider } from '@/components/CompareProvider';
import DeferredTelemetry from '@/components/DeferredTelemetry';
import NetworkStatus from '@/components/NetworkStatus';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import AttributionCapture from '@/components/AttributionCapture';
import { getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';

const officialLogo='https://merlin-topper-assets.floot.app/_cdn/static/7a6e5cde-d985-43f2-8086-bab7676c0660-merlin-logo-oficial.webp';
const topperDescription='Topos de bolo, marcadores e papelaria personalizada feitos sob encomenda, com criação adaptada ao tema, cores e detalhes de cada pedido.';
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#fffaf8'};

export async function generateMetadata():Promise<Metadata>{
 const s=await getSiteSettings();
 const title='Merlin Encantos em Papel | Personalizados sob encomenda';
 return{
  metadataBase:siteUrl?new URL(siteUrl):undefined,
  title:{default:title,template:'%s | Merlin Encantos em Papel'},
  description:topperDescription,
  applicationName:'Merlin Encantos em Papel',
  robots:{index:true,follow:true},
  openGraph:{type:'website',locale:'pt_BR',siteName:'Merlin Encantos em Papel',title,description:topperDescription,url:siteUrl||undefined,images:[officialLogo]},
  twitter:{card:'summary_large_image',title,description:topperDescription,images:[officialLogo]},
  appleWebApp:{capable:true,statusBarStyle:'default',title:'Merlin Encantos em Papel'},
  icons:{icon:'/favicon.svg',apple:'/apple-touch-icon.png'}
 };
}

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="pt-BR"><body><QuoteListProvider><CompareProvider><PremiumExperience/><ServiceWorkerRegistration/><DeferredTelemetry/><AttributionCapture/><NetworkStatus/><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><div id="conteudo">{children}</div></CompareProvider></QuoteListProvider></body></html>;
}
