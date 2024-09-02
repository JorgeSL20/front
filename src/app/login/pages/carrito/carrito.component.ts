import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: any[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerItemsDelCarrito().subscribe(
      (items: any[]) => {
        this.items = items.map(item => {
          item.precioAplicado = item.cantidad > item.cantidadMay ? item.precioMay : item.precioMen;
          return item;
        });
        this.calcularTotal();
      },
      error => {
        console.error('Error al obtener ítems del carrito:', error);
      }
    );
  }

  calcularTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + (item.precioAplicado * item.cantidad), 0);
  }

  eliminarItem(itemId: number): void {
    this.carritoService.eliminarItem(itemId).subscribe(
      response => {
        this.cargarCarrito();
        this.showAlert('Producto eliminado del carrito', 'alert-success');
      },
      error => {
        console.error('Error al eliminar ítem del carrito:', error);
      }
    );
  }

  incrementarCantidad(itemId: number, cantidadActual: number): void {
    this.carritoService.actualizarCantidad(itemId, cantidadActual + 1).subscribe(
      response => {
        this.cargarCarrito();
        this.showAlert('Cantidad incrementada', 'alert-success');
      },
      error => {
        console.error('Error al incrementar la cantidad:', error);
      }
    );
  }

  decrementarCantidad(itemId: number, cantidadActual: number): void {
    if (cantidadActual > 1) {
      this.carritoService.actualizarCantidad(itemId, cantidadActual - 1).subscribe(
        response => {
          this.cargarCarrito();
          this.showAlert('Cantidad decrementada', 'alert-success');
        },
        error => {
          console.error('Error al decrementar la cantidad:', error);
        }
      );
    }
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
