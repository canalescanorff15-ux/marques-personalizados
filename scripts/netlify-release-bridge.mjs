import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const TARGET_SHA='b00f9f13323e794da298ea1d35d7e7f237c5a45b';
const RELEASE_BRANCH='v6.84.3-release-bridge';
const SITE_ID='7e30141e-75f3-4d3a-8bc5-cc30884f492b';

const context=String(process.env.CONTEXT||'');
const branch=String(process.env.BRANCH||'');
const proxyBase=String(process.env.MERLIN_DEPLOY_PROXY_BASE||'').trim();

if(context!=='deploy-preview'||branch!==RELEASE_BRANCH){
  console.log('Release bridge: skip outside the dedicated Deploy Preview.');
  process.exit(0);
}

if(!proxyBase.startsWith('https://netlify-mcp.netlify.app/proxy/')){
  throw new Error('Release bridge: temporary Netlify deploy proxy is missing or invalid.');
}

const zipPath=join(tmpdir(),`merlin-release-${TARGET_SHA}.zip`);

try{
  execFileSync('git',['fetch','--quiet','--depth=1','origin',TARGET_SHA],{stdio:'inherit'});
  execFileSync('git',['archive','--format=zip',`--output=${zipPath}`,'FETCH_HEAD'],{stdio:'inherit'});

  const endpoint=`${proxyBase.replace(/\/$/,'')}/api/v1/sites/${SITE_ID}/builds`;
  const zip=readFileSync(zipPath);
  const response=await fetch(endpoint,{
    method:'POST',
    headers:{
      'Content-Type':'application/zip',
      'Content-Length':String(zip.byteLength),
      'User-Agent':'merlin-release-bridge'
    },
    body:zip
  });

  const text=await response.text();
  if(!response.ok){
    throw new Error(`Release bridge: Netlify build API returned ${response.status} ${response.statusText}${text?` — ${text.slice(0,300)}`:''}`);
  }

  let data={};
  try{data=JSON.parse(text);}catch{}
  const deployId=typeof data?.deploy_id==='string'?data.deploy_id:'';
  const buildId=typeof data?.id==='string'?data.id:'';
  if(!deployId||!buildId)throw new Error('Release bridge: Netlify accepted the upload but did not return build/deploy identifiers.');

  console.log(`Release bridge: production build started for verified source ${TARGET_SHA}.`);
  console.log(`Release bridge: build=${buildId} deploy=${deployId}`);
}finally{
  try{rmSync(zipPath,{force:true});}catch{}
}
