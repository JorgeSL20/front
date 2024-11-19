import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado:', registration);
  
        // Prueba enviar una notificación inmediatamente
        if (Notification.permission === 'granted') {
          registration.showNotification('¡Dale un vistaso a nuestros productos!', {
            body: 'Checa nuestros proctos',
            icon: './assets/logo.png'
          }).catch(error => {
            console.error('Error al mostrar la notificación:', error);
          });
        }
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }
  
  