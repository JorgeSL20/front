import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { PagoService } from '../../services/pago.service';
import { environment } from '../../../../environments/environment';
import { loadScript } from '@paypal/paypal-js';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

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
    private pagoService: PagoService,
    private router: Router
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
            if (response.status === 200) {
              this.showAlert('Pago procesado exitosamente', 'alert-success');
              // Vaciar el carrito después de la compra
              this.carritoService.vaciarCarrito().subscribe(() => {
                this.actualizarExistencias().subscribe(() => {
                  this.router.navigate(['user/gracias']);
                }, (error: any) => {
                  console.error('Error al actualizar las existencias:', error);
                });
              }, (error: any) => {
                console.error('Error al vaciar el carrito:', error);
              });
            } else if (response.status === 409) {
              this.showAlert('Pago procesado exitosamente', 'alert-success');
              // También vaciar el carrito y actualizar las existencias
              this.carritoService.vaciarCarrito().subscribe(() => {
                this.actualizarExistencias().subscribe(() => {
                  this.router.navigate(['user/gracias']);
                }, (error: any) => {
                  console.error('Error al actualizar las existencias:', error);
                });
              }, (error: any) => {
                console.error('Error al vaciar el carrito:', error);
              });
            }
          },
          (error: any) => {
            console.error('Error capturing payment:', error);
            this.showAlert('Error al capturar el pago. Por favor, intenta nuevamente', 'alert-danger');
          }
        );
      } else {
        console.error('Invalid order ID:', orderId);
      }
    }).catch((error: any) => {
      console.error('Error during payment approval:', error);
      this.showAlert('Error al aprobar el pago. Por favor, intenta nuevamente', 'alert-danger');
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
            this.showAlert('Error al cargar el botón de PayPal. Por favor, intenta nuevamente', 'alert-danger');
          }
        }).render('#paypal-button-container');
      } else {
        console.error('Failed to load PayPal script');
        this.showAlert('Error al cargar el script de PayPal. Por favor, intenta nuevamente', 'alert-danger');
      }
    }).catch(err => {
      console.error('Error loading PayPal script:', err);
      this.showAlert('Error al cargar el script de PayPal. Por favor, intenta nuevamente', 'alert-danger');
    });
  }

  showAlert(message: string, alertClass: string) {
    // Crea un div para el mensaje
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} fixed-top d-flex align-items-center justify-content-center`;
    alertDiv.textContent = message;
    alertDiv.style.fontSize = '20px'; // Cambia el tamaño del texto

    // Agrega el mensaje al cuerpo del documento
    document.body.appendChild(alertDiv);

    // Elimina el mensaje después de unos segundos
    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  }

  // Nueva función para actualizar las existencias después de la compra
  actualizarExistencias(): Observable<any> {
    const updates = this.items.map(item => {
      return this.carritoService.actualizarCantidad(item.productoId, item.cantidad);
    });
    return forkJoin(updates);
  }
}
