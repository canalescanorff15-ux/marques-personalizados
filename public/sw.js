const CACHE_NAME='merlin-shell-v685-1';
const PRECACHE_URLS=[
  '/offline.html',
  '/favicon.svg',
  '/pwa-icon-192.png',
  '/pwa-icon-512.png',
  '/pwa-maskable-512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install',(event)=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache)=>cache.addAll(PRECACHE_URLS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',(event)=>{
  event.waitUntil(
    caches.keys()
      .then((keys)=>Promise.all(keys.filter((key)=>key.startsWith('merlin-shell-')&&key!==CACHE_NAME).map((key)=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',(event)=>{
  const request=event.request;
  if(request.method!=='GET')return;

  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  if(url.pathname.startsWith('/admin')||url.pathname.startsWith('/api/'))return;

  if(request.mode==='navigate'){
    event.respondWith(
      fetch(request).catch(async()=>{
        const offline=await caches.match('/offline.html');
        return offline||Response.error();
      })
    );
    return;
  }

  if(PRECACHE_URLS.includes(url.pathname)){
    event.respondWith(
      caches.match(request).then((cached)=>cached||fetch(request))
    );
  }
});
