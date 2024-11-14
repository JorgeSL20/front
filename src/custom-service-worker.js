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
    self.registration.showNotification("¡Tienes una cita pendiente!", {
      body: "Agenda una cita o mira nuestros servicios",
      icon: './assets/logo.png'
    }).catch(error => {
      console.error("Error al mostrar la notificación:", error);
    });
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