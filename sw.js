const C='nndev-v9',T=['th/div.webp','th/f-card.webp','th/f-ring.webp','th/hero.webp','th/i-allday.webp','th/i-bell.webp','th/i-camera.webp','th/i-cloud.webp','th/i-day.webp','th/i-gallery.webp','th/i-gear.webp','th/i-menu.webp','th/i-om.webp','th/i-palette.webp','th/i-pdf.webp','th/i-people.webp','th/i-phone.webp','th/i-pin.webp','th/i-rules.webp','th/i-temple.webp','th/logo.webp','th/lotus.webp','th/mandir.webp','th/wm.webp','th/splash.webp'],F=['./','index.html','logo.png','icon-192.png','icon-512.png','apple-touch-icon.png','favicon.png','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F).then(()=>Promise.all(T.map(f=>c.add(f).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  if(new URL(e.request.url).hostname.endsWith('.supabase.co'))return;
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))))});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(_){}
  e.waitUntil(Promise.all([self.registration.showNotification(d.title||'🔔 નવી સૂચના',{body:d.body||'ઍપ ખોલીને જુઓ.',icon:'icon-192.png',tag:d.id||'notice',renotify:true,lang:'gu'}),
    self.clients.matchAll({type:'window',includeUncontrolled:true}).then(L=>L.forEach(c=>c.postMessage({t:'notice'})))]))});
self.addEventListener('notificationclick',e=>{e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(L=>{const c=L.find(c=>c.url.startsWith(self.registration.scope));
    return c?c.focus().then(x=>(x||c).postMessage({t:'open-notices'})):self.clients.openWindow(self.registration.scope+'?notices=1')}))});
