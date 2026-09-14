function cleanNonce(value:string){return String(value||'').replace(/[^A-Za-z0-9+/_=-]/g,'').slice(0,160);}

export function isNetlifyDeployPreviewHost(hostname:string){
  const host=String(hostname||'').trim().toLowerCase();
  return /^deploy-preview-\d+--[a-z0-9-]+\.netlify\.app$/.test(host);
}

export function buildPublicContentSecurityPolicy(nonce:string,isDevelopment=false,allowNetlifyPreviewFrame=false){
  const safeNonce=cleanNonce(nonce);if(!safeNonce)throw new Error('CSP_NONCE_REQUIRED');
  const directives=[
    "default-src 'self'",
    `script-src 'self' 'nonce-${safeNonce}' 'strict-dynamic'${isDevelopment?" 'unsafe-eval'":''}`,
    "script-src-attr 'none'",
    // Componentes públicos ainda usam style={} do React; scripts permanecem nonce-only.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: wss:",
    "media-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    allowNetlifyPreviewFrame?"frame-src https://app.netlify.com":"frame-src 'none'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    'upgrade-insecure-requests',
  ];
  return directives.join('; ');
}
