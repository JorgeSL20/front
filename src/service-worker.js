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

// Función para mostrar una notificación
function showNotification() {
  // Verifica si los permisos de notificación están otorgados
  if (Notification.permission === 'granted') {
    // Mostrar la notificación
    self.registration.showNotification('¡Bienvenido de nuevo!', {
      body: 'Estamos felices de verte por aquí.',
      icon: './assets/logo-150x150.png',
    }).catch(error => {
      console.error('Error al mostrar la notificación:', error);
    });
  } else {
    console.warn('Permisos de notificación no otorgados.');
  }
}
