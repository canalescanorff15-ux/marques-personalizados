import fs from 'node:fs';
const errors=[];const read=file=>fs.readFileSync(file,'utf8');
const origin=read('lib/request-origin.ts');
for(const [pattern,label] of [
  [/process\.env\.NODE_ENV==='production'/,'autoridade deve distinguir produção'],
  [/process\.env\.NEXT_PUBLIC_SITE_URL/,'produção deve usar NEXT_PUBLIC_SITE_URL como autoridade'],
  [/new URL\(origin\)\.origin===expected/,'Origin deve ser comparado por origem canônica'],
  [/new URL\(referer\)\.origin===expected/,'Referer deve ser fallback canônico'],
  [/return !fetchSite/,'clientes não-browser sem Fetch Metadata devem continuar suportados'],
])if(!pattern.test(origin))errors.push(`request-origin: ${label}`);
if(/x-forwarded-host|x-forwarded-proto/i.test(origin))errors.push('request-origin: headers forwarded não podem participar da autoridade CSRF');
const security=read('lib/security.ts');
if(!security.includes("import { sameOriginBoundary } from './request-origin'"))errors.push('security.ts deve delegar CSRF ao boundary puro');
if(!security.includes('sameOriginBoundary(request)'))errors.push('sameOriginRequest deve usar sameOriginBoundary');
if(!security.includes("process.env.GITHUB_ACTIONS==='true'&&process.env.MARQUES_CI_STATELESS_AUTH==='1'"))errors.push('rate limit local de CI deve ficar restrito ao GitHub Actions');
if(!/strictDistributedRateScope\(scope\)&&!allowCiLocalRateLimit\(\)/.test(security))errors.push('produção deve manter rate limit distribuído fail-closed fora do bypass explícito de CI');

const limits=read('lib/request-limits.ts');
for(const token of ['advertisedContentLength','exceedsAdvertisedBodyLimit','isMultipartFormData','isJsonContentType','readBytesBodyWithinLimit','readTextBodyWithinLimit','readMultipartFormDataWithinLimit','reader.cancel'])if(!limits.includes(token))errors.push(`request-limits sem ${token}`);
const securityIngress=read('lib/security.ts');
for(const token of ['readTextBodyWithinLimit(request,maxBytes)',"throw new Error('UNSUPPORTED_MEDIA_TYPE')",'distributedRateBuckets(scope,limit,strict)'])if(!securityIngress.includes(token))errors.push(`security ingress sem ${token}`);
const ratePolicy=read('lib/rate-limit-policy.ts');
for(const token of ["scope.startsWith('admin-')","scope:`${scope}:global`","subject:'global'",'normalized*4'])if(!ratePolicy.includes(token))errors.push(`rate-limit policy sem ${token}`);
const observability=read('lib/observability.ts');
if(!observability.includes('classifyRequestInputFailure(error)'))errors.push('observability precisa separar erros 4xx de entrada de incidentes 5xx');
const httpErrors=read('lib/http-errors.ts');
for(const token of ['INVALID_JSON','PAYLOAD_TOO_LARGE','UNSUPPORTED_MEDIA_TYPE','status:413','status:415'])if(!httpErrors.includes(token))errors.push(`http-errors sem ${token}`);
const upload=read('app/api/admin/upload/route.ts');
for(const token of ['isMultipartFormData(request)','readMultipartFormDataWithinLimit(request,MAX_MULTIPART_BYTES)','MAX_FILE_BYTES','status:415','status:413'])if(!upload.includes(token))errors.push(`upload sem boundary: ${token}`);
if(upload.includes('request.formData()'))errors.push('upload não pode materializar multipart diretamente antes do bounded ingress');
const restore=read('app/api/admin/restore/route.ts');for(const token of ['readTextBodyWithinLimit(request,MAX_BYTES)',"throw new Error('BACKUP_TOO_LARGE')",'36 MB'])if(!restore.includes(token))errors.push(`restore sem bounded ingress: ${token}`);if(restore.includes('request.text()'))errors.push('restore não pode materializar backup diretamente antes do limite');

const adminCsp=read('lib/admin-csp.ts');
for(const token of ["'strict-dynamic'","script-src-attr 'none'","connect-src 'self'","frame-src 'none'","frame-ancestors 'none'"])if(!adminCsp.includes(token))errors.push(`admin CSP sem ${token}`);
const adminScriptLine=adminCsp.split(/\r?\n/).find(line=>line.includes("script-src 'self'"))||'';
if(adminScriptLine.includes("'unsafe-inline'"))errors.push('admin script-src não pode conter unsafe-inline');

const publicCsp=read('lib/public-csp.ts');
for(const token of ["'strict-dynamic'","script-src-attr 'none'","connect-src 'self' https: wss:","frame-src 'none'","frame-ancestors 'none'","upgrade-insecure-requests"])if(!publicCsp.includes(token))errors.push(`public CSP sem ${token}`);
const publicScriptLine=publicCsp.split(/\r?\n/).find(line=>line.includes("script-src 'self'"))||'';
if(publicScriptLine.includes("'unsafe-inline'"))errors.push('public script-src não pode conter unsafe-inline');

const proxy=read('proxy.ts');
for(const token of ["randomBytes(18)","buildAdminContentSecurityPolicy","buildPublicContentSecurityPolicy","request.nextUrl.pathname.startsWith('/admin')","requestHeaders.set('x-nonce',nonce)","requestHeaders.set('content-security-policy',csp)","response.headers.set('Content-Security-Policy',csp)","X-Robots-Tag","private, no-store","(?!api|_next/static|_next/image"])if(!proxy.includes(token))errors.push(`proxy CSP sem ${token}`);
if(proxy.includes("matcher:['/admin/:path*']"))errors.push('proxy CSP não pode ficar restrito apenas ao Admin');
const loginLayout=read('app/admin/login/layout.tsx');if(!loginLayout.includes("dynamic='force-dynamic'"))errors.push('login admin precisa de renderização dinâmica para nonce');

const jsonLdComponent=read('components/JsonLd.tsx');
for(const token of ["headers()","get('x-nonce')","nonce={nonce}","application/ld+json"])if(!jsonLdComponent.includes(token))errors.push(`JsonLd nonce sem ${token}`);

const next=read('next.config.ts');
for(const token of ["X-Permitted-Cross-Domain-Policies","Origin-Agent-Cluster","Permissions-Policy","Cross-Origin-Opener-Policy","Strict-Transport-Security"])if(!next.includes(token))errors.push(`next headers sem ${token}`);
if(next.includes("script-src 'self' 'unsafe-inline'"))errors.push('next.config não pode reintroduzir CSP pública com script unsafe-inline');
if(next.includes("key: 'Content-Security-Policy'"))errors.push('CSP de páginas deve ser por requisição no proxy, não header estático duplicado');

if(errors.length){console.error(`HTTP Boundary Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('HTTP Boundary Contract: OK — origem confiável, ingress limitado e CSP nonce por requisição no Admin e páginas públicas.');
