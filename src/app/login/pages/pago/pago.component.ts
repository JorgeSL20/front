// src/app/login/pages/pago/pago.component.ts

import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  items: any[] = [];
  total: number = 0;
  userEmail: string | null = null;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.carritoService.obtenerItemsDelCarrito().subscribe(items => {
      this.items = items;
      this.total = this.items.reduce((acc, item) => acc + (item.productoPrecio * item.cantidad), 0);
    });

    this.authService.getCurrentUserEmail().subscribe(email => {
      this.userEmail = email;
      console.log('User Email:', this.userEmail);
    });

    loadScript({ clientId: environment.paypalClientId } as any).then((paypal: PayPalNamespace | null) => {
      if (paypal && paypal.Buttons) {
        paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: this.total.toFixed(2)
                }
              }]
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              console.log('Transaction completed by ' + details.payer.name.given_name);
              // Aquí puedes implementar el envío del correo electrónico
            });
          }
        }).render('#paypal-button-container');
      } else {
        console.error('PayPal SDK no se pudo cargar.');
      }
    }).catch((error: any) => {
      console.error('Failed to load the PayPal JS SDK script', error);
    });
  }
}
