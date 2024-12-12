import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/* Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registrado:', registration);

      // Solicitar permisos de notificación
      if (Notification.permission === 'granted') {
        registration.showNotification('!!Hola¡¡', {
          body: '¡Dale un vistaso a nuestros productos!',
          icon: './assets/logo-150x150.png'
        });
      }
    })
    .catch(error => {
      console.error('Error al registrar el Service Worker:', error);
    });
}*/
