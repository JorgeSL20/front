// src/app/components/carrito/carrito.component.ts
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: any[] = [];

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerItemsDelCarrito().subscribe(
      (items: any[]) => {
        this.items = items;
      },
      (error) => {
        console.error('Error al obtener ítems del carrito:', error);
      }
    );
  }

  eliminarItem(itemId: number): void {
    this.carritoService.eliminarItem(itemId).subscribe(
      response => {
        this.cargarCarrito(); // Recargar el carrito después de eliminar un ítem
      },
      error => {
        console.error('Error al eliminar ítem del carrito:', error);
      }
    );
  }
}
