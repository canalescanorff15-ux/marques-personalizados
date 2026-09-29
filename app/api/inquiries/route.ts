import crypto from 'crypto';
import { categoryExists, createInquiry, getPublicProductsByIds, getSiteSettings, recordSiteEvent, type InquiryQuoteItem } from '@/lib/db';
import { inquirySchema } from '@/lib/validation';
import { protectedRateLimit, readJsonBody, sameOriginRequest } from '@/lib/security';
import { normalizeWhatsapp, whatsappUrl } from '@/lib/links';
import { serverFailure } from '@/lib/observability';

function deterministicUuid(value:string){const h=crypto.createHash('sha256').update(value).digest('hex').slice(0,32).split('');h[12]='4';h[16]=((parseInt(h[16],16)&3)|8).toString(16);const x=h.join('');return `${x.slice(0,8)}-${x.slice(8,12)}-${x.slice(12,16)}-${x.slice(16,20)}-${x.slice(20)}`;}
function localToday(){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Fortaleza',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
function detailFromSummary(message:string,...labels:string[]){
  const lines=message.split(/\r?\n/);
  for(const label of labels){
    const prefix=`${label}:`;
    const found=lines.find(line=>line.startsWith(prefix));
    if(found)return found.slice(prefix.length).trim();
  }
  return'';
}

export async function POST(request:Request){
  if(!sameOriginRequest(request))return Response.json({error:'Origem inválida.'},{status:403});
  const limited=await protectedRateLimit(request,'inquiry',6,15*60_000);if(!limited.allowed)return Response.json({error:'Muitas solicitações em pouco tempo. Tente novamente mais tarde.'},{status:429});
  let body:Record<string,unknown>={};try{body=await readJsonBody(request,48_000);}catch(e){return Response.json({error:e instanceof Error&&e.message==='PAYLOAD_TOO_LARGE'?'Solicitação muito grande.':'Dados inválidos.'},{status:e instanceof Error&&e.message==='PAYLOAD_TOO_LARGE'?413:400});}
  const parsed=inquirySchema.safeParse(body);if(!parsed.success)return Response.json({error:'Confira seu nome, WhatsApp e os dados do orçamento.',details:parsed.error.flatten()},{status:400});
  if(parsed.data.website)return Response.json({ok:true});
  const phone=normalizeWhatsapp(parsed.data.whatsapp);if(phone.length<10)return Response.json({error:'Informe um WhatsApp válido.'},{status:400});
  if(parsed.data.event_date&&parsed.data.event_date<localToday())return Response.json({error:'A data do evento não pode estar no passado.'},{status:400});
  const settings=await getSiteSettings();
  let productId=parsed.data.product_id||'',productName=parsed.data.product_name||'',category=parsed.data.category||'';let quoteItems:InquiryQuoteItem[]=[];
  const message=parsed.data.message.trim()||'Gostaria de receber valores, prazo e opções de personalização.';

  const whatsappText=(contingency=false)=>{
    const b=parsed.data.brief||{};
    const colors=detailFromSummary(message,'Cores');
    const size=detailFromSummary(message,'Tamanho/diâmetro do bolo','Tamanho/medidas');
    const reference=detailFromSummary(message,'Referência');
    const notes=detailFromSummary(message,'Observações');
    const model=detailFromSummary(message,'Modelo do topo','Modelo/tipo');
    const quantity=detailFromSummary(message,'Quantidade');
    const format=detailFromSummary(message,'Formato');
    const finish=detailFromSummary(message,'Acabamento');
    const print=detailFromSummary(message,'Impressão');
    const description=detailFromSummary(message,'Descrição da ideia');
    const productLabel=productName||b.occasion||'Papelaria personalizada';
    const eventDate=parsed.data.event_date?parsed.data.event_date.split('-').reverse().join('/'):'';
    const itemLines=quoteItems.length
      ? quoteItems.map((x,i)=>`${i+1}. ${x.name} — ${x.quantity} un.`)
      : [];
    const extraDetails=[
      model&&`• Modelo: ${model}`,
      quantity&&`• Quantidade: ${quantity}`,
      format&&`• Formato: ${format}`,
      finish&&`• Acabamento: ${finish}`,
      print&&`• Impressão: ${print}`,
      description&&`• Ideia: ${description}`,
      ...itemLines
    ].filter(Boolean);

    return [
      '🎂 NOVO PEDIDO — MERLIN',
      '',
      `👤 Cliente: ${parsed.data.name}`,
      `📱 WhatsApp: ${parsed.data.whatsapp}`,
      eventDate&&`📅 Data do evento: ${eventDate}`,
      '',
      `🎨 Produto: ${productLabel}`,
      b.theme&&`🎉 Tema: ${b.theme}`,
      b.celebrant_name&&`✍️ Nome / texto: ${b.celebrant_name}`,
      b.celebrant_age&&`🎈 Idade / número: ${b.celebrant_age}`,
      colors&&`🎨 Cores: ${colors}`,
      size&&`📏 Tamanho / medidas: ${size}`,
      reference&&`🖼️ Referência / inspiração: ${reference}`,
      notes&&`📝 Observações: ${notes}`,
      extraDetails.length&&`\n📋 Outros detalhes:\n${extraDetails.join('\n')}`,
      contingency&&'\n⚠️ O registro automático ficou indisponível, mas os dados do pedido foram preservados. Estou continuando pelo WhatsApp.'
    ].filter(Boolean).join('\n');
  };

  try{
    if(parsed.data.items.length){
      const products=await getPublicProductsByIds(parsed.data.items.map(x=>x.product_id));
      const by=new Map(products.map(p=>[p.id,p]));
      for(const line of parsed.data.items){
        const p=by.get(line.product_id);
        if(!p||p.stock_status==='indisponivel')return Response.json({error:'Um dos itens não está mais disponível. Atualize sua lista.'},{status:400});
        const customizations:Record<string,string>={};
        const received=line.customizations||{};
        for(const field of p.customization_fields||[]){
          const value=String(received[field.id]||'').trim().slice(0,200);
          if(field.required&&!value)return Response.json({error:`Preencha “${field.label}” em ${p.name}.`},{status:400});
          if(value&&field.type==='select'&&!field.options.includes(value))return Response.json({error:`A opção escolhida em “${field.label}” não é válida.`},{status:400});
          if(value&&field.type==='number'&&!Number.isFinite(Number(value)))return Response.json({error:`Informe um número válido em “${field.label}”.`},{status:400});
          if(value)customizations[field.label]=value;
        }
        quoteItems.push({product_id:p.id,name:p.name,category:p.category,quantity:Math.max(p.min_quantity||1,line.quantity),customizations});
      }
      productId=quoteItems.length===1?quoteItems[0].product_id:'';
      productName=quoteItems.length===1?quoteItems[0].name:`Lista com ${quoteItems.length} itens`;
      const cats=[...new Set(quoteItems.map(x=>x.category))];category=cats.length===1?cats[0]:'Diversos';
    }else if(productId){
      const p=(await getPublicProductsByIds([productId]))[0];
      if(!p||p.stock_status==='indisponivel')return Response.json({error:'Este produto não está mais disponível.'},{status:400});
      productName=p.name;category=p.category;quoteItems=[{product_id:p.id,name:p.name,category:p.category,quantity:p.min_quantity||1,customizations:{}}];
    }else if(category&&!(await categoryExists(category)))return Response.json({error:'Selecione uma categoria válida.'},{status:400});

    const retryBucket=Math.floor(Date.now()/600_000);
    const idem=parsed.data.request_id||deterministicUuid(JSON.stringify({retryBucket,phone,name:parsed.data.name,event:parsed.data.event_date||'',items:quoteItems.map(x=>[x.product_id,x.quantity]),message,brief:parsed.data.brief}));
    const {inquiry,created}=await createInquiry({...parsed.data,whatsapp:phone,message,product_id:productId,product_name:productName,category,quote_items:quoteItems,event_brief:parsed.data.brief,source:parsed.data.brief?.source||'site',idempotency_key:idem});
    if(created)await recordSiteEvent('quote_submit','/orcamento');
    return Response.json({ok:true,persisted:true,id:inquiry.id,deduplicated:!created,whatsapp_url:whatsappUrl(settings.whatsapp_number,whatsappText(false))},{status:created?201:200});
  }catch(error){
    const failure=await serverFailure('api.inquiries',error,503,'O registro automático do orçamento está temporariamente indisponível.');
    const fallbackUrl=whatsappUrl(settings.whatsapp_number,whatsappText(true));
    if(fallbackUrl)return Response.json({ok:true,persisted:false,contingency:true,whatsapp_url:fallbackUrl,reference:failure.headers.get('x-error-reference')||undefined,message:'Seu rascunho foi preservado. Continue pelo WhatsApp com o resumo já preenchido.'},{status:202,headers:{'cache-control':'no-store'}});
    return failure;
  }
}
