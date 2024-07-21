// src/app/services/carrito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app/carrito';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private productoService: ProductoService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  agregarItem(productoId: number, cantidad: number): Observable<any> {
    return this.productoService.obtenerProductoPorId(productoId).pipe(
      switchMap(producto => {
        const userId = this.authService.getCurrentUserId();
        if (userId !== null) {
          return this.http.post(`${this.apiUrl}/agregar`, {
            productoId,
            cantidad,
            usuarioId: userId,
            productoNombre: producto.producto,
            productoImagen: producto.url,
            productoPrecio: producto.precio
          }, { headers: this.getAuthHeaders() });
        } else {
          return of(null); // O manejar el caso cuando el usuario no está autenticado
        }
      })
    );
  }

  obtenerItemsDelCarrito(): Observable<any[]> {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      return this.http.get<any[]>(`${this.apiUrl}/items/${userId}`, { headers: this.getAuthHeaders() }).pipe(
        switchMap(items => {
          if (!Array.isArray(items)) {
            console.error('Formato de datos incorrecto:', items);
            return of([]);
          }
          return of(items);
        })
      );
    } else {
      return of([]); // O manejar el caso cuando el usuario no está autenticado
    }
  }

  eliminarItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${itemId}`, { headers: this.getAuthHeaders() });
  }
}
