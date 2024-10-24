import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  items: any[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) {}

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
