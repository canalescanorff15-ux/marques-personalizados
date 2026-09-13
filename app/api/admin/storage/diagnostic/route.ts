import { isAdmin } from '@/lib/auth';
import { sameOriginRequest } from '@/lib/security';
import { runStorageDiagnostic } from '@/lib/storage-diagnostic';
import { serverFailure } from '@/lib/observability';

export const runtime='nodejs';

export async function POST(request:Request){
  if(!(await isAdmin()))return Response.json({error:'Não autorizado.'},{status:401});
  if(!sameOriginRequest(request))return Response.json({error:'Origem inválida.'},{status:403});
  try{
    const result=await runStorageDiagnostic();
    if(result.ok)return Response.json(result,{headers:{'cache-control':'private, no-store'}});
    const message=result.state==='not-configured'
      ?'Cloudflare R2 ainda não está configurado no Netlify.'
      :result.state==='partial-config'
        ?'A configuração do Cloudflare R2 está incompleta. Revise todas as variáveis S3 no Netlify.'
        :result.state==='invalid'
          ?'A configuração do Cloudflare R2 é inválida. Revise endpoint, URL pública e bucket.'
          :`O teste do Cloudflare R2 falhou${result.failed_stage?` na etapa ${result.failed_stage}`:''}. Revise permissões e conectividade.`;
    return Response.json({...result,error:message},{status:result.state==='unavailable'?502:503,headers:{'cache-control':'private, no-store'}});
  }catch(error){return await serverFailure('admin.storage.diagnostic',error);}
}
