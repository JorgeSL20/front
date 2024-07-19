// carrito.component.ts

import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Carrito } from '../../interfaces/carrito.interface';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carritoItems: any[] = [];  // Actualizamos a 'any[]' para manejar detalles del producto
  productos: Producto[] = [];

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    const usuarioId = this.authService.getCurrentUserId();
    if (usuarioId !== null) {
      this.obtenerItemsCarrito();  // Solo llama una vez
      this.obtenerProductos();  // Cargar los productos
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }

  obtenerItemsCarrito(): void {
    const usuarioId = this.authService.getCurrentUserId();
    if (usuarioId !== null) {
      this.carritoService.obtenerItemsDelCarrito().subscribe(
        items => {
          this.carritoItems = items;
          console.log('Ítems del carrito:', items);
        },
        error => {
          console.error('Error al obtener ítems del carrito:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  eliminarItem(id: number): void {
    this.carritoService.eliminarItem(id).subscribe(
      () => {
        console.log('Ítem eliminado del carrito con éxito.');
        this.obtenerItemsCarrito();
      },
      error => {
        console.error('Error al eliminar ítem del carrito:', error);
      }
    );
  }
}
