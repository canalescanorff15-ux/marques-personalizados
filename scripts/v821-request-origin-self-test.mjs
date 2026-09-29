import { sameOriginBoundary,trustedRequestOrigins } from '../lib/request-origin.ts';

const failures=[];
const expect=(condition,label)=>{if(!condition)failures.push(label);};
const previous={nodeEnv:process.env.NODE_ENV,site:process.env.NEXT_PUBLIC_SITE_URL};
function req(url,headers={}){return new Request(url,{method:'POST',headers});}

try{
  process.env.NODE_ENV='production';
  process.env.NEXT_PUBLIC_SITE_URL='https://merlin-encantos-em-papel.canalescanorff15.workers.dev';
  const trusted=trustedRequestOrigins();
  expect(trusted.has('https://merlin.encantos.workers.dev'),'domínio atual deve ser confiável mesmo durante migração da variável antiga');
  expect(trusted.has('https://merlin-encantos-em-papel.canalescanorff15.workers.dev'),'origem configurada deve continuar confiável durante migração');
  expect(sameOriginBoundary(req('https://merlin.encantos.workers.dev/api/inquiries',{origin:'https://merlin.encantos.workers.dev','sec-fetch-site':'same-origin'})),'POST do domínio atual deve ser aceito');
  expect(!sameOriginBoundary(req('https://evil.example/api/inquiries',{origin:'https://evil.example','sec-fetch-site':'cross-site'})),'origem externa deve continuar rejeitada');
  expect(!trusted.has('https://qualquer.encantos.workers.dev'),'não deve confiar em subdomínios workers.dev arbitrários');
}finally{
  if(previous.nodeEnv===undefined)delete process.env.NODE_ENV;else process.env.NODE_ENV=previous.nodeEnv;
  if(previous.site===undefined)delete process.env.NEXT_PUBLIC_SITE_URL;else process.env.NEXT_PUBLIC_SITE_URL=previous.site;
}

if(failures.length){
  console.error(`V8.21 Request Origin Self-Test: FALHOU (${failures.length})`);
  for(const failure of failures)console.error('- '+failure);
  process.exit(1);
}
console.log('V8.21 Request Origin Self-Test: OK — domínio atual aceito sem abrir CSRF para hosts arbitrários.');
