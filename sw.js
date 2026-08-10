const CACHE='lean-tracker-v4';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./img/lat-pulldown.jpg'];
const CROP='?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop';
const IMAGES=[
'https://steelsupplements.com/cdn/shop/articles/shutterstock_627366494_8e10811d-1d15-4731-9fab-fcdbddd8ef11_2000x.jpg?v=1768854444',
'https://imgr1.menshealth.de/Brustpresse-inlineImageCOdc-3924ed50-45129.jpg',
'https://images.pexels.com/photos/29825217/pexels-photo-29825217.jpeg'+CROP,
'https://images.pexels.com/photos/7289370/pexels-photo-7289370.jpeg'+CROP,
'https://images.pexels.com/photos/17559311/pexels-photo-17559311.jpeg'+CROP,
'https://steelsupplements.com/cdn/shop/articles/shutterstock_430434973_1600x.jpg?v=1772043626',
'https://i0.statig.com.br/bancodeimagens/br/cf/h3/brcfh373qukprbp5khibe5ckm.jpg',
'https://static.tildacdn.com/tild3933-3163-4932-b539-323162636463/6738.jpg'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).then(()=>Promise.all(IMAGES.map(u=>c.add(u).catch(()=>null)))))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
   const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r;
 }).catch(()=>cached)));
});