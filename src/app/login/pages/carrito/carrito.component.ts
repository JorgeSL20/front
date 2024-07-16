import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carritoItems: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarItemsCarrito();
  }

  cargarItemsCarrito() {
    const usuarioId = 1; // Debes obtener el ID del usuario de alguna forma
    this.carritoService.obtenerItemsCarrito(usuarioId).subscribe(items => {
      this.carritoItems = items;
    });
  }

  eliminarItem(id: number) {
    this.carritoService.eliminarItem(id).subscribe(() => {
      this.cargarItemsCarrito();
    });
  }
}
