// src/app/pages/pago/pago.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

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
  ) { }

  ngOnInit(): void {
    this.carritoService.obtenerItemsDelCarrito().subscribe(items => {
      this.items = items.map(item => {
        const precioMen = item.productoPrecioMen || 0;
        const precioMay = item.productoPrecioMay || 0;
        const cantidadMay = item.productoCantidadMay || 0;

        if (item.cantidad >= cantidadMay) {
          item.precioAplicado = precioMay;
        } else {
          item.precioAplicado = precioMen;
        }

        return item;
      });

      this.total = this.items.reduce((acc, item) => acc + (item.precioAplicado * item.cantidad), 0);
    });

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
              value: this.total.toFixed(2), // Monto total en MXN
              currency_code: 'MXN'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          // Lógica después de que el pago es capturado exitosamente
          this.showAlert('Pago realizado con éxito.', 'alert-success');

          // Actualizar existencias en la base de datos
          this.actualizarExistencias().subscribe(() => {
            // Redirigir o limpiar el carrito después del pago
            this.carritoService.vaciarCarrito().subscribe(() => {
              this.router.navigate(['/user/mi-carrito']);
            });
          });
        });
      },
      onError: (err: any) => {
        this.showAlert('Ocurrió un error en el pago.', 'alert-danger');
      }
    }).render('#paypal-button-container'); // Renderizar el botón de PayPal en el div con id "paypal-button-container"
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

  actualizarExistencias(): Observable<any> {
    const updates = this.items.map(item => {
      return this.carritoService.actualizarCantidad(item.productoId, item.cantidad);
    });
    return forkJoin(updates);
  }
}
