self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
    event.waitUntil(self.clients.claim());
  
    // Envía la notificación con un breve retraso
    setTimeout(() => {
      showNotification();
    }, 1000);
  });
  
  // Función para enviar una notificación
  function showNotification() {
    if (Notification.permission === "granted") {
      self.registration.showNotification("¡Tienes una cita pendiente!", {
        body: "Agenda una cita o mira nuestros servicios",
        icon: '/assets/logo.png', // Agrega un ícono si es necesario
      }).catch(error => {
        console.error("Error al mostrar la notificación:", error);
      });
    } else {
      console.error("No se puede mostrar la notificación: permisos denegados.");
    }
  }
  