import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { PagoService } from '../../services/pago.service';
import { environment } from '../../../../environments/environment';
import { loadScript } from '@paypal/paypal-js';

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
          currency_code: 'MXN',
          value: this.total.toFixed(2)
        }
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }
    }).then((orderId: string) => {
      if (orderId) {
        return orderId;
      } else {
        console.error('Invalid response format:', orderId);
        throw new Error('Failed to create PayPal order');
      }
    }).catch((error: any) => {
      console.error('Error creating PayPal order:', error);
      throw new Error('Failed to create PayPal order');
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
    loadScript({
      clientId: environment.paypalClientId,
      currency: 'MXN'
    }).then((paypal) => {
      if (paypal && paypal.Buttons) {
        paypal.Buttons({
          createOrder: this.createOrder,
          onApprove: this.onApprove,
          onError: (err: any) => {
            console.error('PayPal Button Error:', err);
          }
        }).render('#paypal-button-container');
      } else {
        console.error('Failed to load PayPal script');
      }
    }).catch(err => {
      console.error('Error loading PayPal script:', err);
    });
  }
}
