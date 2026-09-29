import { sameOriginBoundary,trustedRequestOrigin } from '../lib/request-origin.ts';

const failures=[];const expect=(condition,label)=>{if(!condition)failures.push(label);};
const previous={nodeEnv:process.env.NODE_ENV,site:process.env.NEXT_PUBLIC_SITE_URL};
function req(url,headers={}){return new Request(url,{method:'POST',headers});}
try{
  process.env.NODE_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://catalogo.example/';
  expect(trustedRequestOrigin(req('https://catalogo.example/api'))==='https://catalogo.example','produção deve aceitar a origem HTTPS explicitamente configurada');
  expect(sameOriginBoundary(req('https://catalogo.example/api',{origin:'https://catalogo.example','sec-fetch-site':'same-origin'})),'origem configurada deve ser aceita');
  expect(sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries',{origin:'https://merlin.encantos.workers.dev','sec-fetch-site':'same-origin'})),'domínio Merlin atual deve continuar aceito mesmo durante transição da variável de ambiente');
  expect(sameOriginBoundary(req('https://merlin-encantos-em-papel.canalescanorff15.workers.dev/api/inquiries',{origin:'https://merlin-encantos-em-papel.canalescanorff15.workers.dev','sec-fetch-site':'same-origin'})),'alias legado deve permanecer aceito durante propagação');
  expect(!sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries',{origin:'https://evil.example','sec-fetch-site':'cross-site'})),'origem cruzada deve ser rejeitada');
  expect(!sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries',{origin:'https://evil.example','x-forwarded-host':'evil.example','x-forwarded-proto':'https'})),'x-forwarded-host/proto não podem redefinir a autoridade CSRF');
  expect(sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries',{origin:'https://merlin.encantos.workers.dev','x-forwarded-host':'evil.example','x-forwarded-proto':'http'})),'headers forwarded forjados não podem derrubar a origem oficial');
  expect(!sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries',{origin:'null'})),'Origin null deve falhar fechado');
  expect(!sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries',{referer:'https://evil.example/page'})),'Referer externo deve ser rejeitado');
  expect(sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries',{referer:'https://merlin.encantos.workers.dev/orcamento'})),'Referer oficial deve ser aceito');
  expect(sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries')),'cliente não-browser no domínio oficial deve continuar suportado');
  process.env.NEXT_PUBLIC_SITE_URL='';
  expect(sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries',{origin:'https://merlin.encantos.workers.dev'})),'domínio oficial deve funcionar mesmo se a variável estiver vazia');
  expect(!sameOriginBoundary(req('https://catalogo.example/api',{origin:'https://catalogo.example'})),'origem não oficial e não configurada deve falhar fechado');
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
console.log('Request Origin Self-Test: OK — domínio atual e aliases explícitos funcionam sem permitir origem externa.');
