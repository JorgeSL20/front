self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting(); // Activa el nuevo Service Worker inmediatamente
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
  event.waitUntil(self.clients.claim()); // Toma control de todas las páginas
});

self.addEventListener('message', (event) => {
  console.log('Mensaje recibido en el Service Worker:', event.data);

  // Si el mensaje indica que la sesión se inició correctamente
  if (event.data && event.data.type === 'LOGIN_SUCCESS') {
    console.log('Evento LOGIN_SUCCESS recibido, mostrando notificación...');
    showNotification();
  }
});

self.addEventListener('push', function (event) {
  let payload = event.data ? event.data.json() : {};
  let title = payload.title || '¡Notificación Push!';
  let options = {
    body: payload.body || 'Nuevo contenido disponible.',
    icon: payload.icon || './assets/logo-150x150.png',
    badge: './assets/badge.png',
    data: {
      url: payload.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  // Accede a 'clients' dentro del contexto del service worker
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

