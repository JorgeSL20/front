import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {
  private onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);
  
  constructor() {
    // Escucha cuando el usuario pierde o recupera la conexión a Internet
    window.addEventListener('online', () => this.updateNetworkStatus(true));
    window.addEventListener('offline', () => this.updateNetworkStatus(false));
  }

  // Devuelve un observable para que los componentes puedan suscribirse
  get isOnline() {
    return this.onlineStatus.asObservable();
  }

  // Actualiza el estado de la conectividad
  private updateNetworkStatus(isOnline: boolean) {
    this.onlineStatus.next(isOnline);
  }
}
