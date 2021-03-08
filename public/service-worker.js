const cacheName = 'Thnovice-cache';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        './',
        '../views/index.ejs',
        './manifest.json',
        './images/thnovice-icon.png',
        './stylesheets/font.css',
        './stylesheets/bs45.css',
        './icons/js/all.js',
        './icons/css/all.css',
        './offline.html'
      ]);
    })
  );
});

let deferredPrompt;
self.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.style.display = 'block';
    addBtn.addEventListener('click', (e) => {
      addBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
});

var responseContent =
    "<html>" +
    "<body>" +
    "<style>" +
    "body {text-align: center; background-color: #333; color: #eee; margin-top: 10%;}" +
    "</style>" +
    "<h1>Jaedsada.me</h1>" +
    "<p>Please connect the Internet.</p>" +
    "</body>" +
    "</html>";

self.addEventListener("fetch", function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return new Response(
                responseContent,
                {headers: {"Content-Type": "text/html"}}
            );
        })
    );
});