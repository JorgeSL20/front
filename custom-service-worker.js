self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
    event.waitUntil(self.clients.claim());
  });
  
  
  function showNotification() {
    if (Notification.permission === 'granted') {
      self.registration.showNotification("¡Dale un vistazo a nuestros productos!", {
        body: "Mira nuestros productos",
        icon: '/assets/logo.png'
      }).catch(error => {
        console.error("Error al mostrar la notificación:", error);
      });
    } else {
      console.warn("Permiso de notificaciones no concedido.");
    }
  }
  
  
  self.addEventListener('message', (event) => {
    console.log('Mensaje recibido del cliente:', event.data);
    
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
      showNotification();
    }
  
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach(client => {
          client.postMessage({ message: 'Respuesta desde el Service Worker' });
        });
      })
    );
  });
  
  