import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private socket: Socket;

  constructor() {
    // Conecta al servidor WebSocket
    this.socket = io('https://proyectogatewayback-production.up.railway.app/producto'); // Cambia la URL según tu entorno
  }

  listen(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
