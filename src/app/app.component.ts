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
  outputValue: string = ''; // Asegúrate de que esta línea está presente en tu código.
  
  public isOnline = true; // Estado inicial de conectividad: conectado

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private networkStatusService: NetworkStatusService // Inyectamos el servicio de red
  ) {}

  title = '404';

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
  }

  handleInput(): void {
    this.outputValue = "Output: " + this.inputValue;
  }

  // Funciones para mostrar las notificaciones de estado de red
  showOfflineNotification() {
    alert('¡Has perdido la conexión a Internet!');
  }

  showOnlineNotification() {
    alert('¡Has recuperado la conexión a Internet!');
  }
}
