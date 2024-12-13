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
  const data = event.data ? event.data.json() : {};  // Obtener los datos del payload
  
  const options = {
    body: data.notification.body || 'Notificación sin cuerpo',
    icon: data.notification.icon || 'https://res.cloudinary.com/dkwb9vcbb/image/upload/v1734053100/user_images/imagen_logo_n3b16q.jpg ',
    click_action: data.notification.click_action || '/',
  };

  event.waitUntil(
    self.registration.showNotification(data.notification.title || 'Nuevo mensaje', options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.click_action) // Abre el enlace cuando se hace clic en la notificación
  );
});

