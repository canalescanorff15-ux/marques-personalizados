import type { NextConfig } from 'next';

// CSP de páginas é aplicada por requisição em proxy.ts para que cada resposta
// receba um nonce único. Os demais headers continuam estáticos e globais.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  { key: 'Origin-Agent-Cluster', value: '?1' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }
];

// APP_RELEASE_COMMIT continua sendo a autoridade explícita. Workers Builds fornece
// WORKERS_CI_COMMIT_SHA automaticamente; COMMIT_REF permanece apenas como fallback
// da trilha legada do Netlify.
const buildReleaseCommit = String(process.env.APP_RELEASE_COMMIT || process.env.WORKERS_CI_COMMIT_SHA || process.env.COMMIT_REF || '').trim();
const configuredDeployTime = String(process.env.APP_DEPLOYED_AT || '').trim();
const buildReleaseDeployedAt = configuredDeployTime && !Number.isNaN(Date.parse(configuredDeployTime))
  ? new Date(configuredDeployTime).toISOString()
  : new Date().toISOString();

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  env: {
    APP_RELEASE_COMMIT: buildReleaseCommit,
    APP_DEPLOYED_AT: buildReleaseDeployedAt
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    formats: ['image/avif','image/webp'],
    qualities: [75,76,82],
    minimumCacheTTL: 3600
  },
  async redirects() {
    return [
      { source: '/monte-seu-kit', destination: '/monte-seu-pedido', permanent: true },
      { source: '/categorias/:path*', destination: '/catalogo', permanent: true },
      { source: '/temas/:path*', destination: '/inspiracoes', permanent: true },
      { source: '/meu-projeto', destination: '/monte-seu-pedido', permanent: true },
      { source: '/comparar-inspiracoes', destination: '/inspiracoes', permanent: true }
    ];
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }, { key: 'Service-Worker-Allowed', value: '/' }] },
      { source: '/admin/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store, max-age=0' }] },
      { source: '/api/admin/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store, max-age=0' }] },
      { source: '/api/inquiries/:path*', headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }] },
      { source: '/api/health', headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }] }
    ];
  }
};
export default nextConfig;
