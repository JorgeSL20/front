import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { PagoService } from '../../services/pago.service';
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
    private authService: AuthService,
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {
    this.carritoService.obtenerItemsDelCarrito().subscribe(items => {
      this.items = items;
      this.total = this.items.reduce((acc, item) => acc + (item.productoPrecio * item.cantidad), 0);
      this.initializePayPalButton();
    });

    this.authService.getCurrentUserEmail().subscribe(email => {
      this.userEmail = email;
    });
  }

  createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: this.total.toFixed(2),
          currency_code: 'MXN'
        }
      }]
    }).then((response: any) => {
      if (response && response.id) {
        return response.id;
      } else {
        console.error('Invalid response format:', response);
        throw new Error('Failed to create PayPal order');
      }
    });
  };

  onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      const orderId = data.orderID;

      if (orderId) {
        this.pagoService.capturarPago(orderId).subscribe(
          response => {
            console.log('Payment captured successfully:', response);
            this.pagoService.enviarConfirmacion(this.items).subscribe(
              response => {
                console.log('Confirmation email sent:', response);
                alert('Pago procesado y confirmación enviada');
              },
              error => {
                console.error('Error sending confirmation email:', error);
              }
            );
          },
          error => {
            console.error('Error capturing payment:', error);
          }
        );
      } else {
        console.error('Invalid order ID:', orderId);
      }
    });
  };

  initializePayPalButton(): void {
    loadScript({ clientId: environment.paypalClientId }).then((paypal: PayPalNamespace | null) => {
      if (paypal && paypal.Buttons) {
        paypal.Buttons({
          createOrder: this.createOrder,
          onApprove: this.onApprove
        }).render('#paypal-button-container');
      } else {
        console.error('Failed to load PayPal script');
      }
    }).catch(err => {
      console.error('Error loading PayPal script:', err);
    });
  }
}
