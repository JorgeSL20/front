import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

declare var paypal: any;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit, AfterViewInit {
  items: any[] = [];
  total: number = 0;
  userEmail: string | null = null;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener items del carrito y calcular el total
    this.carritoService.obtenerItemsDelCarrito().subscribe(items => {
      this.items = items.map(item => {
        const precioMen = item.productoPrecioMen || 0;
        const precioMay = item.productoPrecioMay || 0;
        const cantidadMay = item.productoCantidadMay || 0;

        item.precioAplicado = item.cantidad >= cantidadMay ? precioMay : precioMen;
        return item;
      });

      this.total = this.items.reduce((acc, item) => acc + (item.precioAplicado * item.cantidad), 0);
    });

    // Obtener el email del usuario actual
    this.authService.getCurrentUserEmail().subscribe(email => {
      this.userEmail = email;
    });
  }

  ngAfterViewInit(): void {
    this.renderPaypalButton();
  }

  renderPaypalButton(): void {
    paypal.Buttons({
      style: {
        color: 'blue',
        shape: 'pill',
        label: 'pay',
        layout: 'vertical'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.total.toFixed(2),  // Monto total en formato de dos decimales
              currency_code: 'MXN'           // Moneda en MXN
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          // Si el pago es exitoso, actualizar las existencias y vaciar el carrito
          this.actualizarExistencias().subscribe(() => {
            this.carritoService.vaciarCarrito().subscribe(() => {
              this.router.navigate(['/user/mi-carrito']);
              this.showAlert('Pago realizado con éxito.', 'alert-success');
            });
          });
        });
      },
      onError: (err: any) => {
        // Mostrar alerta de error si el pago falla
        this.showAlert('Ocurrió un error en el pago.', 'alert-danger');
        console.error('Error en PayPal: ', err);
      }
    }).render('#paypal-button-container');  // Renderizar botón de PayPal
  }

  actualizarExistencias(): Observable<any> {
    const updates = this.items.map(item => {
      return this.carritoService.actualizarCantidad(item.productoId, item.cantidad);
    });
    return forkJoin(updates);
  }

  showAlert(message: string, alertClass: string) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} fixed-top d-flex align-items-center justify-content-center`;
    alertDiv.textContent = message;
    alertDiv.style.fontSize = '20px';

    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  }
}
