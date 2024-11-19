import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  // Método para registrar el Service Worker y enviar un mensaje de notificación
  sendLoginNotification() {
    // Verificar si el navegador soporta Service Worker y las notificaciones
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(swRegistration => {
        // Enviar mensaje al Service Worker para mostrar la notificación
        swRegistration.active?.postMessage({ type: 'LOGIN_SUCCESS' });
      }).catch(err => {
        console.error('Error al registrar el Service Worker:', err);
      });
    } else {
      console.warn('Permiso de notificación no otorgado o el Service Worker no está disponible.');
    }
  }
}
