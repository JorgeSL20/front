const CACHE_NAME = 'catalogo-cache-v1';
const urlsToCache = [
  '/',                // Página principal
  '/index.html',      // Archivo HTML principal
  '/styles.css',      // Archivos de estilos
  '/main.js',         // Archivo JavaScript principal
  '/offline.html',    // Página que se mostrará cuando no haya conexión
  // Añade más archivos que deseas cachear de forma estática
];

// Evento de instalación para cachear archivos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos cacheados');
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de activación para limpiar el caché antiguo
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de fetch para interceptar las solicitudes de red
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('https://proyectogatewayback-production.up.railway.app/producto')) {  
    // Si la solicitud es para la API de productos, cachear los datos dinámicamente
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());  // Almacenar en caché la respuesta de la API
          return response;
        }).catch(() => {
          return caches.match(event.request);  // Intentar servir desde caché si falla la red
        });
      })
    );
  } else {
    // Para otras solicitudes, tratar de servir desde el caché o hacer la solicitud de red
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch(() => {
          // Si la solicitud falla (por ejemplo, sin conexión), mostrar la página offline
          return caches.match('/offline.html');
        });
      })
    );
  }
});
