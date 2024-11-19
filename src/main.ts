import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registrado:', registration);

      // Escuchar si hay un evento 'LOGIN_SUCCESS' en el service worker
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'LOGIN_SUCCESS') {
          console.log('Evento LOGIN_SUCCESS recibido, mostrando notificación...');
          showNotification();
        }
      });
    })
    .catch(error => {
      console.error('Error al registrar el Service Worker:', error);
    });
}

// Función para mostrar la notificación
function showNotification() {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification('¡Bienvenido de nuevo!', {
        body: 'Checa nuestros productos en oferta',
        icon: './assets/logo.png',
      }).catch(error => {
        console.error('Error al mostrar la notificación:', error);
      });
    });
  } else {
    console.warn('Permiso de notificación no otorgado.');
  }
}
