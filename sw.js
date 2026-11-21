// SGP Celular — guarda o app no aparelho para abrir mesmo sem internet
const CACHE='sgp-cel-v3';
const ARQ=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','vendor/msal-browser.min.js','vendor/tesseract.min.js','vendor/worker.min.js',
 'vendor/core/tesseract-core-lstm.wasm.js','vendor/core/tesseract-core-lstm.wasm','vendor/core/tesseract-core-simd-lstm.wasm.js','vendor/core/tesseract-core-simd-lstm.wasm','vendor/lang/eng.traineddata.gz'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARQ)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=='GET')return; // OneDrive/Microsoft passam direto
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res;})));});
