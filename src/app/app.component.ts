import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NetworkStatusService } from './network-status.service'; // Importa el servicio de conectividad

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
    private networkStatusService: NetworkStatusService // Inyectamos el servicio de red
  ) {}

  ngOnInit() {
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

    // Registrar el Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/ngsw-worker.js')
          .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
          })
          .catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
          });
      });
    }

    // Solicitar permiso para las notificaciones
    this.requestNotificationPermission();
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

  // Solicitar permiso para las notificaciones
  requestNotificationPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Permiso para notificaciones concedido');
          this.showPeriodicNotification();
        } else if (permission === 'denied') {
          console.warn('Permiso para notificaciones denegado. No se mostrarán notificaciones.');
        } else {
          console.log('El permiso para notificaciones aún no ha sido concedido.');
        }
      });
    }
  }
  

  // Función para mostrar notificación periódica cada minuto
  showPeriodicNotification(): void {
    setInterval(() => {
      new Notification("¡Vea nuestros nuevos productos!", {
        body: "Puedes ver los prodcutos nuevos",
        icon: '/assets/logo.png'
      });
    }, 60000);
     // Cambiar a 60000 para 1 minuto en producción
  }
}
