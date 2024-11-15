self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
    event.waitUntil(
      self.clients.claim().then(() => {
        console.log('Claim realizado, control total del cliente');
        showNotification();
      })
    );
  });
  
  function showNotification() {
    if (Notification.permission === 'granted') {
      self.registration.showNotification("¡Dale un vistaso a nuestros productos!", {
        body: "Miara nuestros productos",
        icon: './assets/logo.png'
      }).catch(error => {
        console.error("Error al mostrar la notificación:", error);
      });
    } else {
      console.warn("No se puede mostrar la notificación: permiso no concedido.");
    }
  }
  
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
  