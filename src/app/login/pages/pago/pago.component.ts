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
    // Obtener items del carrito y calcular el total
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

      // Calcular el total asegurando que el valor sea un número válido
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
      // Crear orden con valores correctos
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.total.toFixed(2),  // Total con dos decimales
              currency_code: 'MXN'           // Código de moneda correcto
            }
          }]
        });
      },
      
      onApprove: (data: any, actions: any) => {
        // Capturar el pago después de la aprobación
        return actions.order.capture().then((details: any) => {
          // Mostrar alerta de éxito
          this.showAlert('Pago realizado con éxito.', 'alert-success');

          // Actualizar existencias y vaciar carrito
          this.actualizarExistencias().subscribe(() => {
            this.carritoService.vaciarCarrito().subscribe(() => {
              this.router.navigate(['/user/mi-carrito']);
            });
          });
        });
      },
      onError: (err: any) => {
        // Manejar errores en el proceso de pago
        this.showAlert('Ocurrió un error en el pago.', 'alert-danger');
        console.error('Error en PayPal: ', err);
      }
    }).render('#paypal-button-container'); // Renderizar el botón de PayPal en el div con id "paypal-button-container"
  }

  showAlert(message: string, alertClass: string) {
    // Mostrar una alerta temporal en la parte superior de la página
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
    // Actualizar existencias de productos comprados
    const updates = this.items.map(item => {
      return this.carritoService.actualizarCantidad(item.productoId, item.cantidad);
    });
    return forkJoin(updates);
  }
}
