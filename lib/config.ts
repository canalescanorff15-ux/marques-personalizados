import { DEFAULT_WHATSAPP_TEMPLATES } from './whatsapp-templates';
import { normalizeExternalHttpsUrl,normalizeSiteOrigin } from './public-url';

const OFFICIAL_LOGO_URL='https://merlin-topper-assets.floot.app/_cdn/static/273a6c2e-69e9-460f-b9ca-fd60d3f2b2e5-merlin-logo-v821.webp';
const CANONICAL_SITE_URL='https://merlin.encantos.workers.dev';

export const fallbackSiteSettings = {
  brand_name: process.env.NEXT_PUBLIC_SITE_NAME || 'Merlin Encantos em Papel',
  brand_initial: 'M',
  logo_url: OFFICIAL_LOGO_URL,
  hero_image_url: '',
  hero_eyebrow: 'Merlin • Topos de bolo • Feitos sob encomenda',
  hero_title: 'Sua ideia vira um topo feito para o seu bolo.',
  hero_highlight: 'seu bolo',
  hero_description: 'Topos de bolo personalizados, do modelo Essencial ao Luxo com movimento e acetato, criados sob encomenda para o seu tema.',
  whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  instagram_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  facebook_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  tiktok_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_TIKTOK_URL),
  pinterest_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_PINTEREST_URL),
  youtube_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
  google_business_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL),
  google_review_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL),
  social_default_hashtags: '#topodebolo #topodebolopersonalizado #papelariapersonalizada',
  bio_title: 'Merlin — papelaria personalizada.',
  bio_description: 'Conheça nossos topos e personalizados, encontre uma inspiração e envie seu pedido pelo WhatsApp.',
  monthly_sales_goal_cents: 0,
  pricing_hourly_rate_cents: 2000,
  pricing_overhead_percent: 10,
  pricing_waste_percent: 10,
  pricing_target_margin_percent: 45,
  pricing_payment_fee_percent: 0,
  ...DEFAULT_WHATSAPP_TEMPLATES,
  location: process.env.NEXT_PUBLIC_LOCATION || 'Santa Inês - MA',
  contact_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  announcement: '',
  announcement_link: '',
  announcement_start_at: '',
  announcement_end_at: '',
  about_title: 'Personalizados criados para combinar com a sua ideia e a sua história.',
  about_text: 'Cada peça começa por uma ideia e ganha forma com composição, impressão, recorte, camadas e acabamento conforme o produto escolhido.',
  seo_title: `${process.env.NEXT_PUBLIC_SITE_NAME || 'Merlin Encantos em Papel'} | Papelaria Personalizada`,
  seo_description: 'Topos de bolo, marcadores, lembrancinhas, adesivos, chaveiros e outros personalizados feitos sob encomenda pela Merlin Encantos em Papel.'
};

export const fallbackCategories = [
  'Topos de bolo'
] as const;

const configuredSiteUrl=normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
export const siteUrl = !configuredSiteUrl||configuredSiteUrl.includes('.canalescanorff15.workers.dev')
  ? CANONICAL_SITE_URL
  : configuredSiteUrl;
