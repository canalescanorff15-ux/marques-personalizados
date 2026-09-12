import fs from 'node:fs';

function read(file){return fs.readFileSync(file,'utf8');}
function assert(ok,message){if(!ok)throw new Error(message);}

const page=read('app/page.tsx');
const dock=read('components/MerlinMobileDock.tsx');
const footer=read('components/Footer.tsx');
const css=read('app/premium.css');

for(const needle of ['event-pathways-primary','merlin-briefing-section','MerlinMobileDock whatsapp={settings.whatsapp_number}']){
  assert(page.includes(needle),`home sem melhoria comercial: ${needle}`);
}
for(const item of ['Data do evento','Tema e cores','Peças e quantidades','Referências']){
  assert(page.includes(item),`briefing incompleto: ${item}`);
}
for(const item of ['/inspiracoes','/monte-seu-kit','Orçamento']){
  assert(dock.includes(item),`dock móvel incompleto: ${item}`);
}
assert(footer.includes('Escolher peças e quantidades'),'footer sem atalho para montar pedido');
assert(footer.includes('Ver modelos e estilos'),'footer sem atalho de inspirações');
assert(css.includes('/* V6.57 — conversão, briefing e navegação móvel Merlin */'),'bloco visual V6.57 ausente');
assert(css.includes('body:has(.merlin-mobile-dock) .premium-site .floating-wa{display:none}'),'dock móvel conflita com botão flutuante do WhatsApp');
assert(css.includes('@media(prefers-reduced-motion:reduce)'),'redução de movimento não preservada');
console.log('merlin-commercial-ux-contract-check: OK — jornada, briefing, footer e dock móvel protegidos.');
