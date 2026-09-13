import { randomUUID } from 'node:crypto';
import { DeleteObjectCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import { safeErrorCode } from './health-policy';
import { storageClient,storageConfig } from './storage';

export type StorageDiagnosticStage={ok:boolean;latency_ms:number;error_code?:string};
export type StorageDiagnosticResult={
  ok:boolean;
  state:'ok'|'not-configured'|'partial-config'|'invalid'|'unavailable';
  configured:boolean;
  required:boolean;
  failed_stage?:string;
  error_code?:string;
  stages:Record<string,StorageDiagnosticStage>;
};

function codedError(code:string){const error=new Error(code);error.name=code;return error;}
function missingObjectError(error:unknown){
  const value=error&&typeof error==='object'?error as {name?:string;$metadata?:{httpStatusCode?:number}}:{};
  return value.$metadata?.httpStatusCode===404||value.name==='NotFound'||value.name==='NoSuchKey';
}

async function stage(name:string,factory:(signal:AbortSignal)=>Promise<void>,stages:Record<string,StorageDiagnosticStage>,timeoutMs:number){
  const started=Date.now();const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
  try{await factory(controller.signal);stages[name]={ok:true,latency_ms:Date.now()-started};return stages[name];}
  catch(error){const errorCode=controller.signal.aborted?'PROBE_TIMEOUT':safeErrorCode(error);stages[name]={ok:false,latency_ms:Date.now()-started,error_code:errorCode};return stages[name];}
  finally{clearTimeout(timer);}
}

export async function runStorageDiagnostic(timeoutMs=5000):Promise<StorageDiagnosticResult>{
  const c=storageConfig();const stages:Record<string,StorageDiagnosticStage>={};
  if(c.partial)return{ok:false,state:'partial-config',configured:false,required:c.required,error_code:'PARTIAL_CONFIG',stages};
  if(c.invalid)return{ok:false,state:'invalid',configured:false,required:c.required,error_code:c.errorCode||'STORAGE_CONFIG_INVALID',stages};
  if(!c.configured)return{ok:false,state:'not-configured',configured:false,required:c.required,error_code:'STORAGE_NOT_CONFIGURED',stages};
  const client=storageClient();
  if(!client)return{ok:false,state:'unavailable',configured:true,required:c.required,error_code:'CLIENT_UNAVAILABLE',stages};

  const token=randomUUID();const key=`catalog/_diagnostic/${token}.txt`;const body=Buffer.from(`merlin-storage-probe-v1:${token}`,'utf8');
  let needsCleanup=false;
  try{
    needsCleanup=true;
    const put=await stage('put',async signal=>{await client.send(new PutObjectCommand({Bucket:c.bucket,Key:key,Body:body,ContentType:'text/plain; charset=utf-8',CacheControl:'no-store',Metadata:{'probe-token':token}}),{abortSignal:signal});},stages,timeoutMs);
    if(!put.ok)return{ok:false,state:'unavailable',configured:true,required:c.required,failed_stage:'put',error_code:put.error_code,stages};

    const head=await stage('head',async signal=>{const res=await client.send(new HeadObjectCommand({Bucket:c.bucket,Key:key}),{abortSignal:signal});if(Number(res.ContentLength)!==body.length||String(res.Metadata?.['probe-token']||'')!==token)throw codedError('STORAGE_PROBE_HEAD_MISMATCH');},stages,timeoutMs);
    if(!head.ok)return{ok:false,state:'unavailable',configured:true,required:c.required,failed_stage:'head',error_code:head.error_code,stages};

    const list=await stage('list',async signal=>{const res=await client.send(new ListObjectsV2Command({Bucket:c.bucket,Prefix:key,MaxKeys:2}),{abortSignal:signal});if(!(res.Contents||[]).some(item=>item.Key===key))throw codedError('STORAGE_PROBE_LIST_MISMATCH');},stages,timeoutMs);
    if(!list.ok)return{ok:false,state:'unavailable',configured:true,required:c.required,failed_stage:'list',error_code:list.error_code,stages};

    const del=await stage('delete',async signal=>{await client.send(new DeleteObjectCommand({Bucket:c.bucket,Key:key}),{abortSignal:signal});},stages,timeoutMs);
    if(!del.ok)return{ok:false,state:'unavailable',configured:true,required:c.required,failed_stage:'delete',error_code:del.error_code,stages};

    const confirm=await stage('confirm_delete',async signal=>{try{await client.send(new HeadObjectCommand({Bucket:c.bucket,Key:key}),{abortSignal:signal});throw codedError('STORAGE_PROBE_DELETE_NOT_CONFIRMED');}catch(error){if(missingObjectError(error))return;throw error;}},stages,timeoutMs);
    if(!confirm.ok)return{ok:false,state:'unavailable',configured:true,required:c.required,failed_stage:'confirm_delete',error_code:confirm.error_code,stages};
    needsCleanup=false;
    return{ok:true,state:'ok',configured:true,required:c.required,stages};
  }finally{
    if(needsCleanup)await stage('cleanup_delete',async signal=>{await client.send(new DeleteObjectCommand({Bucket:c.bucket,Key:key}),{abortSignal:signal});},stages,timeoutMs).catch(()=>undefined);
  }
}
