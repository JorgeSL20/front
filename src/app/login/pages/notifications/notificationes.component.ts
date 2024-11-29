import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
})
export class NotificacionesComponent implements OnInit {
  private socket: any;
  notificaciones: Array<any> = [];

  ngOnInit(): void {
    // Conéctate al servidor de WebSockets
    this.socket = io('https://proyectogatewayback-production.up.railway.app'); // Cambia por tu API URL

    // Escucha las notificaciones
    this.socket.on('newProductNotification', (data: any) => {
      console.log('Notificación recibida:', data);
      this.notificaciones.push(data); // Agrega la notificación al array
    });
  }
}
