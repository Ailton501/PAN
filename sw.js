const CACHE_NAME = 'app-cache-v5';
const URLS_TO_CACHE = [
    './',
    './index.html',
    './about.html',
    './contact.html',
    './menu.html',
    './service.html',
    './team.html',
    './app.js',
    './manifest.json',
    './css/bootstrap.min.css',
    './css/style.css',
    './js/main.js',

    // Imágenes generales
    './img/hero.jpg',
    './img/about.jpg',
    './img/carousel-1.jpg',
    './img/carousel-2.jpg',
    './img/header.jpg',
    './img/portfolio-1.jpg',
    './img/portfolio-2.jpg',
    './img/portfolio-3.jpg',
    './img/portfolio-4.jpg',
    './img/portfolio-5.jpg',
    './img/portfolio-6.jpg',
    './img/promotion.jpg',

    //  Imágenes de panes
    './img/pan-1.jpg',
    './img/pan-2.jpg',
    './img/pan-3.jpg',
    './img/pan-4.jpg',
    './img/pan-5.jpg',
    './img/pan-6.jpg',

    // Imágenes de servicios
    './img/service-1.jpg',
    './img/service-2.jpg',
    './img/service-3.jpg',
    './img/service-4.jpg',

    // Imágenes de chefs
    './img/chef-1.jpg',
    './img/chef-2.jpg',
    './img/chef-3.jpg',
    './img/chef-4.jpg',

    //Imágenes de testimonios
    './img/testimonial-1.jpg',
    './img/testimonial-2.jpg',
    './img/testimonial-3.jpg'
];

self.addEventListener('install', event => {
    console.log('Instalando Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            let cachePromises = URLS_TO_CACHE.map(async url => {
                try {
                    let response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return cache.put(url, response);
                } catch (error) {
                    console.error(` Error cacheando ${url}:`, error);
                }
            });

            return Promise.all(cachePromises);
        })
    );
});


// Activación del Service Worker y limpieza de caché antigua
self.addEventListener('activate', event => {
    console.log('Service Worker activado.');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log(' Borrando caché antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//  Interceptar solicitudes y servir desde caché primero
self.addEventListener('fetch', event => {
    console.log('Fetch solicitado para:', event.request.url);

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Sirviendo desde caché:', event.request.url);
                    return response;
                }
                return fetch(event.request).then(fetchResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
            .catch(() => caches.match('./index.html')) 
    );
});


self.addEventListener('install', event => {
    console.log('SW');

    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            let cachePromises = URLS_TO_CACHE.map(async url => {
                try {
                    let response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return cache.put(url, response);
                } catch (error) {
                    console.error(` Error cacheando ${url}:`, error);
                }
            });

            return Promise.all(cachePromises);
        })
    );

    // Notificación push
    self.registration.showNotification("Bienvenido a Placer Culposo", {
        body: "Disfruta de nuestros deliciosos postres",
        icon: "/img/icon.png"
    });
});
