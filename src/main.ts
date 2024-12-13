import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Registro del Service Worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registrado:', registration);

      // Solicitar permisos de notificación
      if (Notification.permission === 'granted') {
        console.log('Permiso de notificación ya concedido.');
      } else {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Permiso para notificaciones concedido.');
          } else {
            console.log('Permiso para notificaciones denegado.');
          }
        });
      }

      // Escuchar cuando se reciba una notificación push
      navigator.serviceWorker.addEventListener('push', (event: any) => {
        let payload = event.data ? event.data.json() : {};
        let title = payload.title || '¡Notificación Push!';
        let options = {
          body: payload.body || 'Nuevo contenido disponible.',
          icon: payload.icon || './assets/logo-150x150.png',
          badge: './assets/badge.png',
          data: {
            url: payload.url || '/'
          }
        };

        // Mostrar la notificación
        event.waitUntil(
          registration.showNotification(title, options)
        );
      });

      // Manejar la acción de clic en la notificación
      navigator.serviceWorker.addEventListener('notificationclick', (event: any) => {
        event.notification.close();
        // El manejo de 'clients' ahora se hace en el service-worker.js
      });
    })
    .catch(error => {
      console.error('Error al registrar el Service Worker:', error);
    });
}
