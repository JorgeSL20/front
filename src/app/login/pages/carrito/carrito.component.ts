import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../interfaces/carrito.interface';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carritoItems: Carrito[] = [];
  usuarioId: number = 1; // Ejemplo, asegúrate de obtener este valor de forma correcta

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarItemsCarrito();
  }

  cargarItemsCarrito() {
    this.carritoService.obtenerItemsCarrito(this.usuarioId).subscribe(items => {
      this.carritoItems = items;

      // Si deseas obtener detalles del producto para cada ítem del carrito
      this.carritoItems.forEach(item => {
        this.carritoService.obtenerProductoPorId(item.productoId).subscribe(producto => {
          item.productoId = producto;
        });
      });
    });
  }

  eliminarItem(id: number) {
    this.carritoService.eliminarItem(id).subscribe(() => {
      this.cargarItemsCarrito();
    });
  }
}
