import fs from 'node:fs';

const errors=[];
const inquiry=fs.readFileSync('app/api/inquiries/route.ts','utf8');
const db=fs.readFileSync('lib/db.ts','utf8');
const quote=fs.readFileSync('app/api/quote-list/route.ts','utf8');
const topperDetail=fs.readFileSync('app/catalogo/[slug]/page.tsx','utf8');
const categoryPage=fs.readFileSync('app/categorias/[slug]/page.tsx','utf8');
const themePage=fs.readFileSync('app/temas/[slug]/page.tsx','utf8');
const manifest=fs.readFileSync('app/manifest.ts','utf8');
const layout=fs.readFileSync('app/layout.tsx','utf8');
const registration=fs.readFileSync('components/ServiceWorkerRegistration.tsx','utf8');
const worker=fs.readFileSync('public/sw.js','utf8');
const offline=fs.readFileSync('public/offline.html','utf8');
const nextConfig=fs.readFileSync('next.config.ts','utf8');
const publicCsp=fs.readFileSync('lib/public-csp.ts','utf8');

if(/getProductById\s*\(/.test(inquiry))errors.push('API de orçamento não pode consultar produto administrativo diretamente.');
if(!inquiry.includes('getPublicProductsByIds([productId])'))errors.push('API de orçamento perdeu revalidação pública para IDs quando recebidos.');
if(!inquiry.includes('getPublicProductsByIds(parsed.data.items.map'))errors.push('Lista de orçamento perdeu revalidação pública dos itens.');
if(!db.includes("'(p.publish_at IS NULL OR p.publish_at<=now())'")||!db.includes("'(p.unpublish_at IS NULL OR p.unpublish_at>now())'"))errors.push('boundary público do banco perdeu janela de publicação.');
if(!db.includes('p.active=true')||!db.includes('c.active=true'))errors.push('boundary público do banco perdeu filtro de ativos.');
if(!quote.includes("p.stock_status==='indisponivel'"))errors.push('lista compartilhável precisa continuar removendo item indisponível.');

if(!topperDetail.includes('topperLevelBySlug'))errors.push('rota /catalogo/[slug] precisa servir apenas os níveis de topo.');
if(!topperDetail.includes("redirect('/catalogo')"))errors.push('slug de produto legado precisa redirecionar para o catálogo de topos.');
if(!categoryPage.includes("redirect('/catalogo')"))errors.push('categorias antigas precisam redirecionar para /catalogo.');
if(!themePage.includes("redirect('/inspiracoes')"))errors.push('temas antigos precisam redirecionar para /inspiracoes.');

for(const file of ['public/pwa-icon-192.png','public/pwa-icon-512.png','public/pwa-maskable-512.png','public/apple-touch-icon.png']){
  if(!fs.existsSync(file)||fs.statSync(file).size<1000)errors.push(`PWA: ${file} ausente ou inválido.`);
}
for(const token of ["id:'/'","scope:'/'","display:'standalone'","/pwa-icon-192.png","/pwa-icon-512.png","/pwa-maskable-512.png","purpose:'maskable'","/orcamento"]){
  if(!manifest.includes(token))errors.push(`PWA manifest perdeu requisito: ${token}`);
}
if(!layout.includes('ServiceWorkerRegistration')||!layout.includes('/apple-touch-icon.png'))errors.push('PWA: layout perdeu registro do worker ou Apple Touch Icon.');
if(!registration.includes("navigator.serviceWorker.register('/sw.js',{scope:'/'})")||!registration.includes("window.location.protocol==='https:'"))errors.push('PWA: registro do service worker precisa de escopo raiz e origem segura.');
for(const token of ["url.pathname.startsWith('/admin')","url.pathname.startsWith('/api/')","request.mode==='navigate'","caches.match('/offline.html')"]){
  if(!worker.includes(token))errors.push(`PWA worker perdeu proteção: ${token}`);
}
if(/caches\.put\(|cache\.put\(/.test(worker))errors.push('PWA worker não pode manter cache runtime genérico de conteúdo comercial.');
if(!offline.includes('Sem conexão por enquanto.'))errors.push('PWA: fallback offline estático ausente.');
if(!nextConfig.includes("source: '/sw.js'")||!nextConfig.includes('Service-Worker-Allowed'))errors.push('PWA: sw.js precisa de política explícita de atualização e escopo.');
if(!publicCsp.includes("worker-src 'self' blob:"))errors.push('PWA: CSP pública precisa permitir worker do próprio domínio.');

if(errors.length){console.error(`Public Flow Contract Check: ${errors.length} problema(s)`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Public Flow Contract Check: OK — orçamento/API continuam protegidos e o storefront público está restrito aos topos.');
