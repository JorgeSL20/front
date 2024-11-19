self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
    event.waitUntil(self.clients.claim());
  
    // Enviar notificación de prueba al activar el Service Worker
    showNotification();
  });
  
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'LOGIN_SUCCESS') {
      // Mostrar una notificación al iniciar sesión
      showNotification();
    }
  });
  
  // Función para enviar una notificación
  function showNotification() {
    if (Notification.permission === 'granted' && self.registration) {
      self.registration.showNotification("¡Dale un vistazo a nuestros productos!", {
        body: "Checa nuestros productos en oferta",
        icon: './assets/logo.png',
      }).catch(error => {
        console.error("Error al mostrar la notificación:", error);
      });
    }
  }
  
  
  
  // Asegúrate de manejar los mensajes correctamente
  self.addEventListener('message', (event) => {
    console.log('Mensaje recibido:', event.data);
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach(client => {
          client.postMessage({ message: 'Respuesta desde el Service Worker' });
        });
      })
    );
  });