const reportUrl='https://deploy-preview-36--merlin-encantos-em-papel.netlify.app/reports/lighthouse.html';
const sleep=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));

// O Deploy Preview do Netlify roda em paralelo ao CI. Esperamos a alias trocar
// para o deploy mais recente antes de ler o relatório gerado pelo plugin.
await sleep(65000);
let html='';
for(let attempt=1;attempt<=18;attempt++){
  try{
    const response=await fetch(`${reportUrl}?diag=${Date.now()}`,{headers:{'cache-control':'no-cache'}});
    if(response.ok){
      html=await response.text();
      if(html.includes('window.__LIGHTHOUSE_JSON__'))break;
    }
    console.log(`Lighthouse diagnostic: tentativa ${attempt}, status=${response.status}.`);
  }catch(error){
    console.log(`Lighthouse diagnostic: tentativa ${attempt} falhou: ${String(error?.message||error)}`);
  }
  await sleep(5000);
}

if(!html.includes('window.__LIGHTHOUSE_JSON__')){
  throw new Error('Lighthouse diagnostic: relatório detalhado não ficou disponível no preview.');
}

const marker='window.__LIGHTHOUSE_JSON__ = ';
const start=html.indexOf(marker);
const end=html.indexOf(';</script>',start);
if(start<0||end<0)throw new Error('Lighthouse diagnostic: JSON embutido não encontrado.');
const lhr=JSON.parse(html.slice(start+marker.length,end));
const category=lhr?.categories?.['best-practices'];
if(!category)throw new Error('Lighthouse diagnostic: categoria best-practices ausente.');

console.log(`Lighthouse diagnostic: version=${lhr.lighthouseVersion} best-practices=${Math.round(Number(category.score||0)*100)} URL=${lhr.finalDisplayedUrl||lhr.finalUrl||''}`);
for(const ref of category.auditRefs||[]){
  const audit=lhr.audits?.[ref.id];
  if(!audit)continue;
  const score=audit.score;
  if(ref.weight>0&&score!==1){
    console.log(JSON.stringify({id:ref.id,weight:ref.weight,score,scoreDisplayMode:audit.scoreDisplayMode,title:audit.title,displayValue:audit.displayValue||null,description:audit.description||null,detailsType:audit.details?.type||null}));
  }
}
