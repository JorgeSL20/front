self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  console.log('Mensaje recibido en el Service Worker:', event.data); // Depuración
  if (event.data && event.data.type === 'LOGIN_SUCCESS') {
    console.log('Evento LOGIN_SUCCESS recibido, mostrando notificación...'); // Depuración
    showNotification();
  }
});

function showNotification() {
  if (Notification.permission === 'granted' && self.registration) {
    console.log('Mostrando notificación...'); // Depuración
    self.registration.showNotification("¡Dale un vistazo a nuestros productos!", {
      body: "Checa nuestros productos en oferta",
      icon: './assets/logo.png',
    }).catch(error => {
      console.error("Error al mostrar la notificación:", error);
    });
  } else {
    console.warn('Permisos de notificación no otorgados o Service Worker no registrado.');
  }
}
