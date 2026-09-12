import { DEFAULT_WHATSAPP_TEMPLATES } from './whatsapp-templates';
import { normalizeExternalHttpsUrl,normalizeSiteOrigin } from './public-url';
export const fallbackSiteSettings = {
  brand_name: process.env.NEXT_PUBLIC_SITE_NAME || 'Merlin Encantos em Papel',
  brand_initial: 'M',
  logo_url: '/merlin-logo.webp',
  hero_image_url: '',
  hero_eyebrow: 'Merlin • Encantos em Papel • Feita sob encomenda',
  hero_title: 'Sua ideia vira uma festa com identidade.',
  hero_highlight: 'identidade',
  hero_description: 'Topos, caixas, kits, lembrancinhas e detalhes personalizados para transformar referências, temas e histórias em uma comemoração única.',
  whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  instagram_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  facebook_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  tiktok_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_TIKTOK_URL),
  pinterest_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_PINTEREST_URL),
  youtube_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
  google_business_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL),
  google_review_url: normalizeExternalHttpsUrl(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL),
  social_default_hashtags: '#papelariapersonalizada #festapersonalizada',
  bio_title: 'Merlin — Encantos em Papel para momentos únicos.',
  bio_description: 'Planejar • Personalizar • Encantar. Veja inspirações, monte seu kit e peça seu orçamento pelo WhatsApp.',
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
  about_title: 'Papelaria criada para combinar com a sua história.',
  about_text: 'Cada pedido começa por uma ideia e ganha forma com composição, corte, camadas e acabamento pensados para a sua comemoração.',
  seo_title: `${process.env.NEXT_PUBLIC_SITE_NAME || 'Merlin Encantos em Papel'} | Papelaria Personalizada`,
  seo_description: 'Catálogo de inspirações, topos de bolo, caixas, kits, lembrancinhas e papelaria personalizada da Merlin Encantos em Papel.'
};

export const fallbackCategories = [
  'Topos de bolo',
  'Caixas personalizadas',
  'Lembrancinhas',
  'Kits personalizados',
  'Mesa & festa',
  'Flores & acabamentos'
] as const;

export const siteUrl = normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
