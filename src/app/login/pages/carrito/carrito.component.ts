// carrito.component.ts

import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { LoginService } from '../../services/login.service';
import { Carrito } from '../../interfaces/carrito.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carritoItems: Carrito[] = [];
  usuarioId: number | undefined;

  constructor(
    private carritoService: CarritoService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarioId();
  }

  obtenerUsuarioId(): void {
    this.loginService.getCurrentUser().subscribe(
      (user: User | null) => {
        if (user) {
          this.usuarioId = user.id;
          localStorage.setItem('userId', user.id.toString());
          this.obtenerItemsCarrito();
        } else {
          console.error('No se pudo obtener el usuario actual.');
        }
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  obtenerItemsCarrito(): void {
    if (this.usuarioId) {
      this.carritoService.obtenerItemsCarrito(this.usuarioId).subscribe(
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
