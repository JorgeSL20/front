import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly VAPID_PUBLIC_KEY = 'BFPLtdosCNKQUZOc1bmEJFWdwikcUhovdCEx4FgNdJbbOohGoOkGlGsHWAWNp9sTNGiUy42ICsOd_x0Jksclp9M'; // Genera tus claves VAPID.

  constructor(private swPush: SwPush, private http: HttpClient) {}

  subscribeToNotifications() {
    if (!this.swPush.isEnabled) {
      console.error('Notificaciones Push no están habilitadas.');
      return;
    }

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY,
    }).then(subscription => {
      console.log('Suscripción exitosa:', subscription);
      this.http.post('/api/subscribe', subscription).subscribe(
        () => console.log('Suscripción enviada al servidor.'),
        error => console.error('Error enviando suscripción:', error)
      );
    }).catch(err => console.error('Error durante la suscripción:', err));
  }
}
