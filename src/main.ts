import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registrado:', registration);

      // Verificar si ya se ha otorgado permiso para las notificaciones
      if (Notification.permission === 'granted') {
        // Mostrar la notificación inmediatamente si el permiso ya está otorgado
        registration.showNotification('¡Dale un vistazo a nuestros productos!', {
          body: 'Checa nuestros productos',
          icon: './assets/logo.png'
        }).catch(error => {
          console.error('Error al mostrar la notificación:', error);
        });
      } else if (Notification.permission !== 'denied') {
        // Si el usuario no ha denegado el permiso, solicitamos permiso
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            // Si el usuario otorga el permiso, mostramos la notificación
            registration.showNotification('¡Dale un vistazo a nuestros productos!', {
              body: 'Checa nuestros productos',
              icon: './assets/logo.png'
            }).catch(error => {
              console.error('Error al mostrar la notificación:', error);
            });
          }
        });
      }
    })
    .catch(error => {
      console.error('Error al registrar el Service Worker:', error);
    });
}
