import { DEFAULT_WHATSAPP_TEMPLATES } from './whatsapp-templates';
import { normalizeExternalHttpsUrl,normalizeSiteOrigin } from './public-url';
export const fallbackSiteSettings = {
  brand_name: process.env.NEXT_PUBLIC_SITE_NAME || 'Merlin Encantos em Papel',
  brand_initial: 'M',
  logo_url: '/merlin-logo.webp',
  hero_image_url: '',
  hero_eyebrow: 'Merlin • Topos de bolo • Feitos sob encomenda',
  hero_title: 'Sua ideia vira um topo feito para o seu bolo.',
  hero_highlight: 'seu bolo',
  hero_description: 'Topos de bolo personalizados, do modelo essencial ao Elite com shaker e acetato, criados sob encomenda para o seu tema.',
  whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  instagram_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  facebook_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  tiktok_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_TIKTOK_URL),
  pinterest_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_PINTEREST_URL),
  youtube_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
  google_business_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL),
  google_review_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL),
  social_default_hashtags: '#topodebolo #topodebolopersonalizado #papelariapersonalizada',
  bio_title: 'Merlin — Topos de bolo personalizados.',
  bio_description: 'Escolha o nível, encontre uma inspiração e monte seu topo personalizado para pedir orçamento pelo WhatsApp.',
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
  about_title: 'Topos criados para combinar com o seu bolo e a sua história.',
  about_text: 'Cada topo começa por uma ideia e ganha forma com composição, recorte, camadas, shaker, acetato e acabamento conforme o nível escolhido.',
  seo_title: `${process.env.NEXT_PUBLIC_SITE_NAME || 'Merlin Encantos em Papel'} | Topos de Bolo Personalizados`,
  seo_description: 'Topos de bolo personalizados sob encomenda, do Essencial ao Elite com shaker e acetato, da Merlin Encantos em Papel.'
};

export const fallbackCategories = [
  'Topos de bolo'
] as const;

export const siteUrl = normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
