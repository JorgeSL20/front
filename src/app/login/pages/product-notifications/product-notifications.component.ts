import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-product-notifications',
  template: `<div *ngFor="let notification of notifications">
               {{ notification.message }}
             </div>`,
})
export class ProductNotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.onNewProductNotification((data) => {
      this.notifications.push(data);
      alert(data.message); // Mostrar notificación
    });
  }
}
