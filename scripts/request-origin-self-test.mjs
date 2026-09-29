import { sameOriginBoundary,trustedRequestOrigin } from '../lib/request-origin.ts';

const failures=[];const expect=(condition,label)=>{if(!condition)failures.push(label);};
const previous={nodeEnv:process.env.NODE_ENV,site:process.env.NEXT_PUBLIC_SITE_URL};
function req(url,headers={}){return new Request(url,{method:'POST',headers});}
try{
  process.env.NODE_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://catalogo.example/';
  expect(trustedRequestOrigin(req('https://catalogo.example/api'))==='https://catalogo.example','produção deve preferir NEXT_PUBLIC_SITE_URL quando válido');
  expect(sameOriginBoundary(req('https://catalogo.example/api',{origin:'https://catalogo.example','sec-fetch-site':'same-origin'})),'origem configurada deve ser aceita');
  expect(sameOriginBoundary(req('https://merlin.encantos.workers.dev/api',{origin:'https://merlin.encantos.workers.dev','sec-fetch-site':'same-origin'})),'domínio canônico Merlin deve ser aceito mesmo durante transição de configuração');
  expect(!sameOriginBoundary(req('https://catalogo.example/api',{origin:'https://evil.example','sec-fetch-site':'cross-site'})),'origem cruzada deve ser rejeitada');
  expect(!sameOriginBoundary(req('https://catalogo.example/api',{origin:'https://evil.example','x-forwarded-host':'evil.example','x-forwarded-proto':'https'})),'x-forwarded-host/proto não podem redefinir a autoridade CSRF');
  expect(sameOriginBoundary(req('https://catalogo.example/api',{origin:'https://catalogo.example','x-forwarded-host':'evil.example','x-forwarded-proto':'http'})),'headers forwarded forjados não podem derrubar a origem oficial');
  expect(!sameOriginBoundary(req('https://catalogo.example/api',{origin:'null'})),'Origin null deve falhar fechado');
  expect(!sameOriginBoundary(req('https://catalogo.example/api',{referer:'https://evil.example/page'})),'Referer externo deve ser rejeitado');
  expect(sameOriginBoundary(req('https://catalogo.example/api',{referer:'https://catalogo.example/admin'})),'Referer oficial deve ser aceito');
  expect(sameOriginBoundary(req('https://catalogo.example/api')),'cliente não-browser sem Fetch Metadata deve continuar suportado');

  process.env.NEXT_PUBLIC_SITE_URL='';
  expect(trustedRequestOrigin(req('https://merlin.encantos.workers.dev/api'))==='https://merlin.encantos.workers.dev','produção sem variável deve usar domínio canônico Merlin');
  expect(sameOriginBoundary(req('https://merlin.encantos.workers.dev/api',{origin:'https://merlin.encantos.workers.dev','sec-fetch-site':'same-origin'})),'domínio canônico deve funcionar sem variável de ambiente');
  expect(!sameOriginBoundary(req('https://catalogo.example/api',{origin:'https://catalogo.example'})),'origem não configurada e não canônica deve falhar fechado');

  process.env.NEXT_PUBLIC_SITE_URL='http://catalogo.example';
  expect(!sameOriginBoundary(req('http://catalogo.example/api',{origin:'http://catalogo.example'})),'produção pública não pode confiar em origem HTTP');
  process.env.NEXT_PUBLIC_SITE_URL='http://127.0.0.1:3100';
  expect(sameOriginBoundary(req('http://127.0.0.1:3100/api',{origin:'http://127.0.0.1:3100'})),'loopback HTTP deve funcionar para smoke local de produção');

  process.env.NODE_ENV='development';process.env.NEXT_PUBLIC_SITE_URL='https://catalogo.example';
  expect(trustedRequestOrigin(req('http://localhost:3000/api'))==='http://localhost:3000','desenvolvimento deve usar a URL efetiva da requisição');
  expect(sameOriginBoundary(req('http://localhost:3000/api',{origin:'http://localhost:3000'})),'desenvolvimento localhost same-origin deve funcionar');
}finally{
  if(previous.nodeEnv===undefined)delete process.env.NODE_ENV;else process.env.NODE_ENV=previous.nodeEnv;
  if(previous.site===undefined)delete process.env.NEXT_PUBLIC_SITE_URL;else process.env.NEXT_PUBLIC_SITE_URL=previous.site;
}
if(failures.length){console.error(`Request Origin Self-Test: FALHOU (${failures.length})`);for(const f of failures)console.error('- '+f);process.exit(1);}
console.log('Request Origin Self-Test: OK — Merlin canônico + origem configurada são confiáveis e cross-site continua bloqueado.');
