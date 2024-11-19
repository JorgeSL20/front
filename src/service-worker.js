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
  
  // Función para enviar una notificación
  function showNotification() {
    if (self.registration) {
      self.registration.showNotification("¡Notificación de prueba!", {
        body: "Esto es una prueba de notificaciones",
        icon: './assets/logo.png' // Asegúrate de que la ruta es correcta
      }).catch(error => {
        console.error("Error al mostrar la notificación:", error);
      });
    } else {
      console.error("El Service Worker no está registrado.");
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