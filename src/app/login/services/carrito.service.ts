// carrito.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app/carrito'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  agregarItem(usuarioId: number, productoId: number, cantidad: number): Observable<any> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        const userId = user ? user.id : null;
        if (userId) {
          return this.http.post(`${this.apiUrl}/agregar`, { usuarioId: userId, productoId, cantidad });
        } else {
          return of(null); // Maneja el caso donde no hay usuario válido
        }
      }),
      catchError(error => {
        console.error('Error al obtener el usuario actual:', error);
        return of(null); // Maneja el error en la obtención del usuario
      })
    );
  }

  obtenerItemsCarrito(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${usuarioId}`);
  }

  eliminarItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  obtenerTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
