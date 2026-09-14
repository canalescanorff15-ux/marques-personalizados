import crypto from 'node:crypto';
import { NextRequest,NextResponse } from 'next/server';
import { buildAdminContentSecurityPolicy } from './lib/admin-csp';
import { buildPublicContentSecurityPolicy,isNetlifyDeployPreviewHost } from './lib/public-csp';

export function proxy(request:NextRequest){
  const nonce=crypto.randomBytes(18).toString('base64');
  const isAdmin=request.nextUrl.pathname.startsWith('/admin');
  const isDeployPreview=isNetlifyDeployPreviewHost(request.nextUrl.hostname);
  const csp=isAdmin
    ?buildAdminContentSecurityPolicy(nonce,process.env.NODE_ENV==='development')
    :buildPublicContentSecurityPolicy(nonce,process.env.NODE_ENV==='development',isDeployPreview);
  const requestHeaders=new Headers(request.headers);
  requestHeaders.set('x-nonce',nonce);
  requestHeaders.set('content-security-policy',csp);
  const response=NextResponse.next({request:{headers:requestHeaders}});
  response.headers.set('Content-Security-Policy',csp);
  if(isAdmin){
    response.headers.set('Cache-Control','private, no-store, max-age=0');
    response.headers.set('X-Robots-Tag','noindex, nofollow, noarchive');
  }
  return response;
}

export const config={matcher:['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)']};
