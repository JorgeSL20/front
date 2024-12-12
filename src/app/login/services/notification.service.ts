import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly VAPID_PUBLIC_KEY = 'BFPLtdosCNKQUZOc1bmEJFWdwikcUhovdCEx4FgNdJbbOohGoOkGlGsHWAWNp9sTNGiUy42ICsOd_x0Jksclp9M'; // Reemplaza con tu clave pública VAPID.

  constructor(private swPush: SwPush, private http: HttpClient) {}

  subscribeToNotifications() {
    if (!this.swPush.isEnabled) {
      console.error('Las notificaciones Push no están habilitadas en este navegador.');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((subscription: PushSubscription) => {
        console.log('Suscripción exitosa:', subscription);

        // Adaptación: Enviar la suscripción al servidor con la estructura correcta.
        const subscriptionPayload = {
          endpoint: subscription.endpoint,
          keys: subscription.toJSON().keys, // Asegurarse de enviar solo las claves necesarias.
        };

        this.http.post('https://gateway-soluciones.netlify.app/subscriptions', subscriptionPayload).subscribe(
          () => console.log('Suscripción enviada al servidor con éxito.'),
          (error) => console.error('Error al enviar la suscripción al servidor:', error)
        );
      })
      .catch((err) => console.error('Error durante la suscripción:', err));
  }
}
