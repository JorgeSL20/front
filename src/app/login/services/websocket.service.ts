import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://proyectogatewayback-production.up.railway.app/producto'); // Cambia la URL según tu backend
  }

  onNewProductNotification(callback: (data: any) => void) {
    this.socket.on('newProductNotification', callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
