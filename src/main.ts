import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registrado:', registration);

      // Escuchar cambios en el almacenamiento local
      window.addEventListener('storage', (event) => {
        if (event.key === 'token' && event.newValue) {
          console.log('Token detectado en localStorage, enviando notificación...');

          if (Notification.permission === 'granted') {
            // Enviar un mensaje al Service Worker
            navigator.serviceWorker.ready.then(registration => {
              registration.active?.postMessage({
                type: 'LOGIN_SUCCESS'
              });

              // Mostrar una notificación local (opcional)
              registration.showNotification('¡Bienvenido de nuevo!', {
                body: 'Nos alegra verte de nuevo. Checa nuestros productos en oferta.',
                icon: './assets/logo-150x150.png'
              });
            });
          } else {
            console.warn('Permisos de notificación no otorgados.');
          }
        }
      });
    })
    .catch(error => {
      console.error('Error al registrar el Service Worker:', error);
    });
}
