import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production && environment.useServiceWorker) {
  enableProdMode();

  // Registro del Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./custom-service-worker.js') // Cambia a '/sw.js'
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);

        // Solicitar permisos para notificaciones
        if ('Notification' in window) {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              console.log('Permiso de notificaciones concedido.');
            } else {
              console.warn('Permiso de notificaciones denegado.');
            }
          });
        }

        // Escuchar mensajes del Service Worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          console.log('Mensaje recibido desde el Service Worker:', event.data);
        });
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
