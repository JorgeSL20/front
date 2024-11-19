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

// Función para mostrar la notificación
function showNotification() {
  if (Notification.permission === 'granted') {
    self.registration.showNotification("¡Bienvenido de nuevoooooooo!", {
      body: "Checa nuestros productos en oferta",
      icon: './assets/logo.png', // Ruta al icono
    }).catch(error => {
      console.error("Error al mostrar la notificación:", error);
    });
  } else {
    console.warn('Permisos de notificación no otorgados.');
  }
}
