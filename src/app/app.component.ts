import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NetworkStatusService } from './network-status.service'; // Importa el servicio de conectividad
import { NotificationService } from './login/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputValue: string = '';
  outputValue: string = '';
  public isOnline = true; // Estado inicial de conectividad: conectado

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private networkStatusService: NetworkStatusService,
    private notificationService: NotificationService // Inyectamos el servicio de red
  ) {}

  ngOnInit() {
    // Suscribirse a las notificaciones
    this.notificationService.subscribeToNotifications();

    // Solicitar permisos para notificaciones
    if ('Notification' in window && 'serviceWorker' in navigator) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permiso para notificaciones concedido.');
        } else {
          console.log('Permiso para notificaciones denegado.');
        }
      }).catch(error => {
        console.error("Error al solicitar permiso para notificaciones:", error);
      });
    }

    // Suscribirse a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica si la URL no coincide con ninguna ruta existente
        if (!this.activatedRoute.firstChild) {
          this.router.navigate(['/404']);
        }
      }
    });

    // Suscribirse a los cambios de conectividad
    this.networkStatusService.isOnline.subscribe(status => {
      this.isOnline = status;
      if (!status) {
        this.showOfflineNotification();
      } else {
        this.showOnlineNotification();
      }
    });

    // Registrar el Service Worker y manejar suscripción a notificaciones push
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(function (registration) {
          console.log('Service Worker registrado', registration);

          // Verifica si el usuario ya está suscrito a las notificaciones
          return registration.pushManager.getSubscription()
            .then(function (subscription) {
              if (!subscription) {
                const vapidPublicKey = 'BFPLtdosCNKQUZOc1bmEJFWdwikcUhovdCEx4FgNdJbbOohGoOkGlGsHWAWNp9sTNGiUy42ICsOd_x0Jksclp9M'; // La clave pública VAPID
                const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                
                return registration.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: convertedVapidKey
                });
              }
              return subscription;
            })
            .then(function (subscription) {
              console.log('Suscripción: ', subscription);
              // Enviar la suscripción al servidor para guardarla
              fetch('/api/subscription', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                  'Content-Type': 'application/json',
                }
              });
            });
        })
        .catch(function (error) {
          console.error('Error al registrar el Service Worker:', error);
        });
    }

  }

  handleInput(): void {
    this.outputValue = "Output: " + this.inputValue;
  }

  // Funciones para mostrar las notificaciones de estado de red
  showOfflineNotification() {
    this.showAlert('¡Has perdido la conexión a Internet!', 'alert-danger');
  }

  showOnlineNotification() {
    this.showAlert('¡Has recuperado la conexión a Internet!', 'alert-success');
  }

  showAlert(message: string, alertClass: string) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} fixed-top d-flex align-items-center justify-content-center`;
    alertDiv.textContent = message;
    alertDiv.style.fontSize = '20px';

    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
}

// Función para convertir la clave pública VAPID a Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
